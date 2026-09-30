'use client'

import { useEffect, useRef } from 'react'

export function RevealOnScroll() {
  const direction = useRef<'up' | 'down'>('down')

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false
    const onScroll = () => {
      if (ticking) return
      ticking = true
      requestAnimationFrame(() => {
        const y = window.scrollY
        direction.current = y < lastY ? 'up' : 'down'
        lastY = y
        ticking = false
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
          } else if (direction.current === 'up') {
            entry.target.classList.remove('show')
          }
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.htply-page .reveal').forEach((el) => io.observe(el))
    return () => {
      window.removeEventListener('scroll', onScroll)
      io.disconnect()
    }
  }, [])

  return null
}