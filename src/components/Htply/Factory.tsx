'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

// Ảnh nền của 3 thẻ (đã có sẵn trong public/images)
const CARD_IMAGES = ['/images/nhamay.jpg', '/images/values/proofs/1.png', '/images/quality/surface-1.jpg']

type Card = { kicker: string; title: string; text: string; facts: string[]; cta: string }
type HandleItem = { title: string; sub: string; text: string }
type CapItem = { label: string; value: string }

export function Factory() {
  const t = useTranslations('home.factory')
  const stats = t.raw('stats') as { value: string; label: string }[]
  const cards = t.raw('cards') as Card[]
  const handle = t.raw('handle.items') as HandleItem[]
  // Ô năng lực nào nhà máy chưa xác nhận (value rỗng) thì ẩn, không bịa số
  const capability = (t.raw('capability.items') as CapItem[]).filter((c) => c.value.trim())
  const [active, setActive] = useState(0)

  return (
    <section id="factory">
      <div className="container reveal">
        <div className="fx">
          <div className="section-kicker" style={{ color: '#c1cde2' }}>
            {t('kicker')}
          </div>
          <h2>{t('title')}</h2>
          <p className="fx-lead">{t('lead')}</p>

          <div className="fx-stats">
            {stats.map((s) => (
              <div className="fx-stat" key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>

          <div className="fx-cards">
            {cards.map((c, i) => (
              <div
                key={c.title}
                className={`fx-card${active === i ? ' on' : ''}`}
                style={{ backgroundImage: `url(${CARD_IMAGES[i]})` }}
                tabIndex={0}
                // onMouseMove (không dùng onMouseEnter): thẻ nở ra làm dịch bố cục dưới con trỏ đứng yên
                onMouseMove={() => active !== i && setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
              >
                <span className="fx-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="fx-body">
                  <small>{c.kicker}</small>
                  <h3>{c.title}</h3>
                  <div className="fx-more">
                    <p>{c.text}</p>
                    {c.facts.length > 0 && (
                      <ul className="fx-facts">
                        {c.facts.map((f) => (
                          <li key={f}>{f}</li>
                        ))}
                      </ul>
                    )}
                    <Link href="/factory" className="fx-link" tabIndex={active === i ? 0 : -1}>
                      {c.cta} →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="fx-title">
            <h3>{t('handle.title')}</h3>
            <p>{t('handle.lead')}</p>
          </div>
          <div className="fx-handle">
            {handle.map((h, i) => (
              <div className="fx-hd" key={h.title}>
                <i>{i + 1}</i>
                <b>{h.title}</b>
                <strong>{h.sub}</strong>
                <span>{h.text}</span>
              </div>
            ))}
          </div>

          {capability.length > 0 && (
            <>
              <div className="fx-title">
                <h3>{t('capability.title')}</h3>
                <p>{t('capability.lead')}</p>
              </div>
              <div className="fx-cap">
                {capability.map((c) => (
                  <div className="fx-cell" key={c.label}>
                    <small>{c.label}</small>
                    <strong>{c.value}</strong>
                  </div>
                ))}
              </div>
            </>
          )}

          <div className="fx-cta">
            <p>{t('cta.text')}</p>
            <div className="fx-btns">
              <Link href="/contact#quote" className="fx-btn p">{t('cta.primary')}</Link>
              <Link href="/factory" className="fx-btn g">{t('cta.secondary')} →</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}