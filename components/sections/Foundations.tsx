// 03 Color, 04 Typography & fonts, 05 Voice & copy, 06 Iconography, and the unnumbered
// "Spacing, radius & shadows" drawer for web contractors.

import { ArrowRight, Blueprint, CalendarBlank, Copy, EnvelopeSimple, House, InstagramLogo, MapPin, PencilSimple, Phone, Ruler, Tree } from '@phosphor-icons/react/ssr'
import { CopyButton } from '@/components/client/CopyButton'
import { PALETTE_CSS } from '@/components/Hero'
import { Mark } from '@/components/Mark'
import { Drawer, SectionHead } from '@/components/ui'
import { CASING, COLORS, FONTS, PAIRINGS, SHADOWS, SPACING, STATUS_COLORS, SWATCHES, TYPE_SCALE } from '@/content/brand'
import { contrastRatio, formatRatio, hexToRgb } from '@/lib/contrast'

const LIGHT_SWATCHES = ['paper', 'paper-2', 'tan']

export function Color() {
  return (
    <section className="section" id="color" aria-labelledby="color-title">
      <SectionHead
        id="color"
        title="Color"
        eyebrow={`${SWATCHES.length} colors · HEX · RGB`}
        lead="Navy and Ink carry weight. Paper and Tan carry surfaces. Gold is a fine pen line, never a fill. Select a swatch to copy its hex."
        aside={
          <CopyButton className="btn btn--outline btn--sm" text={PALETTE_CSS} done="Palette copied as CSS custom properties">
            <Copy size={16} aria-hidden />
            Copy CSS
          </CopyButton>
        }
      />
      <div className="swatches">
        {SWATCHES.map((s) => {
          const hex = COLORS[s.key]
          return (
            <div key={s.key} className="swatch">
              <CopyButton className={`swatch__chip${LIGHT_SWATCHES.includes(s.key) ? ' swatch__chip--light' : ''}`} style={{ background: hex }} text={hex} done={`${s.name} ${hex} copied`} aria-label={`Copy ${s.name} hex, ${hex}`}>
                <span className="swatch__copy" aria-hidden>
                  Copy hex
                </span>
              </CopyButton>
              <div className="swatch__info">
                <b>{s.name}</b>
                <span className="swatch__role">{s.role}</span>
                <span className="swatch__values">
                  {hex}
                  <br />
                  RGB {hexToRgb(hex).join(' ')}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <p className="small muted plate-note">Print values are coming once we&rsquo;ve proofed them with a printer. For print jobs, ask us.</p>

      <div className="drawers">
        <Drawer title="Pairings" meta="text and background">
          <div className="pairings">
            {PAIRINGS.map((p) => (
              <div key={p.title} className={`pairing${p.bg === 'paper' || p.bg === 'white' ? ' pairing--ring' : ''}`} style={{ background: COLORS[p.bg], color: COLORS[p.fg] }}>
                <span className="pairing__t">{p.title}</span>
                <span className="pairing__m">
                  {p.use} · {formatRatio(contrastRatio(COLORS[p.fg], COLORS[p.bg]))}
                </span>
              </div>
            ))}
          </div>
        </Drawer>
        <Drawer title="Status colors" meta="for status only, always with a word or icon">
          <div className="swatches swatches--four">
            {STATUS_COLORS.map((s) => (
              <div key={s.name} className="swatch">
                <div className="swatch__chip swatch__chip--static" style={{ background: s.hex }} />
                <div className="swatch__info">
                  <b>{s.name}</b>
                  <span className="swatch__values">
                    {s.hex}
                    {s.note ? ` · ${s.note}` : ''}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Drawer>
      </div>
    </section>
  )
}

const FONT_VAR = { display: 'var(--font-display)', body: 'var(--font-body)', mono: 'var(--font-mono)' }

export function Typography() {
  return (
    <section className="section" id="type" aria-labelledby="type-title">
      <SectionHead id="type" title="Typography & fonts" eyebrow="Tenor Sans · DM Sans · JetBrains Mono" lead="Tenor Sans for display, lightly tracked. DM Sans for everything else. All three are free from Google Fonts." />
      <div className="type-spec">
        <div>
          <p className="type-spec__meta">Tenor Sans 400 · 64 / 1.05 / 0.02em</p>
          <p className="type-spec__display">Designing your home should be the best part of having one.</p>
        </div>
        <div>
          <p className="type-spec__meta">DM Sans 300 · lead · 21 / 1.65</p>
          <p className="type-spec__lead">A place to listen first. We keep our project list short, so every home receives the founders&rsquo; hands from first sketch to final walk-through.</p>
          <p className="type-spec__meta type-spec__meta--gap">DM Sans 400 · body · 15 / 1.65</p>
          <p>We work in warm, quiet materials (cedar, stone, lime plaster, brass that ages) and we build to last for generations, not seasons.</p>
        </div>
      </div>
      <div className="fonts-row">
        {FONTS.map((f) => (
          <div key={f.name} className="font-card">
            <span className="font-card__sample" style={{ fontFamily: FONT_VAR[f.family], fontWeight: f.family === 'body' ? 300 : 400 }} aria-hidden>
              Aa
            </span>
            <b>{f.name}</b>
            <span className="small muted">{f.use}</span>
            <a className="arrow-link small" href={f.href}>
              Get {f.name} <span aria-hidden>→</span>
            </a>
          </div>
        ))}
      </div>
      <div className="drawers">
        <Drawer title="Type scale" meta="sizes and uses">
          <table className="scale-table">
            <tbody>
              {TYPE_SCALE.map((t) => (
                <tr key={t.name}>
                  <th scope="row">
                    <b>{t.name}</b>
                    <span className="mono">{t.px} px</span>
                  </th>
                  <td>
                    <span className={`scale-sample scale-sample--${t.kind}${t.kind === 'eyebrow' ? ' eyebrow' : ''}`} style={t.kind === 'display' ? { fontSize: Math.min(t.px, 40) } : undefined}>
                      {t.sample}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Drawer>
      </div>
    </section>
  )
}

export function Voice() {
  return (
    <section className="section" id="voice" aria-labelledby="voice-title">
      <SectionHead id="voice" title="Voice & copy" eyebrow="Examples · casing · punctuation" lead="Warm, plainspoken, personal. We, never I. Domestic words: home, porch, walk-through. Short sentences that may smile." />
      <div className="voice-row">
        <div className="voice-card">
          <span className="eyebrow">Say</span>
          <q>Have a site in mind?</q>
        </div>
        <div className="voice-card voice-card--not">
          <span className="eyebrow">Not</span>
          <q>
            <span className="sr-only">Not this: </span>Transform your residential program!
          </q>
        </div>
        <div className="voice-card">
          <span className="eyebrow">Promise</span>
          <q>We respond to every serious inquiry within the week.</q>
        </div>
      </div>
      <div className="drawers">
        <Drawer title="Casing & punctuation" meta="sentence case, the middle dot, no exclamation points">
          <dl className="casing">
            {CASING.map((c) => (
              <div key={c.rule}>
                <dt>{c.rule}</dt>
                <dd>{c.example}</dd>
              </div>
            ))}
          </dl>
        </Drawer>
      </div>
    </section>
  )
}

const ICONS = [
  { Icon: House, name: 'house' },
  { Icon: Ruler, name: 'ruler' },
  { Icon: PencilSimple, name: 'pencil' },
  { Icon: Blueprint, name: 'blueprint' },
  { Icon: MapPin, name: 'map pin' },
  { Icon: EnvelopeSimple, name: 'envelope' },
  { Icon: Phone, name: 'phone' },
  { Icon: Tree, name: 'tree' },
  { Icon: ArrowRight, name: 'arrow right' },
  { Icon: InstagramLogo, name: 'instagram' },
  { Icon: CalendarBlank, name: 'calendar' },
]

export function Iconography() {
  return (
    <section className="section" id="icons" aria-labelledby="icons-title">
      <SectionHead
        id="icons"
        title="Iconography"
        eyebrow="Phosphor · regular weight"
        lead="20 or 24 px, 1.5 px stroke. Navy on light, light gold on dark. Filled only for status."
        aside={
          <a className="arrow-link small" href="https://phosphoricons.com">
            Browse the set <span aria-hidden>→</span>
          </a>
        }
      />
      <ul className="icons-grid">
        {ICONS.map(({ Icon, name }) => (
          <li key={name} className="icon-cell">
            <Icon size={24} aria-hidden />
            {name}
          </li>
        ))}
        <li className="icon-cell icon-cell--glyph">
          <Mark file="compass-glyph-navy-ink" alt="" />
          The glyph, never a stock compass
        </li>
      </ul>
    </section>
  )
}

export function SpacingDrawer() {
  return (
    <section className="section section--drawer" id="spacing" aria-label="Spacing, radius and shadows">
      <details className="drawer drawer--gold">
        <summary>
          <span>
            <span className="h4">Spacing, radius &amp; shadows</span> <span className="small muted">· for web contractors</span>
          </span>
          <span className="tog" aria-hidden />
        </summary>
        <div className="drawer__body">
          <p className="small muted plate-lede">Sections breathe 80–112 px; page gutters are 56–64 px. Hairlines over boxes.</p>
          <Drawer title="Spacing scale" meta="4 → 112 px, on a 4-pt grid">
            <div className="space-scale">
              {SPACING.map((v, i) => (
                <div key={v} className="space-scale__row">
                  <span className="mono">{v}</span>
                  <i style={{ width: v * 2.5 }} aria-hidden />
                  <span className="mono muted">--space-{i + 1}</span>
                </div>
              ))}
            </div>
          </Drawer>
          <Drawer title="Corner radii" meta="square by default">
            <div className="radii">
              <div>
                <div className="radii__shape" style={{ borderRadius: 0 }} />
                <span>0 · sheets, cards</span>
              </div>
              <div>
                <div className="radii__shape" style={{ borderRadius: 8 }} />
                <span>8–16 · buttons, inputs</span>
              </div>
              <div>
                <div className="radii__shape radii__shape--plate" />
                <span>Drafting plate · 60 60 16 16 (32 on phones)</span>
              </div>
              <div>
                <div className="radii__shape radii__shape--pill" />
                <span>999 · pills only</span>
              </div>
            </div>
          </Drawer>
          <Drawer title="Shadows & rules" meta="low, soft, never colored">
            <div className="shadows">
              {SHADOWS.map((s, i) => (
                <div key={s} className="shadows__card" style={{ boxShadow: s }}>
                  --shadow-{i + 1}
                </div>
              ))}
            </div>
          </Drawer>
        </div>
      </details>
    </section>
  )
}
