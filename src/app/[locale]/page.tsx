import React from 'react'
import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import ArtThatMoves from '@/components/home/ArtThatMoves'
import ExploreArtworks from '@/components/home/ExploreArtworks'
import ArtistCredibility from '@/components/home/ArtistCredibility'
import GalleriesCurators from '@/components/home/GalleriesCurators'
import InteriorsCollaborations from '@/components/home/InteriorsCollaborations'
import CommonQuestions from '@/components/home/CommonQuestions'
import { isLocale } from '@/i18n/locales'
import { pageMetadata } from '@/i18n/seo'

export function generateMetadata({ params }: { params: { locale: string } }): Metadata {
  const locale = isLocale(params.locale) ? params.locale : 'en'
  return pageMetadata({
    locale,
    route: 'home',
    title: 'Fabian PhiL | Contemporary Pop Artist in Dubai',
    description:
      'Discover Fabian PhiL, a French contemporary artist based in Dubai creating kinetic pop portraits on layered plexiglass that transform with movement, perspective and light.',
  })
}

export default function Home() {
  return (
    <>
      <Hero />
      <ArtThatMoves />
      <ExploreArtworks />
      <ArtistCredibility />
      <GalleriesCurators />
      <InteriorsCollaborations />
      <CommonQuestions />
    </>
  )
}
