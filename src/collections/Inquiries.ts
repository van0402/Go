import { APIError, type CollectionConfig } from 'payload'
import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { inquiryHtml, inquirySubject } from '../utilities/inquiryEmail'
import { clientIp, hitRateLimit } from '../utilities/rateLimit'

// Chống spam form báo giá (mỗi lần gửi = 1 email qua Resend)
const PER_IP_LIMIT = 5 // tối đa 5 lần / IP ...
const PER_IP_WINDOW_MS = 10 * 60 * 1000 // ... trong 10 phút
const GLOBAL_LIMIT = 100 // tổng tất cả khách tối đa 100 lần ...
const GLOBAL_WINDOW_MS = 60 * 60 * 1000 // ... trong 1 giờ

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
    beforeOperation: [
      ({ operation, req }) => {
        // Chỉ giới hạn khách vãng lai gửi form; admin tạo tay không bị chặn
        if (operation !== 'create' || req.user) return
        const ip = clientIp(req.headers)
        if (
          !hitRateLimit(`inquiry:ip:${ip}`, PER_IP_LIMIT, PER_IP_WINDOW_MS) ||
          !hitRateLimit('inquiry:all', GLOBAL_LIMIT, GLOBAL_WINDOW_MS)
        ) {
          throw new APIError('Too many requests, please try again later.', 429, undefined, true)
        }
      },
    ],
    beforeChange: [
      ({ data, operation, req }) => {
        // Khách gửi qua API công khai không được tự đặt trạng thái hay ghi chú nội bộ
        if (operation === 'create' && !req.user) {
          data.status = 'new'
          delete data.internalNote
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        const to = process.env.CONTACT_EMAIL_TO
        if (operation !== 'create' || !to) return doc
        try {
          const base = (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
          await req.payload.sendEmail({
            to,
            replyTo: doc.email || undefined, // bấm Reply là trả lời thẳng cho khách
            subject: inquirySubject(doc),
            html: inquiryHtml(doc, `${base}/admin/collections/inquiries/${doc.id}`),
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
