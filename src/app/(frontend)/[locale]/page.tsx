import type { Metadata } from 'next'
import { staticMeta } from '@/utilities/seo'
import { HtplyDemo } from '@/components/Htply'
import { getProductCards } from '@/utilities/getProducts'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function Page({ params }: { params: Promise<{ locale: 'en' | 'fr' | 'es' }> }) {
  const { locale } = await params
  const products = await getProductCards(locale, { homeOnly: true })

  // Chữ phần đầu trang Home do admin nhập (global "home-hero"); ô nào trống thì Hero dùng chữ mặc định trong messages
  const payload = await getPayload({ config: configPromise })
  const hero = await payload.findGlobal({ slug: 'home-hero', locale, fallbackLocale: false })
  // Chữ phần Core values do admin nhập ở global "Home · Core values"
  const coreValues = await payload.findGlobal({ slug: 'home-core-values', locale, fallbackLocale: false })

  return <HtplyDemo products={products} hero={hero} coreValues={coreValues} />
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return staticMeta(locale, 'home', '')
}
