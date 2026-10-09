import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Media } from '@/payload-types'

export type ProductCard = {
  slug: string
  name: string
  category: string
  tagline: string
  desc: string
  image: string
  tags: string[]
  specs: { label: string; value: string }[]
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
  return res.docs.map((p) => {
    const first = (p.gallery || []).find((g) => typeof g === 'object') as Media | undefined
    return {
      slug: p.slug || '',
      name: p.name,
      category: typeof p.category === 'object' && p.category ? p.category.title : '',
      tagline: p.tagline || '',
      desc: p.sub || '',
      image: first?.url || '/images/hm14.jpg',
      tags: (p.tags || []).map((t) => t.tag),
      specs: (p.specs || []).slice(0, 3).map((s) => ({ label: s.label, value: s.value })),
    }
  })
}