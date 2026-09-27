import type { IconType } from 'react-icons'
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { SITE_CONFIG } from './site'

export interface ContactCardItem {
  id: 'phone' | 'email' | 'address'
  label: string
  icon: IconType
  iconStyle: string
  primaryText: string
  primaryHref?: string
  secondaryText?: string
  secondaryHref?: string
  actionText?: string
  actionHref?: string
}

export interface WhatsAppBookingData {
  cleanNumber: string
  url: string
  title: string
  badge: string
  subtitle: string
  actionLabel: string
}

export function getWhatsAppBookingData(
  whatsappNumber?: string,
  whatsappPrompt?: string,
): WhatsAppBookingData {
  const cleanNumber = (whatsappNumber || '').replace(/[^0-9]/g, '')
  const defaultPrompt =
    'Hello Prakamp! I would like to inquire about booking your band for an upcoming event.'
  const prompt = encodeURIComponent(whatsappPrompt || defaultPrompt)
  const url = cleanNumber ? `https://wa.me/${cleanNumber}?text=${prompt}` : '#contact'

  return {
    cleanNumber,
    url,
    title: 'Chat with Our Band Manager',
    badge: 'Instant WhatsApp Booking',
    subtitle: 'Fast response for event dates, quotes, and custom setlists.',
    actionLabel: SITE_CONFIG.ctas.startWhatsAppChat,
  }
}

export function getContactCardItems(contact: {
  primaryPhone?: string
  secondaryPhone?: string
  email?: string
  address?: string
  googleMapsUrl?: string
}): ContactCardItem[] {
  const cards: ContactCardItem[] = []

  if (contact.primaryPhone) {
    cards.push({
      id: 'phone',
      label: 'Call Directly',
      icon: FaPhoneAlt,
      iconStyle: 'bg-amber-500/10 border-amber-500/30 text-amber-400',
      primaryText: contact.primaryPhone,
      primaryHref: `tel:${contact.primaryPhone.replace(/\s+/g, '')}`,
      secondaryText: contact.secondaryPhone || undefined,
      secondaryHref: contact.secondaryPhone
        ? `tel:${contact.secondaryPhone.replace(/\s+/g, '')}`
        : undefined,
    })
  }

  if (contact.email) {
    cards.push({
      id: 'email',
      label: 'Email Inquiries',
      icon: FaEnvelope,
      iconStyle: 'bg-neutral-900 border-neutral-800 text-neutral-300',
      primaryText: contact.email,
      primaryHref: `mailto:${contact.email}`,
    })
  }

  if (contact.address) {
    cards.push({
      id: 'address',
      label: 'Headquarters',
      icon: FaMapMarkerAlt,
      iconStyle: 'bg-neutral-900 border-neutral-800 text-amber-400',
      primaryText: contact.address,
      actionText: contact.googleMapsUrl ? 'Google Maps →' : undefined,
      actionHref: contact.googleMapsUrl || undefined,
    })
  }

  return cards
}
