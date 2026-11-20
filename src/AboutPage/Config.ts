import type { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { sectionHeading } from '@/fields/sectionHeading'
import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'
import { translateGlobalEndpoint } from '@/utilities/translateGlobal'
import { MAP_COUNTRIES } from '@/components/HtplyAbout/export-map-data'

countries.registerLocale(en)

// Danh sách nước chọn được: mọi nước có trên bản đồ (trừ Việt Nam) và có mã chuẩn quốc tế
const countryOptions = MAP_COUNTRIES
  .filter((c) => c.id !== '704' && countries.numericToAlpha2(c.id))
  .map((c) => ({ label: countries.getName(c.id, 'en') ?? c.name, value: c.id }))
  .sort((a, b) => a.label.localeCompare(b.label))

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  endpoints: [translateGlobalEndpoint('about-page')],
  label: 'About page',
  access: { read: anyone, update: authenticated },
  fields: [
    // Nút dịch EN -> FR + ES bằng DeepL (cột phải)
    { name: 'translateButton', type: 'ui', admin: { position: 'sidebar', components: { Field: '@/components/admin/TranslateButton' } } },
    sectionHeading('bannerHeading', 'Banner', 'Title and paragraph on the top banner of the About page'),
    { name: 'whoTitle', label: 'Title', type: 'text', localized: true, maxLength: 80,
      admin: { description: 'e.g. A Vietnamese plywood brand built for the global market (max 80 characters)' } },
    { name: 'whoText', label: 'Paragraph', type: 'textarea', localized: true, maxLength: 600,
      admin: { description: 'e.g. HTPLY VIETNAM was founded in 2021… (max 600 characters)' } },

    sectionHeading('marketsHeading', 'Export markets', 'Countries shown on the Business footprint map and flag bar'),
    {
      name: 'markets',
      label: 'Countries',
      type: 'array',
      labels: { singular: 'Country', plural: 'Countries' },
      admin: {
        initCollapsed: false,
        description: 'Pick a country: the map highlight, pin, route line, flag and translated name are created automatically. Leave empty to show the default list.',
      },
      validate: (value: unknown) => {
        const ids = ((value as { country?: string }[] | undefined) ?? []).map((r) => r.country)
        return new Set(ids).size === ids.length ? true : 'The same country is listed twice'
      },
      fields: [{ name: 'country', label: 'Country', type: 'select', required: true, options: countryOptions }],
    },

    sectionHeading('historyHeading', 'History', 'The wooden staircase at the bottom of the About page'),
    { name: 'historyTitle', label: 'Subtitle', type: 'text', localized: true, maxLength: 90,
      admin: { description: 'e.g. From early foundations to global supply capability.' } },
    {
      name: 'milestones',
      label: 'Boards',
      type: 'array',
      maxRows: 6,
      labels: { singular: 'Board', plural: 'Boards' },
      admin: {
        initCollapsed: true,
        components: { RowLabel: '@/components/admin/ArrayRowLabel' },
        description: 'One row = one wooden board, from left (lowest) to right (highest). Drag ⠿ to change the order. Up to 6 boards. Leave empty to show the default list.',
      },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'year', label: 'Year', type: 'number', required: true, min: 1990, max: 2100,
              admin: { width: '30%', description: 'e.g. 2021' } },
            { name: 'future', label: 'Future goal (blue see-through board)', type: 'checkbox',
              admin: { width: '70%', description: 'Tick for a plan that has not happened yet. Usually only the last board.' } },
          ],
        },
        { name: 'title', label: 'Title', type: 'text', localized: true, maxLength: 40,
          admin: { description: 'Short, 1–3 words. e.g. Founded' } },
        { name: 'desc', label: 'Short text', type: 'textarea', localized: true, maxLength: 160,
          admin: { rows: 3, description: 'One or two sentences (max 160 characters) so it fits on the board.' } },
      ],
    },
  ],
}