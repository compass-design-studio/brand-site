// 01 Logo files: one paired plate per form (navy ink on Paper beside light gold on Ink), the
// other colorways and the usage guidance in native disclosures, the two-tone and reversed
// marks for special moments, then tiles and wordmark bars.

import { getImageProps } from 'next/image'
import { RequestButton } from '@/components/client/RequestDialog'
import { ClearSpace } from '@/components/diagrams'
import { Mark } from '@/components/Mark'
import { Disclosure, Formats, SectionHead, Verdict } from '@/components/ui'
import { BACKGROUND_NAMES, COLORS, COLORWAYS, FORM_USE_FOR, MIN_SIZE, MIN_SIZES, TILE_USE_FOR, TWO_COLOR, USAGE, weakestRatio, type Colorway } from '@/content/brand'
import { IMAGES } from '@/content/images'
import { formatRatio } from '@/lib/contrast'
import { ZIP, zipHref, type ZipDef } from '@/lib/downloads'
import { formatsNote, kitFormats } from '@/lib/format-note'
import { ALL_MARK_FILES, FORMS, MAIN_PAIR, SPECIAL_COLORWAYS, TILES, colorwayCaption, markFile, type Form } from '@/lib/mark-names'

export function LogoFiles() {
  const note = formatsNote()
  return (
    <section className="section" id="logos" aria-labelledby="logos-title">
      <SectionHead
        id="logos"
        title="Logo files"
        eyebrow={`${ALL_MARK_FILES.length} marks · ${kitFormats()}`}
        lead="Start with the wordmark: navy ink on light backgrounds, light gold on dark ones. SVG for screens, PNG for documents, PDF for print."
        aside={
          <a className="btn btn--outline btn--sm" href={zipHref(ZIP.all)} download>
            Download all {ALL_MARK_FILES.length} marks · zip
          </a>
        }
      />
      {note && (
        <p className="formats-note small">
          PNG and PDF files are being exported, so every card links its SVG for now. Need another format before then?{' '}
          <RequestButton className="link-button">Ask us for it</RequestButton>.
        </p>
      )}

      <PairedPlate form={FORMS[0]} startHere />
      <PairedPlate form={FORMS[1]} />
      <div className="plate-row2 grid-shrink">
        <PairedPlate form={FORMS[2]} />
        <PairedPlate form={FORMS[3]} />
      </div>
      <TwoToneAndReversed />
      <TilesAndBars />
    </section>
  )
}

function ZipLink({ zip, label }: { zip: ZipDef; label: string }) {
  return (
    <a className="arrow-link small" href={zipHref(zip)} download>
      {label}
    </a>
  )
}

function PairedPlate({ form, startHere = false }: { form: Form; startHere?: boolean }) {
  const [light, dark] = MAIN_PAIR.map((c) => markFile(form.key, c))
  return (
    <div className="plate" id={`plate-${form.key}`}>
      <div className="plate__title">
        {startHere && <span className="eyebrow">Start here · our most used</span>}
        <h3>{form.name}</h3>
      </div>
      <div className={`pp pp--${form.key} grid-shrink`}>
        <div className="pp__half pp__half--light">
          <Mark file={light} />
        </div>
        <div className="pp__cap pp__cap--light">
          <b>{colorwayCaption(MAIN_PAIR[0])}</b>
          <Formats file={light} />
        </div>
        <div className="pp__half pp__half--dark">
          <Mark file={dark} />
        </div>
        <div className="pp__cap pp__cap--dark">
          <b>{colorwayCaption(MAIN_PAIR[1])}</b>
          <Formats file={dark} />
        </div>
      </div>
      <div className="plate__discs">
        <MoreColorways form={form} />
        <Disclosure label="Usage" what="use it for, backgrounds, clear space, minimum size">
          <UsageSheet form={form} />
        </Disclosure>
      </div>
    </div>
  )
}

function ColorwayRow({ file, title, note, side }: { file: string; title: string; note: string; side: 'light' | 'dark' }) {
  return (
    <div className="cw-row">
      <div className={`cw-row__thumb cw-row__thumb--${side}`}>
        <Mark file={file} />
      </div>
      <div>
        <b>{title}</b>
        <span className="small">{note}</span>
        <Formats file={file} />
      </div>
    </div>
  )
}

function MoreColorways({ form }: { form: Form }) {
  const rest = form.colorways.filter((c) => !MAIN_PAIR.includes(c) && !SPECIAL_COLORWAYS.includes(c))
  const hasSpecial = form.colorways.some((c) => SPECIAL_COLORWAYS.includes(c))
  return (
    <Disclosure label={`${rest.length} more colorways`} what={rest.map((c) => COLORWAYS[c].name.toLowerCase()).join(', ')}>
      <div className="cw-list">
        {rest.map((c) => {
          const cw = COLORWAYS[c]
          return <ColorwayRow key={c} file={markFile(form.key, c)} side={cw.side} title={cw.name} note={`For ${cw.side === 'light' ? 'light backgrounds' : 'dark backgrounds & photos'} · ${cw.approvedNote}`} />
        })}
      </div>
      {hasSpecial && (
        <p className="disc__foot small muted">
          Two-tone and reversed are under{' '}
          <a className="text-link" href="#two-color">
            Two-tone and reversed
          </a>
          , for special moments.
        </p>
      )}
      <p className="disc__foot">
        <ZipLink zip={ZIP.forms[form.key]} label={`All ${form.colorways.length} ${form.name.toLowerCase()} colorways · zip`} />
      </p>
    </Disclosure>
  )
}

const photoChip = getImageProps({ src: IMAGES.hurricaneRanch.src, alt: '', width: 64 }).props.src

function BackgroundChips({ colorway }: { colorway: Colorway }) {
  return (
    <ul>
      {COLORWAYS[colorway].approved.map((bg) => (
        <li key={bg} className="bg-chip">
          <i className="bg-chip__swatch" style={bg === 'photo' ? { backgroundImage: `url(${photoChip})`, backgroundPosition: '35% 100%', backgroundSize: '400%' } : { background: COLORS[bg] }} aria-hidden />
          {BACKGROUND_NAMES[bg]} <span className="muted">{bg === 'photo' ? 'check it' : formatRatio(weakestRatio(colorway, bg))}</span>
        </li>
      ))}
    </ul>
  )
}

function minSizeLine(form: Form): string {
  const row = MIN_SIZES.find((r) => r.form === form.key)!
  const strong = form.key === 'glyph' ? 'gold deep' : 'two-tone and gold deep'
  return `${row.standard.px} px or ${row.standard.mm} mm ${row.axis}; ${strong} ${row.larger.px} px or ${row.larger.mm} mm.`
}

function UsageSheet({ form }: { form: Form }) {
  const narrow = form.colorways.filter((c) => c === 'two-tone' || c === 'gold-deep').map((c, i) => (i ? COLORWAYS[c].name.toLowerCase() : COLORWAYS[c].name))
  const reversed = form.colorways.includes('reversed')
  return (
    <div className="usage-sheet">
      <div className="usage-sheet__item">
        <h4>Use it for</h4>
        <p>{FORM_USE_FOR[form.key]}</p>
      </div>
      <div className="usage-sheet__item">
        <h4>Backgrounds</h4>
        {MAIN_PAIR.map((c) => (
          <div key={c}>
            <p className="usage-sheet__cw">{COLORWAYS[c].name}</p>
            <BackgroundChips colorway={c} />
          </div>
        ))}
        <p className="small muted">
          {narrow.join(' and ')}: Paper and white only.{reversed && ` Reversed: ${COLORWAYS.reversed.approvedNote}.`}
        </p>
      </div>
      <div className="usage-sheet__item">
        <h4>Clear space</h4>
        <div className="mini-diagram">
          <ClearSpace file={markFile(form.key, 'navy-ink')} form={form.key} compact />
        </div>
        <p>{form.key === 'glyph' ? USAGE.clearSpaceGlyph : USAGE.clearSpaceForms}</p>
      </div>
      <div className="usage-sheet__item">
        <h4>Minimum size</h4>
        <p>{minSizeLine(form)}</p>
        <p className="muted">{MIN_SIZE.tooSmall}</p>
      </div>
      <p className="usage-sheet__foot">
        Contrast: {USAGE.contrastShort.charAt(0).toLowerCase() + USAGE.contrastShort.slice(1)}{' '}
        <a className="text-link" href="#rules">
          All usage rules
        </a>
      </p>
    </div>
  )
}

function TwoToneAndReversed() {
  const forms = FORMS.filter((f) => f.colorways.includes('two-tone'))
  return (
    <div className="two-color" id="two-color">
      <div className="plate__title plate__title--stacked">
        <span className="eyebrow">For special moments</span>
        <h3>Two-tone and reversed</h3>
      </div>
      <p className="lead two-color__lead">{TWO_COLOR.lead}</p>

      <div className="tc-plate grid-shrink">
        <div className="tc-plate__half tc-plate__half--light">
          <Mark file="compass-lockup-stacked-two-tone" />
          <span className="tc-plate__cap">Two-tone · {TWO_COLOR.twoToneOn.replace(/^On/, 'on')}</span>
        </div>
        <div className="tc-plate__half tc-plate__half--dark on-dark">
          <Mark file="compass-lockup-stacked-reversed" />
          <span className="tc-plate__cap">Reversed · {TWO_COLOR.reversedOn.replace(/^On/, 'on')}</span>
        </div>
      </div>

      <div className="tc-scenes grid-shrink">
        <figure>
          <div className="tc-cover" role="img" aria-label="A proposal cover on Paper with the two-tone stacked lockup">
            <Mark file="compass-lockup-stacked-two-tone" alt="" className="tc-cover__mark" />
            <i className="tc-cover__rule" />
            <span className="tc-cover__title">Hurricane Ranch</span>
            <span className="tc-cover__meta">Design proposal · New Market · 2026</span>
          </div>
          <Verdict ok label="A proposal cover" note="Flat Paper, one mark, generous space" />
        </figure>
        <figure>
          <div className="tc-slide on-dark" role="img" aria-label="A title slide on Ink with the reversed horizontal lockup">
            <Mark file="compass-lockup-horizontal-reversed" alt="" className="tc-slide__mark" />
            <span className="tc-slide__line">Small on purpose.</span>
          </div>
          <Verdict ok label="A title slide" note="Solid Ink, type only" />
        </figure>
        <figure>
          <div className="tc-square" role="img" aria-label="A typographic social post on white with the two-tone wordmark">
            <Mark file="compass-wordmark-two-tone" alt="" className="tc-square__mark" />
            <span className="tc-square__line">
              Ready-to-build plans,
              <br />
              coming soon.
            </span>
          </div>
          <Verdict ok label="A typographic post" note="No photo behind the mark" />
        </figure>
      </div>

      <ul className="tick-list tc-notes">
        {TWO_COLOR.notes.map((n) => (
          <li key={n.text} className={n.ok ? 'is-ok' : 'is-no'}>
            {n.text}
          </li>
        ))}
      </ul>

      <div className="cw-list tc-files">
        {forms.flatMap((f) =>
          SPECIAL_COLORWAYS.map((c) => (
            <ColorwayRow key={`${f.key}-${c}`} file={markFile(f.key, c)} side={COLORWAYS[c].side} title={`${f.name} · ${COLORWAYS[c].name}`} note={c === 'two-tone' ? TWO_COLOR.twoToneOn : TWO_COLOR.reversedOn} />
          )),
        )}
      </div>
      <p className="disc__foot">
        <ZipLink zip={ZIP.special} label={`All ${ZIP.special.files.length} two-tone and reversed files · zip`} />
      </p>
    </div>
  )
}

function TilesAndBars() {
  const card = (t: (typeof TILES)[number]) => (
    <div key={t.file} className={`tile-card tile-card--${t.shape}`}>
      <div className={`tile-card__art${t.file.endsWith('on-paper') ? ' tile-card__art--edge' : ''}`}>
        <Mark file={t.file} />
      </div>
      <div>
        <b>{t.name}</b>
        <span className="small muted">{TILE_USE_FOR[t.file]}</span>
      </div>
      <Formats file={t.file} />
    </div>
  )
  return (
    <>
      <div className="subhead">
        <h3>Tiles and wordmark bars</h3>
        <span className="small muted">
          They carry their own background, so they work anywhere. <ZipLink zip={ZIP.tiles} label={`All ${ZIP.tiles.files.length} · zip`} />
        </span>
      </div>
      <div className="tiles-row grid-shrink">
        {TILES.filter((t) => t.shape !== 'bar').map(card)}
        <div className="tiles-row__bars grid-shrink">{TILES.filter((t) => t.shape === 'bar').map(card)}</div>
      </div>
    </>
  )
}
