import type { Metadata } from 'next'
import { staticMeta } from '@/utilities/seo'
import { HtplyProduct } from '@/components/HtplyProduct/HtplyProduct'
import { getProductCards } from '@/utilities/getProducts'

export default async function Page({ params }: { params: Promise<{ locale: 'en' | 'fr' | 'es' }> }) {
  const { locale } = await params
  const products = await getProductCards(locale)
  return <HtplyProduct products={products} />
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return staticMeta(locale, 'products', '/products')
}
