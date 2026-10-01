import type { IconType } from 'react-icons'
import {
  FaMusic,
  FaUsers,
  FaImages,
  FaCalendarCheck,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from 'react-icons/fa'

export interface SectionHeaderData {
  badgeIcon: IconType
  badgeText: string
  titlePrefix: string
  titleHighlight: string
  titleSuffix?: string
  subtitle?: string
  align?: 'center' | 'left'
}

export const SITE_CONFIG = {
  brand: {
    name: 'PRAKAMP',
    highlight: 'THE RESONANCE',
    fullName: 'PRAKAMP : THE RESONANCE',
    slogan: 'One Band • Every Genre • Every Occasion',
    location: 'Agartala, Tripura',
    locationBadge: 'Agartala, Tripura • Live Music Band',
    credits: 'Crafted with passion in',
  },
  developer: {
    name: 'Debargha Saha',
    role: 'Developer',
    email: 'debarghasaha16@gmail.com',
    github: 'https://github.com/DEBargha2004',
    linkedin: 'https://linkedin.com/in/debargha-saha-07b738192',
    instagram: 'https://instagram.com/debargha6203',
  },
  ctas: {
    bookEvent: 'Book For Your Event',
    bookBand: 'Book Band',
    exploreRepertoire: 'Explore Musical Expertise',
    instantWhatsApp: 'Instant WhatsApp',
    chatWhatsApp: 'Chat on WhatsApp',
    bookForEvent: 'Book for Event',
    startWhatsAppChat: 'Start WhatsApp Chat',
    followSocial: 'Follow Prakamp On Social Media',
    payloadAdmin: 'Payload CMS Admin',
  },
  sections: {
    hero: {
      badgeIcon: FaMapMarkerAlt,
      badgeText: 'Agartala, Tripura • Live Music Band',
    },
    expertise: {
      badgeIcon: FaMusic,
      badgeText: 'Versatile Repertoire',
      titlePrefix: 'Our Musical',
      titleHighlight: 'Expertise',
    } satisfies SectionHeaderData,
    gallery: {
      badgeIcon: FaImages,
      badgeText: 'Live Experience',
      titlePrefix: 'Moments In',
      titleHighlight: 'Resonance',
      align: 'left' as const,
      seriesBadge: 'Live Concert Series',
    },
    members: {
      badgeIcon: FaUsers,
      badgeText: 'The Lineup',
      titlePrefix: 'Meet The',
      titleHighlight: 'Resonance',
    } satisfies SectionHeaderData,
    occasions: {
      badgeIcon: FaCalendarCheck,
      badgeText: 'Tailored Repertoire',
      titlePrefix: 'Music For',
      titleHighlight: 'Every Occasion',
    } satisfies SectionHeaderData,
    contact: {
      badgeIcon: FaPhoneAlt,
      badgeText: 'Get In Touch',
      titlePrefix: "Let's",
      titleHighlight: 'Connect',
    } satisfies SectionHeaderData,
  },
} as const
