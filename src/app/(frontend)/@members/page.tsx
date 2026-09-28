import React from 'react'
import { getMembersData } from '@/lib/data'
import { MembersSection } from '@/components/landing/members-section'

export const revalidate = 300

export default async function MembersSlot() {
  const members = await getMembersData()

  return <MembersSection members={members} />
}
