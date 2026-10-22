'use client'

import { useTranslations } from 'next-intl'
import { RevealOnScroll } from '@/components/RevealOnScroll'
import { Link } from '@/i18n/routing'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
import './htply-quality.css'

type Card = { title: string; text: string; items: string[] }
type Step = { title: string; text: string }
type Qc = { title: string; text: string }
type Doc = { tag: string; title: string; text: string; badge: string }
type Market = { title: string; text: string }

// Icon cho 4 thẻ "What we can provide"
const ICONS = [
  <svg key="a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v4h4" /><path d="M10 13h6M10 17h6" /></svg>,
  <svg key="b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><path d="M12 3l7 3v5c0 5-3.2 8.3-7 10-3.8-1.7-7-5-7-10V6l7-3z" /></svg>,
  <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6" /><path d="M10 3v6l-5 9a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 18l-5-9V3" /></svg>,
  <svg key="d" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l9-5 9 5v8l-9 5-9-5z" /><path d="M3 8l9 5 9-5" /><path d="M12 13v8" /></svg>,
]

export function HtplyQuality() {
  const t = useTranslations('qualityPage')
  const cards = t.raw('provide.cards') as Card[]
  const steps = t.raw('flow.steps') as Step[]
  const qc = t.raw('qc.items') as Qc[]
  const docs = t.raw('docs.items') as Doc[]
  const markets = t.raw('market.items') as Market[]

  return (
    <div className="htply-quality-page">
      <RevealOnScroll scope=".htply-quality-page" />
      <Nav />
      <main>
        <section className="q-hero">
          <div className="q-container">
            <div className="q-eyebrow">{t('hero.eyebrow')}</div>
            <h1>{t('hero.title')}</h1>
            <p>{t('hero.intro')}</p>
            <div className="q-actions">
              <a href="#documents" className="q-btn primary">{t('hero.primary')}</a>
              <Link href="/contact#quote" className="q-btn">{t('hero.secondary')}</Link>
            </div>
          </div>
        </section>

        <section className="q-section">
          <div className="q-container">
            <div className="q-head reveal">
              <div className="q-kicker">{t('provide.kicker')}</div>
              <h2>{t('provide.title')}</h2>
              <p>{t('provide.intro')}</p>
            </div>
            <div className="q-cards reveal">
              {cards.map((c, i) => (
                <div className={`q-card${i === 3 ? ' dark' : ''}`} key={c.title}>
                  <div className="q-ico">{ICONS[i]}</div>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                  <ul>{c.items.map((it) => <li key={it}>{it}</li>)}</ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="q-section alt">
          <div className="q-container">
            <div className="q-head reveal">
              <div className="q-kicker">{t('flow.kicker')}</div>
              <h2>{t('flow.title')}</h2>
            </div>
            <div className="q-flow reveal">
              {steps.map((s, i) => (
                <div className="q-step" key={s.title}>
                  <small>{t('flow.step')} {String(i + 1).padStart(2, '0')}</small>
                  <strong>{s.title}</strong>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="q-section" id="checkpoints">
          <div className="q-container">
            <div className="q-head reveal">
              <div className="q-kicker">{t('qc.kicker')}</div>
              <h2>{t('qc.title')}</h2>
              <p>{t('qc.intro')}</p>
            </div>
            <div className="q-qc reveal">
              {qc.map((x, i) => (
                <div className="q-qc-item" key={x.title}>
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  <strong>{x.title}</strong>
                  <span>{x.text}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="q-section alt" id="documents">
          <div className="q-container">
            <div className="q-head reveal">
              <div className="q-kicker">{t('docs.kicker')}</div>
              <h2>{t('docs.title')}</h2>
              <p>{t('docs.intro')}</p>
            </div>
            <div className="q-docs reveal">
              {docs.map((d) => (
                <div className="q-doc" key={d.title}>
                  <div>
                    <small>{d.tag}</small>
                    <strong>{d.title}</strong>
                    <span>{d.text}</span>
                  </div>
                  <div className="q-badge">{d.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="q-section">
          <div className="q-container">
            <div className="q-head reveal">
              <div className="q-kicker">{t('market.kicker')}</div>
              <h2>{t('market.title')}</h2>
            </div>
            <div className="q-market reveal">
              <div className="q-notice">{t('market.notice')}</div>
              <div className="q-market-list">
                {markets.map((m) => (
                  <div className="q-market-item" key={m.title}>
                    <strong>{m.title}</strong>
                    <span>{m.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="q-cta">
          <div className="q-container q-cta-in">
            <div>
              <h2>{t('cta.title')}</h2>
              <p>{t('cta.text')}</p>
            </div>
            <div className="q-actions">
              <Link href="/contact#quote" className="q-btn light">{t('cta.primary')}</Link>
              <Link href="/products" className="q-btn ghost">{t('cta.secondary')}</Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}