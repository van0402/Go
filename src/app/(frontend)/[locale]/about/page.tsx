import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HtplyAbout } from '@/components/HtplyAbout/HtplyAbout'
import countries from 'i18n-iso-countries'

export default async function Page({ params }: { params: Promise<{ locale: 'en' | 'fr' | 'es' }> }) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })
  const about = await payload.findGlobal({ slug: 'about-page', locale, fallbackLocale: false })
    const markets = (about.markets ?? []).flatMap((m) => {
    const code = m.country ? countries.numericToAlpha2(m.country) : undefined
    return m.country && code ? [{ id: m.country, code }] : []
  })
  return <HtplyAbout data={about} markets={markets} />
}