import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { HtplyNews } from '@/components/HtplyNews/HtplyNews'

type Props = {
  params: Promise<{ locale: 'en' | 'fr' | 'es' }>
  searchParams: Promise<{ category?: string; q?: string }>
}

export default async function Page({ params, searchParams }: Props) {
  const { locale } = await params
  const { category, q } = await searchParams
  const payload = await getPayload({ config: configPromise })

  // Local API bỏ qua phân quyền, nên phải tự lọc chỉ lấy bài đã Publish
  const { docs } = await payload.find({
    collection: 'posts',
    locale,
    fallbackLocale: 'en',
    depth: 1,
    limit: 100,
    sort: '-publishedAt',
    where: { _status: { equals: 'published' } },
  })

  return <HtplyNews posts={docs} locale={locale} category={category} q={q} />
}