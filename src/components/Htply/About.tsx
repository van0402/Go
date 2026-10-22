'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { CountUp } from './CountUp'
import { useState } from 'react'
// 4 ô giới thiệu: Product → /products, Quality → /factory, Documents (chưa có trang) → không link, Quote → /contact
const CARD_LINKS: (string | null)[] = ['/products', '/quality', '/quality#documents', '/contact#quote']
const CARD_ICONS = [
  <svg key="a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l9-5 9 5-9 5-9-5z" /><path d="M3 12l9 5 9-5" /><path d="M3 16l9 5 9-5" /></svg>,
  <svg key="b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4" /><path d="M12 3l7 3v5c0 5-3.2 8.3-7 10-3.8-1.7-7-5-7-10V6l7-3z" /></svg>,
  <svg key="c" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 3h8l4 4v14H7z" /><path d="M15 3v4h4" /><path d="M10 13h6M10 17h6" /></svg>,
  <svg key="d" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h4L19 9l-4-4L4 16v4z" /><path d="M13 7l4 4" /></svg>,
]
type AboutCard = { num: string; title: string; text: string; items: string[]; cta: string }


const VALUE_ICONS = [
  '/images/icon-resistance.png',
  '/images/icon-recyclable.png',
  '/images/icon-presence.png',
  '/images/icon-innovation.png',
  '/images/icon-formaldehyde.png',
]

// Ảnh nền cho từng mục khi rê chuột (null = giữ ảnh nền mặc định của khối)
const VALUE_BGS: (string | null)[] = [
  '/images/values/v-reliable.jpg',
  null,
  '/images/values/v-global.jpg',
  '/images/values/v-machinery.jpg',
  null,
]

const VALUE_PROOFS = [
  [
    '/images/values/proofs/1.png',
    '/images/values/proofs/2.png',
    '/images/values/proofs/3.png',
  ],
  [
    '/images/values/proofs/4.png',
    '/images/values/proofs/5.png',
    '/images/values/proofs/6.png',
  ],
  [
    '/images/values/proofs/9.jpg',
    '/images/values/proofs/10.jpg',
    '/images/values/proofs/11.jpg',
  ],
  [
    '/images/values/proofs/7.png',
    '/images/values/proofs/8.png',
    '/images/values/proofs/12.jpg',
  ],
  // [
  //   '/images/values/proofs/certification-1.jpg',
  //   '/images/values/proofs/certification-2.jpg',
  //   '/images/values/proofs/certification-3.jpg',
  // ],
]

export function About() {
  const t = useTranslations('home.about')
  const values = t.raw('values') as { title: string; desc: string; detail: string }[]
  const [active, setActive] = useState<number | null>(null)
  const cards = t.raw('cards') as AboutCard[]

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
          <div className="section-head ab-head reveal">
            <div>
              <div className="section-kicker">01 · About HTPLY</div>
              <h2>{t('title')}</h2>
              <p>{t('intro')}</p>
            </div>
          </div>

          <div className="ab-cards reveal">
            {cards.map((c, i) => {
              const href = CARD_LINKS[i]
              const inner = (
                <>
                  {!href && <span className="ab-soon">{t('soon')}</span>}
                  <div className="ab-ico">{CARD_ICONS[i]}</div>
                  <div className="ab-num">{c.num}</div>
                  <h3>{c.title}</h3>
                  <ul>
                    {c.items.map((it) => <li key={it}>{it}</li>)}
                  </ul>
                  <div className="ab-go"><span>{c.cta}</span><i>→</i></div>
                </>
              )
              const cls = `ab-card${i === 3 ? ' dark' : ''}${href ? '' : ' off'}`
              return href ? (
                <Link key={c.title} href={href} className={cls}>{inner}</Link>
              ) : (
                <div key={c.title} className={cls} aria-disabled="true">{inner}</div>
              )
            })}
          </div>

          <div className="about reveal">
            <div className="about-card dark">
              <div className="v-layers" aria-hidden="true">
                {VALUE_BGS.map((src, i) =>
                  src ? <i key={src} className={i === active ? 'on' : ''} style={{ backgroundImage: `url(${src})` }} /> : null,
                )}
              </div>
              <h3>What shapes how we work.</h3>
              <div className="value-list">
                {values.map((v, i) => (
                  <div
                    className={`value${i === active ? ' active' : ''}`}
                    key={v.title}
                    role="button"
                    tabIndex={0}
                    aria-expanded={i === active}
                    // onMouseMove (không phải onMouseEnter): các dòng nở/đóng làm dịch chuyển bố cục dưới con trỏ đứng yên, onMouseEnter sẽ tự kích hoạt dây chuyền
                    onMouseMove={() => active !== i && setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        setActive(i)
                      }
                    }}
                  >
                    <div className="value-icon-wrap">
                      <span>{String(i + 1).padStart(2, '0')}</span>
                      <img className="value-icon" src={VALUE_ICONS[i]} alt="" />
                    </div>
                    <div className="value-content">
  <b>{v.title}</b>

  <div className="value-more">
    <p>{v.detail}</p>

    <div className="value-proof-grid">
     {(VALUE_PROOFS[i] ?? []).map((src, j) => (
        <div className="value-proof" key={src}>
          <img
            src={src}
            alt={`${v.title} ${j + 1}`}
          />
        </div>
      ))}
    </div>
  </div>
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

