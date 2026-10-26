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

<section className="production-process">
  <div className="container">
    <div className="production-process-head reveal">
      <div>
        <div className="section-kicker">
          {tp('productionProcess.kicker')}
        </div>

        <h2>{tp('productionProcess.title')}</h2>
      </div>
    </div>

    <div className="production-process-shell reveal">
      <div className="production-process-visual">
        <div className="production-process-visual-copy">
          <span>{tp('productionProcess.visualLabel')}</span>
          <strong>{tp('productionProcess.visualTitle')}</strong>
        </div>
      </div>

      <div className="production-process-grid">
        {(tp.raw('productionProcess.items') as {
          title: string
          steps: string[]
        }[]).map((item, i) => (
          <article
            className="production-stage"
            key={item.title}
          >
            <div className="production-stage-number">
              {String(i + 1).padStart(2, '0')}
            </div>

            <h3>{item.title}</h3>

            <ul>
              {item.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>

            {i < 4 && (
              <div className="production-stage-arrow">
                →
              </div>
            )}
          </article>
        ))}
      </div>
    </div>
  </div>
</section>

<section className="buyer-workflow">
  <div className="container">
    <div className="buyer-workflow-head reveal">
      <div>
        <div className="section-kicker">
          {tp('buyerWorkflow.kicker')}
        </div>

        <h2>{tp('buyerWorkflow.title')}</h2>
      </div>

    </div>

    <div className="buyer-workflow-shell reveal">
      <div className="buyer-workflow-steps">
        {(tp.raw('buyerWorkflow.steps') as {
          title: string
          desc: string
        }[]).map((item, i) => (
          <article className="buyer-workflow-step" key={item.title}>
            <div className="buyer-workflow-step-num">
              {String(i + 1).padStart(2, '0')}
            </div>

            <h3>{item.title}</h3>

            <p>{item.desc}</p>

            {i < 5 && (
              <div className="buyer-workflow-arrow">
                →
              </div>
            )}
          </article>
        ))}
      </div>

      <div className="buyer-workflow-terms">
        <div className="buyer-workflow-term">
          <span>{tp('buyerWorkflow.payment.label')}</span>

          <strong>
            {tp('buyerWorkflow.payment.value')}
          </strong>

          <p>{tp('buyerWorkflow.payment.note')}</p>
        </div>

        <div className="buyer-workflow-term">
          <span>{tp('buyerWorkflow.incoterms.label')}</span>

          <strong>
            {tp('buyerWorkflow.incoterms.value')}
          </strong>

          <p>{tp('buyerWorkflow.incoterms.note')}</p>
        </div>
      </div>
    </div>
  </div>
</section>

        <section className="story">
          <div className="container story-grid">
            <div className="story-media reveal">
              <img className="main" src="/images/d4.jpg" alt="HTPLY production" />
              <img className="secondary" src="/images/d6.jpg" alt="HTPLY log cross-section" />
            </div>

            <div className="story-copy reveal" style={{ transitionDelay: '120ms' }}>
              <div className="section-kicker">05· Our approach</div>
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

        <section className="mission-vision">
          <div className="container mv-grid">
            <div className="mv-col reveal" style={{ transitionDelay: '0ms' }}>
              <div className="section-kicker">Mission</div>
              <h2>{tp('mission.title')}</h2>
              <p>{tp('mission.text')}</p>
            </div>
            <div className="mv-col reveal" style={{ transitionDelay: '90ms' }}>
              <div className="section-kicker">Vision</div>
              <h2>{tp('vision.title')}</h2>
              <p>{tp('vision.text')}</p>
            </div>
          </div>
        </section>

      </main>

      <SiteFooter />
    </div>
  )
}
