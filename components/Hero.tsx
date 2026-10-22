import { Copy } from '@phosphor-icons/react/ssr'
import { CopyButton } from '@/components/client/CopyButton'
import { DownloadMenu } from '@/components/client/DownloadMenu'
import { Mark } from '@/components/Mark'
import { COLORS, SWATCHES } from '@/content/brand'
import { HERO } from '@/content/site'
import { ZIP, zipHref } from '@/lib/downloads'
import { formatsNote } from '@/lib/format-note'

export const PALETTE_CSS = `:root {\n${SWATCHES.map((s) => `  --${s.key}: ${COLORS[s.key]};`).join('\n')}\n}`

export function Hero() {
  const zips = [ZIP.all, ZIP.forms.wordmark, ZIP.forms['lockup-horizontal'], ZIP.forms['lockup-stacked'], ZIP.forms.glyph, ZIP.tiles]
  return (
    <div className="hero" id="top">
      <div className="hero__plate on-dark">
        <Mark file="compass-wordmark-paper" alt="Compass" className="hero__mark" preload />
        <span className="hero__kicker">{HERO.kicker}</span>
        <h1>{HERO.title}</h1>
        <p className="hero__lead">{HERO.lead}</p>
        <div className="hero__actions">
          <DownloadMenu items={zips.map((z) => ({ href: zipHref(z), label: z.label, count: z.files.length }))} note={formatsNote()} />
          <CopyButton className="btn btn--ghost-dark" text={PALETTE_CSS} done="Palette copied as CSS custom properties">
            <Copy size={16} aria-hidden />
            Copy palette as CSS
          </CopyButton>
        </div>
      </div>
    </div>
  )
}
