import React from 'react'
import { getMembersData, getSiteSettingsData } from '@/lib/data'
import { MembersSection } from '@/components/landing/members-section'

export const revalidate = 300

export default async function MembersSlot() {
  const [members, siteSettings] = await Promise.all([
    getMembersData(),
    getSiteSettingsData(),
  ])

  return <MembersSection members={members} subtitle={siteSettings.membersDescription} />
}
