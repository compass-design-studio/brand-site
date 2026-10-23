import { ArrowRight } from '@phosphor-icons/react/ssr'
import { RequestButton } from '@/components/client/RequestDialog'
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
