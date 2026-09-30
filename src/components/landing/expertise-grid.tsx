'use client'

import React from 'react'
import { SectionHeading } from '@/components/ui/section-heading'
import { GenreCard } from '@/components/landing/genre-card'
import { SITE_CONFIG } from '@/data/site'
import type { CleanGenre } from '@/lib/data'

interface ExpertiseGridProps {
  genres?: CleanGenre[]
  subtitle?: string
}

export function ExpertiseGrid({ genres = [], subtitle }: ExpertiseGridProps) {
  if (!genres || genres.length === 0) {
    return null
  }

  return (
    <section id="expertise" className="py-24 relative bg-black/60 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          headerData={SITE_CONFIG.sections.expertise}
          subtitle={subtitle}
          badgeText={`${genres.length} Musical Genres`}
        />

        {/* Static Grid without card animation matching exact design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {genres.map((genre) => (
            <GenreCard
              key={genre.id}
              title={genre.title}
              icon={genre.icon}
              accent={genre.accent}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
