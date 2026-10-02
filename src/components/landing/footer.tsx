'use client'

import { FaMusic, FaShieldAlt, FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa'
import { GiSoundWaves } from 'react-icons/gi'
import type { CleanContact } from '@/lib/data'
import { getContactSocialLinks } from '@/data/socials'
import { getFooterNavLinks } from '@/data/navigation'
import { SITE_CONFIG } from '@/data/site'
import { SocialButton } from '@/components/ui/social-button'

interface FooterProps {
  contact: CleanContact
  genreCount?: number
  footerBio?: string
}

export function Footer({ contact, genreCount, footerBio }: FooterProps) {
  const currentYear = new Date().getFullYear()
  const socialLinks = getContactSocialLinks(contact)
  const navLinks = getFooterNavLinks(genreCount)

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400 pt-16 pb-12 relative overflow-hidden">
      {/* Subtle Soundwave Glow Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-500/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-neutral-900">
          {/* Col 1: Brand & Slogan */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 shrink-0 rounded-full bg-amber-500 flex items-center justify-center text-black font-extrabold shadow-md shadow-amber-500/20">
                <FaMusic className="w-4 h-4" />
              </div>
              <span className="font-extrabold text-2xl tracking-wider text-white font-heading">
                {SITE_CONFIG.brand.fullName}
              </span>
            </div>

            {footerBio && (
              <p className="text-sm text-neutral-400 max-w-md leading-relaxed mb-4">{footerBio}</p>
            )}

            <p className="text-xs text-amber-400/90 font-semibold tracking-wider uppercase">
              {SITE_CONFIG.brand.slogan}
            </p>
          </div>

          {/* Col 2: Navigation Links (Data-driven array) */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-amber-400 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Direct Connect & Admin */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Connect & Portals
            </h4>
            {socialLinks.length > 0 && (
              <div className="flex items-center gap-2.5 mb-6">
                {socialLinks.map((s) => (
                  <SocialButton
                    key={s.platform}
                    platform={s.platform}
                    href={s.href}
                    label={`Prakamp on ${s.label}`}
                    size="md"
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bottom Credits & Developer Attribution */}
        <div className="pt-8 border-t border-neutral-900/80 flex flex-col md:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <GiSoundWaves className="w-4 h-4 text-amber-500/80" />
            <span>
              &copy; {currentYear} {SITE_CONFIG.brand.fullName}. All rights reserved.
            </span>
          </div>

          {/* Developer Attribution Badge */}
          <div className="inline-flex items-center gap-2.5 text-neutral-400 bg-neutral-900/60 border border-neutral-800/80 px-3.5 py-1.5 rounded-full shadow-inner text-[11px]">
            <span>
              Crafted by{' '}
              <span className="text-white font-semibold tracking-wide">
                {SITE_CONFIG.developer.name}
              </span>
            </span>

            <div className="h-3 w-px bg-neutral-800" />

            <div className="flex items-center gap-2 text-neutral-400">
              {SITE_CONFIG.developer.github && (
                <a
                  href={SITE_CONFIG.developer.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  aria-label={`${SITE_CONFIG.developer.name} on GitHub`}
                  title="GitHub Profile"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                </a>
              )}
              {SITE_CONFIG.developer.linkedin && (
                <a
                  href={SITE_CONFIG.developer.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0a66c2] transition-colors"
                  aria-label={`${SITE_CONFIG.developer.name} on LinkedIn`}
                  title="LinkedIn Profile"
                >
                  <FaLinkedin className="w-3.5 h-3.5" />
                </a>
              )}
              {SITE_CONFIG.developer.instagram && (
                <a
                  href={SITE_CONFIG.developer.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#e4405f] transition-colors"
                  aria-label={`${SITE_CONFIG.developer.name} on Instagram`}
                  title="Instagram Profile"
                >
                  <FaInstagram className="w-3.5 h-3.5" />
                </a>
              )}
              {SITE_CONFIG.developer.email && (
                <a
                  href={`mailto:${SITE_CONFIG.developer.email}`}
                  className="hover:text-amber-400 transition-colors"
                  aria-label={`Email ${SITE_CONFIG.developer.name}`}
                  title={`Email: ${SITE_CONFIG.developer.email}`}
                >
                  <FaEnvelope className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
