import { ArrowRight } from '@phosphor-icons/react/ssr'
import { RequestButton } from '@/components/client/RequestDialog'
import { Mark } from '@/components/Mark'
import { STUDIO } from '@/content/brand'
import { REQUEST_COPY } from '@/content/site'

export function PageClose() {
  return (
    <section className="page-close" aria-labelledby="close-title">
      <div className="wrap">
        <div className="page-close__inner">
          <span className="eyebrow">{REQUEST_COPY.closeEyebrow}</span>
          <h2 id="close-title">{REQUEST_COPY.closeTitle}</h2>
          <p>{REQUEST_COPY.closeBody}</p>
          {/* A filled button, because this close starts something: the request form (README, "Page close"). */}
          <RequestButton className="btn btn--ink">
            {REQUEST_COPY.closeButton}
            <ArrowRight size={16} aria-hidden />
          </RequestButton>
        </div>
      </div>
    </section>
  )
}

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
