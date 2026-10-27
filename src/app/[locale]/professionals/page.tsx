import React from 'react'
import { notFound } from 'next/navigation'
import ProfessionalsPage from '@/components/ProfessionalsPage'
import { frenchStaticPage } from '@/i18n/fr/content'
import { frProfessionalsCopy } from '@/i18n/fr/professionals'

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== 'fr') {
    return <ProfessionalsPage />
  }
  if (!frenchStaticPage('professionals')) {
    notFound()
  }
  return <ProfessionalsPage copy={frProfessionalsCopy} />
}
