// The testimonial page's upload (ADR 0005). GET issues the fill-time token and says whether
// uploads are on. POST handles Vercel Blob's two calls: the browser asking for an upload token
// once the client has signed (spam checks first, then the sign-off rides in the token), and Blob
// reporting a finished upload, which starts the Drive copy and the emails after the reply.

import { after } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { checkToken, createRateLimiter, issueToken, tokenSecret } from '@/lib/request-server'
import { isUploadPathname, parseUploadPayload, VIDEO_MAX_BYTES } from '@/lib/testimonial'
import { deliverVideo, tokenPayloadFor } from '@/lib/testimonial-server'

export const dynamic = 'force-dynamic'
// Room for the Drive copy of a 1 GB video, which runs after the reply. 300 s is Hobby's ceiling.
export const maxDuration = 300

const NO_STORE = { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' }
const MAX_BODY = 20_000
/** A slow phone connection can take a while with a large video. */
const UPLOAD_WINDOW_MS = 2 * 60 * 60 * 1000
const allow = createRateLimiter(10, 60 * 60 * 1000)

const reply = (body: object, status = 200) => Response.json(body, { status, headers: NO_STORE })
const uploadsOn = () => Boolean(process.env.BLOB_READ_WRITE_TOKEN)

/**
 * Blob calls back to the deployment that issued the token. Preview deployments sit behind
 * Vercel Authentication, so pass the project's automation bypass when there is one.
 */
function callbackUrl(): string | undefined {
  const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET
  const host = process.env.VERCEL_BRANCH_URL || process.env.VERCEL_URL
  if (process.env.VERCEL_ENV !== 'preview' || !bypass || !host) return undefined
  const url = new URL('/api/testimonial', `https://${host}`)
  url.searchParams.set('x-vercel-protection-bypass', bypass)
  return url.toString()
}

export async function GET() {
  return reply({ token: issueToken(Date.now(), tokenSecret(), 'testimonial'), ready: uploadsOn() })
}

export async function POST(request: Request) {
  if (!uploadsOn()) return reply({ error: 'not-configured' }, 503)

  const raw = await request.text()
  if (raw.length > MAX_BODY) return reply({ error: 'too-large' }, 413)
  let body: HandleUploadBody
  try {
    body = JSON.parse(raw)
    if (!body || typeof body !== 'object') throw new Error('not an object')
  } catch {
    return reply({ error: 'invalid' }, 400)
  }

  // Blob's finished-upload call comes from Vercel and is checked by its signature instead.
  if (body.type === 'blob.generate-client-token') {
    const origin = request.headers.get('origin')
    if (origin && new URL(origin).host !== request.headers.get('host')) return reply({ error: 'forbidden' }, 403)
    const ip = (request.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || 'unknown'
    if (!allow(ip, Date.now())) return reply({ error: 'rate-limited' }, 429)
  }

  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        const claim = parseUploadPayload(clientPayload)
        if (!claim || claim.trapped || !isUploadPathname(pathname)) throw new Error('invalid')
        // Reaching "Agree and send" takes far longer than the fill time, so only a forged or stale token fails.
        const token = checkToken(claim.token, Date.now(), tokenSecret(), 'testimonial')
        if (token === 'invalid' || token === 'expired') throw new Error('expired')
        return {
          allowedContentTypes: ['video/*'],
          maximumSizeInBytes: VIDEO_MAX_BYTES,
          validUntil: Date.now() + UPLOAD_WINDOW_MS,
          addRandomSuffix: true,
          callbackUrl: callbackUrl(),
          tokenPayload: tokenPayloadFor({ signOff: claim.signOff, signedAt: new Date().toISOString(), fileName: claim.fileName, duration: claim.duration }),
        }
      },
      onUploadCompleted: async ({ blob, tokenPayload }) => {
        // After the reply, so Blob doesn't time out and retry while the copy runs.
        after(() => deliverVideo(blob, tokenPayload))
      },
    })
    return reply(result)
  } catch (err) {
    const error = err instanceof Error && ['invalid', 'expired'].includes(err.message) ? err.message : 'failed'
    if (error === 'failed') console.error('Testimonial upload route', err)
    return reply({ error }, 400)
  }
}
