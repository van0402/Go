'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { MAP_COUNTRIES, MAP_POINTS } from './export-map-data'
import './export-map.css'

const ISO: Record<string, string> = {
  '276': 'DE', '528': 'NL', '250': 'FR', '826': 'GB', '784': 'AE',
  '682': 'SA', '710': 'ZA', '036': 'AU', '554': 'NZ',
}

export function ExportMap() {
  const rootRef = useRef<HTMLDivElement>(null)
  const paths = useRef<(SVGPathElement | null)[]>([])
  const dots = useRef<(SVGCircleElement | null)[]>([])
  const clock = useRef(0)
  const locale = useLocale()
  const t = useTranslations('aboutPage.business.map')
  const statusId = useId()
  const [selected, setSelected] = useState<number | null>(null)
  const [preview, setPreview] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)
  const active = preview ?? selected
  const names = new Intl.DisplayNames([locale], { type: 'region' })
  const countryName = (index: number) => names.of(ISO[MAP_POINTS[index].id]) ?? MAP_POINTS[index].name

  useEffect(() => {
    const scroll = rootRef.current?.querySelector<HTMLElement>('.map-scroll')
    if (scroll && window.matchMedia('(max-width: 650px)').matches) {
      scroll.scrollLeft = (882.47 / 1280) * scroll.scrollWidth - scroll.clientWidth / 2
    }
  }, [])

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPaused(query.matches)
    const change = () => setPaused(query.matches)
    query.addEventListener('change', change)
    return () => query.removeEventListener('change', change)
  }, [])

  useEffect(() => {
    const root = rootRef.current
    if (!root || paused) return
    const lengths = paths.current.map((path) => path?.getTotalLength() ?? 0)
    const pins = root.querySelectorAll<SVGGElement>('.pin')
    let frame = 0
    let previous = 0
    let visible = false
    const tick = (now: number) => {
      frame = 0
      if (!visible || document.hidden) return
      if (previous) clock.current += Math.min(now - previous, 60)
      previous = now
      paths.current.forEach((path, i) => {
        const dot = dots.current[i]
        if (!path || !dot) return
        const reveal = Math.max(0, Math.min(1, (clock.current - i * 140) / 1500))
        path.style.strokeDashoffset = String(1 - reveal)
        pins[i]?.setAttribute('opacity', String(.2 + reveal * .8))
        const progress = ((clock.current - 2700) / 3400 - i * .19) % 3
        const travelling = clock.current >= 2700 && progress >= 0 && progress <= 1
        if (travelling) {
          const point = path.getPointAtLength(lengths[i] * progress)
          dot.setAttribute('cx', String(point.x))
          dot.setAttribute('cy', String(point.y))
        }
        dot.setAttribute('opacity', travelling ? String(Math.sin(Math.PI * progress)) : '0')
      })
      frame = requestAnimationFrame(tick)
    }
    const start = () => {
      previous = 0
      if (!frame && visible && !document.hidden) frame = requestAnimationFrame(tick)
    }
    const stop = () => { cancelAnimationFrame(frame); frame = 0; previous = 0 }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        root.classList.add('has-entered')
        start()
      }
      else stop()
    }, { threshold: .1 })
    const onVisibility = () => { if (document.hidden) stop(); else start() }
    observer.observe(root)
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      observer.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [paused])

  const toggle = (index: number) => setSelected((current) => current === index ? null : index)
  const place = active === null ? null : MAP_POINTS[active]
  const placeName = active === null ? '' : countryName(active)
  const labelWidth = Math.min(270, placeName.length * 7 + 24)
  const labelX = place ? Math.max(10, Math.min(1260 - labelWidth, place.x - labelWidth / 2)) : 0

  return (
    <div className={`ad-map${paused ? ' is-paused' : ''}`} ref={rootRef}>
      <div className="map-wrap">
        <div className="map-scroll" tabIndex={0} role="region" aria-label={t('mapLabel')}>
          <svg className="map-svg" viewBox="0 0 1280 550" role="group" aria-label={t('mapLabel')}>
            <g aria-hidden="true">
              {MAP_COUNTRIES.map((country, i) => {
                const index = MAP_POINTS.findIndex((point) => point.id === country.id)
                return (
                  <path
                    key={`${country.id}-${i}`}
                    className={`country${index >= 0 ? ' market' : ''}${country.id === '704' ? ' origin' : ''}${index >= 0 && active === index ? ' active' : ''}`}
                    d={country.path}
                    onPointerEnter={(event) => { if (index >= 0 && event.pointerType === 'mouse') setPreview(index) }}
                    onPointerLeave={() => setPreview(null)}
                    onClick={() => { if (index >= 0) toggle(index) }}
                  ><title>{index >= 0 ? countryName(index) : country.name}</title></path>
                )
              })}
            </g>
            <g className={`routes${active !== null ? ' focused' : ''}`} aria-hidden="true">
              {MAP_POINTS.map((point, i) => (
                <path key={point.id} ref={(node) => { paths.current[i] = node }} className={`route${active === i ? ' active' : ''}`} pathLength={1} d={point.path} />
              ))}
            </g>
            <g aria-hidden="true">
              {MAP_POINTS.map((point, i) => <circle key={point.id} ref={(node) => { dots.current[i] = node }} r="2.7" className="traveller" opacity="0" style={{ visibility: active === null || active === i ? 'visible' : 'hidden' }} />)}
            </g>
            {MAP_POINTS.map((point, i) => (
              <g
                key={point.id} className={`pin${active === i ? ' active' : ''}`} opacity=".2"
                transform={`translate(${point.x} ${point.y})`}
                role="button" tabIndex={0} aria-label={countryName(i)}
                aria-pressed={selected === i} aria-controls={statusId}
                onPointerEnter={(event) => { if (event.pointerType === 'mouse') setPreview(i) }}
                onPointerLeave={() => setPreview(null)}
                onFocus={() => setPreview(i)} onBlur={() => setPreview(null)}
                onClick={() => toggle(i)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); toggle(i) }
                }}
              >
                <circle r="12" fill="transparent" /><circle r="7" className="ring" /><circle r="3.5" className="dot" />
              </g>
            ))}
            <g aria-hidden="true" className="map-origin">
              <circle className="pulse" cx="882.47" cy="229.7" r="13" />
              <circle className="pulse second" cx="882.47" cy="229.7" r="13" />
              <circle cx="882.47" cy="229.7" r="10" fill="#59cbe82a" stroke="#59cbe8" />
              <circle cx="882.47" cy="229.7" r="4.7" fill="#fff" stroke="#329dbb" strokeWidth="2.5" />
            </g>
            {place && <g className="place" aria-hidden="true">
              <rect x={labelX} y={place.y - 44} width={labelWidth} height="30" rx="5" />
              <text x={labelX + 11} y={place.y - 24}>{placeName}</text>
            </g>}
          </svg>
        </div>
        <p className="selection" id={statusId} aria-live="polite" aria-atomic="true">
          {t('origin')} → {selected === null ? t('globalMarkets') : countryName(selected)}
        </p>
      </div>
      {/* Một hàng cờ chạy ngang liên tục: bộ nút được vẽ 2 lần để vòng lặp liền mạch; bản thứ hai chỉ để chạy, ẩn khỏi trình đọc màn hình */}
      <div className="flagbar" role="group" aria-label={t('explore')}>
        <div className="flag-track">
          {[0, 1].map((copy) => (
            <div className="flag-set" key={copy} aria-hidden={copy === 1 ? true : undefined}>
              {MAP_POINTS.map((point, i) => (
                <button
                  key={point.id} type="button" className={`flag-button${active === i ? ' active' : ''}`}
                  aria-pressed={copy === 0 ? selected === i : undefined} aria-controls={copy === 0 ? statusId : undefined}
                  tabIndex={copy === 1 ? -1 : undefined}
                  onPointerEnter={(event) => { if (event.pointerType === 'mouse') setPreview(i) }}
                  onPointerLeave={() => setPreview(null)}
                  onFocus={() => setPreview(i)} onBlur={() => setPreview(null)}
                  onClick={() => toggle(i)}
                >
                  <img src={point.flag} alt="" width={29} height={19} />
                  {locale === 'en' ? point.short : countryName(i)}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
