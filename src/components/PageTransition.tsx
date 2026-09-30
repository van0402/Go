'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type Phase = 'idle' | 'closing' | 'closed' | 'opening'

function spiralPath(turns = 5.6, points = 300, phase = 0, radialOffset = 0) {
  const cx = 500
  const cy = 500
  const maxR = 455
  let d = ''
  for (let i = 0; i < points; i++) {
    const t = i / (points - 1)
    const angle = phase + t * turns * Math.PI * 2
    const eased = Math.pow(t, 1.02)
    const r = 18 + eased * (maxR + radialOffset)
    const wobble = Math.sin(angle * 1.45) * 3.2 + Math.sin(angle * 0.47) * 2.1
    const rr = r + wobble
    const x = cx + Math.cos(angle) * rr
    const y = cy + Math.sin(angle) * rr
    d += (i === 0 ? 'M' : 'L') + x.toFixed(2) + ' ' + y.toFixed(2) + ' '
  }
  return d
}

const SPIRAL_PATHS = [
  spiralPath(5.7, 300, 0, 0),
  spiralPath(5.45, 300, 0.32, -28),
  spiralPath(5.2, 300, 0.66, -54),
  spiralPath(4.95, 300, 0.94, -78),
]

export function PageTransition() {
  const router = useRouter()
  const pathname = usePathname()
  const [phase, setPhase] = useState<Phase>('idle')
  const pendingHref = useRef<string | null>(null)
  const prevPathname = useRef(pathname)

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const link = (e.target as HTMLElement)?.closest('a')
      if (!link) return
      if (link.target === '_blank' || link.hasAttribute('download')) return

      const href = link.getAttribute('href')
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) {
        return
      }

      let url: URL
      try {
        url = new URL(href, window.location.href)
      } catch {
        return
      }
      if (url.origin !== window.location.origin) return
      if (url.pathname === pathname) return

      e.preventDefault()
      pendingHref.current = href
      setPhase('closing')
    }

    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [pathname, router])

  useEffect(() => {
    if (phase !== 'closing') return
    const t = setTimeout(() => {
      setPhase('closed')
      if (pendingHref.current) {
        router.push(pendingHref.current)
        pendingHref.current = null
      }
    }, 750)
    return () => clearTimeout(t)
  }, [phase, router])

  useEffect(() => {
    if (pathname === prevPathname.current) return
    prevPathname.current = pathname
    if (phase === 'closed') {
      const t = setTimeout(() => setPhase('opening'), 90)
      return () => clearTimeout(t)
    }
  }, [pathname, phase])

  useEffect(() => {
    if (phase !== 'opening') return
    const t = setTimeout(() => setPhase('idle'), 750)
    return () => clearTimeout(t)
  }, [phase])

  return (
    <div className={`spiral-overlay spiral-overlay-${phase}`} aria-hidden="true">
      <div className="spiral-stage">
        <svg className="spiral-svg" viewBox="0 0 1000 1000">
          {SPIRAL_PATHS.map((d, i) => (
            <path key={i} d={d} pathLength={1} className={`spiral-path spiral-path-${i + 1}`} />
          ))}
        </svg>
        <div className="spiral-dot" />
      </div>
    </div>
  )
}
