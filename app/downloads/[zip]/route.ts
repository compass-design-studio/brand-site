// Every zip is built once, at build time, from the files in public/logos.
// Each holds whatever formats exist for its marks: SVG today, PNG and PDF once exported.

import { existsSync, readFileSync } from 'node:fs'
import { zipSync, type Zippable } from 'fflate'
import { ZIPS, zipBySlug } from '@/lib/downloads'
import { FORMATS, markPath } from '@/lib/marks'

export const dynamic = 'force-static'
export const dynamicParams = false

export function generateStaticParams() {
  return ZIPS.map((z) => ({ zip: `${z.slug}.zip` }))
}

// A fixed date keeps the archives identical from build to build.
const MTIME = new Date('2026-10-21T12:00:00Z')

export async function GET(_request: Request, { params }: { params: Promise<{ zip: string }> }) {
  const { zip } = await params
  const def = zipBySlug(zip.replace(/\.zip$/, ''))
  if (!def) return new Response('Not found', { status: 404 })

  const entries: Zippable = {}
  for (const file of def.files) {
    for (const ext of FORMATS) {
      const p = markPath(file, ext)
      if (existsSync(p)) entries[`${def.slug}/${file}.${ext}`] = [readFileSync(p), { mtime: MTIME }]
    }
  }

  const body = zipSync(entries, { level: 9 })
  return new Response(body, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': `attachment; filename="${def.slug}.zip"`,
    },
  })
}
