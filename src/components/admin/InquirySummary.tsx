'use client'
import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import { useContactOptions } from './useContactOptions'

export default function InquirySummary() {
  const { label } = useContactOptions()
  const v = useFormFields(([fields]) => ({
    product: fields.product?.value as string | undefined,
    quantity: fields.quantity?.value as string | undefined,
    market: fields.targetMarket?.value as string | undefined,
    locale: fields.locale?.value as string | undefined,
  }))

  const rows: [string, string | undefined][] = [
    ['Product', label('productOptions', v.product)],
    ['Quantity', label('quantityOptions', v.quantity)],
    ['Market', v.market],
    ['Locale', v.locale?.toUpperCase()],
  ]

  return (
    <div className="htply-inq-summary">
      <h3>Summary</h3>
      {rows.map(([name, value]) => (
        <div key={name}>
          <span>{name}</span>
          <b>{value || '-'}</b>
        </div>
      ))}
    </div>
  )
}
