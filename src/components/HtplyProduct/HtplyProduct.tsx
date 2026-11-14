'use client'

import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import './HtplyProduct.css'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
import { ProductsFx } from './ProductsFx'
import type { ProductCard } from '@/utilities/getProducts'

type View = 'showcase' | 'grid'
const VIEW_KEY = 'htply-products-view'
const LAYERS = Array.from({ length: 8 }, (_, i) => i)

// Tiêu đề tách từng từ để hiệu ứng trượt lên từ sau tấm che (xem ProductsFx.tsx)
function Split({ text, as: Tag = 'h2' }: { text: string; as?: 'h1' | 'h2' | 'h3' }) {
  const words = text.split(' ').filter(Boolean)
  return (
    <Tag className="ps-split" aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="ps-w"><span>{w}</span></span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

export function HtplyProduct({ products }: { products: ProductCard[] }) {
  const [view, setView] = useState<View>('showcase')
  const tp = useTranslations('productsPage')

  const viewRef = useRef<HTMLDivElement>(null)
  const vpillRef = useRef<HTMLSpanElement>(null)

  // Không còn lọc theo danh mục: trang hiện các sản phẩm lớn, loại con nằm dưới mỗi sản phẩm lớn
  const shown = products

  // Nhớ kiểu hiển thị khách đã chọn (mặc định Showcase; đọc sau khi tải để không lệch với bản render ở server)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(VIEW_KEY)
      if (saved === 'grid' || saved === 'showcase') setView(saved)
    } catch {}
  }, [])

  function chooseView(v: View) {
    if (v === view) return
    setView(v)
    try { localStorage.setItem(VIEW_KEY, v) } catch {}
    // Cuộn về đầu danh sách để khách thấy ngay kiểu mới
    const hero = document.querySelector<HTMLElement>('.ps-hero')
    if (hero) requestAnimationFrame(() => window.scrollTo({ top: Math.max(0, hero.offsetHeight - 70), behavior: 'smooth' }))
  }

  // Vạch trượt dưới nút kiểu hiển thị đang chọn
  useLayoutEffect(() => {
    const run = () => {
      const on = viewRef.current?.querySelector<HTMLElement>('[aria-pressed="true"]')
      const pill = vpillRef.current
      if (!on || !pill) return
      pill.style.left = `${on.offsetLeft}px`
      pill.style.width = `${on.offsetWidth}px`
    }
    run()
    window.addEventListener('resize', run)
    document.fonts?.ready.then(run)
    return () => window.removeEventListener('resize', run)
  }, [view])

  const n = shown.length
  const countText = n === 1 ? tp('resultOne', { count: n }) : tp('resultMany', { count: n })

  const hero = (
    <section className="ps-hero">
      <div className="ps-deco" aria-hidden="true">
        <div className="ps-plane">
          {LAYERS.map((i) => (
            <i key={i} className={`ps-lay ${i % 2 ? 'g2' : 'g1'}${i === 7 ? ' cap' : ''}`} style={{ '--i': i, '--k': (i / 7).toFixed(2) } as React.CSSProperties} />
          ))}
        </div>
      </div>
      <div className="ps-wrap">
        <div className="ps-kicker">01 · Product Catalogue</div>
        <Split text={tp('heroTitle')} as="h1" />
        <p className="ps-sub" data-fade>{tp('heroSub')}</p>
        {products.length > 0 && (
          <div className="ps-filters" data-fade>
            <span />
            <div className="ps-right">
              <div className="ps-count">{countText}</div>
              <div className="ps-view" role="group" aria-label={tp('viewLabel')} ref={viewRef}>
                <span className="ps-vpill" ref={vpillRef} />
                <button type="button" className="ps-vbtn" aria-pressed={view === 'showcase'} onClick={() => chooseView('showcase')}>
                  <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="3" width="7" height="6" rx="1.5" /><path d="M12 4.5h6M12 8h4" /><rect x="11" y="11.5" width="7" height="5.5" rx="1.5" /><path d="M2 13h6M2 16.5h4" /></svg>
                  <span>{tp('viewShowcase')}</span>
                </button>
                <button type="button" className="ps-vbtn" aria-pressed={view === 'grid'} onClick={() => chooseView('grid')}>
                  <svg viewBox="0 0 20 20" aria-hidden="true"><rect x="2.5" y="2.5" width="6" height="6" rx="1.5" /><rect x="11.5" y="2.5" width="6" height="6" rx="1.5" /><rect x="2.5" y="11.5" width="6" height="6" rx="1.5" /><rect x="11.5" y="11.5" width="6" height="6" rx="1.5" /></svg>
                  <span>{tp('viewGrid')}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )

  return (
    <main className="htply-products-page">
      <ProductsFx listKey={`${view}|${products.length}`} />
      <Nav />
      {hero}

      <div className="ps-list">
        {view === 'showcase' ? (
          shown.map((p, i) => {
            const desc = p.desc || p.tagline
            return (
              <section className={`ps-row ${i % 2 ? 'flip even' : 'odd'}`} key={p.slug}>
                <div className="ps-big" aria-hidden="true">{String(i + 1).padStart(2, '0')}</div>
                <div className="ps-wrap ps-row-in">
                  <div className="ps-vis">
                    <div className="ps-frame ps-wipe"><img src={p.image} alt={p.name} loading="lazy" /></div>
                  </div>
                  <div className="ps-info">
                    <div className="ps-num" data-fade>{String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}</div>
                    <Split text={p.name} />
                    {desc && <p data-fade>{desc}</p>}
                    <div className="ps-btns" data-fade>
                      <Link href={`/products/${p.slug}`} className="ps-btn dark">{tp('explore', { name: p.name })} <i>→</i></Link>
                      <Link href="/contact#quote" className="ps-btn line">{tp('helpCta')}</Link>
                    </div>
                  </div>
                </div>
                {p.kids.length > 0 && (
                  <div className="ps-wrap ps-kids">
                    <div className="ps-kids-h"><span>{tp('types', { count: p.kids.length })}</span></div>
                    <div className="ps-kids-g">
                      {p.kids.map((k, j) => (
                        <Link href={`/products/${k.slug}`} className="ps-kid" key={k.slug}>
                          <img src={k.image} alt={k.name} loading="lazy" />
                          <span className="ps-kn">{String(j + 1).padStart(2, '0')}</span>
                          <span className="ps-ka" aria-hidden="true">→</span>
                          <span className="ps-ko">
                            <b>{k.name}</b>
                            {(k.tagline || k.desc) && <small>{k.tagline || k.desc}</small>}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )
          })
        ) : (
          <section className="ps-gridview">
            <div className="ps-wrap">
              <div className="ps-cards">
                {shown.map((p, i) => (
                  <Link href={`/products/${p.slug}`} className="ps-card" key={p.slug} style={{ '--d': `${i * 0.07}s` } as React.CSSProperties}>
                    <div className="ps-pic">
                      <img src={p.image} alt={p.name} loading="lazy" />
                      {p.tags[0] && <span className="ps-chip">{p.tags[0]}</span>}
                    </div>
                    <div className="ps-bd">
                      <h3>{p.name}</h3>
                      {(p.desc || p.tagline) && <p>{p.desc || p.tagline}</p>}
                      {p.kids.length > 0 && <div className="ps-subs">{p.kids.map((k) => <span key={k.slug}>{k.name}</span>)}</div>}
                      <span className="ps-go">{tp('explore', { name: p.name })} <i>→</i></span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <section className="ps-help">
        <div className="ps-wrap ps-help-in">
          <div>
            <Split text={tp('helpTitle')} as="h3" />
            <p data-fade>{tp('helpText')}</p>
          </div>
          <Link href="/contact#quote" className="ps-btn dark" data-fade>{tp('helpCta')} <i>→</i></Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
