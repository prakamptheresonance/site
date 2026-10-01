'use client'

import React from 'react'
import { Image } from '@imagekit/next'
import { motion, type Variants } from 'framer-motion'
import { FaUser } from 'react-icons/fa'
import type { CleanMember } from '@/lib/data'
import { getMemberSocialLinks } from '@/data/socials'
import { SITE_CONFIG } from '@/data/site'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassCard } from '@/components/ui/glass-card'
import { SocialButton } from '@/components/ui/social-button'

interface MembersSectionProps {
  members: CleanMember[]
  subtitle?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export function MembersSection({ members, subtitle }: MembersSectionProps) {
  if (!members || members.length === 0) {
    return null
  }

  return (
    <section id="members" className="py-24 relative bg-black/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading headerData={SITE_CONFIG.sections.members} subtitle={subtitle} />

        {/* Member Cards Grid with Staggered Entrance */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {members.map((member) => {
            const socialLinks = getMemberSocialLinks(member)

            return (
              <motion.div key={member.id} variants={itemVariants}>
                <GlassCard className="flex flex-col group border border-neutral-800/80 overflow-hidden">
                  {/* Member Portrait - Clean & Unobstructed */}
                  <div className="relative aspect-9/16 w-full overflow-hidden bg-neutral-900">
                    {member.imageUrl ? (
                      <Image
                        src={member.imageUrl}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-neutral-600 bg-neutral-900">
                        <FaUser className="w-16 h-16 opacity-30" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent pointer-events-none" />
                  </div>

                  {/* Member Details & Clean Editorial Typography */}
                  <div className="p-6 flex items-center justify-between bg-neutral-950 border-t border-neutral-800/70">
                    <div>
                      <h3 className="text-xl font-extrabold text-white group-hover:text-amber-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold tracking-wider text-amber-400/95 uppercase mt-1">
                        {member.role}
                      </p>
                    </div>

                    {/* Clean Social Links */}
                    {socialLinks.length > 0 && (
                      <div className="flex items-center gap-2">
                        {socialLinks.map((s) => (
                          <SocialButton
                            key={s.platform}
                            platform={s.platform}
                            href={s.href}
                            label={s.label}
                            size="md"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
