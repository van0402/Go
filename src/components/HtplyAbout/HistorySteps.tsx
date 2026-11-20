'use client'

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react'
import { useTranslations } from 'next-intl'
import './history-steps.css'

// Lịch sử công ty dạng bậc thang: mỗi mốc là một tấm ván gỗ thật (ảnh public/images/about/history-wood-*.jpg),
// cao dần theo năm. Mốc cuối (tương lai) là tấm "bản vẽ" trong suốt.
// Hiệu ứng khi cuộn tới: ván rơi xuống nảy nhẹ, bụi gỗ, số năm đếm lên, mũi tên tăng trưởng vẽ dần.
// Rê chuột: tấm ván nghiêng 3D theo chuột và có vệt sáng lướt qua.

type Milestone = { title: string; desc: string }
const YEARS = [2021, 2022, 2023, 2024, 2026]
const STAGGER = 220 // ms giữa hai tấm ván
const LAND = 480 // ms từ lúc bắt đầu rơi tới lúc chạm đất (khớp keyframes hs-land)
const GRAIN = ['10%', '85%', '35%', '65%'] // mỗi tấm lấy một đoạn vân khác nhau của cùng tấm ván

// Bụi gỗ: vị trí cố định (không random) để server và client vẽ giống nhau
const DUST = Array.from({ length: 12 }, (_, k) => ({
  left: `${10 + ((k * 37) % 80)}%`,
  x: `${((k * 53) % 80) - 40}px`,
  y: `${-10 - ((k * 29) % 36)}px`,
}))

export function HistorySteps() {
  const t = useTranslations('aboutPage.history')
  const items = (t.raw('items') as Milestone[]).slice(0, YEARS.length)
  const last = items.length - 1

  const root = useRef<HTMLDivElement>(null)
  const grid = useRef<HTMLDivElement>(null)
  const [armed, setArmed] = useState(false) // JS đã chạy: mới ẩn ván để chờ hiệu ứng (không JS vẫn thấy đủ)
  const [go, setGo] = useState(false)
  const [run, setRun] = useState(0) // tăng lên khi bấm "Replay" để vẽ lại từ đầu
  const [arrow, setArrow] = useState({ d: '', len: 0 })
  const [drawn, setDrawn] = useState(false)

  // Tấm ván nào có class "in" thì rơi xuống. Máy tính: cả hàng cùng vào khi khung tới tầm nhìn (rơi lần lượt trái → phải).
  // Điện thoại (xếp dọc): tấm nào cuộn tới thì tấm đó mới rơi. Dùng vị trí cuộn như các phần khác của trang About.
  useEffect(() => {
    setArmed(true)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const check = () => {
      const box = grid.current
      if (!box) return false
      const slots = [...box.querySelectorAll<HTMLElement>('.hs-slot')]
      const vh = window.innerHeight
      if (reduce) slots.forEach((s) => s.classList.add('in'))
      else if (window.matchMedia('(max-width: 860px)').matches) {
        slots.forEach((s) => {
          if (s.getBoundingClientRect().top < vh * 0.85) s.classList.add('in')
        })
      } else {
        const r = box.getBoundingClientRect()
        if (r.top < vh * 0.7 && r.bottom > 0) slots.forEach((s) => s.classList.add('in'))
      }
      if (slots.some((s) => s.classList.contains('in'))) setGo(true)
      return slots.every((s) => s.classList.contains('in'))
    }
    const onScroll = () => {
      if (check()) window.removeEventListener('scroll', onScroll)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [run])

  // Số năm đếm lên lúc tấm ván chạm đất (gọi khi hiệu ứng rơi bắt đầu)
  const countUp = (board: HTMLElement, end: number) => {
    const el = board.querySelector<HTMLElement>('.hs-year')
    if (!el) return
    window.setTimeout(() => {
      const t0 = performance.now()
      const tick = (now: number) => {
        const k = Math.min(1, (now - t0) / 900)
        el.textContent = String(Math.round(end - 12 * Math.pow(1 - k, 3)))
        if (k < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, LAND)
  }

  // Mũi tên đi qua đỉnh các tấm ván (đo vị trí thật sau khi bố cục xong)
  useEffect(() => {
    const measure = () => {
      const box = grid.current
      if (!box) return
      const r = box.getBoundingClientRect()
      const pts = [...box.querySelectorAll<HTMLElement>('.hs-slot')].map((s) => {
        const q = s.getBoundingClientRect()
        return [q.left - r.left + q.width / 2, q.top - r.top - 44] as const
      })
      if (!pts.length) return
      // bắt đầu từ mép trái, ngay trên đỉnh tấm đầu tiên (không cắt qua tấm ván)
      const start = [Math.max(0, pts[0][0] - 110), pts[0][1] + 14] as const
      let d = `M${start[0].toFixed(1)},${start[1].toFixed(1)}`
      pts.forEach((p, i) => {
        const prev = i ? pts[i - 1] : start
        const cx = ((prev[0] + p[0]) / 2).toFixed(1)
        d += ` C${cx},${prev[1].toFixed(1)} ${cx},${p[1].toFixed(1)} ${p[0].toFixed(1)},${p[1].toFixed(1)}`
      })
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', d)
      setArrow({ d, len: Math.ceil(path.getTotalLength()) })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (grid.current) ro.observe(grid.current)
    return () => ro.disconnect()
  }, [run])

  // Mũi tên vẽ dần sau khi cả hàng ván đã rơi xong (chỉ hiện trên máy tính)
  useEffect(() => {
    if (!go) return
    setDrawn(false)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const timer = window.setTimeout(() => setDrawn(true), reduce ? 0 : YEARS.length * STAGGER + 500)
    return () => clearTimeout(timer)
  }, [go, run])

  // Nghiêng 3D theo chuột (chỉ khi tấm ván đã rơi xong)
  const tilt = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    if (e.pointerType !== 'mouse' || !el.classList.contains('done')) return
    const q = el.getBoundingClientRect()
    const x = (e.clientX - q.left) / q.width - 0.5
    const y = (e.clientY - q.top) / q.height - 0.5
    el.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${(-y * 10).toFixed(2)}deg`)
    el.style.setProperty('--lift', '-10px')
  }
  const untilt = (e: PointerEvent<HTMLDivElement>) => {
    for (const p of ['--rx', '--ry', '--lift']) e.currentTarget.style.removeProperty(p)
  }

  return (
    <div className={`hs${armed ? ' armed' : ''}${go ? ' go' : ''}${drawn ? ' drawn' : ''}`} ref={root}>
      <button type="button" className="hs-replay" onClick={() => setRun((n) => n + 1)}>
        <span aria-hidden="true">↻</span> {t('replayLabel')}
      </button>

      <div className="hs-stage" ref={grid} key={run}>
        {arrow.d && (
          <svg className="hs-arrow" aria-hidden="true" style={{ '--len': arrow.len } as CSSProperties}>
            <defs>
              <marker id="hs-ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0 0L10 5L0 10z" />
              </marker>
            </defs>
            <path className="hs-line" d={arrow.d} markerEnd="url(#hs-ah)" />
          </svg>
        )}

        <ol className="hs-grid" aria-label={t('milestonesLabel')}>
        {items.map((m, i) => {
          const future = i === last
          return (
            <li
              key={i}
              className="hs-slot"
              style={{ '--h': `${44 + i * 14}%`, '--i': i } as CSSProperties}
            >
              {future && <span className="hs-glow" aria-hidden="true" />}
              <div
                className={`hs-board${future ? ' blue' : ''}`}
                style={{ '--py': GRAIN[i] ?? '50%' } as CSSProperties}
                onAnimationStart={(e) => {
                  if (e.target === e.currentTarget && e.animationName.endsWith('hs-land')) countUp(e.currentTarget, YEARS[i])
                }}
                onAnimationEnd={(e) => {
                  if (e.target === e.currentTarget && e.animationName.endsWith('hs-land')) e.currentTarget.classList.add('done')
                }}
                onPointerMove={tilt}
                onPointerLeave={untilt}
              >
                <span className="hs-top" aria-hidden="true" />
                <span className="hs-side" aria-hidden="true" />
                <span className="hs-face" aria-hidden="true">{future && <span className="hs-ants" />}</span>
                <div className="hs-txt">
                  {future && <div className="hs-meta hs-cap">{t('futureLabel')}</div>}
                  <div className="hs-year">{YEARS[i]}</div>
                  <h4>{m.title}</h4>
                  <p>{m.desc}</p>
                  <div className="hs-meta" aria-hidden="true">
                    {`HTPLY · ${YEARS[i]}`}
                    <i />
                  </div>
                </div>
              </div>
              {!future && (
                <span className="hs-dust" aria-hidden="true">
                  {DUST.map((p, k) => (
                    <i key={k} style={{ left: p.left, '--x': p.x, '--y': p.y } as CSSProperties} />
                  ))}
                </span>
              )}
            </li>
          )
        })}
        </ol>
        <span className="hs-floor" aria-hidden="true" />
      </div>
    </div>
  )
}
