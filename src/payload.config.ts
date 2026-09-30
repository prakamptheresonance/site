import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { resendAdapter } from '@payloadcms/email-resend'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Members } from './collections/Members'
import { Genres } from './collections/Genres'
import { Occasions } from './collections/Occasions'
import { MemberRoles } from './collections/MemberRoles'
import { Contact } from './globals/Contact'
import { SiteSettings } from './globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    suppressHydrationWarning: true,
  },
  collections: [Users, Media, Members, Genres, Occasions, MemberRoles],
  globals: [Contact, SiteSettings],
  editor: lexicalEditor(),
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || '',
    defaultFromAddress: process.env.NEXT_PUBLIC_FROM_EMAIL || '',
    defaultFromName: process.env.NEXT_PUBLIC_FROM_NAME || '',
  }),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    push: true,
  }),
  sharp,
})
