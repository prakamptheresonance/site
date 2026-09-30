import { getContactData, getGenresData, getSiteSettingsData } from '@/lib/data'
import { Hero } from '@/components/landing/hero'

export const revalidate = 300

export default async function HeroSlot() {
  const [contact, genres, siteSettings] = await Promise.all([
    getContactData(),
    getGenresData(),
    getSiteSettingsData(),
  ])

  return (
    <Hero
      whatsappNumber={contact.whatsappNumber}
      whatsappPrompt={contact.whatsappPrompt}
      genreCount={genres.length}
      description={siteSettings.heroDescription}
    />
  )
}
