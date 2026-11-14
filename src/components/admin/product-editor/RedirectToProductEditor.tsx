import { redirect } from 'next/navigation'
import type { DocumentViewServerProps } from 'payload'

/**
 * Thay cho form mặc định của Payload ở mục Products:
 * mở "Create New" hoặc bấm vào một dòng sản phẩm đều chuyển sang form 5 bước (/admin/product-editor).
 * Chỉ thay tab Edit; các tab Versions / API vẫn dùng bản mặc định.
 */
export default function RedirectToProductEditor(props: DocumentViewServerProps) {
  const id = props.doc?.id ?? props.initPageResult?.docID
  redirect(`/admin/product-editor${id ? `?id=${id}` : ''}`)
}
