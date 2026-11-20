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

// Dữ liệu admin nhập ở global "Factory page". Chuỗi rỗng = dùng mặc định (messages / ảnh có sẵn).
export type FactoryData = {
  heroTitle: string
  heroText: string
  heroImage: string
  overviewTitle: string
  overviewText1: string
  overviewText2: string
  photos: { src: string; caption: string }[]
  badgeValue: string
  badgeLabel: string
  flowTitle: string
  processText: string
  video: string
  videoPoster: string
  videoLabel: string
  videoTitle: string
  videoDuration: string
}

export function HtplyFactory({ data }: { data?: FactoryData }) {
  const tf = useTranslations('factoryPage')
  const defaultCaptions = tf.raw('captions') as string[]
  const [playing, setPlaying] = useState(false)

  // Ảnh collage: admin có nhập danh sách thì dùng (tối đa 5, giữ vị trí bố cục p1..p5);
  // dòng nào thiếu ảnh/chú thích thì lấy ảnh/chú thích mặc định ở cùng vị trí
  const custom = data?.photos ?? []
  const photos = (custom.length ? custom.slice(0, PHOTOS.length) : PHOTOS.map(() => ({ src: '', caption: '' }))).map(
    (p, i) => ({ ...PHOTOS[i], src: p.src || PHOTOS[i].src, caption: p.caption || defaultCaptions[i] || '' }),
  )
  const video = data?.video || PROCESS_VIDEO
  const poster = data?.videoPoster || VIDEO_POSTER

  return (
    <div className="htply-factory-page">
      <FactoryFx />
      <Nav />

      <main>
        {/* ===== Banner ===== */}
        <section className="ft-hero">
          <div className="ft-hero-bgw">
            <div
              className="ft-hero-bg"
              style={data?.heroImage ? { backgroundImage: `url("${data.heroImage}")` } : undefined}
            />
          </div>
          <div className="ft-wrap ft-hero-in">
            <Split text={data?.heroTitle || tf('hero.title')} as="h1" />
            <p className="ft-sub" data-fade>
              {data?.heroText || tf('hero.text')}
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
                <Split text={data?.overviewTitle || tf('overview.title')} />
              </div>
              <div>
                <p data-fade>{data?.overviewText1 || tf('overview.text1')}</p>
                <p data-fade>{data?.overviewText2 || tf('overview.text2')}</p>
              </div>
            </div>

            <div className="ft-collage">
              {photos.map((p, i) => (
                <div className={`ft-ph ft-wipe ${p.cls}`} key={i}>
                  <img src={p.src} alt={p.caption} data-par={p.par} loading="lazy" />
                  <span className="ft-cap">
                    <b>{String(i + 1).padStart(2, '0')}</b>
                    {p.caption}
                  </span>
                </div>
              ))}
              <div className="ft-badge" data-fade>
                <strong>{data?.badgeValue || '5,000 m²'}</strong>
                <span>{data?.badgeLabel || tf('badgeLabel')}</span>
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
                <Split text={data?.flowTitle || tf('flow.title')} />
              </div>
              <div>
                <p data-fade>{data?.processText || tf('processText')}</p>
              </div>
            </div>

            <div className="ft-vstage">
              <div className={`ft-vframe${playing ? ' on' : ''}`}>
                {playing && (
                  <video src={video} poster={poster} controls autoPlay playsInline preload="auto" />
                )}
                <button type="button" className="ft-vposter" onClick={() => setPlaying(true)} aria-label={tf('video.play')}>
                  <span className="ft-play">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M5 3l16 9-16 9z" />
                    </svg>
                  </span>
                  <span className="ft-vlabel">
                    <span>
                      <small>{data?.videoLabel || tf('video.label')}</small>
                      <b>{data?.videoTitle || tf('video.title')}</b>
                    </span>
                    <i>{data?.videoDuration || '0:23'}</i>
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
