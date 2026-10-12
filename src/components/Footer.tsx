import React from 'react'
import type { Locale } from '@/i18n/locales'
import { englishNavLabels, type NavKey } from '@/i18n/navigation'
import LocaleLink from '@/components/LocaleLink'

export type FooterCopy = {
  labels: Record<NavKey, string>
  tagline: string
  location: string
  navLabel: string
}

const englishCopy: FooterCopy = {
  labels: englishNavLabels,
  tagline: 'Kinetic pop art on layered plexiglass.',
  location: 'Dubai, UAE.',
  navLabel: 'Footer',
}

const footerKeys: NavKey[] = ['gallery', 'about', 'exhibitions', 'collaborations', 'price-inquiry', 'contact']

const Footer = ({ locale, copy = englishCopy }: { locale: Locale; copy?: FooterCopy }) => {
  return (
    <footer className="bg-[#fafafa] border-t border-gray-200 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <p className="text-sm tracking-[0.18em] uppercase text-gray-900 mb-3">
              Fabian PhiL
            </p>
            <p className="text-sm font-light text-gray-600 leading-relaxed">
              {copy.tagline}
              <br />
              {copy.location}
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
              <LocaleLink
                locale={locale}
                route="contact"
                className="block text-xs tracking-[0.16em] uppercase text-gray-900 hover:text-gray-500 transition-colors"
              >
                {copy.labels.contact}
              </LocaleLink>
            </div>
          </div>

          <nav aria-label={copy.navLabel}>
            <ul className="space-y-2">
              {footerKeys.map((key) => (
                <li key={copy.labels[key]}>
                  <LocaleLink
                    locale={locale}
                    route={key}
                    className="text-xs tracking-[0.16em] uppercase text-gray-900 hover:text-gray-500 transition-colors"
                  >
                    {copy.labels[key]}
                  </LocaleLink>
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
