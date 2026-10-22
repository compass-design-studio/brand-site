'use client'

import { ToastProvider } from './Toast'
import { RequestProvider } from './RequestDialog'
import { PrintOpener } from './PrintOpener'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <RequestProvider>
        {children}
        <PrintOpener />
      </RequestProvider>
    </ToastProvider>
  )
}
