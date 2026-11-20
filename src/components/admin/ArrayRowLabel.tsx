'use client'
import React from 'react'
import { useRowLabel } from '@payloadcms/ui'

/**
 * Tên dòng của các danh sách (Specs, Features, FAQ, Tags…) hiển thị theo nội dung
 * thay vì "Spec 01", "Feature 01" để dễ nhận biết khi đã thu gọn.
 */
export default function ArrayRowLabel() {
  const { data, rowNumber } = useRowLabel<Record<string, unknown>>()
  const pick = ['title', 'label', 'caption', 'q', 'tag', 'key', 'value', 'item']
    .map((k) => data?.[k])
    .find((v) => typeof v === 'string' && v.trim()) as string | undefined
  const n = String((rowNumber ?? 0) + 1).padStart(2, '0')
  // Danh sách có năm (History): hiện "2021 · Founded"
  const year = typeof data?.year === 'number' ? String(data.year) : ''
  const text = [year, pick].filter(Boolean).join(' · ')
  return (
    <span>
      <b style={{ opacity: 0.45, marginRight: 8 }}>{n}</b>
      {text || 'New item'}
    </span>
  )
}
