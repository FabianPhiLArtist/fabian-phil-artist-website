import React from 'react'
import Link from 'next/link'
import type { Locale } from '@/i18n/locales'
import { fallbackHrefLang, localizedHref, type AppRoute, type LocalizedHrefOptions } from '@/i18n/pathnames'

type Props = Omit<React.ComponentProps<typeof Link>, 'href' | 'hrefLang'> & {
  locale: Locale
  route: AppRoute
  options?: LocalizedHrefOptions
}

// Internal link in the current locale. A French page that is not published links to its English
// equivalent instead, marked hrefLang="en".
const LocaleLink = ({ locale, route, options, ...props }: Props) => (
  <Link href={localizedHref(locale, route, options)} hrefLang={fallbackHrefLang(locale, route, options)} {...props} />
)

export default LocaleLink
