import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media } from '@/payload-types'

export type ProductCard = {
  id: number
  parentId: number | null
  // Các loại con (sản phẩm có parent trỏ về sản phẩm này); chỉ sản phẩm lớn mới có
  kids: ProductCard[]
  slug: string
  name: string
  tagline: string
  desc: string
  image: string
  tags: string[]
  specs: { label: string; value: string }[]
}

function productPriority(product: ProductCard): number {
  const slug = product.slug.toLowerCase().replace(/[^a-z0-9]/g, '')
  const name = product.name.toLowerCase().replace(/[^a-z0-9]/g, '')
  const labels = [slug, name]
  if (labels.some((label) => label.includes('antislip'))) return 0
  if (labels.some((label) => label.includes('filmface'))) return 1
  if (slug === 'raw' || labels.some((label) => label.includes('rawply'))) return 2
  return 3
}

export async function getProductCards(
  locale: 'en' | 'fr' | 'es',
  opts: { homeOnly?: boolean } = {},
): Promise<ProductCard[]> {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'products',
    locale,
    fallbackLocale: 'en',
    depth: 1,
    limit: 100,
    pagination: false,
    sort: 'order',
    where: {
      and: [
        { _status: { equals: 'published' } },
        ...(opts.homeOnly ? [{ showOnHome: { equals: true } }] : []),
      ],
    },
  })
  const all: ProductCard[] = res.docs.map((p) => {
    const first = (p.gallery || []).find((g) => typeof g === 'object') as Media | undefined
    return {
      id: p.id,
      parentId: typeof p.parent === 'object' && p.parent ? p.parent.id : (p.parent as number | null | undefined) ?? null,
      kids: [],
      slug: p.slug || '',
      name: p.name,
      tagline: p.tagline || '',
      desc: p.sub || '',
      image: first?.url || '/images/hm14.jpg',
      // Dòng danh sách để trống trong admin thì bỏ qua
      tags: (p.tags || []).map((t) => t.tag).filter((t): t is string => Boolean(t && t.trim())),
      specs: (p.specs || [])
        .filter((s): s is { label: string; value: string; id?: string | null } => Boolean(s.label?.trim() && s.value?.trim()))
        .slice(0, 3)
        .map((s) => ({ label: s.label, value: s.value })),
    }
  })

  // Chỉ trả về sản phẩm lớn; loại con gắn vào .kids của sản phẩm cha (cha chưa publish thì con cũng không hiện)
  const kidsOf = new Map<number, ProductCard[]>()
  for (const p of all) {
    if (p.parentId) kidsOf.set(p.parentId, [...(kidsOf.get(p.parentId) ?? []), p])
  }
  return all
    .filter((p) => !p.parentId)
    .map((p) => ({ ...p, kids: kidsOf.get(p.id) ?? [] }))
    .sort((a, b) => productPriority(a) - productPriority(b))
}
