import React from 'react'
import { notFound } from 'next/navigation'
import ContactPage from '@/components/ContactPage'
import { frenchStaticPage } from '@/i18n/fr/content'
import { frContactCopy } from '@/i18n/fr/contact'

export default function Page({ params }: { params: { locale: string } }) {
  if (params.locale !== 'fr') {
    return <ContactPage />
  }
  if (!frenchStaticPage('contact')) {
    notFound()
  }
  return <ContactPage copy={frContactCopy} />
}
