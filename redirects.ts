import type { NextConfig } from 'next'

export const redirects: NextConfig['redirects'] = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header' as const,
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  return [
  internetExplorerRedirect,
  { source: '/posts', destination: '/news', permanent: true },
  { source: '/posts/:slug', destination: '/news/:slug', permanent: true },
  { source: '/:locale(en|fr|es)/posts', destination: '/:locale/news', permanent: true },
  { source: '/:locale(en|fr|es)/posts/:slug', destination: '/:locale/news/:slug', permanent: true },
]
}
