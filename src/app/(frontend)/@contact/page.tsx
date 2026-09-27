import React from 'react'
import { getContactData } from '@/lib/data'
import { ContactSection } from '@/components/landing/contact-section'

export default async function ContactSlot() {
  const contact = await getContactData()

  return <ContactSection contact={contact} />
}
