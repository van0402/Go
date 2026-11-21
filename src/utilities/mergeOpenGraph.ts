import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: 'HTPLY VIETNAM manufactures and exports plywood and LVL worldwide.',
  images: [
    {
      url: `${getServerSideURL()}/og-default.jpg`,
    },
  ],
  siteName: 'HTPLY Vietnam',
  title: 'HTPLY Vietnam',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
