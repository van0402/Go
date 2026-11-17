// Tài liệu khách tải về (PDF...). type khớp các lựa chọn trong admin (Products.ts: DOWNLOAD_TYPES)
export type ProductDownload = {
  label: string
  type: 'catalogue' | 'datasheet' | 'test-report' | 'certificate' | 'other'
  url: string
  size: string // vd "1.2 MB" (rỗng nếu không biết)
}

export type ProductDetail = {
  slug: string
  name: string
  group: string // tên sản phẩm lớn chứa nó (rỗng nếu chính nó là sản phẩm lớn)
  groupSlug: string // slug của sản phẩm lớn đó (để link ngược lại)
  tagline: string
  sub: string
  description: string[] // các đoạn mô tả sản phẩm
  image: string
  images: string[]
  datasheet: string[] // ảnh trang catalog (tờ thông số), hiện cạnh nhau ở cuối bảng thông số
  tags: string[]
  options: { key: string; label: string; values: string[] }[]
  specs: { label: string; value: string }[]
  features: { title: string; text: string }[]
  applications: { title: string; items: string[] }[]
  faq: { q: string; a: string }[]
  related: string[] // slug các sản phẩm khác
  downloads: ProductDownload[]

}
