// What the testimonial page remembers through a reload: the step and the sign-off details, never
// the video or the checkbox. Clients leave the page to record in their camera app, and Safari may
// reload it when they come back. Kept in sessionStorage, so it ends with the tab.

import { useSyncExternalStore } from 'react'
import { NAMINGS, type Naming, type Who } from '@/lib/testimonial'

export type Saved = { step: number; reached: number; who: Who; names: string; email: string; naming: Naming }

const KEY = 'compass-testimonial'
let current: Partial<Saved> = {}
let first: Partial<Saved> | null | undefined

function read(): Partial<Saved> | null {
  try {
    const raw = window.sessionStorage.getItem(KEY)
    if (!raw) return null
    const p = JSON.parse(raw)
    if (!p || typeof p !== 'object') return null
    const out: Partial<Saved> = {}
    if (Number.isInteger(p.step) && p.step >= 0) out.step = p.step
    if (Number.isInteger(p.reached) && p.reached >= 0) out.reached = p.reached
    if (p.who === 'me' || p.who === 'two') out.who = p.who
    if (typeof p.names === 'string') out.names = p.names.slice(0, 200)
    if (typeof p.email === 'string') out.email = p.email.slice(0, 300)
    const naming = NAMINGS.find((n) => n === p.naming)
    if (naming) out.naming = naming
    return out
  } catch {
    return null
  }
}

/** What was saved when the page loaded, read once. Null on the server and when nothing was saved. */
function initial(): Partial<Saved> | null {
  if (first === undefined) {
    first = read()
    current = first ?? {}
  }
  return first
}

const noSubscribe = () => () => {}

export function useSavedProgress(): Partial<Saved> | null {
  return useSyncExternalStore(noSubscribe, initial, () => null)
}

export function saveProgress(part: Partial<Saved>): void {
  initial()
  current = { ...current, ...part }
  try {
    window.sessionStorage.setItem(KEY, JSON.stringify(current))
  } catch {
    // Private mode or storage turned off: the page still works, it just won't remember.
  }
}

export function clearProgress(): void {
  current = {}
  try {
    window.sessionStorage.removeItem(KEY)
  } catch {
    // As above.
  }
}
