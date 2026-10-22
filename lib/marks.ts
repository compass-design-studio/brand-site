// Server-only helpers that read the mark files in public/logos at build time.

import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { ALL_MARK_FILES } from '@/lib/mark-names'

export const LOGO_DIR = path.join(process.cwd(), 'public', 'logos')

export type Format = 'svg' | 'png' | 'pdf'
export const FORMATS: Format[] = ['svg', 'png', 'pdf']

export function markPath(file: string, ext: Format): string {
  return path.join(LOGO_DIR, `${file}.${ext}`)
}

/** Which download formats exist for a mark. PNG and PDF are linked only once they're exported. */
export function formatsFor(file: string): Record<Format, boolean> {
  return { svg: existsSync(markPath(file, 'svg')), png: existsSync(markPath(file, 'png')), pdf: existsSync(markPath(file, 'pdf')) }
}

/** Whether every mark in the kit has the format. */
export function kitHas(ext: Format): boolean {
  return ALL_MARK_FILES.every((f) => existsSync(markPath(f, ext)))
}

const svgCache = new Map<string, string>()

export function readSvg(file: string): string {
  let text = svgCache.get(file)
  if (text === undefined) {
    text = readFileSync(markPath(file, 'svg'), 'utf8')
    svgCache.set(file, text)
  }
  return text
}

/** The mark's drawing without its outer <svg> element, for nesting inside a diagram. */
export function svgInner(file: string): string {
  return readSvg(file)
    .replace(/^[\s\S]*?<svg[^>]*>/, '')
    .replace(/<\/svg>\s*$/, '')
}
