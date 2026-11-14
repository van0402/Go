import React from 'react'
import type { AdminViewServerProps } from 'payload'
import { ProductEditor, type EditorProduct, type EditorImage } from './ProductEditor'
import './product-editor.css'
import { DefaultTemplate } from '@payloadcms/next/templates'

// Đổi bản ghi ảnh Media thành {id, url ảnh lớn, url ảnh nhỏ}
const imgOf = (m: any): EditorImage | null =>
  m && typeof m === 'object' && m.url
    ? { id: m.id, url: m.sizes?.large?.url || m.sizes?.medium?.url || m.url, thumb: m.sizes?.thumbnail?.url || m.url }
    : null

export default async function ProductEditorView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req } = initPageResult
  const payload = req.payload
  const user = req.user
  const idParam = typeof searchParams?.id === 'string' ? searchParams.id : undefined

  const prods = await payload.find({
    collection: 'products', locale: 'en', depth: 0, limit: 200, pagination: false, sort: 'name', draft: true,
    select: { name: true, parent: true }, overrideAccess: false, user,
  })

  let product: EditorProduct | null = null
  if (idParam) {
    try {
      const p: any = await payload.findByID({
        collection: 'products', id: idParam, depth: 1, draft: true, locale: 'en',
        overrideAccess: false, user,
      })
      product = {
        id: p.id,
        status: p._status === 'published' ? 'published' : 'draft',
        slug: p.slug || '',
        name: p.name || '',
        parent: typeof p.parent === 'object' && p.parent ? p.parent.id : p.parent ?? null,
        tagline: p.tagline || '',
        sub: p.sub || '',
        description: p.description || '',
        gallery: (p.gallery || []).map(imgOf).filter(Boolean) as EditorImage[],
        specs: (p.specs || []).map((s: any) => ({ id: s.id, label: s.label || '', value: s.value || '' })),
        features: (p.features || []).map((f: any) => ({ id: f.id, title: f.title || '', text: f.text || '' })),
        applications: (p.applications || []).map((a: any) => ({
          id: a.id,
          title: a.title || '',
          items: (a.items || []).map((i: any) => i.item || '').filter(Boolean).join('\n'),
        })),
        faq: (p.faq || []).map((f: any) => ({ id: f.id, q: f.q || '', a: f.a || '' })),
        related: (p.related || []).map((r: any) => (typeof r === 'object' ? r.id : r)),
        showOnHome: Boolean(p.showOnHome),
        order: typeof p.order === 'number' ? p.order : 100,
      }
    } catch {
      product = null
    }
  }

    return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <ProductEditor
        key={product?.id ?? 'new'}
        initial={product}
        defaultParent={!idParam && typeof searchParams?.parent === 'string' && Number(searchParams.parent) ? Number(searchParams.parent) : null}
        notFound={Boolean(idParam) && !product}
        products={prods.docs.map((p: any) => ({
          id: p.id,
          name: p.name || '(no name)',
          parent: typeof p.parent === 'object' && p.parent ? p.parent.id : p.parent ?? null,
        }))}
      />
    </DefaultTemplate>
  )
}