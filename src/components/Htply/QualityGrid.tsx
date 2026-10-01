'use client'

import { useTranslations } from 'next-intl'

const IMAGES = ['/images/g1.jpg', '/images/g2.jpg', '/images/g3.jpg', '/images/g4.jpg', '/images/g5.jpg']

export function QualityGrid() {
  const t = useTranslations('home.quality')
  const items = t.raw('items') as { label: string; note: string }[]

  return (
    <section id="quality">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">{t('kicker')}</div>
            <h2>{t('title')}</h2>
          </div>
        </div>
        <div className="quality-grid">
          {items.map((item, i) => (
            <div
              className="quality-item reveal"
              key={item.label}
              style={{
                backgroundImage: `url(${IMAGES[i]})`,
                transitionDelay: `${i * 90}ms`,
                ['--slide-x' as string]: i % 2 === 0 ? '-70px' : '70px',
              }}
            >
              <span>{String(i + 1).padStart(2, '0')}</span>
              <b>{item.label}</b>
              <small>{item.note}</small>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
