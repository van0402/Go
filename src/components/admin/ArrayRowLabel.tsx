'use client'
import React from 'react'
import { useRowLabel } from '@payloadcms/ui'

/**
 * Tên dòng của các danh sách (Specs, Features, FAQ, Tags…) hiển thị theo nội dung
 * thay vì "Spec 01", "Feature 01" để dễ nhận biết khi đã thu gọn.
 */
export default function ArrayRowLabel() {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const pick = ['title', 'label', 'q', 'tag', 'key', 'value', 'item']
    .map((k) => data?.[k])
    .find((v) => typeof v === 'string' && v.trim()) as string | undefined
  const n = String((rowNumber ?? 0) + 1).padStart(2, '0')
  return (
    <span>
      <b style={{ opacity: 0.45, marginRight: 8 }}>{n}</b>
      {pick || 'New item'}
    </span>
  )
}
