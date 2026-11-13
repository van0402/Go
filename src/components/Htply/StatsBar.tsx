'use client'

import { useTranslations } from 'next-intl'
import { CountUp } from './CountUp'

type Stat = { value: string; label: string }

// "5,000 m²" -> số 5000 + hậu tố "m²"; "30 days" -> 30 + "days"; "80" -> 80
function parse(v: string) {
  const n = parseInt(v.replace(/[^\d]/g, ''), 10)
  const suffix = v.replace(/^[\d\s,. ]+/, '').trim()
  return { n: Number.isFinite(n) ? n : 0, suffix }
}

export function StatsBar() {
  const tf = useTranslations('home.factory')
  const ta = useTranslations('home.about')
  const stats = tf.raw('stats') as Stat[]

  // Dùng 3 số trong khối Factory (diện tích, công suất cung ứng, thời gian giao) + thị trường
  const items = [stats[0], stats[2], stats[3]].filter(Boolean) as Stat[]

  return (
    <div className="dz-bar">
      <div className="dz-wrap">
        <div className="dz-bar-in">
          {items.map((s) => {
            const { n, suffix } = parse(s.value)
            return (
              <div className="dz-bar-item" key={s.label}>
                <strong>
                  <CountUp end={n} />
                  {suffix ? ` ${suffix}` : ''}
                </strong>
                <span>{s.label}</span>
              </div>
            )
          })}
          <div className="dz-bar-item">
            <strong>EU · ME</strong>
            <span>{ta('stats.markets.desc')}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
