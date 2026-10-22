// The request form posts here. GET issues the fill-time token when the form opens; POST checks
// for spam, validates, and sends one email to both founders with the reply-to set to the sender.
// Nothing is sent back to the sender.

import { validateRequest } from '@/lib/request'
import { checkToken, composeEmail, createRateLimiter, issueToken, mailConfig, sendWithResend, tokenSecret } from '@/lib/request-server'

export const dynamic = 'force-dynamic'

const NO_STORE = { 'Cache-Control': 'no-store' }
const MAX_BODY = 20_000
const allow = createRateLimiter(5, 10 * 60 * 1000)

const reply = (body: object, status = 200) => Response.json(body, { status, headers: NO_STORE })

export async function GET() {
  return reply({ token: issueToken(Date.now(), tokenSecret()) })
}

export async function POST(request: Request) {
  const origin = request.headers.get('origin')
  if (origin && new URL(origin).host !== request.headers.get('host')) return reply({ ok: false, error: 'forbidden' }, 403)

  const raw = await request.text()
  if (raw.length > MAX_BODY) return reply({ ok: false, error: 'too-large' }, 413)
  let body: Record<string, unknown>
  try {
    body = JSON.parse(raw)
    if (!body || typeof body !== 'object') throw new Error('not an object')
  } catch {
    return reply({ ok: false, error: 'invalid' }, 400)
  }

  const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
  if (!allow(ip, Date.now())) return reply({ ok: false, error: 'rate-limited' }, 429)

  // Bots that fill the hidden field or post too fast are told it worked, and nothing is sent.
  if (typeof body.website === 'string' && body.website.trim() !== '') return reply({ ok: true })

  // Checked before the token: without a key there's no stable secret to sign it with.
  const config = mailConfig()
  if (!config.apiKey && !config.dryRun) return reply({ ok: false, error: 'not-configured' }, 503)

  const token = checkToken(body.token, Date.now(), tokenSecret())
  if (token === 'too-fast') return reply({ ok: true })
  if (token !== 'ok') return reply({ ok: false, error: 'expired' }, 400)

  const result = validateRequest(body)
  if (!result.ok) return reply({ ok: false, error: 'invalid', errors: result.errors }, 422)

  const email = composeEmail(result.value)
  if (config.dryRun || !config.apiKey) {
    console.info('Request form (dry run, not sent)', { from: config.from, to: config.to, replyTo: result.value.email, ...email })
    return reply({ ok: true })
  }

  try {
    const sent = await sendWithResend({ ...config, apiKey: config.apiKey }, email, result.value.email)
    return sent ? reply({ ok: true }) : reply({ ok: false, error: 'send-failed' }, 502)
  } catch (err) {
    console.error('Request email failed', err)
    return reply({ ok: false, error: 'send-failed' }, 502)
  }
}
