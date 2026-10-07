'use client'
import React, { useState } from 'react'
import { useDocumentInfo, useLocale } from '@payloadcms/ui'

type State = 'idle' | 'busy' | 'done' | 'error'

export default function TranslateButton() {
  const { id } = useDocumentInfo()
  const locale = useLocale()
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')

  const run = async () => {
    if (
      !window.confirm(
        'Translate the English title, summary and content into French and Spanish?\nExisting FR/ES text of this post will be overwritten.',
      )
    )
      return
    setState('busy')
    setMessage('')
    try {
      const res = await fetch(`/api/posts/${id}/translate`, {
        method: 'POST',
        credentials: 'include',
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`)
      setState('done')
      setMessage('Done. Switch the language to FR / ES to review, then Publish.')
      setTimeout(() => window.location.reload(), 1200)
    } catch (e) {
      setState('error')
      setMessage(e instanceof Error ? e.message : 'Translation failed')
    }
  }

  if (!id) {
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
      <p>Write the post in English, save, then translate to French and Spanish.</p>
      <button
        type="button"
        className="btn btn--style-secondary btn--size-medium"
        onClick={run}
        disabled={state === 'busy'}
      >
        {state === 'busy' ? 'Translating…' : 'Translate to FR + ES'}
      </button>
      {message && <p className={state === 'error' ? 'htply-translate-err' : ''}>{message}</p>}
    </div>
  )
}
