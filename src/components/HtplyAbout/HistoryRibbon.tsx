'use client'

import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useTranslations } from 'next-intl'
import './history-ribbon.css'

// Dòng thời gian "dải lụa": một dải màu uốn lượn từ trái sang phải, mỗi mốc là một nút trên dải kèm khối chữ.
// Hình học tính một lần ở mức module (không phụ thuộc trình duyệt) nên server và client cho cùng kết quả.

type Milestone = { title: string; desc: string }
const YEARS = ['2021', '2022', '2023', '2024', '2026']

const W = 1000
const WIDTH = 74 // độ rộng dải
const X0 = -70
const X1 = 1070
// Đường thoải hơn (biên độ nhỏ, độ dốc nhẹ) để cả khối thấp hơn
const Y = (x: number) => 300 - 0.1 * (x - 500) + 60 * Math.sin((x - 70) / 150)

const STOPS: [number, string][] = [
  [0, '#7652b0'], [0.2, '#9063c0'], [0.38, '#6795df'], [0.54, '#4fc3d4'],
  [0.7, '#9ed15e'], [0.85, '#f1cf58'], [1, '#e79fcf'],
]
const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16))
const toHex = (a: number[]) => '#' + a.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('')
function colorAt(t: number) {
  t = Math.min(1, Math.max(0, t))
  for (let i = 1; i < STOPS.length; i++) {
    if (t <= STOPS[i][0]) {
      const [t0, c0] = STOPS[i - 1]
      const [t1, c1] = STOPS[i]
      const k = (t - t0) / (t1 - t0)
      const a = hex(c0), b = hex(c1)
      return toHex(a.map((v, j) => v + (b[j] - v) * k))
    }
  }
  return STOPS[STOPS.length - 1][1]
}
const darker = (c: string, f: number) => toHex(hex(c).map((v) => v * f))

// Đường tâm: lấy mẫu rồi nối Catmull-Rom → Bézier cho mượt
const PATH = (() => {
  const pts: [number, number][] = []
  for (let x = X0; x <= X1; x += 14) pts.push([x, Y(x)])
  let d = `M${pts[0][0]},${pts[0][1].toFixed(1)}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += ` C${c1[0].toFixed(1)},${c1[1].toFixed(1)} ${c2[0].toFixed(1)},${c2[1].toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`
  }
  return d
})()

// Tỉ lệ chiều dài đường tới x (để tô sáng đoạn dải từ đầu tới mốc)
const CUM = (() => {
  const out: [number, number][] = []
  let acc = 0, px = X0, py = Y(X0)
  for (let x = X0; x <= X1; x += 1) {
    const y = Y(x)
    acc += Math.hypot(x - px, y - py)
    px = x
    py = y
    out.push([x, acc])
  }
  return out
})()
const fracAt = (x: number) => (CUM.find(([cx]) => cx >= x) ?? CUM[CUM.length - 1])[1] / CUM[CUM.length - 1][1]

// Vị trí các mốc: so le trên / dưới dải
const SLOTS = [
  { x: 150, pos: 'above' as const },
  { x: 345, pos: 'below' as const },
  { x: 545, pos: 'above' as const, bx: 372 },
  { x: 745, pos: 'below' as const },
  { x: 915, pos: 'above' as const, bx: 712 },
]
const GAP_UP = 56
const GAP_DOWN = 50

// Khoảng y mà dải chiếm (cộng nửa bề rộng và bóng đổ) để cắt khung vừa khít
const RIB = (() => {
  let lo = Infinity, hi = -Infinity
  for (let x = 0; x <= W; x += 10) {
    const y = Y(x)
    lo = Math.min(lo, y)
    hi = Math.max(hi, y)
  }
  return { top: lo - WIDTH / 2 - 4, bottom: hi + WIDTH / 2 + 34 }
})()

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
    const y = Y(s.x)
    const col = colorAt(s.x / W)
    const lines = wrap(item.desc, 34)
    const blockH = 106 + 15 * (lines.length - 1) + 12
    const bx = s.bx ?? Math.min(W - 215, Math.max(28, s.x - 22))
    const top = s.pos === 'above' ? y - GAP_UP - blockH : y + GAP_DOWN
    const edge = s.pos === 'above' ? top + blockH + 4 : top - 4
    const title = item.title.toUpperCase()
    return {
      i, y, col, tc: darker(col, 0.84), lines, bx, top, edge, title, blockH,
      x: s.x, pos: s.pos,
      nodeEdge: s.pos === 'above' ? y - 18 : y + 18,
      tagW: Math.max(110, title.length * 8.2 + 26),
      delay: (0.35 + 2.0 * ((s.x - X0) / (X1 - X0))).toFixed(2),
      frac: fracAt(s.x),
      cap: i === items.length - 1 ? t('futureLabel') : '',
    }
  })

  // Khung cắt sát nội dung: từ mép trên của khối chữ/dải cao nhất tới mép dưới thấp nhất
  const minY = Math.min(RIB.top, ...events.map((e) => e.top)) - 8
  const maxY = Math.max(RIB.bottom, ...events.map((e) => (e.pos === 'below' ? e.top + e.blockH : e.y))) + 8

  const select = (i: number) => {
    setActive(i)
    setHot(true)
  }
  const rest = () => setHot(false)
  const cur = events[active]

  return (
    <div className={`hr${go ? ' go' : ''}${hot ? ' hot' : ''}`} ref={root}>
      <svg className="hr-svg" viewBox={`0 ${minY.toFixed(0)} ${W} ${(maxY - minY).toFixed(0)}`} role="group" aria-label={t('milestonesLabel')}>
        <defs>
          <linearGradient id="hr-g" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
            {STOPS.map(([o, c]) => <stop key={o} offset={o} stopColor={c} />)}
          </linearGradient>
          <linearGradient id="hr-gd" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2={W} y2="0">
            {STOPS.map(([o, c]) => <stop key={o} offset={o} stopColor={darker(c, 0.78)} />)}
          </linearGradient>
          <filter id="hr-blur" x="-10%" y="-30%" width="120%" height="160%"><feGaussianBlur stdDeviation="11" /></filter>
          <filter id="hr-soft" x="-5%" y="-30%" width="110%" height="160%"><feGaussianBlur stdDeviation="5" /></filter>
        </defs>
        <g aria-hidden="true">
          <path className="hr-rb" pathLength={1} d={PATH} stroke="#0b1220" strokeOpacity=".42" strokeWidth={WIDTH - 4} filter="url(#hr-blur)" transform="translate(0 26)" />
          <path className="hr-rb" pathLength={1} d={PATH} stroke="url(#hr-gd)" strokeWidth={WIDTH} transform="translate(0 9)" />
          <path className="hr-rb" pathLength={1} d={PATH} stroke="url(#hr-g)" strokeWidth={WIDTH} />
          <path className="hr-dots" pathLength={1} d={PATH} stroke="#fff" strokeOpacity=".38" strokeWidth="2" />
          <path className="hr-prog" pathLength={1} d={PATH} strokeWidth={WIDTH} style={{ strokeDasharray: hot ? `${cur.frac} 1.2` : '0 1.2' }} />
          <path className="hr-sheen" pathLength={1} d={PATH} strokeWidth="30" filter="url(#hr-soft)" />
        </g>
        {events.map((e) => (
          <g
            key={e.i}
            className={`hr-event${active === e.i ? ' on' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={`${YEARS[e.i]} ${items[e.i].title}`}
            aria-pressed={active === e.i}
            style={{ '--d': `${e.delay}s`, '--c': e.col, '--tc': e.tc } as CSSProperties}
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
            <path className="hr-leader" d={`M${e.x},${e.nodeEdge.toFixed(1)}V${e.edge.toFixed(1)}`} />
            <circle className="hr-lead-dot" cx={e.x} cy={e.edge.toFixed(1)} r="3" />
            <g className="hr-node" transform={`translate(${e.x} ${e.y.toFixed(1)})`}>
              <circle className="hr-pulse" r="15" />
              <circle className="hr-halo" r="22" />
              <circle className="hr-ring" r="15" />
              <circle className="hr-core" r="6.5" />
            </g>
            <g className="hr-label">
              {e.cap && <text className="hr-tiny hr-cap" x={e.bx} y={(e.top + 13).toFixed(1)}>{e.cap}</text>}
              <text className="hr-year" x={e.bx} y={(e.top + 56).toFixed(1)}>{YEARS[e.i]}</text>
              <rect className="hr-tag" x={e.bx} y={(e.top + 66).toFixed(1)} width={e.tagW.toFixed(0)} height="24" rx="12" />
              <text className="hr-name" x={e.bx + 12} y={(e.top + 82).toFixed(1)}>{e.title}</text>
              {e.lines.map((ln, k) => (
                <text key={k} className="hr-tiny hr-line" x={e.bx} y={(e.top + 106 + 15 * k).toFixed(1)}>{ln}</text>
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
