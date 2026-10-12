import React from 'react'
import ArtworkDetail from '@/components/ArtworkDetail'
import { frenchArtwork } from '@/i18n/fr/content'
import { frArtworkDetailCopy } from '@/i18n/fr/ui'

export default function ArtworkDetailPage({ params }: { params: { locale: string; id: string } }) {
  const french = params.locale === 'fr' ? frenchArtwork(params.id) : undefined
  if (!french) {
    return <ArtworkDetail />
  }
  const { imageAlt, description, inMotion, medium, size, series, seriesBlock } = french
  return (
    <ArtworkDetail copy={frArtworkDetailCopy} text={{ imageAlt, description, inMotion, medium, size, series, seriesBlock }} />
  )
}
