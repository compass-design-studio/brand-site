import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { COLORS, weakestRatio } from '@/content/brand'
import { contrastRatio, formatRatio } from '@/lib/contrast'
import { ZIPS } from '@/lib/downloads'
import { ALL_MARK_FILES, altFor, markSize } from '@/lib/mark-names'
import { validateRequest } from '@/lib/request'
import { checkToken, composeEmail, createRateLimiter, issueToken, MIN_FILL_MS } from '@/lib/request-server'

const LOGOS = path.join(process.cwd(), 'public', 'logos')

describe('contrast', () => {
  it('matches the ratios the design system quotes', () => {
    expect(formatRatio(contrastRatio(COLORS['gold-deep'], COLORS.paper))).toBe('3.18:1')
    expect(formatRatio(contrastRatio(COLORS.gold, COLORS.paper))).toBe('2.55:1')
    expect(formatRatio(contrastRatio(COLORS.ink, COLORS.paper))).toBe('13.39:1')
    expect(formatRatio(weakestRatio('two-tone', 'paper-2'))).toBe('2.91:1')
    expect(formatRatio(weakestRatio('gold-deep', 'tan'))).toBe('2.74:1')
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
