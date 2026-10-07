'use client'
import { useEffect, useState } from 'react'

type Opt = { value: string; labelEn?: string | null }
type Options = Record<string, Opt[] | null | undefined>

// Đọc danh sách lựa chọn do admin quản lý (Contact Options) để hiện nhãn thay vì mã.
export function useContactOptions() {
  const [options, setOptions] = useState<Options | null>(null)

  useEffect(() => {
    fetch('/api/globals/contact-options')
      .then((r) => r.json())
      .then(setOptions)
      .catch(() => {})
  }, [])

  const label = (list: string, value?: string | null): string | undefined => {
    if (!value) return undefined
    return options?.[list]?.find((o) => o.value === value)?.labelEn ?? value
  }

  return { label }
}
