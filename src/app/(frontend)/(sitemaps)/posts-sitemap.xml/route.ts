import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { sitemapEntries } from '@/utilities/seo'

// Mỗi bài News đã Publish có đủ 3 ngôn ngữ: /en/news/..., /fr/news/..., /es/news/...
const getPostsSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const now = new Date().toISOString()
    const { docs } = await payload.find({
      collection: 'posts',
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    })
    return docs.filter((p) => p.slug).flatMap((p) => sitemapEntries(`/news/${p.slug}`, p.updatedAt || now))
  },
  ['posts-sitemap-v2'],
  { tags: ['posts-sitemap'], revalidate: 3600 },
)

export async function GET() {
  return getServerSideSitemap(await getPostsSitemap())
}
