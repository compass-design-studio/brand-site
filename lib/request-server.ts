// Server side of the request form: spam checks and the email sent through Resend.
// Keys come from environment variables only (see .env.example).

import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto'
import { STEP_TWO, typeLabel, type RequestInput } from '@/lib/request'

// ---------- Minimum fill time: a signed timestamp, issued when the form opens ----------

export const MIN_FILL_MS = 3000
export const MAX_TOKEN_AGE_MS = 24 * 60 * 60 * 1000

const devSecret = randomBytes(32).toString('hex')

export function tokenSecret(env: NodeJS.ProcessEnv = process.env): string {
  return env.REQUEST_FORM_SECRET || env.RESEND_API_KEY || env.BLOB_READ_WRITE_TOKEN || devSecret
}

/** What a token is for, so a request form token can't start an upload, or the other way round. */
export type TokenPurpose = 'brand-request' | 'testimonial'

function sign(issuedAt: string, secret: string, purpose: TokenPurpose): string {
  return createHmac('sha256', secret).update(`${purpose}:${issuedAt}`).digest('base64url')
}

export function issueToken(now: number, secret: string, purpose: TokenPurpose = 'brand-request'): string {
  const issuedAt = String(now)
  return `${issuedAt}.${sign(issuedAt, secret, purpose)}`
}

export type TokenCheck = 'ok' | 'too-fast' | 'expired' | 'invalid'

export function checkToken(token: unknown, now: number, secret: string, purpose: TokenPurpose = 'brand-request'): TokenCheck {
  if (typeof token !== 'string') return 'invalid'
  const [issuedAt, sig] = token.split('.')
  if (!issuedAt || !sig || !/^\d+$/.test(issuedAt)) return 'invalid'
  const expected = Buffer.from(sign(issuedAt, secret, purpose))
  const given = Buffer.from(sig)
  if (expected.length !== given.length || !timingSafeEqual(expected, given)) return 'invalid'
  const age = now - Number(issuedAt)
  if (age < MIN_FILL_MS) return 'too-fast'
  if (age > MAX_TOKEN_AGE_MS) return 'expired'
  return 'ok'
}

// ---------- Rate limit: best effort, per server instance ----------

export function createRateLimiter(limit: number, windowMs: number) {
  const hits = new Map<string, number[]>()
  return (key: string, now: number): boolean => {
    const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs)
    if (recent.length >= limit) {
      hits.set(key, recent)
      return false
    }
    recent.push(now)
    hits.set(key, recent)
    if (hits.size > 5000) hits.delete(hits.keys().next().value!)
    return true
  }
}

// ---------- The email ----------

const oneLine = (s: string) => s.replace(/[\u0000-\u001f\u007f]+/g, ' ').replace(/\s+/g, ' ').trim()

export function composeEmail(input: RequestInput): { subject: string; text: string } {
  const name = oneLine(input.name)
  const label = typeLabel(input.type)
  const which = STEP_TWO[input.type].which
  const lines = [
    `From ${name} <${input.email}>`,
    `Request: ${label}`,
    ...(which && input.which ? [`${which.emailLabel}: ${input.which}`] : []),
    '',
    input.details,
    '',
    '—',
    'Sent from brand.compass-design.studio. Reply to answer them directly.',
  ]
  return { subject: `Brand resources · ${label} · ${name}`, text: lines.join('\n') }
}

export type MailConfig = { apiKey?: string; from: string; to: string[]; dryRun: boolean }

export function mailConfig(env: NodeJS.ProcessEnv = process.env): MailConfig {
  return {
    apiKey: env.RESEND_API_KEY || undefined,
    // Resend's verified sending domain is send.compass-design.studio, not the root domain.
    from: env.REQUEST_FROM_EMAIL || 'Brand resources <brand@send.compass-design.studio>',
    to: (env.REQUEST_TO_EMAIL || 'allison@compass-design.studio,canyon@compass-design.studio')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
    dryRun: env.REQUEST_DRY_RUN === '1',
  }
}

export type SendOptions = {
  replyTo?: string | string[]
  /** Defaults to the founders (`config.to`). */
  to?: string[]
  /** Defaults to `config.from`. */
  from?: string
  /** Resend sends once per key, so a retried callback can't send the same email twice. */
  idempotencyKey?: string
}

export async function sendWithResend(config: MailConfig & { apiKey: string }, email: { subject: string; text: string }, options: SendOptions = {}): Promise<boolean> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      ...(options.idempotencyKey ? { 'Idempotency-Key': options.idempotencyKey } : {}),
    },
    body: JSON.stringify({ from: options.from ?? config.from, to: options.to ?? config.to, reply_to: options.replyTo, subject: email.subject, text: email.text }),
    signal: AbortSignal.timeout(10_000),
  })
  if (!res.ok) console.error('Resend refused the email', res.status, await res.text().catch(() => ''))
  return res.ok
}
