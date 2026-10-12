import React from 'react'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { siteStructuredData } from '@/lib/structuredData'
import { isLocale, locales } from '@/i18n/locales'
import type { Locale } from '@/i18n/locales'
import { hasLiveFrenchPages } from '@/i18n/readiness'
import { frFooterCopy, frNavigationCopy } from '@/i18n/fr/ui'

const inter = Inter({ subsets: ['latin'] })

// French pages are only prerendered once at least one of them is live.
export function generateStaticParams() {
  return locales
    .filter((locale) => locale === 'en' || hasLiveFrenchPages())
    .map((locale) => ({ locale }))
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  if (!isLocale(params.locale)) {
    notFound()
  }

  const locale: Locale = params.locale

  return (
    <html lang={locale} className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <JsonLd data={siteStructuredData(locale)} />
        <Navigation locale={locale} {...(locale === 'fr' ? { copy: frNavigationCopy } : {})} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer locale={locale} {...(locale === 'fr' ? { copy: frFooterCopy } : {})} />
      </body>
    </html>
  )
}
