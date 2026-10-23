// Focus moves for the testimonial page: to each new step's heading, to a state that appears, and
// to the first sign-off field that needs attention.

import { useEffect, useRef } from 'react'
import type { SignOffErrors } from './flow'

/** Stable ids for the sign-off fields, so the guide can move focus to the first one with an error. */
export const FIELD_IDS = { names: 'tst-names', email: 'tst-email', agreed: 'tst-agree' } as const

/**
 * Moves focus to the returned element whenever `key` changes (not on first mount).
 * Put it on the heading of a step or state, with tabIndex={-1}.
 */
export function useFocusOnChange<T extends HTMLElement = HTMLHeadingElement>(key: unknown) {
  const ref = useRef<T>(null)
  const prev = useRef(key)
  useEffect(() => {
    if (Object.is(prev.current, key)) return
    prev.current = key
    ref.current?.focus({ preventScroll: true })
  }, [key])
  return ref
}

/** Focuses the returned element once, when it mounts. For a state that appears (sent). */
export function useFocusOnMount<T extends HTMLElement = HTMLHeadingElement>(enabled = true) {
  const ref = useRef<T>(null)
  useEffect(() => {
    if (enabled) ref.current?.focus({ preventScroll: true })
  }, [enabled])
  return ref
}

/** Focuses the first sign-off field with an error. Returns false when the only problem is the video. */
export function focusFirstError(errors: SignOffErrors): boolean {
  const order: (keyof typeof FIELD_IDS)[] = ['names', 'email', 'agreed']
  const first = order.find((k) => errors[k])
  if (!first) return false
  requestAnimationFrame(() => document.getElementById(FIELD_IDS[first])?.focus())
  return true
}
