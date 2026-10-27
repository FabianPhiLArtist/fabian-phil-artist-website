import React from 'react'
import { notFound } from 'next/navigation'
import ExhibitionsPage from '@/components/ExhibitionsPage'
import { frenchStaticPage } from '@/i18n/fr/content'
import { frExhibitions, frExhibitionsCopy } from '@/i18n/fr/exhibitions'
import { frSimpleImageModalCopy } from '@/i18n/fr/ui'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== 'fr') {
    return <ExhibitionsPage />
  }
  if (!frenchStaticPage('exhibitions')) {
    notFound()
  }
  return <ExhibitionsPage exhibitions={frExhibitions} copy={frExhibitionsCopy} imageModalCopy={frSimpleImageModalCopy} />
}
