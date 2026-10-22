// Brand content from the design system, the master record of the brand (ADR 0001):
// https://claude.ai/artifact/Rw1w5LKT3xh6SJpoXojNnV, project/README.md and project/tokens.json,
// read 21 October 2026. Kept in step by hand until the sync in issue #1.
//
// Wording here may be shortened but never changes meaning. Anything the site needs that the
// design system doesn't have yet lives in ./pending-design-system.ts, not here.

import { contrastRatio } from '@/lib/contrast'

// ---------- Palette (tokens.json, exact; ADR 0002 keeps these unchanged) ----------

export const COLORS = {
  navy: '#2A5D7E',
  'navy-deep': '#1F4A66',
  'navy-ink': '#133558',
  ink: '#1A2A36',
  paper: '#F7F4EE',
  'paper-2': '#EFEAE0',
  tan: '#E9E3DB',
  white: '#FFFFFF',
  gold: '#AD9A4C',
  'gold-deep': '#9C8842',
  'light-gold': '#E1C982',
} as const

export type ColorKey = keyof typeof COLORS

export type Swatch = { key: ColorKey; name: string; role: string }

// Roles are the tokens' "usage" notes, shortened.
export const SWATCHES: Swatch[] = [
  { key: 'navy', name: 'Navy', role: 'Icons, the info state, navy badges.' },
  { key: 'navy-deep', name: 'Navy deep', role: 'Headings and link text.' },
  { key: 'navy-ink', name: 'Navy ink', role: 'The wordmark and glyph on light backgrounds.' },
  { key: 'ink', name: 'Ink', role: 'Body text. Dark backgrounds: the footer, buttons.' },
  { key: 'paper', name: 'Paper', role: 'The page background. Text on Ink.' },
  { key: 'paper-2', name: 'Paper 2', role: 'Alternate bands and hovers.' },
  { key: 'tan', name: 'Tan', role: 'Quiet panels and cards.' },
  { key: 'gold', name: 'Gold', role: 'A fine pen line: rules, eyebrows, hovers. Never a fill.' },
  { key: 'gold-deep', name: 'Gold deep', role: 'The glyph and descriptor in two-tone marks.' },
  { key: 'light-gold', name: 'Light gold', role: 'Accents on Ink. The light gold wordmark.' },
]

export const STATUS_COLORS = [
  { name: 'Success', hex: '#3D8064' },
  { name: 'Warning', hex: '#C99A2E' },
  { name: 'Danger', hex: '#B04A3A' },
  { name: 'Info', hex: COLORS.navy, note: 'Navy' },
]

export const PAIRINGS: { fg: ColorKey; bg: ColorKey; title: string; use: string }[] = [
  { fg: 'ink', bg: 'paper', title: 'Ink on Paper', use: 'Body text' },
  { fg: 'navy-deep', bg: 'paper', title: 'Navy deep on Paper', use: 'Headings, links' },
  { fg: 'paper', bg: 'ink', title: 'Paper on Ink', use: 'Hero, footer' },
  { fg: 'light-gold', bg: 'ink', title: 'Light gold on Ink', use: 'Accents on dark' },
  { fg: 'navy-deep', bg: 'tan', title: 'Navy deep on Tan', use: 'Cards' },
  { fg: 'ink', bg: 'light-gold', title: 'Ink on light gold', use: 'Gold button' },
  { fg: 'paper', bg: 'navy', title: 'Paper on Navy', use: 'Navy badge' },
  { fg: 'ink', bg: 'white', title: 'Ink on white', use: 'Forms, cards' },
]

// ---------- Marks (README "Marks") ----------

export type Colorway = 'two-tone' | 'navy-ink' | 'gold-deep' | 'reversed' | 'paper' | 'light-gold'
export type Background = 'paper' | 'paper-2' | 'white' | 'tan' | 'ink' | 'photo'

export const BACKGROUND_NAMES: Record<Background, string> = {
  paper: 'Paper',
  'paper-2': 'Paper 2',
  white: 'White',
  tan: 'Tan',
  ink: 'Ink',
  photo: 'Dark areas of photos',
}

export type ColorwayInfo = {
  name: string
  side: 'light' | 'dark'
  /** Every color in the mark, for the 3:1 check against a background. */
  colors: ColorKey[]
  approved: Background[]
  approvedNote: string
}

export const COLORWAYS: Record<Colorway, ColorwayInfo> = {
  'two-tone': { name: 'Two-tone', side: 'light', colors: ['navy-ink', 'gold-deep'], approved: ['paper', 'white'], approvedNote: 'Paper and white only' },
  'navy-ink': { name: 'Navy ink', side: 'light', colors: ['navy-ink'], approved: ['paper', 'paper-2', 'white', 'tan'], approvedNote: 'Paper, Paper 2, white, Tan' },
  'gold-deep': { name: 'Gold deep', side: 'light', colors: ['gold-deep'], approved: ['paper', 'white'], approvedNote: 'Paper and white only' },
  reversed: { name: 'Reversed', side: 'dark', colors: ['paper', 'light-gold'], approved: ['ink', 'photo'], approvedNote: 'Ink and dark areas of photos' },
  paper: { name: 'Paper', side: 'dark', colors: ['paper'], approved: ['ink', 'photo'], approvedNote: 'Ink and dark areas of photos' },
  'light-gold': { name: 'Light gold', side: 'dark', colors: ['light-gold'], approved: ['ink', 'photo'], approvedNote: 'Ink and dark areas of photos' },
}

export const LIGHT_COLORWAYS: Colorway[] = ['navy-ink', 'two-tone', 'gold-deep']
export const DARK_COLORWAYS: Colorway[] = ['light-gold', 'reversed', 'paper']

/** The weakest contrast of any color in the colorway against a solid background. */
export function weakestRatio(colorway: Colorway, background: Exclude<Background, 'photo'>): number {
  return Math.min(...COLORWAYS[colorway].colors.map((c) => contrastRatio(COLORS[c], COLORS[background])))
}

// ---------- Usage rules (README "Usage rules"), shortened where shown in pictures ----------

export const USAGE = {
  startHere: "Not sure which mark to use? Use the navy ink wordmark on light backgrounds and the light gold one on dark backgrounds. They're our most used.",
  clearSpace:
    "Around the wordmark and lockups, leave the glyph's height on every side. Around the glyph alone, a quarter of its height, never less than 8 px or 2 mm, and half its height beside another logo.",
  clearSpaceForms: 'Leave the height of the glyph clear on every side. Nothing enters it: text, rules, photo or page edges, other logos.',
  clearSpaceGlyph: 'Leave a quarter of its height clear on every side: at least 8 px on screen or 2 mm in print. Beside another logo, half its height.',
  tile: "In a tile, the glyph is two-thirds of the tile's height, centered, and never more than 68%.",
  stepDown: "If it won't fit, step down: lockup, then wordmark, then glyph or tile.",
  contrast:
    "Every color in the mark keeps at least 3:1 on these. Anywhere else, use the colorway with the most contrast and check it where it's weakest; under 3:1, move the mark or use a tile.",
  contrastShort: "Every color in the mark keeps 3:1 on what's behind it.",
  photos: "Only over a calm, even area. If there isn't one, use a tile.",
  withOtherLogos: 'About the same visual size, at least our clear space between them, never merged. We approve every joint layout.',
  asSupplied: 'Use the marks as supplied, and keep the glyph as the A in COMPASS only.',
  colors: 'Brand colors only, plus pure black and white for one-color jobs.',
  colorsDetail:
    "Pure black and white are for one-color jobs only: single-color printing, embroidery, vinyl. Black and white files aren't in the kit yet, so ask us. Any other color, such as a material's own finish, needs Allison's or Canyon's approval for that one job.",
  whoMayUse: [
    { lead: 'Employees and contractors', rest: ', for studio work.' },
    { lead: 'Trade partners', rest: ', only to identify work done with or for the studio.' },
    { lead: '', rest: 'Ask us before putting a mark on anything sold, and never suggest we endorse another business.' },
    { lead: '', rest: 'Only Allison or Canyon approves a new, changed or retired mark. Nobody else makes one-off versions.' },
  ],
} as const

// ---------- Type, voice, icons, spacing, imagery (README "Visual foundations", tokens.json) ----------

export const TYPE_SCALE = [
  { name: 'Display', px: 64, sample: 'Small on purpose.', kind: 'display' },
  { name: 'Heading 2', px: 36, sample: "Who you'll work with.", kind: 'display' },
  { name: 'Heading 3', px: 28, sample: 'Hurricane Ranch', kind: 'display' },
  { name: 'Heading 4', px: 17, sample: 'Ready-to-build plans', kind: 'display' },
  { name: 'Lead', px: 21, sample: 'Kept small on purpose.', kind: 'lead' },
  { name: 'Body', px: 15, sample: 'We respond to every serious inquiry within the week.', kind: 'body' },
  { name: 'Small', px: 13, sample: 'No newsletter, no spam — just a reply from the studio.', kind: 'small' },
  { name: 'Eyebrow', px: 11, sample: 'The studio · Est MMXXV', kind: 'eyebrow' },
] as const

export const FONTS = [
  { name: 'Tenor Sans', use: 'Display and headings', href: 'https://fonts.google.com/specimen/Tenor+Sans', family: 'display' },
  { name: 'DM Sans', use: '300 · 400 · 500 · 600', href: 'https://fonts.google.com/specimen/DM+Sans', family: 'body' },
  { name: 'JetBrains Mono', use: 'Specs, hex values, numbers', href: 'https://fonts.google.com/specimen/JetBrains+Mono', family: 'mono' },
] as const

export const CASING = [
  { rule: 'Sentence case', example: 'Small on purpose.' },
  { rule: 'Title Case, for names only', example: 'Hurricane Ranch · Allison Browning' },
  { rule: 'Roman numerals, capstones', example: 'Est MMXXV · © MMXXVI' },
  { rule: 'The separator', example: 'New Market · 2026' },
  { rule: 'Ranges take an en dash', example: '$30,000 – $100,000 · 3–6 months' },
  { rule: 'Never', example: 'Exclamation points, emoji, "I", all caps in type' },
]

export const SPACING = [4, 8, 12, 16, 24, 32, 48, 64, 80, 112]

export const SHADOWS = [
  '0 1px 2px rgba(26,42,54,0.06)',
  '0 6px 16px -8px rgba(26,42,54,0.18)',
  '0 18px 36px -20px rgba(26,42,54,0.30)',
  '0 30px 60px -32px rgba(26,42,54,0.40)',
]

export const STUDIO = {
  name: 'Compass Design Studio',
  site: 'https://compass-design.studio',
  phone: '256-384-3539',
  instagram: 'compass_design.studio',
  founders: [
    { name: 'Allison Browning', title: 'Founder · Principal Designer', email: 'allison@compass-design.studio' },
    { name: 'Canyon Browning', title: 'Co-Founder · Managing Partner', email: 'canyon@compass-design.studio' },
  ],
  serviceLine: 'Residential Design · Interiors',
}
