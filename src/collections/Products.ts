import type { CollectionConfig, Field } from 'payload'
import { slugField } from 'payload'
import { translateProductData } from '../utilities/translateProduct'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

// Tên dòng của danh sách hiển thị theo nội dung (thay vì "Item 01")
const rowLabel = { RowLabel: '@/components/admin/ArrayRowLabel' }

const optionsField: Field = {
  name: 'options',
  type: 'array',
  label: 'Option groups',
  labels: { singular: 'Option group', plural: 'Option groups' },
  admin: {
    initCollapsed: true,
    components: { RowLabel: rowLabel.RowLabel },
    description:
      'Optional. Choice buttons shown next to “Request a Quote” (e.g. Application, Film color). Leave empty if customers cannot choose variants.',
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      label: 'Key',
      admin: { description: 'Short code without spaces, e.g. Application' },
    },
    { name: 'label', type: 'text', required: true, localized: true, label: 'Label', admin: { description: 'Name shown to customers' } },
    {
      name: 'values',
      type: 'array',
      label: 'Choices',
      labels: { singular: 'Choice', plural: 'Choices' },
      admin: { initCollapsed: false, components: { RowLabel: rowLabel.RowLabel } },
      fields: [{ name: 'value', type: 'text', required: true, localized: true, label: 'Choice' }],
    },
  ],
}

const specsField: Field = {
  name: 'specs',
  type: 'array',
  label: 'Technical specifications',
  labels: { singular: 'Specification', plural: 'Specifications' },
  admin: {
    components: { RowLabel: rowLabel.RowLabel },
    description: 'Shown as the “Technical data” table. Leave empty if you have no data: the section is hidden.',
  },
  fields: [
    { name: 'label', type: 'text', required: true, localized: true, label: 'Name', admin: { placeholder: 'e.g. Thickness' } },
    { name: 'value', type: 'text', required: true, localized: true, label: 'Value', admin: { placeholder: 'e.g. 9–21 mm' } },
  ],
}

const featuresField: Field = {
  name: 'features',
  type: 'array',
  label: 'Benefits',
  labels: { singular: 'Benefit', plural: 'Benefits' },
  admin: {
    initCollapsed: true,
    components: { RowLabel: rowLabel.RowLabel },
    description: 'Strengths of the product. The first 4 also appear as “Key highlights” next to the photo.',
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, label: 'Title', admin: { placeholder: 'e.g. High Load Capacity' } },
    { name: 'text', type: 'textarea', localized: true, label: 'Description' },
  ],
}

const applicationsField: Field = {
  name: 'applications',
  type: 'array',
  label: 'Applications',
  labels: { singular: 'Application group', plural: 'Application groups' },
  admin: {
    initCollapsed: true,
    components: { RowLabel: rowLabel.RowLabel },
    description: 'Each group has a name (e.g. Construction) and a list of uses inside it.',
  },
  fields: [
    { name: 'title', type: 'text', required: true, localized: true, label: 'Group name', admin: { placeholder: 'e.g. Construction' } },
    {
      name: 'items',
      type: 'array',
      label: 'Uses',
      labels: { singular: 'Use', plural: 'Uses' },
      admin: { components: { RowLabel: rowLabel.RowLabel } },
      fields: [{ name: 'item', type: 'text', required: true, localized: true, label: 'Use' }],
    },
  ],
}

const faqField: Field = {
  name: 'faq',
  type: 'array',
  label: 'FAQ',
  labels: { singular: 'Question', plural: 'Questions' },
  admin: {
    initCollapsed: true,
    components: { RowLabel: rowLabel.RowLabel },
    description: 'Optional. Leave empty and the FAQ section is hidden.',
  },
  fields: [
    { name: 'q', type: 'text', required: true, localized: true, label: 'Question' },
    { name: 'a', type: 'textarea', required: true, localized: true, label: 'Answer' },
  ],
}

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
    // ===== Cột phải =====
    {
      name: 'translateButton',
      type: 'ui',
      admin: { position: 'sidebar', components: { Field: '@/components/admin/TranslateButton' } },
    },
    {
      name: 'productSummary',
      type: 'ui',
      admin: { position: 'sidebar', components: { Field: '@/components/admin/ProductSummary' } },
    },
    {
      name: 'productCompletion',
      type: 'ui',
      admin: { position: 'sidebar', components: { Field: '@/components/admin/ProductCompletion' } },
    },
    {
      name: 'showOnHome',
      type: 'checkbox',
      defaultValue: false,
      label: 'Show on Home page',
      admin: { position: 'sidebar', description: 'Show this product in the Products section of the home page' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 100,
      label: 'Display order',
      admin: { position: 'sidebar', description: 'Smaller numbers appear first' },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      label: 'Featured product',
      // Trang web không dùng ô này nên ẩn khỏi màn nhập (vẫn giữ cột trong database, không cần migration)
      admin: { position: 'sidebar', hidden: true },
    },
    slugField({ useAsSlug: 'name' }),
    {
      name: 'redirectAfterPublish',
      type: 'ui',
      admin: { components: { Field: '@/components/admin/RedirectAfterPublish' } },
    },

    // ===== 5 tab (không đổi cấu trúc dữ liệu: tab không tên chỉ là cách sắp xếp ô) =====
    {
      type: 'tabs',
      tabs: [
        {
          label: '1 · Basic info',
          description: 'The essentials needed to identify and present the product.',
          fields: [
            { name: 'name', type: 'text', required: true, localized: true, label: 'Product name', admin: { placeholder: 'e.g. LVL' } },
            { name: 'category', type: 'relationship', relationTo: 'categories', label: 'Category' },
            {
              name: 'tagline',
              type: 'text',
              localized: true,
              label: 'Tagline',
              admin: { description: 'Small line above the name, e.g. “Structural LVL”' },
            },
            {
              name: 'sub',
              type: 'textarea',
              localized: true,
              label: 'Short description',
              admin: { description: '1–2 sentences under the product name' },
            },
            {
              name: 'gallery',
              type: 'upload',
              relationTo: 'media',
              hasMany: true,
              label: 'Gallery',
              admin: { description: 'The first image is the cover. Drag to reorder.' },
            },
          ],
        },
        {
          label: '2 · Specifications',
          description: 'Technical data first. Option groups only if customers can choose variants.',
          fields: [specsField, optionsField],
        },
        {
          label: '3 · Benefits & applications',
          description: 'Benefits and applications are simple lists of cards.',
          fields: [featuresField, applicationsField],
        },
        {
          label: '4 · Content & FAQ',
          description: 'Longer content is optional.',
          fields: [
            {
              name: 'description',
              type: 'textarea',
              localized: true,
              label: 'Long description',
              admin: { rows: 8, description: 'Leave a blank line between paragraphs to start a new one.' },
            },
            faqField,
            {
              name: 'related',
              type: 'relationship',
              relationTo: 'products',
              hasMany: true,
              label: 'Related products',
              admin: { description: 'Shown at the bottom of the product page (published products only).' },
              filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
            },
          ],
        },
        {
          label: '5 · Publishing',
          description: 'Labels shown on product cards. Visibility, order and URL are in the right column.',
          fields: [
            {
              name: 'tags',
              type: 'array',
              label: 'Card labels',
              labels: { singular: 'Label', plural: 'Labels' },
              admin: {
                components: { RowLabel: rowLabel.RowLabel },
                description: 'Small labels on cards and badges, e.g. Formwork, Construction.',
              },
              fields: [{ name: 'tag', type: 'text', required: true, localized: true, label: 'Label' }],
            },
          ],
        },
      ],
    },
  ],
}
