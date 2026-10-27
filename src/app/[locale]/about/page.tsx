import React from 'react'
import AboutPage from '@/components/AboutPage'
import { frAboutCopy } from '@/i18n/fr/about'

export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  return <AboutPage {...(locale === 'fr' ? { copy: frAboutCopy } : {})} />
}
