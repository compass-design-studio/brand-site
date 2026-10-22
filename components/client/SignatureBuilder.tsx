'use client'

// Fill in name and title, see the signature live, and copy it as rich text for Gmail and Outlook.
// Email clients don't show SVG, so copied signatures use the PNG exports once they exist.

import { useId, useState } from 'react'
import { Copy } from '@phosphor-icons/react'
import { copyToClipboard, useToast } from './Toast'

type Person = { name: string; title: string; email: string; phone: string }
type Images = { tile?: string; wordmark?: string }

const esc = (s: string) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

export function signatureHtml(p: Person, img: Images, serviceLine: string, site: string): string {
  const tile = img.tile ? `<td style="padding-right:16px;vertical-align:top"><img src="${img.tile}" width="88" height="45" alt="Compass Design Studio" style="display:block;border:0"></td>` : ''
  const mark = img.wordmark
    ? `<div style="padding:8px 0 4px"><img src="${img.wordmark}" width="130" height="24" alt="Compass" style="display:block;border:0;width:130px;height:auto"></div>`
    : `<div style="padding:6px 0 2px">Compass Design Studio</div>`
  const host = site.replace(/^https?:\/\//, '')
  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:Arial,Helvetica,sans-serif;color:#1A2A36"><tr>${tile}<td style="vertical-align:top;font-size:13px;line-height:1.45">
<div style="font-family:'Tenor Sans',Optima,Georgia,serif;font-size:18px;letter-spacing:.04em;color:#1A2A36">${esc(p.name)}</div>
<div style="font-size:12px;letter-spacing:.04em;color:#1F4A66">${esc(p.title)}</div>
${mark}
<div><a href="mailto:${esc(p.email)}" style="color:#1F4A66">${esc(p.email)}</a> · ${esc(p.phone)}</div>
<div style="color:#5D6873;font-size:12px">${esc(serviceLine)} · <a href="${esc(site)}" style="color:#1F4A66">${esc(host)}</a></div>
</td></tr></table>`
}

export function SignatureBuilder({ initial, preview, copied, serviceLine, site }: { initial: Person; preview: Images; copied: Images; serviceLine: string; site: string }) {
  const [p, setP] = useState(initial)
  const toast = useToast()
  const id = useId()
  const field = (key: keyof Person, label: string, type: string, autoComplete: string) => (
    <div className="field">
      <label htmlFor={`${id}-${key}`}>{label}</label>
      <input id={`${id}-${key}`} type={type} autoComplete={autoComplete} value={p[key]} onChange={(e) => setP({ ...p, [key]: e.target.value })} />
    </div>
  )

  const copy = async () => {
    const text = `${p.name}\n${p.title}\nCompass Design Studio\n${p.email} · ${p.phone}\n${site.replace(/^https?:\/\//, '')}`
    const result = await copyToClipboard(text, signatureHtml(p, copied, serviceLine, site))
    toast(
      result === 'rich'
        ? "Signature copied. Paste it into Gmail's or Outlook's signature settings."
        : result === 'text'
          ? 'Copied as plain text: your browser blocked rich text'
          : 'Copy failed: your browser blocked the clipboard',
    )
  }

  return (
    <div className="sig-card">
      <div className="sig-fields">
        {field('name', 'Name', 'text', 'name')}
        {field('title', 'Title', 'text', 'organization-title')}
        {field('email', 'Email', 'email', 'email')}
        {field('phone', 'Phone', 'tel', 'tel')}
      </div>
      <div className="sig-preview" aria-label="Signature preview" role="group" dangerouslySetInnerHTML={{ __html: signatureHtml(p, preview, serviceLine, site) }} />
      <div className="sig-actions">
        <button type="button" className="btn btn--outline btn--sm" onClick={copy}>
          <Copy size={16} aria-hidden />
          Copy signature
        </button>
        <span className="small muted">Copies as rich text for Gmail and Outlook.</span>
      </div>
    </div>
  )
}
