'use client'

import React, { useState } from 'react'
import { FaWhatsapp, FaBars, FaTimes, FaMusic } from 'react-icons/fa'
import { NAV_ITEMS } from '@/data/navigation'
import { SITE_CONFIG } from '@/data/site'

interface NavbarProps {
  whatsappNumber?: string
  whatsappPrompt?: string
}

export function Navbar({ whatsappNumber, whatsappPrompt }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const cleanNumber = (whatsappNumber || '').replace(/[^0-9]/g, '')
  const message = encodeURIComponent(
    whatsappPrompt ||
      'Hello Prakamp! I would like to inquire about booking your band for an upcoming event.',
  )
  const waUrl = cleanNumber ? `https://wa.me/${cleanNumber}?text=${message}` : '#contact'

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-md border-b border-neutral-800 py-3.5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-amber-500 flex items-center justify-center text-black font-bold">
            <FaMusic className="w-3.5 h-3.5 text-black" />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-xl text-white font-heading">
              {SITE_CONFIG.brand.name}
            </span>
            <span className="text-[10px] tracking-widest uppercase text-neutral-400 font-medium -mt-0.5">
              {SITE_CONFIG.brand.highlight} • {SITE_CONFIG.brand.location}
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-neutral-300">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-neutral-300 hover:text-white transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {cleanNumber ? (
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-neutral-700 hover:border-emerald-500/50 text-neutral-300 hover:text-emerald-400 font-medium text-xs transition-colors"
            >
              <FaWhatsapp className="w-3.5 h-3.5 text-emerald-400" />
              <span>{SITE_CONFIG.ctas.instantWhatsApp}</span>
            </a>
          ) : null}
          <a
            href="#contact"
            className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider transition-colors"
          >
            {SITE_CONFIG.ctas.bookBand}
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes className="w-5 h-5" /> : <FaBars className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-950 border-b border-neutral-800 px-6 py-5 space-y-4">
          <nav className="flex flex-col gap-3 text-sm font-medium text-neutral-300">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 text-neutral-300 hover:text-white transition-colors"
              >
                {item.mobileLabel}
              </a>
            ))}
          </nav>
          <div className="pt-3 border-t border-neutral-800 flex flex-col gap-2.5">
            {cleanNumber ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg border border-neutral-700 text-neutral-200 hover:text-white text-xs font-medium transition-colors"
              >
                <FaWhatsapp className="w-4 h-4 text-emerald-400" />
                <span>{SITE_CONFIG.ctas.chatWhatsApp}</span>
              </a>
            ) : null}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center w-full py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-semibold text-xs uppercase tracking-wider transition-colors"
            >
              {SITE_CONFIG.ctas.bookForEvent}
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
