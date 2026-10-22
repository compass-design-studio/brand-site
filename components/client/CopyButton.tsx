'use client'

import { copyToClipboard, useToast } from './Toast'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & { text: string; done: string }

/** A button that copies `text` and confirms with a toast. */
export function CopyButton({ text, done, children, ...rest }: Props) {
  const toast = useToast()
  return (
    <button
      type="button"
      {...rest}
      onClick={async () => {
        const result = await copyToClipboard(text)
        toast(result === 'failed' ? 'Copy failed: your browser blocked the clipboard' : done)
      }}
    >
      {children}
    </button>
  )
}
