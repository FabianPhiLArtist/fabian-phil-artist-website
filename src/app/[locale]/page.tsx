import React from 'react'
import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import ArtThatMoves from '@/components/home/ArtThatMoves'
import ExploreArtworks from '@/components/home/ExploreArtworks'
import ArtistCredibility from '@/components/home/ArtistCredibility'
import GalleriesCurators from '@/components/home/GalleriesCurators'
import InteriorsCollaborations from '@/components/home/InteriorsCollaborations'
import CommonQuestions from '@/components/home/CommonQuestions'
import InstagramFeature from '@/components/home/InstagramFeature'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

// Must equal INSTAGRAM_FEATURE_REVALIDATE_SECONDS; Next requires a literal here.
export const revalidate = 21600

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return pageMetadata({
    locale,
    route: 'home',
    title: 'Fabian PhiL | French Pop Artist in Dubai',
    description:
      'Fabian PhiL is a French contemporary pop artist based in Dubai, creating original figurative and kinetic artworks on layered plexiglass.',
  })
}

export default function Home() {
  return (
    <>
      <Hero />
      <ExploreArtworks />
      <ArtThatMoves />
      <ArtistCredibility />
      <GalleriesCurators />
      <InteriorsCollaborations />
      <CommonQuestions />
      <InstagramFeature />
    </>
  )
}
