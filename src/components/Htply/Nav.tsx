'use client'

import { useState } from 'react'

export function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <div className="nav-wrap">
      <div className="container">
        <nav>
          <a className="brand" href="#top">
            <img src="/images/logo.png" alt="HTPLY Vietnam" className="brand-mark" />
            HTPLY VIETNAM
          </a>
          <div className={`nav-links${open ? ' mobile-open' : ''}`}>
            <a href="#top" onClick={() => setOpen(false)}>Home</a>
            <a href="/about">About</a>
            <a href="/products">Products</a>
            <a href="/factory">Factory</a>
            <a href="#quality" onClick={() => setOpen(false)}>Quality</a>
          </div>
          <div className="nav-actions">
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
