'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { Link } from '@/i18n/routing'
import { QcGallery } from './QcGallery'
import { CatalogSheets } from './CatalogSheets'
import './HtplyProduct.css'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
import type { ProductCard } from '@/utilities/getProducts'

export function HtplyProduct({ products }: { products: ProductCard[] }) {
  const [filter, setFilter] = useState('all')
  const tp = useTranslations('productsPage')

  // Các nhóm lấy từ trường category trong admin; sản phẩm chưa có category thì không vào tab nào (vẫn hiện ở "All")
  const categories = Array.from(new Set(products.map((p) => p.category).filter(Boolean)))
  const shown = filter === 'all' ? products : products.filter((p) => p.category === filter)

  if (products.length === 0) {
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
          <h1 className="reveal">{tp('heroTitle')}</h1>
        </div>
      </section>

      <section className="product-index-section">
        <div className="products-container">
          <div className="product-section-head reveal">
            <div>
              <div className="product-section-kicker">01 · Product Catalogue</div>
              <h2>Product index for fast B2B browsing.</h2>
            </div>
          </div>

          <div className="pg-bar">
            {categories.length > 0 ? (
              <div className="pg-tabs" role="tablist">
                <button
                  type="button"
                  role="tab"
                  aria-selected={filter === 'all'}
                  className={`pg-tab${filter === 'all' ? ' on' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  {tp('all')}
                </button>
                {categories.map((c) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={filter === c}
                    key={c}
                    className={`pg-tab${filter === c ? ' on' : ''}`}
                    onClick={() => setFilter(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            ) : (
              <span />
            )}
            <div className="pg-count">
              {shown.length === 1 ? tp('resultOne', { count: shown.length }) : tp('resultMany', { count: shown.length })}
            </div>
          </div>

          <div className="pg-grid">
            {shown.map((p) => (
              <Link href={`/products/${p.slug}`} className="pg-card" key={p.slug}>
                <div className="pg-pic">
                  <img src={p.image} alt={p.name} loading="lazy" />
                  {(p.category || p.tags[0]) && <span className="pg-chip">{p.category || p.tags[0]}</span>}
                </div>
                <div className="pg-info">
                  <h3>{p.name}</h3>
                  {(p.desc || p.tagline) && <p>{p.desc || p.tagline}</p>}
                  <span className="pg-go">
                    {tp('explore', { name: p.name })} <i>→</i>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="pg-help">
            <div>
              <b>{tp('helpTitle')}</b>
              <span>{tp('helpText')}</span>
            </div>
            <Link href="/contact#quote" className="pg-btn">
              {tp('helpCta')} →
            </Link>
          </div>
        </div>
      </section>

      <CatalogSheets />

      <QcGallery />

      <SiteFooter />
    </main>
  )
}
