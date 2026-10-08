'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import './ExportPackaging.css'

export function ExportPackaging() {
  const t = useTranslations('home.export')
  const steps = t.raw('steps') as { title: string; text: string }[]
  const tags = t.raw('tags') as string[]

  return (
    <section id="export" className="export-section">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">{t('kicker')}</div>
            <h2>{t('title')}</h2>
            <p>{t('lead')}</p>
          </div>
        </div>

        <div className="export-grid">
          <div className="export-img reveal" style={{ ['--slide-x' as string]: '-70px' }}>
            <img src="/images/hm14.jpg" alt={t('imageAlt')} />
          </div>

          <div className="reveal" style={{ ['--slide-x' as string]: '70px' }}>
            <div className="export-steps">
              {steps.map((step, index) => (
                <div className="export-step" key={step.title}>
                  <div className="export-step-num">{String(index + 1).padStart(2, '0')}</div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              ))}
            </div>
            <div className="export-tags">
              {tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="export-cta reveal">
          <div>
            <h3>{t('cta.title')}</h3>
            <p>{t('cta.text')}</p>
          </div>
          <Link href="/contact" className="export-cta-btn">
            {t('cta.button')} →
          </Link>
        </div>
      </div>
    </section>
  )
}
