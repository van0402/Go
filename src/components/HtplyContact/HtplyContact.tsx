'use client'

import { useState, type FormEvent } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { Nav } from '@/components/Htply/Nav'
import { SiteFooter } from '@/components/Htply/SiteFooter'
import type { ContactOption } from '@/payload-types'
import './HtplyContact.css'

type Opt = NonNullable<ContactOption['productOptions']>[number]

type Status = 'idle' | 'sending' | 'success' | 'error'

type Prefill = {
  product?: string
  productName?: string
  market?: string
  extra?: Record<string, string>
}

export function HtplyContact({ options, prefill }: { options: ContactOption; prefill?: Prefill }) {
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

  const badges = t.raw('badges') as string[]
  const trust = t.raw('trust') as { title: string; desc: string }[]
  const steps = t.raw('steps') as { tag: string; title: string; desc: string }[]
  // danh sách lựa chọn do admin quản lý (Contact Options), chỉ hiện các dòng đang bật
  const labelKey = locale === 'fr' ? 'labelFr' : locale === 'es' ? 'labelEs' : 'labelEn'
  const list = (items?: Opt[] | null) => (items ?? []).filter((o) => o.active !== false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
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
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="htply-contact-page">
      <Nav />
      <main>

        <section className="c-contact" id="quote">
          <div className="c-container">
            <div className="c-shell">

              <section className="c-form-panel">
                <div className="c-form-head">
                  <div>
                    <h3>{t('formTitle')}</h3>
                    <p>{t('formSubtitle')}</p>
                  </div>
                  <div className="c-req-note">{t('required')}</div>
                </div>

                <form onSubmit={onSubmit}>
                  <div className="c-group-title">{t('groupContact')}</div>
                  <div className="c-grid">
                    <div className="c-field">
                      <label htmlFor="fullName">{t('labels.fullName')} *</label>
                      <input id="fullName" name="fullName" type="text" placeholder={t('placeholders.fullName')} required />
                    </div>
                    <div className="c-field">
                      <label htmlFor="company">{t('labels.company')} *</label>
                      <input id="company" name="company" type="text" placeholder={t('placeholders.company')} required />
                    </div>
                    <div className="c-field">
                      <label htmlFor="email">{t('labels.email')} *</label>
                      <input id="email" name="email" type="email" placeholder={t('placeholders.email')} required />
                    </div>
                    <div className="c-field">
                      <label htmlFor="phone">{t('labels.phone')} *</label>
                      <input id="phone" name="phone" type="text" placeholder={t('placeholders.phone')} required />
                    </div>
                    <div className="c-field">
                      <label htmlFor="country">{t('labels.country')} *</label>
                      <input id="country" name="country" type="text" placeholder={t('placeholders.country')} required />
                    </div>
                    <div className="c-field">
                      <label htmlFor="targetMarket">{t('labels.targetMarket')}</label>
                      <input id="targetMarket" name="targetMarket" type="text" defaultValue={prefill?.market ?? ''} placeholder={t('placeholders.targetMarket')} />
                    </div>
                  </div>

                  <div className="c-group-title">{t('groupProduct')}</div>
                  <div className="c-grid">
                    <div className="c-field">
                      <label htmlFor="product">{t('labels.product')}</label>
                      <select id="product" name="product" defaultValue={prefill?.product ?? ''}>
                        <option value="">{t('choose')}</option>
                        {list(options.productOptions).map((o) => (
                          <option key={o.value} value={o.value}>{o[labelKey]}</option>
                        ))}
                      </select>
                    </div>
                    <div className="c-field">
                      <label htmlFor="quantity">{t('labels.quantity')}</label>
                      <select id="quantity" name="quantity" defaultValue="">
                        <option value="">{t('choose')}</option>
                        {list(options.quantityOptions).map((o) => (
                          <option key={o.value} value={o.value}>{o[labelKey]}</option>
                        ))}
                      </select>
                    </div>
                    <div className="c-field">
                      <label htmlFor="incoterm">{t('labels.incoterm')}</label>
                      <select id="incoterm" name="incoterm" defaultValue="">
                        <option value="">{t('choose')}</option>
                        {list(options.incotermOptions).map((o) => (
                          <option key={o.value} value={o.value}>{o[labelKey]}</option>
                        ))}
                      </select>
                    </div>
                    <div className="c-field">
                      <label htmlFor="timing">{t('labels.timing')}</label>
                      <select id="timing" name="timing" defaultValue="">
                        <option value="">{t('choose')}</option>
                        {list(options.timingOptions).map((o) => (
                          <option key={o.value} value={o.value}>{o[labelKey]}</option>
                        ))}
                      </select>
                    </div>
                    <div className="c-field full">
                      <label htmlFor="message">{t('labels.message')}</label>
                      <textarea id="message" name="message" defaultValue={prefillMessage} placeholder={t('placeholders.message')} />
                    </div>
                  </div>

                  {/* honeypot: người thật không thấy, bot tự điền */}
                  <input name="website" tabIndex={-1} autoComplete="off" className="c-hp" aria-hidden="true" />

                  <div className="c-submit-row">
                    <div className="c-privacy">{t('privacy')}</div>
                    <button className="c-submit" type="submit" disabled={status === 'sending'}>
                      {status === 'sending' ? t('sending') : t('submit')}
                    </button>
                  </div>

                  {status === 'success' && <p className="c-msg ok">{t('success')}</p>}
                  {status === 'error' && <p className="c-msg bad">{t('error')}</p>}
                </form>
              </section>
            </div>
          </div>
        </section>


      </main>
      <SiteFooter />
    </div>
  )
}
