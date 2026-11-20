'use client'
import React, { useState } from 'react'
import { useDocumentInfo, useFormModified, useLocale } from '@payloadcms/ui'

type State = 'idle' | 'busy' | 'done' | 'error'

// Nút dịch EN -> FR + ES bằng DeepL. Dùng cho:
// - bài viết / sản phẩm (collection): POST /api/<collection>/<id>/translate
// - các trang chỉnh nội dung (global: Factory, About, Home): POST /api/globals/<slug>/translate,
//   có thêm lựa chọn "chỉ dịch ô FR/ES còn trống"
export default function TranslateButton() {
  const { id, collectionSlug, globalSlug } = useDocumentInfo()
  const locale = useLocale()
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')
  const [onlyEmpty, setOnlyEmpty] = useState(false)
  const isGlobal = Boolean(globalSlug)
  const modified = useFormModified() // có chỗ sửa chưa bấm Save

  const run = async () => {
    // Dịch lấy chữ EN đã lưu trong DB. Chưa Save thì chữ mới gõ không được dịch, và trang tải lại sẽ mất chữ đó.
    if (modified) {
      window.alert('You have unsaved changes.\nClick Save first, then click Translate.')
      return
    }
    const question = isGlobal
      ? onlyEmpty
        ? 'Fill the empty French and Spanish fields with a translation of the English text?\nFR/ES text you already wrote is kept.'
        : 'Translate all English text on this page into French and Spanish?\nExisting FR/ES text on this page will be overwritten.'
      : 'Translate the English title, summary and content into French and Spanish?\nExisting FR/ES text of this post will be overwritten.'
    if (!window.confirm(question)) return
    setState('busy')
    setMessage('')
    try {
      const url = isGlobal ? `/api/globals/${globalSlug}/translate` : `/api/${collectionSlug}/${id}/translate`
      const res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ onlyEmpty: isGlobal && onlyEmpty }),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`)
      setState('done')
      if (isGlobal && data.translated === 0) {
        setMessage('Nothing to translate: the English fields are empty, or FR/ES are already filled in.')
        return
      }
      setMessage(
        isGlobal
          ? 'Done. Switch the language to FR / ES to review the text, then Save.'
          : 'Done. Switch the language to FR / ES to review, then Publish.',
      )
      setTimeout(() => window.location.reload(), 1200)
    } catch (e) {
      setState('error')
      setMessage(e instanceof Error ? e.message : 'Translation failed')
    }
  }

  if (!isGlobal && !id) {
    return (
      <div className="htply-translate">
        <b>Translate</b>
        <p>Save the post once (Save draft), then you can translate it to FR and ES.</p>
      </div>
    )
  }

  if (locale?.code && locale.code !== 'en') {
    return (
      <div className="htply-translate">
        <b>Translate</b>
        <p>Switch the language to EN to run the translation.</p>
      </div>
    )
  }

  return (
    <div className="htply-translate">
      <b>Translate</b>
      <p>
        {isGlobal
          ? 'Write the English text and Save first. Then translate it to French and Spanish.'
          : 'Write the post in English, save, then translate to French and Spanish.'}
      </p>
      {isGlobal && (
        <label className="htply-translate-opt">
          <input type="checkbox" checked={onlyEmpty} onChange={(e) => setOnlyEmpty(e.target.checked)} />
          Only fill empty FR / ES fields
        </label>
      )}
      <button
        type="button"
        className="btn btn--style-secondary btn--size-medium"
        onClick={run}
        disabled={state === 'busy'}
      >
        {state === 'busy' ? 'Translating…' : 'Translate to FR + ES'}
      </button>
      {modified && state !== 'busy' && (
        <p className="htply-translate-err">Unsaved changes: click Save first, then Translate.</p>
      )}
      {message && <p className={state === 'error' ? 'htply-translate-err' : ''}>{message}</p>}
    </div>
  )
}
