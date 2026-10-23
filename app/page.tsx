import type { Metadata } from 'next'
import { Providers } from '@/components/client/Providers'
import { TopBar } from '@/components/client/TopBar'
import { DiagramDefs } from '@/components/diagrams'
import { Hero } from '@/components/Hero'
import { Footer } from '@/components/Footer'
import { PageClose } from '@/components/PageClose'
import { Color, Iconography, SpacingDrawer, Typography, Voice } from '@/components/sections/Foundations'
import { Imagery, InSitu } from '@/components/sections/ImageryAndInSitu'
import { LogoFiles } from '@/components/sections/LogoFiles'
import { UsageRules } from '@/components/sections/UsageRules'
import { STUDIO } from '@/content/brand'
import { SITE_URL } from '@/content/site'

// The canonical sits here, not in the layout, so a future page can't point its canonical at the home page.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
}

/** Tells search engines which site name to show for brand.compass-design.studio. Home page only. */
const WEBSITE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: STUDIO.name,
  alternateName: [new URL(SITE_URL).hostname],
  url: `${SITE_URL}/`,
}

export default function Page() {
  return (
    <Providers>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD).replace(/</g, '\\u003c') }} />
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <DiagramDefs />
      <TopBar />
      <main id="main" tabIndex={-1}>
        <Hero />
        <div className="wrap">
          <LogoFiles />
          <UsageRules />
          <Color />
          <Typography />
          <Voice />
          <Iconography />
          <SpacingDrawer />
          <Imagery />
          <InSitu />
        </div>
        <PageClose />
      </main>
      <Footer />
    </Providers>
  )
}
