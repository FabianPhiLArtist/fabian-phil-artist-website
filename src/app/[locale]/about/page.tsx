import React from 'react'
import AboutPage from '@/components/AboutPage'
import { frAboutCopy } from '@/i18n/fr/about'

export default function About({ params }: { params: { locale: string } }) {
  return <AboutPage {...(params.locale === 'fr' ? { copy: frAboutCopy } : {})} />
}
