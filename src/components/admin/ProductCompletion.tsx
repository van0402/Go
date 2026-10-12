'use client'
import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import { countOf } from './ProductSummary'

type F = { rows?: unknown[]; value?: unknown } | undefined

/** Khối "Completion": đã điền đủ các mục quan trọng chưa. */
export default function ProductCompletion() {
  const c = useFormFields(([fields]) => ({
    name: Boolean(String(fields.name?.value ?? '').trim()),
    sub: Boolean(String(fields.sub?.value ?? '').trim()),
    gallery: countOf(fields.gallery as F) > 0,
    specs: countOf(fields.specs as F) > 0,
    features: countOf(fields.features as F) > 0,
    applications: countOf(fields.applications as F) > 0,
    faq: countOf(fields.faq as F) > 0,
  }))

  const items: [string, boolean][] = [
    ['Basic info (name, short description)', c.name && c.sub],
    ['Gallery', c.gallery],
    ['Specifications', c.specs],
    ['Benefits', c.features],
    ['Applications', c.applications],
    ['FAQ', c.faq],
  ]
  const done = items.filter(([, ok]) => ok).length

  return (
    <div className="htply-side-card">
      <h4>
        Completion <span className="htply-side-count">{done}/{items.length}</span>
      </h4>
      <div className="htply-side-bar">
        <i style={{ width: `${(done / items.length) * 100}%` }} />
      </div>
      {items.map(([label, ok]) => (
        <div className="htply-side-row" key={label}>
          <span>{label}</span>
          <b className={ok ? 'htply-ok' : 'htply-miss'}>{ok ? '✓' : '—'}</b>
        </div>
      ))}
      <p className="htply-side-note">Optional items can stay empty: sections without data are hidden on the website.</p>
    </div>
  )
}
