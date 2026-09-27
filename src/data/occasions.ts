import type { IconType } from 'react-icons'
import {
  FaGlassCheers,
  FaBuilding,
  FaCampground,
} from 'react-icons/fa'
import { GiTempleDoor, GiMusicalNotes } from 'react-icons/gi'

export interface OccasionItem {
  id: string
  title: string
  tag: string
  description: string
  icon: IconType
  bullets: string[]
}

export const OCCASIONS: OccasionItem[] = [
  {
    id: 'puja',
    title: 'Puja & Cultural Programmes',
    tag: 'Spiritual & Traditional',
    description:
      'Devotional Bhajans, Aarti tunes, Rabindra Sangeet, and festive Bengali classics designed for sacred festivities.',
    icon: GiTempleDoor,
    bullets: ['Durga Puja & Kali Puja Nights', 'Bhajan Sandhyas & Kirtans', 'Cultural Evenings & Utsavs'],
  },
  {
    id: 'festivals',
    title: 'Festivals & Concerts',
    tag: 'Electrifying Crowds',
    description:
      'High-energy stage performances that rally youth festivals, open-air carnivals, and grand stadium crowds.',
    icon: FaCampground,
    bullets: ['College & University Fests', 'State & Music Festivals', 'Open-Air Concert Stages'],
  },
  {
    id: 'corporate',
    title: 'Corporate Events & Galas',
    tag: 'Sophisticated & Engaging',
    description:
      'Sophisticated saxophone, acoustic lounge, and crowd-pleasing contemporary hits for business leaders.',
    icon: FaBuilding,
    bullets: ['Annual Corporate Bashes', 'Award Ceremonies & Dinners', 'Cocktail & Executive Lounges'],
  },
  {
    id: 'weddings',
    title: 'Weddings & Celebrations',
    tag: 'Heartwarming Romance',
    description:
      'Soulful melodies, romantic Bollywood favorites, and lively dance tracks for the bride, groom, and family.',
    icon: FaGlassCheers,
    bullets: ['Sangeet & Mehendi Beats', 'Grand Wedding Receptions', 'Private Anniversaries'],
  },
  {
    id: 'orchestra',
    title: 'Stage Shows & Auditions',
    tag: 'Symphonic Depth',
    description:
      'Orchestral arrangements with rich instrumentation, bilingual vocals, and customized concert setlists.',
    icon: GiMusicalNotes,
    bullets: ['Auditorium Live Concerts', 'Tribute & Retro Nights', 'Instrumental Solo Ensembles'],
  },
]
