import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
import type { Post, Media } from '@/payload-types'
import './HtplyNews.css'

type Props = { posts: Post[]; locale: string; category?: string; q?: string }

const cats = (p: Post) =>
  (p.categories || []).filter((c): c is Exclude<typeof c, number> => typeof c === 'object')

export async function HtplyNews({ posts, locale, category, q }: Props) {
  const t = await getTranslations('newsPage')

  // Danh mục chỉ lấy từ các bài đã đăng
  const catMap = new Map<string, string>()
  posts.forEach((p) => cats(p).forEach((c) => c.slug && catMap.set(c.slug, c.title)))

  const needle = q?.trim().toLowerCase()
  const list = posts.filter((p) => {
    if (category && !cats(p).some((c) => c.slug === category)) return false
    if (needle && !`${p.title} ${p.excerpt ?? ''}`.toLowerCase().includes(needle)) return false
    return true
  })

  const featured = !category && !needle ? list.find((p) => p.featured) : undefined
  const rest = featured ? list.filter((p) => p.id !== featured.id) : list
  const date = (d?: string | null) =>
    d ? new Date(d).toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' }) : ''
  const img = (p: Post) => (typeof p.heroImage === 'object' ? (p.heroImage as Media) : null)

  const Card = ({ p }: { p: Post }) => {
    const m = img(p)
    return (
      <Link href={`/news/${p.slug}`} className="n-card">
        <div className="n-card-img">{m?.url && <Image src={m.url} alt={m.alt || p.title} fill quality={100} sizes="400px" />}</div>
        <div className="n-card-body">
          <small>{[cats(p)[0]?.title, date(p.publishedAt)].filter(Boolean).join(' · ')}</small>
          <h3>{p.title}</h3>
          {p.excerpt && <p>{p.excerpt}</p>}
          <span>{t('readMore')} →</span>
        </div>
      </Link>
    )
  }

  return (
    <main className="htply-news-page">
      <Nav />
      <section className="n-hero n-container">
        <div className="n-eyebrow">{t('eyebrow')}</div>
        <h1>{t('title')}</h1>
        <p>{t('subtitle')}</p>
        <form action="" method="get" className="n-search">
          {category && <input type="hidden" name="category" value={category} />}
          <input name="q" defaultValue={q} placeholder={t('searchPlaceholder')} />
          <button type="submit">{t('searchButton')}</button>
        </form>
      </section>

      <div className="n-container">
        {catMap.size > 0 && (
          <nav className="n-filters">
            <Link href="/news" className={!category ? 'on' : ''}>{t('all')}</Link>
            {[...catMap].map(([slug, title]) => (
              <Link key={slug} href={`/news?category=${slug}`} className={category === slug ? 'on' : ''}>
                {title}
              </Link>
            ))}
          </nav>
        )}

        {posts.length === 0 && <p className="n-empty">{t('empty')}</p>}
        {posts.length > 0 && list.length === 0 && <p className="n-empty">{t('noResults')}</p>}

        {featured && (
          <div className="n-featured">
            <b>{t('featured')}</b>
            <Card p={featured} />
          </div>
        )}
        <div className="n-grid">{rest.map((p) => <Card key={p.id} p={p} />)}</div>
      </div>
      <SiteFooter />
    </main>
  )
}