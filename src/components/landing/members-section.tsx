'use client'

import React, { useMemo, useState } from 'react'
import { Image } from '@imagekit/next'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { FaUser } from 'react-icons/fa'
import type { CleanGroup, CleanMember } from '@/lib/data'
import { getMemberSocialLinks } from '@/data/socials'
import { SITE_CONFIG } from '@/data/site'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassCard } from '@/components/ui/glass-card'
import { SocialButton } from '@/components/ui/social-button'

interface MembersSectionProps {
  members: CleanMember[]
  groups?: CleanGroup[]
  subtitle?: string
}

interface GroupWithMembers {
  id: string | number
  title: string
  members: CleanMember[]
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -15,
    transition: {
      duration: 0.25,
      ease: 'easeIn',
    },
  },
}

export function MembersSection({ members, groups = [], subtitle }: MembersSectionProps) {
  const [selectedGroup, setSelectedGroup] = useState<string>('all')

  // Organize members into groups
  const groupedData: GroupWithMembers[] = useMemo(() => {
    if (!members || members.length === 0) return []

    // Map known groups
    const result: GroupWithMembers[] = []
    const trackedMemberIds = new Set<string | number>()

    // Sort groups by explicit order or id
    const orderedGroups = [...groups].sort((a, b) => {
      const orderA = a.order ?? (typeof a.id === 'number' ? a.id : 0)
      const orderB = b.order ?? (typeof b.id === 'number' ? b.id : 0)
      return orderA - orderB
    })

    orderedGroups.forEach((grp) => {
      let grpMembers: CleanMember[] = []

      // If group has an explicit dragged order from Payload relationship field
      if (grp.memberIds && grp.memberIds.length > 0) {
        const memberMap = new Map(members.map((m) => [String(m.id), m]))
        const seenMemberIds = new Set<string>()

        // 1. Add members in the exact dragged order from Group.members
        grp.memberIds.forEach((id) => {
          const m = memberMap.get(String(id))
          if (m) {
            grpMembers.push(m)
            trackedMemberIds.add(m.id)
            seenMemberIds.add(String(m.id))
          }
        })

        // 2. Also append any members assigned to this group who aren't yet in the group's members array
        const unlistedGrpMembers = members.filter((m) => {
          if (seenMemberIds.has(String(m.id))) return false
          const matchesTitle = m.group?.toLowerCase() === grp.title.toLowerCase()
          const matchesId = m.groupId !== undefined && String(m.groupId) === String(grp.id)
          return matchesTitle || matchesId
        })

        unlistedGrpMembers.forEach((m) => {
          grpMembers.push(m)
          trackedMemberIds.add(m.id)
        })
      } else {
        grpMembers = members.filter((m) => {
          const matchesTitle = m.group?.toLowerCase() === grp.title.toLowerCase()
          const matchesId = m.groupId !== undefined && String(m.groupId) === String(grp.id)
          return matchesTitle || matchesId
        })
        grpMembers.forEach((m) => trackedMemberIds.add(m.id))
      }

      if (grpMembers.length > 0) {
        result.push({
          id: grp.id,
          title: grp.title,
          members: grpMembers,
        })
      }
    })

    // Check for any members whose group wasn't in the groups list
    const remainingMembers = members.filter((m) => !trackedMemberIds.has(m.id))
    if (remainingMembers.length > 0) {
      // Group remaining by their custom group name if present, or "Other"
      const extraGroupsMap = new Map<string, CleanMember[]>()
      remainingMembers.forEach((m) => {
        const key = m.group?.trim() || 'General'
        if (!extraGroupsMap.has(key)) {
          extraGroupsMap.set(key, [])
        }
        extraGroupsMap.get(key)!.push(m)
      })

      extraGroupsMap.forEach((grpMembers, key) => {
        result.push({
          id: `extra-${key}`,
          title: key,
          members: grpMembers,
        })
      })
    }

    return result
  }, [members, groups])

  if (!members || members.length === 0) {
    return null
  }

  const hasMultipleGroups = groupedData.length > 1

  // Filtered view depending on tab selection
  const displayedGroups =
    selectedGroup === 'all'
      ? groupedData
      : groupedData.filter((g) => String(g.id) === selectedGroup || g.title === selectedGroup)

  return (
    <section id="members" className="py-24 relative bg-black/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading headerData={SITE_CONFIG.sections.members} subtitle={subtitle} />

        {/* Optional Group Filter Pills when multiple groups exist */}
        {hasMultipleGroups && (
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-14">
            <button
              type="button"
              onClick={() => setSelectedGroup('all')}
              className={`group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                selectedGroup === 'all'
                  ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/25 ring-1 ring-amber-400'
                  : 'bg-neutral-900/90 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800/80'
              }`}
            >
              <span>All Members</span>
              <span
                className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[10px] font-mono font-bold leading-none transition-colors ${
                  selectedGroup === 'all'
                    ? 'bg-neutral-950 text-amber-400'
                    : 'bg-neutral-800 text-neutral-400 group-hover:bg-neutral-700 group-hover:text-neutral-200'
                }`}
              >
                {members.length}
              </span>
            </button>

            {groupedData.map((group) => {
              const isSelected = selectedGroup === String(group.id) || selectedGroup === group.title
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setSelectedGroup(String(group.id))}
                  className={`group inline-flex items-center gap-2.5 px-4 sm:px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-colors duration-200 ${
                    isSelected
                      ? 'bg-amber-500 text-neutral-950 shadow-md shadow-amber-500/25 ring-1 ring-amber-400'
                      : 'bg-neutral-900/90 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800/80'
                  }`}
                >
                  <span>{group.title}</span>
                  <span
                    className={`inline-flex items-center justify-center min-w-5 h-5 px-1.5 rounded-full text-[10px] font-mono font-bold leading-none transition-colors ${
                      isSelected
                        ? 'bg-neutral-950 text-amber-400'
                        : 'bg-neutral-800 text-neutral-400 group-hover:bg-neutral-700 group-hover:text-neutral-200'
                    }`}
                  >
                    {group.members.length}
                  </span>
                </button>
              )
            })}
          </div>
        )}

        {/* Grouped Member Sections */}
        <div className="space-y-16">
          <AnimatePresence mode="wait">
            {displayedGroups.map((group) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-8"
              >
                {/* Group Title Section Header (Shown when multiple groups exist) */}
                {hasMultipleGroups && (
                  <div className="flex items-center gap-4 pt-2">
                    <div className="h-px bg-gradient-to-r from-transparent via-amber-500/25 to-amber-500/10 flex-1" />
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/90 border border-amber-500/30 shadow-sm shadow-amber-500/10 backdrop-blur-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                      <h3 className="text-xs sm:text-sm font-bold tracking-widest text-amber-400 uppercase">
                        {group.title}
                      </h3>
                    </div>
                    <div className="h-px bg-gradient-to-l from-transparent via-amber-500/25 to-amber-500/10 flex-1" />
                  </div>
                )}

                {/* Member Cards Grid with Staggered Entrance */}
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {group.members.map((member) => {
                    const socialLinks = getMemberSocialLinks(member)

                    return (
                      <motion.div key={member.id} variants={itemVariants}>
                        <GlassCard className="flex flex-col group border border-neutral-800/80 overflow-hidden">
                          {/* Member Portrait */}
                          <div className="relative aspect-7/5 w-full overflow-hidden bg-neutral-900">
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

                          {/* Member Details */}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
