'use client'

import { useEffect } from 'react'

export function RevealOnScroll() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.htply-page .reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return null
}