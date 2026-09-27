'use client'

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { SectionHeading } from '@/components/ui/section-heading'
import { GlassCard } from '@/components/ui/glass-card'
import { GENRES } from '@/data/genres'
import { SITE_CONFIG } from '@/data/site'

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
}

export function ExpertiseGrid() {
  return (
    <section id="expertise" className="py-24 relative bg-black/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading headerData={SITE_CONFIG.sections.expertise} />

        {/* 11 Genre Cards Grid with Staggered Scroll Animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {GENRES.map((genre) => {
            return (
              <motion.div key={genre.id} variants={itemVariants}>
                <GlassCard
                  accentGradient={genre.accent}
                  className="p-7 h-full flex flex-col justify-start group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-neutral-900/90 border border-neutral-800 flex items-center justify-center text-amber-400 group-hover:text-amber-300 group-hover:border-amber-500/40 shadow-md flex-shrink-0 transition-colors">
                      <genre.icon className="size-6" />
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                      {genre.title}
                    </h3>
                  </div>

                  <p className="text-neutral-400 text-sm leading-relaxed">{genre.subtitle}</p>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
