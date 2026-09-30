import { getContactData, getSiteSettingsData } from '@/lib/data'
import { ContactSection } from '@/components/landing/contact-section'

export const revalidate = 300

export default async function ContactSlot() {
  const [contact, siteSettings] = await Promise.all([
    getContactData(),
    getSiteSettingsData(),
  ])

  return <ContactSection contact={contact} subtitle={siteSettings.contactDescription} />
}
