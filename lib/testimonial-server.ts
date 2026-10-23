// Server side of the testimonial upload (ADR 0005): the sign-off carried from the token request
// to the finished upload, the copy to Google Drive, the two emails and the Blob clean-up.
// Keys come from environment variables only (see .env.example).

import { del, get, head, issueSignedToken, presignUrl, put } from '@vercel/blob'
import { mailConfig, sendWithResend } from '@/lib/request-server'
import { cleanText, firstNamesFrom, formatBytes, formatDuration, namingLabel, NAMINGS, signOffRecord, type SignOff } from '@/lib/testimonial'

// ---------- Carried in the upload token, from the token request to the finished upload ----------

/** `signedAt` is the server's time when the client pressed "Agree and send". */
export type UploadInfo = { signOff: SignOff; signedAt: string; fileName: string; duration: number | null }

export function tokenPayloadFor(info: UploadInfo): string {
  return JSON.stringify(info)
}

/** The token payload comes back from Vercel Blob as we wrote it, so this only guards its shape. */
export function parseTokenPayload(raw: string | null | undefined): UploadInfo | null {
  try {
    const p = JSON.parse(raw ?? '')
    const s = p?.signOff
    const signedAt = new Date(p?.signedAt)
    if (!s || Number.isNaN(signedAt.getTime())) return null
    const naming = NAMINGS.find((n) => n === s.naming)
    const names = cleanText(s.names)
    if (!naming || !names || (s.who !== 'me' && s.who !== 'two')) return null
    return {
      signOff: { who: s.who, names, email: cleanText(s.email), naming, version: cleanText(s.version) },
      signedAt: signedAt.toISOString(),
      fileName: cleanText(p.fileName),
      duration: typeof p.duration === 'number' && Number.isFinite(p.duration) ? p.duration : null,
    }
  } catch {
    return null
  }
}

// ---------- Google Drive ----------

export type DriveConfig = { clientId: string; clientSecret: string; refreshToken: string }

export function driveConfig(env: NodeJS.ProcessEnv = process.env): DriveConfig | null {
  const { GOOGLE_CLIENT_ID: clientId, GOOGLE_CLIENT_SECRET: clientSecret, GOOGLE_REFRESH_TOKEN: refreshToken } = env
  return clientId && clientSecret && refreshToken ? { clientId, clientSecret, refreshToken } : null
}

const DRIVE = 'https://www.googleapis.com/drive/v3/files'
const DRIVE_UPLOAD = 'https://www.googleapis.com/upload/drive/v3/files'
const FOLDER_MIME = 'application/vnd.google-apps.folder'
const FOLDER_NAME = 'Client selfie videos'
/** The site finds its folder by this tag, so the folder can be renamed or moved. */
const FOLDER_TAG = { key: 'compassUse', value: 'testimonial-videos' }
/** Drive takes a resumable upload in pieces that are multiples of 256 KiB. */
export const CHUNK_BYTES = 32 * 1024 * 1024

type Auth = { Authorization: string }

async function failed(what: string, res: Response): Promise<Error> {
  return new Error(`${what}: ${res.status} ${await res.text().catch(() => '')}`.trim())
}

async function accessToken(config: DriveConfig): Promise<string> {
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    body: new URLSearchParams({ client_id: config.clientId, client_secret: config.clientSecret, refresh_token: config.refreshToken, grant_type: 'refresh_token' }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) throw await failed('Google token', res)
  return (await res.json()).access_token
}

/** The tagged folder in the account's My Drive, made on the first upload. The drive.file scope sees only what the site made. */
async function folderId(auth: Auth): Promise<string> {
  const q = `mimeType = '${FOLDER_MIME}' and appProperties has { key='${FOLDER_TAG.key}' and value='${FOLDER_TAG.value}' } and trashed = false`
  const found = await fetch(`${DRIVE}?${new URLSearchParams({ q, fields: 'files(id)', pageSize: '1' })}`, { headers: auth, signal: AbortSignal.timeout(10_000) })
  if (!found.ok) throw await failed('Drive folder search', found)
  const id = (await found.json()).files?.[0]?.id
  if (id) return id
  const made = await fetch(`${DRIVE}?fields=id`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: FOLDER_NAME, mimeType: FOLDER_MIME, appProperties: { [FOLDER_TAG.key]: FOLDER_TAG.value } }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!made.ok) throw await failed('Drive folder create', made)
  return (await made.json()).id
}

async function openDrive(config: DriveConfig): Promise<{ auth: Auth; parent: string }> {
  const auth = { Authorization: `Bearer ${await accessToken(config)}` }
  return { auth, parent: await folderId(auth) }
}

/** Cuts a stream into pieces of exactly `size` bytes; only the last may be shorter. */
export async function* chunks(stream: ReadableStream<Uint8Array>, size: number): AsyncGenerator<Uint8Array<ArrayBuffer>> {
  const reader = stream.getReader()
  let piece: Uint8Array<ArrayBuffer> = new Uint8Array(size)
  let filled = 0
  for (;;) {
    const { done, value } = await reader.read()
    if (done) break
    let offset = 0
    while (offset < value.length) {
      const n = Math.min(size - filled, value.length - offset)
      piece.set(value.subarray(offset, offset + n), filled)
      filled += n
      offset += n
      if (filled === size) {
        yield piece
        piece = new Uint8Array(size)
        filled = 0
      }
    }
  }
  if (filled > 0) yield piece.subarray(0, filled)
}

export type DriveVideo = { stream: ReadableStream<Uint8Array>; size: number; contentType: string; name: string; description: string }
export type DriveFile = { id: string; link: string; size: number }

function driveFile(file: { id: string; webViewLink?: string; size?: string }): DriveFile {
  return { id: file.id, link: file.webViewLink ?? `https://drive.google.com/file/d/${file.id}/view`, size: Number(file.size ?? 0) }
}

/** Streams the video into the folder with Drive's resumable upload, a piece at a time. */
async function uploadVideo({ auth, parent }: { auth: Auth; parent: string }, video: DriveVideo): Promise<DriveFile> {
  const start = await fetch(`${DRIVE_UPLOAD}?uploadType=resumable&fields=id,webViewLink,size`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': 'application/json; charset=UTF-8', 'X-Upload-Content-Type': video.contentType, 'X-Upload-Content-Length': String(video.size) },
    body: JSON.stringify({ name: video.name, parents: [parent], description: video.description }),
    signal: AbortSignal.timeout(15_000),
  })
  const session = start.headers.get('location')
  if (!start.ok || !session) throw await failed('Drive upload session', start)

  let sent = 0
  for await (const piece of chunks(video.stream, CHUNK_BYTES)) {
    const end = sent + piece.length - 1
    // Drive answers 308 for each piece but the last; manual keeps fetch from treating it as a redirect.
    const res = await fetch(session, {
      method: 'PUT',
      headers: { ...auth, 'Content-Range': `bytes ${sent}-${end}/${video.size}` },
      body: piece,
      redirect: 'manual',
      signal: AbortSignal.timeout(120_000),
    })
    sent = end + 1
    if (res.status === 308 && sent < video.size) continue
    if (res.ok && sent === video.size) return driveFile(await res.json())
    throw await failed(`Drive upload at byte ${sent} of ${video.size}`, res)
  }
  throw new Error(`Drive upload: the video ended at byte ${sent} of ${video.size}`)
}

/** A small text file, such as the sign-off, beside the video. */
async function uploadText({ auth, parent }: { auth: Auth; parent: string }, name: string, text: string): Promise<DriveFile> {
  const boundary = `compass-${Math.random().toString(36).slice(2)}`
  const body = [
    `--${boundary}`,
    'Content-Type: application/json; charset=UTF-8',
    '',
    JSON.stringify({ name, parents: [parent], mimeType: 'text/plain' }),
    `--${boundary}`,
    'Content-Type: text/plain; charset=UTF-8',
    '',
    text,
    `--${boundary}--`,
    '',
  ].join('\r\n')
  const res = await fetch(`${DRIVE_UPLOAD}?uploadType=multipart&fields=id,webViewLink,size`, {
    method: 'POST',
    headers: { ...auth, 'Content-Type': `multipart/related; boundary=${boundary}` },
    body,
    signal: AbortSignal.timeout(15_000),
  })
  if (!res.ok) throw await failed('Drive text upload', res)
  return driveFile(await res.json())
}

/** "2026-10-22 Sam and Jordan Lee, selfie video.mov", from the Blob pathname's date and extension. */
export function driveFileName(names: string, pathname: string, suffix = 'selfie video'): string {
  const date = pathname.match(/(\d{4}-\d{2}-\d{2})/)?.[1] ?? new Date().toISOString().slice(0, 10)
  const ext = pathname.match(/\.([a-z0-9]{2,5})$/i)?.[1] ?? 'mp4'
  return `${date} ${names}, ${suffix}.${ext}`
}

// ---------- The emails ----------

export type DriveOutcome = { kind: 'copied'; link: string; blobDeleted: boolean } | { kind: 'failed' } | { kind: 'off' }

/** To both founders, with the client as the reply address. */
export function composeVideoEmail(v: { info: UploadInfo; size: number; drive: DriveOutcome; pathname: string; record: string; downloadUrl?: string }): { subject: string; text: string } {
  const { signOff, fileName, duration } = v.info
  const length = formatDuration(duration)
  const drive =
    v.drive.kind === 'copied'
      ? `Google Drive: ${v.drive.link}`
      : v.drive.kind === 'failed'
        ? "Google Drive: the copy failed, so it's only in Vercel Blob for now."
        : "Google Drive: not connected yet, so it's only in Vercel Blob."
  const blob =
    v.drive.kind === 'copied'
      ? v.drive.blobDeleted
        ? 'Vercel Blob: deleted, now that Drive has it.'
        : `Vercel Blob: still there as ${v.pathname}. Delete it once you've checked the Drive copy.`
      : v.downloadUrl
        ? `Vercel Blob: ${v.downloadUrl} (this link works for 7 days). Save it to Drive, then delete it from Blob under Storage in the brand-site project on Vercel.`
        : `Vercel Blob: ${v.pathname}, under Storage in the brand-site project on Vercel. Save it to Drive, then delete it from Blob.`
  const lines = [
    `${signOff.names} sent a selfie video from the testimonial page.`,
    '',
    `Video: ${[fileName, v.size ? formatBytes(v.size) : '', length].filter(Boolean).join(', ') || 'details unknown'}`,
    `Name it as: ${namingLabel(signOff.naming)}`,
    `Their email: ${signOff.email}`,
    drive,
    blob,
    '',
    'Reply to this email to write back to them. They were sent a copy of the sign-off below.',
    '',
    '— The sign-off —',
    '',
    v.record,
    '',
    '—',
    'Sent from brand.compass-design.studio/testimonial.',
  ]
  return { subject: `Testimonial · Selfie video from ${signOff.names}`, text: lines.join('\n') }
}

/** To the client: thanks, and a copy of what they agreed to. */
export function composeClientEmail(v: { info: UploadInfo; record: string }): { subject: string; text: string } {
  const first = firstNamesFrom(v.info.signOff.names)
  const lines = [
    first ? `Hi ${first},` : 'Hi,',
    '',
    'Thank you for sending your video. It’s with Allison and Canyon now.',
    '',
    'Here’s a copy of what you agreed to, for your records. If you change your mind, reply to this email and we’ll take it down.',
    '',
    '—',
    '',
    v.record,
    '',
    '—',
    '',
    'Thank you for trusting us with your home.',
    'Allison and Canyon',
    'Compass Design Studio',
  ]
  return { subject: 'Your video for Compass Design Studio', text: lines.join('\n') }
}

/** The founders' sending address, under the studio's name instead of "Brand resources". */
function studioFrom(from: string): string {
  const address = from.match(/<([^>]+)>/)?.[1] ?? from
  return `Compass Design Studio <${address}>`
}

const SIGNED_LINK_MS = 7 * 24 * 60 * 60 * 1000 - 60_000

async function blobDownloadUrl(pathname: string): Promise<string | undefined> {
  try {
    const validUntil = Date.now() + SIGNED_LINK_MS
    const signed = await issueSignedToken({ pathname, operations: ['get'], validUntil })
    return (await presignUrl(signed, { operation: 'get', pathname, access: 'private', validUntil })).presignedUrl
  } catch (err) {
    console.error('Testimonial: no signed Blob link', err)
    return undefined
  }
}

// ---------- After Blob has the video ----------

const UNKNOWN: UploadInfo = {
  signOff: { who: 'me', names: 'A client', email: '', naming: 'none', version: 'unknown' },
  signedAt: new Date(0).toISOString(),
  fileName: '',
  duration: null,
}

/**
 * Copies the video and its sign-off to Drive when that's set up, deletes the Blob copy once
 * Drive's matches it in size, then emails the founders and the client. Never throws: until the
 * Drive copy is confirmed, Blob keeps the video.
 */
export async function deliverVideo(blob: { url: string; pathname: string }, tokenPayload: string | null | undefined): Promise<void> {
  const parsed = parseTokenPayload(tokenPayload)
  if (!parsed) console.error('Testimonial: the upload token carried no sign-off', blob.pathname)
  const info = parsed ?? UNKNOWN
  let size = 0
  let contentType = 'video/mp4'
  try {
    const meta = await head(blob.url)
    size = meta.size
    contentType = meta.contentType
  } catch (err) {
    console.error('Testimonial: Blob head failed', err)
  }
  const record = signOffRecord({ ...info.signOff, signedAt: new Date(info.signedAt), fileName: info.fileName, size })

  let drive: DriveOutcome = { kind: 'off' }
  const config = driveConfig()
  if (config) {
    try {
      const got = await get(blob.pathname, { access: 'private', useCache: false })
      if (!got || got.statusCode !== 200) throw new Error('Blob: the video is missing')
      const folder = await openDrive(config)
      const video = await uploadVideo(folder, {
        stream: got.stream,
        size: got.blob.size,
        contentType: got.blob.contentType || contentType,
        name: driveFileName(info.signOff.names, blob.pathname),
        description: `${info.signOff.names}, from brand.compass-design.studio/testimonial. Name it as: ${namingLabel(info.signOff.naming)}. The sign-off is the text file beside it.`,
      })
      await uploadText(folder, driveFileName(info.signOff.names, blob.pathname.replace(/\.[a-z0-9]+$/i, '.txt'), 'sign-off'), record)
      let blobDeleted = false
      if (video.size === got.blob.size) {
        try {
          await del(blob.url)
          blobDeleted = true
        } catch (err) {
          console.error('Testimonial: Blob delete failed', err)
        }
      } else {
        console.error('Testimonial: Drive copy size differs, keeping Blob', { drive: video.size, blob: got.blob.size })
      }
      drive = { kind: 'copied', link: video.link, blobDeleted }
    } catch (err) {
      console.error('Testimonial: Drive copy failed', err)
      drive = { kind: 'failed' }
    }
  }

  let downloadUrl: string | undefined
  if (drive.kind !== 'copied') {
    // Keep the sign-off beside the video until someone moves both.
    try {
      await put(blob.pathname.replace(/\.[a-z0-9]+$/i, '.sign-off.txt'), record, { access: 'private', contentType: 'text/plain; charset=utf-8', addRandomSuffix: false, allowOverwrite: true })
    } catch (err) {
      console.error('Testimonial: sign-off file not saved to Blob', err)
    }
    downloadUrl = await blobDownloadUrl(blob.pathname)
  }

  const toFounders = composeVideoEmail({ info, size, drive, pathname: blob.pathname, record, downloadUrl })
  const toClient = info.signOff.email ? composeClientEmail({ info, record }) : null
  const mail = mailConfig()
  if (mail.dryRun || !mail.apiKey) {
    console.info('Testimonial emails (not sent)', { founders: { to: mail.to, ...toFounders }, client: toClient && { to: info.signOff.email, ...toClient } })
    return
  }
  const resend = { ...mail, apiKey: mail.apiKey }
  try {
    await sendWithResend(resend, toFounders, { replyTo: info.signOff.email || undefined, idempotencyKey: `testimonial-founders/${blob.pathname}` })
  } catch (err) {
    console.error('Testimonial: founders email failed', err)
  }
  if (toClient) {
    try {
      await sendWithResend(resend, toClient, { to: [info.signOff.email], from: studioFrom(mail.from), replyTo: mail.to, idempotencyKey: `testimonial-client/${blob.pathname}` })
    } catch (err) {
      console.error('Testimonial: client email failed', err)
    }
  }
}
