'use client'

import { useEffect, useRef } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { MAP_POINTS, MAP_SVG } from './export-map-data'
import './export-map.css'

// Mã quốc gia ISO (để dịch tên nước theo ngôn ngữ bằng Intl) và khóa chữ của từng khu vực trong messages
const ISO: Record<string, string> = { '276': 'DE', '528': 'NL', '250': 'FR', '784': 'AE', '682': 'SA', '710': 'ZA', '036': 'AU', '554': 'NZ' }
const REGION_KEY = { Europe: 'europe', 'Middle East': 'middleEast', Africa: 'africa', Australia: 'australia', 'New Zealand': 'newZealand' } as const

// Bản đồ xuất khẩu: các đường cong vẽ dần từ Việt Nam tới từng thị trường, chấm sáng chạy dọc đường.
// Rê chuột hoặc bấm vào một nước để làm nổi đường đó. Chỉ chạy khi bản đồ vào màn hình; tắt khi bật "giảm chuyển động".
export function ExportMap() {
  const rootRef = useRef<HTMLDivElement>(null)
  const locale = useLocale()
  const tm = useTranslations('aboutPage.business.markets')

  useEffect(() => {
    const root = rootRef.current
    const svg = root?.querySelector<SVGSVGElement>('svg')
    if (!root || !svg) return

    const ac = new AbortController()
    const opt = { signal: ac.signal }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const points = MAP_POINTS

    // Nhãn theo ngôn ngữ hiện tại: tên nước (Intl) và "Thành phố · Khu vực"
    let names: Intl.DisplayNames | null = null
    try {
      names = new Intl.DisplayNames([locale], { type: 'region' })
    } catch {
      names = null
    }
    const labels = points.map((p) => ({
      country: names?.of(ISO[p.id] ?? '') ?? p.name,
      line: `${p.city} · ${tm(REGION_KEY[p.region as keyof typeof REGION_KEY] ?? 'europe')}`,
    }))

    const groups = Array.from(svg.querySelectorAll<SVGGElement>('[data-route]'))
    const paths = groups.map((g) => g.querySelector<SVGPathElement>('.route')!)
    const lengths = paths.map((p) => p.getTotalLength())
    const dots = groups.map((g) => g.querySelector<SVGCircleElement>('.traveller')!)
    const halos = groups.map((g) => g.querySelector<SVGCircleElement>('.traveller-halo')!)
    const lights = groups.map((g) => g.querySelector<SVGPathElement>('.route-light')!)
    const unders = groups.map((g) => g.querySelector<SVGPathElement>('.route-under')!)
    const pins = Array.from(svg.querySelectorAll<SVGGElement>('[data-destination]'))
    const rings = pins.map((g) => g.querySelector<SVGCircleElement>('.arrival')!)
    const label = svg.querySelector<SVGGElement>('#selected-label')!
    const pulses = [svg.querySelector<SVGCircleElement>('#pulse-one')!, svg.querySelector<SVGCircleElement>('#pulse-two')!]
    const byId = (id: string) => svg.querySelector<SVGElement>(`#${id}`)!

    let selected = -1
    let hovered = -1
    let reduced = mq.matches
    let elapsed = reduced ? 5000 : 0
    let previous = 0
    let raf = 0
    let visible = false
    const introEnd = 3600

    points.forEach((p) => svg.querySelector(`[data-country="${p.id}"]`)?.classList.add('market-country'))

    function highlight(index: number) {
      svg!.classList.toggle('has-selection', index >= 0)
      groups.forEach((g, i) => g.classList.toggle('selected', i === index))
      pins.forEach((g, i) => g.classList.toggle('selected', i === index))
      svg!.querySelectorAll('.selected-country').forEach((el) => el.classList.remove('selected-country'))
      if (index < 0) {
        label.classList.remove('visible')
        return
      }
      const p = points[index]!
      svg!.querySelector(`[data-country="${p.id}"]`)?.classList.add('selected-country')
      const boxX = p.x - 175
      const boxY = p.y - 65
      byId('label-leader').setAttribute('d', `M${p.x},${p.y - 8} L${p.x - 14},${boxY + 22} H${boxX + 157}`)
      const rect = byId('label-rect')
      rect.setAttribute('x', String(boxX))
      rect.setAttribute('y', String(boxY))
      const title = byId('label-country')
      title.setAttribute('x', String(boxX + 12))
      title.setAttribute('y', String(boxY + 18))
      title.textContent = labels[index]!.country
      const sub = byId('label-city')
      sub.setAttribute('x', String(boxX + 12))
      sub.setAttribute('y', String(boxY + 32))
      sub.textContent = labels[index]!.line
      label.classList.add('visible')
    }

    function select(index: number) {
      selected = index
      hovered = -1
      pins.forEach((p, i) => p.setAttribute('aria-pressed', String(i === index)))
      highlight(index)
      if (reduced) paint(elapsed)
    }

    pins.forEach((p, i) => {
      p.addEventListener('click', (e) => { e.stopPropagation(); select(selected === i ? -1 : i) }, opt)
      p.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(selected === i ? -1 : i) } }, opt)
      p.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') { hovered = i; highlight(i) } }, opt)
      p.addEventListener('pointerleave', () => { hovered = -1; highlight(selected) }, opt)
      p.addEventListener('focus', () => highlight(i), opt)
      p.addEventListener('blur', () => highlight(selected), opt)
    })
    svg.addEventListener('click', () => select(-1), opt)

    function putDot(i: number, t: number, opacity: number) {
      const pt = paths[i]!.getPointAtLength(lengths[i]! * Math.max(0, Math.min(1, t)))
      for (const el of [dots[i]!, halos[i]!]) {
        el.setAttribute('cx', String(pt.x))
        el.setAttribute('cy', String(pt.y))
      }
      dots[i]!.setAttribute('opacity', String(opacity))
      halos[i]!.setAttribute('opacity', String(opacity * 0.16))
      lights[i]!.style.strokeDashoffset = String(-Math.max(0, t - 0.025))
      lights[i]!.style.opacity = String(opacity * 0.45)
    }

    function paint(time: number) {
      const effective = hovered >= 0 ? hovered : selected
      const n = points.length
      groups.forEach((g, i) => {
        const start = 350 + i * 230
        const duration = 1500
        const p = reduced ? 1 : Math.max(0, Math.min(1, (time - start) / duration))
        paths[i]!.style.strokeDashoffset = String(1 - p)
        unders[i]!.style.strokeDasharray = '1'
        unders[i]!.setAttribute('pathLength', '1')
        unders[i]!.style.strokeDashoffset = String(1 - p)
        pins[i]!.style.opacity = String(p === 1 ? 1 : 0.12)
        const arrival = (time - start - duration) / 900
        if (!reduced && arrival >= 0 && arrival < 1) {
          rings[i]!.setAttribute('r', String(5 + arrival * 18))
          rings[i]!.setAttribute('opacity', String((1 - arrival) * 0.7))
        } else rings[i]!.setAttribute('opacity', '0')
        if (!reduced && p > 0 && p < 1) putDot(i, p, 0.95)
        else if (!reduced && time > introEnd) {
          const loop = (time - introEnd) % (n * 1250 + 2000)
          const t = (loop - i * 1250) / 1750
          const solo = effective === i ? ((time - introEnd) % 3800) / 2500 : -1
          const travel = effective >= 0 ? solo : t
          const on = travel >= 0 && travel < 1
          putDot(i, on ? travel : 1, on ? Math.sin(Math.PI * travel) * 0.9 : 0)
        } else putDot(i, 1, 0)
      })
      pulses.forEach((c, i) => {
        const phase = reduced ? 0.5 : ((time + i * 1450) % 2900) / 2900
        c.setAttribute('r', String(10 + phase * 33))
        c.setAttribute('opacity', String(reduced ? 0.18 : (1 - phase) * 0.46))
      })
    }

    function tick(t: number) {
      raf = 0
      if (document.hidden || !visible) return
      if (previous) elapsed += Math.min(t - previous, 80)
      previous = t
      paint(elapsed)
      if (!reduced) raf = requestAnimationFrame(tick)
    }
    function start() {
      previous = 0
      if (!raf && !reduced && visible && !document.hidden) raf = requestAnimationFrame(tick)
    }

    // Chỉ chạy khi bản đồ đang trong màn hình (nếu không, phần vẽ dần đã xong trước khi khách cuộn tới)
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = !!entry?.isIntersecting
        if (visible) start()
        else {
          cancelAnimationFrame(raf)
          raf = 0
          previous = 0
        }
      },
      { threshold: 0.25 },
    )
    io.observe(root)

    mq.addEventListener('change', (e) => {
      reduced = e.matches
      if (reduced) {
        cancelAnimationFrame(raf)
        raf = 0
        elapsed = Math.max(elapsed, introEnd)
        paint(elapsed)
      } else start()
    }, opt)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
        previous = 0
      } else start()
    }, opt)

    paint(elapsed)

    // Điện thoại: bản đồ cuộn ngang được, mở sẵn ở vùng Việt Nam (x = 882 trên bề rộng 1280)
    if (window.matchMedia('(max-width: 700px)').matches) {
      root.scrollLeft = (882 / 1280) * root.scrollWidth - root.clientWidth / 2
    }

    return () => {
      ac.abort()
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [locale, tm])

  return (
    <div className="ad-map" ref={rootRef}>
      <div className="map-shell">
        <svg
          className="map-svg"
          viewBox="0 0 1280 600"
          role="img"
          aria-label="Export routes from Vietnam to Europe, the Middle East, Africa, Australia and New Zealand"
          dangerouslySetInnerHTML={{ __html: MAP_SVG }}
        />
      </div>
    </div>
  )
}
