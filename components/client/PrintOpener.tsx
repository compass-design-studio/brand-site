'use client'

import { useEffect } from 'react'

/** Opens every disclosure and drawer for printing, and closes the ones it opened afterwards. */
export function PrintOpener() {
  useEffect(() => {
    let opened: HTMLDetailsElement[] = []
    const before = () => {
      opened = [...document.querySelectorAll<HTMLDetailsElement>('main details:not([open]):not(.dl-menu)')]
      opened.forEach((d) => (d.open = true))
    }
    const after = () => {
      opened.forEach((d) => (d.open = false))
      opened = []
    }
    window.addEventListener('beforeprint', before)
    window.addEventListener('afterprint', after)
    return () => {
      window.removeEventListener('beforeprint', before)
      window.removeEventListener('afterprint', after)
    }
  }, [])
  return null
}
