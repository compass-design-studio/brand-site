'use client'

// What to say and how to set up: who's recording, the three beats, the cue card to screenshot,
// the set-up checklist and the framing drawing. Styles in app/styles/testimonial.css (.tst-).

import { useId } from 'react'
import { Camera, Check, CheckCircle, Eye, HandWaving, LockSimple, Quotes, SpeakerSlash, Sun, Timer, User, Users, DeviceMobile, type Icon } from '@phosphor-icons/react'
import { TESTIMONIAL } from '@/content/site'
import type { Who } from '@/lib/testimonial'
import { useFlow } from './flow'

const IDEAS = TESTIMONIAL.ideas
const READY = TESTIMONIAL.ready

/** Segmented radio group: "Just me / The two of us". */
export function WhoToggle() {
  const { who, setWho } = useFlow()
  const name = useId()
  return (
    <fieldset className="tst-who">
      <legend className="tst-who__legend">{TESTIMONIAL.who.question}</legend>
      <div className="tst-seg">
        {TESTIMONIAL.who.options.map((o) => (
          <label key={o.value} className="tst-seg__opt">
            <input className="tst-seg__input" type="radio" name={name} value={o.value} checked={who === o.value} onChange={() => setWho(o.value as Who)} />
            <span className="tst-seg__face">
              {o.value === 'me' ? <User size={18} aria-hidden /> : <Users size={18} aria-hidden />}
              {o.label}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  )
}

/** The opener line, who-aware. */
export function Opener() {
  const { who } = useFlow()
  return (
    <p className="tst-opener">
      <span className="tst-opener__icon" aria-hidden>
        <HandWaving size={18} />
      </span>
      <span>
        <span className="tst-opener__tag">{IDEAS.openerTag}</span>
        {IDEAS.opener[who]}
      </span>
    </p>
  )
}

/** The three beats: a numbered run of big words with the prompt and a hint. */
export function Beats() {
  const { who } = useFlow()
  return (
    <div className="tst-beatsbox">
      <ol className="tst-beats">
        {IDEAS.beats.map((b, i) => (
          <li key={b.id} className="tst-beat">
            <span className="tst-beat__num" aria-hidden>
              {i + 1}
            </span>
            <span className="tst-beat__body">
              <span className="tst-beat__word">{b.word}</span>
              <span className="tst-beat__prompt">{b[who]}</span>
              <span className="tst-beat__hint">{b.hint}</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}

/** "Short on time?": the one question, in a disclosure. */
export function ShortOnTime() {
  return (
    <details className="disc tst-short">
      <summary>
        <Timer size={18} aria-hidden className="tst-short__icon" />
        <span className="disc__label">{IDEAS.shortOnTime.label}</span>
        <span className="tog" aria-hidden />
      </summary>
      <div className="disc__body">
        <p className="tst-short__q">{IDEAS.shortOnTime.question}</p>
      </div>
    </details>
  )
}

/** The nudge toward one specific detail. */
export function Nudge() {
  return (
    <p className="tst-nudge">
      <Quotes size={20} weight="fill" aria-hidden />
      <span>{IDEAS.nudge}</span>
    </p>
  )
}

/** An index card of what to say, in order, to screenshot before recording. */
export function CueCard() {
  const { who } = useFlow()
  return (
    <figure className="tst-cue">
      <figcaption className="tst-cue__title">{READY.cue.title}</figcaption>
      <ol className="tst-cue__list">
        <li>
          <span className="tst-cue__n" aria-hidden>
            1
          </span>
          <span className="tst-cue__line tst-cue__line--small">{IDEAS.opener[who]}</span>
        </li>
        {IDEAS.beats.map((b, i) => (
          <li key={b.id}>
            <span className="tst-cue__n" aria-hidden>
              {i + 2}
            </span>
            <span className="tst-cue__line">
              <span className="tst-cue__word">{b.word}</span>
              <span className="tst-cue__sub">{b[who]}</span>
            </span>
          </li>
        ))}
      </ol>
      <p className="tst-cue__hint">
        <Camera size={16} aria-hidden />
        {READY.cue.hint}
      </p>
    </figure>
  )
}

const TIP_ICONS: Record<string, Icon> = { upright: DeviceMobile, quiet: SpeakerSlash, window: Sun, 'eye-level': Eye, pause: Timer, propped: Users }

/** The tips as a set-up checklist: tap each one as it's done. Nothing waits on it. */
export function SetupChecklist({ ticked, onTicked }: { ticked: string[]; onTicked: (t: string[]) => void }) {
  const { who } = useFlow()
  const tips = who === 'two' ? [...READY.tips.slice(0, 2), READY.tipTwo, ...READY.tips.slice(2)] : READY.tips
  const allSet = tips.every((t) => ticked.includes(t.id))
  const toggle = (id: string) => onTicked(ticked.includes(id) ? ticked.filter((x) => x !== id) : [...ticked, id])
  const headId = useId()
  return (
    <div className="tst-checklist" role="group" aria-labelledby={headId}>
      <div className="tst-checklist__head">
        <span id={headId} className="tst-subhead">
          {READY.setUp}
        </span>
        <span className="tst-checklist__status" aria-live="polite">
          {allSet && (
            <span className="tst-chip tst-chip--ok tst-in">
              <CheckCircle size={14} weight="fill" aria-hidden />
              {READY.allSet}
            </span>
          )}
        </span>
      </div>
      <div className="tst-checklist__list">
        {tips.map((t) => {
          const on = ticked.includes(t.id)
          const TipIcon = TIP_ICONS[t.id] ?? Check
          return (
            <label key={t.id} className={`tst-checklist__item${on ? ' is-on' : ''}`}>
              <input type="checkbox" checked={on} onChange={() => toggle(t.id)} />
              <span className="tst-checklist__icon" aria-hidden>
                {on ? <Check size={16} weight="bold" /> : <TipIcon size={18} />}
              </span>
              <span className="tst-checklist__title">{t.title}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

/** "No dressing up", "Start over", "About a minute": small reassurance chips. */
export function EasyChips() {
  return (
    <ul className="tst-easy">
      {READY.easy.map((e) => (
        <li key={e}>
          <Check size={14} weight="bold" aria-hidden />
          {e}
        </li>
      ))}
    </ul>
  )
}

/** "Please leave out prices and your street address." */
export function SmallAsk() {
  return (
    <p className="tst-smallask">
      <LockSimple size={16} aria-hidden />
      <span>{READY.smallAsk}</span>
    </p>
  )
}

/** "Record it in your camera app": the one Ink moment, right above "I've recorded it". */
export function RecordPanel() {
  const id = useId()
  return (
    <section className="tst-ink on-dark tst-record" aria-labelledby={id}>
      <span className="tst-record__icon" aria-hidden>
        <Camera size={22} />
      </span>
      <div className="tst-record__text">
        <h2 id={id} className="tst-record__title">
          {READY.record.title}
        </h2>
        <p className="tst-record__body">{READY.record.body}</p>
        <p className="tst-record__keep">
          <Check size={14} weight="bold" aria-hidden />
          {READY.record.keepOpen}
        </p>
      </div>
    </section>
  )
}

/** A line drawing, never a sample testimonial: an upright phone at eye level, a window to one side. */
export function FramingDrawing({ className }: { className?: string }) {
  const { who } = useFlow()
  return (
    <svg className={`tst-framing${className ? ` ${className}` : ''}`} viewBox="0 0 300 228" role="img" aria-label={READY.drawing[who]}>
      <g fill="none" stroke="var(--navy-deep)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        {/* Window, to one side */}
        <rect x="16" y="36" width="80" height="112" rx="3" />
        <path d="M56 36v112M16 92h80M8 156h96" />
        {/* Phone, upright */}
        <rect x="160" y="18" width="100" height="182" rx="16" />
        <rect x="168" y="38" width="84" height="152" rx="4" />
        <circle cx="210" cy="28" r="2" />
        {/* Books under it: eye level */}
        <rect x="146" y="200" width="128" height="11" rx="2" />
        <rect x="154" y="211" width="112" height="11" rx="2" />
        {who === 'two' ? (
          <>
            <circle cx="193" cy="96" r="17" />
            <circle cx="229" cy="98" r="16" />
            <path d="M168 190c2-30 12-50 25-50 9 0 14 5 17 11 3-6 9-10 19-10 13 0 21 18 23 49" />
            <path d="M186 104q7 5 14 0M222 106q7 5 14 0" />
          </>
        ) : (
          <>
            <circle cx="210" cy="94" r="23" />
            <path d="M172 190c3-34 18-52 38-52s35 18 38 52" />
            <path d="M201 103q9 7 18 0" />
          </>
        )}
      </g>
      {/* Window light on the face: the one gold accent */}
      <g stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round">
        <path d="M106 66l38 12M106 92h40M106 118l38-12" />
      </g>
    </svg>
  )
}
