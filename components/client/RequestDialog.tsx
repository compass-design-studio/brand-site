'use client'

// The request form, version C: pick the request type first, then answer only what that type
// needs, then name and email. Posts to /api/request, which emails both founders.

import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ChatCircleText, Check, FilePlus, PencilSimpleLine, WarningCircle, X } from '@phosphor-icons/react'
import { REQUEST_COPY } from '@/content/site'
import { REQUEST_TYPES, STEP_TWO, typeLabel, validateRequest, type FieldErrors, type RequestField, type RequestType } from '@/lib/request'

type Opener = (trigger: HTMLElement | null) => void
const RequestContext = createContext<Opener>(() => {})

export function useRequestForm() {
  return useContext(RequestContext)
}

/** Any button that opens the request form. Focus returns to it, or to `returnFocusId`, on close. */
export function RequestButton({ children, returnFocusId, ...rest }: React.ButtonHTMLAttributes<HTMLButtonElement> & { returnFocusId?: string }) {
  const open = useRequestForm()
  return (
    <button type="button" aria-haspopup="dialog" {...rest} onClick={(e) => open((returnFocusId && document.getElementById(returnFocusId)) || e.currentTarget)}>
      {children}
    </button>
  )
}

const TYPE_ICONS: Record<RequestType, React.ReactNode> = {
  file: <FilePlus size={24} aria-hidden />,
  correction: <PencilSimpleLine size={24} aria-hidden />,
  question: <ChatCircleText size={24} aria-hidden />,
}

const FOUNDERS = ['allison@compass-design.studio', 'canyon@compass-design.studio']
const EMPTY = { which: '', details: '', name: '', email: '', website: '' }
const FIELD_ORDER: RequestField[] = ['which', 'details', 'name', 'email']

type Step = 'type' | 'details' | 'sent'
type ServerError = 'not-configured' | 'send-failed' | 'rate-limited' | 'expired' | 'network'

export function RequestProvider({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLElement | null>(null)
  const token = useRef<string>('')
  const [step, setStep] = useState<Step>('type')
  const [type, setType] = useState<RequestType | null>(null)
  const [values, setValues] = useState(EMPTY)
  const [errors, setErrors] = useState<FieldErrors>({})
  const [serverError, setServerError] = useState<ServerError | null>(null)
  const [sending, setSending] = useState(false)
  const pendingFocus = useRef<string | null>(null)
  const [focusTick, setFocusTick] = useState(0)
  const focusLater = useCallback((id: string) => {
    pendingFocus.current = id
    setFocusTick((t) => t + 1)
  }, [])

  const fetchToken = useCallback(async () => {
    try {
      const res = await fetch('/api/request', { cache: 'no-store' })
      token.current = (await res.json()).token ?? ''
    } catch {
      token.current = ''
    }
  }, [])

  const reset = useCallback(() => {
    setStep('type')
    setType(null)
    setValues(EMPTY)
    setErrors({})
    setServerError(null)
    setSending(false)
    void fetchToken()
  }, [fetchToken])

  const open = useCallback<Opener>(
    (el) => {
      trigger.current = el
      reset()
      dialog.current?.showModal()
      focusLater('type-card-0')
    },
    [reset, focusLater],
  )

  // Move focus once the step or the errors it points at have rendered.
  useEffect(() => {
    const id = pendingFocus.current
    pendingFocus.current = null
    if (id) document.getElementById(id)?.focus()
  }, [focusTick])

  useEffect(() => {
    const d = dialog.current
    if (!d) return
    const onClose = () => {
      const el = trigger.current
      if (el && document.contains(el)) el.focus()
    }
    d.addEventListener('close', onClose)
    return () => d.removeEventListener('close', onClose)
  }, [])

  const chooseType = (t: RequestType) => {
    setType(t)
    setStep('details')
    setErrors({})
    setServerError(null)
    focusLater(STEP_TWO[t].which ? 'req-which' : 'req-details')
  }

  const set = (field: keyof typeof EMPTY) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    if (errors[field as RequestField]) setErrors((x) => ({ ...x, [field]: undefined }))
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!type || sending) return
    const check = validateRequest({ type, ...values })
    if (!check.ok) {
      setErrors(check.errors)
      const first = FIELD_ORDER.find((f) => check.errors[f])
      if (first) focusLater(`req-${first}`)
      return
    }
    setSending(true)
    setServerError(null)
    try {
      const res = await fetch('/api/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...values, token: token.current }),
      })
      const body = await res.json().catch(() => ({}))
      if (res.ok && body.ok) {
        setStep('sent')
        focusLater('req-title')
      } else if (body.errors) {
        setErrors(body.errors)
        const first = FIELD_ORDER.find((f) => body.errors[f])
        if (first) focusLater(`req-${first}`)
      } else {
        const err: ServerError = ['not-configured', 'rate-limited', 'expired'].includes(body.error) ? body.error : 'send-failed'
        if (err === 'expired') await fetchToken()
        setServerError(err)
        focusLater('req-alert')
      }
    } catch {
      setServerError('network')
      focusLater('req-alert')
    } finally {
      setSending(false)
    }
  }

  const step2 = type ? STEP_TWO[type] : null
  const first = values.name.trim().split(/\s+/)[0]

  return (
    <RequestContext.Provider value={open}>
      {children}
      <dialog ref={dialog} className="req" aria-labelledby="req-title">
        <div className="req__sheet">
          <button type="button" className="icon-btn req__close" aria-label="Close" onClick={() => dialog.current?.close()}>
            <X size={20} aria-hidden />
          </button>

          {step === 'sent' ? (
            <div className="confirm">
              <span className="confirm__tick" aria-hidden>
                <Check size={22} />
              </span>
              <h2 id="req-title" tabIndex={-1}>
                Thanks{first ? `, ${first}` : ''}.
              </h2>
              <p>It&rsquo;s on its way to Allison and Canyon. We&rsquo;ll reply to {values.email} within the week.</p>
              <p className="small muted">{REQUEST_COPY.trust}</p>
              <div className="confirm__actions">
                <button type="button" className="btn btn--ink" onClick={() => dialog.current?.close()}>
                  Done
                </button>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => {
                    reset()
                    focusLater('type-card-0')
                  }}
                >
                  Send another
                </button>
              </div>
            </div>
          ) : (
            <>
              <span className="eyebrow">{REQUEST_COPY.dialogEyebrow}</span>
              <h2 id="req-title" tabIndex={-1}>
                {type ? typeLabel(type) : 'What do you need?'}
              </h2>
              <p className="req__intro">{REQUEST_COPY.dialogIntro}</p>

              {step === 'type' || !type || !step2 ? (
                <div>
                  <p className="req__step">Step 1 of 2</p>
                  <div className="type-cards">
                    {REQUEST_TYPES.map((t, i) => (
                      <button key={t.value} id={`type-card-${i}`} type="button" onClick={() => chooseType(t.value)}>
                        {TYPE_ICONS[t.value]}
                        <b>{t.label}</b>
                        <span>{t.hint}</span>
                      </button>
                    ))}
                  </div>
                  <p className="small muted" style={{ marginTop: 20 }}>
                    {REQUEST_COPY.trust}
                  </p>
                </div>
              ) : (
                <form noValidate onSubmit={submit}>
                  <div className="stepline">
                    <button
                      type="button"
                      onClick={() => {
                        setStep('type')
                        focusLater(`type-card-${REQUEST_TYPES.findIndex((t) => t.value === type)}`)
                      }}
                    >
                      <ArrowLeft size={16} aria-hidden />
                      Change<span className="sr-only"> request type</span>
                    </button>
                    <span>Step 2 of 2 · {typeLabel(type)}</span>
                  </div>

                  {serverError && <ServerAlert error={serverError} />}

                  <div className="form-grid">
                    {step2.which && (
                      <Field id="which" label={step2.which.label} error={errors.which} full>
                        <select id="req-which" name="which" value={values.which} onChange={set('which')} required aria-invalid={!!errors.which} aria-describedby={errors.which ? 'req-which-err' : undefined}>
                          <option value="">Select one</option>
                          {step2.which.options.map((o) => (
                            <option key={o}>{o}</option>
                          ))}
                        </select>
                      </Field>
                    )}
                    <Field id="details" label={step2.details.label} error={errors.details} full>
                      <textarea id="req-details" name="details" value={values.details} onChange={set('details')} placeholder={step2.details.placeholder} required aria-invalid={!!errors.details} aria-describedby={errors.details ? 'req-details-err' : undefined} />
                    </Field>
                    <Field id="name" label="Name" error={errors.name}>
                      <input id="req-name" name="name" type="text" autoComplete="name" value={values.name} onChange={set('name')} required aria-invalid={!!errors.name} aria-describedby={errors.name ? 'req-name-err' : undefined} />
                    </Field>
                    <Field id="email" label="Email" error={errors.email}>
                      <input id="req-email" name="email" type="email" autoComplete="email" value={values.email} onChange={set('email')} required aria-invalid={!!errors.email} aria-describedby={errors.email ? 'req-email-err' : undefined} />
                    </Field>
                  </div>

                  <div className="trap" aria-hidden="true">
                    <label htmlFor="req-website">Leave this empty</label>
                    <input id="req-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
                  </div>

                  <div className="form-foot">
                    <button type="submit" className="btn btn--ink" disabled={sending}>
                      {sending ? 'Sending…' : 'Send request'}
                      <ArrowRight size={16} aria-hidden />
                    </button>
                    <span className="form-foot__trust">{REQUEST_COPY.trust}</span>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </dialog>
    </RequestContext.Provider>
  )
}

function Field({ id, label, error, full, children }: { id: string; label: string; error?: string; full?: boolean; children: React.ReactNode }) {
  return (
    <div className={`field${error ? ' field--invalid' : ''}${full ? ' full' : ''}`}>
      <label htmlFor={`req-${id}`}>{label}</label>
      {children}
      {error && (
        <span className="field__err" id={`req-${id}-err`}>
          <WarningCircle size={14} weight="fill" aria-hidden />
          {error}
        </span>
      )}
    </div>
  )
}

function ServerAlert({ error }: { error: ServerError }) {
  const mail = (
    <>
      <a className="text-link" href={`mailto:${FOUNDERS.join(',')}`}>
        email Allison and Canyon
      </a>{' '}
      directly
    </>
  )
  const text: Record<ServerError, React.ReactNode> = {
    'not-configured': <>The request form isn&rsquo;t connected yet. Until it is, please {mail}.</>,
    'send-failed': <>We couldn&rsquo;t send it. Try again in a moment, or {mail}.</>,
    network: <>We couldn&rsquo;t reach the studio. Check your connection and try again, or {mail}.</>,
    'rate-limited': <>That&rsquo;s a lot of requests from here. Try again in a few minutes, or {mail}.</>,
    expired: <>The form timed out while it was open. Your answers are still here: send it again.</>,
  }
  return (
    <div className="req__alert" id="req-alert" role="alert" tabIndex={-1}>
      <WarningCircle size={18} weight="fill" aria-hidden />
      <p>{text[error]}</p>
    </div>
  )
}
