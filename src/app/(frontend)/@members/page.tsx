import React from 'react'
import { getGroupsData, getMembersData, getSiteSettingsData } from '@/lib/data'
import { MembersSection } from '@/components/landing/members-section'

export const revalidate = 300

export default async function MembersSlot() {
  const [members, siteSettings, groups] = await Promise.all([
    getMembersData(),
    getSiteSettingsData(),
    getGroupsData(),
  ])

  return (
    <MembersSection
      members={members}
      groups={groups}
      subtitle={siteSettings.membersDescription}
    />
  )
}
