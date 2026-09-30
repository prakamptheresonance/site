import type { IconType } from 'react-icons'
import {
  FaGuitar,
  FaMusic,
  FaHeart,
  FaFire,
  FaMicrophoneAlt,
  FaDrum,
  FaHeadphones,
  FaCompactDisc,
  FaVolumeUp,
  FaBroadcastTower,
  FaStar,
  FaBolt,
  FaCampground,
  FaBuilding,
  FaGlassCheers,
  FaAward,
  FaTrophy,
  FaRing,
  FaTheaterMasks,
  FaCocktail,
} from 'react-icons/fa'
import {
  GiViolin,
  GiSaxophone,
  GiIndianPalace,
  GiFlute,
  GiMusicalScore,
  GiAcousticMegaphone,
  GiHarp,
  GiTrumpet,
  GiDrumKit,
  GiGrandPiano,
  GiMicrophone,
  GiMusicalKeyboard,
  GiTambourine,
  GiAccordion,
  GiClarinet,
  GiOcarina,
  GiAudioCassette,
  GiDoubleQuaver,
  GiSpeaker,
  GiTempleDoor,
  GiMusicalNotes,
  GiRingingBell,
  GiPartyPopper,
} from 'react-icons/gi'

export interface IconDefinition {
  key: string
  name: string
  category:
    | 'Instruments'
    | 'Vocals & Mic'
    | 'Devotional & Cultural'
    | 'Energy & Mood'
    | 'Audio & Stage'
    | 'Events & Occasions'
  tags: string[]
  icon: IconType
}

export const ICON_REGISTRY: IconDefinition[] = [
  // --- Occasions & Events ---
  {
    key: 'GiTempleDoor',
    name: 'Temple Gateway / Puja',
    category: 'Events & Occasions',
    tags: ['puja', 'temple', 'spiritual', 'traditional', 'devotional', 'aarti', 'kirtan', 'sacred'],
    icon: GiTempleDoor,
  },
  {
    key: 'FaCampground',
    name: 'Festival Stage / Concerts',
    category: 'Events & Occasions',
    tags: ['festival', 'concert', 'camp', 'open-air', 'carnival', 'fest', 'crowd', 'stadium'],
    icon: FaCampground,
  },
  {
    key: 'FaBuilding',
    name: 'Corporate Galas & Venues',
    category: 'Events & Occasions',
    tags: ['corporate', 'business', 'gala', 'building', 'executive', 'lounge', 'awards', 'dinner'],
    icon: FaBuilding,
  },
  {
    key: 'FaGlassCheers',
    name: 'Weddings & Celebrations',
    category: 'Events & Occasions',
    tags: ['wedding', 'cheers', 'celebration', 'marriage', 'sangeet', 'reception', 'toast', 'anniversary'],
    icon: FaGlassCheers,
  },
  {
    key: 'GiMusicalNotes',
    name: 'Stage Shows & Auditions',
    category: 'Events & Occasions',
    tags: ['stage', 'audition', 'orchestra', 'symphonic', 'concert', 'show', 'notes'],
    icon: GiMusicalNotes,
  },
  {
    key: 'FaAward',
    name: 'Award Ceremony',
    category: 'Events & Occasions',
    tags: ['award', 'ceremony', 'honour', 'recognition', 'annual', 'event'],
    icon: FaAward,
  },
  {
    key: 'FaTrophy',
    name: 'Trophy / Grand Prize',
    category: 'Events & Occasions',
    tags: ['trophy', 'championship', 'prize', 'competition', 'gala'],
    icon: FaTrophy,
  },
  {
    key: 'FaRing',
    name: 'Wedding Rings / Sangeet',
    category: 'Events & Occasions',
    tags: ['wedding', 'ring', 'sangeet', 'mehendi', 'engagement', 'marriage'],
    icon: FaRing,
  },
  {
    key: 'FaTheaterMasks',
    name: 'Theater & Cultural Shows',
    category: 'Events & Occasions',
    tags: ['theater', 'drama', 'cultural', 'masks', 'evening', 'performance'],
    icon: FaTheaterMasks,
  },
  {
    key: 'FaCocktail',
    name: 'Cocktail & Evening Lounge',
    category: 'Events & Occasions',
    tags: ['cocktail', 'lounge', 'party', 'drinks', 'evening', 'executive'],
    icon: FaCocktail,
  },
  {
    key: 'GiPartyPopper',
    name: 'Celebration Confetti',
    category: 'Events & Occasions',
    tags: ['party', 'celebration', 'confetti', 'festive', 'carnival', 'cheer'],
    icon: GiPartyPopper,
  },

  // --- Genres & Musical Instruments ---
  {
    key: 'GiViolin',
    name: 'Violin / Fiddle',
    category: 'Instruments',
    tags: ['violin', 'strings', 'classical', 'semi-classical', 'orchestra', 'bow'],
    icon: GiViolin,
  },
  {
    key: 'GiIndianPalace',
    name: 'Indian Palace / Temple',
    category: 'Devotional & Cultural',
    tags: ['bhajan', 'devotional', 'palace', 'mandir', 'temple', 'spiritual', 'indian', 'heritage'],
    icon: GiIndianPalace,
  },
  {
    key: 'GiFlute',
    name: 'Flute / Bansuri',
    category: 'Instruments',
    tags: ['flute', 'bansuri', 'sufi', 'ghazal', 'wind', 'krishna', 'classical', 'melody'],
    icon: GiFlute,
  },
  {
    key: 'FaMusic',
    name: 'Music Notes',
    category: 'Audio & Stage',
    tags: ['music', 'notes', 'retro', 'melody', 'tunes', 'classic', '80s', '90s'],
    icon: FaMusic,
  },
  {
    key: 'FaMicrophoneAlt',
    name: 'Microphone Stand',
    category: 'Vocals & Mic',
    tags: ['microphone', 'mic', 'bollywood', 'vocals', 'singing', 'singer', 'stage', 'live'],
    icon: FaMicrophoneAlt,
  },
  {
    key: 'GiMusicalScore',
    name: 'Musical Score Sheet',
    category: 'Audio & Stage',
    tags: ['score', 'sheet', 'notation', 'hindi', 'bengali', 'composition', 'lyrics'],
    icon: GiMusicalScore,
  },
  {
    key: 'GiAcousticMegaphone',
    name: 'Megaphone / Acoustic Folk',
    category: 'Devotional & Cultural',
    tags: ['megaphone', 'folk', 'baul', 'bengali', 'traditional', 'ektara', 'village'],
    icon: GiAcousticMegaphone,
  },
  {
    key: 'FaGuitar',
    name: 'Acoustic / Electric Guitar',
    category: 'Instruments',
    tags: ['guitar', 'strings', 'orchestra', 'acoustic', 'electric', 'band', 'rock'],
    icon: FaGuitar,
  },
  {
    key: 'GiSaxophone',
    name: 'Saxophone',
    category: 'Instruments',
    tags: ['saxophone', 'sax', 'brass', 'jazz', 'instrumental', 'wind', 'solo'],
    icon: GiSaxophone,
  },
  {
    key: 'FaHeart',
    name: 'Heart / Romantic',
    category: 'Energy & Mood',
    tags: ['heart', 'love', 'romantic', 'soulful', 'passion', 'slow', 'ballad'],
    icon: FaHeart,
  },
  {
    key: 'FaFire',
    name: 'Fire / High Energy',
    category: 'Energy & Mood',
    tags: ['fire', 'flame', 'energy', 'stage', 'rock', 'power', 'electrifying', 'fast'],
    icon: FaFire,
  },
  {
    key: 'GiGrandPiano',
    name: 'Grand Piano',
    category: 'Instruments',
    tags: ['piano', 'keyboard', 'grand', 'keys', 'classical', 'acoustic'],
    icon: GiGrandPiano,
  },
  {
    key: 'GiMusicalKeyboard',
    name: 'Synthesizer / Keyboard',
    category: 'Instruments',
    tags: ['keyboard', 'synth', 'piano', 'electric', 'harmonium', 'organ'],
    icon: GiMusicalKeyboard,
  },
  {
    key: 'GiHarp',
    name: 'Harp',
    category: 'Instruments',
    tags: ['harp', 'strings', 'classical', 'celestial', 'gentle'],
    icon: GiHarp,
  },
  {
    key: 'GiTrumpet',
    name: 'Trumpet / Brass',
    category: 'Instruments',
    tags: ['trumpet', 'brass', 'horn', 'fanfare', 'orchestra'],
    icon: GiTrumpet,
  },
  {
    key: 'GiClarinet',
    name: 'Clarinet / Shehnai',
    category: 'Instruments',
    tags: ['clarinet', 'shehnai', 'wind', 'instrument', 'folk'],
    icon: GiClarinet,
  },
  {
    key: 'GiDrumKit',
    name: 'Drum Kit',
    category: 'Instruments',
    tags: ['drums', 'kit', 'percussion', 'beat', 'rhythm', 'rock', 'band'],
    icon: GiDrumKit,
  },
  {
    key: 'FaDrum',
    name: 'Hand Drum / Dholak / Tabla',
    category: 'Instruments',
    tags: ['drum', 'percussion', 'tabla', 'dholak', 'beat', 'folk', 'rhythm'],
    icon: FaDrum,
  },
  {
    key: 'GiTambourine',
    name: 'Tambourine / Khanjani',
    category: 'Instruments',
    tags: ['tambourine', 'percussion', 'jingle', 'folk', 'kirtan', 'rhythm'],
    icon: GiTambourine,
  },
  {
    key: 'GiAccordion',
    name: 'Accordion / Harmonium',
    category: 'Instruments',
    tags: ['accordion', 'harmonium', 'bellows', 'retro', 'folk'],
    icon: GiAccordion,
  },
  {
    key: 'GiOcarina',
    name: 'Ocarina / Whistle',
    category: 'Instruments',
    tags: ['ocarina', 'wind', 'clay', 'folk', 'whistle'],
    icon: GiOcarina,
  },
  {
    key: 'GiMicrophone',
    name: 'Vintage Studio Mic',
    category: 'Vocals & Mic',
    tags: ['mic', 'microphone', 'studio', 'vintage', 'recording', 'vocalist'],
    icon: GiMicrophone,
  },
  {
    key: 'FaHeadphones',
    name: 'Studio Headphones',
    category: 'Vocals & Mic',
    tags: ['headphones', 'audio', 'listening', 'studio', 'monitoring'],
    icon: FaHeadphones,
  },
  {
    key: 'GiRingingBell',
    name: 'Ghungroo / Ghanti Bell',
    category: 'Devotional & Cultural',
    tags: ['bell', 'ghungroo', 'ghanti', 'dance', 'devotional', 'temple', 'chime'],
    icon: GiRingingBell,
  },
  {
    key: 'GiDoubleQuaver',
    name: 'Double Note Harmony',
    category: 'Audio & Stage',
    tags: ['note', 'notes', 'harmony', 'melody', 'tune', 'music'],
    icon: GiDoubleQuaver,
  },
  {
    key: 'FaCompactDisc',
    name: 'Compact Disc / CD',
    category: 'Audio & Stage',
    tags: ['cd', 'disc', 'album', 'track', 'audio'],
    icon: FaCompactDisc,
  },
  {
    key: 'GiAudioCassette',
    name: 'Retro Cassette Tape',
    category: 'Audio & Stage',
    tags: ['cassette', 'tape', 'retro', 'vintage', '90s', 'audio'],
    icon: GiAudioCassette,
  },
  {
    key: 'GiSpeaker',
    name: 'Stage Monitor Speaker',
    category: 'Audio & Stage',
    tags: ['speaker', 'audio', 'sound', 'stage', 'loud', 'bass'],
    icon: GiSpeaker,
  },
  {
    key: 'FaVolumeUp',
    name: 'Acoustic Soundwaves',
    category: 'Audio & Stage',
    tags: ['volume', 'loud', 'sound', 'audio', 'waves'],
    icon: FaVolumeUp,
  },
  {
    key: 'FaBroadcastTower',
    name: 'Broadcast / Radio Transmission',
    category: 'Audio & Stage',
    tags: ['broadcast', 'radio', 'airwaves', 'transmission', 'live'],
    icon: FaBroadcastTower,
  },
  {
    key: 'FaStar',
    name: 'Starlight / Celebrity',
    category: 'Energy & Mood',
    tags: ['star', 'celebrity', 'stage', 'spotlight', 'favorite', 'sparkle'],
    icon: FaStar,
  },
  {
    key: 'FaBolt',
    name: 'High Voltage / Electric',
    category: 'Energy & Mood',
    tags: ['bolt', 'lightning', 'energy', 'electric', 'power', 'fast'],
    icon: FaBolt,
  },
]

export const ICON_MAP = new Map<string, IconDefinition>(
  ICON_REGISTRY.map((item) => [item.key, item]),
)

export function getIconByKey(key: string): IconType | null {
  return ICON_MAP.get(key)?.icon || null
}
