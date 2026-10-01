'use client'

import { useTranslations } from 'next-intl'

const PRODUCTS = [
  {
    key: 'film',
    title: 'Film Faced Plywood',
    tags: ['Formwork', 'Construction'],
    img: '/images/v1.jpg',
  },
  {
    key: 'wiremesh',
    title: 'Anti-Slip Plywood — Wiremesh',
    tags: ['Trailer Flooring', 'Scaffolding'],
    img: '/images/v2.jpg',
  },
  {
    key: 'hexaply',
    title: 'Anti-Slip Plywood — Hexaply',
    tags: ['Event Stage', 'Public Space'],
    img: '/images/v1.jpg',
  },
  {
    key: 'raw',
    title: 'Raw Plywood',
    tags: ['Furniture', 'Packaging'],
    img: '/images/v2.jpg',
  },
  {
    key: 'lvl',
    title: 'LVL',
    tags: ['Structural', 'Construction'],
    img: '/images/v1.jpg',
  },
  {
    key: 'marine',
    title: 'Marine Plywood',
    tags: ['Marine', 'Outdoor'],
    img: '/images/v2.jpg',
  },
  {
    key: 'melamine',
    title: 'Melamine Plywood',
    tags: ['Furniture', 'Interior'],
    img: '/images/v1.jpg',
  },
  {
    key: 'blockboard',
    title: 'Block Board',
    tags: ['Furniture', 'Doors'],
    img: '/images/v2.jpg',
  },
]

export function Products() {
  const t = useTranslations('home.products')
  const items = t.raw('items') as { desc: string }[]

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
          {PRODUCTS.map((p, i) => (
            <article
              className="p3-card reveal"
              key={p.key}
              style={{
                transitionDelay: `${(i % 3) * 90}ms`,
                ['--slide-x' as string]: i % 2 === 0 ? '-70px' : '70px',
              }}
            >
              <div className="p3-visual">
                <img src={p.img} alt={p.title} />
              </div>
              <div className="p3-body">
                <h3>{p.title}</h3>
                <p>{items[i]?.desc}</p>
                <div className="p3-tags">
                  {p.tags.map((tag) => (
                    <span className="p3-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
