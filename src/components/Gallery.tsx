'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Grid, List, Search, ArrowUpDown } from 'lucide-react'
import ArtworkCard, { type ArtworkCardCopy, type ArtworkCardText } from './ArtworkCard'
import CollectionLinks from './CollectionLinks'
import { artworks, series, galleryGroups, isInSeries } from '@/data/artworks'
import type { CollectionSlug } from '@/data/collections'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'
import { useRememberBrowseContext } from '@/lib/browseContext'
import { textLinkClass } from '@/lib/formStyles'
import { fill } from '@/lib/template'

export type GalleryCopy = {
  eyebrow: string
  intro: string
  allArtworks: string
  searchPlaceholder: string
  sort: string
  sortOptions: Record<'default' | 'year' | 'title' | 'series', string>
  sortDescending: string
  sortAscending: string
  // "{n}" is replaced with the number of works.
  countOne: string
  countOther: string
  noResults: string
  moreCollections: string
  viewAll: string
  // Display names keyed by the English series name / gallery group slug; English names otherwise.
  seriesNames?: Record<string, string>
  groupNames?: Record<string, string>
}

const englishCopy: GalleryCopy = {
  eyebrow: 'Original artworks',
  intro:
    'Explore original artworks by Fabian PhiL, a French contemporary artist based in Dubai. The collection spans kinetic portraits, Pop Glasses, Wanted, motorsport and pop icons, created on layered plexiglass.',
  allArtworks: '← All artworks',
  searchPlaceholder: 'Search artworks...',
  sort: 'Sort',
  sortOptions: { default: 'Default Order', year: 'Year', title: 'Title', series: 'Series' },
  sortDescending: 'Sort Descending',
  sortAscending: 'Sort Ascending',
  countOne: '{n} work',
  countOther: '{n} works',
  noResults: 'No artworks found matching your criteria.',
  moreCollections: 'More collections',
  viewAll: 'View all artworks →',
}

type UrlFilter = { series: string | null; group: string | null }

// useSearchParams lives in its own Suspense boundary so the artwork grid is still server-rendered.
const UrlFilterSync = ({ onChange }: { onChange: (filter: UrlFilter) => void }) => {
  const searchParams = useSearchParams()
  const seriesParam = searchParams.get('series')
  const groupParam = searchParams.get('group')

  useEffect(() => {
    onChange({ series: seriesParam, group: groupParam })
  }, [seriesParam, groupParam, onChange])

  return null
}

const isGroupSlug = (value: string | null | undefined): value is string =>
  Boolean(value && galleryGroups.some(g => g.slug === value))
const isSeriesName = (value: string | null | undefined): value is string =>
  Boolean(value && series.some(s => s.name === value))

type GalleryProps = {
  initialSeries?: string | null
  initialGroup?: string | null
  copy?: GalleryCopy
  cardCopy?: ArtworkCardCopy
  // Localized card text keyed by artwork id.
  texts?: Record<number, ArtworkCardText>
  collectionNames?: Record<CollectionSlug, string>
}

const Gallery = ({
  initialSeries = null,
  initialGroup = null,
  copy = englishCopy,
  cardCopy,
  texts,
  collectionNames,
}: GalleryProps) => {
  const locale = useLocale()
  const startGroup = isGroupSlug(initialGroup) ? initialGroup : null
  const startSeries = !startGroup && isSeriesName(initialSeries) ? initialSeries : 'all'
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedSeries, setSelectedSeries] = useState<string>(startSeries)
  const [selectedGroup, setSelectedGroup] = useState<string | null>(startGroup)
  // Arriving with ?series= or ?group= shows only those works, without the browsing controls.
  const [focused, setFocused] = useState(Boolean(startGroup) || startSeries !== 'all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'default' | 'year' | 'title' | 'series'>('default')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const applyUrlFilter = React.useCallback(({ series: seriesParam, group: groupParam }: UrlFilter) => {
    if (isGroupSlug(groupParam)) {
      setSelectedGroup(groupParam)
      setSelectedSeries('all')
      setFocused(true)
    } else if (isSeriesName(seriesParam)) {
      setSelectedGroup(null)
      setSelectedSeries(seriesParam)
      setFocused(true)
    } else {
      setSelectedGroup(null)
      setSelectedSeries('all')
      setFocused(false)
    }
  }, [])

  const activeGroup = galleryGroups.find(g => g.slug === selectedGroup)
  const activeGroupName = activeGroup && (copy.groupNames?.[activeGroup.slug] ?? activeGroup.name)
  const seriesName = (name: string) => copy.seriesNames?.[name] ?? name
  const countLabel = (n: number) => fill(n !== 1 ? copy.countOther : copy.countOne, { n })
  const cardProps = (id: number) => ({
    ...(cardCopy ? { copy: cardCopy } : {}),
    ...(texts?.[id] ? { text: texts[id] } : {}),
  })

  useRememberBrowseContext({
    label: 'Gallery',
    href: localizedHref(locale, 'gallery', {
      query: activeGroup ? { group: activeGroup.slug } : selectedSeries !== 'all' ? { series: selectedSeries } : undefined,
    }),
  })
  const filteredArtworks = artworks.filter(artwork => {
    const matchesSeries = activeGroup
      ? activeGroup.series.some(name => isInSeries(artwork, name))
      : selectedSeries === 'all' || isInSeries(artwork, selectedSeries)
    const description = texts?.[artwork.id]?.description ?? artwork.description
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSeries && matchesSearch
  })

  // Sort artworks
  const sortedArtworks = [...filteredArtworks].sort((a, b) => {
    if (sortBy === 'default') return 0 // Keep original order
    
    let comparison = 0
    
    switch (sortBy) {
      case 'year':
        comparison = parseInt(a.year) - parseInt(b.year)
        break
      case 'title':
        comparison = a.title.localeCompare(b.title)
        break
      case 'series':
        comparison = a.series.localeCompare(b.series)
        break
    }
    
    return sortOrder === 'asc' ? comparison : -comparison
  })

  // Debug logging (remove in production)
  if (process.env.NODE_ENV === 'development') {
    console.log('Selected series:', selectedSeries)
    console.log('Sort by:', sortBy, 'Order:', sortOrder)
    console.log('Filtered artworks count:', filteredArtworks.length)
    console.log('Sorted artworks count:', sortedArtworks.length)
    console.log('All artworks count:', artworks.length)
  }

  const iconButtonClass = (active: boolean) =>
    `p-1.5 transition-colors ${active ? 'text-gray-900' : 'text-gray-400 hover:text-gray-700'}`

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <Suspense fallback={null}>
        <UrlFilterSync onChange={applyUrlFilter} />
      </Suspense>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {focused ? (
          <>
            <div className="pb-8 md:pb-10">
              <Link href={localizedHref(locale, 'gallery')} className={textLinkClass}>
                {copy.allArtworks}
              </Link>
            </div>
            <header className="max-w-3xl mb-10 md:mb-12">
              <p className="text-xs tracking-[0.24em] uppercase text-gray-500 mb-5">{copy.eyebrow}</p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-light uppercase tracking-[0.04em] text-gray-900 leading-[1.1]">
                {activeGroupName ?? seriesName(selectedSeries).replace(/ Collection$/, '')}
              </h1>
            </header>
            <div className="border-t border-gray-200 pt-5 md:pt-6 mb-8 md:mb-10">
              <p className="text-[11px] tracking-[0.16em] uppercase text-gray-500">
                {countLabel(sortedArtworks.length)}
              </p>
            </div>
          </>
        ) : (
        <>
        <header className="max-w-3xl mb-10 md:mb-12">
          <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6">
            {copy.eyebrow}
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed">
            {copy.intro}
          </p>
        </header>

        <div className="mb-8 md:mb-10">
          <CollectionLinks locale={locale} {...(collectionNames ? { names: collectionNames } : {})} />
        </div>

        {/* Filters and Controls */}
        <div className="border-t border-b border-gray-200 py-5 md:py-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder={copy.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-6 pr-2 py-1.5 bg-transparent border-0 border-b border-gray-300 text-sm font-light text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
              />
            </div>

            <div className="flex items-center gap-6 sm:ml-auto">
              <div className="flex items-center gap-2">
                <span className="text-[11px] tracking-[0.16em] uppercase text-gray-500">{copy.sort}</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-0 border-b border-gray-300 py-1 pr-6 text-sm font-light text-gray-900 focus:outline-none focus:border-gray-900"
                >
                  <option value="default">{copy.sortOptions.default}</option>
                  <option value="year">{copy.sortOptions.year}</option>
                  <option value="title">{copy.sortOptions.title}</option>
                  <option value="series">{copy.sortOptions.series}</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                  title={sortOrder === 'asc' ? copy.sortDescending : copy.sortAscending}
                >
                  <ArrowUpDown size={15} className={sortOrder === 'desc' ? 'rotate-180' : ''} />
                </button>
              </div>

              <div className="flex items-center gap-1">
                <button onClick={() => setViewMode('grid')} className={iconButtonClass(viewMode === 'grid')}>
                  <Grid size={17} />
                </button>
                <button onClick={() => setViewMode('list')} className={iconButtonClass(viewMode === 'list')}>
                  <List size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <p className="text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-8 md:mb-10" aria-live="polite">
          {countLabel(sortedArtworks.length)}
          {(activeGroup || selectedSeries !== 'all') && (
            <> · {activeGroupName ?? seriesName(selectedSeries)}</>
          )}
        </p>
        </>
        )}

        {/* Artworks Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12 md:gap-y-14">
            {sortedArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                viewMode={viewMode}
                {...cardProps(artwork.id)}
              />
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-100 border-t border-gray-100">
            {sortedArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                viewMode={viewMode}
                {...cardProps(artwork.id)}
              />
            ))}
          </div>
        )}

        {sortedArtworks.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16"
          >
            <p className="text-base text-gray-500 font-light">{copy.noResults}</p>
          </motion.div>
        )}

        {focused && (
          <div className="mt-16 md:mt-20 border-t border-gray-200 pt-8 md:pt-10 space-y-8">
            <CollectionLinks
              locale={locale}
              label={copy.moreCollections}
              {...(collectionNames ? { names: collectionNames } : {})}
            />
            <Link href={localizedHref(locale, 'gallery')} className={textLinkClass}>
              {copy.viewAll}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Gallery
