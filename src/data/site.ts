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
  subtitle: string
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
    bio: 'A versatile live music ensemble from Agartala, delivering memorable performances across genres, styles, and generations. Our talented musicians and vocalists adapt every performance to the mood, audience, and occasion.',
    footerBio:
      'Agartala’s premier live music band delivering unforgettable stage experiences across genres, styles, and generations. From sacred Puja melodies to electrifying festival rock.',
    credits: 'Crafted with passion in',
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
      subtitle:
        'From devotional sanctity to thunderous stage rock, Prakamp adapts effortlessly to every musical dimension and listener generation.',
    } satisfies SectionHeaderData,
    gallery: {
      badgeIcon: FaImages,
      badgeText: 'Live Experience',
      titlePrefix: 'Moments In',
      titleHighlight: 'Resonance',
      subtitle:
        'Glimpses of electrifying concerts, devotional Puja mornings, and celebrations across Tripura and beyond.',
      align: 'left' as const,
      seriesBadge: 'Live Concert Series',
    },
    members: {
      badgeIcon: FaUsers,
      badgeText: 'The Lineup',
      titlePrefix: 'Meet The',
      titleHighlight: 'Resonance',
      subtitle:
        'The artists and instrumentalists who bring the sonic soul of Prakamp to life on stage.',
    } satisfies SectionHeaderData,
    occasions: {
      badgeIcon: FaCalendarCheck,
      badgeText: 'Tailored Repertoire',
      titlePrefix: 'Music For',
      titleHighlight: 'Every Occasion',
      subtitle:
        'From devotional sanctity to corporate sophistication and high-octane stadium energy, our setlists are customized for your guests.',
    } satisfies SectionHeaderData,
    contact: {
      badgeIcon: FaPhoneAlt,
      badgeText: 'Get In Touch',
      titlePrefix: "Let's",
      titleHighlight: 'Connect',
      subtitle:
        'Ready to bring the live resonance of Prakamp to your event? Reach out to us directly.',
    } satisfies SectionHeaderData,
  },
} as const
