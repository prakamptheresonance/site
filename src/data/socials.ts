export interface SocialLinkItem {
  platform: 'facebook' | 'instagram' | 'youtube' | 'whatsapp'
  href: string
  label: string
}

export interface MemberSocialSource {
  name: string
  socials?: {
    facebook?: string | null
    instagram?: string | null
  }
}

export interface ContactSocialSource {
  facebook?: string
  instagram?: string
  youtube?: string
}

export function getMemberSocialLinks(member: MemberSocialSource): SocialLinkItem[] {
  const links: SocialLinkItem[] = []
  if (member.socials?.facebook) {
    links.push({
      platform: 'facebook',
      href: member.socials.facebook,
      label: `${member.name} on Facebook`,
    })
  }
  if (member.socials?.instagram) {
    links.push({
      platform: 'instagram',
      href: member.socials.instagram,
      label: `${member.name} on Instagram`,
    })
  }
  return links
}

export function getContactSocialLinks(contact: ContactSocialSource): SocialLinkItem[] {
  const links: SocialLinkItem[] = []
  if (contact.facebook) {
    links.push({
      platform: 'facebook',
      href: contact.facebook,
      label: 'Prakamp on Facebook',
    })
  }
  if (contact.instagram) {
    links.push({
      platform: 'instagram',
      href: contact.instagram,
      label: 'Prakamp on Instagram',
    })
  }
  if (contact.youtube) {
    links.push({
      platform: 'youtube',
      href: contact.youtube,
      label: 'Prakamp on YouTube',
    })
  }
  return links
}
