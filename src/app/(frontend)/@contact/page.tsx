import { getContactData } from '@/lib/data'
import { ContactSection } from '@/components/landing/contact-section'

export const revalidate = 300

export default async function ContactSlot() {
  const contact = await getContactData()

  return <ContactSection contact={contact} />
}
