'use client'

// The top bar with section links, and below the menu breakpoint the design system's two-bar
// menu button with a full-screen Ink sheet.

import { useEffect, useRef, useState } from 'react'
import { Mark } from '@/components/Mark'
import { NAV_BREAKPOINTS } from '@/content/pending-design-system'
import { REQUEST_COPY, SECTIONS, STUDIO_META } from '@/content/site'
import { RequestButton } from './RequestDialog'

// Pending the design system (content/pending-design-system.ts, "menu-breakpoint").
const BREAKPOINT_CSS = `
@media (max-width: ${NAV_BREAKPOINTS.brandLabel}px) { .topbar__label { display: none; } }
@media (max-width: ${NAV_BREAKPOINTS.menu}px) { .topbar__nav { display: none; } .menu-btn { display: block; } }
@media (min-width: ${NAV_BREAKPOINTS.menu + 1}px) { .mobile-sheet { display: none; } }
`

export function TopBar() {
  const [open, setOpen] = useState(false)
  const button = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const outside = [document.getElementById('main'), document.querySelector<HTMLElement>('.site-foot')]
    document.body.classList.toggle('menu-open', open)
    document.body.classList.toggle('is-locked', open)
    outside.forEach((el) => el?.toggleAttribute('inert', open))
    if (!open) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    const wide = window.matchMedia(`(min-width: ${NAV_BREAKPOINTS.menu + 1}px)`)
    const onWide = () => wide.matches && setOpen(false)
    document.addEventListener('keydown', onKey)
    wide.addEventListener('change', onWide)
    return () => {
      document.removeEventListener('keydown', onKey)
      wide.removeEventListener('change', onWide)
    }
  }, [open])

  return (
    <>
      <style>{BREAKPOINT_CSS}</style>
      <header className="topbar">
        <div className="wrap">
          <a className="topbar__brand" href="#top">
            <Mark file="compass-wordmark-navy-ink" alt="Compass, Brand resources, back to top" className="wm-light" preload />
            <Mark file="compass-wordmark-paper" alt="Compass, Brand resources, back to top" className="wm-dark" />
            <span className="topbar__label" aria-hidden>
              Brand resources
            </span>
          </a>
          <nav className="topbar__nav" aria-label="Sections">
            {SECTIONS.map((s) => (
              <a key={s.id} className="topbar__link" href={`#${s.id}`}>
                {s.nav}
              </a>
            ))}
            <RequestButton className="btn btn--outline btn--sm">{REQUEST_COPY.topBar}</RequestButton>
          </nav>
          <button ref={button} id="menu-button" type="button" className="menu-btn" aria-expanded={open} aria-controls="mobile-sheet" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            <span />
            <span />
          </button>
        </div>
      </header>

      <div id="mobile-sheet" className="mobile-sheet on-dark" hidden={!open}>
        <nav aria-label="Sections">
          <ol>
            {SECTIONS.map((s, i) => (
              <li key={s.id} style={{ animationDelay: `${i * 40}ms` }}>
                <a className="mobile-sheet__link" href={`#${s.id}`} onClick={() => setOpen(false)}>
                  <span className="num" aria-hidden>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {s.name}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <div className="mobile-sheet__foot">
          <RequestButton className="btn btn--gold" returnFocusId="menu-button" onClickCapture={() => setOpen(false)}>
            {REQUEST_COPY.topBar}
          </RequestButton>
          <p className="mobile-sheet__meta">{STUDIO_META}</p>
        </div>
      </div>
    </>
  )
}
