'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import type { Locale } from '@/i18n/locales'
import { englishNavLabels, type NavKey } from '@/i18n/navigation'
import { alternateLocalePath, fallbackHrefLang, localizedHref } from '@/i18n/pathnames'

export type NavigationCopy = {
  labels: Record<NavKey, string>
  openMenu: string
  closeMenu: string
  language: string
  frenchComingSoon: string
}

const englishCopy: NavigationCopy = {
  labels: englishNavLabels,
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  language: 'Language',
  frenchComingSoon: 'French version coming soon',
}

const switchLinkClass = 'text-gray-400 hover:text-gray-900 transition-colors'

// Links to the same page in the other language only when that version exists.
function LocaleSwitch({ locale, copy }: { locale: Locale; copy: NavigationCopy }) {
  const pathname = usePathname()
  const alternate = pathname ? alternateLocalePath(pathname) : null

  return (
    <p className="text-xs tracking-[0.18em] uppercase text-gray-900" aria-label={copy.language}>
      {locale === 'fr' && alternate ? (
        <Link href={alternate} hrefLang="en" className={switchLinkClass}>
          EN
        </Link>
      ) : (
        <span className={locale === 'en' ? 'font-medium' : 'text-gray-400'}>EN</span>
      )}
      <span className="mx-1 text-gray-300">|</span>
      {locale === 'fr' ? (
        <span className="font-medium">FR</span>
      ) : alternate ? (
        <Link href={alternate} hrefLang="fr" className={switchLinkClass}>
          FR
        </Link>
      ) : (
        <span
          className="text-gray-400"
          title={copy.frenchComingSoon}
          aria-disabled="true"
        >
          FR
        </span>
      )}
    </p>
  )
}

const navKeys: NavKey[] = ['gallery', 'about', 'exhibitions', 'collaborations', 'contact']

const Navigation = ({ locale, copy = englishCopy }: { locale: Locale; copy?: NavigationCopy }) => {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = navKeys.map((key) => ({
    name: copy.labels[key],
    href: localizedHref(locale, key),
    hrefLang: fallbackHrefLang(locale, key),
  }))

  const priceInquiryHref = localizedHref(locale, 'price-inquiry')
  const priceInquiryHrefLang = fallbackHrefLang(locale, 'price-inquiry')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href={localizedHref(locale, 'home')}
            hrefLang={fallbackHrefLang(locale, 'home')}
            className="text-lg sm:text-xl font-medium tracking-[0.12em] uppercase text-gray-900"
          >
            Fabian PhiL
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                hrefLang={item.hrefLang}
                className="text-xs tracking-[0.16em] uppercase text-gray-800 hover:text-gray-500 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={priceInquiryHref}
              hrefLang={priceInquiryHrefLang}
              className="text-xs tracking-[0.16em] uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
            >
              {copy.labels['price-inquiry']}
            </Link>
            <LocaleSwitch locale={locale} copy={copy} />
          </div>

          <div className="flex lg:hidden items-center gap-4">
            <LocaleSwitch locale={locale} copy={copy} />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-900 p-1"
              aria-label={isOpen ? copy.closeMenu : copy.openMenu}
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
                hrefLang={item.hrefLang}
                onClick={() => setIsOpen(false)}
                className="block text-sm tracking-[0.16em] uppercase text-gray-900"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href={priceInquiryHref}
              hrefLang={priceInquiryHrefLang}
              onClick={() => setIsOpen(false)}
              className="block text-sm tracking-[0.16em] uppercase text-gray-900 border-b border-gray-900 pb-1 w-fit"
            >
              {copy.labels['price-inquiry']}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navigation
