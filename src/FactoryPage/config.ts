import type { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { translateGlobalEndpoint } from '@/utilities/translateGlobal'
import { sectionHeading as heading } from '@/fields/sectionHeading'

// Trang Factory (/factory). Ô nào để trống thì trang dùng chữ/ảnh mặc định đang có sẵn.
const text = (name: string, label: string, description?: string, maxLength?: number) =>
  ({ name, label, type: 'text', localized: true, maxLength, admin: { description } }) as const

const paragraph = (name: string, label: string, description?: string) =>
  ({ name, label, type: 'textarea', localized: true, maxLength: 600, admin: { description } }) as const

const onlyImages = { mimeType: { contains: 'image' } }
const onlyVideos = { mimeType: { contains: 'video' } }

export const FactoryPage: GlobalConfig = {
  slug: 'factory-page',
  endpoints: [translateGlobalEndpoint('factory-page')],
  label: 'Factory page',
  access: { read: anyone, update: authenticated },
  fields: [
    // Nút dịch EN -> FR + ES bằng DeepL (cột phải)
    { name: 'translateButton', type: 'ui', admin: { position: 'sidebar', components: { Field: '@/components/admin/TranslateButton' } } },
    // ===== Banner =====
    heading('bannerHeading', 'Banner', 'Big title, paragraph and background photo at the top of the Factory page'),
    text('heroTitle', 'Title', 'e.g. Where quality begins with process', 80),
    paragraph('heroText', 'Paragraph', 'e.g. From raw materials to export packaging…'),
    {
      name: 'heroImage',
      label: 'Background photo',
      type: 'upload',
      relationTo: 'media',
      filterOptions: onlyImages,
      admin: { description: 'Wide landscape photo (at least 1920 px wide). Leave empty to keep the current photo.' },
    },

    // ===== 01 · Giới thiệu nhà máy =====
    heading('overviewHeading', '01 · Production system', 'Title, two paragraphs, photo collage and the area badge'),
    text('overviewTitle', 'Title', 'e.g. A production system organized for export', 80),
    paragraph('overviewText1', 'Paragraph 1'),
    paragraph('overviewText2', 'Paragraph 2'),
    {
      name: 'photos',
      label: 'Photos',
      type: 'array',
      maxRows: 5,
      labels: { singular: 'Photo', plural: 'Photos' },
      admin: {
        initCollapsed: true,
        components: { RowLabel: '@/components/admin/ArrayRowLabel' },
        description:
          'Up to 5 photos, shown in this order in the collage. A row left without a photo or caption keeps the default one. Leave the list empty to keep all current photos.',
      },
      fields: [
        { name: 'caption', label: 'Caption', type: 'text', localized: true, maxLength: 40, admin: { placeholder: 'e.g. Hot press line' } },
        { name: 'image', label: 'Photo', type: 'upload', relationTo: 'media', filterOptions: onlyImages },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'badgeValue', label: 'Badge number', type: 'text', maxLength: 20, admin: { width: '50%', placeholder: '5,000 m²' } },
        text('badgeLabel', 'Badge label', 'e.g. Factory footprint', 40),
      ],
    },

    // ===== 02 · Video quy trình =====
    heading('videoHeading', '02 · Production video', 'Title, paragraph and the process video'),
    text('flowTitle', 'Title', 'e.g. From veneer to finished product', 80),
    paragraph('processText', 'Paragraph'),
    {
      name: 'video',
      label: 'Video (MP4)',
      type: 'upload',
      relationTo: 'media',
      filterOptions: onlyVideos,
      admin: { description: 'MP4 file, ideally under 20 MB so it loads fast. Leave empty to keep the current video.' },
    },
    {
      name: 'videoPoster',
      label: 'Cover image',
      type: 'upload',
      relationTo: 'media',
      filterOptions: onlyImages,
      admin: { description: 'Image shown before the video plays.' },
    },
    {
      type: 'row',
      fields: [
        text('videoLabel', 'Small line on the video', 'e.g. HTPLY Vietnam', 40),
        text('videoTitle', 'Video title', 'e.g. Production process', 60),
        { name: 'videoDuration', label: 'Duration', type: 'text', maxLength: 10, admin: { width: '25%', placeholder: '0:23' } },
      ],
    },
  ],
}
