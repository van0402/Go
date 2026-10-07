import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
import RichText from '@/components/RichText'
import type { Post, Media } from '@/payload-types'
import './HtplyNewsPost.css'

type Props = { post: Post; locale: string }

export async function HtplyNewsPost({ post, locale }: Props) {
  const t = await getTranslations('newsPost')
  const base = process.env.NEXT_PUBLIC_SERVER_URL || ''
  const url = `${base}/${locale}/news/${post.slug}`

  const cats = (post.categories || []).filter((c) => typeof c === 'object')
  const hero = typeof post.heroImage === 'object' ? (post.heroImage as Media) : null
  const related = (post.relatedPosts || []).filter(
    (p): p is Post => typeof p === 'object' && p._status === 'published',
  )


  return (
    <main className="htply-newspost-page">
      <Nav />

      <header className="np-hero np-container">
        <Link href="/news" className="np-back">← {t('back')}</Link>
        <h1>{post.title}</h1>
        {post.excerpt && <p>{post.excerpt}</p>}
      </header>

      {hero?.url && (
        <div className="np-container">
          <div className="np-cover">
            <Image src={hero.url} alt={hero.alt || post.title} fill priority quality={100} sizes="1180px" />
          </div>
        </div>
      )}

      <div className="np-container np-layout">
        <article className="np-content">
          <RichText data={post.content} enableGutter={false} />
        </article>

       
      </div>

      {related.length > 0 && (
        <section className="np-container np-related">
          <h2>{t('related')}</h2>
          <div className="np-related-grid">
            {related.map((p) => (
              <Link key={p.id} href={`/news/${p.slug}`} className="np-rel">
                <b>{p.title}</b>
                {p.excerpt && <span>{p.excerpt}</span>}
              </Link>
            ))}
          </div>
        </section>
      )}

      <SiteFooter />
    </main>
  )
}