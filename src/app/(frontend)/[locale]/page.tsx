import { HtplyDemo } from '@/components/Htply'
import { getProductCards } from '@/utilities/getProducts'

export default async function Page({ params }: { params: Promise<{ locale: 'en' | 'fr' | 'es' }> }) {
  const { locale } = await params
  const products = await getProductCards(locale, { homeOnly: true })
  return <HtplyDemo products={products} />
}