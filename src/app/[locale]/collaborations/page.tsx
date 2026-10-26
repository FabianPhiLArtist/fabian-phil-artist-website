import React from 'react'
import { notFound } from 'next/navigation'
import CollaborationsPage from '@/components/CollaborationsPage'
import { frenchStaticPage } from '@/i18n/fr/content'
import { frCollaborationsCopy } from '@/i18n/fr/collaborations'

export default function Page({ params }: { params: { locale: string } }) {
  if (params.locale !== 'fr') {
    return <CollaborationsPage />
  }
  if (!frenchStaticPage('collaborations')) {
    notFound()
  }
  return <CollaborationsPage copy={frCollaborationsCopy} />
}
