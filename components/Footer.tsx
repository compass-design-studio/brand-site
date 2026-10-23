import { Mark } from '@/components/Mark'
import { STUDIO } from '@/content/brand'

/** The site footer. Its own file, so pages without the request form (the testimonial page) don't load it. */
export function Footer() {
  return (
    <footer className="site-foot on-dark">
      <div className="wrap">
        <Mark file="compass-wordmark-paper" alt="Compass" />
        <div className="site-foot__meta">
          <span>© MMXXVI {STUDIO.name} · Northern Alabama · {STUDIO.serviceLine}</span>
          <span>
            <a href={STUDIO.site}>compass-design.studio</a>
          </span>
        </div>
      </div>
    </footer>
  )
}
