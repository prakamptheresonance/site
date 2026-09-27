'use client'

import React from 'react'
import { motion, type HTMLMotionProps } from 'framer-motion'

interface GlassCardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode
  className?: string
  hoverGlow?: boolean
  accentGradient?: string
}

export function GlassCard({
  children,
  className = '',
  hoverGlow = true,
  accentGradient,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      whileHover={
        hoverGlow
          ? {
              y: -5,
              transition: { duration: 0.25, ease: 'easeOut' },
            }
          : undefined
      }
      className={`glass-panel rounded-2xl relative overflow-hidden transition-all duration-300 ${
        hoverGlow
          ? 'hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/10'
          : ''
      } ${className}`}
      {...props}
    >
      {accentGradient && (
        <div
          className={`absolute -top-12 -right-12 w-36 h-36 bg-gradient-to-br ${accentGradient} rounded-full blur-2xl pointer-events-none opacity-60 group-hover:scale-150 transition-transform duration-500`}
        />
      )}
      {children}
    </motion.div>
  )
}
