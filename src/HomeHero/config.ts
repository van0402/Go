import type { GlobalConfig } from 'payload'
import { anyone } from '@/access/anyone'
import { authenticated } from '@/access/authenticated'
import { sectionHeading as heading } from '@/fields/sectionHeading'

const text = (name: string, label: string, description?: string) =>
  ({ name, label, type: 'text', localized: true, admin: { description } }) as const

export const HomeHero: GlobalConfig = {
  slug: 'home-hero',
  label: 'Home · Hero',
  access: { read: anyone, update: authenticated },
  fields: [
    heading('heroHeading', 'Hero', 'Top banner of the Home page: small line, title and two buttons'),
    text('kicker', 'Small line above the title', 'e.g. Vietnam Leading Plywood Exporter'),
    text('titleLine1', 'Title, line 1', 'e.g. Built for quality.'),
    text('titleLine2', 'Title, line 2', 'e.g. Made for the world'),
    text('ctaQuote', 'Main button', 'e.g. Get a quote'),
    text('ctaProducts', 'Second button', 'e.g. Explore products'),
    heading('aboutHeading', 'About', 'The "About HTPLY" section under the banner'),
    text('aboutKicker', 'Big heading', 'e.g. About HTPLY'),
    text('aboutTitle', 'Subtitle', 'e.g. Trust built into every sheet'),
    { name: 'aboutIntro', label: 'Paragraph', type: 'textarea', localized: true },
  ],
}