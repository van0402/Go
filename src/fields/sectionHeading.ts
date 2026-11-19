import type { Field } from 'payload'

// Tiêu đề to, đậm chia nhóm ô trong trang admin (chỉ để nhìn, không lưu vào DB)
export const sectionHeading = (name: string, title: string, hint?: string): Field => ({
  name,
  type: 'ui',
  admin: { components: { Field: { path: '@/components/admin/SectionHeading', clientProps: { title, hint } } } },
})
