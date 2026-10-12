'use client'
import React from 'react'
import { useFormFields } from '@payloadcms/ui'

type F = { rows?: unknown[]; value?: unknown } | undefined

export const countOf = (f: F): number => {
  if (!f) return 0
  if (Array.isArray(f.rows)) return f.rows.length
  if (Array.isArray(f.value)) return f.value.length
  return typeof f.value === 'number' ? f.value : 0
}

/** Khối "Product Summary" ở cột phải: đếm nhanh các mục đã có. */
export default function ProductSummary() {
  const s = useFormFields(([fields]) => ({
    category: Boolean(fields.category?.value),
    specs: countOf(fields.specs as F),
    features: countOf(fields.features as F),
    applications: countOf(fields.applications as F),
    faq: countOf(fields.faq as F),
    gallery: countOf(fields.gallery as F),
  }))

  const rows: [string, string][] = [
    ['Category', s.category ? 'Selected' : '—'],
    ['Specs', String(s.specs)],
    ['Benefits', String(s.features)],
    ['Applications', String(s.applications)],
    ['FAQ', String(s.faq)],
    ['Gallery', `${s.gallery} ${s.gallery === 1 ? 'image' : 'images'}`],
  ]

  return (
    <div className="htply-side-card">
      <h4>Product Summary</h4>
      {rows.map(([k, v]) => (
        <div className="htply-side-row" key={k}>
          <span>{k}</span>
          <b>{v}</b>
        </div>
      ))}
    </div>
  )
}
