'use client'

import { useEffect, useRef } from 'react'

export function useScrollShrink<T extends HTMLElement>(distance = 450, minScale = 0.65) {
  const ref = useRef<T>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let raf = 0
    const update = () => {
      raf = 0
      const progress = Math.max(0, Math.min(1, window.scrollY / distance))
      const scale = 1 - progress * (1 - minScale)
      const opacity = 1 - progress
      el.style.setProperty('--scroll-scale', `${scale}`)
      el.style.setProperty('--scroll-opacity', `${opacity}`)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [distance, minScale])

  return ref
}
