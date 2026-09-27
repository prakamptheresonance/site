import React from 'react'
import { getContactData } from '@/lib/data'
import { Hero } from '@/components/landing/hero'

export default async function HeroSlot() {
  const contact = await getContactData()

  return (
    <Hero
      whatsappNumber={contact.whatsappNumber}
      whatsappPrompt={contact.whatsappPrompt}
    />
  )
}
