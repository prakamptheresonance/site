export interface NavItem {
  href: string
  label: string
  mobileLabel?: string
}

export const NAV_ITEMS: readonly NavItem[] = [
  { href: '#about', label: 'About', mobileLabel: 'About Band' },
  { href: '#expertise', label: 'Genres', mobileLabel: 'Musical Expertise' },
  { href: '#gallery', label: 'Live Gallery', mobileLabel: 'Live Media Gallery' },
  { href: '#members', label: 'Members', mobileLabel: 'Band Members' },
  { href: '#occasions', label: 'Occasions', mobileLabel: 'Occasions & Events' },
  { href: '#contact', label: 'Contact', mobileLabel: 'Contact & Booking' },
] as const

export const FOOTER_NAV_LINKS: readonly NavItem[] = [
  { href: '#about', label: 'About The Band' },
  { href: '#expertise', label: '11 Musical Genres' },
  { href: '#gallery', label: 'Live Media Gallery' },
  { href: '#members', label: 'Band Lineup & Artists' },
  { href: '#occasions', label: 'Occasions & Shows' },
  { href: '#contact', label: 'Bookings & Connect' },
] as const
