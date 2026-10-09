export type ProductDetail = {
  slug: string
  name: string
  category: string
  tagline: string
  sub: string
  description: string[] // các đoạn mô tả sản phẩm
  image: string
  images: string[]
  options: { key: string; label: string; values: string[] }[]
  specs: { label: string; value: string }[]
  features: { title: string; text: string }[]
  applications: { title: string; items: string[] }[]
  faq: { q: string; a: string }[]
  related: string[] // slug các sản phẩm khác

}
