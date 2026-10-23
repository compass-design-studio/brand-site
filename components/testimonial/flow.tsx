'use client'

// The testimonial page's state: who's recording, the chosen video, the sign-off and the upload.
// The video goes from the phone straight to private Vercel Blob; /api/testimonial issues the
// upload token after its spam checks and the sign-off check (ADR 0005).

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { upload as uploadToBlob } from '@vercel/blob/client'
import { TESTIMONIAL } from '@/content/site'
import {
  DEFAULT_NAMING,
  VIDEOS_PER_VISIT,
  checkSignOff,
  cleanText,
  firstNamesFrom,
  isVideoFile,
  uploadPathname,
  uploadPayload,
  videoNotes,
  videoRefused,
  videoType,
  type Naming,
  type VideoNote,
  type Who,
} from '@/lib/testimonial'
import { clearProgress, saveProgress, useSavedProgress } from './saved'

const ERRORS = TESTIMONIAL.errors
const ENDPOINT = '/api/testimonial'
/** The server accepts a fill-time token for 24 hours; fetch a new one well before then. */
const TOKEN_REFRESH_MS = 20 * 60 * 60 * 1000
/** Above this, Blob sends the video in parts, in parallel, and retries a part that fails. */
const MULTIPART_FROM = 20_000_000

export type ChosenVideo = {
  file: File
  /** An object URL for the preview. Revoked when the video is replaced or cleared. */
  url: string
  name: string
  /** Bytes. */
  size: number
  /** Seconds, or null when the browser can't read it. */
  duration: number | null
  width: number | null
  height: number | null
  /** True when this browser can show the picture. */
  playable: boolean
  /** True while the page reads the length and shape (usually well under a second). */
  reading: boolean
  /** Problems first, then gentle notes (lib/testimonial.ts). */
  notes: VideoNote[]
}

export type UploadStatus = 'idle' | 'uploading' | 'failed' | 'sent'
export type Upload = { status: UploadStatus; loaded: number; total: number }

export type SignOffErrors = Partial<Record<'video' | 'names' | 'email' | 'agreed', string>>

export type Flow = {
  who: Who
  setWho: (who: Who) => void

  video: ChosenVideo | null
  /** A video is chosen, read, and not refused. */
  videoUsable: boolean
  chooseFile: (file: File) => void

  names: string
  setNames: (v: string) => void
  email: string
  setEmail: (v: string) => void
  naming: Naming
  setNaming: (v: Naming) => void
  agreed: boolean
  setAgreed: (v: boolean) => void
  /** The hidden trap field. People never see it; some bots fill it in. */
  website: string
  setWebsite: (v: string) => void
  /** "Sam" or "Sam and Jamie", from the typed names. Empty until they type. */
  firstNames: string

  /** Everything that stops "Agree and send", including the video. Empty means ready. */
  signOffErrors: () => SignOffErrors

  /** False when the site has no Blob store connected yet; null until the page has asked. */
  uploadsOn: boolean | null
  upload: Upload
  /** 0 to 100, whole numbers. */
  progress: number
  /** Starts the upload when nothing is missing. Returns the errors; empty means it started. */
  send: () => SignOffErrors
  cancel: () => void
  retry: () => void
  /** Clears the video and upload, keeps names, email, naming and agreement. */
  sendAnother: () => void
  canSendAnother: boolean
  sentCount: number
}

type Meta = Pick<ChosenVideo, 'duration' | 'width' | 'height' | 'playable'>
const NO_META: Meta = { duration: null, width: null, height: null, playable: false }

/** Loads the file into an off-page video element just far enough to read its length and shape. */
function readMetadata(url: string): Promise<Meta> {
  return new Promise((resolve) => {
    const el = document.createElement('video')
    let timer = 0
    let done = false
    const finish = (meta: Meta) => {
      if (done) return
      done = true
      window.clearTimeout(timer)
      el.onloadedmetadata = null
      el.onerror = null
      el.removeAttribute('src')
      el.load()
      resolve(meta)
    }
    timer = window.setTimeout(() => finish(NO_META), 8000)
    el.preload = 'metadata'
    el.muted = true
    el.playsInline = true
    el.onloadedmetadata = () => {
      const duration = Number.isFinite(el.duration) && el.duration > 0 ? el.duration : null
      const width = el.videoWidth || null
      const height = el.videoHeight || null
      finish({ duration, width, height, playable: Boolean(width && height) })
    }
    el.onerror = () => finish(NO_META)
    el.src = url
  })
}

/** The fill-time token, and whether uploads are on. `ready` is null when the site couldn't be reached. */
async function askForToken(): Promise<{ token: string; ready: boolean | null }> {
  try {
    const res = await fetch(ENDPOINT, { cache: 'no-store' })
    const data = await res.json()
    return { token: typeof data.token === 'string' ? data.token : '', ready: data.ready !== false }
  } catch {
    // Unknown: let the client try, and show "Try again" if it fails.
    return { token: '', ready: null }
  }
}

/** The copy for a video note. */
export function noteText(note: VideoNote): string {
  return TESTIMONIAL.video.notes[note]
}

const FlowContext = createContext<Flow | null>(null)

export function useFlow(): Flow {
  const flow = useContext(FlowContext)
  if (!flow) throw new Error('useFlow needs a FlowProvider')
  return flow
}

const IDLE: Upload = { status: 'idle', loaded: 0, total: 0 }

export function FlowProvider({ children }: { children: React.ReactNode }) {
  const [who, setWho] = useState<Who>('me')
  const [video, setVideo] = useState<ChosenVideo | null>(null)
  const [names, setNames] = useState('')
  const [email, setEmail] = useState('')
  const [naming, setNaming] = useState<Naming>(DEFAULT_NAMING)
  const [agreed, setAgreed] = useState(false)
  const [website, setWebsite] = useState('')
  const [uploadsOn, setUploadsOn] = useState<boolean | null>(null)
  const [upload, setUpload] = useState<Upload>(IDLE)
  const [sentCount, setSentCount] = useState(0)

  const urlRef = useRef<string | null>(null)
  const readToken = useRef(0)
  const abortRef = useRef<AbortController | null>(null)
  const token = useRef({ value: '', at: 0 })

  // Bring back who's recording and the sign-off details after a reload (never the checkbox).
  const saved = useSavedProgress()
  const [restored, setRestored] = useState(false)
  if (saved && !restored) {
    setRestored(true)
    if (saved.who) setWho(saved.who)
    if (saved.names) setNames(saved.names)
    if (saved.email) setEmail(saved.email)
    if (saved.naming) setNaming(saved.naming)
  }
  useEffect(() => {
    saveProgress({ who, names, email, naming })
  }, [who, names, email, naming])

  const fetchToken = useCallback(async (): Promise<void> => {
    const gate = await askForToken()
    token.current = { value: gate.token, at: Date.now() }
    if (gate.ready !== null) setUploadsOn(gate.ready)
  }, [])

  // Ask once on arrival whether uploads are on, and get the fill-time token.
  useEffect(() => {
    let live = true
    void askForToken().then((gate) => {
      if (!live) return
      token.current = { value: gate.token, at: Date.now() }
      setUploadsOn(gate.ready)
    })
    return () => {
      live = false
    }
  }, [])

  // Free the last preview and stop any upload when the page goes away.
  useEffect(
    () => () => {
      abortRef.current?.abort()
      if (urlRef.current) URL.revokeObjectURL(urlRef.current)
      urlRef.current = null
    },
    [],
  )

  const dropVideo = useCallback(() => {
    readToken.current += 1
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    urlRef.current = null
    setVideo(null)
  }, [])

  const chooseFile = useCallback((file: File) => {
    if (abortRef.current) return
    setUpload(IDLE)
    if (urlRef.current) URL.revokeObjectURL(urlRef.current)
    const url = URL.createObjectURL(file)
    urlRef.current = url
    const read = ++readToken.current
    const isVideo = isVideoFile(file)
    const base = { file, url, name: file.name, size: file.size, ...NO_META, reading: isVideo }
    setVideo({ ...base, notes: videoNotes(file, null) })
    if (!isVideo) return
    void readMetadata(url).then((meta) => {
      if (readToken.current !== read) return
      setVideo({ ...base, ...meta, reading: false, notes: videoNotes(file, meta) })
    })
  }, [])

  const firstNames = useMemo(() => firstNamesFrom(cleanText(names)), [names])
  const videoUsable = Boolean(video && !video.reading && !videoRefused(video.notes))

  const signOffErrors = useCallback((): SignOffErrors => {
    const errors: SignOffErrors = {}
    if (!video) errors.video = ERRORS.video
    else if (video.reading) errors.video = ERRORS.videoReading
    else {
      const problem = video.notes.find((n) => videoRefused([n]))
      if (problem) errors.video = noteText(problem)
    }
    const problems = checkSignOff({ who, names, email, naming, agreed })
    if (problems.names) errors.names = problems.names === 'too-long' ? ERRORS.namesLong : ERRORS.names[who]
    if (problems.email) errors.email = problems.email === 'missing' ? ERRORS.emailEmpty : ERRORS.email
    if (problems.agreed) errors.agreed = ERRORS.agreed
    return errors
  }, [video, who, names, email, naming, agreed])

  const start = useCallback(
    async (file: File, duration: number | null) => {
      const controller = new AbortController()
      abortRef.current = controller
      setUpload({ status: 'uploading', loaded: 0, total: file.size })
      const attempt = async () => {
        if (!token.current.value || Date.now() - token.current.at > TOKEN_REFRESH_MS) await fetchToken()
        await uploadToBlob(uploadPathname(cleanText(names), file, new Date()), file, {
          access: 'private',
          handleUploadUrl: ENDPOINT,
          clientPayload: uploadPayload({ signOff: { who, names, email, naming, agreed }, fileName: file.name, duration, token: token.current.value, website }),
          contentType: videoType(file) || undefined,
          multipart: file.size > MULTIPART_FROM,
          abortSignal: controller.signal,
          onUploadProgress: ({ loaded, total }) => {
            if (!controller.signal.aborted) setUpload({ status: 'uploading', loaded, total: total || file.size })
          },
        })
      }
      try {
        try {
          await attempt()
        } catch (err) {
          // The route refused the token request: most often a token that went stale while the
          // page sat open. Fetch a fresh one and try once more.
          if (controller.signal.aborted || !(err instanceof Error) || !/retrieve the client token/i.test(err.message)) throw err
          token.current = { value: '', at: 0 }
          await attempt()
        }
        setUpload({ status: 'sent', loaded: file.size, total: file.size })
        setSentCount((c) => c + 1)
        clearProgress()
      } catch {
        if (controller.signal.aborted) setUpload(IDLE)
        else setUpload((u) => ({ status: 'failed', loaded: u.loaded, total: u.total || file.size }))
      } finally {
        if (abortRef.current === controller) abortRef.current = null
      }
    },
    [fetchToken, who, names, email, naming, agreed, website],
  )

  const send = useCallback((): SignOffErrors => {
    const errors = signOffErrors()
    if (Object.keys(errors).length || !video || abortRef.current || uploadsOn === false) return errors
    void start(video.file, video.duration)
    return {}
  }, [signOffErrors, video, uploadsOn, start])

  const cancel = useCallback(() => {
    abortRef.current?.abort()
    abortRef.current = null
    setUpload(IDLE)
  }, [])

  const retry = useCallback(() => {
    if (!video || abortRef.current) return
    void start(video.file, video.duration)
  }, [video, start])

  const canSendAnother = upload.status === 'sent' && sentCount < VIDEOS_PER_VISIT

  const sendAnother = useCallback(() => {
    if (sentCount >= VIDEOS_PER_VISIT) return
    setUpload(IDLE)
    dropVideo()
  }, [sentCount, dropVideo])

  // While uploading: keep the screen awake (asked again on return to the tab) and warn before leaving.
  useEffect(() => {
    if (upload.status !== 'uploading') return
    let lock: WakeLockSentinel | null = null
    let cancelled = false
    const request = async () => {
      try {
        if (!('wakeLock' in navigator) || document.visibilityState !== 'visible') return
        const next = await navigator.wakeLock.request('screen')
        if (cancelled) void next.release().catch(() => {})
        else lock = next
      } catch {
        // Not supported, or the browser said no. The page still works.
      }
    }
    const onVisible = () => {
      if (document.visibilityState === 'visible') void request()
    }
    const onLeave = (e: BeforeUnloadEvent) => {
      e.preventDefault()
      e.returnValue = ''
    }
    void request()
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('beforeunload', onLeave)
    return () => {
      cancelled = true
      void lock?.release().catch(() => {})
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('beforeunload', onLeave)
    }
  }, [upload.status])

  const progress = upload.total ? Math.min(100, Math.floor((upload.loaded / upload.total) * 100)) : 0

  const value = useMemo<Flow>(
    () => ({
      who,
      setWho,
      video,
      videoUsable,
      chooseFile,
      names,
      setNames,
      email,
      setEmail,
      naming,
      setNaming,
      agreed,
      setAgreed,
      website,
      setWebsite,
      firstNames,
      signOffErrors,
      uploadsOn,
      upload,
      progress,
      send,
      cancel,
      retry,
      sendAnother,
      canSendAnother,
      sentCount,
    }),
    [who, video, videoUsable, chooseFile, names, email, naming, agreed, website, firstNames, signOffErrors, uploadsOn, upload, progress, send, cancel, retry, sendAnother, canSendAnother, sentCount],
  )

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}
