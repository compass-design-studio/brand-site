// 07 Imagery and 08 In situ.

import Image from 'next/image'
import { ChatCircle, DotsThree, Heart, PaperPlaneTilt } from '@phosphor-icons/react/ssr'
import { SignatureBuilder } from '@/components/client/SignatureBuilder'
import { Mark } from '@/components/Mark'
import { Drawer, SectionHead, Verdict } from '@/components/ui'
import { STUDIO } from '@/content/brand'
import { IMAGES, type SiteImage } from '@/content/images'
import { SITE_URL } from '@/content/site'
import { markSrc } from '@/lib/mark-names'
import { formatsFor } from '@/lib/marks'

function Frame({ image, className, sizes, caption = true }: { image: SiteImage; className: string; sizes: string; caption?: boolean }) {
  return (
    <div className={`img-frame__ph ${className}`}>
      <Image src={image.src} alt={image.alt} fill sizes={sizes} style={{ objectFit: 'cover' }} />
      {caption && <span className="capsule">{image.caption}</span>}
    </div>
  )
}

function Tags({ yes, no }: { yes: string[]; no: string }) {
  return (
    <ul className="tags">
      {yes.map((t) => (
        <li key={t}>{t}</li>
      ))}
      <li className="tags__no">
        <span className="sr-only">Not </span>
        {no}
      </li>
    </ul>
  )
}

const WIDE = '(max-width: 820px) 100vw, 620px'
const THUMB = '(max-width: 820px) 50vw, 300px'

export function Imagery() {
  return (
    <section className="section" id="imagery" aria-labelledby="imagery-title">
      <SectionHead id="imagery" title="Imagery" eyebrow="Photography · watercolor" lead="A project moves from watercolor to photography once it's built. The two never mix within one project. Examples only; ask us for files." />
      <div className="imagery grid-shrink">
        <div className="img-frame">
          <Frame image={IMAGES.hurricaneRanch} className="img-frame__ph--wide" sizes={WIDE} />
          <div className="img-frame__thumbs">
            <Frame image={IMAGES.hickersonHome} className="" sizes={THUMB} />
            <Frame image={IMAGES.widnerResidence} className="" sizes={THUMB} />
          </div>
          <div>
            <h3 className="h4">Photography</h3>
            <p className="small muted">For completed work. Warm, slightly desaturated, available light.</p>
          </div>
          <Tags yes={['Warm', 'Available light', 'Slightly desaturated']} no="HDR" />
        </div>
        <div className="img-frame">
          <Frame image={IMAGES.harborLine} className="img-frame__ph--wide" sizes={WIDE} />
          <div className="img-frame__thumbs">
            <Frame image={IMAGES.stoneMeadow} className="" sizes={THUMB} />
            <Frame image={IMAGES.studioTable} className="" sizes={THUMB} />
          </div>
          <div>
            <h3 className="h4">Watercolor</h3>
            <p className="small muted">For ready-to-build plans and the studio itself. Loose washes on paper, navy and tan with a little gold.</p>
          </div>
          <Tags yes={['Loose wash', 'Paper ground', 'Hand-drawn line']} no="Clip art" />
        </div>
      </div>
      <div className="drawers">
        <Drawer title="Text over images" meta="a capsule or a solid panel, never a gradient">
          <div className="pair pair--three grid-shrink">
            <figure>
              <div className="over-image">
                <Image src={IMAGES.hurricaneRanch.src} alt="" fill sizes="(max-width: 900px) 50vw, 400px" style={{ objectFit: 'cover' }} />
                <span className="capsule">Hurricane Ranch · New Market · 2026</span>
              </div>
              <Verdict ok label="Capsule" note="Ink at 85% with a blur" />
            </figure>
            <figure>
              <div className="over-image over-image--bottom">
                <Image src={IMAGES.lanternHouse.src} alt="" fill sizes="(max-width: 900px) 50vw, 400px" style={{ objectFit: 'cover' }} />
                <span className="over-image__panel">A few places we&rsquo;ve shaped.</span>
              </div>
              <Verdict ok label="Solid Ink panel" />
            </figure>
            <figure>
              <div className="over-image over-image--bottom over-image--dont">
                <Image src={IMAGES.lanternHouse.src} alt="" fill sizes="(max-width: 900px) 50vw, 400px" style={{ objectFit: 'cover' }} />
                <i className="over-image__gradient" aria-hidden />
                <span className="over-image__plain">A few places we&rsquo;ve shaped.</span>
              </div>
              <Verdict ok={false} label="Gradient scrim" />
            </figure>
          </div>
        </Drawer>
      </div>
    </section>
  )
}

function Browser({ children, phone = false }: { children: React.ReactNode; phone?: boolean }) {
  return (
    <div className={`browser${phone ? ' browser--phone' : ''}`}>
      {!phone && (
        <div className="browser__chrome" aria-hidden>
          <i />
          <i />
          <i />
          <span>compass-design.studio</span>
        </div>
      )}
      {children}
    </div>
  )
}

export function InSitu() {
  const founder = STUDIO.founders[0]
  const png = (file: string) => (formatsFor(file).png ? `${SITE_URL}${markSrc(file, 'png')}` : undefined)
  const tile = 'compass-tile-email-light-gold-on-ink'
  const wordmark = 'compass-wordmark-navy-ink'
  const copied = { tile: png(tile), wordmark: png(wordmark) }
  return (
    <section className="section" id="insitu" aria-labelledby="insitu-title">
      <SectionHead id="insitu" title="In situ" eyebrow="Website · email · Instagram" lead="The marks where people see them most." />
      <div className="insitu grid-shrink">
        <div className="insitu__wide">
          <div className="subhead subhead--top">
            <h3>Website</h3>
            <span className="small muted">Light gold wordmark over the watercolor gallery</span>
          </div>
          <div className="site-shots grid-shrink">
            <Browser>
              <Image src={IMAGES.liveSite.src} alt={IMAGES.liveSite.alt} sizes="(max-width: 900px) 100vw, 800px" className="site-shots__img" />
            </Browser>
            <Browser phone>
              <Image src={IMAGES.liveSitePhone.src} alt={IMAGES.liveSitePhone.alt} sizes="150px" className="site-shots__img" />
            </Browser>
          </div>
          <p className="mock-note">Screenshots of compass-design.studio, taken 21 October 2026.</p>
        </div>

        <div>
          <div className="subhead subhead--top">
            <h3>Email signature</h3>
            <span className="small muted">Email tile, name, title, the wordmark, one line of contact</span>
          </div>
          <SignatureBuilder
            initial={{ name: founder.name, title: founder.title, email: founder.email, phone: STUDIO.phone }}
            preview={{ tile: markSrc(tile), wordmark: markSrc(wordmark) }}
            copied={copied}
            serviceLine={STUDIO.serviceLine}
            site={STUDIO.site}
          />
          <p className="mock-note">
            The wordmark is 130 px here, above the 120 px minimum.
            {!(copied.tile && copied.wordmark) && ' Copied signatures get the tile and wordmark once their PNG files are exported; until then they copy as text.'}
          </p>
        </div>

        <div>
          <div className="subhead subhead--top">
            <h3>Instagram</h3>
            <span className="small muted">One image, one capsule caption</span>
          </div>
          <div className="ig" role="img" aria-label="A mock Instagram post from compass_design.studio: the Hurricane Ranch exterior with a capsule caption">
            <div className="ig__head">
              <Mark file="compass-tile-light-gold-on-ink" alt="" />
              <div>
                <b>{STUDIO.instagram}</b>
                <span className="small">New Market, Alabama</span>
              </div>
              <DotsThree size={20} aria-hidden className="ig__more" />
            </div>
            <div className="ig__img">
              <Image src={IMAGES.hurricaneRanch.src} alt="" fill sizes="420px" style={{ objectFit: 'cover' }} />
              <span className="capsule">Hurricane Ranch · 2026</span>
            </div>
            <div className="ig__body">
              <div className="ig__icons" aria-hidden>
                <Heart size={22} />
                <ChatCircle size={22} />
                <PaperPlaneTilt size={22} />
              </div>
              <b>{STUDIO.instagram}</b> Timber trusses over the entry and a porch that catches the last light. Hurricane Ranch, New Market.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
