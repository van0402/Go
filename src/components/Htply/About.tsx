'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { SplitTitle } from './SplitTitle'
import { SectionRings } from './RingsBg'

// 4 dòng giới thiệu: Product → /products, Quality → /quality, Documents → /quality#documents, Quote → /contact#quote
const CARD_LINKS = ['/products', '/quality', '/quality#documents', '/contact#quote']

type AboutCard = { num: string; title: string; items: string[]; cta: string }

export function About() {
  const t = useTranslations('home.about')
  const cards = t.raw('cards') as AboutCard[]

  return (
    <section id="about" className="dz-sec dz-about">
      <SectionRings seed={1} side="r" />
      <div className="dz-wrap dz-about-grid">
        <div>
          <div className="dz-kicker" data-fade>01 · About HTPLY</div>
          <SplitTitle text={t('title')} />
          <p className="dz-lead" data-fade>{t('intro')}</p>

          <div className="dz-rows">
            {cards.map((c, i) => (
              <Link key={c.title} href={CARD_LINKS[i] ?? '/products'} className="dz-row" data-row>
                <small>{String(i + 1).padStart(2, '0')}</small>
                <div>
                  <b>{c.title}</b>
                  <em>{c.num.replace(/^\d+\s*·\s*/, '')}</em>
                </div>
                <span className="dz-ar">→</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="dz-vis">
          <div className="dz-main dz-wipe">
            <img src="/images/home/factory.jpg" alt="HTPLY factory" loading="lazy" />
          </div>
          <div className="dz-small" data-par="46">
            <img src="/images/home/stack.jpg" alt="" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
