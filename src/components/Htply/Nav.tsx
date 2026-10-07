'use client'

import { useState } from 'react'
import { Link } from '@/i18n/routing'
import { LocaleSwitcher } from '@/components/LocaleSwitcher'
import { useTranslations } from 'next-intl'
import './Nav.css'

export function Nav() {
  const [open, setOpen] = useState(false)
  const t = useTranslations('nav')

  return (
    <div className="htply-nav-wrap">
      <div className="htply-nav-container">

        <nav className="htply-nav">

          <Link
            className="htply-nav-brand"
            href="/"
            onClick={() => setOpen(false)}
          >
            <img
              src="/images/logoo.png"
              alt="HTPLY Vietnam"
              className="htply-nav-logo"
            />
          </Link>

          <div className={`htply-nav-links${open ? ' mobile-open' : ''}`}>

            <Link href="/" onClick={() => setOpen(false)}>
              {t('home')}
            </Link>

            <Link href="/about" onClick={() => setOpen(false)}>
              {t('about')}
            </Link>

            <Link href="/products" onClick={() => setOpen(false)}>
              {t('products')}
            </Link>

            <Link href="/factory" onClick={() => setOpen(false)}>
              {t('factory')}
            </Link>

            <Link href="/news" onClick={() => setOpen(false)}>
              {t('news')}
            </Link>

            <Link href="/contact" onClick={() => setOpen(false)}>
              {t('contact')}
            </Link>

          </div>

          <div className="htply-nav-actions">

            <LocaleSwitcher />

            <button
              type="button"
              className="htply-menu-toggle"
              aria-label="Toggle navigation"
              onClick={() => setOpen(v => !v)}
            >
              {open ? '✕' : '☰'}
            </button>

          </div>

        </nav>

      </div>
    </div>
  )
}