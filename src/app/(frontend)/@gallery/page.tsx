import React from 'react'
import { getMediaData } from '@/lib/data'
import { MediaCarousel } from '@/components/landing/media-carousel'

export default async function GallerySlot() {
  const media = await getMediaData()

  return <MediaCarousel media={media} />
}
