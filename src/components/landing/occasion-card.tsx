import React from 'react'
import { DynamicIcon } from '@/components/ui/dynamic-icon'
import { ACCENT_PRESETS } from '@/lib/presets/accents'
import { cn } from '@/lib/utils'

export interface OccasionCardProps {
  title?: string | null
  icon?: string | null
  accent?: string | null
  bullets?: string[] | null
  className?: string
}

export function OccasionCard({
  title,
  icon,
  accent = 'from-amber-500/20 to-amber-700/10',
  bullets = [],
  className = '',
}: OccasionCardProps) {
  const bulletItems = bullets || []
  const preset = ACCENT_PRESETS.find((p) => p.value === accent)
  const startColor = preset ? preset.previewColors[0] : '#f59e0b'

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#0e0e11] p-7 flex flex-col justify-between transition-colors h-full',
        className,
      )}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '24px',
        borderRadius: '16px',
        backgroundColor: '#0e0e11',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        minHeight: '220px',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        className={cn(
          'absolute -top-12 -right-12 w-48 h-48 bg-gradient-to-br rounded-full blur-3xl pointer-events-none opacity-15',
          accent,
        )}
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '150px',
          height: '150px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${startColor} 0%, transparent 70%)`,
          filter: 'blur(36px)',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Icon box */}
        <div
          className="size-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shadow-md mb-5 shrink-0"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: '#171717',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fbbf24',
            marginBottom: '18px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
          }}
        >
          <DynamicIcon name={icon} className="size-6 text-amber-400" />
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold text-white mb-2 leading-snug"
          style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#ffffff',
            margin: '0 0 8px 0',
            lineHeight: 1.3,
          }}
        >
          {title || 'Occasion Title'}
        </h3>
      </div>

      {/* Bullets List */}
      {bulletItems.length > 0 && (
        <div
          className="pt-4 border-t border-neutral-800/60 relative z-10"
          style={{
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            marginTop: '16px',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <ul
            className="space-y-1.5"
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            {bulletItems.map((bullet, idx) => (
              <li
                key={idx}
                className="flex items-center text-xs text-neutral-300 gap-2"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  fontSize: '12px',
                  color: '#d4d4d4',
                  gap: '8px',
                }}
              >
                <span
                  className="size-1 rounded-full bg-amber-400 shrink-0"
                  style={{
                    width: '4px',
                    height: '4px',
                    borderRadius: '50%',
                    backgroundColor: '#fbbf24',
                    flexShrink: 0,
                  }}
                />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
