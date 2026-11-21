import type { Metadata } from 'next'
import { staticMeta } from '@/utilities/seo'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HtplyAbout } from '@/components/HtplyAbout/HtplyAbout'
import type { Milestone } from '@/components/HtplyAbout/HistorySteps'
import countries from 'i18n-iso-countries'

export default async function Page({ params }: { params: Promise<{ locale: 'en' | 'fr' | 'es' }> }) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })
  const about = await payload.findGlobal({ slug: 'about-page', locale, fallbackLocale: false })
  const markets = (about.markets ?? []).flatMap((m) => {
    const code = m.country ? countries.numericToAlpha2(m.country) : undefined
    return m.country && code ? [{ id: m.country, code }] : []
  })

  // History: ô FR/ES chưa dịch thì tạm hiện chữ tiếng Anh, để tấm ván không bị trống
  const en = locale === 'en' ? about : await payload.findGlobal({ slug: 'about-page', locale: 'en', depth: 0 })
  const milestones: Milestone[] = (about.milestones ?? []).flatMap((row) => {
    if (!row.year) return []
    const enRow = en.milestones?.find((r) => r.id === row.id)
    return [{
      year: row.year,
      title: row.title || enRow?.title || '',
      desc: row.desc || enRow?.desc || '',
      future: Boolean(row.future),
    }]
  })

  return <HtplyAbout data={about} markets={markets} milestones={milestones} />
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return staticMeta(locale, 'about', '/about')
}
