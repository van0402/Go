'use client'
import React from 'react'
import { useDocumentInfo, useFormFields } from '@payloadcms/ui'
import { useContactOptions } from './useContactOptions'

const STATUS: Record<string, string> = { new: 'New', contacted: 'Contacted', closed: 'Closed' }

export default function InquiryHeader() {
  const { id } = useDocumentInfo()
  const { label } = useContactOptions()
  const v = useFormFields(([fields]) => ({
    fullName: fields.fullName?.value as string | undefined,
    company: fields.company?.value as string | undefined,
    product: fields.product?.value as string | undefined,
    country: fields.country?.value as string | undefined,
    status: ((fields.status?.value as string | undefined) || 'new') as string,
  }))

  const parts = [
    id ? `Inquiry #${id}` : 'New inquiry',
    label('productOptions', v.product) || null,
    v.country || null,
  ].filter(Boolean)

  return (
    <div className="htply-inq-head">
      <div>
        <h2>
          {v.fullName || 'New inquiry'}
          {v.company ? ` · ${v.company}` : ''}
        </h2>
        <p>{parts.join(' · ')}</p>
      </div>
      <span className={`htply-badge htply-badge--${v.status}`}>{STATUS[v.status] ?? v.status}</span>
    </div>
  )
}
