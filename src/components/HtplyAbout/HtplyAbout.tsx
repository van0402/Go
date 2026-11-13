'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParallax } from '@/hooks/useParallax'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { Link } from '@/i18n/routing'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import './htply-about.css'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
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
       <Nav />
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

        <section className="business-footprint">
  <div className="container">
    <div className="business-footprint-inner reveal">
      <div className="business-footprint-copy">
        <div>
          <div className="section-kicker">
            {tp('business.kicker')}
          </div>

          <h2>{tp('business.title')}</h2>

          <p>{tp('business.text')}</p>
        </div>

        <div className="business-revenue">
          <small>{tp('business.revenueLabel')}</small>
          <strong>100B VND</strong>
          <span>{tp('business.revenueNote')}</span>
        </div>
      </div>

      <div className="business-markets">
        <small>{tp('business.marketsLabel')}</small>

        <h3>{tp('business.marketsTitle')}</h3>

        <div className="business-market-list">
          <span>{tp('business.markets.europe')}</span>
          <span>{tp('business.markets.middleEast')}</span>
          <span>{tp('business.markets.africa')}</span>
          <span>{tp('business.markets.australia')}</span>
          <span>{tp('business.markets.newZealand')}</span>
        </div>
      </div>
    </div>
  </div>
</section>




        <section className="values">
          <div className="container">
            <div className="values-head reveal">
              <div>
                <div className="section-kicker">06 · What we value</div>
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

        <section className="buyer-advantages">
  <div className="container">
    <div className="buyer-advantages-head reveal">
      <div>
        <div className="section-kicker">
          {tp('advantages.kicker')}
        </div>

        <h2>{tp('advantages.title')}</h2>
      </div>
    </div>

    <div className="buyer-advantages-layout">
      <div className="buyer-advantages-visual reveal">
        <div className="buyer-advantages-visual-copy">
          <span>{tp('advantages.visualLabel')}</span>
          <strong>{tp('advantages.visualTitle')}</strong>
        </div>
      </div>

      <div className="buyer-advantages-list">
        {(tp.raw('advantages.items') as {
          title: string
          desc: string
          tags: string[]
        }[]).map((item, i) => (
          <article
            className="buyer-advantage-row reveal"
            key={item.title}
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="buyer-advantage-num">
              {String(i + 1).padStart(2, '0')}
            </div>

            <div>
              <h3>{item.title}</h3>

              <p>{item.desc}</p>

              <div className="buyer-advantage-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  </div>
</section>

        <section className="history">
          <div className="container">
            <div className="history-head reveal">
              <div className="section-kicker">09 · History</div>
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


      </main>

      <SiteFooter />
    </div>
  )
}
