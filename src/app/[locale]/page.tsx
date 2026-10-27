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
import { frHomeCopy } from '@/i18n/fr/home'

// Must equal INSTAGRAM_FEATURE_REVALIDATE_SECONDS; Next requires a literal here.
export const revalidate = 21600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale: localeParam } = await params
  const locale = isLocale(localeParam) ? localeParam : 'en'
  return pageMetadata({
    locale,
    route: 'home',
    title: 'Fabian PhiL | French Pop Artist in Dubai – Kinetic Pop Art',
    description:
      'Fabian PhiL is a French pop artist based in Dubai, creating kinetic pop art on layered plexiglass: original figurative portraits that change as you move.',
  })
}

// English sections use their built-in copy; French copy is passed only on French pages so it never
// enters the English payload.
export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const fr = locale === 'fr' ? frHomeCopy : undefined
  const copy = <K extends keyof typeof frHomeCopy>(key: K) => (fr ? { copy: fr[key] } : {})

  return (
    <>
      <Hero {...copy('hero')} />
      <ExploreArtworks {...copy('explore')} />
      <ArtThatMoves {...copy('artThatMoves')} />
      <ArtistCredibility {...copy('credibility')} />
      <GalleriesCurators {...copy('galleries')} />
      <InteriorsCollaborations {...copy('interiors')} />
      <CommonQuestions {...copy('commonQuestions')} />
      <InstagramFeature {...copy('instagram')} />
    </>
  )
}
