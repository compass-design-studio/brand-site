'use client'

import { createContext, useCallback, useContext, useRef, useState } from 'react'

const ToastContext = createContext<(message: string) => void>(() => {})

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('')
  const [on, setOn] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)

  const show = useCallback((text: string) => {
    setMessage(text)
    setOn(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setOn(false), 3200)
  }, [])

  return (
    <ToastContext.Provider value={show}>
      {children}
      <div className={`toast${on ? ' toast--on' : ''}`} role="status" aria-live="polite">
        {message}
      </div>
    </ToastContext.Provider>
  )
}

/** Copies text, or rich text with a plain-text fallback, and says what happened. */
export async function copyToClipboard(text: string, html?: string): Promise<'rich' | 'text' | 'failed'> {
  try {
    if (html && typeof ClipboardItem !== 'undefined') {
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': new Blob([html], { type: 'text/html' }),
          'text/plain': new Blob([text], { type: 'text/plain' }),
        }),
      ])
      return 'rich'
    }
    await navigator.clipboard.writeText(text)
    return 'text'
  } catch {
    try {
      await navigator.clipboard.writeText(text)
      return 'text'
    } catch {
      return 'failed'
    }
  }
}
