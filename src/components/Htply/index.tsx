import './htply.css'
import './htply-theme-navy.css'
import './dreamy.css'
import { Nav } from './Nav'
import { Hero } from './Hero'
import { About } from './About'
import { Products } from './Products'
import { CoreValues } from './CoreValues'
import { DreamyCta } from './DreamyCta'
import { Dreamy } from './Dreamy'
import { SiteFooter } from './SiteFooter'
import { RevealOnScroll } from './RevealOnScroll'
import type { ProductCard } from '@/utilities/getProducts'

export function HtplyDemo({ products = [] }: { products?: ProductCard[] }) {
  return (
    <div className="htply-page htply-navy">
      <RevealOnScroll />
      <Dreamy />
      <Nav />
      <main id="top">
        <Hero />
        {/* Nền navy liền mạch: mỗi mục (About, Products, Core values) có cặp vòng vân ván ép riêng */}
        <div className="dz-flow">
          <About />
          <Products products={products} />
          <CoreValues />
        </div>
        <DreamyCta />
      </main>
      <SiteFooter />
    </div>
  )
}
