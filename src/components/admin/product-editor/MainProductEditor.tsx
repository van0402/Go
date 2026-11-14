'use client'
import React, { useRef, useState } from 'react'
import type { EditorImage } from './ProductEditor'

export type MainProduct = {
  id?: number
  status: 'draft' | 'published'
  slug: string
  name: string
  sub: string
  image: EditorImage | null
  showOnHome: boolean
  order: number
}

type Props = {
  initial: MainProduct | null
  notFound: boolean
  mains: { id: number; name: string }[] // các sản phẩm lớn đã có, để mở lại sửa
}

/**
 * Trang tạo sản phẩm lớn (Anti Slip, Film Faced, Raw...): chỉ vài ô cơ bản.
 * Muốn thêm thông số, lợi ích, FAQ... thì mở lại bằng form đầy đủ ("Add product" > Edit another product).
 */
export function MainProductEditor({ initial, notFound, mains }: Props) {
  const [id, setId] = useState<number | undefined>(initial?.id)
  const [status, setStatus] = useState(initial?.status ?? 'draft')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [name, setName] = useState(initial?.name ?? '')
  const [sub, setSub] = useState(initial?.sub ?? '')
  const [image, setImage] = useState<EditorImage | null>(initial?.image ?? null)
  const [showOnHome, setShowOnHome] = useState(initial?.showOnHome ?? true)
  const [order, setOrder] = useState(initial?.order ?? 100)
  const [busy, setBusy] = useState<'' | 'draft' | 'publish' | 'upload'>('')
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function upload(file: File | undefined) {
    if (!file || !file.type.startsWith('image/')) return
    setBusy('upload')
    setMsg(null)
    try {
      const fd = new FormData()
      fd.append('file', file)
      fd.append('_payload', JSON.stringify({ alt: name || file.name.replace(/\.[^.]+$/, '') }))
      const res = await fetch('/api/media', { method: 'POST', body: fd, credentials: 'same-origin' })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json?.errors?.[0]?.message || `Upload failed (${res.status})`)
      const d = json.doc
      setImage({ id: d.id, url: d.sizes?.large?.url || d.sizes?.medium?.url || d.url, thumb: d.sizes?.thumbnail?.url || d.url })
    } catch (e: any) {
      setMsg({ kind: 'err', text: e?.message || 'Upload failed' })
    }
    setBusy('')
  }

  async function save(kind: 'draft' | 'publish') {
    if (!name.trim()) {
      setMsg({ kind: 'err', text: 'Please enter the product name.' })
      return
    }
    setBusy(kind)
    setMsg(null)
    // parent: null để chắc chắn đây là sản phẩm lớn; gallery chỉ có ảnh bìa (ảnh thêm có thể bổ sung ở form đầy đủ)
    const body = {
      name: name.trim(),
      sub,
      parent: null,
      ...(image ? { gallery: [image.id] } : {}),
      showOnHome,
      order,
      _status: kind === 'publish' ? 'published' : 'draft',
    }
    const qs = `locale=en${kind === 'draft' ? '&draft=true' : ''}`
    try {
      const res = await fetch(id ? `/api/products/${id}?${qs}` : `/api/products?${qs}`, {
        method: id ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(body),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) {
        const e = json?.errors?.[0]
        const detail = e?.data?.errors?.map((x: any) => x.message).join(', ')
        throw new Error([e?.message, detail].filter(Boolean).join(': ') || `Save failed (${res.status})`)
      }
      const doc = json.doc
      setId(doc.id)
      setSlug(doc.slug || slug)
      setStatus(doc._status === 'published' ? 'published' : 'draft')
      if (!id) window.history.replaceState(null, '', `/admin/main-product-editor?id=${doc.id}`)
      setMsg({ kind: 'ok', text: kind === 'publish' ? 'Published.' : 'Draft saved.' })
    } catch (e: any) {
      setMsg({ kind: 'err', text: e?.message || 'Save failed' })
    }
    setBusy('')
  }

  if (notFound) {
    return (
      <div className="htply-ped">
        <p>Main product not found. <a href="/admin/main-product-editor">Add a main product</a></p>
      </div>
    )
  }

  return (
    <div className="htply-ped">
      <div className="ped-top">
        <div>
          <h1>{id ? 'Edit main product' : 'Add main product'}</h1>
          <p>The big products shown on the Products page, like Anti Slip or Film Faced. Types go under them via “Add product”.</p>
        </div>
        <label className="ped-pick">
          <span>Edit another main product</span>
          <select
            value={id ?? ''}
            onChange={(e) => {
              window.location.href = e.target.value ? `/admin/main-product-editor?id=${e.target.value}` : '/admin/main-product-editor'
            }}
          >
            <option value="">+ New main product</option>
            {mains.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </label>
      </div>

      <section className="ped-panel" style={{ maxWidth: 820 }}>
        <div className="ped-form">
          <label className="ped-field full">
            <span>Name *</span>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Film Faced Plywood" />
          </label>
          <label className="ped-field full">
            <span>Short description</span>
            <textarea value={sub} onChange={(e) => setSub(e.target.value)} placeholder="1–2 sentences shown next to the photo" />
          </label>
          <div className="ped-field full">
            <span>Photo</span>
            <div
              className="ped-upload"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); upload(e.dataTransfer.files[0]) }}
            >
              <b>{busy === 'upload' ? 'Uploading…' : image ? 'Click to change the photo' : 'Drop a photo here, or click to choose'}</b>
            </div>
            <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => { upload(e.target.files?.[0]); e.target.value = '' }} />
            {image && (
              <div className="ped-thumbs">
                <div className="ped-thumb">
                  <img src={image.thumb} alt="" />
                  <i>Cover</i>
                  <div><button type="button" onClick={() => setImage(null)} aria-label="Remove">×</button></div>
                </div>
              </div>
            )}
          </div>
          <label className="ped-field">
            <span>Display order (smaller first)</span>
            <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value) || 0)} />
          </label>
        </div>
        <label className="ped-switch" style={{ marginTop: 18 }}>
          <span><b>Show on Home page</b><small>Display this product in the Products section of the home page</small></span>
          <input type="checkbox" checked={showOnHome} onChange={(e) => setShowOnHome(e.target.checked)} />
        </label>
      </section>

      <div className="ped-footer">
        <div className="ped-status">
          <span className={`ped-pill ${status}`}>{status === 'published' ? 'Published' : 'Draft'}</span>
          {msg && <span className={`ped-msg ${msg.kind}`}>{msg.text}</span>}
        </div>
        <div className="ped-actions">
          {id && (
            <a className="ped-btn" href={`/admin/product-editor?parent=${id}`}>Add a type under it →</a>
          )}
          {id && status === 'published' && slug && (
            <a className="ped-btn" href={`/en/products/${slug}`} target="_blank" rel="noreferrer">View on website ↗</a>
          )}
          <button type="button" className="ped-btn" onClick={() => save('draft')} disabled={Boolean(busy)}>
            {busy === 'draft' ? 'Saving…' : 'Save draft'}
          </button>
          <button type="button" className="ped-btn primary" onClick={() => save('publish')} disabled={Boolean(busy)}>
            {busy === 'publish' ? 'Publishing…' : 'Publish'}
          </button>
        </div>
      </div>
    </div>
  )
}
