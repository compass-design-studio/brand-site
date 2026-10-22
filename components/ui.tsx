// Small server components shared across sections.

import { Fragment } from 'react'
import { CheckCircle, XCircle } from '@phosphor-icons/react/ssr'
import { sectionNumber, type SectionId } from '@/content/site'
import { altFor, markSrc } from '@/lib/mark-names'
import { FORMATS, formatsFor } from '@/lib/marks'

export function SectionHead({ id, title, eyebrow, lead, aside }: { id: SectionId; title: string; eyebrow?: string; lead?: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <div className="section-head">
      <span className="num" aria-hidden>
        {sectionNumber(id)}
      </span>
      <div className="section-head__titles">
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2 id={`${id}-title`}>{title}</h2>
        {lead && <p className="lead">{lead}</p>}
      </div>
      <div className="section-head__aside">{aside}</div>
    </div>
  )
}

/** SVG · PNG · PDF for one mark. A format is a link only when its file exists. */
export function Formats({ file }: { file: string }) {
  const has = formatsFor(file)
  const name = altFor(file).replace(/^Compass /, '')
  return (
    <div className="formats">
      {FORMATS.map((ext, i) => (
        <Fragment key={ext}>
          {i > 0 && (
            <span className="sep" aria-hidden>
              ·
            </span>
          )}
          {has[ext] ? (
            <a href={markSrc(file, ext)} download={`${file}.${ext}`} aria-label={`${ext.toUpperCase()}, ${name}`}>
              {ext.toUpperCase()}
            </a>
          ) : (
            <span className="fmt-na">
              {ext.toUpperCase()}
              <span className="sr-only"> not exported yet</span>
            </span>
          )}
        </Fragment>
      ))}
    </div>
  )
}

export function Drawer({ title, meta, children, id }: { title: string; meta?: string; children: React.ReactNode; id?: string }) {
  return (
    <details className="drawer" id={id}>
      <summary>
        <span>
          <span className="h4">{title}</span>
          {meta && <span className="small muted"> · {meta}</span>}
        </span>
        <span className="tog" aria-hidden />
      </summary>
      <div className="drawer__body">{children}</div>
    </details>
  )
}

export function Disclosure({ label, what, children }: { label: string; what?: string; children: React.ReactNode }) {
  return (
    <details className="disc">
      <summary>
        <span className="tog" aria-hidden />
        <span className="disc__label">{label}</span>
        {what && <span className="disc__what">{what}</span>}
      </summary>
      <div className="disc__body">{children}</div>
    </details>
  )
}

export function Verdict({ ok, label, note }: { ok: boolean; label: string; note?: React.ReactNode }) {
  return (
    <figcaption className="verdict">
      <span className={ok ? 'do' : 'dont'}>
        {ok ? <CheckCircle size={16} weight="fill" aria-hidden /> : <XCircle size={16} weight="fill" aria-hidden />}
        {!ok && !/^(Don't|Never|Not)/.test(label) && <span className="sr-only">Don&rsquo;t: </span>}
        {label}
      </span>
      {note && <span className="muted">{note}</span>}
    </figcaption>
  )
}
