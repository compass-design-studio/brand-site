'use client'

// "Download logos": a zip per form, from a menu built on <details>, so it opens without JS.
// JS only closes it on an outside click, Escape, or once a zip is chosen.

import { useEffect, useRef } from 'react'
import { CaretDown, DownloadSimple } from '@phosphor-icons/react'

export type MenuItem = { href: string; label: string; count: number }

export function DownloadMenu({ items, note }: { items: MenuItem[]; note?: string }) {
  const ref = useRef<HTMLDetailsElement>(null)

  useEffect(() => {
    const menu = ref.current
    if (!menu) return
    const onClick = (e: MouseEvent) => {
      if (menu.open && !menu.contains(e.target as Node)) menu.open = false
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && menu.open) {
        menu.open = false
        menu.querySelector('summary')?.focus()
      }
    }
    document.addEventListener('click', onClick)
    menu.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onClick)
      menu.removeEventListener('keydown', onKey)
    }
  }, [])

  return (
    <details ref={ref} className="dl-menu">
      <summary className="btn btn--gold">
        <DownloadSimple size={16} aria-hidden />
        Download logos
        <CaretDown size={16} aria-hidden />
      </summary>
      <div className="dl-menu__panel">
        {items.map((item) => (
          <a key={item.href} href={item.href} download onClick={() => ref.current && (ref.current.open = false)}>
            {item.label}
            <span>
              <span className="sr-only">, </span>
              {item.count} · zip
            </span>
          </a>
        ))}
        {note && <p className="dl-menu__note">{note}</p>}
      </div>
    </details>
  )
}
