import { ExpertiseGrid } from '@/components/landing/expertise-grid'
import { getGenresData, getSiteSettingsData } from '@/lib/data'

export const revalidate = 300

export default async function ExpertiseSlot() {
  const [genres, siteSettings] = await Promise.all([
    getGenresData(),
    getSiteSettingsData(),
  ])

  return <ExpertiseGrid genres={genres} subtitle={siteSettings.genreDescription} />
}
