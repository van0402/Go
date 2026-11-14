'use client'

import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
import './HtplyContact.css'

// Sản phẩm khách có thể chọn (loại con, hoặc sản phẩm lớn không có loại con); group = tên sản phẩm lớn chứa nó
export type ProductChoice = { value: string; label: string; group?: string }

type Status = 'idle' | 'sending' | 'success' | 'error'

type Prefill = {
  product?: string
  productName?: string
  market?: string
  extra?: Record<string, string>
}

const REQUIRED = ['fullName', 'company', 'email', 'phone', 'country'] as const
const LAYERS = Array.from({ length: 8 }, (_, i) => i)

// 8 lớp ván ép xếp isometric (đầu trang và màn hình "đã gửi")
function Layers() {
  return (
    <>
      {LAYERS.map((i) => (
        <i key={i} className={`ct-lay ${i % 2 ? 'g2' : 'g1'}${i === 7 ? ' cap' : ''}`} style={{ '--i': i, '--k': (i / 7).toFixed(2) } as CSSProperties} />
      ))}
    </>
  )
}

const Tick = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3 8.5l3.2 3.2L13 4.5" /></svg>
)

export function HtplyContact({ products, prefill }: { products: ProductChoice[]; prefill?: Prefill }) {
  // Lời nhắn điền sẵn từ nút Request a Quote ở trang sản phẩm
  const prefillMessage = [
    prefill?.productName && `Product: ${prefill.productName}`,
    ...Object.entries(prefill?.extra ?? {}).map(([k, v]) => `${k}: ${v}`),
  ]
    .filter(Boolean)
    .join('\n')
  const t = useTranslations('contactPage')
  const locale = useLocale()
  const [status, setStatus] = useState<Status>('idle')
  const [doneIn, setDoneIn] = useState(false)

  const [product, setProduct] = useState(prefill?.product ?? '')
  const [quantity, setQuantity] = useState('')
  const [country, setCountry] = useState('')
  const [okCount, setOkCount] = useState(0)

  const cardRef = useRef<HTMLElement>(null)
  const decoRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  const title = t('formTitle')
  const badges = t.raw('badges') as string[]
  // Danh sách sản phẩm gom theo sản phẩm lớn (optgroup); sản phẩm lớn không có loại con đứng riêng
  const groups = products.reduce<{ name: string; items: ProductChoice[] }[]>((acc, p) => {
    const name = p.group ?? ''
    const g = acc.find((x) => x.name === name)
    if (g) g.items.push(p)
    else acc.push({ name, items: [p] })
    return acc
  }, [])
  const productLabel = products.find((p) => p.value === product)?.label ?? ''

  // Các ô hiện lần lượt khi vào màn hình + chồng ván đầu trang tách lớp theo cuộn (không dùng thư viện)
  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
      { threshold: 0.15 },
    )
    document.querySelectorAll<HTMLElement>('.htply-contact-page .ct-stg').forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 0.06}s`
      io.observe(el)
    })
    const onScroll = () => decoRef.current?.style.setProperty('--gap', (16 + Math.min(1, scrollY / 420) * 30).toFixed(1))
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => { io.disconnect(); window.removeEventListener('scroll', onScroll) }
    // dựng lại khi form hiện lại sau màn hình "đã gửi"
  }, [status === 'success'])

  // Đã gửi: cho chồng ván xếp lại sau một nhịp để hiệu ứng chạy
  useEffect(() => {
    if (status !== 'success') { setDoneIn(false); return }
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setDoneIn(true)))
    cardRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return () => cancelAnimationFrame(id)
  }, [status])

  function refresh() {
    const form = formRef.current
    if (!form) return
    const els = REQUIRED.map((n) => form.elements.namedItem(n) as HTMLInputElement)
    setOkCount(els.filter((el) => el.value.trim() && el.checkValidity()).length)
    setCountry((form.elements.namedItem('country') as HTMLInputElement).value.trim())
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (!form.reportValidity()) return
    const d = Object.fromEntries(new FormData(form).entries()) as Record<string, string>

    if (d.website) return // ô ẩn bị điền = bot, bỏ qua

    setStatus('sending')
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: d.fullName,
          company: d.company,
          email: d.email,
          phone: d.phone,
          country: d.country,
          targetMarket: d.targetMarket || undefined,
          product: d.product || undefined,
          quantity: d.quantity || undefined,
          incoterm: d.incoterm || undefined,
          timing: d.timing || undefined,
          message: d.message || undefined,
          locale,
        }),
      })
      if (!res.ok) throw new Error('failed')
      form.reset()
      setProduct('')
      setQuantity('')
      setCountry('')
      setOkCount(0)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const picks = [product, quantity].filter(Boolean).length
  const summary = [productLabel, quantity.trim(), country].filter(Boolean)
  const sent = status === 'success'

  return (
    <div className="htply-contact-page">
      <Nav />
      <main>
        {/* ===== Đầu trang ngắn ===== */}
        <section className="ct-top">
          <div className="ct-top-bg" />
          <div className="ct-deco" ref={decoRef} aria-hidden="true">
            <div className="ct-plane"><Layers /></div>
          </div>
          <div className="ct-top-in">
            <div className="ct-eyebrow">{t('eyebrow')}</div>
            <h1 aria-label={title}>
              {title.split(' ').map((w, i, a) => (
                <span key={i} aria-hidden="true">
                  <span className="ct-w"><span style={{ animationDelay: `${0.25 + i * 0.12}s` }}>{w}</span></span>
                  {i < a.length - 1 ? ' ' : ''}
                </span>
              ))}
            </h1>
            <p className="ct-sub">{t('formSubtitle')}</p>
            {badges[3] && <div className="ct-reply">{badges[3]}</div>}
          </div>
        </section>

        {/* ===== Khung form nâng lên đè lên đầu trang ===== */}
        <section
          className="ct-card"
          id="quote"
          ref={cardRef}
          onPointerMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
            e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
          }}
        >
          <div className={`ct-bar${okCount > 0 && okCount < REQUIRED.length ? ' on' : ''}`}>
            <i style={{ width: `${(okCount / REQUIRED.length) * 100}%` }} />
          </div>
          <div className="ct-pad">
            {sent ? (
              <div className={`ct-done${doneIn ? ' in' : ''}`} role="status">
                <div className="ct-stack">
                  <div className="ct-plane"><Layers /></div>
                  <svg className="ct-tick" viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="46" /><path d="M30 52l14 14 27-30" /></svg>
                </div>
                <p>{t('success')}</p>
                <button type="button" className="ct-again" onClick={() => setStatus('idle')}>← {title}</button>
              </div>
            ) : (
              <>
                <div className="ct-head ct-stg"><div className="ct-req">{t('required')}</div></div>

                <form ref={formRef} onSubmit={onSubmit} onInput={refresh} noValidate>
                  <div className={`ct-group first ct-stg${okCount === REQUIRED.length ? ' ok' : ''}`}><em>1<Tick /></em>{t('groupContact')}</div>
                  <div className="ct-grid">
                    {(['fullName', 'company', 'email', 'phone', 'country'] as const).map((n) => (
                      <div className="ct-f ct-stg" key={n}>
                        <input
                          id={n}
                          name={n}
                          type={n === 'email' ? 'email' : 'text'}
                          autoComplete={{ fullName: 'name', company: 'organization', email: 'email', phone: 'tel', country: 'country-name' }[n]}
                          placeholder={t(`placeholders.${n}`)}
                          required
                        />
                        <label htmlFor={n}>{t(`labels.${n}`)} *</label>
                      </div>
                    ))}
                    <div className="ct-f ct-stg">
                      <input id="targetMarket" name="targetMarket" type="text" defaultValue={prefill?.market ?? ''} placeholder={t('placeholders.targetMarket')} />
                      <label htmlFor="targetMarket">{t('labels.targetMarket')}</label>
                    </div>
                  </div>

                  <div className={`ct-group ct-stg${picks >= 2 ? ' ok' : ''}`}><em>2<Tick /></em>{t('groupProduct')}</div>
                  <div className="ct-grid">
                    <div className={`ct-f sel ct-stg${product ? ' has' : ''}`}>
                      <select id="product" name="product" value={product} onChange={(e) => setProduct(e.target.value)}>
                        <option value="" />
                        {groups.map((g) =>
                          g.name ? (
                            <optgroup key={g.name} label={g.name}>
                              {g.items.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                            </optgroup>
                          ) : (
                            g.items.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)
                          ),
                        )}
                      </select>
                      <label htmlFor="product">{t('labels.product')}</label>
                    </div>
                    <div className="ct-f ct-stg">
                      <input
                        id="quantity"
                        name="quantity"
                        type="text"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder={t('placeholders.quantity')}
                      />
                      <label htmlFor="quantity">{t('labels.quantity')}</label>
                    </div>
                    <div className="ct-f ct-full ct-stg">
                      <textarea id="message" name="message" defaultValue={prefillMessage} placeholder={t('placeholders.message')} />
                      <label htmlFor="message">{t('labels.message')}</label>
                    </div>
                  </div>

                  <div className={`ct-summary${summary.length > 0 ? ' show' : ''}`} aria-live="polite">
                    {summary.length > 0 && <small>{t('summaryLabel')}</small>}
                    {summary.map((s) => <span key={s}>{s}</span>)}
                  </div>

                  {/* honeypot: người thật không thấy, bot tự điền */}
                  <input name="website" tabIndex={-1} autoComplete="off" className="ct-hp" aria-hidden="true" />

                  <p className="ct-privacy ct-stg">{t('privacy')}</p>
                  <button className="ct-submit" type="submit" disabled={status === 'sending'}>
                    {status === 'sending' ? t('sending') : t('submit')}
                  </button>
                  {status === 'error' && <p className="ct-err">{t('error')}</p>}
                </form>
              </>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
