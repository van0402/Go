import { HtplyContact, type ProductChoice } from '@/components/HtplyContact/HtplyContact'
import { getProductCards } from '@/utilities/getProducts'

type Props = {
  params: Promise<{ locale: 'en' | 'fr' | 'es' }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params
  const sp = await searchParams
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)

  // Các tham số do nút Request a Quote ở trang sản phẩm gửi sang
  const reserved = new Set(['product', 'productName', 'Market'])
  const extra: Record<string, string> = {}
  for (const [k, v] of Object.entries(sp)) {
    const val = one(v)
    if (!reserved.has(k) && val) extra[k] = val
  }

  // Ô "Product of interest": các sản phẩm nhỏ (loại con) đã đăng, gom theo sản phẩm lớn.
  // Sản phẩm lớn không có loại con thì tự đứng riêng để khách vẫn chọn được.
  const cards = await getProductCards(locale)
  const products: ProductChoice[] = cards.flatMap((p) =>
    p.kids.length > 0
      ? p.kids.map((k) => ({ value: k.slug, label: k.name, group: p.name }))
      : [{ value: p.slug, label: p.name }],
  )

  return (
    <HtplyContact
      products={products}
      prefill={{
        product: one(sp.product),
        productName: one(sp.productName),
        market: one(sp.Market),
        extra,
      }}
    />
  )
}
