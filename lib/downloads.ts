// The zips on offer: every mark, one per form, tiles and bars, and the special-moments set.
// app/downloads/[zip]/route.ts builds each one at build time.

import { ALL_MARK_FILES, FORMS, TILES, SPECIAL_COLORWAYS, formFiles, markFile, type FormKey } from '@/lib/mark-names'

export type ZipDef = { slug: string; label: string; files: string[] }

const form = (key: string) => FORMS.find((f) => f.key === key)!

export const ZIPS: ZipDef[] = [
  { slug: 'compass-marks-all', label: `All ${ALL_MARK_FILES.length} marks`, files: ALL_MARK_FILES },
  { slug: 'compass-wordmarks', label: 'Wordmarks', files: formFiles(form('wordmark')) },
  { slug: 'compass-lockups-horizontal', label: 'Horizontal lockups', files: formFiles(form('lockup-horizontal')) },
  { slug: 'compass-lockups-stacked', label: 'Stacked lockups', files: formFiles(form('lockup-stacked')) },
  { slug: 'compass-glyphs', label: 'Glyphs', files: formFiles(form('glyph')) },
  { slug: 'compass-tiles-and-bars', label: 'Tiles and wordmark bars', files: TILES.map((t) => t.file) },
  {
    slug: 'compass-two-tone-and-reversed',
    label: 'Two-tone and reversed',
    files: FORMS.filter((f) => f.colorways.includes('two-tone')).flatMap((f) => SPECIAL_COLORWAYS.map((c) => markFile(f.key, c))),
  },
]

export const zipBySlug = (slug: string) => ZIPS.find((z) => z.slug === slug)

export const ZIP = {
  all: zipBySlug('compass-marks-all')!,
  tiles: zipBySlug('compass-tiles-and-bars')!,
  special: zipBySlug('compass-two-tone-and-reversed')!,
  forms: {
    wordmark: zipBySlug('compass-wordmarks')!,
    'lockup-horizontal': zipBySlug('compass-lockups-horizontal')!,
    'lockup-stacked': zipBySlug('compass-lockups-stacked')!,
    glyph: zipBySlug('compass-glyphs')!,
  } satisfies Record<FormKey, ZipDef>,
}

export function zipHref(zip: ZipDef): string {
  return `/downloads/${zip.slug}.zip`
}
