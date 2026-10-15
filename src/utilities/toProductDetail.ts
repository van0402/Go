import type { Product, Media } from '@/payload-types'
import type { ProductDetail } from '@/data/products'

const has = (v?: string | null) => Boolean(v && v.trim())

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
    datasheet: (p.datasheet || [])
      .filter((g): g is Media => typeof g === 'object' && !!g)
      .map((m) => m.sizes?.large?.url || m.url)
      .filter((u): u is string => Boolean(u)),
    // Các dòng danh sách có thể để trống trong admin: bỏ qua dòng thiếu nội dung khi hiển thị
    tags: (p.tags || []).filter((t) => has(t.tag)).map((t) => t.tag as string),
    options: (p.options || [])
      .filter((o) => has(o.key) && has(o.label))
      .map((o) => ({
        key: o.key as string,
        label: o.label as string,
        values: (o.values || []).filter((v) => has(v.value)).map((v) => v.value as string),
      })),
    specs: (p.specs || [])
      .filter((s) => has(s.label) && has(s.value))
      .map((s) => ({ label: s.label as string, value: s.value as string })),
    features: (p.features || [])
      .filter((f) => has(f.title))
      .map((f) => ({ title: f.title as string, text: f.text || '' })),
    applications: (p.applications || [])
      .filter((a) => has(a.title))
      .map((a) => ({
        title: a.title as string,
        items: (a.items || []).filter((i) => has(i.item)).map((i) => i.item as string),
      })),
    faq: (p.faq || [])
      .filter((f) => has(f.q) && has(f.a))
      .map((f) => ({ q: f.q as string, a: f.a as string })),
    related: (p.related || []).map((r) => (typeof r === 'object' ? r.slug || '' : '')),
  }
}