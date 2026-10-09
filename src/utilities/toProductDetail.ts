import type { Product, Media } from '@/payload-types'
import type { ProductDetail } from '@/data/products'

export function toProductDetail(p: Product): ProductDetail {
  const media = (p.gallery || []).filter((g): g is Media => typeof g === 'object' && !!g)
  const first = media[0]
  const cat = typeof p.category === 'object' && p.category ? p.category.title : ''
  return {
    slug: p.slug || '',
    name: p.name,
    category: cat,
    tagline: p.tagline || '',
    sub: p.sub || '',
    description: (p.description || '').split(/\n\s*\n/).map((s) => s.trim()).filter(Boolean),
    image: first?.url || '/images/hm14.jpg',
    images: media.map((m) => m.url).filter((u): u is string => Boolean(u)),
    options: (p.options || []).map((o) => ({
      key: o.key,
      label: o.label,
      values: (o.values || []).map((v) => v.value),
    })),
    specs: (p.specs || []).map((s) => ({ label: s.label, value: s.value })),
    features: (p.features || []).map((f) => ({ title: f.title, text: f.text || '' })),
    applications: (p.applications || []).map((a) => ({
      title: a.title,
      items: (a.items || []).map((i) => i.item),
    })),
    faq: (p.faq || []).map((f) => ({ q: f.q, a: f.a })),
    related: (p.related || []).map((r) => (typeof r === 'object' ? r.slug || '' : '')),
  }
}