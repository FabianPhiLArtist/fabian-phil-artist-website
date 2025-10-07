'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Filter, Grid, List, Search, ArrowUpDown, Calendar, DollarSign, Tag } from 'lucide-react'
import ArtworkCard from './ArtworkCard'
import { artworks, series } from '@/data/artworks'

const Gallery = () => {
  const searchParams = useSearchParams()
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedSeries, setSelectedSeries] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'default' | 'year' | 'title' | 'price' | 'series'>('default')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  // Handle URL parameters
  useEffect(() => {
    const seriesParam = searchParams.get('series')
    if (seriesParam) {
      setSelectedSeries(seriesParam)
    }
  }, [searchParams])

  const seriesOptions = ['all', ...series.map(s => s.name)]

  const filteredArtworks = artworks.filter(artwork => {
    const matchesSeries = selectedSeries === 'all' || artwork.series === selectedSeries
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
      case 'price':
        // Extract numeric value from price (remove € and ,)
        const priceA = parseInt(a.price.replace(/[€,]/g, ''))
        const priceB = parseInt(b.price.replace(/[€,]/g, ''))
        comparison = priceA - priceB
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col lg:flex-row items-start lg:items-center gap-8"
          >
            {/* Text Content */}
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Gallery
              </h1>
              <p className="text-xl text-gray-600 max-w-3xl">
                Explore the complete collection of kinetic pop art by Fabian Phil. 
                Each piece represents a unique fusion of movement, color, and contemporary culture.
              </p>
              {selectedSeries !== 'all' && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800 font-medium">
                    Showing {sortedArtworks.length} artwork{sortedArtworks.length !== 1 ? 's' : ''} from {selectedSeries}
                  </p>
                </div>
              )}
            </div>
            
            {/* Artist Photo */}
            <div className="flex-shrink-0">
              <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-lg">
                <Image
                  src="/images/personal/Photo Fabian PhiL artist.jpg"
                  alt="Fabian Phil Artist"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '15% 40%', transform: 'scale(1.2)' }}
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-2 font-medium">
                Fabian Phil Artist
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search artworks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Series Filter */}
            <div className="flex flex-wrap gap-2">
              {seriesOptions.map((seriesName) => (
                <button
                  key={seriesName}
                  onClick={() => setSelectedSeries(seriesName)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedSeries === seriesName
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {seriesName === 'all' ? 'All Series' : seriesName}
                </button>
              ))}
            </div>

            {/* Sorting Controls */}
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 font-medium">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="default">Default Order</option>
                <option value="year">Year</option>
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="series">Series</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                <ArrowUpDown size={16} className={sortOrder === 'desc' ? 'rotate-180' : ''} />
              </button>
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-500'
                }`}
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-colors duration-200 ${
                  viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-500'
                }`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Artworks Grid/List */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedArtworks.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {sortedArtworks.map((artwork, index) => (
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
            className="text-center py-12"
          >
            <p className="text-xl text-gray-500">No artworks found matching your criteria.</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Gallery
