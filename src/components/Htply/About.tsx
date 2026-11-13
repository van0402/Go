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

          
        </div>
    </section>
  )
}

