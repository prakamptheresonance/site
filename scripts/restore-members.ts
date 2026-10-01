import 'dotenv/config'
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import configPromise from '../src/payload.config'

async function restore() {
  const backupPath = path.resolve(process.cwd(), 'scripts/members-backup.json')
  if (!fs.existsSync(backupPath)) {
    console.error('Backup file not found at:', backupPath)
    process.exit(1)
  }

  const backupData = JSON.parse(fs.readFileSync(backupPath, 'utf8'))
  const payload = await getPayload({ config: configPromise })

  console.log('Restoring members from backup...')
  const existingMembers = await payload.find({
    collection: 'members',
    limit: 100,
  })

  if (existingMembers.totalDocs > 0) {
    console.log(`Found ${existingMembers.totalDocs} existing members in database.`)
  }

  for (const member of backupData.members) {
    const existing = existingMembers.docs.find((m) => m.name === member.name)
    if (!existing) {
      console.log(`Restoring missing member: ${member.name}`)
      await payload.create({
        collection: 'members',
        data: {
          name: member.name,
          role: typeof member.role === 'object' ? member.role?.id : member.role,
          image_path: member.image_path,
          order: member.order ?? 0,
          socials: member.socials || {},
          isActive: member.isActive ?? true,
        } as any,
      })
    }
  }

  console.log('Restore verification complete.')
  process.exit(0)
}

restore().catch((err) => {
  console.error('Restore error:', err)
  process.exit(1)
})
