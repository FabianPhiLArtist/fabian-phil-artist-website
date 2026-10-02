import React from 'react'
import Link from 'next/link'
import { collections, type CollectionSlug } from '@/data/collections'
import { localizedHref } from '@/i18n/pathnames'
import type { Locale } from '@/i18n/locales'

type Props = {
  locale: Locale
  current?: CollectionSlug
  label?: string
}

const CollectionLinks = ({ locale, current, label = 'Collections' }: Props) => (
  <nav aria-label={label}>
    <p className="text-[11px] tracking-[0.16em] uppercase text-gray-400 mb-3">{label}</p>
    <ul className="flex flex-wrap gap-x-5 gap-y-3 list-none p-0 m-0">
      {collections.map((collection) => {
        const isCurrent = collection.slug === current
        return (
          <li key={collection.slug}>
            <Link
              href={localizedHref(locale, 'collection', { id: collection.slug })}
              aria-current={isCurrent ? 'page' : undefined}
              className={`text-[11px] tracking-[0.16em] uppercase pb-0.5 border-b transition-colors ${
                isCurrent
                  ? 'text-gray-900 border-gray-900'
                  : 'text-gray-500 border-transparent hover:text-gray-900'
              }`}
            >
              {collection.name}
            </Link>
          </li>
        )
      })}
    </ul>
  </nav>
)

export default CollectionLinks
