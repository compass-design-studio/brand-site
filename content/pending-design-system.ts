// ==========================================================================================
//  PENDING THE DESIGN SYSTEM (ADR 0001)
// ==========================================================================================
//
// Everything in this file is brand wording, a brand number or a page-level difference that
// the site uses but the design system README doesn't have yet. Canyon picked each of them in
// the prototype on 21 October 2026 (docs/prototype-options.md, "Decisions from the
// prototype"). Under ADR 0001 the design system gets them first:
//
//   1. Add the item to the design system (or record the page-level difference in an ADR).
//   2. Move its value into content/brand.ts and delete it here.
//
// Don't launch to production while anything is left in PENDING below. Nothing else in this
// repo may add brand wording; if a page needs some, it goes here and into PENDING.

import type { FormKey } from '@/lib/mark-names'

export type PendingItem = { id: string; what: string; usedIn: string }

export const PENDING: PendingItem[] = [
  { id: 'min-sizes', what: 'Final minimum sizes in px and mm for every form, including the larger two-tone and gold deep sizes and the 16 px tile floor (README has only the wordmark and glyph, "for now").', usedIn: 'Usage disclosures, the Minimum size plate, the two-tone notes' },
  { id: 'use-for', what: '"Use it for" lines for each form, tile and wordmark bar (README asks for them under Marks; only the favicon and email tile lines exist).', usedIn: 'Usage disclosures, tiles and bars' },
  { id: 'two-color', what: 'The two-tone and reversed notes: what they are for, one per piece, two-tone on Paper or white and reversed on solid Ink (narrower than the README, which also allows reversed on dark photos), proof two-tone first, and what they are not for.', usedIn: 'Two-tone and reversed · For special moments' },
  { id: 'gold-deep-on-ink', what: 'Gold deep on Ink shown as a visual check that stays off the approved list (README doesn\'t mention it).', usedIn: 'Approved backgrounds plate' },
  { id: 'filled-close', what: 'The page close uses a filled Ink button. The README\'s page anatomy and PageClose say "never a filled button", so the README needs updating or an ADR must record this page-level difference.', usedIn: 'Page close' },
  { id: 'menu-breakpoint', what: 'The top bar folds into the two-bar menu below 1080 px (README: 900 px), and its "Brand resources" label hides below 1240 px, because the bar carries eight section links and a request button.', usedIn: 'Top bar' },
]

// ---------- min-sizes ----------

export type MinSize = { px: number; mm: number }
export type MinSizeRow = {
  form: FormKey
  label: string
  /** Navy ink, paper, light gold and reversed. */
  standard: MinSize
  /** Two-tone and gold deep, a third larger. For the glyph, gold deep only. */
  larger: MinSize
  axis: 'wide' | 'tall'
}

export const MIN_SIZES: MinSizeRow[] = [
  { form: 'wordmark', label: 'Wordmark', standard: { px: 120, mm: 32 }, larger: { px: 160, mm: 40 }, axis: 'wide' },
  { form: 'lockup-horizontal', label: 'Horizontal lockup', standard: { px: 200, mm: 50 }, larger: { px: 260, mm: 65 }, axis: 'wide' },
  { form: 'lockup-stacked', label: 'Stacked lockup', standard: { px: 140, mm: 36 }, larger: { px: 180, mm: 45 }, axis: 'wide' },
  { form: 'glyph', label: 'Glyph', standard: { px: 24, mm: 6 }, larger: { px: 32, mm: 8 }, axis: 'tall' },
]

export const MIN_SIZE_NOTE = 'Two-tone and gold deep marks are a third larger, because their gold deep parts have the least contrast.'
export const TILE_MIN_NOTE = 'No glyph minimum inside a tile. A tile may fill a frame made for it, down to a 16 px favicon.'

// ---------- use-for ----------

export const FORM_USE_FOR: Record<FormKey, string> = {
  wordmark: 'Everyday use: documents, slides, web pages and social posts.',
  'lockup-horizontal': 'Wide formats that introduce the studio: signage, covers, proposals.',
  'lockup-stacked': 'Signage, stationery, covers.',
  glyph: 'Where the name already appears or space is tight: ornaments, stamps.',
}

export const TILE_USE_FOR: Record<string, string> = {
  'compass-tile-navy-ink-on-light-gold': 'Favicon and app icon.',
  'compass-tile-light-gold-on-ink': 'Profile pictures on dark layouts.',
  'compass-tile-ink-on-paper': 'Profile pictures on light layouts.',
  'compass-tile-email-light-gold-on-ink': 'Email signatures.',
  'compass-wordmark-bar-navy-deep-on-light-gold': 'Headers and merch that need their own background.',
  'compass-wordmark-bar-light-gold-on-navy-deep': 'Headers and merch that need their own background.',
}

// ---------- two-color ----------

const larger = (form: FormKey) => {
  const row = MIN_SIZES.find((r) => r.form === form)!
  return `${row.larger.px} px · ${row.larger.mm} mm`
}

export const TWO_COLOR = {
  lead: 'Our two-color marks: navy ink letters with a gold deep glyph, and their reversed pair on Ink. Save them for flat, type-led layouts with little or no imagery, where the gold glyph can carry the page.',
  useThemFor: [
    'Covers, title pages and slides, stationery, signage panels and typographic social posts.',
    'One per piece, as its main mark. Running heads, footers and small repeats use navy ink or light gold.',
    'Two-tone on Paper or white. Reversed on solid Ink.',
    `Large: wordmark at least ${larger('wordmark')}, horizontal lockup ${larger('lockup-horizontal')}, stacked lockup ${larger('lockup-stacked')}. Smaller, use navy ink.`,
    'In print, proof two-tone first: gold deep is only 3.18:1 on Paper.',
  ],
  notFor: [
    'Photos, textures or watercolors behind the mark. Use light gold or paper there.',
    'Paper 2 or Tan: the gold deep glyph drops to 2.91:1 and 2.74:1.',
    'Everyday documents and small sizes, where the navy ink wordmark does the job.',
  ],
  twoToneOn: 'On Paper or white',
  reversedOn: 'On Ink',
}

// ---------- gold-deep-on-ink ----------

export const GOLD_DEEP_ON_INK = {
  tag: 'For a visual check · not approved',
  body: 'It passes our 3:1 floor, but it stays off the approved list for now. Use light gold on Ink.',
}

// ---------- menu-breakpoint ----------

/** Widths in px. The design system's mobile nav starts at 900 px. */
export const NAV_BREAKPOINTS = { menu: 1080, brandLabel: 1240 }
