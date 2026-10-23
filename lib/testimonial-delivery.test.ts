// The Drive copy, end to end against a stand-in for Google Drive and Vercel Blob: the calls must
// work in a shared drive, file each client in their own folder, and number their takes.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { TESTIMONIAL_SIGN_OFF } from '@/content/site'
import { deliverVideo, tokenPayloadFor } from '@/lib/testimonial-server'

vi.mock('@vercel/blob', () => ({
  head: vi.fn(async () => ({ size: 5, contentType: 'video/quicktime' })),
  get: vi.fn(async () => ({
    statusCode: 200,
    stream: new ReadableStream<Uint8Array>({
      start(c) {
        c.enqueue(new Uint8Array([1, 2, 3, 4, 5]))
        c.close()
      },
    }),
    blob: { size: 5, contentType: 'video/quicktime' },
  })),
  del: vi.fn(async () => {}),
  put: vi.fn(async () => ({})),
  issueSignedToken: vi.fn(async () => ({})),
  presignUrl: vi.fn(async () => ({ presignedUrl: 'https://blob.test/v' })),
}))

const blob = { url: 'https://store.private.blob.vercel-storage.com/testimonials/2026-10-23-sam-rivera-K3j.mov', pathname: 'testimonials/2026-10-23-sam-rivera-K3j.mov' }
const payload = tokenPayloadFor({
  signOff: { who: 'two', names: 'Sam and Jamie Rivera', email: 'sam@example.com', naming: 'names-town', version: TESTIMONIAL_SIGN_OFF.version },
  signedAt: '2026-10-23T15:04:05.000Z',
  fileName: 'IMG_0412.MOV',
  duration: 58,
})

type Call = { method: string; url: URL; body: string }
type Drive = { home: boolean; clientFolder: boolean; videosSoFar: number }

/** A stand-in for Google's token and Drive endpoints. Records every call. */
function fakeGoogle(drive: Drive) {
  const calls: Call[] = []
  vi.stubGlobal('fetch', async (input: string | URL, init: RequestInit = {}) => {
    const url = new URL(String(input))
    const method = init.method ?? 'GET'
    const body = typeof init.body === 'string' ? init.body : init.body instanceof URLSearchParams ? init.body.toString() : ''
    calls.push({ method, url, body })
    const json = (data: object, headers: Record<string, string> = {}) => new Response(JSON.stringify(data), { status: 200, headers })
    if (url.hostname === 'oauth2.googleapis.com') return json({ access_token: 'token' })
    if (url.pathname === '/drive/v3/files' && method === 'GET') {
      const q = url.searchParams.get('q') ?? ''
      if (q.includes("key='compassUse'")) return json({ files: drive.home ? [{ id: 'home' }] : [] })
      if (q.includes("key='compassClient'")) return json({ files: drive.clientFolder ? [{ id: 'client', webViewLink: 'https://drive.test/client' }] : [] })
      if (q.includes("mimeType contains 'video/'")) return json({ files: Array.from({ length: drive.videosSoFar }, (_, i) => ({ id: `v${i}` })) })
    }
    if (url.pathname === '/drive/v3/files' && method === 'POST') {
      const meta = JSON.parse(body)
      return json({ id: meta.parents ? 'client' : 'home', webViewLink: `https://drive.test/${meta.parents ? 'client' : 'home'}` })
    }
    if (url.pathname === '/upload/drive/v3/files' && url.searchParams.get('uploadType') === 'resumable') return json({}, { location: 'https://upload.test/session' })
    if (url.hostname === 'upload.test') return json({ id: 'video', webViewLink: 'https://drive.test/video', size: '5' })
    if (url.searchParams.get('uploadType') === 'multipart') return json({ id: 'sign-off', webViewLink: 'https://drive.test/sign-off' })
    return new Response('unexpected', { status: 500 })
  })
  return calls
}

let logged: { founders: { text: string } } | undefined

beforeEach(() => {
  vi.stubEnv('GOOGLE_CLIENT_ID', 'id')
  vi.stubEnv('GOOGLE_CLIENT_SECRET', 'secret')
  vi.stubEnv('GOOGLE_REFRESH_TOKEN', 'refresh')
  vi.stubEnv('RESEND_API_KEY', '')
  logged = undefined
  vi.spyOn(console, 'info').mockImplementation((_label, data) => {
    logged = data
  })
  vi.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
  vi.restoreAllMocks()
})

const driveCalls = (calls: Call[]) => calls.filter((c) => c.url.hostname === 'www.googleapis.com')

describe('testimonial Drive copy', () => {
  it('works in a shared drive: every Drive call says so', async () => {
    const calls = fakeGoogle({ home: true, clientFolder: false, videosSoFar: 0 })
    await deliverVideo(blob, payload)
    expect(driveCalls(calls).length).toBeGreaterThan(0)
    for (const c of driveCalls(calls)) expect(c.url.searchParams.get('supportsAllDrives')).toBe('true')
    for (const c of driveCalls(calls).filter((c) => c.method === 'GET')) {
      expect(c.url.searchParams.get('includeItemsFromAllDrives')).toBe('true')
      expect(c.url.searchParams.get('corpora')).toBe('allDrives')
    }
  })

  it("gives a new client their own folder, named as they typed, and files take 1 there", async () => {
    const calls = fakeGoogle({ home: true, clientFolder: false, videosSoFar: 0 })
    await deliverVideo(blob, payload)
    const made = calls.find((c) => c.method === 'POST' && c.url.pathname === '/drive/v3/files')
    expect(JSON.parse(made!.body)).toMatchObject({ name: 'Sam and Jamie Rivera', parents: ['home'] })
    const video = calls.find((c) => c.url.searchParams.get('uploadType') === 'resumable')
    expect(JSON.parse(video!.body)).toMatchObject({ name: '2026-10-23 Sam and Jamie Rivera, take 1.mov', parents: ['client'] })
    const signOff = calls.find((c) => c.url.searchParams.get('uploadType') === 'multipart')
    expect(signOff!.body).toContain('"name":"2026-10-23 Sam and Jamie Rivera, take 1 sign-off.txt"')
    expect(signOff!.body).toContain('Signed by: Sam and Jamie Rivera')
    expect(logged?.founders.text).toContain('Google Drive: https://drive.test/video (take 1)')
    expect(logged?.founders.text).toContain('Their folder: https://drive.test/client')
    expect(logged?.founders.text).toContain('Vercel Blob: deleted, now that Drive has it.')
  })

  it("puts a client's next take in the same folder, numbered on", async () => {
    const calls = fakeGoogle({ home: true, clientFolder: true, videosSoFar: 1 })
    await deliverVideo(blob, payload)
    expect(calls.some((c) => c.method === 'POST' && c.url.pathname === '/drive/v3/files')).toBe(false)
    const video = calls.find((c) => c.url.searchParams.get('uploadType') === 'resumable')
    expect(JSON.parse(video!.body).name).toBe('2026-10-23 Sam and Jamie Rivera, take 2.mov')
  })

  it("makes a new home in My Drive if it can't find its folder, and says so", async () => {
    const calls = fakeGoogle({ home: false, clientFolder: false, videosSoFar: 0 })
    await deliverVideo(blob, payload)
    const home = calls.find((c) => c.method === 'POST' && c.url.pathname === '/drive/v3/files' && !JSON.parse(c.body).parents)
    expect(JSON.parse(home!.body).name).toBe('Client Testimonials')
    expect(logged?.founders.text).toContain("couldn't find its Client Testimonials folder")
  })
})
