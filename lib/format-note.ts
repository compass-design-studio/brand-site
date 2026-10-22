import { kitHas } from '@/lib/marks'

/** What the page says about formats that haven't been exported yet; undefined once they all exist. */
export function formatsNote(): string | undefined {
  const missing = (['png', 'pdf'] as const).filter((ext) => !kitHas(ext)).map((ext) => ext.toUpperCase())
  if (!missing.length) return undefined
  return `SVG for now. ${missing.join(' and ')} files are being exported; until then, ask us for one.`
}

/** "SVG · PNG · PDF", or only the formats every mark has. */
export function kitFormats(): string {
  return (['svg', 'png', 'pdf'] as const).filter((ext) => ext === 'svg' || kitHas(ext)).map((e) => e.toUpperCase()).join(' · ')
}
