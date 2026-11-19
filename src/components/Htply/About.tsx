'use client'

import { useTranslations } from 'next-intl'
import { SplitTitle } from './SplitTitle'
import { SectionStack } from './SectionStack'
import type { HomeHero } from '@/payload-types'

// Chữ do admin nhập ở global "Home · Hero"; ô nào để trống thì dùng chữ mặc định trong messages
export function About({ hero }: { hero?: HomeHero | null }) {
  const t = useTranslations('home.about')

  return (
    <section id="about" className="dz-sec dz-about">
      <SectionStack side="l" />
      <SectionStack side="r" />
      <div className="dz-wrap dz-about-grid">
        <div className="dz-about-txt">
          <div>
            <h2 className="dz-kicker" data-fade>{hero?.aboutKicker || 'About HTPLY'}</h2>
            <SplitTitle as="h3" text={hero?.aboutTitle || t('title')} />
          </div>
          <p className="dz-lead" data-fade>{hero?.aboutIntro || t('intro')}</p>
        </div>

        <div className="dz-vis">
          <div className="dz-main dz-wipe">
            <img src="/images/home/factory.jpg" alt="HTPLY factory" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  )
}
