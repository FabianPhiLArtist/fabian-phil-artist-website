import React from 'react'
import { instagramClickPath } from '@/lib/site'

const copy = {
  en: {
    heading: 'Follow the studio',
    text: 'New works and studio films appear first on Instagram.',
    cta: '@fabianphilartist on Instagram →',
    label: 'Open Fabian PhiL on Instagram (opens in a new tab)',
  },
  fr: {
    heading: 'Suivre l’atelier',
    text: 'Les nouvelles œuvres et les films d’atelier paraissent d’abord sur Instagram.',
    cta: '@fabianphilartist sur Instagram →',
    label: 'Ouvrir le profil Instagram de Fabian PhiL (s’ouvre dans un nouvel onglet)',
  },
}

export default function FollowStudio({ locale, placement }: { locale: string; placement: string }) {
  const t = locale === 'fr' ? copy.fr : copy.en
  return (
    <section className="bg-white py-10 md:py-12 border-t border-gray-100" aria-labelledby={`follow-${placement}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="max-w-xl">
          <h2 id={`follow-${placement}`} className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-2">
            {t.heading}
          </h2>
          <p className="text-base md:text-lg font-light text-gray-800 leading-relaxed">{t.text}</p>
        </div>
        <a
          href={instagramClickPath(placement)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.label}
          className="text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
        >
          {t.cta}
        </a>
      </div>
    </section>
  )
}
