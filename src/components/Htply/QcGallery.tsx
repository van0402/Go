'use client'

import { useTranslations } from 'next-intl'

const QC_COUNT = 41

export function QcGallery() {
  const t = useTranslations('home.qc')
  const imageAlt = t('imageAlt')
  const qcImages = Array.from({ length: QC_COUNT }, (_, i) => ({
    src: `/images/qc${i + 1}.jpg`,
    alt: `${imageAlt} ${i + 1}`,
  }))

  return (
    <section className="qc-section">
      <div className="container">
        <div className="section-head reveal">
          <div>
            <div className="section-kicker">{t('kicker')}</div>
            <h2>{t('title')}</h2>
            <p>{t('desc')}</p>
          </div>
        </div>
      </div>

      <div className="qc-marquee reveal">
        <div className="qc-track">
          {[...qcImages, ...qcImages].map((img, i) => (
            <figure className="qc-item" key={`${img.src}-${i}`}>
              <span className="qc-index">{String((i % qcImages.length) + 1).padStart(2, '0')}</span>
              <img src={img.src} alt={img.alt} loading="lazy" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
