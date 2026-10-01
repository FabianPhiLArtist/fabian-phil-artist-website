import React, { Suspense } from 'react'
import type { Metadata } from 'next'
import Gallery from '@/components/Gallery'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return pageMetadata({
    locale,
    route: 'gallery',
    title: 'Gallery - Fabian PhiL Artist',
    description: 'Explore the complete collection of kinetic pop art by Fabian PhiL. Browse by series: Pandas, F1, and Wanted Series.',
  })
}

export default function GalleryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading gallery...</p>
      </div>
    </div>}>
      <Gallery />
    </Suspense>
  )
}
