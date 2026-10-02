'use client'

import { useTranslations } from 'next-intl'
import { CountUp } from './CountUp'

const VALUE_ICONS = [
  '/images/icon-resistance.png',
  '/images/icon-recyclable.png',
  '/images/icon-presence.png',
  '/images/icon-innovation.png',
  '/images/icon-formaldehyde.png',
]

export function About() {
  const t = useTranslations('home.about')
  const values = t.raw('values') as { title: string; desc: string }[]

  return (
    <section id="about" className="about-section">
      <div className="container stats-grid">
          <div
            className="stat-card factory reveal"
            style={{ transitionDelay: '0ms', ['--slide-x' as string]: '-70px' }}
          >
            <div className="glass"></div>
            <div className="stat-index">01</div>
            <div className="stat-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 21h18"></path>
                <path d="M5 21V9l5-3v15"></path>
                <path d="M10 21v-7l4-2v9"></path>
                <path d="M17 21v-4l2-1v5"></path>
              </svg>
            </div>
            <div className="stat-label">{t('stats.factory.label')}</div>
            <div className="stat-value">
              <CountUp end={5000} /> m<sup>2</sup>
            </div>
            <div className="stat-desc">{t('stats.factory.desc')}</div>
          </div>

          <div
            className="stat-card production reveal"
            style={{ transitionDelay: '90ms', ['--slide-x' as string]: '70px' }}
          >
            <div className="glass"></div>
            <div className="stat-index">02</div>
            <div className="stat-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="16" rx="1"></rect>
                <path d="M3 9h18"></path>
                <path d="M8 4v16"></path>
                <path d="M16 4v16"></path>
              </svg>
            </div>
            <div className="stat-label">{t('stats.production.label')}</div>
            <div className="stat-value">
              <CountUp end={60} />
            </div>
            <div className="stat-desc">{t('stats.production.desc')}</div>
          </div>

          <div
            className="stat-card supply reveal"
            style={{ transitionDelay: '180ms', ['--slide-x' as string]: '-70px' }}
          >
            <div className="glass"></div>
            <div className="stat-index">03</div>
            <div className="stat-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 18h20"></path>
                <path d="M3 18V8l5 2 4-4 3 2h4l2 4v6"></path>
                <circle cx="8" cy="18" r="1.5"></circle>
                <circle cx="18" cy="18" r="1.5"></circle>
              </svg>
            </div>
            <div className="stat-label">{t('stats.supply.label')}</div>
            <div className="stat-value">
              <CountUp end={80} />
            </div>
            <div className="stat-desc">{t('stats.supply.desc')}</div>
          </div>

          <div
            className="stat-card markets reveal"
            style={{ transitionDelay: '270ms', ['--slide-x' as string]: '70px' }}
          >
            <div className="glass"></div>
            <div className="stat-index">04</div>
            <div className="stat-icon">
              <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="9"></circle>
                <path d="M3 12h18"></path>
                <path d="M12 3a15 15 0 0 1 0 18"></path>
                <path d="M12 3a15 15 0 0 0 0 18"></path>
              </svg>
            </div>
            <div className="stat-label">{t('stats.markets.label')}</div>
            <div className="stat-value">EU · ME</div>
            <div className="stat-desc">{t('stats.markets.desc')}</div>
          </div>
        </div>

        <div className="container">
          <div className="section-head reveal">
            <div>
              <div className="section-kicker">01 · About HTPLY</div>
              <h2>{t('title')}</h2>
              <p>{t('intro')}</p>
            </div>
          </div>

          <div className="about reveal">
            <div className="about-card">
              <div className="big-quote">&ldquo;{t('quote')}&rdquo;</div>
            </div>
            <div className="about-card dark">
              <h3>What shapes how we work.</h3>
              <div className="value-list">
                {values.map((v, i) => (
                  <div className="value" key={v.title}>
                    <div className="value-icon-wrap">
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      <img className="value-icon" src={VALUE_ICONS[i]} alt="" />
                    </div>
                    <div>
                      <b>{v.title}</b>
                      <div>{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
    </section>
  )
}

