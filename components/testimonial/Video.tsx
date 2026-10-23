'use client'

// Choosing and showing the video: the file picker, the 9:16 preview card with its length, size
// and notes, the empty slot before a video is chosen, and the small summary on the sign-off step.

import { useId, useRef, useState } from 'react'
import { CheckCircle, FilmStrip, Info, LockSimple, PaperPlaneTilt, VideoCamera, WarningCircle } from '@phosphor-icons/react'
import { TESTIMONIAL } from '@/content/site'
import { formatBytes, formatDuration, videoRefused, type VideoNote } from '@/lib/testimonial'
import { noteText, useFlow, type ChosenVideo } from './flow'

const VIDEO = TESTIMONIAL.video
const SIGN_OFF = TESTIMONIAL.signOff

/** A hidden video file input and a function that opens it. Render `input` somewhere in the tree. */
export function useVideoInput() {
  const { chooseFile } = useFlow()
  const ref = useRef<HTMLInputElement>(null)
  const input = (
    <input
      ref={ref}
      type="file"
      accept="video/*"
      className="sr-only"
      tabIndex={-1}
      aria-hidden
      onChange={(e) => {
        const file = e.currentTarget.files?.[0]
        // Reset, so choosing the same file again still fires a change.
        e.currentTarget.value = ''
        if (file) chooseFile(file)
      }}
    />
  )
  return { open: () => ref.current?.click(), input }
}

/** "Choose your video": a real button that opens the phone's library. */
export function VideoPicker({ label, className }: { label?: string; className?: string }) {
  const { upload } = useFlow()
  const { open, input } = useVideoInput()
  return (
    <>
      <button type="button" className={`btn btn--ink tst-pickbtn${className ? ` ${className}` : ''}`} onClick={open} disabled={upload.status === 'uploading'}>
        <VideoCamera size={18} aria-hidden />
        {label ?? VIDEO.choose}
      </button>
      {input}
    </>
  )
}

function NoteLine({ note }: { note: VideoNote }) {
  const problem = videoRefused([note])
  return (
    <p className={`tst-note${problem ? ' is-problem' : ''}`} role={problem ? 'alert' : undefined}>
      {problem ? <WarningCircle size={18} weight="fill" aria-hidden /> : <Info size={18} aria-hidden />}
      <span>{noteText(note)}</span>
    </p>
  )
}

/** The chosen video: a 9:16 preview (or a calm card), its length, size and name, and any notes. */
export function VideoCard() {
  const { video, videoUsable, upload } = useFlow()
  const { open, input } = useVideoInput()
  if (!video) return null

  const status = upload.status
  const locked = status === 'uploading' || status === 'sent'
  const refused = !video.reading && !videoUsable
  const showPicture = video.playable && !video.reading
  const chip =
    status === 'sent' ? (
      <span className="tst-chip tst-chip--ok">
        <CheckCircle size={14} weight="fill" aria-hidden />
        {VIDEO.sent}
      </span>
    ) : status === 'uploading' ? (
      <span className="tst-chip tst-chip--live">
        <PaperPlaneTilt size={14} aria-hidden />
        {VIDEO.sending}
      </span>
    ) : (
      <span className="tst-chip">
        <LockSimple size={14} aria-hidden />
        {VIDEO.notSent}
      </span>
    )

  return (
    <div className={`tst-vcard${refused ? ' is-refused' : ''}`}>
      <div className="tst-vcard__in">
        <div className={`tst-vframe${video.notes.includes('sideways') ? ' is-sideways' : ''}`}>
          {video.reading ? (
            <div className="tst-vframe__calm" role="status">
              <span className="tst-spinner" aria-hidden />
              <span>{VIDEO.reading}</span>
            </div>
          ) : showPicture ? (
            <video key={video.url} src={video.url} playsInline muted controls preload="metadata" aria-label={VIDEO.preview} />
          ) : (
            <div className="tst-vframe__calm">
              <FilmStrip size={36} aria-hidden />
              <span className="tst-vframe__name">{video.name}</span>
            </div>
          )}
        </div>
        <div className="tst-vcard__side">
          {chip}
          <dl className="tst-vmeta">
            <div>
              <dt>{VIDEO.length}</dt>
              <dd>{video.reading ? '…' : formatDuration(video.duration) || VIDEO.unknown}</dd>
            </div>
            <div>
              <dt>{VIDEO.size}</dt>
              <dd>{formatBytes(video.size)}</dd>
            </div>
            <div className="tst-vmeta__file">
              <dt>{VIDEO.file}</dt>
              <dd title={video.name}>{video.name}</dd>
            </div>
          </dl>
          {video.notes.length > 0 && (
            <div className="tst-notes">
              {video.notes.map((n) => (
                <NoteLine key={n} note={n} />
              ))}
            </div>
          )}
          {/* A refused video's fix is the guide's filled "Choose a different one", in the step's foot. */}
          {!locked && !refused && (
            <div className="tst-vcard__actions">
              <button type="button" className="tst-textbtn" onClick={open}>
                {VIDEO.chooseAgain}
              </button>
            </div>
          )}
          {input}
        </div>
      </div>
    </div>
  )
}

/**
 * Where the preview will land: the same shape as VideoCard, empty. The real "Choose your video"
 * is the filled button in the foot; the slot is a pointer shortcut to it (tap, or drop a file).
 */
export function EmptyVideo() {
  const { chooseFile } = useFlow()
  const { open, input } = useVideoInput()
  const [drag, setDrag] = useState(false)
  return (
    <div className="tst-vcard">
      <div className="tst-vcard__in">
        <button
          type="button"
          className={`tst-slot${drag ? ' is-drag' : ''}`}
          tabIndex={-1}
          aria-hidden
          onClick={open}
          onDragOver={(e) => {
            e.preventDefault()
            setDrag(true)
          }}
          onDragLeave={() => setDrag(false)}
          onDrop={(e) => {
            e.preventDefault()
            setDrag(false)
            const file = e.dataTransfer.files?.[0]
            if (file) chooseFile(file)
          }}
        >
          <VideoCamera size={30} />
          <span>{drag ? VIDEO.dropHere : VIDEO.slot}</span>
        </button>
        {input}
        <div className="tst-vcard__side" aria-hidden>
          <span className="tst-chip tst-chip--quiet">{VIDEO.notChosen}</span>
          <dl className="tst-vmeta tst-emptymeta">
            <div>
              <dt>{VIDEO.length}</dt>
              <dd>–</dd>
            </div>
            <div>
              <dt>{VIDEO.size}</dt>
              <dd>–</dd>
            </div>
            <div className="tst-vmeta__file">
              <dt>{VIDEO.file}</dt>
              <dd>–</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

/** A still of the chosen video (its first frame), or a calm icon. Decorative. `quiet`: no icon. */
export function Thumb({ video, className, quiet = false }: { video: ChosenVideo | null; className: string; quiet?: boolean }) {
  const still = video && video.playable && !video.reading
  return (
    <span className={className} aria-hidden>
      {still ? (
        <video src={`${video.url}#t=0.1`} muted playsInline preload="metadata" tabIndex={-1} />
      ) : quiet ? null : video ? (
        <FilmStrip size={20} />
      ) : (
        <VideoCamera size={20} />
      )}
    </span>
  )
}

/** What's about to be sent, right above "Agree and send", with a way back to change it. */
export function VideoSummary({ showErrors, onVideo, fixRef }: { showErrors: boolean; onVideo: () => void; fixRef: React.RefObject<HTMLButtonElement | null> }) {
  const { video, signOffErrors } = useFlow()
  const errId = useId()
  const error = signOffErrors().video
  const problem = Boolean(error) && (showErrors || Boolean(video && !video.reading))
  const meta = video ? [formatDuration(video.duration), formatBytes(video.size)].filter(Boolean).join(' · ') : ''

  return (
    <div className="tst-vsum-wrap">
      <div className="tst-vsum__head">
        <h2 className="tst-subhead">{SIGN_OFF.yours}</h2>
        {video && (
          <span className="tst-chip">
            <LockSimple size={14} aria-hidden />
            {VIDEO.notSent}
          </span>
        )}
      </div>
      <div className={`tst-vsum${problem ? ' is-problem' : ''}`}>
        <Thumb video={video} className="tst-vsum__thumb" />
        <div className="tst-vsum__text">
          <span className="tst-vsum__name" title={video?.name}>
            {video ? video.name : SIGN_OFF.none}
          </span>
          {problem ? (
            <span className="field__err" id={errId} role="alert">
              <WarningCircle size={14} weight="fill" aria-hidden />
              {error}
            </span>
          ) : meta ? (
            <span className="tst-vsum__meta">{meta}</span>
          ) : null}
        </div>
        <button ref={fixRef} type="button" className="tst-textbtn tst-vsum__btn" onClick={onVideo} aria-describedby={problem ? errId : undefined}>
          {video ? (
            <>
              {SIGN_OFF.change}
              <span className="sr-only">{SIGN_OFF.changeSr}</span>
            </>
          ) : (
            VIDEO.choose
          )}
        </button>
      </div>
    </div>
  )
}
