// The request form (version C, request type first): its options and validation.
// Shared by the dialog and the server route, so both say the same thing.

import { SECTIONS } from '@/content/site'

export const REQUEST_TYPES = [
  { value: 'file', label: 'A missing file', hint: "A format, size or version that isn't here." },
  { value: 'correction', label: 'A correction', hint: 'Something on this page is wrong or out of date.' },
  { value: 'question', label: 'A question', hint: 'How to use a mark, a color or a file.' },
] as const

export type RequestType = (typeof REQUEST_TYPES)[number]['value']

export const FILE_OPTIONS = ['A mark in another format or size', 'A black or white version', "A mark that isn't in the kit", 'Something else']
export const SECTION_OPTIONS = [...SECTIONS.map((s) => s.name), 'Somewhere else']

/** What step 2 asks for each type. Questions have no "which" field. */
export const STEP_TWO: Record<RequestType, { which?: { label: string; options: string[]; emailLabel: string }; details: { label: string; placeholder?: string } }> = {
  file: {
    which: { label: 'Which file?', options: FILE_OPTIONS, emailLabel: 'File' },
    details: { label: "What's it for?", placeholder: 'For example: a job-site sign, 1.2 m wide, printed on vinyl.' },
  },
  correction: {
    which: { label: 'Which section?', options: SECTION_OPTIONS, emailLabel: 'Section' },
    details: { label: "What's wrong?" },
  },
  question: { details: { label: 'Your question' } },
}

export type RequestInput = { type: RequestType; which: string; details: string; name: string; email: string }
export type RequestField = keyof RequestInput
export type FieldErrors = Partial<Record<RequestField, string>>

export const LIMITS = { name: 100, email: 254, details: 4000, links: 5 }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const LINK = /(https?:\/\/|www\.)\S+/gi

export function typeLabel(type: RequestType): string {
  return REQUEST_TYPES.find((t) => t.value === type)!.label
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

export function validateRequest(raw: Record<string, unknown>): { ok: true; value: RequestInput } | { ok: false; errors: FieldErrors } {
  const errors: FieldErrors = {}
  const type = str(raw.type) as RequestType
  const known = REQUEST_TYPES.some((t) => t.value === type)
  if (!known) errors.type = 'Choose what you need.'

  const name = str(raw.name)
  if (!name) errors.name = 'Enter your name.'
  else if (name.length > LIMITS.name) errors.name = `Keep your name under ${LIMITS.name} characters.`

  const email = str(raw.email)
  if (!email) errors.email = 'Enter your email, so we can reply.'
  else if (email.length > LIMITS.email || !EMAIL.test(email)) errors.email = 'Enter an email address like name@company.com.'

  const which = str(raw.which)
  const step = known ? STEP_TWO[type] : undefined
  if (step?.which && !step.which.options.includes(which)) errors.which = 'Select one.'

  const details = str(raw.details)
  if (!details) errors.details = 'Add a few words, so we know what you need.'
  else if (details.length > LIMITS.details) errors.details = `Keep it under ${LIMITS.details.toLocaleString('en-US')} characters.`
  else if ((details.match(LINK) ?? []).length > LIMITS.links) errors.details = `Include no more than ${LIMITS.links} links.`

  if (Object.keys(errors).length) return { ok: false, errors }
  return { ok: true, value: { type, which: step?.which ? which : '', details, name, email } }
}
