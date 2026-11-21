import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { getServerSideURL } from './getURL'

const LOCALES = ['en', 'fr', 'es'] as const

type MetaArgs = {
  locale: string
  path: string // '' cho trang chủ, '/about', '/products/abc'…
  title: string // đã gồm cả "| HTPLY Vietnam"
  description?: string
  image?: string // đường dẫn ảnh (có hoặc không có domain)
}

// Title, mô tả, ảnh chia sẻ và khai báo 3 ngôn ngữ (hreflang) cho Google
export function buildMeta({ locale, path, title, description, image }: MetaArgs): Metadata {
  const base = getServerSideURL()
  const url = `${base}/${locale}${path}`
  const img = image ? (image.startsWith('http') ? image : base + image) : `${base}/og-default.jpg`
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, `${base}/${l}${path}`])),
        'x-default': `${base}/en${path}`,
      },
    },
    openGraph: {
      type: 'website',
      siteName: 'HTPLY Vietnam',
      title,
      description,
      url,
      images: [{ url: img, width: 1200, height: 630 }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [img] },
  }
}

// Trang tĩnh: lấy chữ trong messages/<ngôn ngữ>.json, mục "seo"
export async function staticMeta(locale: string, key: string, path: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `seo.${key}` })
  return buildMeta({ locale, path, title: t('title'), description: t('description') })
}

// Một trang trong sitemap, kèm đủ 3 bản ngôn ngữ
export const sitemapEntries = (path: string, lastmod: string) => {
  const base = getServerSideURL()
  const refs = [
    ...LOCALES.map((l) => ({ href: `${base}/${l}${path}`, hreflang: l, hrefIsAbsolute: true })),
    { href: `${base}/en${path}`, hreflang: 'x-default', hrefIsAbsolute: true },
  ]
  return LOCALES.map((l) => ({ loc: `${base}/${l}${path}`, lastmod, alternateRefs: refs }))
}
