'use client'

// Sending and sent: the progress bar with "Try again", the thank-you with what happens next and
// our sign-off, and the quiet interview link.

import { ArrowCounterClockwise, ArrowUpRight, CalendarBlank, Check, CheckCircle, DeviceMobile, VideoCamera, WarningCircle } from '@phosphor-icons/react'
import { Mark } from '@/components/Mark'
import { TESTIMONIAL } from '@/content/site'
import { formatAmount } from '@/lib/testimonial'
import { useFlow } from './flow'
import { useFocusOnMount } from './focus'

const SENDING = TESTIMONIAL.sending
const SENT = TESTIMONIAL.sent

/** The progress bar, "42% · 38 of 91 MB", keep-open note and Cancel; or the failed message and "Try again". */
export function UploadProgress() {
  const { upload, progress, cancel, retry } = useFlow()
  const { status, loaded, total } = upload
  const active = status === 'uploading' || status === 'failed'
  const finishing = status === 'uploading' && progress >= 100
  const milestone = Math.floor(progress / 25) * 25
  const amount = total ? formatAmount(loaded, total) : ''
  // The visible failed note isn't in the live region, so the failure is announced once.
  const announce = status === 'failed' ? SENDING.failed : status === 'sent' ? SENDING.sent : status === 'uploading' && milestone > 0 ? SENDING.milestone(milestone) : ''

  return (
    <div className="tst-upload">
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
      {active && (
        <div className={`tst-upload__box${status === 'failed' ? ' is-failed' : ''}`}>
          {status === 'failed' ? (
            <p className="tst-note is-problem" aria-hidden>
              <WarningCircle size={18} weight="fill" />
              <span>{SENDING.failed}</span>
            </p>
          ) : (
            <div className="tst-upload__row">
              <span className="tst-upload__nums" aria-hidden>
                {finishing ? SENDING.finishing : SENDING.progress(progress, amount)}
              </span>
              <button type="button" className="tst-textbtn" onClick={cancel}>
                {SENDING.cancel}
              </button>
            </div>
          )}
          <div
            className="tst-bar"
            role="progressbar"
            aria-label={SENDING.label}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-valuetext={SENDING.progress(progress, amount)}
          >
            <span className="tst-bar__fill" style={{ transform: `scaleX(${progress / 100})` }} />
          </div>
          {status === 'failed' ? (
            <div className="tst-upload__actions">
              <button type="button" className="btn btn--ink" onClick={retry}>
                <ArrowCounterClockwise size={18} aria-hidden />
                {SENDING.retry}
              </button>
              <button type="button" className="tst-textbtn" onClick={cancel}>
                {SENDING.cancel}
              </button>
            </div>
          ) : (
            <p className="tst-upload__keep">
              <DeviceMobile size={16} aria-hidden />
              {SENDING.keepOpen}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

/**
 * The thank-you: tick, the page's heading with their first names, another take, then `children`
 * (what happens next) and our sign-off, in reading order.
 */
export function SentMessage({ children }: { children?: React.ReactNode }) {
  const { firstNames, sentCount, canSendAnother, sendAnother } = useFlow()
  const ref = useFocusOnMount<HTMLHeadingElement>()
  return (
    <div className="tst-sent">
      <span className="confirm__tick tst-sent__tick" aria-hidden>
        <Check size={22} weight="bold" />
      </span>
      <h1 className="tst-sent__title" ref={ref} tabIndex={-1}>
        {SENT.title(firstNames)}
      </h1>
      <p className="tst-sent__body">{SENT.body}</p>
      {sentCount > 1 && (
        <p className="tst-chip tst-chip--ok">
          <CheckCircle size={14} weight="fill" aria-hidden />
          {SENT.count(sentCount)}
        </p>
      )}
      {canSendAnother && (
        <button type="button" className="btn btn--outline tst-sent__another" onClick={sendAnother}>
          <VideoCamera size={18} aria-hidden />
          {SENT.another}
        </button>
      )}
      {children}
      <div className="tst-sent__sign">
        <Mark file="compass-glyph-gold-deep" alt="" className="tst-sent__glyph" />
        <div>
          <p>{SENT.signOff}</p>
          <p className="tst-sent__signature">{SENT.signature}</p>
        </div>
      </div>
    </div>
  )
}

/** The quiet "Rather talk it through? Book a short interview instead". */
export function InterviewLink() {
  const { text, link, href } = TESTIMONIAL.interview
  return (
    <p className="tst-interview">
      <CalendarBlank size={16} aria-hidden />
      <span>
        {text}{' '}
        <a className="text-link" href={href} target="_blank" rel="noopener noreferrer">
          {link}
          <ArrowUpRight size={12} aria-hidden className="tst-interview__arrow" />
        </a>
      </span>
    </p>
  )
}
