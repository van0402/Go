'use client'

import { useEffect, useState } from 'react'
import { Link } from '@/i18n/routing'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
import type { ProductDetail } from '@/data/products'
import { COMPANY_EMAIL, COMPANY_PHONE_TEXT, COMPANY_PHONE_WA } from '@/utilities/companyContact'
import './HtplyProductDetail.css'

export function HtplyProductDetail({ product, related }: { product: ProductDetail; related: ProductDetail[] }) {
  const [sel, setSel] = useState<Record<string, string>>(
    Object.fromEntries(product.options.map((o) => [o.key, o.values[0]])),
  )
  const images = product.images?.length ? product.images : [product.image]
  const [active, setActive] = useState(0)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % images.length)
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + images.length) % images.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, images.length])
  const query = new URLSearchParams({ product: product.slug, productName: product.name, ...sel }).toString()

  return (
    
    <main className="htply-pd-page">
      <Nav />
      <div className="pd-wrap">
        <div className="pd-crumb">
  <Link href="/products">Products</Link>
  {product.group && (
    <> / {product.groupSlug ? <Link href={`/products/${product.groupSlug}`}>{product.group}</Link> : product.group}</>
  )} / <b>{product.name}</b>
</div>

        <section className="pd-top">
                    <div>
            <div className="pd-gallery" onClick={() => setOpen(true)}>
              <img src={images[active]} alt={product.name} />
              <span className="pd-zoom">Click to enlarge</span>
            </div>
            {images.length > 1 && (
              <div className="pd-thumbs">
                {images.map((src, i) => (
                  <button type="button" key={src + i} className={`pd-thumb${i === active ? ' on' : ''}`} onClick={() => setActive(i)}>
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <div className="pd-sku">{[product.group, product.tagline].filter(Boolean).join(' · ')}</div>
            <h1>{product.name}</h1>
            {product.sub && <p className="pd-sub">{product.sub}</p>}

            {product.features.length > 0 && (
              <div className="pd-hl">
                <h3>Key highlights</h3>
                <ul>
                  {product.features.slice(0, 4).map((f) => (
                    <li key={f.title}>
                      <span><b>{f.title}</b>{f.text ? ` – ${f.text}` : ''}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {product.options.length > 0 && (
            <div className="pd-chips">
              {product.options.map((o) => (
                <div key={o.key}>
                  <label>{o.label}</label>
                  <div className="pd-chip-row">
                    {o.values.map((v) => (
                      <button
                        type="button"
                        key={v}
                        className={`pd-chip${sel[o.key] === v ? ' on' : ''}`}
                        onClick={() => setSel((s) => ({ ...s, [o.key]: v }))}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            )}

            <div className="pd-actions">
              <Link className="pd-btn primary" href={`/contact?${query}#quote`}>Request a Quote →</Link>
              <a className="pd-btn" href={COMPANY_PHONE_WA} target="_blank" rel="noreferrer">WhatsApp / Zalo</a>
            </div>
            <div className="pd-quick">
              <span><b>Tel:</b> {COMPANY_PHONE_TEXT}</span>
              <span><b>Mail:</b> {COMPANY_EMAIL}</span>
            </div>
          </div>
        </section>

        {product.description.length > 0 && (
        <section className="pd-block pd-desc">
          <h2>Product description</h2>
          <div className="pd-desc-grid">
            <div>{product.description.map((p) => (<p key={p}>{p}</p>))}</div>
            <div className="pd-desc-side">
              <b>Need a tailored quotation?</b>
              <p>Send us your dimensions, application and order quantity.</p>
              <Link href={`/contact?${query}#quote`}>Request a Quote →</Link>
            </div>
          </div>
        </section>
        )}

        {product.specs.length > 0 && (
        <section className="pd-block">
          <h2>Technical data</h2>
          <table className="pd-spec">
            <tbody>
              {product.specs.map((s) => (
                <tr key={s.label}><th>{s.label}</th><td>{s.value}</td></tr>
              ))}
            </tbody>
          </table>
        </section>
        )}

        {product.datasheet.length > 0 && (
        <section className="pd-block">
          <h2>Datasheet</h2>
          <div className={`pd-sheets${product.datasheet.length === 1 ? ' one' : ''}`}>
            {product.datasheet.map((src) => (
              <a key={src} href={src} target="_blank" rel="noreferrer">
                <img src={src} alt={`${product.name} datasheet`} loading="lazy" />
              </a>
            ))}
          </div>
        </section>
        )}

        {product.downloads.length > 0 && (
        <section className="pd-block">
          <h2>Downloads</h2>
          <div className="pd-dls">
            {product.downloads.map((d) => (
              <a key={d.url + d.label} className="pd-dl" href={d.url} target="_blank" rel="noopener noreferrer" download>
                <span className="pd-dl-ic" aria-hidden="true">{(d.url.split('?')[0].split('.').pop() || 'FILE').slice(0, 4).toUpperCase()}</span>
                <span className="pd-dl-t"><b>{d.label}</b><small>{[d.type.replace('-', ' '), d.size].filter(Boolean).join(' · ')}</small></span>
                <span className="pd-dl-go">Download ↓</span>
              </a>
            ))}
          </div>
        </section>
        )}

        {product.applications.length > 0 && (
        <section className="pd-block">
          <h2>Applications</h2>
          <div className="pd-apps">
            {product.applications.map((a) => (
              <div className="pd-app" key={a.title}>
                <h3>{a.title}</h3>
                <ul>{a.items.map((i) => <li key={i}>{i}</li>)}</ul>
              </div>
            ))}
          </div>
        </section>
        )}

        {product.faq.length > 0 && (
        <section className="pd-block">
          <h2>FAQ</h2>
          {product.faq.map((f) => (
            <details key={f.q}><summary>{f.q}</summary><p>{f.a}</p></details>
          ))}
        </section>
        )}
        {related.length > 0 && (
          <section className="pd-block">
            <h2>Related products</h2>
            <div className="pd-related">
              {related.map((r) => (
                <Link key={r.slug} href={`/products/${r.slug}`} className="pd-rel">
                  <div className="pd-rel-img"><img src={r.image} alt={r.name} /></div>
                  <div className="pd-rel-body">
                    <b>{r.name}</b>
                    {r.sub && <span>{r.sub}</span>}
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <section className="pd-quote">
          <div>
            <h3>Send us your requirements.</h3>
            <p>Tell us your dimensions, application, quantity and target market. Our team replies within one business day.</p>
          </div>
          <Link href={`/contact?${query}#quote`}>Request a Quote →</Link>
        </section>
      </div>
      <SiteFooter />
            {open && (
        <div className="pd-lightbox" onClick={() => setOpen(false)}>
          <button type="button" className="pd-lb-close">✕</button>
          {images.length > 1 && (
            <>
              <button type="button" className="pd-lb-nav prev" onClick={(e) => { e.stopPropagation(); setActive((i) => (i - 1 + images.length) % images.length) }}>‹</button>
              <button type="button" className="pd-lb-nav next" onClick={(e) => { e.stopPropagation(); setActive((i) => (i + 1) % images.length) }}>›</button>
            </>
          )}
          <img src={images[active]} alt={product.name} onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </main>
  )
}