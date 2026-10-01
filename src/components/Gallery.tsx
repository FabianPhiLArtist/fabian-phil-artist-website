'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Grid, List, Search, ArrowUpDown } from 'lucide-react'
import ArtworkCard from './ArtworkCard'
import { artworks, series, galleryGroups, isInSeries } from '@/data/artworks'

const Gallery = () => {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedSeries, setSelectedSeries] = useState<string>('all')
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'default' | 'year' | 'title' | 'series'>('default')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Handle URL parameters
  useEffect(() => {
    const seriesParam = searchParams.get('series')
    const groupParam = searchParams.get('group')
    if (groupParam && galleryGroups.some(g => g.slug === groupParam)) {
      setSelectedGroup(groupParam)
      setSelectedSeries('all')
    } else if (seriesParam) {
      setSelectedSeries(seriesParam)
    }
  }, [searchParams])

  const seriesOptions = ['all', ...series.map(s => s.name)]
  const activeGroup = galleryGroups.find(g => g.slug === selectedGroup)
  const selectSeries = (seriesName: string) => {
    setSelectedGroup(null)
    setSelectedSeries(seriesName)
  }

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSeries = activeGroup
      ? activeGroup.series.some(name => isInSeries(artwork, name))
      : selectedSeries === 'all' || isInSeries(artwork, selectedSeries)
    const matchesSearch = artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artwork.description.toLowerCase().includes(searchTerm.toLowerCase())
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-10 md:mb-12">
          <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6">
            Gallery
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed">
            Explore the complete collection of kinetic pop art by Fabian PhiL.
            Each piece represents a unique fusion of movement, color, and contemporary culture.
          </p>
        </header>

        {/* Filters and Controls */}
        <div className="border-t border-b border-gray-200 py-5 md:py-6 mb-6 space-y-5">
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {seriesOptions.map((seriesName) => {
              const isActive = !activeGroup && selectedSeries === seriesName
              return (
                <button
                  key={seriesName}
                  onClick={() => selectSeries(seriesName)}
                  className={`text-[11px] tracking-[0.16em] uppercase pb-0.5 border-b transition-colors ${
                    isActive
                      ? 'text-gray-900 border-gray-900'
                      : 'text-gray-500 border-transparent hover:text-gray-900'
                  }`}
                >
                  {seriesName === 'all' ? 'All Series' : seriesName}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="Search artworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-6 pr-2 py-1.5 bg-transparent border-0 border-b border-gray-300 text-sm font-light text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-gray-900 transition-colors"
              />
            </div>

            <div className="flex items-center gap-6 sm:ml-auto">
              <div className="flex items-center gap-2">
                <span className="text-[11px] tracking-[0.16em] uppercase text-gray-500">Sort</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent border-0 border-b border-gray-300 py-1 pr-6 text-sm font-light text-gray-900 focus:outline-none focus:border-gray-900"
                >
                  <option value="default">Default Order</option>
                  <option value="year">Year</option>
                  <option value="title">Title</option>
                  <option value="series">Series</option>
                </select>
                <button
                  onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                  className="p-1.5 text-gray-500 hover:text-gray-900 transition-colors"
                  title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
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
          {sortedArtworks.length} work{sortedArtworks.length !== 1 ? 's' : ''}
          {(activeGroup || selectedSeries !== 'all') && (
            <> · {activeGroup ? activeGroup.name : selectedSeries}</>
          )}
        </p>

        {/* Artworks Grid/List */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 lg:gap-x-8 gap-y-12 md:gap-y-14">
            {sortedArtworks.map((artwork) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                viewMode={viewMode}
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
            <p className="text-base text-gray-500 font-light">No artworks found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Gallery
