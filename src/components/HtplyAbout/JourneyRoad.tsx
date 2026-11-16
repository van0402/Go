'use client'

import { useEffect, useId, useRef, useState, type CSSProperties } from 'react'
import { useTranslations } from 'next-intl'
import './journey-road.css'

type Milestone = { title: string; desc: string }
const YEARS = ['2021', '2022', '2023', '2024', '2026']
const POSITIONS = [
  { x: '27.027%', y: '7.05%' },
  { x: '72.973%', y: '28.2%' },
  { x: '27.027%', y: '50%' },
  { x: '72.973%', y: '71.795%' },
  { x: '27.027%', y: '92.308%' },
]
const ROAD = 'M300 55 C300 145 810 100 810 220 S300 310 300 390 S810 460 810 560'

export function JourneyRoad() {
  const t = useTranslations('aboutPage.history')
  const items = t.raw('items') as Milestone[]
  const [active, setActive] = useState(0)
  const [entered, setEntered] = useState(false)
  const [replay, setReplay] = useState(0)
  const root = useRef<HTMLDivElement>(null)
  const buttons = useRef<(HTMLButtonElement | null)[]>([])
  const id = useId()

  useEffect(() => {
    if (!root.current) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setEntered(true)
        observer.disconnect()
      }
    }, { threshold: .15 })
    observer.observe(root.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`ad-journey${entered ? ' has-entered' : ''}`} ref={root}>
      <div className="journey-track" role="group" aria-label={t('milestonesLabel')}>
        <svg className="journey-road" viewBox="0 0 1110 780" preserveAspectRatio="none" aria-hidden="true">
          <path className="road-bed" d={ROAD} />
          <path className="road-inset" d={ROAD} />
          <path className="road-line" pathLength="1" d={ROAD} key={replay} />
          <path className="road-future" d="M810 560 C810 640 300 625 300 720" />
        </svg>
        {items.map((item, i) => (
          <article
            key={YEARS[i]}
            className={`journey-milestone ${i % 2 ? 'left' : 'right'}${active === i ? ' active' : ''}${i === items.length - 1 ? ' next' : ''}`}
            style={{ '--x': POSITIONS[i].x, '--y': POSITIONS[i].y } as CSSProperties}
            onPointerEnter={(event) => { if (event.pointerType === 'mouse') setActive(i) }}
          >
            <button
              type="button" className="journey-trigger"
              ref={(node) => { buttons.current[i] = node }}
              aria-expanded={active === i} aria-controls={`${id}-${i}`}
              onFocus={() => setActive(i)} onClick={() => setActive(i)}
              onKeyDown={(event) => {
                if (['ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(event.key)) {
                  event.preventDefault()
                  const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight' ? 1 : items.length - 1
                  buttons.current[(i + direction) % items.length]?.focus()
                }
              }}
            >
              <span className="journey-marker" aria-hidden="true" />
              <span className="journey-connector" aria-hidden="true" />
              <span className="journey-year">{YEARS[i]}</span>
              <span className="journey-title">{item.title}</span>
            </button>
            {i === items.length - 1 && <span className="journey-badge">{t('futureLabel')}</span>}
            <div className="journey-description" id={`${id}-${i}`} aria-hidden={active !== i}>
              <div><p>{item.desc}</p></div>
            </div>
          </article>
        ))}
      </div>
      <div className="journey-footer">
        <button type="button" className="journey-replay" onClick={() => { setActive(0); setReplay((current) => current + 1) }}>
          {t('replayLabel')} <span aria-hidden="true">↗</span>
        </button>
      </div>
    </div>
  )
}
