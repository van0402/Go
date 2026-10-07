import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { HtplyContact } from '@/components/HtplyContact/HtplyContact'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const options = await payload.findGlobal({ slug: 'contact-options' })
  return <HtplyContact options={options} />
}
