import type { Metadata, Viewport } from 'next'
import { DM_Sans, JetBrains_Mono, Tenor_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SITE_URL } from '@/content/site'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/sections.css'
import './styles/print.css'

const display = Tenor_Sans({ weight: '400', subsets: ['latin'], variable: '--font-tenor', display: 'swap' })
const body = DM_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'], variable: '--font-dm-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], weight: ['400', '500'], variable: '--font-jetbrains', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Brand resources · logos and brand guidelines · Compass Design Studio',
  description: 'Download Compass Design Studio logos and read our brand guidelines: usage rules, colors, type and voice. For our staff, contractors and trade partners.',
  openGraph: {
    title: 'Brand resources · logos and brand guidelines',
    description: 'Logos and brand guidelines: colors, type and the rules for using them.',
    url: SITE_URL,
    siteName: 'Compass Design Studio',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#F7F4EE',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
