'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollPinScale() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const targetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapRef.current || !targetRef.current) return

    const ctx = gsap.context(() => {
      gsap.to(targetRef.current, {
        scale: 1.5,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapRef.current,
          start: 'top top',
          end: '+=800', // khoảng cách cuộn để chạy hết animation (px)
          scrub: true,
          pin: true,
        },
      })
    }, wrapRef)

    return () => ctx.revert()
  }, [])

  return { wrapRef, targetRef }
}