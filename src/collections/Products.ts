import type { CollectionConfig } from 'payload'
import { slugField } from 'payload'
import { translateProductData } from '../utilities/translateProduct'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    group: 'Catalog',
    defaultColumns: ['name', 'category', 'updatedAt'],
    useAsTitle: 'name',
  },
  versions: { drafts: true, maxPerDoc: 20 },
  endpoints: [
  {
    path: '/:id/translate',
    method: 'post',
    handler: async (req) => {
      if (!req.user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
      const id = req.routeParams?.id as string | undefined
      if (!id) return Response.json({ error: 'Missing id' }, { status: 400 })
      if (!process.env.DEEPL_API_KEY) {
        return Response.json({ error: 'DEEPL_API_KEY is not set on the server' }, { status: 500 })
      }
      try {
        const en: any = await req.payload.findByID({
          collection: 'products', id, locale: 'en', draft: true, depth: 0, req,
        })
        const source = {
          name: en.name, tagline: en.tagline, sub: en.sub, description: en.description,
          options: en.options, specs: en.specs, features: en.features,
          applications: en.applications, faq: en.faq,
        }
        const targets = ['fr', 'es'] as const
        // Gọi DeepL cho FR và ES cùng lúc
        const translated = await Promise.all(
          targets.map((t) => translateProductData(source, t.toUpperCase() as 'FR' | 'ES')),
        )
        // Ghi vào DB lần lượt để không ghi đè lẫn nhau
        for (let i = 0; i < targets.length; i++) {
          await req.payload.update({
            collection: 'products', id, locale: targets[i], draft: true,
            data: { ...translated[i], generateSlug: false }, req,
          })
        }
        return Response.json({ ok: true })
      } catch (err) {
        return Response.json(
          { error: err instanceof Error ? err.message : 'Translation failed' },
          { status: 500 },
        )
      }
    },
  },
],
  fields: [
    { name: 'name', type: 'text', required: true, localized: true },
    {
  name: 'translateButton',
  type: 'ui',
  admin: {
    position: 'sidebar',
    components: { Field: '@/components/admin/TranslateButton' },
  },
},
    { name: 'tagline', type: 'text', localized: true, admin: { description: 'Dòng nhỏ, ví dụ "Structural LVL"' } },
    { name: 'sub', type: 'textarea', localized: true, admin: { description: 'Mô tả ngắn dưới tiêu đề' } },
    {
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: { description: 'Đoạn mô tả sản phẩm. Cách nhau một dòng trống = một đoạn mới.' },
    },
    { name: 'gallery', type: 'upload', relationTo: 'media', hasMany: true, admin: { description: 'Ảnh đầu tiên là ảnh chính' } },
    { name: 'category', type: 'relationship', relationTo: 'categories' },

    {
      name: 'options',
      type: 'array',
      admin: { description: 'Các nhóm nút chọn (Application, Length, Market…)' },
      fields: [
        { name: 'key', type: 'text', required: true, admin: { description: 'Mã ngắn không dấu, ví dụ Application' } },
        { name: 'label', type: 'text', required: true, localized: true },
        {
          name: 'values',
          type: 'array',
          fields: [{ name: 'value', type: 'text', required: true, localized: true }],
        },
      ],
    },
    {
      name: 'specs',
      type: 'array',
      admin: { description: 'Bảng thông số kỹ thuật' },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'value', type: 'text', required: true, localized: true },
      ],
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'text', type: 'textarea', localized: true },
      ],
    },
    {
      name: 'applications',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'items', type: 'array', fields: [{ name: 'item', type: 'text', required: true, localized: true }] },
      ],
    },
    {
      name: 'faq',
      type: 'array',
      fields: [
        { name: 'q', type: 'text', required: true, localized: true },
        { name: 'a', type: 'textarea', required: true, localized: true },
      ],
    },
    {
      name: 'related',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
    },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'redirectAfterPublish',
      type: 'ui',
      admin: { components: { Field: '@/components/admin/RedirectAfterPublish' } },
    },
    { name: 'showOnHome', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar', description: 'Hiện ở trang chủ' } },
    { name: 'order', type: 'number', defaultValue: 100, admin: { position: 'sidebar', description: 'Số nhỏ hiện trước' } },
    {
      name: 'tags',
      type: 'array',
      admin: { description: 'Nhãn nhỏ trên thẻ, ví dụ Formwork, Construction' },
      fields: [{ name: 'tag', type: 'text', required: true, localized: true }],
    },
    slugField({ useAsSlug: 'name' }),
  ],
}