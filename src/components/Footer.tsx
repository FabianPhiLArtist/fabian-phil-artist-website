import React from 'react'
import Link from 'next/link'
import type { Locale } from '@/i18n/locales'
import { localizedHref } from '@/i18n/pathnames'

const Footer = ({ locale }: { locale: Locale }) => {
  const links = [
    { name: 'Artworks', href: localizedHref(locale, 'gallery') },
    { name: 'Artist', href: localizedHref(locale, 'about') },
    { name: 'Exhibitions', href: localizedHref(locale, 'exhibitions') },
    { name: 'Collaborations', href: localizedHref(locale, 'collaborations') },
    { name: 'Price Inquiry', href: localizedHref(locale, 'price-inquiry') },
    { name: 'Contact', href: localizedHref(locale, 'contact') },
  ]

  return (
    <footer className="bg-[#fafafa] border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-sm tracking-[0.18em] uppercase text-gray-900 mb-3">
              Fabian PhiL
            </p>
            <p className="text-sm font-light text-gray-600 leading-relaxed">
              Kinetic pop art on layered plexiglass.
              <br />
              Dubai, UAE.
            </p>
            <div className="mt-5 space-y-2">
              <a
                href="https://instagram.com/fabianphilartist"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs tracking-[0.16em] uppercase text-gray-900 hover:text-gray-500 transition-colors"
              >
                Instagram
              </a>
              <Link
                href={localizedHref(locale, 'contact')}
                className="block text-xs tracking-[0.16em] uppercase text-gray-900 hover:text-gray-500 transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>

          <nav aria-label="Footer">
            <ul className="space-y-2">
              {links.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-xs tracking-[0.16em] uppercase text-gray-900 hover:text-gray-500 transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-200">
          <p className="text-xs tracking-wide text-gray-500">
            © {new Date().getFullYear()} Fabian PhiL
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
