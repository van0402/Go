'use client'

import { useId, useRef, useState, type CSSProperties } from 'react'
import { useTranslations } from 'next-intl'
import { SectionStack } from './SectionStack'

type Value = { title: string; description: string }
const COLORS = ['#e5b657', '#b5cf50', '#3f7004']

function point(radius: number, angle: number) {
  const radians = angle * Math.PI / 180
  return [260 + radius * Math.cos(radians), 260 + radius * Math.sin(radians)]
}

export function CoreValues() {
  const t = useTranslations('home.values')
  const values = t.raw('items') as Value[]
  const [current, setCurrent] = useState(0)
  const parts = useRef<(SVGGElement | null)[]>([])
  const detailId = useId()
  const value = values[current]

  return (
    <section id="values" className="dz-sec dz-values">
      <SectionStack side="r" />
      <div className="dz-wrap">
        <h2 className="dz-kicker" data-fade>{t('kicker').replace(/^\d+\s*·\s*/, '')}</h2>
        <div className="dz-values-intro" data-fade>
          <h3>{t('introTitle')}</h3>
          <p>{t('introText')}</p>
        </div>
        <div className="dz-values-demo" data-fade>
          <svg className="dz-values-wheel" viewBox="0 0 520 520" role="group" aria-label={t('wheelLabel')}>
            {values.map((item, i) => {
              const start = -160 + i * 120
              const end = start + 120
              const middle = (start + end) / 2
              const [x, y] = point(171, middle)
              return (
                <g
                  key={item.title}
                  ref={(node) => { parts.current[i] = node }}
                  className="dz-values-part"
                  role="button"
                  tabIndex={0}
                  aria-label={item.title}
                  aria-pressed={current === i}
                  aria-controls={detailId}
                  style={{
                    '--dx': `${Math.cos(middle * Math.PI / 180) * 3}px`,
                    '--dy': `${Math.sin(middle * Math.PI / 180) * 3}px`,
                  } as CSSProperties}
                  onMouseEnter={() => setCurrent(i)}
                  onFocus={() => setCurrent(i)}
                  onClick={() => setCurrent(i)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setCurrent(i)
                    } else if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
                      event.preventDefault()
                      const next = (i + (event.key === 'ArrowRight' ? 1 : values.length - 1)) % values.length
                      parts.current[next]?.focus()
                    }
                  }}
                >
                  <path
                    fill={COLORS[i]}
                    d={`M${point(232, start)} A232 232 0 0 1 ${point(232, end)} L${point(171, end - 7)} L${point(103, end)} A103 103 0 0 0 ${point(103, start)} L${point(171, start - 7)} Z`}
                  />
                  <text x={x} y={y + 8} textAnchor="middle">{item.title}</text>
                </g>
              )
            })}
            <text className="dz-values-center" x="260" y="251" textAnchor="middle" aria-hidden="true">{t('centerTop')}</text>
            <text className="dz-values-center" x="260" y="282" textAnchor="middle" aria-hidden="true">{t('centerBottom')}</text>
          </svg>
          <div className="dz-values-detail" style={{ '--accent': COLORS[current] } as CSSProperties}>
            <p className="dz-values-eyebrow">{t('eyebrow')}</p>
            <div id={detailId} aria-live="polite" aria-atomic="true">
              <div className="dz-values-copy" key={current}>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
