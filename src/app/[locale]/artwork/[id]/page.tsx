import React from 'react'
import ArtworkDetail from '@/components/ArtworkDetail'
import { frenchArtwork } from '@/i18n/fr/content'
import { frArtworkDetailCopy } from '@/i18n/fr/ui'

export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>
}) {
  const { locale, id } = await params
  const french = locale === 'fr' ? frenchArtwork(id) : undefined
  if (!french) {
    return <ArtworkDetail />
  }
  const { imageAlt, description, inMotion, medium, size, series, seriesBlock, edition, availability } = french
  return (
    <ArtworkDetail
      copy={frArtworkDetailCopy}
      text={{ imageAlt, description, inMotion, medium, size, series, seriesBlock, edition, availability }}
    />
  )
}
