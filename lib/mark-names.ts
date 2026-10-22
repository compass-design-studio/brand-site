// The 28 marks under their ADR 0003 names, and what the site needs to show them.
// Safe to import from client components (no file system access).

import { COLORWAYS, type Colorway } from '@/content/brand'

export type FormKey = 'wordmark' | 'lockup-horizontal' | 'lockup-stacked' | 'glyph'

export type Form = {
  key: FormKey
  name: string
  plural: string
  colorways: Colorway[]
}

export const FORMS: Form[] = [
  { key: 'wordmark', name: 'Wordmark', plural: 'Wordmarks', colorways: ['navy-ink', 'two-tone', 'gold-deep', 'light-gold', 'reversed', 'paper'] },
  { key: 'lockup-horizontal', name: 'Horizontal lockup', plural: 'Horizontal lockups', colorways: ['navy-ink', 'two-tone', 'gold-deep', 'light-gold', 'reversed', 'paper'] },
  { key: 'lockup-stacked', name: 'Stacked lockup', plural: 'Stacked lockups', colorways: ['navy-ink', 'two-tone', 'gold-deep', 'light-gold', 'reversed', 'paper'] },
  { key: 'glyph', name: 'Glyph', plural: 'Glyphs', colorways: ['navy-ink', 'gold-deep', 'light-gold', 'paper'] },
]

export type Tile = { file: string; name: string; shape: 'square' | 'email' | 'bar' }

export const TILES: Tile[] = [
  { file: 'compass-tile-navy-ink-on-light-gold', name: 'Tile · navy ink on light gold', shape: 'square' },
  { file: 'compass-tile-light-gold-on-ink', name: 'Tile · light gold on Ink', shape: 'square' },
  { file: 'compass-tile-ink-on-paper', name: 'Tile · Ink on Paper', shape: 'square' },
  { file: 'compass-tile-email-light-gold-on-ink', name: 'Email tile · light gold on Ink', shape: 'email' },
  { file: 'compass-wordmark-bar-navy-deep-on-light-gold', name: 'Wordmark bar · navy deep on light gold', shape: 'bar' },
  { file: 'compass-wordmark-bar-light-gold-on-navy-deep', name: 'Wordmark bar · light gold on navy deep', shape: 'bar' },
]

/** The main light and dark pair for every form: navy ink and light gold. */
export const MAIN_PAIR: [Colorway, Colorway] = ['navy-ink', 'light-gold']
/** Kept for special moments, in their own section; each file appears once on the page. */
export const SPECIAL_COLORWAYS: Colorway[] = ['two-tone', 'reversed']

export function markFile(form: FormKey, colorway: Colorway): string {
  return `compass-${form}-${colorway}`
}

export function formFiles(form: Form): string[] {
  return form.colorways.map((c) => markFile(form.key, c))
}

export const ALL_MARK_FILES: string[] = [...FORMS.flatMap(formFiles), ...TILES.map((t) => t.file)]

export function markSrc(file: string, ext: 'svg' | 'png' | 'pdf' = 'svg'): string {
  return `/logos/${file}.${ext}`
}

/** Intrinsic size of each SVG, from its viewBox (checked against the files in a test). */
export function markSize(file: string): { width: number; height: number } {
  const f = file.replace(/^compass-/, '')
  if (f.startsWith('wordmark-bar-')) return { width: 1200, height: 313 }
  if (f.startsWith('tile-email-')) return { width: 350, height: 180 }
  if (f.startsWith('tile-')) return { width: 500, height: 500 }
  if (f.startsWith('lockup-horizontal-')) return { width: 3301, height: 400 }
  if (f.startsWith('lockup-stacked-')) return { width: 1800, height: 451 }
  if (f.startsWith('glyph-')) return { width: 836, height: 1358 }
  // The two-tone and reversed wordmarks sit on a slightly larger canvas.
  if (f === 'wordmark-two-tone' || f === 'wordmark-reversed') return { width: 1855, height: 340 }
  return { width: 1800, height: 330 }
}

const NAMED_PREFIXES: [string, string][] = [
  ['wordmark-bar-', 'wordmark bar'],
  ['tile-email-', 'email tile'],
  ['tile-', 'tile'],
  ['lockup-horizontal-', 'horizontal lockup'],
  ['lockup-stacked-', 'stacked lockup'],
  ['wordmark-', 'wordmark'],
  ['glyph-', 'glyph'],
]

/** "compass-lockup-horizontal-light-gold" → "Compass horizontal lockup, light gold" */
export function altFor(file: string): string {
  const f = file.replace(/^compass-/, '')
  for (const [prefix, name] of NAMED_PREFIXES) {
    if (f.startsWith(prefix)) return `Compass ${name}, ${f.slice(prefix.length).replace(/-/g, ' ')}`
  }
  return 'Compass mark'
}

export function colorwayCaption(colorway: Colorway): string {
  const c = COLORWAYS[colorway]
  return c.side === 'light' ? `${c.name} · for light backgrounds` : `${c.name} · for dark backgrounds & photos`
}
