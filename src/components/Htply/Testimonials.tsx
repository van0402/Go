'use client'

import { useTranslations } from 'next-intl'
import { useParallax } from '@/hooks/useParallax'

const PEOPLE = [
  { name: 'Markus Lindgren', role: 'Procurement Lead, Nordic Build BV' },
  { name: 'Salim Al-Farsi', role: 'Trading Director, Al-Farsi Building Materials' },
  { name: 'Claire Dubois', role: 'Supply Chain Manager, Dubois Logistique' },
]

export function Testimonials() {
  const parallaxRef = useParallax<HTMLDivElement>(0.12, 36)
  const t = useTranslations('home.testimonials')
  const items = t.raw('items') as { quote: string }[]

  return (
    <section id="testimonials">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">{t('kicker')}</div>
            <h2>{t('title')}</h2>
          </div>
        </div>

        <div className="testimonials reveal" ref={parallaxRef}>
          <div className="testi-grid">
            {PEOPLE.map((p, i) => (
              <div
                className="testi-card reveal"
                key={p.name}
                style={{
                  transitionDelay: `${i * 90}ms`,
                  ['--slide-x' as string]: i % 2 === 0 ? '-70px' : '70px',
                }}
              >
                <div>
                  <div className="testi-rating">
                    5.0 / 5
                    <span className="testi-stars" aria-hidden="true">
                      {Array.from({ length: 5 }).map((_, s) => (
                        <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2.5l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.8-6.2 3.8 1.6-7-5.4-4.7 7.1-.6z" />
                        </svg>
                      ))}
                    </span>
                  </div>
                  <p>&ldquo;{items[i]?.quote}&rdquo;</p>
                </div>
                <div className="testi-who">
                  <span className="testi-avatar">{p.name.charAt(0)}</span>
                  <div>
                    <b>{p.name}</b>
                    <span>{p.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
