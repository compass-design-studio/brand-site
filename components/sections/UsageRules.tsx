// 02 Using the marks: the usage rules as numbered spec plates. Wording comes from the design
// system README; the pictures are drawn from the mark files and its numbers (ADR 0004).

import Image from 'next/image'
import { Compass, MinusCircle, CheckCircle } from '@phosphor-icons/react/ssr'
import { BesideAnotherLogo, ClearSpace, JobSiteSign, MergedWithAnotherLogo, Outlined, Rearranged, Recolored, TileGeometry, UnequalToAnotherLogo, ART_WIDTH_SCALE } from '@/components/diagrams'
import { Mark } from '@/components/Mark'
import { SectionHead, Verdict } from '@/components/ui'
import { BACKGROUND_NAMES, COLORS, COLORWAYS, DARK_COLORWAYS, LIGHT_COLORWAYS, MIN_SIZE, MIN_SIZES, SWATCHES, USAGE, weakestRatio, type Background, type Colorway, type MinSizeRow } from '@/content/brand'
import { IMAGES, type SiteImage } from '@/content/images'
import { formatRatio } from '@/lib/contrast'
import { altFor, markFile } from '@/lib/mark-names'
import { weakestOnPhoto, type PhotoPlacement } from '@/lib/photo-contrast'

// ---------- Pictures ----------

type PicBg = 'paper' | 'white' | 'ink' | 'paper-2' | 'tan' | 'photo'

function Pic({ bg = 'paper', dont = false, className = '', children }: { bg?: PicBg; dont?: boolean; className?: string; children: React.ReactNode }) {
  return <div className={`pic pic--${bg}${dont ? ' pic--dont' : ''} ${className}`}>{children}</div>
}

function PhotoPic({ image, position, dont = false, children }: { image: SiteImage; position: string; dont?: boolean; children: React.ReactNode }) {
  return (
    <Pic bg="photo" dont={dont}>
      <Image src={image.src} alt="" fill sizes="(max-width: 520px) 100vw, (max-width: 900px) 50vw, 400px" style={{ objectFit: 'cover', objectPosition: position }} />
      {children}
    </Pic>
  )
}

function Plate({ n, id, title, text, children }: { n: number; id: string; title: string; text: string; children: React.ReactNode }) {
  return (
    <div className="spec-plate" id={`usage-${id}`}>
      <div className="spec-plate__head">
        <span className="num" aria-hidden>
          {String(n).padStart(2, '0')}
        </span>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
      {children}
    </div>
  )
}

// ---------- Photos: placements measured at build time ----------

const WORDMARK_RATIO = 330 / 1800
const CALM: PhotoPlacement = { image: IMAGES.hurricaneRanch.file, aspect: 4 / 3, position: [0.5, 0], box: { left: 0.59, top: 0.05, width: 0.34, height: 0.34 * WORDMARK_RATIO * (4 / 3) } }
const BUSY_H = 0.52 * WORDMARK_RATIO * (4 / 3)
const BUSY: PhotoPlacement = { image: IMAGES.widnerResidence.file, aspect: 4 / 3, position: [0.5, 0.5], box: { left: 0.24, top: (1 - BUSY_H) / 2, width: 0.52, height: BUSY_H } }

const pct = (n: number) => `${(n * 100).toFixed(2)}%`
const boxStyle = (p: PhotoPlacement): React.CSSProperties => ({ position: 'absolute', left: pct(p.box.left), top: pct(p.box.top), width: pct(p.box.width) })
const weakest = (r: number | null) => (r === null ? "check it where it's weakest" : `weakest point ${formatRatio(r)}`)

async function Photos() {
  const [calm, busy] = await Promise.all([weakestOnPhoto(CALM, COLORS['navy-ink']), weakestOnPhoto(BUSY, COLORS['light-gold'])])
  return (
    <div className="pair pair--three grid-shrink">
      <figure>
        <PhotoPic image={IMAGES.hurricaneRanch} position="50% 0%">
          <div style={boxStyle(CALM)}>
            <Mark file="compass-wordmark-navy-ink" alt="Navy ink wordmark over a calm, even sky" />
          </div>
        </PhotoPic>
        <Verdict ok label="Over a calm, even area" note={`Hurricane Ranch · New Market · ${weakest(calm)}`} />
      </figure>
      <figure>
        <PhotoPic image={IMAGES.widnerResidence} position="50% 50%">
          <div style={{ position: 'absolute', right: '6%', bottom: '8%', width: '22%' }}>
            <Mark file="compass-tile-light-gold-on-ink" alt="Light gold on Ink tile over a busy photo" />
          </div>
        </PhotoPic>
        <Verdict ok label="No calm area? Use a tile" note="Widner Residence · New Market" />
      </figure>
      <figure>
        <PhotoPic image={IMAGES.widnerResidence} position="50% 50%" dont>
          <div style={boxStyle(BUSY)}>
            <Mark file="compass-wordmark-light-gold" alt="Light gold wordmark over a busy porch (wrong)" />
          </div>
        </PhotoPic>
        <Verdict ok={false} label="Don't place it on a busy area" note={weakest(busy)} />
      </figure>
    </div>
  )
}

// ---------- Approved backgrounds ----------

const MATRIX_BGS: Background[] = ['paper', 'paper-2', 'white', 'tan', 'ink', 'photo']

function MatrixCell({ colorway, bg }: { colorway: Colorway; bg: Background }) {
  const file = markFile('wordmark', colorway)
  const approved = COLORWAYS[colorway].approved.includes(bg)
  const ratio = bg === 'photo' ? null : weakestRatio(colorway, bg)
  const where = bg === 'photo' ? 'a dark photo' : BACKGROUND_NAMES[bg]
  return (
    <td>
      <div className={`bg-cell bg-cell--${bg}`}>
        {bg === 'photo' && <Image src={IMAGES.hurricaneRanch.src} alt="" fill sizes="160px" style={{ objectFit: 'cover', objectPosition: '35% 100%' }} />}
        <Mark file={file} alt={`${altFor(file)} on ${where}${approved ? '' : ', not approved'}`} />
      </div>
      {approved ? (
        <div className="bg-verdict bg-verdict--ok">
          <CheckCircle size={14} weight="fill" aria-hidden />
          {ratio === null ? 'Yes · check it' : `Yes · ${formatRatio(ratio)}`}
        </div>
      ) : (
        <div className="bg-verdict bg-verdict--no">
          <MinusCircle size={14} aria-hidden />
          {ratio === null ? 'No' : `No · ${formatRatio(ratio)}`}
        </div>
      )}
    </td>
  )
}

function BackgroundsMatrix() {
  return (
    <>
      <div className="bg-matrix-wrap" role="region" aria-labelledby="bg-matrix-caption" tabIndex={0}>
        <table className="bg-matrix">
          <caption id="bg-matrix-caption" className="sr-only">
            Approved backgrounds for each colorway, with the weakest contrast of the mark&rsquo;s colors on that background
          </caption>
          <thead>
            <tr>
              <td />
              {MATRIX_BGS.map((bg) => (
                <th key={bg} scope="col">
                  {bg === 'photo' ? 'Dark photo' : BACKGROUND_NAMES[bg]}
                  <span className={bg === 'photo' ? 'small' : 'small mono'}>{bg === 'photo' ? 'Weakest spot' : COLORS[bg]}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...LIGHT_COLORWAYS, ...DARK_COLORWAYS].map((cw) => (
              <tr key={cw}>
                <th scope="row">{COLORWAYS[cw].name}</th>
                {MATRIX_BGS.map((bg) => (
                  <MatrixCell key={bg} colorway={cw} bg={bg} />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="small muted plate-note">Ratios are the weakest color in the mark against the background, by the WCAG formula. Tiles and wordmark bars carry their own background, so they work on any of these.</p>
    </>
  )
}

// ---------- Minimum size ----------

const STANDARD_FILE = (form: MinSizeRow['form']) => markFile(form, 'navy-ink')
const LARGER_FILE = (form: MinSizeRow['form']) => (form === 'glyph' ? 'compass-glyph-gold-deep' : markFile(form, 'two-tone'))
const [COL_STANDARD, COL_LARGER] = MIN_SIZE.columns

function ActualSize({ file, row, px }: { file: string; row: MinSizeRow; px: number }) {
  // An image's px size must be the mark's own size, so lockups are sized by their art.
  const style = row.axis === 'tall' ? { height: px, width: 'auto' } : { width: +(px * (ART_WIDTH_SCALE[row.form] ?? 1)).toFixed(1), height: 'auto' }
  return (
    <div className="actual">
      <Mark file={file} alt={`${altFor(file)} at ${px} px ${row.axis}`} style={style} />
    </div>
  )
}

function MinimumSizes() {
  return (
    <>
      <p className="small muted plate-lede">{MIN_SIZE.larger} Marks are shown at actual size at 100% zoom.</p>
      <table className="minsize-table">
        <thead>
          <tr>
            <th scope="col">Mark</th>
            <th scope="col">{COL_STANDARD}</th>
            <th scope="col">{COL_LARGER}</th>
          </tr>
        </thead>
        <tbody>
          {MIN_SIZES.map((row) => (
            <tr key={row.form}>
              <th scope="row">{row.label}</th>
              <td data-label={COL_STANDARD}>
                <ActualSize file={STANDARD_FILE(row.form)} row={row} px={row.standard.px} />
                <span className="mono">
                  {row.standard.px} px · {row.standard.mm} mm {row.axis}
                </span>
              </td>
              <td data-label={COL_LARGER}>
                <ActualSize file={LARGER_FILE(row.form)} row={row} px={row.larger.px} />
                <span className="mono">
                  {row.larger.px} px · {row.larger.mm} mm {row.axis}
                </span>
              </td>
            </tr>
          ))}
          <tr>
            <th scope="row">Tiles</th>
            <td colSpan={2}>
              <span className="small">{MIN_SIZE.tile}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <p className="small plate-note">{MIN_SIZE.tooSmall}</p>
    </>
  )
}

// ---------- Please don't ----------

function Dont({ label, note, bg = 'paper', children }: { label: string; note?: string; bg?: PicBg; children: React.ReactNode }) {
  return (
    <figure>
      <Pic bg={bg} dont>
        {children}
      </Pic>
      <Verdict ok={false} label={label} note={note} />
    </figure>
  )
}

const WM = 'compass-wordmark-navy-ink'

function Donts() {
  return (
    <div className="dont-grid grid-shrink">
      <Dont label="Don't stretch">
        <div className="wm" style={{ transform: 'scaleX(1.35)' }}>
          <Mark file={WM} alt="Compass wordmark stretched wider (wrong)" />
        </div>
      </Dont>
      <Dont label="Don't squash">
        <div className="wm" style={{ transform: 'scaleY(0.6)' }}>
          <Mark file={WM} alt="Compass wordmark squashed (wrong)" />
        </div>
      </Dont>
      <Dont label="Don't rotate">
        <div className="wm" style={{ transform: 'rotate(-12deg)' }}>
          <Mark file={WM} alt="Compass wordmark rotated (wrong)" />
        </div>
      </Dont>
      <Dont label="Don't recolor">
        <div className="wm">
          <Recolored />
        </div>
      </Dont>
      <Dont label="Don't outline">
        <div className="wm">
          <Outlined />
        </div>
      </Dont>
      <Dont label="Don't add shadows or effects">
        <div className="wm" style={{ filter: 'drop-shadow(6px 8px 4px rgba(0,0,0,.45))' }}>
          <Mark file={WM} alt="Compass wordmark with a drop shadow (wrong)" />
        </div>
      </Dont>
      <Dont label="Don't rearrange the parts">
        <div className="wm">
          <Rearranged />
        </div>
      </Dont>
      <Dont label="Don't retype it">
        <span className="dont-retype" role="img" aria-label="COMPASS typed in another typeface (wrong)">
          COMPASS
        </span>
      </Dont>
      <Dont label="Don't go under 3:1" note={`Gold deep on Paper 2 is ${formatRatio(weakestRatio('gold-deep', 'paper-2'))}`} bg="paper-2">
        <div className="wm">
          <Mark file="compass-wordmark-gold-deep" alt="Gold deep wordmark on Paper 2, too little contrast (wrong)" />
        </div>
      </Dont>
      <Dont label="Don't use the glyph as a letter" note="It is the A in COMPASS only">
        <span className="dont-letter" role="img" aria-label="The glyph used as the A in another word (wrong)">
          H<Mark file="compass-glyph-navy-ink" alt="" />
          RBOR
        </span>
      </Dont>
      <Dont label="Don't set a mark in a sentence" bg="white">
        <p className="dont-inline">
          Designed with care by <Mark file={WM} alt="Compass" /> in New Market.
        </p>
      </Dont>
      <Dont label="Don't swap in a stock compass">
        <span className="dont-stock" role="img" aria-label="A stock compass icon used instead of the glyph (wrong)">
          <Compass size={54} aria-hidden />
          <span>COMPASS</span>
        </span>
      </Dont>
    </div>
  )
}

// ---------- Colors and who may use them ----------

function ColorsAndWho() {
  const chip = (hex: string, name: string, ring = false) => (
    <span key={name} className="color-chip">
      <i style={{ background: hex }} className={ring ? 'color-chip__ring' : undefined} aria-hidden />
      {name}
    </span>
  )
  return (
    <div className="spec-grid grid-shrink">
      <div>
        <div className="color-chips">
          {SWATCHES.map((s) => chip(COLORS[s.key], s.name, ['paper', 'paper-2', 'tan'].includes(s.key)))}
          <span className="color-chips__sep" aria-hidden />
          {chip('#000000', 'Black')}
          {chip('#FFFFFF', 'White', true)}
        </div>
        <p className="small muted plate-note">{USAGE.colorsDetail}</p>
      </div>
      <ul className="who-list">
        {USAGE.whoMayUse.map((w) => (
          <li key={w.rest}>
            {w.lead && <b>{w.lead}</b>}
            {w.rest}
          </li>
        ))}
      </ul>
    </div>
  )
}

// ---------- The section ----------

export function UsageRules() {
  return (
    <section className="section" id="rules" aria-labelledby="rules-title">
      <SectionHead id="rules" title="Using the marks" eyebrow="Usage rules" lead="How we, and anyone working with us, use the marks. The wording lives in our design system; these pictures are drawn from the files above." />

      <Plate n={1} id="start-here" title="Start here" text={USAGE.startHere}>
        <div className="pair grid-shrink">
          <figure>
            <Pic>
              <div className="wm">
                <Mark file="compass-wordmark-navy-ink" alt="Compass wordmark, navy ink" />
              </div>
            </Pic>
            <Verdict ok label="Navy ink wordmark" note="On light backgrounds" />
          </figure>
          <figure>
            <Pic bg="ink">
              <div className="wm">
                <Mark file="compass-wordmark-light-gold" alt="Compass wordmark, light gold" />
              </div>
            </Pic>
            <Verdict ok label="Light gold wordmark" note="On dark backgrounds and photos" />
          </figure>
        </div>
      </Plate>

      <Plate n={2} id="clear-space" title="Clear space" text={USAGE.clearSpace}>
        <div className="spec-grid grid-shrink">
          <figure>
            <Pic bg="white">
              <ClearSpace file="compass-wordmark-navy-ink" form="wordmark" />
            </Pic>
            <figcaption className="verdict">
              <b>Wordmark and lockups</b>
              <span className="muted">The glyph&rsquo;s height clear on every side</span>
            </figcaption>
          </figure>
          <div className="pair grid-shrink">
            <figure>
              <Pic bg="white">
                <div style={{ width: '62%' }}>
                  <ClearSpace file="compass-glyph-navy-ink" form="glyph" />
                </div>
              </Pic>
              <figcaption className="verdict">
                <b>Glyph alone</b>
                <span className="muted">¼ of its height · at least 8 px or 2 mm · ½ beside another logo</span>
              </figcaption>
            </figure>
            <figure>
              <Pic bg="white">
                <TileGeometry />
              </Pic>
              <figcaption className="verdict">
                <b>In a tile</b>
                <span className="muted">Glyph ⅔ of the tile, centered</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </Plate>

      <Plate n={3} id="minimum-size" title="Minimum size" text={MIN_SIZE.intro}>
        <MinimumSizes />
      </Plate>

      <Plate n={4} id="contrast" title="Approved backgrounds" text={USAGE.contrast}>
        <BackgroundsMatrix />
      </Plate>

      <Plate n={5} id="photos" title="Photos" text={USAGE.photos}>
        <Photos />
      </Plate>

      <Plate n={6} id="with-other-logos" title="Next to another company's logo" text={USAGE.withOtherLogos}>
        <figure>
          <Pic bg="white">
            <BesideAnotherLogo />
          </Pic>
          <Verdict ok label="Side by side, about the same size" note="Our clear space between them. We approve every joint layout." />
        </figure>
        <div className="pair grid-shrink plate-gap">
          <figure>
            <Pic bg="white" dont>
              <MergedWithAnotherLogo />
            </Pic>
            <Verdict ok={false} label="Never merged into one logo" />
          </figure>
          <figure>
            <Pic bg="white" dont>
              <UnequalToAnotherLogo />
            </Pic>
            <Verdict ok={false} label="Not much smaller or larger" />
          </figure>
        </div>
        <p className="small muted plate-note">&ldquo;Example Builders&rdquo; is a placeholder for a trade partner&rsquo;s logo.</p>
        <figure className="plate-gap">
          <JobSiteSign />
          <Verdict ok label="A job-site sign" note="Drawn scene. Realistic scenes are drawn in Figma." />
        </figure>
      </Plate>

      <Plate n={7} id="dont-alter" title="Please don't" text={USAGE.asSupplied}>
        <Donts />
      </Plate>

      <Plate n={8} id="colors" title="Colors and who may use them" text={USAGE.colors}>
        <ColorsAndWho />
      </Plate>
    </section>
  )
}
