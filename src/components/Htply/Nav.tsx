'use client'

import { useState } from 'react'
import { Link } from '@/i18n/routing'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { useTranslations } from 'next-intl'

export function Nav() {
  const [open, setOpen] = useState(false)
  const t = useTranslations('nav')
  return (
    <div className="nav-wrap">
      <div className="container">
         <nav>
          <a className="brand" href="#top">
            <img src="/images/logo.png" alt="HTPLY Vietnam" className="brand-mark" />
            HTPLY VIETNAM
          </a>
          <div className={`nav-links${open ? ' mobile-open' : ''}`}>
            <a href="#top" onClick={() => setOpen(false)}>
              {t('home')}
            </a>
            <Link href="/about">{t('about')}</Link>
            <Link href="/products">{t('products')}</Link>
            <Link href="/factory">{t('factory')}</Link>
            <a href="#quality" onClick={() => setOpen(false)}>
              {t('quality')}
            </a>
          </div>
          <div className="nav-actions">
            <LocaleSwitcher />
            <button
              type="button"
              className="menu-toggle"
              aria-label="Toggle navigation"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? '✕' : '☰'}
            </button>
          </div>
        </nav>
      </div>
    </div>
  )
}
