'use client'

import React from 'react'
import { useFormFields } from '@payloadcms/ui'
import { OccasionCard } from '@/components/landing/occasion-card'

export const OccasionCardPreview: React.FC = () => {
  const title = useFormFields(([fields]) => fields.title?.value as string)
  const icon = useFormFields(([fields]) => fields.icon?.value as string)
  const accent = useFormFields(([fields]) => fields.accent?.value as string)
  const bulletsRaw = useFormFields(([fields]) => fields.bullets?.value as any)

  // Map bullets array from form state (e.g. [{ point: '...' }] or strings)
  const bullets: string[] = Array.isArray(bulletsRaw)
    ? bulletsRaw
        .map((b) => (typeof b === 'object' && b !== null ? b.point : b))
        .filter(Boolean)
    : []

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
        <OccasionCard
          title={title || 'Occasion Title'}
          icon={icon}
          accent={accent}
          bullets={bullets.length > 0 ? bullets : ['Sample highlight point 1', 'Sample highlight point 2']}
        />
      </div>
    </div>
  )
}
