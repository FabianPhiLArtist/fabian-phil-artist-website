import React from 'react'
import Hero from '@/components/Hero'
import FeaturedArtworks from '@/components/FeaturedArtworks'
import CollectionsShowcase from '@/components/CollectionsShowcase'
import ExpressiveEmotionHighlight from '@/components/ExpressiveEmotionHighlight'
import LuminousVisionHighlight from '@/components/LuminousVisionHighlight'
import DigitalFusionHighlight from '@/components/DigitalFusionHighlight'
import KineticArtHighlight from '@/components/KineticArtHighlight'
import AboutPreview from '@/components/AboutPreview'
import CollectorCTA from '@/components/CollectorCTA'

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedArtworks />
      <CollectionsShowcase />
      <ExpressiveEmotionHighlight />
      <LuminousVisionHighlight />
      <DigitalFusionHighlight />
      <KineticArtHighlight />
      <AboutPreview />
      <CollectorCTA />
    </>
  )
}
