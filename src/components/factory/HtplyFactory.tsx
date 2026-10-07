'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParallax } from '@/hooks/useParallax'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { Link } from '@/i18n/routing'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import './HtplyFactory.css'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
const QUALITY_TITLES = ['Thickness', 'Moisture', 'Bonding', 'Surface']

const SAFETY_ICONS = [
  '/images/icon-helmet.png',
  '/images/icon-glasses.png',
  '/images/icon-gloves.png',
  '/images/icon-earprotection.png',
  '/images/icon-workwear.png',
]

export function HtplyFactory() {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroParallaxRef = useParallax<HTMLElement>(0.12, 36)
  const t = useTranslations('nav')
  const tf = useTranslations('factoryPage')
  const steps = tf.raw('flow.steps') as { title: string; desc: string }[]
  const qualityDescs = tf.raw('quality.items') as { desc: string }[]
  const safetyItems = tf.raw('safety.items') as { title: string; desc: string }[]

  return (
    <div className="htply-factory-page">
      <RevealOnScroll scope=".htply-factory-page" />
      <Nav />

      <main>
        <section className="factory-hero" ref={heroParallaxRef}>
          <div className="container hero-content reveal">
            <div className="eyebrow">HTPLY Factory · Vietnam</div>

            <h1>{tf('hero.title')}</h1>

            <p>{tf('hero.text')}</p>
          </div>
        </section>

        <section className="factory-overview">
          <div className="container">
            <div className="overview-grid reveal">
              <div>
                <div className="section-kicker">01 · Factory Overview</div>
                <h2>{tf('overview.title')}</h2>
              </div>

              <div className="overview-copy">
                <p>{tf('overview.text1')}</p>

                <p>{tf('overview.text2')}</p>
              </div>
            </div>

            <div className="overview-image reveal" style={{ transitionDelay: '150ms' }}>
              <img src="/images/sp8.jpg" alt="HTPLY Factory" />
            </div>
          </div>
        </section>

        <section className="production-flow">
          <div className="container">
            <div className="flow-head reveal">
              <div>
                <div className="section-kicker">02 · Production Flow</div>
                <h2>{tf('flow.title')}</h2>
              </div>
            </div>

            <div className="steps">
              {steps.map((step, i) => (
                <article
                  className="step reveal"
                  key={step.title}
                  style={{ transitionDelay: `${(i % 3) * 90}ms` }}
                >
                  <div className="step-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.desc}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="inside-factory">
          <div className="container">
            <div className="section-kicker">03 · Inside the Factory</div>

            <div className="editorial-grid">
              <article
                className="editorial-card editorial-card-large reveal"
                style={{ transitionDelay: '0ms' }}
              >
                <img src="/images/sp5.jpg" alt="Pressing process" />

                <div className="editorial-copy">
                  <small>Pressing</small>
                  <h3>{tf('inside.card1.title')}</h3>
                  <p>{tf('inside.card1.text')}</p>
                </div>
              </article>

              <div className="editorial-side">
                <article className="editorial-card reveal" style={{ transitionDelay: '140ms' }}>
                  <img src="/images/spp2.jpg" alt="Veneer preparation" />

                  <div className="editorial-copy">
                    <small>Veneer</small>
                    <h3>{tf('inside.card2.title')}</h3>
                  </div>
                </article>

                <article className="editorial-card reveal" style={{ transitionDelay: '220ms' }}>
                  <img src="/images/sp1.jpg" alt="Finishing process" />

                  <div className="editorial-copy">
                    <small>Finishing</small>
                    <h3>{tf('inside.card3.title')}</h3>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="safety-section">
          <div className="container">
            <div className="safety-head reveal">
              <div>
                <div className="section-kicker">04 · Safety &amp; Working Environment</div>
                <h2>{tf('safety.title')}</h2>
              </div>
            </div>

            <div className="safety-grid">
              {safetyItems.map((item, i) => (
                <article
                  className="safety-card reveal"
                  key={item.title}
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <img className="safety-icon" src={SAFETY_ICONS[i]} alt={item.title} />
                  <strong>{item.title}</strong>
                  <span>{item.desc}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="quality-control">
          <div className="container">
            <div className="quality-head reveal">
              <div>
                <div className="section-kicker">05 · Quality Control</div>
                <h2>{tf('quality.title')}</h2>
              </div>
            </div>

            <div className="quality-grid">
              {qualityDescs.map((item, i) => (
                <article
                  className="quality-card reveal"
                  key={QUALITY_TITLES[i]}
                  style={{ transitionDelay: `${i * 90}ms` }}
                >
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  <strong>{QUALITY_TITLES[i]}</strong>
                  <span>{item.desc}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="supply-capacity">
          <div className="container supply-grid">
            <div className="supply-copy reveal">
              <div className="section-kicker">06 · Supply Capacity</div>

              <h2>{tf('supply.title')}</h2>


              <div className="big-number">
                60+
                <span>Containers / month</span>
              </div>
            </div>

            <div className="supply-image reveal" style={{ transitionDelay: '150ms' }}>
              <img src="/images/sp7.jpg" alt="HTPLY logistics" />
            </div>
          </div>
        </section>

        <section className="factory-cta">
          <div className="container">
            <div className="factory-cta-box reveal">
              <div className="section-kicker">07 · Global Supply</div>

              <h2>{tf('cta.title')}</h2>

              <p>{tf('cta.text')}</p>

              <div className="cta-actions">
                <Link className="btn-light" href="/#quote">
                  Request a Quote ↗
                </Link>

                <Link className="btn-ghost" href="/products">
                  Explore Products
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
