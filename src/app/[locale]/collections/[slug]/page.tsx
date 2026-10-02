import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import ArtworkCard from '@/components/ArtworkCard'
import CollectionLinks from '@/components/CollectionLinks'
import JsonLd from '@/components/JsonLd'
import { collections, collectionArtworks, findCollection } from '@/data/collections'
import { isLocale } from '@/i18n/locales'
import { localizedHref } from '@/i18n/pathnames'
import { pageMetadata } from '@/i18n/seo'
import { collectionStructuredData } from '@/lib/structuredData'
import { textLinkClass } from '@/lib/formStyles'
import { RememberBrowseContext } from '@/lib/browseContext'

type Props = { params: { locale: string; slug: string } }

export const dynamicParams = false

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  const collection = findCollection(params.slug)
  if (!collection) return {}
  const [lead] = collectionArtworks(collection)
  return pageMetadata({
    locale,
    route: 'collection',
    id: collection.slug,
    title: collection.seoTitle,
    description: collection.description,
    image: lead ? { url: lead.image, alt: `${lead.title}, layered plexiglass artwork by Fabian PhiL` } : undefined,
  })
}

export default function CollectionPage({ params }: Props) {
  const collection = findCollection(params.slug)
  if (!collection || !isLocale(params.locale)) {
    notFound()
  }

  const locale = params.locale
  const members = collectionArtworks(collection)

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <JsonLd data={collectionStructuredData(collection, members)} />
      <RememberBrowseContext
        label={collection.name}
        href={localizedHref(locale, 'collection', { id: collection.slug })}
        ids={members.map((artwork) => artwork.id)}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-8 md:pb-10">
          <Link href={localizedHref(locale, 'gallery')} className={textLinkClass}>
            ← All artworks
          </Link>
        </div>

        <header className="max-w-3xl mb-10 md:mb-12">
          <p className="text-xs tracking-[0.24em] uppercase text-gray-500 mb-5">Collection</p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.04em] text-gray-900 leading-[1.1] mb-6">
            {collection.name}
          </h1>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
            {collection.intro}
          </p>
        </header>

        <div className="border-t border-gray-200 pt-5 md:pt-6 mb-8 md:mb-10">
          <p className="text-[11px] tracking-[0.16em] uppercase text-gray-500">
            {members.length} work{members.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12 md:gap-y-14">
          {members.map((artwork) => (
            <ArtworkCard key={artwork.id} artwork={artwork} viewMode="grid" />
          ))}
        </div>

        <div className="mt-16 md:mt-20 border-t border-gray-200 pt-8 md:pt-10 space-y-8">
          <CollectionLinks locale={locale} current={collection.slug} label="More collections" />
          <Link href={localizedHref(locale, 'gallery')} className={textLinkClass}>
            View all artworks →
          </Link>
        </div>
      </div>
    </div>
  )
}
