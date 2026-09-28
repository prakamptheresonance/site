import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Contact, Media, Member, SiteSetting } from '@/payload-types'

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
          alt: doc.caption || '',
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

export interface CleanSiteSettings {
  title?: string
  description?: string
  keywords?: string[]
  brandName?: string
  ogImage?: string
  ogTitle?: string
  ogDescription?: string
  twitterHandle?: string
  twitterCard?: 'summary_large_image' | 'summary'
}

export async function getSiteSettingsData(): Promise<CleanSiteSettings> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result: SiteSetting = await payload.findGlobal({
      slug: 'site-settings',
      depth: 1,
    })

    if (result) {
      const keywordsRaw = result.keywords || ''
      const keywords = keywordsRaw
        ? keywordsRaw
            .split(',')
            .map((k: string) => k.trim())
            .filter(Boolean)
        : undefined

      let ogImageUrl = result.ogImage
      if (ogImageUrl && !ogImageUrl.startsWith('http')) {
        const endpoint =
          process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(/\/+$/, '') ||
          ''
        ogImageUrl = endpoint
          ? `${endpoint}${ogImageUrl.startsWith('/') ? '' : '/'}${ogImageUrl}`
          : ogImageUrl
      }

      return {
        title: result.title || undefined,
        description: result.description || undefined,
        keywords,
        brandName: result.brandName || undefined,
        ogImage: ogImageUrl || undefined,
        ogTitle: result.ogTitle || undefined,
        ogDescription: result.ogDescription || undefined,
        twitterHandle: result.twitterHandle || undefined,
        twitterCard: (result.twitterCard as any) || undefined,
      }
    }
  } catch (error: any) {
    const errCode = error?.code || error?.cause?.code
    if (errCode !== '42P01' && errCode !== '42703') {
      console.error('[Payload Data] Error loading site-settings global:', error)
    }
  }

  return {}
}

export type { SocialLinkItem } from '@/data/socials'
export { getMemberSocialLinks, getContactSocialLinks } from '@/data/socials'
