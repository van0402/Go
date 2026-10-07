import type { CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  access: {
    create: anyone, // khách gửi form không cần đăng nhập
    read: authenticated, // chỉ admin xem được thông tin khách
    update: authenticated,
    delete: authenticated,
  },
  admin: {
    group: 'Sales',
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'company', 'country', 'email', 'status', 'createdAt'],
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        const to = process.env.CONTACT_EMAIL_TO
        if (operation !== 'create' || !to) return doc
        try {
          await req.payload.sendEmail({
            to,
            subject: `New quote request - ${doc.company}`,
            html: `
              <p><b>${doc.fullName}</b> (${doc.company}, ${doc.country})</p>
              <p>${doc.email} - ${doc.phone}</p>
              <p>Target market: ${doc.targetMarket ?? '-'} | Product: ${doc.product ?? '-'} | Quantity: ${doc.quantity ?? '-'}</p>
              <p>Incoterm: ${doc.incoterm ?? '-'} | Timing: ${doc.timing ?? '-'}</p>
              <p>${doc.message ?? ''}</p>`,
          })
        } catch (e) {
          req.payload.logger.error(e) // email lỗi vẫn giữ dữ liệu khách
        }
        return doc
      },
    ],
  },
  fields: [
  // Thẻ tiêu đề trên cùng (component vẽ tên, công ty, nhãn trạng thái)
  {
    name: 'headerCard',
    type: 'ui',
    admin: { components: { Field: '@/components/admin/InquiryHeader' } },
  },

  // ===== CỘT CHÍNH (bên trái) =====
  {
    type: 'collapsible',
    label: 'Customer',
    admin: { initCollapsed: false },
    fields: [
      {
        type: 'row',
        fields: [
          { name: 'fullName', type: 'text', required: true },
          { name: 'company', type: 'text', required: true },
        ],
      },
      {
        type: 'row',
        fields: [
          { name: 'email', type: 'email', required: true },
          { name: 'phone', type: 'text', required: true },
        ],
      },
      {
        type: 'row',
        fields: [
          { name: 'country', type: 'text', required: true },
          { name: 'targetMarket', type: 'text' },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Request',
    admin: { initCollapsed: false },
    fields: [
      {
        name: 'product',
        type: 'text',
      },
      {
        type: 'row',
        fields: [
          {
            name: 'quantity',
            type: 'text',
            admin: { width: '33%' },
          },
          {
            name: 'incoterm',
            type: 'text',
            admin: { width: '33%' },
          },
          {
            name: 'timing',
            type: 'text',
            admin: { width: '33%' },
          },
        ],
      },
    ],
  },
  {
    type: 'collapsible',
    label: 'Message',
    admin: { initCollapsed: false },
    fields: [{ name: 'message', type: 'textarea' }],
  },

  // ===== CỘT PHẢI (sidebar) =====
  {
    name: 'status',
    type: 'select',
    defaultValue: 'new',
    admin: {
      position: 'sidebar',
      components: { Cell: '@/components/admin/StatusCell' },
    },
    options: [
      { label: 'New', value: 'new' },
      { label: 'Contacted', value: 'contacted' },
      { label: 'Closed', value: 'closed' },
    ],
  },
  {
    name: 'summaryCard',
    type: 'ui',
    admin: { position: 'sidebar', components: { Field: '@/components/admin/InquirySummary' } },
  },
  {
    name: 'internalNote',
    type: 'textarea',
    label: 'Internal note',
    admin: { position: 'sidebar', description: 'Only visible to admin.' },
  },
  { name: 'locale', type: 'text', admin: { position: 'sidebar', readOnly: true } },
],
}
