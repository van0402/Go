import type { Metadata } from 'next'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import { toProductDetail } from '@/utilities/toProductDetail'
import { HtplyProductDetail } from '@/components/HtplyProductDetail/HtplyProductDetail'

type Locale = 'en' | 'fr' | 'es'
type Args = { params: Promise<{ locale: Locale; slug: string }> }

export function generateStaticParams() {
  return []
}

// Chỉ lấy sản phẩm đã Publish trong admin; không có thì 404 (không còn dữ liệu dự phòng trong code)
const getProductDoc = cache(async (slug: string, locale: Locale) => {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'products',
    locale,
    fallbackLocale: 'en',
    depth: 2,
    limit: 1,
    pagination: false,
    where: { and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }] },
  })
  return res.docs[0] || null
})

export default async function Page({ params }: Args) {
  const { locale, slug } = await params
  const doc = await getProductDoc(decodeURIComponent(slug), locale)
  if (!doc) notFound()

  const product = toProductDetail(doc)
  // chỉ hiện sản phẩm liên quan đã Publish
  const related = (doc.related || [])
    .filter((r) => typeof r === 'object' && r._status === 'published')
    .map((r) => toProductDetail(r as typeof doc))

  return <HtplyProductDetail product={product} related={related} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale, slug } = await params
  const doc = await getProductDoc(decodeURIComponent(slug), locale)
  if (!doc) return {}
  return {
    title: `${doc.name} | HTPLY Vietnam`,
    description: doc.sub || undefined,
  }
}
