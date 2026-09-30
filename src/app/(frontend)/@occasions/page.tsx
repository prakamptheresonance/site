import React from 'react'
import { OccasionsSection } from '@/components/landing/occasions-section'
import { getOccasionsData, getSiteSettingsData } from '@/lib/data'

export const revalidate = 300

export default async function OccasionsSlot() {
  const [occasions, siteSettings] = await Promise.all([
    getOccasionsData(),
    getSiteSettingsData(),
  ])

  return <OccasionsSection occasions={occasions} subtitle={siteSettings.occasionsDescription} />
}
