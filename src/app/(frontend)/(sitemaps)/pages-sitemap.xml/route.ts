import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'
import { sitemapEntries } from '@/utilities/seo'

// Các trang cố định (mỗi trang có đủ 3 ngôn ngữ) + từng sản phẩm đã Publish
const STATIC_PATHS = ['', '/about', '/products', '/factory', '/quality', '/contact', '/news']

const getPagesSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const now = new Date().toISOString()
    const { docs } = await payload.find({
      collection: 'products',
      draft: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: { _status: { equals: 'published' } },
      select: { slug: true, updatedAt: true },
    })
    return [
      ...STATIC_PATHS.flatMap((p) => sitemapEntries(p, now)),
      ...docs.filter((d) => d.slug).flatMap((d) => sitemapEntries(`/products/${d.slug}`, d.updatedAt || now)),
    ]
  },
  ['pages-sitemap-v2'],
  { tags: ['pages-sitemap'], revalidate: 3600 }, // tự làm mới sau tối đa 1 giờ
)

export async function GET() {
  return getServerSideSitemap(await getPagesSitemap())
}
