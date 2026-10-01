'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'

export function Faq() {
  const [openIndex, setOpenIndex] = useState(0)
  const t = useTranslations('home.faq')
  const items = t.raw('items') as { q: string; a: string }[]

  return (
    <section id="faq">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">{t('kicker')}</div>
            <h2>{t('title')}</h2>
          </div>
        </div>

        <div className="faq-list">
          {items.map((item, index) => (
            <details
              className="faq-item reveal"
              key={item.q}
              style={{
                transitionDelay: `${index * 70}ms`,
                ['--slide-x' as string]: index % 2 === 0 ? '-70px' : '70px',
              }}
              open={openIndex === index}
              onToggle={(e) => {
                if ((e.target as HTMLDetailsElement).open) setOpenIndex(index)
              }}
            >
              <summary>
                {item.q}
                <span className="faq-plus">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
