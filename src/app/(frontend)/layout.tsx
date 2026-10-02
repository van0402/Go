import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import { Be_Vietnam_Pro } from 'next/font/google'
import localFont from 'next/font/local'
import React from 'react'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['latin', 'vietnamese'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-be-vietnam-pro',
})

const choplin = localFont({
  variable: '--font-choplin',
  src: [
    { path: '../../fonts/choplin/choplin-thin.otf', weight: '100', style: 'normal' },
    { path: '../../fonts/choplin/choplin-thin-italic.otf', weight: '100', style: 'italic' },
    { path: '../../fonts/choplin/choplin-extralight.otf', weight: '200', style: 'normal' },
    { path: '../../fonts/choplin/choplin-extralight-italic.otf', weight: '200', style: 'italic' },
    { path: '../../fonts/choplin/choplin-light.otf', weight: '300', style: 'normal' },
    { path: '../../fonts/choplin/choplin-light-italic.otf', weight: '300', style: 'italic' },
    { path: '../../fonts/choplin/choplin-book.otf', weight: '400', style: 'normal' },
    { path: '../../fonts/choplin/choplin-book-italic.otf', weight: '400', style: 'italic' },
    { path: '../../fonts/choplin/choplin-medium.otf', weight: '500', style: 'normal' },
    { path: '../../fonts/choplin/choplin-medium-italic.otf', weight: '500', style: 'italic' },
    { path: '../../fonts/choplin/choplin-semibold.otf', weight: '600', style: 'normal' },
    { path: '../../fonts/choplin/choplin-semibold-italic.otf', weight: '600', style: 'italic' },
    { path: '../../fonts/choplin/choplin-bold.otf', weight: '700', style: 'normal' },
    { path: '../../fonts/choplin/choplin-bold-italic.otf', weight: '700', style: 'italic' },
    { path: '../../fonts/choplin/choplin-extrabold.otf', weight: '800', style: 'normal' },
    { path: '../../fonts/choplin/choplin-extrabold-italic.otf', weight: '800', style: 'italic' },
    { path: '../../fonts/choplin/choplin-black.otf', weight: '900', style: 'normal' },
    { path: '../../fonts/choplin/choplin-black-italic.otf', weight: '900', style: 'italic' },
  ],
})

const amelia = localFont({
  variable: '--font-amelia',
  src: [
    { path: '../../fonts/amelia/amelia-light.otf', weight: '300', style: 'normal' },
    { path: '../../fonts/amelia/amelia-lightitalic.otf', weight: '300', style: 'italic' },
    { path: '../../fonts/amelia/amelia-regular.otf', weight: '400', style: 'normal' },
    { path: '../../fonts/amelia/amelia-italic.otf', weight: '400', style: 'italic' },
    { path: '../../fonts/amelia/amelia-bold.otf', weight: '700', style: 'normal' },
    { path: '../../fonts/amelia/amelia-bolditalic.otf', weight: '700', style: 'italic' },
    { path: '../../fonts/amelia/amelia-black.otf', weight: '900', style: 'normal' },
    { path: '../../fonts/amelia/amelia-blackitalic.otf', weight: '900', style: 'italic' },
  ],
})

import { AdminBar } from '@/components/AdminBar'
import { PageTransition } from '@/components/PageTransition'
import { Footer } from '@/Footer/Component'
// import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

// Renders every frontend page on-demand instead of statically at build time,
// since Footer/Header pull from Payload and need DATABASE_URL/PAYLOAD_SECRET,
// which are only available at container runtime on Render, not during
// `docker build`.
export const dynamic = 'force-dynamic'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html
      className={cn(
        GeistSans.variable,
        GeistMono.variable,
        beVietnamPro.variable,
        choplin.variable,
        amelia.variable,
      )}
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          <PageTransition />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          {/* <Header /> */}
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
