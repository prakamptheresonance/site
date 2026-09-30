'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Image } from '@imagekit/next'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronLeft, FaChevronRight, FaPlay, FaPause, FaImages } from 'react-icons/fa'
import type { CleanMedia } from '@/lib/data'
import { SectionHeading } from '@/components/ui/section-heading'
import { SITE_CONFIG } from '@/data/site'

interface MediaCarouselProps {
  media: CleanMedia[]
  subtitle?: string
}

export function MediaCarousel({ media, subtitle }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const touchStartX = useRef<number | null>(null)
  const touchEndX = useRef<number | null>(null)

  const items = media.length > 0 ? media : []

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1))
  }, [items.length])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1))
  }, [items.length])

  useEffect(() => {
    if (!isPlaying || items.length <= 1) return

    const timer = setInterval(() => {
      nextSlide()
    }, 4500)

    return () => clearInterval(timer)
  }, [isPlaying, items.length, nextSlide])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX
  }

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return
    const diff = touchStartX.current - touchEndX.current
    if (diff > 50) nextSlide()
    if (diff < -50) prevSlide()
    touchStartX.current = null
    touchEndX.current = null
  }

  if (items.length === 0) return null

  const currentItem = items[currentIndex]

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
      },
    }),
  }

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-neutral-950">
      {/* Background Stage Lighting */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-amber-600/15 rounded-full blur-[160px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeading
            headerData={SITE_CONFIG.sections.gallery}
            subtitle={subtitle}
            className="mb-0"
          />

          {/* Autoplay & Navigation Controls */}
          <div className="flex items-center gap-3 mt-6 md:mt-0">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-3.5 rounded-full glass-panel text-neutral-300 hover:text-amber-400 hover:border-amber-500/40 transition-all text-xs"
              title={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <FaPause className="w-3.5 h-3.5" /> : <FaPlay className="w-3.5 h-3.5" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={prevSlide}
              className="p-3.5 rounded-full glass-panel text-neutral-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              aria-label="Previous image"
            >
              <FaChevronLeft className="w-4 h-4" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={nextSlide}
              className="p-3.5 rounded-full glass-panel text-neutral-300 hover:text-amber-400 hover:border-amber-500/40 transition-all"
              aria-label="Next image"
            >
              <FaChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>

        {/* Main Featured Slide with AnimatePresence */}
        <div
          className="relative w-full aspect-video rounded-3xl overflow-hidden glass-panel border border-neutral-800 shadow-2xl group"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0"
            >
              <Image
                src={currentItem.url}
                alt={currentItem.alt || 'Prakamp Live Performance'}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Cinematic Vignette Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/20" />

              {/* Top Stage Counter Badge */}
              <div className="absolute top-5 right-5 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-neutral-700 text-white font-mono text-xs font-semibold shadow-md">
                {currentIndex + 1} / {items.length}
              </div>

              {/* Bottom Captions Bar */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-10 flex flex-col justify-end">
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="text-amber-400 text-xs sm:text-sm font-bold uppercase tracking-wider mb-2 inline-flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>{SITE_CONFIG.sections.gallery.seriesBadge}</span>
                </motion.span>
                <motion.h3
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 }}
                  className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white tracking-wide leading-tight max-w-3xl"
                >
                  {currentItem.caption || currentItem.alt}
                </motion.h3>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Thumbnail Strip Navigator */}
        <div className="mt-6 flex items-center sm:justify-center gap-3 overflow-x-auto py-2">
          {items.map((item, idx) => (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1)
                setCurrentIndex(idx)
              }}
              className={`relative flex-shrink-0 w-20 sm:w-28 aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? 'border-amber-400 shadow-lg shadow-amber-500/30 scale-105 opacity-100'
                  : 'border-transparent opacity-50 hover:opacity-85'
              }`}
              aria-label={`Jump to image ${idx + 1}`}
            >
              <Image src={item.url} alt={item.alt} fill sizes="120px" className="object-cover" />
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  )
}
