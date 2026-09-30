'use client'

import React from 'react'
import { SectionHeading } from '@/components/ui/section-heading'
import { OccasionCard } from '@/components/landing/occasion-card'
import { SITE_CONFIG } from '@/data/site'
import type { CleanOccasion } from '@/lib/data'

interface OccasionsSectionProps {
  occasions?: CleanOccasion[]
  subtitle?: string
}

export function OccasionsSection({
  occasions = [],
  subtitle,
}: OccasionsSectionProps) {
  if (!occasions || occasions.length === 0) {
    return null
  }

  return (
    <section id="occasions" className="py-24 relative bg-neutral-950/70 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading headerData={SITE_CONFIG.sections.occasions} subtitle={subtitle} />

        {/* Dynamic Occasions Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {occasions.map((occasion) => (
            <OccasionCard
              key={occasion.id}
              title={occasion.title}
              icon={occasion.icon}
              accent={occasion.accent}
              bullets={occasion.bullets}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
