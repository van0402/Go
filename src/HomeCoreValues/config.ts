import type { Field, GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { sectionHeading } from '@/fields/sectionHeading'

// Chữ phần Core values ở trang Home. Ô nào để trống thì trang dùng chữ mặc định trong messages (home.values).
// Bánh xe luôn đúng 3 múi nên 3 giá trị là các ô cố định, không dùng danh sách thêm/bớt được.
const text = (name: string, label: string, description?: string, maxLength?: number): Field => ({
  name,
  label,
  type: 'text',
  localized: true,
  maxLength,
  admin: { description },
})

const textarea = (name: string, label: string, description?: string): Field => ({
  name,
  label,
  type: 'textarea',
  localized: true,
  admin: { description },
})

const value = (n: 1 | 2 | 3, color: string, example: string): Field[] => [
  sectionHeading(`value${n}Heading`, `Value ${n}`, `Shown on the ${color} part of the wheel`),
  text(`value${n}Name`, 'Name', `e.g. ${example}. Keep it short (max 14 characters) so it fits inside the wheel`, 14),
  textarea(`value${n}Description`, 'Description', 'Shown when a visitor hovers or taps this part of the wheel'),
]

export const HomeCoreValues: GlobalConfig = {
  slug: 'home-core-values',
  label: 'Home · Core values',
  access: { read: anyone, update: authenticated },
  fields: [
    sectionHeading('introHeading', 'Heading and introduction', 'Text above the wheel on the Home page'),
    text('kicker', 'Heading', 'e.g. Core values'),
    text('introTitle', 'Intro title', 'e.g. Quality you can check. Information you can see. Results you can repeat.'),
    textarea('introText', 'Intro paragraph'),
    ...value(1, 'yellow', 'Quality'),
    ...value(2, 'light green', 'Transparency'),
    ...value(3, 'dark green', 'Consistency'),
  ],
}
