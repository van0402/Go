import { HtplyProduct } from '@/components/HtplyProduct/HtplyProduct'
import { getProductCards } from '@/utilities/getProducts'

export default async function Page({ params }: { params: Promise<{ locale: 'en' | 'fr' | 'es' }> }) {
  const { locale } = await params
  const products = await getProductCards(locale)
  return <HtplyProduct products={products} />
}
