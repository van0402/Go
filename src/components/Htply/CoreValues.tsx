'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { SplitTitle } from './SplitTitle'
import { SectionRings } from './RingsBg'

type Value = { title: string; desc: string; detail: string }

// Ảnh nền cho từng giá trị (đã nén, nằm trong public/images/home)
const IMAGES = [1, 2, 3, 4, 5].map((n) => `/images/home/cv-${n}.jpg`)

export function CoreValues() {
  const t = useTranslations('home.values')
  const ta = useTranslations('home.about')
  const values = ta.raw('values') as Value[]
  const [cur, setCur] = useState(0)

  // onMouseMove (không phải onMouseEnter): các dòng nở/đóng làm dịch bố cục dưới con trỏ đứng yên, onMouseEnter sẽ tự kích hoạt dây chuyền
  const pick = (i: number) => setCur((c) => (c === i ? c : i))

  return (
    <section id="values" className="dz-sec dz-values">
      <SectionRings seed={3} side="r" />
      <div className="dz-wrap">
        <div className="dz-kicker" data-fade>{t('kicker')}</div>
        <SplitTitle text={t('title')} />

        <div className="dz-vgrid">
          <div className="dz-vlist" data-fade>
            {values.map((v, i) => (
              <div className={`dz-v${i === cur ? ' on' : ''}`} key={v.title}>
                <button
                  type="button"
                  className="dz-vh"
                  aria-expanded={i === cur}
                  onMouseMove={() => pick(i)}
                  onClick={() => pick(i)}
                  onFocus={() => pick(i)}
                >
                  <small>{String(i + 1).padStart(2, '0')}</small>
                  <b>{v.title}</b>
                  <span className="dz-pl">+</span>
                </button>
                <div className="dz-vb">
                  <div>
                    <p>{v.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="dz-vstage dz-wipe">
            {IMAGES.slice(0, values.length).map((src, i) => (
              <img key={src} src={src} alt="" loading="lazy" className={i === cur ? 'on' : ''} />
            ))}
            <div className="dz-vcap">
              <span>
                {String(cur + 1).padStart(2, '0')} / {String(values.length).padStart(2, '0')}
              </span>
              <div className="dz-bar2">
                <i style={{ width: `${((cur + 1) / values.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
