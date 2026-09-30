'use client'

import { useParams } from 'next/navigation'
import { defaultLocale, isLocale, type Locale } from './locales'

export function useLocale(): Locale {
  const params = useParams()
  const locale = params?.locale
  if (typeof locale === 'string' && isLocale(locale)) {
    return locale
  }
  return defaultLocale
}
