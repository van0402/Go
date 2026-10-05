'use client'

import { useTranslations } from 'next-intl'

export function Factory() {
  const t = useTranslations('home.factory')
  const stats = t.raw('stats') as { value: string; label: string }[]

  return (
    <section id="factory">
      <div className="container reveal">
        <div className="factory">
          <div className="factory-content">
            <div className="section-kicker" style={{ color: '#c1cde2' }}>
              {t('kicker')}
            </div>
            <h2>{t('title')}</h2>
            <div className="factory-stats">
              {stats.map((stat) => (
                <div className="factory-stat" key={stat.label}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="factory-gallery">
            <img src="/images/hm6.jpg" alt="HTPLY material" />
            <img src="/images/hm4.jpg" alt="HTPLY log cross-section" />
            <img src="/images/hm9.jpg" alt="HTPLY timber stock" />
          </div>
        </div>
      </div>
    </section>
  )
}
