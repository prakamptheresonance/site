'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface SoundwaveVisualizerProps {
  barCount?: number
  height?: number
  className?: string
  interactive?: boolean
}

export function SoundwaveVisualizer({
  barCount = 20,
  height = 56,
  className = '',
}: SoundwaveVisualizerProps) {
  // Deterministic heights for rhythmic acoustic bars
  const baseHeights = [
    0.35, 0.65, 0.25, 0.85, 0.55, 0.95, 0.6, 0.9, 0.45, 0.75, 0.88, 0.38, 0.82, 0.58, 1.0,
    0.48, 0.7, 0.32, 0.62, 0.4,
  ]

  return (
    <div
      className={`flex items-center justify-center gap-1.5 sm:gap-2 ${className}`}
      style={{ height: `${height}px` }}
    >
      {Array.from({ length: barCount }).map((_, idx) => {
        const factor = baseHeights[idx % baseHeights.length]
        const barHeight = Math.max(8, factor * height)
        const duration = 0.9 + (idx % 5) * 0.15

        return (
          <motion.span
            key={idx}
            className="w-1 sm:w-1.5 bg-gradient-to-t from-amber-600 via-amber-400 to-yellow-200 rounded-full"
            animate={{
              height: [`${Math.max(6, barHeight * 0.25)}px`, `${barHeight}px`, `${Math.max(6, barHeight * 0.25)}px`],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: (idx * 0.07) % 0.8,
            }}
          />
        )
      })}
    </div>
  )
}
