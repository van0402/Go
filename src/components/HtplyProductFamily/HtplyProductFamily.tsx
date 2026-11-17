'use client'

import { useMemo, useState } from 'react'
import { Link } from '@/i18n/routing'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
import type { ProductDetail, ProductDownload } from '@/data/products'
import { ProductFamilyFx } from './ProductFamilyFx'
import './HtplyProductFamily.css'

// Trang sản phẩm lớn có loại con: thông tin + các loại con (thẻ) + tài liệu tải về.
// Giao diện chữ cố định tiếng Anh như trang chi tiết sản phẩm hiện có.

const TYPE_LABEL: Record<ProductDownload['type'], string> = {
  catalogue: 'Catalogue',
  datasheet: 'Datasheet',
  'test-report': 'Test report',
  certificate: 'Certificate',
  other: 'Other',
}
const TYPE_ORDER: ProductDownload['type'][] = ['catalogue', 'datasheet', 'test-report', 'certificate', 'other']

type DocRow = ProductDownload & { of: string } // of: '' = chung cho cả nhóm, còn lại là tên loại con

function Split({ text, as: Tag = 'h2' }: { text: string; as?: 'h1' | 'h2' }) {
  const words = text.split(' ').filter(Boolean)
  return (
    <Tag className="pf-title dz-split" aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          <span className="dz-w">
            <span>{w}</span>
          </span>
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  )
}

export function HtplyProductFamily({ product, kids }: { product: ProductDetail; kids: ProductDetail[] }) {
  const images = product.images?.length ? product.images : [product.image]
  const [active, setActive] = useState(0)
  const [filter, setFilter] = useState('')

  // Tài liệu của cả nhóm và của từng loại con, sắp theo loại (catalogue → datasheet → ...)
  const docs = useMemo<DocRow[]>(() => {
    const all: DocRow[] = [
      ...product.downloads.map((d) => ({ ...d, of: '' })),
      ...kids.flatMap((k) => k.downloads.map((d) => ({ ...d, of: k.name }))),
    ]
    return all.sort((a, b) => TYPE_ORDER.indexOf(a.type) - TYPE_ORDER.indexOf(b.type))
  }, [product, kids])
  const shown = docs.filter((d) => !filter || d.of === '' || d.of === filter)
  // chip chỉ cho các loại con thật sự có tài liệu
  const filterNames = kids.filter((k) => k.downloads.length > 0).map((k) => k.name)

  const query = new URLSearchParams({ product: product.slug, productName: product.name }).toString()
  const intro = product.sub || product.description[0] || ''
  const sheetOf = (k: ProductDetail) => k.downloads.find((d) => d.type === 'datasheet') ?? k.downloads[0]

  return (
    <main className="htply-pf-page">
      <ProductFamilyFx />
      <Nav />

      <div className="pf-wrap">
        <div className="pf-crumb">
          <Link href="/products">Products</Link> / <b>{product.name}</b>
        </div>

        {/* ===== Thông tin sản phẩm lớn ===== */}
        <section className="pf-ov" id="overview">
          <div className="pf-gal" data-fade>
            {images.length > 1 && (
              <div className="pf-thumbs">
                {images.map((src, i) => (
                  <button type="button" key={src + i} className={i === active ? 'on' : ''} onClick={() => setActive(i)} aria-label={`Photo ${i + 1}`}>
                    <img src={src} alt="" />
                  </button>
                ))}
              </div>
            )}
            <div className="pf-main pf-wipe">
              <img src={images[active]} alt={product.name} data-par="24" />
              <span className="pf-tag">Main product</span>
            </div>
          </div>

          <div className="pf-info">
            <div className="pf-kick" data-fade>
              {product.tagline || 'Product group'}
            </div>
            <Split text={product.name} as="h1" />
            {intro && (
              <p className="pf-intro" data-fade>
                {intro}
              </p>
            )}
            <div className="pf-btns" data-fade>
              <Link className="pf-btn dark" href={`/contact?${query}#quote`}>
                Request a Quote <i>→</i>
              </Link>
              {docs.length > 0 && (
                <a className="pf-btn line" href="#downloads">
                  Download documents <i>↓</i>
                </a>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* ===== Thanh mục nhỏ, dính khi cuộn ===== */}
      <div className="pf-sub" id="pf-sub">
        <div className="pf-wrap pf-sub-in">
          <a href="#overview" data-spy="overview" className="on">Overview</a>
          <a href="#types" data-spy="types">Types ({kids.length})</a>
          {docs.length > 0 && (
            <a href="#downloads" data-spy="downloads">Downloads ({docs.length})</a>
          )}
        </div>
      </div>

      <div className="pf-wrap">
        {/* ===== Các loại con ===== */}
        <section className="pf-blk" id="types">
          <div className="pf-head">
            <div className="pf-kick" data-fade>
              Types · {kids.length}
            </div>
            <Split text="Choose your type." />
          </div>
          <div className="pf-kids">
            {kids.map((k, i) => {
              const sheet = sheetOf(k)
              const line = k.tagline || k.sub
              return (
                <article className="pf-kid" key={k.slug}>
                  <Link href={`/products/${k.slug}`} className="pf-kpic pf-wipe" aria-label={k.name}>
                    <img src={k.image} alt={k.name} loading="lazy" />
                    <span className="pf-kn">{String(i + 1).padStart(2, '0')}</span>
                    <span className="pf-ka" aria-hidden="true">→</span>
                  </Link>
                  <div className="pf-kbd">
                    <h3>{k.name}</h3>
                    {line && <p>{line}</p>}
                    {k.specs.length > 0 && (
                      <ul>
                        {k.specs.slice(0, 2).map((s) => (
                          <li key={s.label}>
                            <span>{s.label}</span>
                            <b>{s.value}</b>
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="pf-kgo">
                      <Link href={`/products/${k.slug}`}>Details</Link>
                      {sheet && (
                        <a href={sheet.url} target="_blank" rel="noopener noreferrer" download className="dl">
                          {TYPE_LABEL[sheet.type]} ↓
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        {/* ===== Tài liệu tải về ===== */}
        {docs.length > 0 && (
          <section className="pf-blk" id="downloads">
            <div className="pf-dlbox" data-fade>
              <div className="pf-head row">
                <div>
                  <div className="pf-kick">Downloads</div>
                  <h2 className="pf-title">Documents for this product.</h2>
                </div>
                <span className="pf-cnt">
                  {shown.length} document{shown.length === 1 ? '' : 's'}
                </span>
              </div>

              {filterNames.length > 0 && (
                <div className="pf-chips">
                  <button type="button" className={`pf-chip${filter === '' ? ' on' : ''}`} onClick={() => setFilter('')}>
                    All documents
                  </button>
                  {filterNames.map((n) => (
                    <button type="button" key={n} className={`pf-chip${filter === n ? ' on' : ''}`} onClick={() => setFilter(n)}>
                      {n}
                    </button>
                  ))}
                </div>
              )}

              <div className="pf-rows">
                {shown.map((d) => (
                  <div className="pf-row" key={d.of + d.url + d.label}>
                    <div className="pf-ic" aria-hidden="true">{(d.url.split('?')[0].split('.').pop() || 'FILE').slice(0, 4).toUpperCase()}</div>
                    <div className="pf-rt">
                      <b>{d.label}</b>
                      <small>{d.of || 'Applies to all types'}</small>
                    </div>
                    <div className="pf-rty">{TYPE_LABEL[d.type]}</div>
                    <div className="pf-rsz">{d.size}</div>
                    <a className="pf-get" href={d.url} target="_blank" rel="noopener noreferrer" download>
                      Download ↓
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      {/* ===== Dải báo giá ===== */}
      <section className="pf-cta">
        <div className="pf-wrap pf-cta-in">
          <div>
            <h3>Can&apos;t find the board you need?</h3>
            <p>Tell us your size, thickness and quantity. We reply within one business day.</p>
          </div>
          <Link className="pf-btn dark" href={`/contact?${query}#quote`}>
            Request a Quote <i>→</i>
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
