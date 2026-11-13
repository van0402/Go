'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import type { ProductCard } from '@/utilities/getProducts'
import { SplitTitle } from './SplitTitle'
import { SectionStack } from './SectionStack'

export function Products({ products }: { products: ProductCard[] }) {
  const t = useTranslations('home.products')
  const ta = useTranslations('home.about')
  const tp = useTranslations('productsPage')
  const viewAll = (ta.raw('cards') as { cta: string }[])[0]?.cta ?? ''

  // Chưa có sản phẩm nào được tick "Show on Home" thì ẩn cả mục
  if (products.length === 0) return null

  return (
    <section id="products" className="dz-sec dz-products">
      <SectionStack side="l" />
      <div className="dz-wrap">
        <div className="dz-phead">
          <div>
            <div className="dz-kicker" data-fade>{t('kicker')}</div>
            <SplitTitle text={t('title')} />
          </div>
          <Link href="/products" className="dz-linkall" data-fade>
            {viewAll} <span>→</span>
          </Link>
        </div>

        <div className="dz-pgrid">
          {products.map((p, i) => (
            <Link href={`/products/${p.slug}`} key={p.slug} className="dz-pc" data-par-card={i % 2 === 0 ? 22 : -30}>
              <div className="dz-pic dz-wipe">
                <span className="dz-no">{String(i + 1).padStart(2, '0')}</span>
                <img src={p.image} alt={p.name} loading="lazy" />
              </div>
              <div className="dz-bd">
                {p.tags.length > 0 && (
                  <div className="dz-tags">
                    {p.tags.slice(0, 3).map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
                <h3>{p.name}</h3>
                {(p.desc || p.tagline) && <p>{p.desc || p.tagline}</p>}
                <div className="dz-go">
                  {tp('explore', { name: p.name })} <i>→</i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
