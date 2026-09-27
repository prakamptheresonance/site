import type { IconType } from 'react-icons'
import {
  FaGuitar,
  FaMusic,
  FaHeart,
  FaFire,
  FaMicrophoneAlt,
} from 'react-icons/fa'
import {
  GiViolin,
  GiSaxophone,
  GiIndianPalace,
  GiFlute,
  GiMusicalScore,
  GiAcousticMegaphone,
} from 'react-icons/gi'

export interface GenreItem {
  id: string
  title: string
  subtitle: string
  icon: IconType
  accent: string
  highlight: string
}

export const GENRES: GenreItem[] = [
  {
    id: 'classical',
    title: 'Classical & Semi-Classical',
    subtitle: 'Ragas, Thumri, Bandish, and timeless acoustic compositions with traditional grace.',
    icon: GiViolin,
    accent: 'from-amber-500/20 to-amber-700/10',
    highlight: 'Pure Ragas & Heritage',
  },
  {
    id: 'bhajan',
    title: 'Bhajan & Devotional Music',
    subtitle: 'Soul-stirring spiritual chants, Krishna & Shiva Bhajans, and divine devotional melodies for Puja.',
    icon: GiIndianPalace,
    accent: 'from-orange-500/20 to-amber-700/10',
    highlight: 'Divine Resonance',
  },
  {
    id: 'sufi',
    title: 'Sufi & Ghazal',
    subtitle: 'Mystical poetry and soulful renditions that touch the deepest corners of the heart.',
    icon: GiFlute,
    accent: 'from-emerald-500/20 to-teal-700/10',
    highlight: 'Poetic & Mystical',
  },
  {
    id: 'retro',
    title: 'Retro Hindi — 80s & 90s',
    subtitle: 'Nostalgic golden era classics of Kishore, RD Burman, Mohammed Rafi, and 90s timeless hits.',
    icon: FaMusic,
    accent: 'from-yellow-500/20 to-amber-600/10',
    highlight: 'Golden Era Melodies',
  },
  {
    id: 'bollywood',
    title: 'Bollywood & Contemporary',
    subtitle: 'Current chartbusters, romantic anthems, and modern club medleys that keep audiences on their feet.',
    icon: FaMicrophoneAlt,
    accent: 'from-purple-500/20 to-indigo-700/10',
    highlight: 'Chartbusters & Hits',
  },
  {
    id: 'hindi-bengali',
    title: 'Hindi & Bengali Songs',
    subtitle: 'Bilingual versatility delivering modern and traditional Bengali masterpieces and Hindi favorites.',
    icon: GiMusicalScore,
    accent: 'from-blue-500/20 to-cyan-700/10',
    highlight: 'Bilingual Mastery',
  },
  {
    id: 'folk-baul',
    title: 'Bengali Folk & Baul',
    subtitle: 'Rich earthen tunes of rural Bengal, Lalon Geeti, Bhatiyali, and folk rhythms with authentic soul.',
    icon: GiAcousticMegaphone,
    accent: 'from-amber-600/20 to-red-700/10',
    highlight: 'Roots of Bengal',
  },
  {
    id: 'orchestra',
    title: 'Orchestra & Live Performances',
    subtitle: 'Full sonic band arrangements with multi-instrumental layering, percussion, and symphonic depth.',
    icon: FaGuitar,
    accent: 'from-rose-500/20 to-pink-700/10',
    highlight: 'Grand Stage Sound',
  },
  {
    id: 'saxophone',
    title: 'Saxophone & Instrumental Music',
    subtitle: 'Warm brass, soothing woodwind, and instrumental solos perfect for elite receptions and cocktail hours.',
    icon: GiSaxophone,
    accent: 'from-amber-400/25 to-yellow-600/10',
    highlight: 'Smooth Jazz & Brass',
  },
  {
    id: 'romantic',
    title: 'Romantic & Soulful Songs',
    subtitle: 'Intimate acoustics, heartwarming ballads, and gentle rhythms crafted for weddings and couples.',
    icon: FaHeart,
    accent: 'from-pink-500/20 to-rose-700/10',
    highlight: 'Intimate & Emotional',
  },
  {
    id: 'stage',
    title: 'Energetic Stage Performances',
    subtitle: 'High-octane fusion, festival rock, and crowd-electrifying anthems that ignite massive festival grounds.',
    icon: FaFire,
    accent: 'from-red-500/25 to-amber-600/10',
    highlight: 'High-Voltage Energy',
  },
]
