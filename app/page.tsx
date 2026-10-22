import { Providers } from '@/components/client/Providers'
import { TopBar } from '@/components/client/TopBar'
import { DiagramDefs } from '@/components/diagrams'
import { Hero } from '@/components/Hero'
import { Footer, PageClose } from '@/components/PageClose'
import { Color, Iconography, SpacingDrawer, Typography, Voice } from '@/components/sections/Foundations'
import { Imagery, InSitu } from '@/components/sections/ImageryAndInSitu'
import { LogoFiles } from '@/components/sections/LogoFiles'
import { UsageRules } from '@/components/sections/UsageRules'

export default function Page() {
  return (
    <Providers>
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
