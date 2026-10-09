'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import type { ProductCard } from '@/utilities/getProducts'

export function Products({ products }: { products: ProductCard[] }) {
  const t = useTranslations('home.products')

  // Chưa có sản phẩm nào được tick "Show on Home" thì ẩn cả mục
  if (products.length === 0) return null

  return (
    <section id="products" className="products-section">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">{t('kicker')}</div>
            <h2>{t('title')}</h2>
          </div>
        </div>

        <div className="p3-grid">
          {products.map((p, i) => (
            <Link
              href={`/products/${p.slug}`}
              key={p.slug}
              className="p3-card reveal"
              style={{
                display: 'block',
                color: 'inherit',
                textDecoration: 'none',
                transitionDelay: `${(i % 3) * 90}ms`,
                ['--slide-x' as string]: i % 2 === 0 ? '-70px' : '70px',
              }}
            >
              <div className="p3-visual">
                <img src={p.image} alt={p.name} />
              </div>
              <div className="p3-body">
                <h3>{p.name}</h3>
                <p>{p.desc}</p>
                <div className="p3-tags">
                  {p.tags.map((tag) => (
                    <span className="p3-tag" key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}