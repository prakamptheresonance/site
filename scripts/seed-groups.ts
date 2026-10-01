import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function seedGroups() {
  const payload = await getPayload({ config: configPromise })

  const groupTitles = ['Management', 'Vocalist', 'Musician']
  const groupMap: Record<string, number | string> = {}

  for (const title of groupTitles) {
    const existing = await payload.find({
      collection: 'groups',
      where: {
        title: {
          equals: title,
        },
      },
      limit: 1,
    })

    if (existing.docs.length > 0) {
      console.log(`Group "${title}" already exists with ID:`, existing.docs[0].id)
      groupMap[title] = existing.docs[0].id
    } else {
      const created = await payload.create({
        collection: 'groups',
        data: {
          title,
        },
      })
      console.log(`Created group "${title}" with ID:`, created.id)
      groupMap[title] = created.id
    }
  }

  // Now assign members to groups based on their role
  const members = await payload.find({
    collection: 'members',
    depth: 1,
    limit: 100,
  })

  console.log(`Found ${members.totalDocs} members to link with groups.`)

  // Map members to groups
  const groupMembersMap: Record<string, (string | number)[]> = {
    Management: [],
    Vocalist: [],
    Musician: [],
  }

  const groupOrder: Record<string, number> = {
    Management: 1,
    Vocalist: 2,
    Musician: 3,
  }

  for (const member of members.docs) {
    const roleTitle =
      typeof member.role === 'object' && member.role !== null
        ? (member.role as any).title
        : member.role

    let targetGroupTitle = 'Musician'
    if (roleTitle === 'Management') {
      targetGroupTitle = 'Management'
    } else if (roleTitle === 'Vocalist') {
      targetGroupTitle = 'Vocalist'
    }

    const targetGroupId = groupMap[targetGroupTitle]

    if (targetGroupId) {
      await payload.update({
        collection: 'members',
        id: member.id,
        data: {
          group: targetGroupId as any,
        },
      })
      groupMembersMap[targetGroupTitle]?.push(member.id)
      console.log(`Updated member "${member.name}" (${roleTitle}) -> Group: ${targetGroupTitle}`)
    }
  }

  // Update each group with its members list and display order
  for (const title of groupTitles) {
    const groupId = groupMap[title]
    if (groupId) {
      await payload.update({
        collection: 'groups',
        id: groupId,
        data: {
          order: groupOrder[title] ?? 0,
          members: groupMembersMap[title] as any,
        },
      })
      console.log(`Updated group "${title}" with ${groupMembersMap[title].length} draggable members.`)
    }
  }

  console.log('Seeding and linking groups completed successfully!')
  process.exit(0)
}

seedGroups().catch((err) => {
  console.error('Seeding groups failed:', err)
  process.exit(1)
})
