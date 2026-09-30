import React from 'react'
import { DynamicIcon } from '@/components/ui/dynamic-icon'
import { ACCENT_PRESETS } from '@/lib/presets/accents'
import { cn } from '@/lib/utils'

export interface GenreCardProps {
  title?: string | null
  icon?: string | null
  accent?: string | null
  className?: string
}

export function GenreCard({
  title,
  icon,
  accent = 'from-amber-500/20 to-amber-700/10',
  className = '',
}: GenreCardProps) {
  const preset = ACCENT_PRESETS.find((p) => p.value === accent)
  const startColor = preset ? preset.previewColors[0] : '#f59e0b'

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl border border-neutral-800/80 bg-[#0e0e11] p-6 flex items-center gap-4 transition-colors',
        className,
      )}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        padding: '22px 24px',
        borderRadius: '16px',
        backgroundColor: '#0e0e11',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        position: 'relative',
        overflow: 'hidden',
        boxSizing: 'border-box',
        width: '100%',
      }}
    >
      {/* Subtle, soft ambient background glow */}
      <div
        className={cn(
          'absolute -top-12 -right-12 w-44 h-44 bg-gradient-to-br rounded-full blur-3xl pointer-events-none opacity-15',
          accent,
        )}
        style={{
          position: 'absolute',
          top: '-30px',
          right: '-30px',
          width: '140px',
          height: '140px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${startColor} 0%, transparent 70%)`,
          filter: 'blur(36px)',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      {/* Icon Box matching design */}
      <div
        className="size-12 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-amber-400 shrink-0 shadow-sm relative z-10"
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
          fontSize: '22px',
          flexShrink: 0,
          position: 'relative',
          zIndex: 2,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.4)',
        }}
      >
        <DynamicIcon name={icon} className="size-6 text-amber-400" />
      </div>

      {/* Title in Cinzel uppercase matching design */}
      <h3
        className="font-heading uppercase tracking-wide text-white font-semibold text-base sm:text-lg leading-snug relative z-10"
        style={{
          fontFamily: "var(--font-cinzel), 'Cinzel', serif",
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontWeight: 600,
          fontSize: '17px',
          color: '#ffffff',
          margin: 0,
          lineHeight: 1.3,
          position: 'relative',
          zIndex: 2,
        }}
      >
        {title || 'Genre Title'}
      </h3>
    </div>
  )
}
