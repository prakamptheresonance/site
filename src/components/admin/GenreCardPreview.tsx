'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import { GenreCard } from '@/components/landing/genre-card'

export const GenreCardPreview: React.FC = () => {
  const title = useFormFields(([fields]) => fields.title?.value as string)
  const icon = useFormFields(([fields]) => fields.icon?.value as string)
  const accent = useFormFields(([fields]) => fields.accent?.value as string)

  return (
    <div style={{ marginBottom: '24px' }}>
      <div
        style={{
          fontSize: '11px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          color: 'var(--theme-elevation-500, #888)',
          marginBottom: '10px',
        }}
      >
        Card Preview
      </div>
      <div style={{ maxWidth: '360px' }}>
        <GenreCard
          title={title || 'Genre Title'}
          icon={icon}
          accent={accent}
        />
      </div>
    </div>
  )
}
