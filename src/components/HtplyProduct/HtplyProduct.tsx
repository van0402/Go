'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { Link, useRouter } from '@/i18n/routing'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { QcGallery } from './QcGallery'
import './HtplyProduct.css'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
import type { ProductCard } from '@/utilities/getProducts'

export function HtplyProduct({ products }: { products: ProductCard[] }) {
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const active = products[activeIndex]
  const t = useTranslations('nav')
  const tp = useTranslations('productsPage')

  if (!active) {
    return (
      <main className="htply-products-page">
        <Nav />
        <section className="product-hero">
          <div className="products-container product-hero-content">
            <h1>{tp('heroTitle')}</h1>
            <p>Products are coming soon.</p>
          </div>
        </section>
        <SiteFooter />
      </main>
    )
  }

  return (
    <main className="htply-products-page">
        <RevealOnScroll scope=".htply-products-page" />

       <Nav />

      <section className="product-hero">
        <div className="products-container product-hero-content">

          <h1 className="reveal">
            {tp('heroTitle')}
          </h1>

        </div>
      </section>

      <section className="product-index-section">

        <div className="products-container">

          <div className="product-section-head reveal">

            <div>
              <div className="product-section-kicker">
                01 · Product Catalogue
              </div>

              <h2>
                Product index for fast B2B browsing.
              </h2>
            </div>
          </div>

          <div className="product-index-layout">

            <div className="product-list">

              {products.map((product, index) => (

                <button
                  type="button"
                  key={product.slug}
                  className={`product-row reveal ${
                    activeIndex === index ? 'active' : ''
                  }`}
                  style={{
                    transitionDelay: `${(index % 4) * 70}ms`,
                    ['--slide-x' as string]: index % 2 === 0 ? '-70px' : '70px',
                  }}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => router.push(`/products/${product.slug}`)}
                >

                  <span className="product-num">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="product-row-main">

                    <span className="product-row-title">
                      {product.name}
                    </span>

                    <span className="product-row-tag">
                      {product.category}
                    </span>

                  </span>

                  <span className="product-row-arrow">
                    ↗
                  </span>

                </button>

              ))}

            </div>

            <div className="product-preview-wrap">

              <article className="product-preview-card">

                <div className="product-preview-media">

                  <span className="product-preview-badge">
                    {active.category}
                  </span>

                  <img
                    src={active.image}
                    alt={active.name}
                  />

                </div>

                <div className="product-preview-body">

                  <div className="product-preview-title-row">

                    <h3>{active.name}</h3>

                    <span className="product-preview-code">
                      {active.tagline}
                    </span>

                  </div>

                  <p className="product-preview-desc">
                    {active.desc}
                  </p>

                  <div className="product-preview-specs">
                    {active.specs.map((sp) => (
                      <div className="product-spec" key={sp.label}>
                        <small>{sp.label}</small>
                        <strong>{sp.value}</strong>
                      </div>
                    ))}
                  </div>

                  <Link href={`/products/${active.slug}`} className="product-preview-link">
                    <span>View product details</span>
                    <span>↗</span>
                  </Link>

                </div>

              </article>

            </div>

          </div>

        </div>

      </section>

      <QcGallery />

      <SiteFooter />

    </main>
  )
}