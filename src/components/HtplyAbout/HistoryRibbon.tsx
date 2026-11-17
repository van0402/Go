'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useTranslations } from 'next-intl'
import './history-ribbon.css'

// Dòng thời gian "dải lụa" theo bản demo htply-ribbon-reference-demo: một dải màu thon dần uốn lượn từ dưới lên,
// mỗi mốc có chữ năm, tiêu đề, mô tả và đường kẻ nối tới chấm trên dải.
// Hình học tính một lần ở mức module (không phụ thuộc trình duyệt) nên server và client cho cùng kết quả.

type Milestone = { title: string; desc: string }
const YEARS = ['2021', '2022', '2023', '2024', '2026']

const K = 0.8 // ép dọc để khối thấp hơn bản demo gốc (1 = giữ nguyên)
const S = 1.2 // nở bề rộng dải (1 = giữ nguyên)
const SHIFT = 64 // dịch cả khối sang trái bao nhiêu đơn vị (0 = như bản demo)

// 6 đoạn Bézier bậc 3 của đường tâm (tọa độ gốc của bản demo), ép theo trục y
const CURVES: [number, number][][] = (
  [
    [[680, 825], [930, 690], [900, 645], [525, 640]],
    [[525, 640], [170, 635], [130, 530], [300, 503]],
    [[300, 503], [470, 478], [775, 493], [705, 418]],
    [[705, 418], [645, 353], [475, 357], [690, 320]],
    [[690, 320], [895, 283], [970, 304], [880, 255]],
    [[880, 255], [790, 206], [860, 200], [1000, 180]],
  ] as [number, number][][]
).map((c) => c.map(([x, y]) => [x, y * K] as [number, number]))

// Đường tâm (cho hiệu ứng vẽ dần / vệt sáng) và đa giác dải thon dần (bề rộng 52 → 9 trong bản gốc)
const { CENTER, POLY, SAMPLES } = (() => {
  const left: [number, number][] = []
  const right: [number, number][] = []
  const samples: { x: number; y: number; len: number }[] = []
  let len = 0
  let prev: [number, number] | null = null
  CURVES.forEach((c, j) => {
    for (let k = 0; k <= 100; k++) {
      if (j && k === 0) continue
      const t = k / 100
      const u = 1 - t
      const x = u ** 3 * c[0][0] + 3 * u * u * t * c[1][0] + 3 * u * t * t * c[2][0] + t ** 3 * c[3][0]
      const y = u ** 3 * c[0][1] + 3 * u * u * t * c[1][1] + 3 * u * t * t * c[2][1] + t ** 3 * c[3][1]
      const dx = 3 * u * u * (c[1][0] - c[0][0]) + 6 * u * t * (c[2][0] - c[1][0]) + 3 * t * t * (c[3][0] - c[2][0])
      const dy = 3 * u * u * (c[1][1] - c[0][1]) + 6 * u * t * (c[2][1] - c[1][1]) + 3 * t * t * (c[3][1] - c[2][1])
      const n = Math.hypot(dx, dy) || 1
      const w = (S * (52 - (43 * (j + t)) / 6)) / 2
      left.push([x - (dy / n) * w, y + (dx / n) * w])
      right.push([x + (dy / n) * w, y - (dx / n) * w])
      if (prev) len += Math.hypot(x - prev[0], y - prev[1])
      prev = [x, y]
      samples.push({ x, y, len })
    }
  })
  const pts = [...left, ...right.reverse()]
  const poly = 'M' + pts.map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(' L') + ' Z'
  const f = (n: number) => n.toFixed(1)
  const center =
    `M${f(CURVES[0][0][0])},${f(CURVES[0][0][1])}` +
    CURVES.map((c) => ` C${f(c[1][0])},${f(c[1][1])} ${f(c[2][0])},${f(c[2][1])} ${f(c[3][0])},${f(c[3][1])}`).join('')
  return { CENTER: center, POLY: poly, SAMPLES: samples }
})()
const TOTAL = SAMPLES[SAMPLES.length - 1].len
// tỉ lệ chiều dài đường tâm tính tới điểm gần (x, y) nhất
const fracNear = (x: number, y: number) => {
  let best = SAMPLES[0]
  let bd = Infinity
  for (const s of SAMPLES) {
    const d = (s.x - x) ** 2 + (s.y - y) ** 2
    if (d < bd) {
      bd = d
      best = s
    }
  }
  return best.len / TOTAL
}

// Vị trí chữ và đường kẻ của từng mốc (tọa độ gốc của bản demo). lead: các điểm của đường kẻ trước chấm, dot: chấm trên dải
const SLOTS = [
  { x: 815, y: 548, lx: 790, dy: -110, wrapAt: 24, col: '#a984dc', dot: [767, 679], lead: [[802, 631], [788, 631]] },
  { x: 65, y: 350, lx: 90, dy: -18, col: '#86a8ee', dot: [218, 524], lead: [[167, 458], [167, 482]] },
  { x: 356, y: 214, col: '#4fc3d4', dot: [511, 480], lead: [[487, 328], [511, 355]] },
  { x: 600, y: 108, col: '#a6d867', dot: [747, 310], lead: [[711, 222], [711, 256]] },
  { x: 827, y: 46, lx: 790, dy: -26, wrapAt: 26, col: '#efc95e', dot: [977, 184], lead: [[960, 157], [977, 172]] },
] as readonly {
  x: number; y: number; lx?: number; dy?: number; wrapAt?: number; col: string
  dot: readonly [number, number]; lead: readonly (readonly [number, number])[]
}[]

function wrap(text: string, max: number) {
  const out: string[] = []
  let line = ''
  for (const w of text.split(/\s+/)) {
    if ((line + ' ' + w).trim().length > max && line) {
      out.push(line)
      line = w
    } else line = (line + ' ' + w).trim()
  }
  if (line) out.push(line)
  return out
}

export function HistoryRibbon() {
  const t = useTranslations('aboutPage.history')
  const items = t.raw('items') as Milestone[]
  const [active, setActive] = useState(0)
  const [hot, setHot] = useState(false)
  const [go, setGo] = useState(false)
  const root = useRef<HTMLDivElement>(null)

  // Vẽ dần khi khung vào tầm nhìn (một lần). Dùng vị trí cuộn thay vì IntersectionObserver để chạy ổn định cả khi tab/khung bị ẩn.
  useEffect(() => {
    const check = () => {
      const el = root.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight * 0.75 && r.bottom > 0) {
        setGo(true)
        window.removeEventListener('scroll', check)
        window.removeEventListener('resize', check)
      }
    }
    window.addEventListener('scroll', check, { passive: true })
    window.addEventListener('resize', check)
    check()
    return () => {
      window.removeEventListener('scroll', check)
      window.removeEventListener('resize', check)
    }
  }, [])

  const events = items.slice(0, SLOTS.length).map((item, i) => {
    const s = SLOTS[i]
    const ty = s.y * K + (s.dy ?? 0) // mép trên khối chữ sau khi ép dọc
    const lx = s.lx ?? s.x // vị trí ngang của khối chữ (có thể lệch so với bản demo để khỏi chạm dải)
    const lines = wrap(item.desc, s.wrapAt ?? 30)
    // mô tả dài hơn 2 dòng thì đẩy phần đầu đường kẻ nằm dưới khối chữ xuống theo
    const shift = 17 * Math.max(0, lines.length - 2)
    const lead = s.lead.map(([px, py]) => {
      const dy = py - s.y
      return [px + (lx - s.x), ty + dy + (dy >= 100 ? shift : 0)] as [number, number]
    })
    const dot: [number, number] = [s.dot[0], s.dot[1] * K]
    const pts = [...lead, dot]
    const leader = 'M' + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')
    const last = i === items.length - 1
    const frac = fracNear(dot[0], dot[1])
    return {
      i, x: lx, ty, col: s.col, lines, leader, dot, title: item.title,
      cap: last ? t('futureLabel') : '',
      frac,
      delay: (0.3 + 2.2 * frac).toFixed(2),
    }
  })

  const minY = Math.min(...events.map((e) => e.ty - (e.cap ? 22 : 8)))
  const maxY = 570 // cắt phần đầu dải ở phía dưới, hai đầu mờ dần vào nền

  const select = (i: number) => {
    setActive(i)
    setHot(true)
  }
  const rest = () => setHot(false)
  const cur = events[active]

  return (
    <div className={`hr${go ? ' go' : ''}${hot ? ' hot' : ''}`} ref={root}>
      <svg className="hr-svg" viewBox={`${SHIFT} ${minY.toFixed(0)} 1000 ${(maxY - minY).toFixed(0)}`} role="group" aria-label={t('milestonesLabel')}>
        <defs>
          <linearGradient id="hr-g" gradientUnits="userSpaceOnUse" x1="0" y1={800 * K} x2="0" y2={180 * K}>
            <stop offset="0" stopColor="#7652b0" />
            <stop offset=".25" stopColor="#9063c0" />
            <stop offset=".43" stopColor="#6795df" />
            <stop offset=".58" stopColor="#75a6e6" />
            <stop offset=".68" stopColor="#5fcbd6" />
            <stop offset=".79" stopColor="#add66b" />
            <stop offset=".88" stopColor="#b0d973" />
            <stop offset=".94" stopColor="#f4d765" />
            <stop offset="1" stopColor="#dd9acc" />
          </linearGradient>
          <clipPath id="hr-clip"><path d={POLY} /></clipPath>
          <mask id="hr-reveal" maskUnits="userSpaceOnUse" x="-100" y="-100" width="1200" height="900">
            <path className="hr-rev" pathLength={1} d={CENTER} stroke="#fff" strokeWidth="90" fill="none" />
          </mask>
          <filter id="hr-soft" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation="4" /></filter>
        </defs>

        <g aria-hidden="true">
          <g mask="url(#hr-reveal)">
            <path d={POLY} fill="#0b1220" opacity=".38" transform="translate(0 12)" />
            <path d={POLY} fill="url(#hr-g)" transform="translate(0 7)" style={{ filter: 'brightness(.78)' }} />
            <path d={POLY} fill="url(#hr-g)" />
            <g clipPath="url(#hr-clip)">
              <path className="hr-prog" pathLength={1} d={CENTER} strokeWidth="80" style={{ strokeDasharray: hot ? `${cur.frac} 1.2` : '0 1.2' }} />
              <path className="hr-sheen" pathLength={1} d={CENTER} strokeWidth="26" filter="url(#hr-soft)" />
            </g>
          </g>
        </g>

        {events.map((e) => (
          <g
            key={e.i}
            className={`hr-event${active === e.i ? ' on' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={`${YEARS[e.i]} ${e.title}`}
            aria-pressed={active === e.i}
            style={{ '--d': `${e.delay}s`, '--c': e.col } as CSSProperties}
            onPointerEnter={(ev) => { if (ev.pointerType === 'mouse') select(e.i) }}
            onPointerLeave={(ev) => { if (ev.pointerType === 'mouse') rest() }}
            onFocus={() => select(e.i)}
            onBlur={rest}
            onClick={() => select(e.i)}
            onKeyDown={(ev) => {
              if (ev.key === 'Enter' || ev.key === ' ') {
                ev.preventDefault()
                select(e.i)
              }
            }}
          >
            <path className="hr-leader" d={e.leader} />
            <g className="hr-node" transform={`translate(${e.dot[0]} ${e.dot[1].toFixed(1)})`}>
              <circle className="hr-pulse" r="8" />
              <circle className="hr-halo" r="11" />
              <circle className="hr-dot" r="4.6" />
            </g>
            <g className="hr-label">
              {e.cap && <text className="hr-cap" x={e.x} y={(e.ty - 8).toFixed(1)}>{e.cap}</text>}
              <text className="hr-year" x={e.x} y={(e.ty + 35).toFixed(1)}>{YEARS[e.i]}</text>
              <text className="hr-title" x={e.x} y={(e.ty + 62).toFixed(1)}>{e.title}</text>
              {e.lines.map((ln, k) => (
                <text key={k} className="hr-desc" x={e.x} y={(e.ty + 84 + 17 * k).toFixed(1)}>{ln}</text>
              ))}
            </g>
          </g>
        ))}
      </svg>

      {/* Màn hình nhỏ: chữ trong hình quá bé nên chọn mốc bằng nút và đọc mô tả ở đây */}
      <div className="hr-mobile">
        <div className="hr-pills">
          {events.map((e) => (
            <button key={e.i} type="button" className={active === e.i ? 'on' : ''} onClick={() => select(e.i)}>{YEARS[e.i]}</button>
          ))}
        </div>
        <div className="hr-detail" aria-live="polite">
          <strong style={{ color: cur.col }}>{YEARS[cur.i]} · {items[cur.i].title}</strong>
          <span>{items[cur.i].desc}</span>
        </div>
      </div>
    </div>
  )
}
