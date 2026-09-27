'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from 'react-icons/fa'

export type SocialPlatform = 'facebook' | 'instagram' | 'youtube' | 'whatsapp'

interface SocialButtonProps {
  platform: SocialPlatform
  href: string
  label?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SocialButton({
  platform,
  href,
  label,
  size = 'md',
  className = '',
}: SocialButtonProps) {
  const getPlatformDetails = () => {
    switch (platform) {
      case 'facebook':
        return {
          icon: <FaFacebookF />,
          hoverClass: 'hover:bg-blue-600 hover:border-blue-500 hover:text-white',
          ariaLabel: label || 'Facebook Profile',
        }
      case 'instagram':
        return {
          icon: <FaInstagram />,
          hoverClass:
            'hover:bg-gradient-to-tr hover:from-amber-500 hover:via-pink-500 hover:to-purple-600 hover:border-pink-500 hover:text-white',
          ariaLabel: label || 'Instagram Profile',
        }
      case 'youtube':
        return {
          icon: <FaYoutube />,
          hoverClass: 'hover:bg-red-600 hover:border-red-500 hover:text-white',
          ariaLabel: label || 'YouTube Channel',
        }
      case 'whatsapp':
        return {
          icon: <FaWhatsapp />,
          hoverClass: 'hover:bg-emerald-600 hover:border-emerald-500 hover:text-white',
          ariaLabel: label || 'WhatsApp Chat',
        }
    }
  }

  const { icon, hoverClass, ariaLabel } = getPlatformDetails()

  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
  }[size]

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 transition-colors shadow-md ${hoverClass} ${sizeClasses} ${className}`}
      aria-label={ariaLabel}
      title={ariaLabel}
    >
      {icon}
    </motion.a>
  )
}
