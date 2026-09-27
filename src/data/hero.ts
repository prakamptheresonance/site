import { SITE_CONFIG } from './site'

export interface HeroAction {
  label: string
  href: string
  variant: 'primary' | 'secondary'
  isExternal?: boolean
}

export const HERO_CONTENT = {
  locationBadge: SITE_CONFIG.sections.hero.badgeText,
  titlePrefix: SITE_CONFIG.brand.name,
  titleHighlight: SITE_CONFIG.brand.highlight,
  slogan: SITE_CONFIG.brand.slogan,
  description: SITE_CONFIG.brand.bio,
  actions: {
    primary: {
      label: SITE_CONFIG.ctas.bookEvent,
      href: '#contact',
    },
    secondary: {
      label: SITE_CONFIG.ctas.exploreRepertoire,
      href: '#expertise',
    },
  },
}
