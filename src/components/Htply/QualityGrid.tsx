'use client'

import { useTranslations } from 'next-intl'

const IMAGES = ['/images/hm8.jpg', '/images/hm13.jpg', '/images/hm12.jpg', '/images/hm11.jpg', '/images/hm10.jpg']

export function QualityGrid() {
  const t = useTranslations('home.quality')
  const items = t.raw('items') as { label: string; note: string; desc?: string }[]

  return (
    <section id="quality">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">{t('kicker')}</div>
            <h2>{t('title')}</h2>
            <p className="quality-lead">{t('lead')}</p>
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
              <div className="quality-text">
                <b>{item.label}</b>
                <small>{item.note}</small>
                {item.desc && <p className="quality-desc">{item.desc}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
