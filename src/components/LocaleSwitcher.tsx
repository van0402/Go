'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/routing'

const locales = [
  { code: 'en', label: 'EN' },
  { code: 'fr', label: 'FR' },
  { code: 'es', label: 'ES' },
]

export function LocaleSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="locale-switcher">
      {locales.map((l) => (
        <button
          key={l.code}
          type="button"
          className={l.code === locale ? 'active' : ''}
          onClick={() => router.replace(pathname, { locale: l.code, scroll: false })}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
