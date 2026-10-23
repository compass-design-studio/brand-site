'use client'

// The testimonial page: a stepped guide, one thing per screen on a white plate. Welcome · Ideas ·
// Get ready · Your video · Sign off, then Sending and Sent on the same plate. A labelled stepper
// on desktop becomes "Step 2 of 5 · Ideas" on phones. Each step has one filled button in the
// plate's foot, which becomes a sticky bar on phones. Chosen in the prototype on 23 October 2026
// (branch prototype/testimonial-flows, variant A with the three beats).

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, CaretLeft, Check, DeviceMobile, EnvelopeSimple, FilmSlate, Info, PaperPlaneTilt, ShieldCheck, Timer, WarningCircle, type Icon } from '@phosphor-icons/react'
import { STUDIO } from '@/content/brand'
import { TESTIMONIAL, TESTIMONIAL_SIGN_OFF } from '@/content/site'
import { formatBytes, videoRefused, type Naming } from '@/lib/testimonial'
import { FlowProvider, noteText, useFlow } from './flow'
import { focusFirstError, useFocusOnChange } from './focus'
import { Beats, CueCard, EasyChips, FramingDrawing, Nudge, Opener, RecordPanel, SetupChecklist, ShortOnTime, SmallAsk, WhoToggle } from './Ideas'
import { saveProgress, useSavedProgress } from './saved'
import { InterviewLink, SentMessage, UploadProgress } from './Sending'
import { SignOffFields } from './SignOff'
import { EmptyVideo, Thumb, VideoCard, VideoPicker, VideoSummary } from './Video'

const T = TESTIMONIAL

type StepKey = 'welcome' | 'ideas' | 'ready' | 'video' | 'signoff'
const STEPS: StepKey[] = ['welcome', 'ideas', 'ready', 'video', 'signoff']
const VIDEO_STEP = 3
const SIGN_OFF_STEP = 4
/** Welcome to Your video: the steps a client has been through once they've sent a video. */
const BEFORE_SIGN_OFF = [0, 1, 2, 3]
type Screen = StepKey | 'sending' | 'sent'
type HeadRef = React.RefObject<HTMLHeadingElement | null>

export function TestimonialPage() {
  return (
    <FlowProvider>
      <StepGuide />
    </FlowProvider>
  )
}

function StepGuide() {
  const { upload, video, videoUsable, send, uploadsOn } = useFlow()
  const status = upload.status

  const [step, setStep] = useState(0)
  const [reached, setReached] = useState(0)
  /** Steps the client has moved on from: these get a tick in the stepper. */
  const [passed, setPassed] = useState<number[]>([])
  const [showErrors, setShowErrors] = useState(false)
  const [ticked, setTicked] = useState<string[]>([])
  const [lastStatus, setLastStatus] = useState(status)

  // Back where they were after a reload. The video isn't kept, so nothing past "Your video".
  const saved = useSavedProgress()
  const [restored, setRestored] = useState(false)
  if (saved && !restored) {
    setRestored(true)
    const s = Math.min(saved.step ?? 0, VIDEO_STEP, STEPS.length - 1)
    if (s > 0) {
      setStep(s)
      setReached(Math.max(s, Math.min(saved.reached ?? 0, STEPS.length - 1)))
      setPassed(Array.from({ length: s }, (_, i) => i))
    }
  }
  useEffect(() => {
    saveProgress({ step, reached })
  }, [step, reached])

  // "Send another take" clears the video and the upload: open "Your video" for the next take.
  if (lastStatus !== status) {
    setLastStatus(status)
    if (lastStatus === 'sent' && status === 'idle') {
      setStep(VIDEO_STEP)
      setReached(SIGN_OFF_STEP)
      setPassed((p) => [...new Set([...p, ...BEFORE_SIGN_OFF])])
      setShowErrors(false)
    }
  }

  const screen: Screen = status === 'uploading' || status === 'failed' ? 'sending' : status === 'sent' ? 'sent' : STEPS[step]
  // Focus the new heading on every screen change, and when an upload stops or restarts.
  const headRef = useFocusOnChange<HTMLHeadingElement>(screen === 'sending' ? `sending-${status}` : screen)

  // A new screen starts at the top: bring the stepper back into view if it scrolled away.
  const navRef = useRef<HTMLElement>(null)
  const shownScreen = useRef(screen)
  useEffect(() => {
    if (shownScreen.current === screen) return
    shownScreen.current = screen
    const top = navRef.current?.getBoundingClientRect().top ?? 0
    if (top < 0) window.scrollTo({ top: window.scrollY + top - 12, behavior: 'instant' })
  }, [screen])

  const fixVideoRef = useRef<HTMLButtonElement>(null)

  const goTo = (n: number) => {
    if (n > step) setPassed((p) => (p.includes(step) ? p : [...p, step]))
    setStep(n)
    setReached((r) => Math.max(r, n))
  }

  const onSend = () => {
    const errors = send()
    if (!Object.keys(errors).length) return
    setShowErrors(true)
    // Only the video is missing or refused: the fields are fine, so point at the video row.
    if (!focusFirstError(errors)) requestAnimationFrame(() => fixVideoRef.current?.focus())
  }

  /* The one filled button for this screen, and an optional hint above it. */
  let primary: React.ReactNode = null
  let hint: React.ReactNode = null
  if (screen === 'welcome') {
    primary = (
      <button type="button" className="btn btn--ink tst-primary" onClick={() => goTo(1)}>
        {T.welcome.start}
        <ArrowRight size={16} aria-hidden />
      </button>
    )
  } else if (screen === 'ideas') {
    primary = (
      <button type="button" className="btn btn--ink tst-primary" onClick={() => goTo(2)}>
        {T.ideas.next}
        <ArrowRight size={16} aria-hidden />
      </button>
    )
  } else if (screen === 'ready') {
    primary = (
      <button type="button" className="btn btn--ink tst-primary" onClick={() => goTo(VIDEO_STEP)}>
        {T.ready.recorded}
        <ArrowRight size={16} aria-hidden />
      </button>
    )
  } else if (screen === 'video') {
    if (!video) primary = <VideoPicker />
    else if (video.reading) {
      primary = (
        <button type="button" className="btn btn--ink tst-primary" aria-disabled>
          {T.video.use}
        </button>
      )
    } else if (videoUsable) {
      primary = (
        <button type="button" className="btn btn--ink tst-primary" onClick={() => goTo(SIGN_OFF_STEP)}>
          {T.video.use}
          <ArrowRight size={16} aria-hidden />
        </button>
      )
      // A gentle note (a little long, sideways, can't preview). On a phone the card's own note sits
      // under a tall preview, so it's repeated here, beside the button it's reassuring about.
      const note = video.notes[0]
      if (note) {
        hint = (
          <p className="tst-hint tst-hint--note">
            <Info size={16} aria-hidden />
            {noteText(note)}
          </p>
        )
      }
    } else {
      // Refused (too long, too big, not a video): "Choose a different one" moves into the foot, so
      // on a phone the fix and the reason sit in the sticky bar instead of below the preview.
      const problem = video.notes.find((n) => videoRefused([n]))
      primary = <VideoPicker label={T.video.chooseAgain} />
      if (problem) {
        hint = (
          <p className="tst-hint tst-hint--problem">
            <WarningCircle size={16} weight="fill" aria-hidden />
            {noteText(problem)}
          </p>
        )
      }
    }
  } else if (screen === 'signoff') {
    if (uploadsOn === false) {
      // No Blob store connected yet: the same terms, then the studio's email instead of an upload.
      const off = T.signOff.off
      hint = (
        <p className="tst-hint tst-hint--off">
          <Info size={16} aria-hidden />
          {off.text}
        </p>
      )
      const to = STUDIO.founders.map((p) => p.email).join(',')
      primary = (
        <a className="btn btn--ink tst-primary" href={`mailto:${to}?subject=${encodeURIComponent(off.subject)}`}>
          <EnvelopeSimple size={18} aria-hidden />
          {off.button}
        </a>
      )
    } else {
      primary = (
        <button type="button" className="btn btn--ink tst-primary" onClick={onSend}>
          <PaperPlaneTilt size={18} aria-hidden />
          {TESTIMONIAL_SIGN_OFF.button}
        </button>
      )
    }
  }

  const onStep = screen !== 'sending' && screen !== 'sent'
  const stack = onStep ? Math.min(2, STEPS.length - 1 - step) : 0

  return (
    <div className="wrap tst">
      <div className="tst-col">
        <Stepper navRef={navRef} screen={screen} step={step} reached={reached} passed={passed} onGo={goTo} />

        <div className="tst-sheet" data-stack={stack}>
          <span className="tst-sheet__under tst-sheet__under--2" aria-hidden />
          <span className="tst-sheet__under tst-sheet__under--1" aria-hidden />
          <div className="tst-plate">
            <div key={screen} className="tst-body tst-in">
              {screen === 'welcome' && <Welcome headRef={headRef} onSkip={() => goTo(VIDEO_STEP)} />}
              {screen === 'ideas' && <Ideas headRef={headRef} />}
              {screen === 'ready' && <Ready headRef={headRef} ticked={ticked} onTicked={setTicked} />}
              {screen === 'video' && <YourVideo headRef={headRef} />}
              {screen === 'signoff' && <SignOff headRef={headRef} showErrors={showErrors} onVideo={() => goTo(VIDEO_STEP)} fixRef={fixVideoRef} />}
              {screen === 'sending' && <Sending headRef={headRef} />}
              {screen === 'sent' && <Sent />}
            </div>

            {onStep && (
              <div className="tst-actions">
                {hint}
                <div className="tst-actions__row">
                  {step > 0 && (
                    <button type="button" className="tst-textbtn tst-back" onClick={() => goTo(step - 1)}>
                      <CaretLeft size={16} aria-hidden />
                      {T.steps.back}
                    </button>
                  )}
                  <div className="tst-actions__main">{primary}</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {(screen === 'welcome' || screen === 'sent') && (
          <div className="tst-below">
            <InterviewLink />
          </div>
        )}
      </div>
    </div>
  )
}

/* ---------- Stepper: labelled on desktop, "Step 2 of 5 · Ideas" on phones ---------- */

function Stepper({
  navRef,
  screen,
  step,
  reached,
  passed,
  onGo,
}: {
  navRef: React.RefObject<HTMLElement | null>
  screen: Screen
  step: number
  reached: number
  passed: number[]
  onGo: (n: number) => void
}) {
  const locked = screen === 'sending' || screen === 'sent'
  const total = STEPS.length
  const isDone = (i: number) => locked || (passed.includes(i) && i !== step)
  // Welcome shows a sliver, Sign off most of it, Sending nearly all, Sent the whole rule.
  const frac = screen === 'sent' ? 1 : locked ? 0.92 : (step + 1) / (total + 1)

  return (
    <nav ref={navRef} className="tst-steps" aria-label={T.steps.nav}>
      <ol className="tst-steps__list">
        {STEPS.map((key, i) => {
          const current = !locked && i === step
          const done = isDone(i)
          const canGo = !locked && !current && i <= reached
          const face = (
            <>
              <span className="tst-steps__dot" aria-hidden>
                {done ? <Check size={14} weight="bold" /> : i + 1}
              </span>
              <span className="tst-steps__label">
                {T.steps.names[i]}
                {done && <span className="sr-only">, {T.steps.done}</span>}
              </span>
            </>
          )
          const cls = ['tst-steps__item', done && 'is-done', current && 'is-current', i > 0 && isDone(i - 1) && 'is-linked'].filter(Boolean).join(' ')
          return (
            <li key={key} className={cls} aria-current={current ? 'step' : undefined}>
              {canGo ? (
                <button type="button" className="tst-steps__btn" onClick={() => onGo(i)}>
                  {face}
                </button>
              ) : (
                <span className="tst-steps__btn">{face}</span>
              )}
            </li>
          )
        })}
      </ol>
      <div className="tst-steps__compact">
        <p>
          {screen === 'sent' ? (
            <b>{T.steps.allDone}</b>
          ) : (
            <>
              <span>{T.steps.stepOf(locked ? total : step + 1, total)}</span>
              <span aria-hidden>·</span>
              <b>{locked ? T.steps.sending : T.steps.names[step]}</b>
            </>
          )}
        </p>
        <span className="tst-rule" aria-hidden>
          <span style={{ transform: `scaleX(${Math.min(1, frac)})` }} />
        </span>
      </div>
    </nav>
  )
}

/* ---------- 1. Welcome ---------- */

const FACT_ICONS: Record<string, Icon> = { length: Timer, camera: DeviceMobile, takes: FilmSlate }

function Welcome({ headRef, onSkip }: { headRef: HeadRef; onSkip: () => void }) {
  const W = T.welcome
  return (
    <>
      <header className="tst-head">
        <span className="eyebrow">{W.eyebrow}</span>
        <h1 ref={headRef} tabIndex={-1} className="tst-title tst-title--hero">
          {W.title}
        </h1>
        <p className="lead">{W.lead}</p>
      </header>

      <div className="tst-facts">
        <ul>
          {W.facts.map((f) => {
            const FactIcon = FACT_ICONS[f.id] ?? Check
            return (
              <li key={f.id} className="tst-fact">
                <span className="tst-fact__icon" aria-hidden>
                  <FactIcon size={18} />
                </span>
                <span>
                  <span className="tst-fact__label">{f.label}</span>
                  <span className="tst-fact__value">{f.value}</span>
                </span>
              </li>
            )
          })}
        </ul>
      </div>

      <WhoToggle />

      <p className="tst-howuse">
        <ShieldCheck size={18} aria-hidden />
        <span>{W.howWeUseIt}</span>
      </p>

      <button type="button" className="tst-textbtn tst-skip" onClick={onSkip}>
        {W.skip}
        <ArrowRight size={14} aria-hidden />
      </button>
    </>
  )
}

/* ---------- 2. Ideas ---------- */

function Ideas({ headRef }: { headRef: HeadRef }) {
  return (
    <>
      <header className="tst-head">
        <h1 ref={headRef} tabIndex={-1} className="tst-title">
          {T.ideas.title}
        </h1>
        <p className="tst-lead">{T.ideas.lead}</p>
      </header>
      <div className="tst-prompts">
        <Opener />
        <Beats />
        <ShortOnTime />
        <Nudge />
      </div>
    </>
  )
}

/* ---------- 3. Get ready ---------- */

function Ready({ headRef, ticked, onTicked }: { headRef: HeadRef; ticked: string[]; onTicked: (t: string[]) => void }) {
  return (
    <>
      <header className="tst-head">
        <h1 ref={headRef} tabIndex={-1} className="tst-title">
          {T.ready.title}
        </h1>
        <p className="tst-lead">{T.ready.lead}</p>
      </header>

      <div className="tst-cue-wrap">
        <CueCard />
      </div>

      <div className="tst-setup">
        <div className="tst-setup__in">
          <FramingDrawing className="tst-setup__drawing" />
          <div className="tst-setup__side">
            <SetupChecklist ticked={ticked} onTicked={onTicked} />
            <EasyChips />
          </div>
        </div>
      </div>

      <RecordPanel />
      <SmallAsk />
    </>
  )
}

/* ---------- 4. Your video ---------- */

function YourVideo({ headRef }: { headRef: HeadRef }) {
  const { video } = useFlow()
  return (
    <>
      <header className="tst-head">
        <h1 ref={headRef} tabIndex={-1} className="tst-title">
          {T.video.title}
        </h1>
        <p className="tst-lead">{T.video.hint}</p>
      </header>
      {video ? <VideoCard /> : <EmptyVideo />}
    </>
  )
}

/* ---------- 5. Sign off ---------- */

function SignOff({ headRef, showErrors, onVideo, fixRef }: { headRef: HeadRef; showErrors: boolean; onVideo: () => void; fixRef: React.RefObject<HTMLButtonElement | null> }) {
  const { sentCount, agreed } = useFlow()
  return (
    <>
      <header className="tst-head">
        <h1 ref={headRef} tabIndex={-1} className="tst-title">
          {TESTIMONIAL_SIGN_OFF.title}
        </h1>
        <p className="tst-lead">{TESTIMONIAL_SIGN_OFF.lead}</p>
      </header>
      {sentCount > 0 && agreed && (
        <p className="tst-note">
          <Info size={18} aria-hidden />
          <span>{T.signOff.carried}</span>
        </p>
      )}
      <SignOffFields showErrors={showErrors} />
      <VideoSummary showErrors={showErrors} onVideo={onVideo} fixRef={fixRef} />
    </>
  )
}

/* ---------- Sending ---------- */

function Sending({ headRef }: { headRef: HeadRef }) {
  const { upload, progress, video } = useFlow()
  const failed = upload.status === 'failed'
  return (
    <>
      <header className="tst-head">
        <h1 ref={headRef} tabIndex={-1} className="tst-title">
          {failed ? T.sending.failedTitle : T.sending.title}
        </h1>
      </header>
      <div className="tst-sending">
        <div className="tst-sending__in">
          <div className={`tst-sending__frame${failed ? ' is-failed' : ''}`} aria-hidden>
            {/* Quiet: with no still, the percentage alone sits on the plain Ink frame. */}
            <Thumb video={video} className="tst-sending__still" quiet />
            <span className="tst-sending__veil">{failed ? <WarningCircle size={34} weight="fill" /> : <span className="tst-sending__pct">{progress}%</span>}</span>
            <span className="tst-sending__bar" style={{ transform: `scaleX(${progress / 100})` }} />
          </div>
          <div className="tst-sending__side">
            {video && (
              <p className="tst-sending__file">
                <span className="tst-sending__name" title={video.name}>
                  {video.name}
                </span>
                <span className="tst-sending__size">{formatBytes(video.size)}</span>
              </p>
            )}
            <UploadProgress />
          </div>
        </div>
      </div>
    </>
  )
}

/* ---------- Sent ---------- */

function nextItems(firstNames: string, naming: Naming) {
  const { watch, trim, share } = T.sent.next
  const named = naming === 'none' ? share.none : naming === 'first-names' ? share.firstNames(firstNames) : share.namesTown(firstNames)
  return [watch, trim, { title: share.title, detail: named }]
}

function Sent() {
  const { firstNames, naming } = useFlow()
  return (
    <SentMessage>
      <section className="tst-next" aria-labelledby="tst-next-title">
        <h2 id="tst-next-title" className="tst-subhead">
          {T.sent.nextTitle}
        </h2>
        <ol className="tst-next__list">
          {nextItems(firstNames, naming).map((it, i) => (
            <li key={it.title} className="tst-next__item">
              <span className="tst-next__dot" aria-hidden>
                {i + 1}
              </span>
              <span className="tst-next__text">
                <span className="tst-next__title">{it.title}</span>
                <span className="tst-next__detail">{it.detail}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>
    </SentMessage>
  )
}
