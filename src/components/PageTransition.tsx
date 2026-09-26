'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type Phase = 'idle' | 'closing' | 'closed' | 'opening'

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
    }, 720)
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
    const t = setTimeout(() => setPhase('idle'), 720)
    return () => clearTimeout(t)
  }, [phase])

  return (
    <div className={`page-curtain page-curtain-${phase}`} aria-hidden="true">
      <span className="page-curtain-panel" />
      <span className="page-curtain-panel" />
      <span className="page-curtain-panel" />
      <span className="page-curtain-panel" />
    </div>
  )
}
