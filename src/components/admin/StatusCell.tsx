import React from 'react'

const LABEL: Record<string, string> = { new: 'New', contacted: 'Contacted', closed: 'Closed' }

export default function StatusCell({ cellData }: { cellData?: string }) {
  const v = cellData || 'new'
  return <span className={`htply-badge htply-badge--${v}`}>{LABEL[v] ?? v}</span>
}