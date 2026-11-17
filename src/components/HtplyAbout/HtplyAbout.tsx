'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
import { CountUp } from '@/components/Htply/CountUp'
import { SplitTitle } from '@/components/Htply/SplitTitle'
import { AboutRings } from './AboutRings'
import { ExportMap } from './ExportMap'
import { HistoryRibbon } from './HistoryRibbon'
import { AboutFx } from './AboutFx'
import './about-dreamy.css'

type Item = { title: string; desc: string }
type Advantage = Item & { tags: string[] }

// Ảnh nền của 3 thẻ giá trị (hiện khi rê chuột)
const VALUE_IMAGES = ['/images/home/cv-1.jpg', '/images/about/precise.jpg', '/images/home/cv-3.jpg']

export function HtplyAbout() {
  const tp = useTranslations('aboutPage')
  const tc = useTranslations('home.export.cta')
  const valueItems = tp.raw('values.items') as Item[]
  const advantages = tp.raw('advantages.items') as Advantage[]

  return (
    <div className="htply-about-page">
      <AboutFx />
      <Nav />

      <main>
        {/* ===== Banner ===== */}
        <section className="ad-hero">
          <div className="ad-hero-bgw">
            <div className="ad-hero-bg" />
          </div>
          <div className="ad-wrap ad-hero-in">
            <span className="ad-pill">
              <b />
              About HTPLY Vietnam
            </span>
            <h1>
              <span className="ad-ln">
                <span>Built on reliability.</span>
              </span>
              <span className="ad-ln">
                <span>
                  Shaped for <em>global</em> supply.
                </span>
              </span>
            </h1>
            <p className="ad-sub">{tp('hero.intro')}</p>
          </div>
        </section>

        {/* ===== Nền navy liền mạch ===== */}
        <div className="ad-flow">
          {/* Thanh số liệu đè mép banner */}
          <div className="ad-bar">
            <div className="ad-wrap">
              <div className="ad-bar-in">
                <div className="ad-m">
                  <small>Factory footprint</small>
                  <strong>
                    <CountUp end={5000} /> m²
                  </strong>
                  <span>{tp('metrics.factory')}</span>
                </div>
                <div className="ad-m">
                  <small>Supply capacity</small>
                  <strong>
                    <CountUp end={60} />
                  </strong>
                  <span>{tp('metrics.supply')}</span>
                </div>
                <div className="ad-m">
                  <small>{tp('metrics.qualityLabel')}</small>
                  <strong>
                    <CountUp end={5} /> <span className="ad-quality-unit">{tp('metrics.qualityUnit')}</span>
                  </strong>
                  <span>{tp('metrics.quality')}</span>
                </div>
                <div className="ad-m">
                  <small>Main markets</small>
                  <strong className="ad-market-codes">EU · ME · AF · AU</strong>
                  <span>{tp('metrics.markets')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 01 · Who we are (vòng vân bên phải) */}
          <section className="ad-sec ad-who">
            <AboutRings seed={1} side="r" />
            <div className="ad-wrap ad-who-grid">
              <div className="ad-vis">
                <div className="ad-main ad-wipe">
                  <img src="/images/about/who-1.jpg" alt="HTPLY factory overview" loading="lazy" />
                </div>
                <div className="ad-small" data-par="44">
                  <img src="/images/about/who-2.jpg" alt="HTPLY timber stock" loading="lazy" />
                </div>
              </div>
              <div>
                <h2 className="ad-kicker" data-fade>Who we are</h2>
                <SplitTitle as="h3" text={tp('intro.title')} />
                <p className="ad-lead" data-fade>{tp('intro.text')}</p>
              </div>
            </div>
          </section>

          {/* 02 · Business footprint (bản đồ xuất khẩu từ Việt Nam) */}
          <section className="ad-sec">
            <div className="ad-wrap">
              <h2 className="ad-kicker" data-fade>{tp('business.kicker').replace(/^\d+\s*·\s*/, '')}</h2>
              <SplitTitle as="h3" text={tp('business.title')} />
              <p className="ad-lead ad-lead-wide" data-fade>{tp('business.text')}</p>
              <div className="ad-map-wrap" data-fade>
                <ExportMap />
              </div>
            </div>
          </section>


          {/* 04 · Why HTPLY */}
          <section className="ad-sec">
            <div className="ad-wrap">
              <h2 className="ad-kicker" data-fade>{tp('advantages.kicker').replace(/^\d+\s*·\s*/, '')}</h2>
              <SplitTitle as="h3" text={tp('advantages.title')} />
              <div className="ad-adv-grid">
                <div className="ad-adv-vis ad-wipe">
                  <img src="/images/home/factory.jpg" alt="" loading="lazy" />
                  <div className="ad-adv-cap">
                    <span>{tp('advantages.visualLabel')}</span>
                    <strong>{tp('advantages.visualTitle')}</strong>
                  </div>
                </div>
                <div className="ad-adv-list">
                  {advantages.map((a, i) => (
                    <article className="ad-adv" key={a.title}>
                      <div className="ad-n">{String(i + 1).padStart(2, '0')}</div>
                      <div>
                        <h3>{a.title}</h3>
                        <p>{a.desc}</p>
                        <div className="ad-tags">
                          {a.tags.map((tag) => (
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

          {/* 05 · History */}
          <section className="ad-sec" style={{ paddingBottom: 80 }}>
            <div className="ad-wrap">
              <h2 className="ad-kicker" data-fade>History</h2>
              <SplitTitle as="h3" text={tp('history.title')} />
              <HistoryRibbon />
            </div>
          </section>
        </div>

        {/* ===== Dải Picton cuối trang ===== */}
        <section className="ad-cta">
          <div className="ad-wrap ad-cta-in">
            <div>
              <SplitTitle text={tc('title')} as="h3" />
              <p data-fade>{tc('text')}</p>
            </div>
            <Link href="/contact#quote" className="ad-btn" data-fade>
              {tc('button')} <i>→</i>
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
