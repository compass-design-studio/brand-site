// The link preview for shared links, drawn at build time from the paper wordmark master.

import { ImageResponse } from 'next/og'
import { COLORS } from '@/content/brand'
import { HERO } from '@/content/site'
import { markSize } from '@/lib/mark-names'
import { readSvg } from '@/lib/marks'

export const alt = 'Compass wordmark in paper on Ink, above the words “Brand resources”'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const MARK = 'compass-wordmark-paper'
const MARK_WIDTH = 560

/** Tenor Sans from Google Fonts, cut down to the characters drawn. next/font doesn't hand out font files. */
async function tenorSans(text: string): Promise<ArrayBuffer> {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=Tenor+Sans&text=${encodeURIComponent(text)}`)).text()
  const src = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1]
  if (!src) throw new Error('Tenor Sans: no font file in the Google Fonts response')
  const res = await fetch(src)
  if (!res.ok) throw new Error(`Tenor Sans: ${res.status} fetching ${src}`)
  return res.arrayBuffer()
}

export default async function OpengraphImage() {
  const mark = markSize(MARK)
  // The glyph runs the wordmark's full height, so its clear space is that height on every side.
  const markHeight = Math.round((MARK_WIDTH * mark.height) / mark.width)
  const src = `data:image/svg+xml;base64,${Buffer.from(readSvg(MARK)).toString('base64')}`
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: markHeight,
          background: COLORS.ink,
        }}
      >
        <img src={src} width={MARK_WIDTH} height={markHeight} alt="" />
        <div style={{ fontFamily: 'Tenor Sans', fontSize: 44, lineHeight: 1, color: COLORS.paper }}>{HERO.kicker}</div>
      </div>
    ),
    { ...size, fonts: [{ name: 'Tenor Sans', data: await tenorSans(HERO.kicker), weight: 400, style: 'normal' }] },
  )
}
