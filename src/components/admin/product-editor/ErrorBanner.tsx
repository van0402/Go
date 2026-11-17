'use client'
import React, { useEffect, useRef } from 'react'

/** Hộp báo lỗi nổi bật ở đầu form: tự cuộn vào giữa màn hình để người dùng đọc, có nút đóng. */
export function ErrorBanner({ text, onClose }: { text: string | null; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (text) ref.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [text])
  if (!text) return null
  return (
    <div className="ped-alert" role="alert" ref={ref}>
      <b>Could not complete this action</b>
      <p>{text}</p>
      <button type="button" onClick={onClose} aria-label="Close message">×</button>
    </div>
  )
}
