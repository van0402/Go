import type { Field, RowField } from 'payload'

/**
 * Dùng với slugField({ overrides: optionalSlug }).
 * Ô slug không bắt buộc ở form admin: để trống thì máy chủ tự sinh từ tiêu đề khi lưu.
 * Cột trong database vẫn bắt buộc nên không cần migration.
 */
export const optionalSlug = (field: RowField): RowField => {
  field.fields = field.fields.map((f) =>
    'name' in f && f.name === 'slug' ? ({ ...f, validate: () => true as const } as Field) : f,
  )
  return field
}
