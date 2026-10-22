// Diagrams drawn from the mark files themselves and the design system's numbers (ADR 0004).
// The marks are nested unchanged; only the construction lines around them are drawn here.

import type { FormKey } from '@/lib/mark-names'
import { altFor, markSize, markSrc } from '@/lib/mark-names'
import { svgInner } from '@/lib/marks'

const GOLD_DEEP = '#9C8842'
const INK = '#1A2A36'
const PARTNER = '#3D4247'
// Inline styles, because SVG presentation attributes don't resolve CSS variables.
const MONO = 'var(--font-mono)'
const SANS = 'var(--font-body)'

/** Where the art sits inside each file, in the file's own units (measured from the paths). */
const ART: Record<FormKey | 'wordmark-wide', { box: [number, number, number, number]; glyphH: number }> = {
  wordmark: { box: [0, 0, 1800, 329.5], glyphH: 329.5 },
  'wordmark-wide': { box: [0, 0, 1854.4, 339.5], glyphH: 339.5 },
  'lockup-horizontal': { box: [45, 30.3, 3211.1, 339.5], glyphH: 339.5 },
  'lockup-stacked': { box: [0, 0, 1800, 450.4], glyphH: 329.5 },
  glyph: { box: [0, 0, 836, 1358], glyphH: 1358 },
}

/** The horizontal lockup's file is a little wider than its art; sizes are set by the art. */
export const ART_WIDTH_SCALE: Partial<Record<FormKey, number>> = { 'lockup-horizontal': 3301 / 3211.1 }

/** A mark placed inside a diagram at its own size, at (x, y), by reference to its file. */
function Nested({ file, x = 0, y = 0, scale = 1 }: { file: string; x?: number; y?: number; scale?: number }) {
  const { width, height } = markSize(file)
  return <image href={markSrc(file)} x={x} y={y} width={width * scale} height={height * scale} />
}

const OUTLINE_ID = 'glyph-outline'

/** Defined once on the page: the glyph's outline, used to mark out clear space. */
export function DiagramDefs() {
  const inner = svgInner('compass-glyph-navy-ink').replace(/fill="#133558"/g, `fill="none" stroke="${GOLD_DEEP}" stroke-width="40"`)
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden focusable="false">
      <symbol id={OUTLINE_ID} viewBox="0 0 836 1358" dangerouslySetInnerHTML={{ __html: inner }} />
    </svg>
  )
}

export function ClearSpace({ file, form, compact = false }: { file: string; form: FormKey; compact?: boolean }) {
  const wide = /wordmark-(two-tone|reversed)$/.test(file)
  const art = ART[wide ? 'wordmark-wide' : form]
  const [bx, by, bw, bh] = art.box
  const isGlyph = form === 'glyph'
  const u = isGlyph ? art.glyphH * 0.25 : art.glyphH
  const pad = u * (compact ? 0.15 : 0.35)
  const vb = [bx - u - pad, by - u - pad, bw + 2 * (u + pad), bh + 2 * (u + pad)]
  const sw = Math.max(vb[2], vb[3]) / 260
  const marker = (cx: number, cy: number, h: number) => {
    const w = (h * 836) / 1358
    return <use key={`${cx},${cy}`} href={`#${OUTLINE_ID}`} x={cx - w / 2} y={cy - h / 2} width={w} height={h} />
  }
  const name = altFor(file).replace(/^Compass /, '')
  const rule = isGlyph ? "a quarter of the glyph's height" : "the glyph's height"
  const tick = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={INK} strokeWidth={sw} />
  return (
    <svg viewBox={vb.join(' ')} role="img" aria-label={`Clear space around the ${name}: ${rule} on every side`}>
      <rect x={bx - u} y={by - u} width={bw + 2 * u} height={bh + 2 * u} fill="rgba(225,201,130,.28)" stroke={GOLD_DEEP} strokeWidth={sw} strokeDasharray={`${sw * 4} ${sw * 3}`} />
      <rect x={bx} y={by} width={bw} height={bh} fill="#F7F4EE" />
      {!isGlyph && (
        <g opacity={0.55}>
          {[marker(bx - u / 2, by + bh / 2, u * 0.8), marker(bx + bw + u / 2, by + bh / 2, u * 0.8), marker(bx + bw / 2, by - u / 2, u * 0.8), marker(bx + bw / 2, by + bh + u / 2, u * 0.8)]}
        </g>
      )}
      {isGlyph && (
        <g>
          {tick(bx - u, by + bh + u * 0.5, bx, by + bh + u * 0.5)}
          {tick(bx - u, by + bh + u * 0.3, bx - u, by + bh + u * 0.7)}
          {tick(bx, by + bh + u * 0.3, bx, by + bh + u * 0.7)}
        </g>
      )}
      <Nested file={file} />
    </svg>
  )
}

export function TileGeometry() {
  // The tile as drawn: the glyph runs from 80.3 to 419.8 of 500 (67.9%), centered.
  const top = 80.3
  const bottom = 419.8
  return (
    <svg viewBox="-40 -40 760 580" role="img" aria-label="Tile geometry: the glyph is two-thirds of the tile's height, centered, with about a quarter of the glyph's height above and below">
      <Nested file="compass-tile-ink-on-paper" />
      <rect x="0" y="0" width="500" height="500" fill="none" stroke="rgba(26,42,54,.35)" strokeWidth="2" />
      <g stroke={INK} strokeWidth="2" fill="none">
        <line x1="540" y1={top} x2="540" y2={bottom} />
        <line x1="530" y1={top} x2="550" y2={top} />
        <line x1="530" y1={bottom} x2="550" y2={bottom} />
        <line x1="600" y1="0" x2="600" y2={top} />
        <line x1="590" y1="0" x2="610" y2="0" />
        <line x1="590" y1={top} x2="610" y2={top} />
        <line x1="145" y1={top} x2="355" y2={top} strokeDasharray="6 6" stroke={GOLD_DEEP} />
        <line x1="145" y1={bottom} x2="355" y2={bottom} strokeDasharray="6 6" stroke={GOLD_DEEP} />
      </g>
      <g style={{ fontFamily: MONO }} fontSize="22" fill={INK}>
        <text x="556" y="245">⅔ tile</text>
        <text x="556" y="272">max 68%</text>
        <text x="616" y="48">¼ glyph</text>
      </g>
    </svg>
  )
}

// ---------- Another company's logo ----------

/** A neutral stand-in for a trade partner's logo. Not a real company. */
function PartnerLogo({ x = 0, y = 0, scale = 1, houseOnly = false }: { x?: number; y?: number; scale?: number; houseOnly?: boolean }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill={PARTNER}>
      <path d="M0 150 L150 20 L300 150 L270 150 L270 330 L30 330 L30 150 Z M110 330 L110 230 L190 230 L190 330 Z" fillRule="evenodd" />
      {!houseOnly && (
        <>
          <text x="360" y="215" style={{ fontFamily: SANS }} fontWeight="700" fontSize="150" letterSpacing="8">
            EXAMPLE
          </text>
          <text x="362" y="320" style={{ fontFamily: SANS }} fontWeight="500" fontSize="78" letterSpacing="30">
            BUILDERS
          </text>
        </>
      )}
    </g>
  )
}
const PARTNER_W = 1250
const PARTNER_SCALE = 1.2 // about the same visual weight as the 1800 × 330 wordmark
const U = 330 // the navy ink wordmark's glyph height, in its own units

export function BesideAnotherLogo() {
  const px = 1800 + U * 1.5
  const W = px + PARTNER_W * PARTNER_SCALE
  return (
    <svg viewBox={`${-U * 1.15} ${-U * 1.25} ${W + U * 1.75} ${330 + U * 2.4}`} role="img" aria-label="Our wordmark beside a builder's logo: about the same visual size, with at least the glyph's height of clear space between them">
      <rect x={-U} y={-U} width={1800 + 2 * U} height={330 + 2 * U} fill="rgba(225,201,130,.25)" stroke={GOLD_DEEP} strokeWidth="6" strokeDasharray="24 18" />
      <Nested file="compass-wordmark-navy-ink" />
      <PartnerLogo x={px} y={(-330 * (PARTNER_SCALE - 1)) / 2} scale={PARTNER_SCALE} />
      <line x1={px - 60} y1="-40" x2={px - 60} y2="370" stroke="rgba(26,42,54,.4)" strokeWidth="4" />
      <g stroke={INK} strokeWidth="5">
        <line x1="1800" y1={330 + U * 0.55} x2={px} y2={330 + U * 0.55} />
        <line x1="1800" y1={330 + U * 0.4} x2="1800" y2={330 + U * 0.7} />
        <line x1={px} y1={330 + U * 0.4} x2={px} y2={330 + U * 0.7} />
      </g>
      <text x={(1800 + px) / 2} y={330 + U * 1.05} textAnchor="middle" style={{ fontFamily: MONO }} fontSize="78" fill={INK}>
        ≥ 1 glyph
      </text>
    </svg>
  )
}

export function MergedWithAnotherLogo() {
  return (
    <svg viewBox="-80 -420 2200 900" role="img" aria-label="Our wordmark merged with a builder's logo into one (wrong)">
      <rect x="-60" y="-400" width="2160" height="860" rx="40" fill="none" stroke={PARTNER} strokeWidth="10" />
      <PartnerLogo x={750} y={-380} houseOnly />
      <Nested file="compass-wordmark-navy-ink" />
      <text x="900" y="440" textAnchor="middle" style={{ fontFamily: SANS }} fontWeight="500" fontSize="78" letterSpacing="30" fill={PARTNER}>
        BUILDERS
      </text>
    </svg>
  )
}

export function UnequalToAnotherLogo() {
  const small = 0.35
  return (
    <svg viewBox={`-60 -60 ${1800 * small + 330 + PARTNER_W * 1.3 + 120} ${330 * 1.3 + 120}`} role="img" aria-label="Our wordmark much smaller than a builder's logo (wrong)">
      <Nested file="compass-wordmark-navy-ink" y={330 * 1.3 - 330 * small} scale={small} />
      <PartnerLogo x={1800 * small + 330} scale={1.3} />
    </svg>
  )
}

export function JobSiteSign() {
  // A drawn scene, not a photo. Realistic scenes are mastered in Figma (ADR 0004).
  const px = 1800 + U * 1.5
  return (
    <div className="sign-scene">
      <div className="sign-scene__board">
        <span className="sign-scene__title">HURRICANE RANCH · NEW MARKET</span>
        <svg viewBox={`-60 -80 ${px + PARTNER_W * PARTNER_SCALE + 120} 500`} role="img" aria-label="A job-site sign with our wordmark and a builder's logo side by side">
          <Nested file="compass-wordmark-navy-ink" />
          <line x1={1800 + U * 0.75} y1="-20" x2={1800 + U * 0.75} y2="350" stroke="#9AA6B0" strokeWidth="5" />
          <PartnerLogo x={px} y={(-330 * (PARTNER_SCALE - 1)) / 2} scale={PARTNER_SCALE} />
        </svg>
        <span className="sign-scene__credit">Design · Compass Design Studio &nbsp;·&nbsp; Build · Example Builders</span>
      </div>
      <div className="sign-scene__posts" aria-hidden>
        <i />
        <i />
      </div>
    </div>
  )
}

// ---------- Altered marks, for the don'ts ----------

export function Recolored() {
  const inner = svgInner('compass-wordmark-navy-ink').replace(/#133558/g, '#C0562F')
  return (
    <svg viewBox="0 0 1800 330" role="img" aria-label="Compass wordmark recolored orange (wrong)" dangerouslySetInnerHTML={{ __html: inner }} />
  )
}

export function Outlined() {
  const inner = svgInner('compass-wordmark-navy-ink').replace(/fill="#133558"/g, 'fill="none" stroke="#133558" stroke-width="8"')
  return <svg viewBox="0 0 1800 330" role="img" aria-label="Compass wordmark drawn as an outline (wrong)" dangerouslySetInnerHTML={{ __html: inner }} />
}

export function Rearranged() {
  // The two-tone wordmark's paths run C, O, M, P, S, S, glyph. Move the glyph to the front.
  const shifts = [264, 264, 264, 264, 0, 0, -1173.3]
  let i = -1
  const inner = svgInner('compass-wordmark-two-tone').replace(/<path /g, () => `<path transform="translate(${shifts[++i] ?? 0} 0)" `)
  return <svg viewBox="0 0 1855 340" role="img" aria-label="Compass wordmark with the glyph moved to the front (wrong)" dangerouslySetInnerHTML={{ __html: inner }} />
}
