import type { Field, GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'

const optionList = (name: string, label: string): Field => ({
  name,
  label,
  type: 'array',
  labels: { singular: 'Option', plural: 'Options' },
  admin: { initCollapsed: true },   // các dòng tự kéo đổi thứ tự được
  fields: [
    {
      name: 'value',
      type: 'text',
      required: true,
      admin: { description: 'Code saved with each inquiry. No spaces or accents. Do not change after customers have used it.' },
    },
    {
      type: 'row',
      fields: [
        { name: 'labelEn', label: 'English', type: 'text', required: true },
        { name: 'labelFr', label: 'French', type: 'text', required: true },
        { name: 'labelEs', label: 'Spanish', type: 'text', required: true },
      ],
    },
    { name: 'active', label: 'Show on website', type: 'checkbox', defaultValue: true },
  ],
})

export const ContactOptions: GlobalConfig = {
  slug: 'contact-options',
  label: 'Contact Options',
  access: { read: anyone, update: authenticated },   // form công khai cần đọc được
  admin: { group: 'Sales' },
  fields: [
    optionList('productOptions', 'Product of interest'),
    optionList('quantityOptions', 'Estimated quantity'),
    optionList('incotermOptions', 'Preferred Incoterm'),
    optionList('timingOptions', 'Expected order timing'),
  ],
}