import type { Metadata } from 'next'
import { staticMeta } from '@/utilities/seo'
import { HtplyQuality } from '@/components/HtplyQuality/HtplyQuality'

export default function Page() {
  return <HtplyQuality />
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  return staticMeta(locale, 'quality', '/quality')
}
