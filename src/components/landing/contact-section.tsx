'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import type { CleanContact } from '@/lib/data'
import { getContactSocialLinks } from '@/data/socials'
import { getWhatsAppBookingData, getContactCardItems } from '@/data/contact'
import { SITE_CONFIG } from '@/data/site'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassCard } from '@/components/ui/glass-card'
import { SocialButton } from '@/components/ui/social-button'

interface ContactSectionProps {
  contact: CleanContact
}

export function ContactSection({ contact }: ContactSectionProps) {
  const socialLinks = getContactSocialLinks(contact)
  const waData = getWhatsAppBookingData(contact.whatsappNumber, contact.whatsappPrompt)
  const contactCards = getContactCardItems(contact)

  const hasAnyContact =
    Boolean(waData.cleanNumber) || contactCards.length > 0 || socialLinks.length > 0

  if (!hasAnyContact) {
    return null
  }

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-black">
      {/* Background Ambience */}
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-emerald-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading headerData={SITE_CONFIG.sections.contact} />

        <div className="flex flex-col gap-6">
          {/* WhatsApp Direct Action Banner */}
          {waData.cleanNumber && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/50 via-neutral-900 to-neutral-950 border border-emerald-500/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md flex-shrink-0">
                  <FaWhatsapp className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">
                    {waData.badge}
                  </span>
                  <h3 className="text-2xl font-black text-white">{waData.title}</h3>
                  <p className="text-neutral-400 text-xs mt-0.5">{waData.subtitle}</p>
                </div>
              </div>

              <motion.a
                href={waData.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm tracking-wide shadow-lg shadow-emerald-600/25 transition-all flex-shrink-0"
              >
                <FaWhatsapp className="w-5 h-5" />
                <span>{waData.actionLabel}</span>
              </motion.a>
            </motion.div>
          )}

          {/* Details Grid: Phone, Email, Location (Data-driven array) */}
          {contactCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {contactCards.map((card) => {
                const CardIcon = card.icon

                return (
                  <GlassCard
                    key={card.id}
                    className="p-6 flex flex-col justify-between border border-neutral-800"
                  >
                    <div>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 border ${card.iconStyle}`}
                      >
                        <CardIcon className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-1">
                        {card.label}
                      </h4>

                      {card.primaryHref ? (
                        <a
                          href={card.primaryHref}
                          className="block font-bold text-white hover:text-amber-400 transition-colors text-base break-all"
                        >
                          {card.primaryText}
                        </a>
                      ) : (
                        <p className="text-neutral-300 text-xs leading-relaxed">
                          {card.primaryText}
                        </p>
                      )}

                      {card.secondaryText && card.secondaryHref && (
                        <a
                          href={card.secondaryHref}
                          className="block text-sm text-neutral-400 hover:text-white transition-colors mt-0.5"
                        >
                          {card.secondaryText}
                        </a>
                      )}

                      {card.actionText && card.actionHref && (
                        <a
                          href={card.actionHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-amber-400 hover:underline mt-2 inline-block font-medium"
                        >
                          {card.actionText}
                        </a>
                      )}
                    </div>
                  </GlassCard>
                )
              })}
            </div>
          )}

          {/* Social Profiles Row (Data-driven array) */}
          {socialLinks.length > 0 && (
            <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-neutral-400 uppercase tracking-wider font-semibold">
                {SITE_CONFIG.ctas.followSocial}
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => (
                  <SocialButton
                    key={s.platform}
                    platform={s.platform}
                    href={s.href}
                    label={s.label}
                    size="lg"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
