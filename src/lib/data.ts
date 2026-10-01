import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Contact, Genre, Media, Member, MemberRole, Occasion, SiteSetting } from '@/payload-types'

export interface CleanMemberRole {
  id: string | number
  title: string
  slug: string
  description?: string
}

export interface CleanOccasion {
  id: string | number
  title: string
  icon: string
  accent: string
  bullets: string[]
  order?: number
}

export interface CleanGenre {
  id: string | number
  title: string
  icon: string
  accent: string
  order?: number
}

export interface CleanGroup {
  id: string | number
  title: string
  order?: number
  memberIds?: (string | number)[]
}

export interface CleanMember {
  id: string | number
  name: string
  role: string
  roleSlug?: string
  group?: string
  groupId?: string | number
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
      where: {
        isActive: {
          equals: true,
        },
      },
      depth: 1,
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

      const roleTitle =
        typeof doc.role === 'object' && doc.role !== null
          ? (doc.role as any).title || ''
          : typeof doc.role === 'string'
            ? doc.role
            : ''

      const roleSlug =
        typeof doc.role === 'object' && doc.role !== null
          ? (doc.role as any).slug || undefined
          : undefined

      const groupTitle =
        typeof (doc as any).group === 'object' && (doc as any).group !== null
          ? (doc as any).group.title || ''
          : typeof (doc as any).group === 'string'
            ? (doc as any).group
            : undefined

      const groupId =
        typeof (doc as any).group === 'object' && (doc as any).group !== null
          ? (doc as any).group.id
          : typeof (doc as any).group === 'string' || typeof (doc as any).group === 'number'
            ? (doc as any).group
            : undefined

      return {
        id: doc.id,
        name: doc.name,
        role: roleTitle,
        roleSlug,
        group: groupTitle || undefined,
        groupId,
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
  heroDescription?: string
  genreDescription?: string
  galleryDescription?: string
  membersDescription?: string
  occasionsDescription?: string
  contactDescription?: string
  footerDescription?: string
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
        heroDescription: result.heroDescription || undefined,
        genreDescription: result.genreDescription || undefined,
        galleryDescription: result.galleryDescription || undefined,
        membersDescription: result.membersDescription || undefined,
        occasionsDescription: result.occasionsDescription || undefined,
        contactDescription: result.contactDescription || undefined,
        footerDescription: result.footerDescription || undefined,
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

export async function getGenresData(): Promise<CleanGenre[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'genres',
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
      limit: 100,
    })

    if (!result || !result.docs || result.docs.length === 0) {
      return []
    }

    return result.docs.map((doc: Genre) => ({
      id: doc.id,
      title: doc.title,
      icon: doc.icon || 'FaMusic',
      accent: doc.accent || 'from-amber-500/20 to-amber-700/10',
      order: doc.order ?? 0,
    }))
  } catch (error: any) {
    const errCode = error?.code || error?.cause?.code
    if (errCode !== '42P01' && errCode !== '42703') {
      console.error('[Payload Data] Error loading genres:', error)
    }
    return []
  }
}

export async function getOccasionsData(): Promise<CleanOccasion[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'occasions',
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: 'order',
      limit: 100,
    })

    if (!result || !result.docs || result.docs.length === 0) {
      return []
    }

    return result.docs.map((doc: Occasion) => {
      const bulletsList: string[] = Array.isArray(doc.bullets)
        ? doc.bullets
            .map((b: any) => (typeof b === 'object' && b !== null ? b.point : b))
            .filter(Boolean)
        : []

      return {
        id: doc.id,
        title: doc.title,
        icon: doc.icon || 'GiMusicalNotes',
        accent: doc.accent || 'from-amber-500/20 to-amber-700/10',
        bullets: bulletsList,
        order: doc.order ?? 0,
      }
    })
  } catch (error: any) {
    const errCode = error?.code || error?.cause?.code
    if (errCode !== '42P01' && errCode !== '42703') {
      console.error('[Payload Data] Error loading occasions:', error)
    }
    return []
  }
}

export async function getMemberRolesData(): Promise<CleanMemberRole[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'member-roles',
      where: {
        isActive: {
          equals: true,
        },
      },
      limit: 100,
    })

    if (!result || !result.docs || result.docs.length === 0) {
      return []
    }

    return result.docs.map((doc: MemberRole) => ({
      id: doc.id,
      title: doc.title,
      slug: doc.slug,
      description: doc.description || undefined,
    }))
  } catch (error: any) {
    const errCode = error?.code || error?.cause?.code
    if (errCode !== '42P01' && errCode !== '42703') {
      console.error('[Payload Data] Error loading member roles:', error)
    }
    return []
  }
}

export async function getGroupsData(): Promise<CleanGroup[]> {
  try {
    const payload = await getPayload({ config: configPromise })
    const result = await payload.find({
      collection: 'groups',
      limit: 100,
      depth: 0,
      sort: 'order',
    })

    if (!result || !result.docs || result.docs.length === 0) {
      return []
    }

    return result.docs.map((doc: any) => {
      const memberIds = Array.isArray(doc.members)
        ? doc.members.map((m: any) => (typeof m === 'object' && m !== null ? m.id : m))
        : []

      return {
        id: doc.id,
        title: doc.title,
        order: doc.order ?? 0,
        memberIds,
      }
    })
  } catch (error: any) {
    const errCode = error?.code || error?.cause?.code
    if (errCode !== '42P01' && errCode !== '42703') {
      console.error('[Payload Data] Error loading groups:', error)
    }
    return []
  }
}

export type { SocialLinkItem } from '@/data/socials'
export { getMemberSocialLinks, getContactSocialLinks } from '@/data/socials'
