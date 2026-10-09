import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { HtplyContact } from '@/components/HtplyContact/HtplyContact'

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> }

export default async function Page({ searchParams }: Props) {
  const sp = await searchParams
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)

  // Các tham số do nút Request a Quote ở trang sản phẩm gửi sang
  const reserved = new Set(['product', 'productName', 'Market'])
  const extra: Record<string, string> = {}
  for (const [k, v] of Object.entries(sp)) {
    const val = one(v)
    if (!reserved.has(k) && val) extra[k] = val
  }

  const payload = await getPayload({ config: configPromise })
  const options = await payload.findGlobal({ slug: 'contact-options' })
  return (
    <HtplyContact
      options={options}
      prefill={{
        product: one(sp.product),
        productName: one(sp.productName),
        market: one(sp.Market),
        extra,
      }}
    />
  )
}
