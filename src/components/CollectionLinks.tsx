import React from 'react'
import LocaleLink from '@/components/LocaleLink'
import { collections, type CollectionSlug } from '@/data/collections'
import type { Locale } from '@/i18n/locales'

type Props = {
  locale: Locale
  current?: CollectionSlug
  label?: string
  // Localized collection names; defaults to the English names.
  names?: Record<CollectionSlug, string>
}

const CollectionLinks = ({ locale, current, label = 'Collections', names }: Props) => (
  <nav aria-label={label}>
    <p className="text-[11px] tracking-[0.16em] uppercase text-gray-400 mb-3">{label}</p>
    <ul className="flex flex-wrap gap-x-5 gap-y-3 list-none p-0 m-0">
      {collections.map((collection) => {
        const isCurrent = collection.slug === current
        return (
          <li key={collection.slug}>
            <LocaleLink
              locale={locale}
              route="collection"
              options={{ id: collection.slug }}
              aria-current={isCurrent ? 'page' : undefined}
              className={`text-[11px] tracking-[0.16em] uppercase pb-0.5 border-b transition-colors ${
                isCurrent
                  ? 'text-gray-900 border-gray-900'
                  : 'text-gray-500 border-transparent hover:text-gray-900'
              }`}
            >
              {names?.[collection.slug] ?? collection.name}
            </LocaleLink>
          </li>
        )
      })}
    </ul>
  </nav>
)

export default CollectionLinks
