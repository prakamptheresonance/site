'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassCard } from '@/components/ui/glass-card'
import { OCCASIONS } from '@/data/occasions'
import { SITE_CONFIG } from '@/data/site'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export function OccasionsSection() {
  return (
    <section id="occasions" className="py-24 relative bg-neutral-950/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading headerData={SITE_CONFIG.sections.occasions} />

        {/* Occasions Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {OCCASIONS.map((occasion) => {
            const Icon = occasion.icon

            return (
              <motion.div key={occasion.id} variants={itemVariants}>
                <GlassCard className="p-7 h-full flex flex-col justify-between border border-neutral-800/80">
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-md mb-5">
                      <Icon className="w-7 h-7 text-amber-400" />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{occasion.title}</h3>
                    <p className="text-neutral-400 text-sm leading-relaxed mb-5">
                      {occasion.description}
                    </p>
                  </div>

                  {/* Event Types */}
                  <div className="pt-4 border-t border-neutral-800/70">
                    <ul className="space-y-1.5">
                      {occasion.bullets.map((b, i) => (
                        <li key={i} className="flex items-center text-xs text-neutral-300 gap-2">
                          <span className="w-1 h-1 rounded-full bg-amber-400" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
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
