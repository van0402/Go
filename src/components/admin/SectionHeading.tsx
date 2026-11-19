import React from 'react'

// Tiêu đề to, đậm để chia các nhóm ô trong trang admin (dùng với field type "ui"; chữ truyền qua clientProps.title)
export default function SectionHeading({ title, hint }: { title?: string; hint?: string }) {
  return (
    <div style={{ margin: '34px 0 6px', paddingBottom: 12, borderBottom: '2px solid var(--theme-elevation-150)' }}>
      <h2 style={{ margin: 0, fontSize: 28, fontWeight: 700, letterSpacing: '-.02em', color: 'var(--theme-text)' }}>{title}</h2>
      {hint && <p style={{ margin: '6px 0 0', fontSize: 13.5, color: 'var(--theme-elevation-600)' }}>{hint}</p>}
    </div>
  )
}
