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
    <Suspense fallback={<div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-[11px] tracking-[0.16em] uppercase text-gray-500">Loading gallery...</p>
    </div>}>
      <Gallery />
    </Suspense>
  )
}
