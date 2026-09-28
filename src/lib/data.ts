import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Contact, Media, Member } from '@/payload-types'

export interface CleanMember {
  id: string | number
  name: string
  role: string
  imageUrl?: string
  socials?: {
    facebook?: string | null
    instagram?: string | null
  }
}

export interface CleanMedia {
  id: string | number
  url: string
  alt: string
  caption?: string
}

export interface CleanContact {
  primaryPhone?: string
  secondaryPhone?: string
  email?: string
  address?: string
  googleMapsUrl?: string
  whatsappNumber?: string
  whatsappPrompt?: string
  facebook?: string
  instagram?: string
  youtube?: string
}

export async function getMembersData(): Promise<CleanMember[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'members',
      limit: 100,
    })

    if (!result || !result.docs || result.docs.length === 0) {
      return []
    }

    return result.docs.map((doc: Member) => {
      const imageUrl =
        doc.image_path ||
        (doc as any).url ||
        (doc as any).imageUrl ||
        ''

      return {
        id: doc.id,
        name: doc.name,
        role: doc.role,
        imageUrl: imageUrl || undefined,
        socials: doc.socials || undefined,
      }
    })
  } catch (error) {
    console.error('[Payload Data] Error loading members:', error)
    return []
  }
}

export async function getMediaData(): Promise<CleanMedia[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'media',
      limit: 50,
    })

    if (!result || !result.docs || result.docs.length === 0) {
      return []
    }

    return result.docs
      .map((doc: Media) => {
        const url =
          doc.path ||
          (doc as any).url ||
          (doc as any).imageUrl ||
          ''
        return {
          id: doc.id,
          url,
          alt: doc.caption || 'Prakamp Live Performance',
          caption: doc.caption || undefined,
        }
      })
      .filter((item) => Boolean(item.url))
  } catch (error) {
    console.error('[Payload Data] Error loading media:', error)
    return []
  }
}

export async function getContactData(): Promise<CleanContact> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result: Contact = await payload.findGlobal({
      slug: 'contact',
      depth: 1,
    })

    if (result) {
      return {
        primaryPhone: result.primaryPhone || undefined,
        secondaryPhone: result.secondaryPhone || undefined,
        email: result.email || undefined,
        address: result.address || undefined,
        googleMapsUrl: result.googleMapsUrl || undefined,
        whatsappNumber: result.whatsappNumber || undefined,
        whatsappPrompt: result.whatsappPrompt || undefined,
        facebook: result.facebook || undefined,
        instagram: result.instagram || undefined,
        youtube: result.youtube || undefined,
      }
    }
  } catch (error) {
    console.error('[Payload Data] Error loading contact global:', error)
  }

  return {}
}

export type { SocialLinkItem } from '@/data/socials'
export { getMemberSocialLinks, getContactSocialLinks } from '@/data/socials'
