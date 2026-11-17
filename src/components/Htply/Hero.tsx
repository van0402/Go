'use client'

import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { useParallax } from '@/hooks/useParallax'

// Video nằm ngay trong thư mục public của code (public/videos) nên chạy giống nhau ở local và trên VPS, không cần tải lên admin.
// Video có cả âm thanh trong file, nhưng trình duyệt chỉ cho tự phát khi tắt tiếng nên banner để muted.
const HERO_VIDEO = '/videos/htply-process-21s.mp4'

// Khung hình lấy từ chính video: ảnh hiện ngay khi vào trang, video chạy đè lên nên nền không bị chớp tối → sáng
const HERO_POSTER = '/images/home/hero-poster.jpg'

export function Hero() {
  const parallaxRef = useParallax<HTMLElement>(0.12, 36)
  const t = useTranslations('home')
  // Chỉ nạp và chạy video khi khách không tắt chuyển động và không bật tiết kiệm dữ liệu; còn lại chỉ hiện ảnh
  const [playVideo, setPlayVideo] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    setPlayVideo(!reduced && !conn?.saveData)
  }, [])

  return (
    <section className="hero" ref={parallaxRef}>
      <div className="hero-bg" aria-hidden="true">
        {playVideo && (
          <video
            className="hero-bg-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={HERO_POSTER}
            tabIndex={-1}
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
        )}
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
