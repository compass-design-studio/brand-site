import type { Metadata } from 'next'
import { Footer } from '@/components/Footer'
import { Mark } from '@/components/Mark'
import { TestimonialPage } from '@/components/testimonial/StepGuide'
import { STUDIO } from '@/content/brand'
import { TESTIMONIAL } from '@/content/site'
import '../styles/testimonial.css'

// The unlisted testimonial page (ADR 0005): we send its link to clients after a project, and
// they send back a short selfie video. Kept out of search and the sitemap, and linked from
// nowhere on the site. Standalone chrome: no top bar, no request form.
export const metadata: Metadata = {
  title: TESTIMONIAL.meta.title,
  description: TESTIMONIAL.meta.description,
  robots: { index: false, follow: false },
  // Clients get this link by email or text, so the preview should name this page, not Brand resources.
  openGraph: { title: TESTIMONIAL.meta.title, description: TESTIMONIAL.meta.description, url: '/testimonial', siteName: STUDIO.name, type: 'website' },
}

export default function Page() {
  return (
    <div className="tst-page">
      <a className="skip-link" href="#main">
        {TESTIMONIAL.skip}
      </a>
      <header className="tst-masthead">
        <div className="wrap tst-masthead__in">
          <a className="tst-masthead__brand" href={STUDIO.site}>
            <Mark file="compass-wordmark-navy-ink" alt={TESTIMONIAL.home} preload />
          </a>
        </div>
      </header>
      <main id="main" className="tst-main" tabIndex={-1}>
        <TestimonialPage />
      </main>
      <Footer />
    </div>
  )
}
