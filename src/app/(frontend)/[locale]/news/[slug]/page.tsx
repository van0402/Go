import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import { HtplyNewsPost } from '@/components/HtplyNews/HtplyNewsPost'
import { LivePreviewListener } from '@/components/LivePreviewListener'

type Locale = 'en' | 'fr' | 'es'
type Args = { params: Promise<{ locale: Locale; slug: string }> }

export async function generateStaticParams() {
  return []
}

const queryPost = cache(async (slug: string, locale: Locale, draft: boolean) => {
  const payload = await getPayload({ config: configPromise })
  const res = await payload.find({
    collection: 'posts',
    locale,
    fallbackLocale: 'en',
    draft,
    depth: 2,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: { equals: slug },
      ...(draft ? {} : { _status: { equals: 'published' } }),
    },
  })
  return res.docs[0] || null
})

export default async function Page({ params }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { locale, slug } = await params
  const post = await queryPost(decodeURIComponent(slug), locale, draft)
  if (!post) notFound()

  return (
    <>
      {draft && <LivePreviewListener />}
      <HtplyNewsPost post={post} locale={locale} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const { locale, slug } = await params
  const post = await queryPost(decodeURIComponent(slug), locale, draft)
  if (!post) return {}
  return {
    title: post.meta?.title || post.title,
    description: post.meta?.description || post.excerpt || undefined,
  }
}