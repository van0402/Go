'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { useParallax } from '@/hooks/useParallax'

const HERO_VIDEO =
  process.env.NODE_ENV === 'development'
    ? 'http://103.56.160.214:3101/api/media/file/htply-process-23s.mp4'
    : '/api/media/file/htply-process-23s.mp4'

export function Hero() {
  const parallaxRef = useParallax<HTMLElement>(0.12, 36)
  const t = useTranslations('home')

  return (
    <section className="hero" ref={parallaxRef}>
      <div className="hero-bg" aria-hidden="true">
        <video
          className="hero-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/home/hero.jpg"
          tabIndex={-1}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>
      </div>

      <div className="container hero-grid">
        <div className="hero-copy reveal" style={{ ['--slide-x' as string]: '-24px' }}>
          <p className="hero-kicker">{t('heroKicker')}</p>
          <h1>
            {t('heroTitle')}
            {' '}
            {t('heroTitleSecondLine')}
          </h1>
          <div className="hero-cta">
            <Link href="/contact#quote" className="hero-cta-primary">
              {t('heroQuote')} <span aria-hidden="true">→</span>
            </Link>
            <Link href="/products" className="hero-cta-secondary">
              {t('heroProducts')} <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
