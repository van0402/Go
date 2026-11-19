import type { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { sectionHeading } from '@/fields/sectionHeading'
import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'
import { MAP_COUNTRIES } from '@/components/HtplyAbout/export-map-data'

countries.registerLocale(en)

// Danh sách nước chọn được: mọi nước có trên bản đồ (trừ Việt Nam) và có mã chuẩn quốc tế
const countryOptions = MAP_COUNTRIES
  .filter((c) => c.id !== '704' && countries.numericToAlpha2(c.id))
  .map((c) => ({ label: countries.getName(c.id, 'en') ?? c.name, value: c.id }))
  .sort((a, b) => a.label.localeCompare(b.label))

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About page',
  access: { read: anyone, update: authenticated },
  fields: [
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
  ],
}