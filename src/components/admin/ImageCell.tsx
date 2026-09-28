'use client'

import React from 'react'
import { Image } from '@imagekit/next'
import type { DefaultCellComponentProps } from 'payload'

export const ImageCell: React.FC<DefaultCellComponentProps> = (props) => {
  const { cellData, rowData } = props
  const src = typeof cellData === 'string' ? cellData : ''

  if (!src) {
    return (
      <span
        style={{
          color: 'var(--theme-elevation-400)',
          fontSize: '0.85rem',
        }}
      >
        —
      </span>
    )
  }

  const endpoint =
    process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT?.replace(/\/+$/, '') || ''
  const alt =
    (rowData?.name as string) ||
    (rowData?.caption as string) ||
    'Photo'

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '2px 0',
      }}
    >
      <div
        style={{
          width: '38px',
          height: '38px',
          borderRadius: 'var(--style-radius-s, 4px)',
          overflow: 'hidden',
          backgroundColor: 'var(--theme-elevation-100, #222)',
          border: '1px solid var(--theme-border-color, var(--theme-elevation-200, #333))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative',
        }}
      >
        <Image
          urlEndpoint={endpoint}
          src={src}
          alt={alt}
          width={38}
          height={38}
          transformation={[
            {
              width: 76,
              height: 76,
              quality: 85,
            },
          ]}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </div>
    </div>
  )
}
