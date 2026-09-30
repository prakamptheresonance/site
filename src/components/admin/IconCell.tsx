'use client'

import React from 'react'
import type { DefaultCellComponentProps } from 'payload'
import { ICON_MAP } from '@/lib/icons/registry'

export const IconCell: React.FC<DefaultCellComponentProps> = (props) => {
  const { cellData } = props
  const key = typeof cellData === 'string' ? cellData : ''

  if (!key) {
    return <span style={{ color: 'var(--theme-elevation-400)', fontSize: '0.85rem' }}>—</span>
  }

  const def = ICON_MAP.get(key)
  const IconComponent = def?.icon

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '2px 0',
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '2px',
          backgroundColor: 'var(--theme-elevation-100)',
          border: '1px solid var(--theme-border-color, var(--theme-elevation-200))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--theme-elevation-800, #f59e0b)',
          fontSize: '15px',
          flexShrink: 0,
        }}
      >
        {IconComponent ? <IconComponent /> : <span>?</span>}
      </div>
      <span
        style={{
          fontSize: '0.84rem',
          color: 'var(--theme-text)',
          fontWeight: 500,
        }}
      >
        {def ? def.name : key}
      </span>
    </div>
  )
}
