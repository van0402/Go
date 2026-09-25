import './htply.css'
// import { Nav } from './Nav'
import { Hero } from './Hero'
import { StatStrip } from './StatStrip'
import { About } from './About'
import { Products } from './Products'
import { InsideBoard } from './InsideBoard'
import { ProcessSteps } from './ProcessSteps'
import { QualityGrid } from './QualityGrid'
import { Factory } from './Factory'
import { GlobalMarkets } from './GlobalMarkets'
import { Testimonials } from './Testimonials'
import { Faq } from './Faq'
import { QuoteForm } from './QuoteForm'
import { SiteFooter } from './SiteFooter'
import { RevealOnScroll } from './RevealOnScroll'

export function HtplyDemo() {
  return (
    <div className="htply-page">
      <RevealOnScroll />
      {/* <Nav /> */}
      <main id="top">
        <Hero />
        <StatStrip />
        <About />
        <Products />
        <InsideBoard />
        <ProcessSteps />
        <QualityGrid />
        <Factory />
        <GlobalMarkets />
        <Testimonials />
        <Faq />
        <QuoteForm />
      </main>
      <SiteFooter />
    </div>
  )
}