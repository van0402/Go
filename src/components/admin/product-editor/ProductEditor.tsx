'use client'
import React, { useRef, useState } from 'react'

export type EditorImage = { id: number; url: string; thumb: string }
type Spec = { id?: string; label: string; value: string }
type Feature = { id?: string; title: string; text: string }
// items: mỗi dòng một mục; itemIds: id các dòng cũ (để giữ bản dịch FR/ES khi lưu lại)
type App = { id?: string; title: string; items: string; itemIds?: string[] }
type Faq = { id?: string; q: string; a: string }
type Tag = { id?: string; tag: string }

export type EditorProduct = {
  id?: number
  status: 'draft' | 'published'
  slug: string
  name: string
  category: number | null
  tagline: string
  sub: string
  description: string
  gallery: EditorImage[]
  specs: Spec[]
  features: Feature[]
  applications: { id?: string; title: string; items: string }[]
  faq: Faq[]
  related: number[]
  tags: Tag[]
  showOnHome: boolean
  order: number
}

type Props = {
  initial: EditorProduct | null
  notFound: boolean
  categories: { id: number; title: string }[]
  products: { id: number; name: string }[]
}

const STEPS = ['Basic', 'Specs', 'Overview', 'Benefits', 'Applications'] as const

const blank = (s: string) => !s.trim()
const setAt = <T,>(arr: T[], i: number, patch: Partial<T>): T[] => arr.map((x, k) => (k === i ? { ...x, ...patch } : x))
const removeAt = <T,>(arr: T[], i: number): T[] => arr.filter((_, k) => k !== i)
const move = <T,>(arr: T[], from: number, to: number): T[] => {
  if (to < 0 || to >= arr.length) return arr
  const next = [...arr]
  const [x] = next.splice(from, 1)
  next.splice(to, 0, x)
  return next
}
const lines = (s: string) => s.split('\n').map((x) => x.trim()).filter(Boolean)

export function ProductEditor({ initial, notFound, categories, products }: Props) {
  const [id, setId] = useState<number | undefined>(initial?.id)
  const [status, setStatus] = useState(initial?.status ?? 'draft')
  const [slug, setSlug] = useState(initial?.slug ?? '')
  const [step, setStep] = useState(0)

  const [name, setName] = useState(initial?.name ?? '')
  const [category, setCategory] = useState<number | null>(initial?.category ?? null)
  const [tagline, setTagline] = useState(initial?.tagline ?? '')
  const [sub, setSub] = useState(initial?.sub ?? '')
  const [gallery, setGallery] = useState<EditorImage[]>(initial?.gallery ?? [])
  const [showOnHome, setShowOnHome] = useState(initial?.showOnHome ?? false)
  const [order, setOrder] = useState(initial?.order ?? 100)
  const [tags, setTags] = useState<Tag[]>(initial?.tags ?? [])
  const [tagDraft, setTagDraft] = useState('')

  const [specs, setSpecs] = useState<Spec[]>(initial?.specs ?? [])
  const [description, setDescription] = useState(initial?.description ?? '')
  const [faq, setFaq] = useState<Faq[]>(initial?.faq ?? [])
  const [related, setRelated] = useState<number[]>(initial?.related ?? [])
  const [features, setFeatures] = useState<Feature[]>(initial?.features ?? [])
  const [apps, setApps] = useState<App[]>(
    (initial?.applications ?? []).map((a) => ({ ...a, itemIds: [] })),
  )

  const [busy, setBusy] = useState<'' | 'draft' | 'publish' | 'upload' | 'translate'>('')
  const [msg, setMsg] = useState<{ kind: 'ok' | 'err'; text: string } | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function uploadFiles(files: FileList | File[]) {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/'))
    if (!list.length) return
    setBusy('upload')
    setMsg(null)
    for (const f of list) {
      try {
        const fd = new FormData()
        fd.append('file', f)
        fd.append('_payload', JSON.stringify({ alt: name || f.name.replace(/\.[^.]+$/, '') }))
        const res = await fetch('/api/media', { method: 'POST', body: fd, credentials: 'same-origin' })
        const json = await res.json().catch(() => ({}))
        if (!res.ok) throw new Error(json?.errors?.[0]?.message || `Upload failed (${res.status})`)
        const d = json.doc
        setGallery((g) => [
          ...g,
          { id: d.id, url: d.sizes?.large?.url || d.sizes?.medium?.url || d.url, thumb: d.sizes?.thumbnail?.url || d.url },
        ])
      } catch (e: any) {
        setMsg({ kind: 'err', text: `${f.name}: ${e?.message || 'upload failed'}` })
      }
    }
    setBusy('')
  }

  async function save(kind: 'draft' | 'publish') {
    if (blank(name)) {
      setMsg({ kind: 'err', text: 'Please enter the product name first (step 1).' })
      setStep(0)
      return
    }
    setBusy(kind)
    setMsg(null)
    const withId = (r: { id?: string }) => (r.id ? { id: r.id } : {})
    const body = {
      name: name.trim(),
      category,
      tagline,
      sub,
      description,
      gallery: gallery.map((g) => g.id),
      specs: specs.filter((r) => !(blank(r.label) && blank(r.value))).map((r) => ({ ...withId(r), label: r.label, value: r.value })),
      features: features.filter((r) => !(blank(r.title) && blank(r.text))).map((r) => ({ ...withId(r), title: r.title, text: r.text })),
      applications: apps
        .filter((a) => !blank(a.title) || lines(a.items).length)
        .map((a) => ({
          ...withId(a),
          title: a.title,
          items: lines(a.items).map((item, i) => ({ ...(a.itemIds?.[i] ? { id: a.itemIds[i] } : {}), item })),
        })),
      faq: faq.filter((r) => !(blank(r.q) && blank(r.a))).map((r) => ({ ...withId(r), q: r.q, a: r.a })),
      related,
      tags: tags.filter((t) => !blank(t.tag)).map((t) => ({ ...withId(t), tag: t.tag })),
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
      if (!id) window.history.replaceState(null, '', `/admin/product-editor?id=${doc.id}`)
      if (kind === 'publish') {
        setMsg({ kind: 'ok', text: 'Published. Going back to the product list…' })
        setTimeout(() => {
          window.location.href = '/admin/collections/products'
        }, 800)
        return // giữ trạng thái "đang xử lý" để khách không bấm thêm lần nữa
      }
      setMsg({ kind: 'ok', text: 'Draft saved.' })
    } catch (e: any) {
      setMsg({ kind: 'err', text: e?.message || 'Save failed' })
    }
    setBusy('')
  }

  async function translate() {
    if (!id) return
    setBusy('translate')
    setMsg(null)
    try {
      const res = await fetch(`/api/products/${id}/translate`, { method: 'POST', credentials: 'same-origin' })
      const json = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(json?.error || 'Translation failed')
      setMsg({ kind: 'ok', text: 'French and Spanish drafts created. Press Publish to put them live.' })
    } catch (e: any) {
      setMsg({ kind: 'err', text: e?.message || 'Translation failed' })
    }
    setBusy('')
  }

  function addTag() {
    const t = tagDraft.trim()
    if (!t) return
    setTags((x) => [...x, { tag: t }])
    setTagDraft('')
  }

  const filled = [
    !blank(name) && !blank(sub),
    gallery.length > 0,
    specs.some((r) => !blank(r.label) || !blank(r.value)),
    !blank(description),
    features.some((r) => !blank(r.title)),
    apps.some((a) => !blank(a.title)),
  ]
  const done = filled.filter(Boolean).length

  if (notFound) {
    return (
      <div className="htply-ped">
        <p>Product not found. <a href="/admin/product-editor">Start a new product</a></p>
      </div>
    )
  }

  return (
    <div className="htply-ped">
      <div className="ped-top">
        <div>
          <h1>{id ? 'Edit product' : 'Add product'}</h1>
          <p>Only the product name is required. Everything else can be added later.</p>
        </div>
        <label className="ped-pick">
          <span>Edit another product</span>
          <select
            value={id ?? ''}
            onChange={(e) => {
              window.location.href = e.target.value ? `/admin/product-editor?id=${e.target.value}` : '/admin/product-editor'
            }}
          >
            <option value="">+ New product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="ped-steps">
        {STEPS.map((s, i) => (
          <button key={s} type="button" className={`ped-step${i === step ? ' on' : ''}`} onClick={() => setStep(i)}>
            {i + 1} · {s}
          </button>
        ))}
      </div>

      <div className="ped-layout">
        <section className="ped-panel">
          {step === 0 && (
            <>
              <h2>Basic information</h2>
              <p className="ped-hint">The name, short description and photos shown at the top of the product page.</p>
              <div className="ped-form">
                <label className="ped-field">
                  <span>Product name *</span>
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. LVL" />
                </label>
                <label className="ped-field">
                  <span>Small line above the name</span>
                  <input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="e.g. Structural LVL" />
                </label>
                <label className="ped-field">
                  <span>Category</span>
                  <select value={category ?? ''} onChange={(e) => setCategory(e.target.value ? Number(e.target.value) : null)}>
                    <option value="">No category</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </select>
                </label>
                <label className="ped-field">
                  <span>Page address</span>
                  <input value={slug ? `/products/${slug}` : 'Created automatically from the name'} disabled />
                </label>
                <label className="ped-field full">
                  <span>Short description</span>
                  <textarea value={sub} onChange={(e) => setSub(e.target.value)} placeholder="1–2 sentences under the product name" />
                </label>
                <div className="ped-field full">
                  <span>Photos</span>
                  <div
                    className="ped-upload"
                    onClick={() => fileRef.current?.click()}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => { e.preventDefault(); uploadFiles(e.dataTransfer.files) }}
                  >
                    <b>{busy === 'upload' ? 'Uploading…' : 'Drop product photos here, or click to choose'}</b>
                    <small>You can select many at once. The first photo is the cover.</small>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" multiple hidden onChange={(e) => { if (e.target.files) uploadFiles(e.target.files); e.target.value = '' }} />
                  {gallery.length > 0 && (
                    <div className="ped-thumbs">
                      {gallery.map((g, i) => (
                        <div className="ped-thumb" key={g.id}>
                          <img src={g.thumb} alt="" />
                          {i === 0 && <i>Cover</i>}
                          <div>
                            <button type="button" disabled={i === 0} onClick={() => setGallery(move(gallery, i, i - 1))} aria-label="Move left">‹</button>
                            <button type="button" onClick={() => setGallery(removeAt(gallery, i))} aria-label="Remove">×</button>
                            <button type="button" disabled={i === gallery.length - 1} onClick={() => setGallery(move(gallery, i, i + 1))} aria-label="Move right">›</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="ped-sub">
                <h3>Show on website</h3>
                <label className="ped-switch">
                  <span><b>Show on Home page</b><small>Display this product in the Products section of the home page</small></span>
                  <input type="checkbox" checked={showOnHome} onChange={(e) => setShowOnHome(e.target.checked)} />
                </label>
                <div className="ped-form">
                  <label className="ped-field">
                    <span>Display order (smaller first)</span>
                    <input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value) || 0)} />
                  </label>
                  <div className="ped-field">
                    <span>Card labels</span>
                    <div className="ped-chips">
                      {tags.map((t, i) => (
                        <span className="ped-chip" key={(t.id || '') + i}>
                          {t.tag}
                          <button type="button" onClick={() => setTags(removeAt(tags, i))} aria-label="Remove label">×</button>
                        </span>
                      ))}
                      <input
                        value={tagDraft}
                        onChange={(e) => setTagDraft(e.target.value)}
                        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                        onBlur={addTag}
                        placeholder="+ add label, press Enter"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <h2>Specifications</h2>
              <p className="ped-hint">Technical data table. Skip this step if you have no data: the table is hidden on the website.</p>
              {specs.map((r, i) => (
                <div className="ped-row" key={(r.id || '') + i}>
                  <input value={r.label} onChange={(e) => setSpecs(setAt(specs, i, { label: e.target.value }))} placeholder="Name, e.g. Thickness" />
                  <input value={r.value} onChange={(e) => setSpecs(setAt(specs, i, { value: e.target.value }))} placeholder="Value, e.g. 9–21 mm" />
                  <button type="button" className="ped-x" onClick={() => setSpecs(removeAt(specs, i))} aria-label="Remove">×</button>
                </div>
              ))}
              <button type="button" className="ped-add" onClick={() => setSpecs([...specs, { label: '', value: '' }])}>+ Add row</button>
            </>
          )}

          {step === 2 && (
            <>
              <h2>Overview</h2>
              <p className="ped-hint">The main product description. Leave a blank line to start a new paragraph.</p>
              <textarea className="ped-big" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe the product" />

              <details className="ped-details">
                <summary>FAQ <small>Optional · hidden on the website if empty</small></summary>
                <div>
                  {faq.map((r, i) => (
                    <div className="ped-card" key={(r.id || '') + i}>
                      <div className="ped-row one">
                        <input value={r.q} onChange={(e) => setFaq(setAt(faq, i, { q: e.target.value }))} placeholder="Question" />
                        <button type="button" className="ped-x" onClick={() => setFaq(removeAt(faq, i))} aria-label="Remove">×</button>
                      </div>
                      <textarea value={r.a} onChange={(e) => setFaq(setAt(faq, i, { a: e.target.value }))} placeholder="Answer" />
                    </div>
                  ))}
                  <button type="button" className="ped-add" onClick={() => setFaq([...faq, { q: '', a: '' }])}>+ Add question</button>
                </div>
              </details>

              <details className="ped-details">
                <summary>Related products <small>Optional · shown at the bottom of the product page</small></summary>
                <div>
                  <select
                    multiple
                    size={5}
                    value={related.map(String)}
                    onChange={(e) => setRelated(Array.from(e.target.selectedOptions).map((o) => Number(o.value)))}
                  >
                    {products.filter((p) => p.id !== id).map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  <small className="ped-hint">Hold Ctrl (Cmd on Mac) to choose several.</small>
                </div>
              </details>
            </>
          )}

          {step === 3 && (
            <>
              <h2>Benefits</h2>
              <p className="ped-hint">A short title and one sentence each. The first 4 also appear as “Key highlights” next to the photo.</p>
              {features.map((f, i) => (
                <div className="ped-card" key={(f.id || '') + i}>
                  <div className="ped-row one">
                    <input value={f.title} onChange={(e) => setFeatures(setAt(features, i, { title: e.target.value }))} placeholder="Title, e.g. High Load Capacity" />
                    <button type="button" className="ped-x" onClick={() => setFeatures(removeAt(features, i))} aria-label="Remove">×</button>
                  </div>
                  <textarea value={f.text} onChange={(e) => setFeatures(setAt(features, i, { text: e.target.value }))} placeholder="One short sentence" />
                </div>
              ))}
              <button type="button" className="ped-add" onClick={() => setFeatures([...features, { title: '', text: '' }])}>+ Add benefit</button>
            </>
          )}

          {step === 4 && (
            <>
              <h2>Applications</h2>
              <p className="ped-hint">Add a group name, then type one use per line. No need to add each use separately.</p>
              {apps.map((a, i) => (
                <div className="ped-card" key={(a.id || '') + i}>
                  <div className="ped-row one">
                    <input value={a.title} onChange={(e) => setApps(setAt(apps, i, { title: e.target.value }))} placeholder="Group name, e.g. Construction" />
                    <button type="button" className="ped-x" onClick={() => setApps(removeAt(apps, i))} aria-label="Remove group">×</button>
                  </div>
                  <textarea value={a.items} onChange={(e) => setApps(setAt(apps, i, { items: e.target.value }))} placeholder="One use per line" />
                </div>
              ))}
              <button type="button" className="ped-add" onClick={() => setApps([...apps, { title: '', items: '' }])}>+ Add application group</button>
            </>
          )}

          <div className="ped-next">
            <button type="button" className="ped-btn" disabled={step === 0} onClick={() => setStep(step - 1)}>← Back</button>
            {step < STEPS.length - 1 ? (
              <button type="button" className="ped-btn primary" onClick={() => setStep(step + 1)}>Next: {STEPS[step + 1]} →</button>
            ) : (
              <button type="button" className="ped-btn primary" onClick={() => save('publish')} disabled={Boolean(busy)}>Publish</button>
            )}
          </div>
        </section>

        <aside className="ped-side">
          <div className="ped-card">
            <h3>Completion</h3>
            <div className="ped-bar"><i style={{ width: `${(done / filled.length) * 100}%` }} /></div>
            <small>{done} of {filled.length} sections filled</small>
            <p className="ped-hint">Optional items can stay empty: sections without data are hidden on the website.</p>
          </div>
          <div className="ped-card dark">
            <h3>Translate</h3>
            <p>Complete the English version, save it, then generate French and Spanish drafts.</p>
            <button type="button" onClick={translate} disabled={!id || Boolean(busy)}>
              {busy === 'translate' ? 'Translating…' : id ? 'Translate to FR + ES' : 'Save the product first'}
            </button>
          </div>
        </aside>
      </div>

      <div className="ped-footer">
        <div className="ped-status">
          <span className={`ped-pill ${status}`}>{status === 'published' ? 'Published' : 'Draft'}</span>
          {msg && <span className={`ped-msg ${msg.kind}`}>{msg.text}</span>}
        </div>
        <div className="ped-actions">
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