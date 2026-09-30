'use client'

import { useEffect } from 'react'

export function RevealOnScroll({ scope }: { scope: string }) {
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
    document.querySelectorAll(`${scope} .reveal`).forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [scope])

  return null
}
