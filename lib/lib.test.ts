import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import sitemap from '@/app/sitemap'
import { COLORS, COLORWAYS, weakestRatio } from '@/content/brand'
import { contrastRatio, formatRatio } from '@/lib/contrast'
import { ZIPS } from '@/lib/downloads'
import { ALL_MARK_FILES, altFor, markSize } from '@/lib/mark-names'
import { validateRequest } from '@/lib/request'
import { checkToken, composeEmail, createRateLimiter, issueToken, MIN_FILL_MS } from '@/lib/request-server'
import {
  checkSignOff,
  firstNamesFrom,
  formatAmount,
  formatBytes,
  isUploadPathname,
  parseUploadPayload,
  signOffRecord,
  uploadPathname,
  uploadPayload,
  VIDEO_MAX_BYTES,
  videoNotes,
  videoRefused,
  videoType,
  type SignOffInput,
} from '@/lib/testimonial'
import { CHUNK_BYTES, chunks, clientKey, composeClientEmail, composeVideoEmail, parseTokenPayload, takeFileName, tokenPayloadFor, type UploadInfo } from '@/lib/testimonial-server'
import { TESTIMONIAL_SIGN_OFF } from '@/content/site'

const LOGOS = path.join(process.cwd(), 'public', 'logos')

describe('contrast', () => {
  it('matches the ratios the design system quotes', () => {
    expect(formatRatio(contrastRatio(COLORS['gold-deep'], COLORS.paper))).toBe('3.18:1')
    expect(formatRatio(contrastRatio(COLORS.gold, COLORS.paper))).toBe('2.55:1')
    expect(formatRatio(contrastRatio(COLORS.ink, COLORS.paper))).toBe('13.39:1')
    expect(formatRatio(weakestRatio('two-tone', 'paper-2'))).toBe('2.91:1')
    expect(formatRatio(weakestRatio('gold-deep', 'tan'))).toBe('2.74:1')
  })

  it('approves backgrounds as the design system lists them', () => {
    expect(COLORWAYS.reversed.approved).toEqual(['ink'])
    expect(COLORWAYS['gold-deep'].approved).not.toContain('ink')
    expect(COLORWAYS['light-gold'].approved).toEqual(['ink', 'photo'])
  })

  it('never rounds a failing ratio up', () => {
    expect(formatRatio(2.999)).toBe('2.99:1')
  })
})

describe('marks', () => {
  it('lists exactly the 28 files in public/logos', () => {
    const files = readdirSync(LOGOS).filter((f) => f.endsWith('.svg')).map((f) => f.replace(/\.svg$/, ''))
    expect([...ALL_MARK_FILES].sort()).toEqual(files.sort())
    expect(ALL_MARK_FILES).toHaveLength(28)
  })

  it('knows each file’s viewBox', () => {
    for (const file of ALL_MARK_FILES) {
      const svg = readFileSync(path.join(LOGOS, `${file}.svg`), 'utf8')
      const [, , w, h] = svg.match(/viewBox="([^"]+)"/)![1].split(/\s+/).map(Number)
      expect(markSize(file), file).toEqual({ width: w, height: h })
    }
  })

  it('names marks for alt text', () => {
    expect(altFor('compass-lockup-horizontal-light-gold')).toBe('Compass horizontal lockup, light gold')
    expect(altFor('compass-wordmark-bar-light-gold-on-navy-deep')).toBe('Compass wordmark bar, light gold on navy deep')
  })

  it('puts every mark in the all-marks zip, and each file in one form zip at most', () => {
    expect(ZIPS[0].files).toEqual(ALL_MARK_FILES)
    const perForm = ZIPS.filter((z) => /wordmarks|lockups|glyphs|tiles/.test(z.slug)).flatMap((z) => z.files)
    expect(new Set(perForm).size).toBe(28)
  })
})

describe('request validation', () => {
  const good = { type: 'file', which: 'A black or white version', details: 'For a vinyl truck decal.', name: 'Pat Lee', email: 'pat@example.com' }

  it('accepts a complete request', () => {
    expect(validateRequest(good)).toEqual({ ok: true, value: good })
  })

  it('names each missing field', () => {
    const r = validateRequest({ type: 'correction' })
    expect(r.ok).toBe(false)
    if (!r.ok) expect(Object.keys(r.errors).sort()).toEqual(['details', 'email', 'name', 'which'])
  })

  it('drops the which field for questions and rejects unknown options', () => {
    const q = validateRequest({ ...good, type: 'question', which: 'anything' })
    expect(q.ok && q.value.which).toBe('')
    const bad = validateRequest({ ...good, which: 'Not an option' })
    expect(!bad.ok && bad.errors.which).toBe('Select one.')
  })

  it('limits links and length', () => {
    const links = Array.from({ length: 6 }, (_, i) => `https://x.test/${i}`).join(' ')
    expect(validateRequest({ ...good, details: links }).ok).toBe(false)
    expect(validateRequest({ ...good, details: 'a'.repeat(4001) }).ok).toBe(false)
  })
})

describe('spam checks', () => {
  const secret = 'test-secret'

  it('accepts a token after the minimum fill time', () => {
    const t = issueToken(1_000_000, secret)
    expect(checkToken(t, 1_000_000 + MIN_FILL_MS - 1, secret)).toBe('too-fast')
    expect(checkToken(t, 1_000_000 + MIN_FILL_MS, secret)).toBe('ok')
    expect(checkToken(t, 1_000_000 + 25 * 3600_000, secret)).toBe('expired')
  })

  it('rejects forged tokens', () => {
    expect(checkToken('1000.abc', 9_000_000, secret)).toBe('invalid')
    expect(checkToken(issueToken(1000, 'other'), 9_000_000, secret)).toBe('invalid')
    expect(checkToken(undefined, 0, secret)).toBe('invalid')
  })

  it('rate-limits per key within the window', () => {
    const allow = createRateLimiter(2, 1000)
    expect([allow('a', 0), allow('a', 1), allow('a', 2), allow('b', 2), allow('a', 1001)]).toEqual([true, true, false, true, true])
  })

  it('keeps the subject on one line', () => {
    const { subject, text } = composeEmail({ type: 'correction', which: 'Color', details: 'Tan hex looks off.', name: 'Pat\r\nBcc: x@y.z', email: 'pat@example.com' })
    expect(subject).toBe('Brand resources · A correction · Pat Bcc: x@y.z')
    expect(text).toContain('Section: Color')
  })
})

describe('testimonial page', () => {
  const mov = { name: 'IMG_0412.MOV', type: 'video/quicktime', size: 180_000_000 }
  const portrait = { duration: 58, width: 1080, height: 1920, playable: true }
  const signOff: SignOffInput = { who: 'two', names: ' Sam and Jamie\r\nRivera ', email: 'sam@example.com', naming: 'first-names', agreed: true }

  it('takes phone videos, even when the browser leaves out the type', () => {
    expect(videoNotes(mov, portrait)).toEqual([])
    expect(videoNotes({ name: 'VID_20261022.mp4', type: '', size: 50_000_000 }, null)).toEqual([])
    expect(videoType({ name: 'clip.MOV', type: '', size: 1 })).toBe('video/quicktime')
  })

  it('refuses a file over 1 GB, a take over three minutes, or something that isn\u2019t a video', () => {
    expect(VIDEO_MAX_BYTES).toBe(1_000_000_000)
    expect(videoNotes({ ...mov, size: VIDEO_MAX_BYTES + 1 }, portrait)).toContain('tooBig')
    expect(videoNotes(mov, { ...portrait, duration: 181 })).toContain('tooLong')
    expect(videoNotes({ name: 'kitchen.jpg', type: 'image/jpeg', size: 1024 }, null)).toEqual(['notVideo'])
    expect(videoRefused(['tooBig'])).toBe(true)
  })

  it('only notes a long or sideways take, and still takes it', () => {
    const notes = videoNotes(mov, { duration: 95, width: 1920, height: 1080, playable: false })
    expect(notes).toEqual(['long', 'sideways', 'noPreview'])
    expect(videoRefused(notes)).toBe(false)
  })

  it('formats sizes the way phones show them', () => {
    expect(formatBytes(91_400_000)).toBe('91 MB')
    expect(formatBytes(9_400_000)).toBe('9.4 MB')
    expect(formatAmount(38_000_000, 91_000_000)).toBe('38 of 91 MB')
  })

  it('finds first names for the thank-you', () => {
    expect(firstNamesFrom('Sam Rivera')).toBe('Sam')
    expect(firstNamesFrom('Sam and Jamie Rivera')).toBe('Sam and Jamie')
    expect(firstNamesFrom('Sam Rivera & Jamie Lee')).toBe('Sam and Jamie')
  })

  it('needs names, an email and the box ticked before sending', () => {
    expect(checkSignOff(signOff)).toEqual({})
    expect(checkSignOff({ ...signOff, names: ' ', email: 'sam@', agreed: false })).toEqual({ names: 'missing', email: 'invalid', agreed: 'missing' })
  })

  it('carries the sign-off to the server and spots the trap field', () => {
    const payload = uploadPayload({ signOff, fileName: 'IMG_0412.MOV', duration: 58, token: 't', website: '' })
    const claim = parseUploadPayload(payload)
    expect(claim?.signOff).toEqual({ who: 'two', names: 'Sam and Jamie Rivera', email: 'sam@example.com', naming: 'first-names', version: TESTIMONIAL_SIGN_OFF.version })
    expect(claim?.trapped).toBe(false)
    expect(parseUploadPayload(uploadPayload({ signOff, fileName: 'x.mov', duration: null, token: 't', website: 'https://x.test' }))?.trapped).toBe(true)
  })

  it('refuses an upload without a full sign-off', () => {
    expect(parseUploadPayload(uploadPayload({ signOff: { ...signOff, agreed: false }, fileName: 'x.mov', duration: null, token: 't', website: '' }))).toBeNull()
    const stale = JSON.parse(uploadPayload({ signOff, fileName: 'x.mov', duration: null, token: 't', website: '' }))
    stale.signOff.version = '0'
    expect(parseUploadPayload(JSON.stringify(stale))).toBeNull()
    expect(parseUploadPayload('not json')).toBeNull()
  })

  it('keeps the sign-off word for word, with the naming choice and the time', () => {
    const record = signOffRecord({ ...parseUploadPayload(uploadPayload({ signOff, fileName: 'IMG_0412.MOV', duration: 58, token: 't', website: '' }))!.signOff, signedAt: new Date('2026-10-23T15:04:05Z'), fileName: 'IMG_0412.MOV', size: 180_000_000 })
    expect(record).toContain('Signed by: Sam and Jamie Rivera')
    expect(record).toContain('Signed at: 2026-10-23 15:04:05 UTC')
    expect(record).toContain(`Wording: version ${TESTIMONIAL_SIGN_OFF.version}`)
    for (const term of TESTIMONIAL_SIGN_OFF.terms.two) expect(record).toContain(term)
    expect(record).toContain('First names only')
    expect(record).toContain(TESTIMONIAL_SIGN_OFF.agree.two)
  })

  it('names the Blob file by date and names, in a form the server accepts', () => {
    const pathname = uploadPathname('Zo\u00eb & Sam  Lee', mov, new Date('2026-10-22T15:00:00Z'))
    expect(pathname).toBe('testimonials/2026-10-22-zoe-sam-lee.mov')
    expect(isUploadPathname(pathname)).toBe(true)
    expect(isUploadPathname('testimonials/../2026-10-22-x.mov')).toBe(false)
    expect(isUploadPathname('logos/2026-10-22-x.mov')).toBe(false)
  })

  it("doesn't take a request form token for an upload", () => {
    const t = issueToken(1_000_000, 'secret', 'testimonial')
    expect(checkToken(t, 1_000_000 + MIN_FILL_MS, 'secret', 'testimonial')).toBe('ok')
    expect(checkToken(t, 1_000_000 + MIN_FILL_MS, 'secret')).toBe('invalid')
  })

  it('stays out of the sitemap', () => {
    expect(sitemap().map((e) => e.url).some((u) => u.includes('/testimonial'))).toBe(false)
  })
})

describe('testimonial delivery', () => {
  const info: UploadInfo = {
    signOff: { who: 'me', names: 'Sam Lee', email: 'sam@example.com', naming: 'names-town', version: TESTIMONIAL_SIGN_OFF.version },
    signedAt: '2026-10-23T15:04:05.000Z',
    fileName: 'IMG_0412.MOV',
    duration: 58,
  }
  const pathname = 'testimonials/2026-10-23-sam-lee-K3j9xQ.mov'

  it('reads back the sign-off it put in the upload token', () => {
    expect(parseTokenPayload(tokenPayloadFor(info))).toEqual(info)
    expect(parseTokenPayload('{}')).toBeNull()
    expect(parseTokenPayload(null)).toBeNull()
  })

  it('cuts the video into whole pieces for Drive, in order', async () => {
    expect(CHUNK_BYTES % (256 * 1024)).toBe(0)
    const parts = [[1, 2, 3, 4, 5], [6, 7, 8, 9, 10, 11, 12], [13]]
    const stream = new ReadableStream<Uint8Array>({
      start(c) {
        parts.forEach((p) => c.enqueue(new Uint8Array(p)))
        c.close()
      },
    })
    const pieces: number[][] = []
    for await (const piece of chunks(stream, 4)) pieces.push([...piece])
    expect(pieces).toEqual([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13]])
  })

  it('names the Drive files by date, the names the client typed, and the take', () => {
    expect(takeFileName('Sam Lee', pathname, 1, 'video')).toBe('2026-10-23 Sam Lee, take 1.mov')
    expect(takeFileName('Sam Lee', pathname, 2, 'sign-off')).toBe('2026-10-23 Sam Lee, take 2 sign-off.txt')
  })

  it('keeps one folder per client, keyed by their email', () => {
    expect(clientKey('Sam@Example.com ', 'Sam Lee')).toBe(clientKey('sam@example.com', 'Sam and Jamie Lee'))
    expect(clientKey('sam@example.com', 'Sam Lee')).not.toBe(clientKey('jamie@example.com', 'Sam Lee'))
    expect(clientKey('sam@example.com', 'Sam Lee')).toHaveLength(32)
  })

  it('tells the founders where the video is, and quotes the sign-off', () => {
    const record = 'RECORD'
    const copied = composeVideoEmail({
      info,
      size: 184_000_000,
      drive: { kind: 'copied', link: 'https://drive.google.com/file/d/abc/view', folderLink: 'https://drive.google.com/drive/folders/f', take: 1, blobDeleted: true, madeNewHome: false },
      pathname,
      record,
    })
    expect(copied.subject).toBe('Testimonial · Selfie video from Sam Lee')
    expect(copied.text).toContain('Video: IMG_0412.MOV, 184 MB, 0:58')
    expect(copied.text).toContain('Name it as: First names and town')
    expect(copied.text).toContain('Google Drive: https://drive.google.com/file/d/abc/view (take 1)')
    expect(copied.text).toContain('Their folder: https://drive.google.com/drive/folders/f')
    expect(copied.text).not.toContain("couldn't find its Client Testimonials folder")
    expect(copied.text).toContain('Vercel Blob: deleted, now that Drive has it.')
    expect(copied.text).toContain('RECORD')
    const failed = composeVideoEmail({ info, size: 184_000_000, drive: { kind: 'failed' }, pathname, record, downloadUrl: 'https://blob.test/v' })
    expect(failed.text).toContain("the copy failed, so it's only in Vercel Blob")
    expect(failed.text).toContain('https://blob.test/v (this link works for 7 days)')
  })

  it('sends the client a copy of what they agreed to', () => {
    const email = composeClientEmail({ info, record: 'RECORD' })
    expect(email.text.startsWith('Hi Sam,')).toBe(true)
    expect(email.text).toContain('RECORD')
    expect(email.text).not.toMatch(/!/)
  })
})
