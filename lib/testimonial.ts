// The testimonial page's rules, shared by the page and its upload route (ADR 0005): which videos
// it takes, how names, email and the sign-off are checked, where a video goes in Blob, and the
// sign-off record kept with each video.

import { TESTIMONIAL_SIGN_OFF } from '@/content/site'

/**
 * 1 GB, as phones count it. Keeps the site within Vercel Hobby's Blob allowance, together with
 * deleting each video from Blob once Google Drive has it.
 */
export const VIDEO_MAX_BYTES = 1_000_000_000
/** Past this a video is refused: three times the minute we ask for. */
export const VIDEO_MAX_SECONDS = 180
/** Past this the page says it's a little long, and takes it anyway. */
export const VIDEO_LONG_AFTER_SECONDS = 90
/** "Send another take" stops after this many videos in one visit. */
export const VIDEOS_PER_VISIT = 3
export const NAMES_MAX = 100
export const EMAIL_MAX = 254
/** Blob pathnames for uploads: testimonials/{date}-{names}.{ext}. Blob adds a random suffix. */
export const UPLOAD_PREFIX = 'testimonials/'

export type Who = 'me' | 'two'
export type Naming = (typeof TESTIMONIAL_SIGN_OFF.naming.options)[number]['value']
export const NAMINGS: readonly Naming[] = TESTIMONIAL_SIGN_OFF.naming.options.map((o) => o.value)
export const DEFAULT_NAMING: Naming = 'names-town'

// ---------- Videos ----------

export type VideoFile = { name: string; type: string; size: number }
/** What the browser could read from the file. Null fields mean it couldn't tell. */
export type VideoMeta = { duration: number | null; width: number | null; height: number | null; playable: boolean }
/** Problems ('tooBig', 'tooLong', 'notVideo') stop a video being sent; the rest are gentle notes. */
export type VideoNote = 'tooBig' | 'tooLong' | 'notVideo' | 'long' | 'sideways' | 'noPreview'
export const VIDEO_PROBLEMS: readonly VideoNote[] = ['tooBig', 'tooLong', 'notVideo']

const TYPE_FOR_EXT: Record<string, string> = {
  mov: 'video/quicktime',
  qt: 'video/quicktime',
  mp4: 'video/mp4',
  m4v: 'video/x-m4v',
  webm: 'video/webm',
  '3gp': 'video/3gpp',
  '3g2': 'video/3gpp2',
}
const EXT_FOR_TYPE: Record<string, string> = { 'video/quicktime': 'mov', 'video/mp4': 'mp4', 'video/x-m4v': 'm4v', 'video/webm': 'webm', 'video/3gpp': '3gp', 'video/3gpp2': '3g2' }

function extOf(name: string): string {
  return name.match(/\.([a-z0-9]{2,5})$/i)?.[1].toLowerCase() ?? ''
}

/** The file's content type. Some browsers leave it empty, so fall back to the extension. */
export function videoType(file: VideoFile): string {
  return file.type || TYPE_FOR_EXT[extOf(file.name)] || ''
}

export function isVideoFile(file: VideoFile): boolean {
  return videoType(file).startsWith('video/')
}

export function videoExtension(file: VideoFile): string {
  const ext = extOf(file.name)
  if (ext) return ext
  return EXT_FOR_TYPE[videoType(file)] ?? 'mp4'
}

/** Problems first, then notes. `meta` is null while the page is still reading the file. */
export function videoNotes(file: VideoFile, meta: VideoMeta | null): VideoNote[] {
  if (!isVideoFile(file)) return ['notVideo']
  const notes: VideoNote[] = []
  const duration = meta?.duration ?? null
  if (file.size > VIDEO_MAX_BYTES) notes.push('tooBig')
  else if (duration !== null && duration > VIDEO_MAX_SECONDS) notes.push('tooLong')
  else if (duration !== null && duration > VIDEO_LONG_AFTER_SECONDS) notes.push('long')
  if (meta?.width && meta.height && meta.width > meta.height) notes.push('sideways')
  if (meta && !meta.playable) notes.push('noPreview')
  return notes
}

export function videoRefused(notes: readonly VideoNote[]): boolean {
  return notes.some((n) => VIDEO_PROBLEMS.includes(n))
}

/** Decimal units, as phones show them: "840 KB", "9.4 MB", "91 MB", "1.2 GB". */
export function formatBytes(bytes: number): string {
  if (bytes < 1e6) return `${Math.max(1, Math.round(bytes / 1e3))} KB`
  if (bytes < 1e9) {
    const mb = bytes / 1e6
    return `${mb < 10 ? mb.toFixed(1) : Math.round(mb)} MB`
  }
  return `${(bytes / 1e9).toFixed(1)} GB`
}

/** "38 of 91 MB": both numbers in the total's unit. */
export function formatAmount(loaded: number, total: number): string {
  const [div, unit] = total < 1e6 ? [1e3, 'KB'] : total < 1e9 ? [1e6, 'MB'] : [1e9, 'GB']
  const fmt = (n: number) => (unit === 'GB' || n / div < 10 ? (n / div).toFixed(1) : String(Math.round(n / div)))
  return `${fmt(Math.min(loaded, total))} of ${fmt(total)} ${unit}`
}

/** m:ss, or "" when the length isn't known. */
export function formatDuration(seconds: number | null | undefined): string {
  if (seconds === null || seconds === undefined || !Number.isFinite(seconds)) return ''
  const s = Math.round(seconds)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

// ---------- Names and email ----------

export function cleanText(raw: unknown): string {
  return typeof raw === 'string' ? raw.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim() : ''
}

export function checkNames(names: string): 'missing' | 'too-long' | null {
  if (!names) return 'missing'
  if (names.length > NAMES_MAX) return 'too-long'
  return null
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function checkEmail(email: string): 'missing' | 'invalid' | null {
  if (!email) return 'missing'
  if (email.length > EMAIL_MAX || !EMAIL.test(email)) return 'invalid'
  return null
}

/** "Sam Rivera" → "Sam"; "Sam and Jamie Rivera" or "Sam Rivera & Jamie Lee" → "Sam and Jamie". */
export function firstNamesFrom(names: string): string {
  const parts = names
    .split(/\s+(?:and|&|\+)\s+|\s*,\s*|\s*&\s*/i)
    .map((p) => p.trim().split(/\s+/)[0])
    .filter(Boolean)
  if (parts.length <= 1) return parts[0] ?? ''
  return `${parts.slice(0, -1).join(', ')} and ${parts[parts.length - 1]}`
}

// ---------- The sign-off ----------

/** What a client agreed to, as the upload route receives it. */
export type SignOff = { who: Who; names: string; email: string; naming: Naming; version: string }
export type SignOffInput = { who: Who; names: string; email: string; naming: Naming; agreed: boolean }
export type SignOffProblems = { names?: 'missing' | 'too-long'; email?: 'missing' | 'invalid'; agreed?: 'missing' }

export function checkSignOff(input: SignOffInput): SignOffProblems {
  const problems: SignOffProblems = {}
  const names = checkNames(cleanText(input.names))
  if (names) problems.names = names
  const email = checkEmail(cleanText(input.email))
  if (email) problems.email = email
  if (!input.agreed) problems.agreed = 'missing'
  return problems
}

/** The server's reading of the sign-off. Null unless every part is there and agreed under the current version. */
export function parseSignOff(raw: unknown): SignOff | null {
  if (!raw || typeof raw !== 'object') return null
  const p = raw as Record<string, unknown>
  const who: Who | null = p.who === 'me' || p.who === 'two' ? p.who : null
  const naming = NAMINGS.find((n) => n === p.naming) ?? null
  const names = cleanText(p.names)
  const email = cleanText(p.email)
  if (!who || !naming || p.agreed !== true || p.version !== TESTIMONIAL_SIGN_OFF.version) return null
  if (checkNames(names) || checkEmail(email)) return null
  return { who, names, email, naming, version: TESTIMONIAL_SIGN_OFF.version }
}

export function namingLabel(naming: Naming): string {
  return TESTIMONIAL_SIGN_OFF.naming.options.find((o) => o.value === naming)?.label ?? naming
}

/** The record kept with each video: what they agreed to, word for word, and when. Plain text. */
export function signOffRecord(s: SignOff & { signedAt: Date; fileName: string; size?: number }): string {
  const lines = [
    'Compass Design Studio · testimonial video sign-off',
    '',
    `Signed by: ${s.names}`,
    `Email: ${s.email}`,
    `Recorded by: ${s.who === 'two' ? 'more than one person' : 'one person'}`,
    `Signed at: ${s.signedAt.toISOString().replace('T', ' ').slice(0, 19)} UTC`,
    `Video: ${s.fileName || 'unnamed'}${s.size ? `, ${formatBytes(s.size)}` : ''}`,
    `Wording: version ${s.version}`,
    '',
    TESTIMONIAL_SIGN_OFF.lead,
    ...TESTIMONIAL_SIGN_OFF.terms[s.who].map((t) => `- ${t}`),
    '',
    `${TESTIMONIAL_SIGN_OFF.naming.question} ${namingLabel(s.naming)}`,
    '',
    `[x] ${TESTIMONIAL_SIGN_OFF.agree[s.who]}`,
    '',
    `${TESTIMONIAL_SIGN_OFF.details.label}:`,
    ...TESTIMONIAL_SIGN_OFF.details.items.map((t) => `- ${t}`),
  ]
  return lines.join('\n')
}

// ---------- The upload ----------

/** What the page sends with its upload-token request. */
export type UploadClaim = { signOff: SignOff; fileName: string; duration: number | null; token: string; trapped: boolean }

export function uploadPayload(input: { signOff: SignOffInput; fileName: string; duration: number | null; token: string; website: string }): string {
  const { signOff } = input
  return JSON.stringify({
    signOff: { ...signOff, names: cleanText(signOff.names), email: cleanText(signOff.email), version: TESTIMONIAL_SIGN_OFF.version },
    fileName: cleanText(input.fileName).slice(0, 200),
    duration: input.duration,
    token: input.token,
    website: input.website,
  })
}

export function parseUploadPayload(raw: string | null | undefined): UploadClaim | null {
  if (!raw || raw.length > 4000) return null
  let p: Record<string, unknown>
  try {
    p = JSON.parse(raw)
    if (!p || typeof p !== 'object') return null
  } catch {
    return null
  }
  const signOff = parseSignOff(p.signOff)
  if (!signOff) return null
  const duration = typeof p.duration === 'number' && Number.isFinite(p.duration) && p.duration > 0 ? p.duration : null
  return {
    signOff,
    fileName: cleanText(p.fileName).slice(0, 200),
    duration,
    token: typeof p.token === 'string' ? p.token : '',
    trapped: typeof p.website === 'string' && p.website.trim() !== '',
  }
}

function slug(text: string): string {
  const s = text
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .slice(0, 40)
    .replace(/^-+|-+$/g, '')
  return s || 'client'
}

export function uploadPathname(names: string, file: VideoFile, now: Date): string {
  return `${UPLOAD_PREFIX}${now.toISOString().slice(0, 10)}-${slug(names)}.${videoExtension(file)}`
}

/** Pathnames the server will issue an upload token for. */
export function isUploadPathname(pathname: string): boolean {
  return /^testimonials\/\d{4}-\d{2}-\d{2}-[a-z0-9-]{1,40}\.[a-z0-9]{2,5}$/.test(pathname)
}
