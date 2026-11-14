import React from 'react'
import type { AdminViewServerProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { MainProductEditor, type MainProduct } from './MainProductEditor'
import type { EditorImage } from './ProductEditor'
import './product-editor.css'

// Đổi bản ghi ảnh Media thành {id, url ảnh lớn, url ảnh nhỏ}
const imgOf = (m: any): EditorImage | null =>
  m && typeof m === 'object' && m.url
    ? { id: m.id, url: m.sizes?.large?.url || m.sizes?.medium?.url || m.url, thumb: m.sizes?.thumbnail?.url || m.url }
    : null

/** Trang /admin/main-product-editor: tạo hoặc sửa nhanh sản phẩm lớn (không có sản phẩm cha). */
export default async function MainProductEditorView({ initPageResult, params, searchParams }: AdminViewServerProps) {
  const { req } = initPageResult
  const payload = req.payload
  const user = req.user
  const idParam = typeof searchParams?.id === 'string' ? searchParams.id : undefined

  // Chỉ các sản phẩm lớn (chưa có parent), để mở lại sửa
  const mainsRes = await payload.find({
    collection: 'products', locale: 'en', depth: 0, limit: 200, pagination: false, sort: 'name', draft: true,
    select: { name: true }, where: { parent: { exists: false } }, overrideAccess: false, user,
  })

  let product: MainProduct | null = null
  if (idParam) {
    try {
      const p: any = await payload.findByID({
        collection: 'products', id: idParam, depth: 1, draft: true, locale: 'en', overrideAccess: false, user,
      })
      product = {
        id: p.id,
        status: p._status === 'published' ? 'published' : 'draft',
        slug: p.slug || '',
        name: p.name || '',
        sub: p.sub || '',
        image: imgOf((p.gallery || [])[0]),
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
      <MainProductEditor
        key={product?.id ?? 'new'}
        initial={product}
        notFound={Boolean(idParam) && !product}
        mains={mainsRes.docs.map((p: any) => ({ id: p.id, name: p.name || '(no name)' }))}
      />
    </DefaultTemplate>
  )
}
