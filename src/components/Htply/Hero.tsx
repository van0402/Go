'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { useParallax } from '@/hooks/useParallax'
import { useScrollShrink } from '@/hooks/useScrollShrink'

// offset = tỉ lệ so với chiều cao chữ (26px / 230px ≈ 0.11), tự co giãn theo màn hình
const LETTERS = [
  { src: '/images/h.png', alt: 'H', offset: 0, delay: 0 },
  { src: '/images/t-letter.png', alt: 'T', offset: 0.11, delay: 0.25 },
  { src: '/images/p-letter.png', alt: 'P', offset: -0.03, delay: 0.5 },
  { src: '/images/l-letter.png', alt: 'L', offset: 0.09, delay: 0.75 },
  { src: '/images/y-letter.png', alt: 'Y', offset: -0.04, delay: 1 },
]

const HERO_IMAGES = ['/images/hi.jpg', '/images/lantaikayu-biz-floor-6990002_1920.jpg']

export function Hero() {
  const parallaxRef = useParallax<HTMLElement>(0.12, 36)
  const shrinkRef = useScrollShrink<HTMLDivElement>(450, 0.65)
  const t = useTranslations('home')
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex((i) => (i + 1) % HERO_IMAGES.length)
    }, 5500)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="hero" ref={parallaxRef}>
      <div className="hero-bg">
        {HERO_IMAGES.map((src, i) => (
          <div
            key={src}
            className={`hero-bg-layer${i === bgIndex ? ' active' : ''}`}
            style={{ backgroundImage: `url(${src})` }}
          />
        ))}
      </div>

      <div className="container hero-grid">
        <div className="wordmark reveal" style={{ ['--slide-x' as string]: '-70px' }} aria-label="HTPLY">
          <div className="wordmark-scale" ref={shrinkRef}>
            <div className="halo"></div>
            {LETTERS.map((l) => (
              <div
                className="wordmark-letter"
                key={l.alt}
                                style={{
                  ['--offset' as string]: l.offset,
                  ['--delay' as string]: `${l.delay}s`,
                }}
              >
                <img src={l.src} alt={l.alt} />
              </div>
            ))}
          </div>
        </div>

        <div className="reveal" style={{ ['--slide-x' as string]: '70px' }}>
          <h1>
            {t('heroTitle')}
          </h1>
        </div>
      </div>
    </section>
  )
}
