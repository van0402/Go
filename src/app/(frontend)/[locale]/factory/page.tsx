import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { HtplyFactory, type FactoryData } from '@/components/factory/HtplyFactory'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import type { Media } from '@/payload-types'

// Ô upload trả về object Media (đã populate) hoặc chỉ id: chỉ lấy URL khi có object
const urlOf = (m: number | Media | null | undefined) =>
  m && typeof m === 'object' ? getMediaUrl(m.url, m.updatedAt) : ''

export default async function Page({ params }: { params: Promise<{ locale: 'en' | 'fr' | 'es' }> }) {
  const { locale } = await params
  const payload = await getPayload({ config: configPromise })
  // fallbackLocale: false -> bản FR/ES chưa dịch thì để trống, trang tự dùng chữ mặc định của ngôn ngữ đó
  const g = await payload.findGlobal({ slug: 'factory-page', locale, fallbackLocale: false, depth: 1 })

  const data: FactoryData = {
    heroTitle: g.heroTitle || '',
    heroText: g.heroText || '',
    heroImage: urlOf(g.heroImage),
    overviewTitle: g.overviewTitle || '',
    overviewText1: g.overviewText1 || '',
    overviewText2: g.overviewText2 || '',
    photos: (g.photos ?? []).map((p) => ({ src: urlOf(p.image), caption: p.caption || '' })),
    badgeValue: g.badgeValue || '',
    badgeLabel: g.badgeLabel || '',
    flowTitle: g.flowTitle || '',
    processText: g.processText || '',
    video: urlOf(g.video),
    videoPoster: urlOf(g.videoPoster),
    videoLabel: g.videoLabel || '',
    videoTitle: g.videoTitle || '',
    videoDuration: g.videoDuration || '',
  }

  return <HtplyFactory data={data} />
}
