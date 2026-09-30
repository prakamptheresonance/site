import { getMediaData, getSiteSettingsData } from '@/lib/data'
import { MediaCarousel } from '@/components/landing/media-carousel'

export const revalidate = 300

export default async function GallerySlot() {
  const [media, siteSettings] = await Promise.all([
    getMediaData(),
    getSiteSettingsData(),
  ])

  return <MediaCarousel media={media} subtitle={siteSettings.galleryDescription} />
}
