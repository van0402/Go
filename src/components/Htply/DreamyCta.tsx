'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { SplitTitle } from './SplitTitle'

// Dải Picton đặc ở cuối trang: điểm sáng duy nhất sau chuỗi mục navy
export function DreamyCta() {
  const t = useTranslations('home.export.cta')

  return (
    <section className="dz-cta">
      <div className="dz-wrap dz-cta-in">
        <div>
          <SplitTitle text={t('title')} as="h3" />
          <p data-fade>{t('text')}</p>
        </div>
        <Link href="/contact#quote" className="dz-btn dark" data-fade>
          {t('button')} <i>→</i>
        </Link>
      </div>
    </section>
  )
}
