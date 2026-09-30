import './htply.css'
import { Nav } from './Nav'
import { Hero } from './Hero'
import { About } from './About'
import { Products } from './Products'
// import { InsideBoard } from './InsideBoard'
// import { ProcessSteps } from './ProcessSteps'
import { QualityGrid } from './QualityGrid'
import { Factory } from './Factory'
import { Testimonials } from './Testimonials'
import { Faq } from './Faq'
import { QcGallery } from './QcGallery'
import { SiteFooter } from './SiteFooter'
import { RevealOnScroll } from './RevealOnScroll'

export function HtplyDemo() {
  return (
    <div className="htply-page">
      <RevealOnScroll />
      <Nav />
      <main id="top">
        <Hero />
        <About />
        <Products />
        {/* <InsideBoard /> */}
        {/* <ProcessSteps /> */}
        <QualityGrid />
        <Factory />
        <Testimonials />
        <Faq />
        <QcGallery />
      </main>
      <SiteFooter />
    </div>
  )
}