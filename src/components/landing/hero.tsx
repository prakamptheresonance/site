'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaWhatsapp, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa'
import { GiSoundWaves } from 'react-icons/gi'
import { SoundwaveVisualizer } from '@/components/ui/soundwave-visualizer'
import { getHeroStats } from '@/data/stats'
import { HERO_CONTENT } from '@/data/hero'
import logo from '@/../public/prakamp-logo.png'
import Image from 'next/image'

interface HeroProps {
  whatsappNumber?: string
  whatsappPrompt?: string
  genreCount?: number
  description?: string
}

export function Hero({ whatsappNumber, whatsappPrompt, genreCount, description }: HeroProps) {
  const cleanNumber = (whatsappNumber || '').replace(/[^0-9]/g, '')
  const message = encodeURIComponent(
    whatsappPrompt ||
      'Hello Prakamp! I would like to inquire about booking your band for an upcoming event.',
  )
  const waUrl = cleanNumber ? `https://wa.me/${cleanNumber}?text=${message}` : '#contact'
  const heroStats = getHeroStats(genreCount)

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
      {/* Background Stage Lighting Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Amber Stage Spotlight */}
        <motion.div
          animate={{
            opacity: [0.15, 0.22, 0.15],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-amber-500/20 rounded-full blur-[140px]"
        />

        {/* Deep Violet Ambient Fill */}
        <motion.div
          animate={{
            opacity: [0.1, 0.16, 0.1],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-[160px]"
        />

        {/* Crimson Edge Warmth */}
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-amber-700/10 rounded-full blur-[150px]" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
        {/* Animated Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide uppercase mb-6"
        >
          <FaMapMarkerAlt className="w-3.5 h-3.5 text-amber-400" />
          <span>{HERO_CONTENT.locationBadge}</span>
        </motion.div>

        {/* Main Band Title with Cinematic Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          className="mb-4"
        >
          <Image src={logo} alt="Prakamp Logo" />
        </motion.div>

        {/* Band Slogan */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
          className="text-lg sm:text-2xl md:text-3xl font-semibold text-amber-400/95 tracking-wider uppercase mb-6"
        >
          {HERO_CONTENT.slogan}
        </motion.p>

        {/* Descriptive Summary */}
        {description && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-neutral-300 leading-relaxed font-normal mb-8"
          >
            {description}
          </motion.p>
        )}

        {/* Animated Soundwave Visualizer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: 'easeOut' }}
          className="flex items-center justify-center gap-3 mb-10 h-16"
        >
          <GiSoundWaves className="w-7 h-7 text-amber-400/80 hidden sm:block" />
          <SoundwaveVisualizer barCount={24} height={52} />
          <GiSoundWaves className="w-7 h-7 text-amber-400/80 hidden sm:block" />
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: 'easeOut' }}
          className="flex flex-wrap items-center justify-center gap-4 sm:gap-5 mb-14"
        >
          {/* WhatsApp Primary Booking */}
          {cleanNumber ? (
            <motion.a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-emerald-600/25 transition-all hover:brightness-105"
            >
              <FaWhatsapp className="w-5 h-5" />
              <span>Book via WhatsApp</span>
            </motion.a>
          ) : null}

          {/* Event Inquiry CTA */}
          <motion.a
            href={HERO_CONTENT.actions.primary.href}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold text-sm sm:text-base tracking-wide shadow-lg shadow-amber-500/20 transition-all hover:brightness-105"
          >
            <FaCalendarAlt className="w-4 h-4" />
            <span>{HERO_CONTENT.actions.primary.label}</span>
          </motion.a>
        </motion.div>

        {/* Feature Stat Badges (Data-driven array) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto pt-6 border-t border-neutral-800/80"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="glass-panel p-3.5 rounded-xl text-center">
              <div className="text-amber-400 font-black text-xl sm:text-2xl font-heading">
                {stat.value}
              </div>
              <div className="text-neutral-400 text-xs sm:text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
