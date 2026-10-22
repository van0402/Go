'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

// Ảnh QC thật hiện trong khung chi tiết của từng điểm kiểm tra (public/images/quality)
// Ảnh đầu tiên của mỗi nhóm cũng là ảnh nền của thẻ
const PHOTOS = [
  // 1 Thickness: thước cặp điện tử, đồng hồ so
  ['/images/quality/thickness-1.jpg', '/images/quality/thickness-2.jpg', '/images/quality/thickness-3.jpg', '/images/quality/thickness-4.jpg'],
  // 2 Moisture: chưa có ảnh máy đo ẩm, tạm dùng ảnh kiện hàng đã đóng gói / lưu kho
  ['/images/quality/moisture-1.jpg', '/images/quality/moisture-2.jpg', '/images/quality/moisture-3.jpg'],
  // 3 Bond strength: mặt cắt cạnh thấy các lớp và đường keo
  ['/images/quality/bond-1.jpg', '/images/quality/bond-2.jpg', '/images/quality/bond-3.jpg', '/images/quality/bond-4.jpg'],
  // 4 Dimensional accuracy: thước dây, kẹp đo
  ['/images/quality/dimension-1.jpg', '/images/quality/dimension-2.jpg', '/images/quality/dimension-3.jpg'],
  // 5 Surface quality: mặt ván phẳng, vân mặt
  ['/images/quality/surface-1.jpg', '/images/quality/surface-2.jpg', '/images/quality/surface-3.jpg'],
]
const CARD_IMAGES = PHOTOS.map((p) => p[0])

// Các mục chi tiết: mục nào chưa có dữ liệu trong file ngôn ngữ thì tự ẩn
const FIELD_KEYS = ['inspect', 'stage', 'method', 'equipment', 'criteria', 'frequency'] as const

type Item = {
  label: string
  note: string
  desc?: string
  inspect?: string
  stage?: string
  method?: string
  equipment?: string
  criteria?: string
  frequency?: string
  evidence?: string[]
}

export function QualityGrid() {
  const t = useTranslations('home.quality')
  const items = t.raw('items') as Item[]
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastTrigger = useRef<HTMLElement | null>(null)

  function close() {
    setOpen(null)
    lastTrigger.current?.focus()
  }

  // Khung chi tiết: Esc để đóng, khóa cuộn trang, đưa focus vào nút đóng
  useEffect(() => {
    if (open === null) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const current = open !== null ? items[open] : null

  return (
    <section id="quality">
      <div className="container">
        <div className="section-head qa-head reveal">
          <div>
            <div className="section-kicker">{t('kicker')}</div>
            <h2>{t('title')}</h2>
            <p className="quality-lead">{t('lead')}</p>
          </div>
          <Link href="/quality" className="qa-cta">{t('explore')} →</Link>
        </div>

        {/* thanh tiến trình 5 điểm */}
        <div className="qa-track reveal" aria-hidden="true">
          {items.map((it, k) => (
            <i key={it.label} className={k <= active ? 'on' : ''}>{k + 1}</i>
          ))}
        </div>

        {/* 5 thẻ: rê chuột (hoặc bấm) để mở rộng, "View checkpoint" mở khung chi tiết */}
        <div className="qa-cards reveal">
          {items.map((item, i) => (
            <div
              className={`qa-card${i === active ? ' on' : ''}`}
              key={item.label}
              style={{ backgroundImage: `url(${CARD_IMAGES[i]})` }}
              role="button"
              tabIndex={0}
              aria-expanded={i === active}
              // onMouseMove (không dùng onMouseEnter): thẻ nở ra làm dịch chuyển bố cục dưới con trỏ đứng yên
              onMouseMove={() => active !== i && setActive(i)}
              onFocus={() => setActive(i)}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setActive(i)
                }
              }}
            >
              <span className="qa-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="qa-body">
                <h3>{item.label}</h3>
                <div className="qa-sub">{item.note}</div>
                {item.desc && <p className="qa-desc">{item.desc}</p>}
                <button
                  type="button"
                  className="qa-more"
                  onClick={(e) => {
                    e.stopPropagation()
                    lastTrigger.current = e.currentTarget
                    setOpen(i)
                  }}
                >
                  {t('viewCheckpoint')} →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* dải kêu gọi hỏi tài liệu */}
        <div className="qa-strip reveal">
          <div>
            <strong>{t('strip.title')}</strong>
            <span>{t('strip.text')}</span>
          </div>
          <Link href="/quality#documents" className="qa-cta">{t('strip.cta')} →</Link>
        </div>
      </div>

      {/* khung chi tiết trượt từ bên phải */}
      {open !== null && current && (
        <>
          <div className="qa-overlay" onClick={close} />
          <aside className="qa-drawer" role="dialog" aria-modal="true" aria-label={current.label}>
            <div className="qa-dh">
              <div>
                <small>{t('drawer.kicker')} {String(open + 1).padStart(2, '0')}</small>
                <h3>{current.label}</h3>
              </div>
              <button ref={closeRef} type="button" className="qa-x" onClick={close} aria-label={t('drawer.close')}>×</button>
            </div>

            <div className="qa-db">
              {current.desc && <p className="qa-dtext">{current.desc}</p>}

              <div className="qa-dg">
                {FIELD_KEYS.filter((k) => current[k]).map((k) => (
                  <div className="qa-d" key={k}>
                    <small>{t(`fields.${k}`)}</small>
                    <strong>{current[k]}</strong>
                  </div>
                ))}
              </div>

              {current.evidence && current.evidence.length > 0 && (
                <div className="qa-ev">
                  <h4>{t('drawer.evidence')}</h4>
                  <ul>{current.evidence.map((e) => <li key={e}>{e}</li>)}</ul>
                </div>
              )}

              <h4 className="qa-ph-title">{t('drawer.photos')}</h4>
              <div className="qa-photos">
                {PHOTOS[open].map((src) => (
                  <img key={src} src={src} alt="" loading="lazy" />
                ))}
              </div>

              <div className="qa-actions">
                <Link href="/contact#quote" className="qa-btn p">{t('drawer.request')}</Link>
                <Link href="/quality#checkpoints" className="qa-btn g">{t('drawer.full')} →</Link>
              </div>
            </div>
          </aside>
        </>
      )}
    </section>
  )
}
