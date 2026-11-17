'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
import { FactoryFx } from './FactoryFx'
import './HtplyFactory.css'

// Video quy trình 23 giây (tải lên Media của web). Chạy local thì lấy từ VPS vì máy local không có file này.
const PROCESS_VIDEO =
  process.env.NODE_ENV === 'development'
    ? 'http://103.56.160.214:3101/api/media/file/htply-process-23s.mp4'
    : '/api/media/file/htply-process-23s.mp4'
const VIDEO_POSTER = '/images/home/hero-poster.jpg'

// Ảnh nhà xưởng (đã nén từ public/images/values/proofs), thứ tự khớp với factoryPage.captions
const PHOTOS = [
  { src: '/images/factory/hall.jpg', cls: 'p1', par: 40 },
  { src: '/images/factory/press-line.jpg', cls: 'p2 r', par: -30 },
  { src: '/images/factory/multi-press.jpg', cls: 'p3', par: 50 },
  { src: '/images/factory/veneer-floor.jpg', cls: 'p4', par: -40 },
  { src: '/images/factory/layup.jpg', cls: 'p5 r', par: 30 },
]

// Tiêu đề tách từng từ để hiệu ứng trượt lên từ sau tấm che (xem FactoryFx.tsx)
function Split({ text, as: Tag = 'h2' }: { text: string; as?: 'h1' | 'h2' }) {
  const words = text.split(' ').filter(Boolean)
  return (
    <Tag className="ft-title dz-split" aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="dz-w">
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

export function HtplyFactory() {
  const tf = useTranslations('factoryPage')
  const captions = tf.raw('captions') as string[]
  const [playing, setPlaying] = useState(false)

  return (
    <div className="htply-factory-page">
      <FactoryFx />
      <Nav />

      <main>
        {/* ===== Banner ===== */}
        <section className="ft-hero">
          <div className="ft-hero-bgw">
            <div className="ft-hero-bg" />
          </div>
          <div className="ft-wrap ft-hero-in">
            <span className="ft-pill">
              <b />
              {tf('eyebrow')}
            </span>
            <Split text={tf('hero.title')} as="h1" />
            <p className="ft-sub" data-fade>
              {tf('hero.text')}
            </p>
          </div>
        </section>

        {/* ===== 1 · Giới thiệu nhà máy ===== */}
        <section className="ft-intro">
          <span className="ft-bignum" aria-hidden="true">
            01
          </span>
          <div className="ft-wrap">
            <div className="ft-head">
              <div>
                <Split text={tf('overview.title')} />
              </div>
              <div>
                <p data-fade>{tf('overview.text1')}</p>
                <p data-fade>{tf('overview.text2')}</p>
              </div>
            </div>

            <div className="ft-collage">
              {PHOTOS.map((p, i) => (
                <div className={`ft-ph ft-wipe ${p.cls}`} key={p.src}>
                  <img src={p.src} alt={captions[i] ?? ''} data-par={p.par} loading="lazy" />
                  <span className="ft-cap">
                    <b>{String(i + 1).padStart(2, '0')}</b>
                    {captions[i]}
                  </span>
                </div>
              ))}
              <div className="ft-badge" data-fade>
                <strong>5,000 m²</strong>
                <span>{tf('badgeLabel')}</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== 2 · Quy trình sản xuất (video) ===== */}
        <section className="ft-proc">
          <span className="ft-bignum l" aria-hidden="true">
            02
          </span>
          <div className="ft-wrap">
            <div className="ft-head">
              <div>
                <Split text={tf('flow.title')} />
              </div>
              <div>
                <p data-fade>{tf('processText')}</p>
              </div>
            </div>

            <div className="ft-vstage">
              <div className={`ft-vframe${playing ? ' on' : ''}`}>
                {playing && (
                  <video src={PROCESS_VIDEO} poster={VIDEO_POSTER} controls autoPlay playsInline preload="auto" />
                )}
                <button type="button" className="ft-vposter" onClick={() => setPlaying(true)} aria-label={tf('video.play')}>
                  <span className="ft-play">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 3l16 9-16 9z" />
                    </svg>
                  </span>
                  <span className="ft-vlabel">
                    <span>
                      <small>{tf('video.label')}</small>
                      <b>{tf('video.title')}</b>
                    </span>
                    <i>0:23</i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
