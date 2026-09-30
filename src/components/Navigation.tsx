'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import type { Locale } from '@/i18n/locales'
import { localizedHref } from '@/i18n/pathnames'

function LocaleSwitch({ locale }: { locale: Locale }) {
  return (
    <p className="text-xs tracking-[0.18em] uppercase text-gray-900" aria-label="Language">
      <span className={locale === 'en' ? 'font-medium' : 'text-gray-400'}>EN</span>
      <span className="mx-1 text-gray-300">|</span>
      <span
        className="text-gray-400"
        title="French version coming soon"
        aria-disabled="true"
      >
        FR
      </span>
    </p>
  )
}

const Navigation = ({ locale }: { locale: Locale }) => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Artworks', href: localizedHref(locale, 'gallery') },
    { name: 'Artist', href: localizedHref(locale, 'about') },
    { name: 'Exhibitions', href: localizedHref(locale, 'exhibitions') },
    { name: 'Collaborations', href: localizedHref(locale, 'collaborations') },
    { name: 'Contact', href: localizedHref(locale, 'contact') },
  ]

  const priceInquiryHref = localizedHref(locale, 'price-inquiry')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href={localizedHref(locale, 'home')}
            className="text-lg sm:text-xl font-medium tracking-[0.12em] uppercase text-gray-900"
          >
            Fabian Phil
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs tracking-[0.16em] uppercase text-gray-800 hover:text-gray-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={priceInquiryHref}
              className="text-xs tracking-[0.16em] uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
            >
              Price Inquiry
            </Link>
            <LocaleSwitch locale={locale} />
          </div>

          <div className="flex lg:hidden items-center gap-4">
            <LocaleSwitch locale={locale} />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 p-1"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-6 space-y-5">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block text-sm tracking-[0.16em] uppercase text-gray-900"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={priceInquiryHref}
              onClick={() => setIsOpen(false)}
              className="block text-sm tracking-[0.16em] uppercase text-gray-900 border-b border-gray-900 pb-1 w-fit"
            >
              Price Inquiry
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
