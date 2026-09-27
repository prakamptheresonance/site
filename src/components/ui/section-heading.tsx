'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { IconType } from 'react-icons'
import type { SectionHeaderData } from '@/data/site'

interface SectionHeadingProps {
  headerData?: SectionHeaderData
  badgeIcon?: React.ReactNode | IconType
  badgeText?: string
  titlePrefix?: string
  titleHighlight?: string
  titleSuffix?: string
  subtitle?: string
  className?: string
  align?: 'center' | 'left'
}

export function SectionHeading({
  headerData,
  badgeIcon,
  badgeText,
  titlePrefix,
  titleHighlight,
  titleSuffix,
  subtitle,
  className = '',
  align,
}: SectionHeadingProps) {
  // Derive values from headerData or fallback to explicit props
  const effectiveBadgeText = badgeText ?? headerData?.badgeText ?? ''
  const effectivePrefix = titlePrefix ?? headerData?.titlePrefix ?? ''
  const effectiveHighlight = titleHighlight ?? headerData?.titleHighlight ?? ''
  const effectiveSuffix = titleSuffix ?? headerData?.titleSuffix ?? ''
  const effectiveSubtitle = subtitle ?? headerData?.subtitle ?? ''
  const effectiveAlign = align ?? headerData?.align ?? 'center'

  const effectiveIconProp = badgeIcon ?? headerData?.badgeIcon

  const isCenter = effectiveAlign === 'center'

  // Render icon whether it is an IconType component or already a ReactNode
  let renderedIcon: React.ReactNode = null
  if (effectiveIconProp) {
    if (typeof effectiveIconProp === 'function') {
      const IconComp = effectiveIconProp as IconType
      renderedIcon = <IconComp className="w-3.5 h-3.5" />
    } else {
      renderedIcon = effectiveIconProp
    }
  }

  return (
    <div
      className={`max-w-3xl mb-16 ${isCenter ? 'mx-auto text-center' : 'text-left'} ${className}`}
    >
      {/* Animated Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-4 shadow-sm shadow-amber-500/10 ${
          isCenter ? 'mx-auto' : ''
        }`}
      >
        {renderedIcon && <span className="text-amber-400">{renderedIcon}</span>}
        <span>{effectiveBadgeText}</span>
      </motion.div>

      {/* Animated Headline */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
        className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight mb-5 leading-tight"
      >
        {effectivePrefix} <span className="text-gold-gradient">{effectiveHighlight}</span>{' '}
        {effectiveSuffix}
      </motion.h2>

      {/* Animated Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        className="text-neutral-400 text-base sm:text-lg leading-relaxed font-normal"
      >
        {effectiveSubtitle}
      </motion.p>
    </div>
  )
}
