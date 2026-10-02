import React from 'react'
import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import JsonLd from '@/components/JsonLd'
import { siteStructuredData } from '@/lib/structuredData'
import { isLocale, locales } from '@/i18n/locales'
import type { Locale } from '@/i18n/locales'

const inter = Inter({ subsets: ['latin'] })

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
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
        <JsonLd data={siteStructuredData()} />
        <Navigation locale={locale} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  )
}
