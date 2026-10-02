'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParallax } from '@/hooks/useParallax'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { Link } from '@/i18n/routing'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import './htply-about.css'

export function HtplyAbout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroParallaxRef = useParallax<HTMLElement>(0.12, 36)
  const t = useTranslations('nav')
  const tp = useTranslations('aboutPage')
  const approachPoints = tp.raw('approach.points') as { title: string; desc: string }[]
  const valueItems = tp.raw('values.items') as { title: string; desc: string }[]
  const historyItems = tp.raw('history.items') as { title: string; desc: string }[]
  const historyYears = ['2024', '2024', '2025', '25–26', '2026']

  return (
    <div className="htply-about-page">
      <RevealOnScroll scope=".htply-about-page" />
      <header className="site-header">
        <div className="container header-inner">
          <Link className="brand" href="/">
            <img src="/images/logoo.png" alt="HTPLY Vietnam" className="brand-logo" />
          </Link>

          <nav className={`nav${menuOpen ? ' mobile-open' : ''}`}>
            <Link href="/">{t('home')}</Link>
            <Link className="active" href="/about">
              {t('about')}
            </Link>
            <Link href="/products">{t('products')}</Link>
            <Link href="/factory">{t('factory')}</Link>
            <Link href="/#quality">{t('quality')}</Link>
          </nav>

          <div className="header-actions">
            <LocaleSwitcher />
          </div>

          <button className="menu-toggle" onClick={() => setMenuOpen((v) => !v)}>
            ☰
          </button>
        </div>
      </header>

      <main>
        <section className="hero" ref={heroParallaxRef}>
          <div className="container hero-content">
            <div className="eyebrow">About HTPLY Vietnam</div>
            <h1>Built on reliability. Shaped for global supply.</h1>
            <p>{tp('hero.intro')}</p>
          </div>
        </section>

        <section className="intro">
          <div className="container story-grid reveal">
            <div className="story-media">
              <img className="main" src="/images/sp8.jpg" alt="HTPLY factory overview" />
              <img className="secondary" src="/images/spp2.jpg" alt="HTPLY timber stock" />
            </div>

            <div className="story-copy">
              <div className="section-kicker">01 · Who we are</div>
              <h2>{tp('intro.title')}</h2>
              <p>{tp('intro.text')}</p>
            </div>
          </div>
        </section>

        <section className="metrics">
          <div className="container metric-grid">
            <article className="metric reveal" style={{ transitionDelay: '0ms' }}>
              <small>Factory footprint</small>
              <strong>5,000 m²</strong>
              <span>{tp('metrics.factory')}</span>
            </article>
            <article className="metric reveal" style={{ transitionDelay: '90ms' }}>
              <small>Production</small>
              <strong>60</strong>
              <span>{tp('metrics.production')}</span>
            </article>
            <article className="metric reveal" style={{ transitionDelay: '180ms' }}>
              <small>Supply capacity</small>
              <strong>80</strong>
              <span>{tp('metrics.supply')}</span>
            </article>
            <article className="metric reveal" style={{ transitionDelay: '270ms' }}>
              <small>Main markets</small>
              <strong>EU · ME</strong>
              <span>{tp('metrics.markets')}</span>
            </article>
          </div>
        </section>

        <section className="story">
          <div className="container story-grid">
            <div className="story-media reveal">
              <img className="main" src="/images/d4.jpg" alt="HTPLY production" />
              <img className="secondary" src="/images/d6.jpg" alt="HTPLY log cross-section" />
            </div>

            <div className="story-copy reveal" style={{ transitionDelay: '120ms' }}>
              <div className="section-kicker">02 · Our approach</div>
              <h2>{tp('approach.title')}</h2>
              <p>{tp('approach.text')}</p>

              <div className="story-points">
                {approachPoints.map((point, i) => (
                  <div className="point" key={point.title}>
                    <div className="point-icon">{String(i + 1).padStart(2, '0')}</div>
                    <div>
                      <strong>{point.title}</strong>
                      <span>{point.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="values">
          <div className="container">
            <div className="values-head reveal">
              <div>
                <div className="section-kicker">03 · What we value</div>
                <h2>{tp('values.title')}</h2>
              </div>
              <p>{tp('values.text')}</p>
            </div>

            <div className="values-grid">
              {valueItems.map((v, i) => (
                <article
                  className="value-card reveal"
                  key={v.title}
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <div className="value-num">
                    {String(i + 1).padStart(2, '0')} / {v.title.toUpperCase()}
                  </div>
                  <div>
                    <h3>{v.title}</h3>
                    <p>{v.desc}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="history">
          <div className="container">
            <div className="history-head reveal">
              <div className="section-kicker">04 · History</div>
              <h2>{tp('history.title')}</h2>
            </div>

            <div className="history-list">
              {historyItems.map((item, i) => (
                <div
                  className="history-row reveal"
                  key={item.title}
                  style={{ transitionDelay: `${i * 60}ms` }}
                >
                  <div className="history-year">{historyYears[i]}</div>
                  <div className="history-title">{item.title}</div>
                  <div className="history-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mission-vision">
          <div className="container mv-grid">
            <div className="mv-col reveal" style={{ transitionDelay: '0ms' }}>
              <div className="section-kicker">05A · Mission</div>
              <h2>{tp('mission.title')}</h2>
              <p>{tp('mission.text')}</p>
            </div>
            <div className="mv-col reveal" style={{ transitionDelay: '90ms' }}>
              <div className="section-kicker">05B · Vision</div>
              <h2>{tp('vision.title')}</h2>
              <p>{tp('vision.text')}</p>
            </div>
          </div>
        </section>

        <section className="promise">
          <div className="container">
            <div className="promise-inner reveal">
              <div className="section-kicker">06 · Our promise</div>
              <h2>Reliability, built into every sheet.</h2>
              <p>{tp('promise.text')}</p>
              <div className="promise-actions">
                <Link className="promise-btn primary" href="/#products">
                  Explore Products ↗
                </Link>
                <Link className="promise-btn secondary" href="/#factory">
                  Visit Our Factory
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container footer-row">
          <img src="/images/logoo.png" alt="HTPLY Vietnam" className="footer-logo" />
          <div>Industrial Plywood · Vietnam → Global</div>
        </div>
      </footer>
    </div>
  )
}
