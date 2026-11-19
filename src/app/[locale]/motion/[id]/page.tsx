import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import JsonLd from '@/components/JsonLd'
import { artworks } from '@/data/artworks'
import { motionPilots } from '@/data/motionPilots'
import { isLocale } from '@/i18n/locales'
import { localizedPath } from '@/i18n/pathnames'
import { languageAlternates } from '@/i18n/seo'
import { absoluteUrl } from '@/lib/site'

type Props = { params: Promise<{ locale: string; id: string }> }
async function getData({ params }: Props) {
  const { locale, id } = await params
  const pilot = motionPilots.find(p => p.slug === id)
  if (!isLocale(locale) || !pilot) notFound()
  const artwork = artworks.find(a => a.id === pilot.id)
  if (!artwork || !artwork.video) notFound()
  const fr = locale === 'fr'
  const video = 'video' in pilot ? pilot.video : artwork.video
  const poster = 'poster' in pilot ? pilot.poster : artwork.image
  const title = artwork.title + (fr ? ' — œuvre en mouvement' : ' — artwork in motion')
  const description = fr ? pilot.fr : pilot.en
  const url = absoluteUrl(localizedPath(locale, 'motion', { id }))
  return { locale, id, artwork, pilot, fr, video, poster, title, description, url }
}
export function generateStaticParams() {
  return motionPilots.map(p => ({ id: p.slug }))
}
export async function generateMetadata(props: Props): Promise<Metadata> {
  const d = await getData(props)
  return { title: d.title + ' | Fabian PhiL', description: d.description,
    alternates: { canonical: d.url, languages: languageAlternates('motion', { id: d.id }) },
    openGraph: { title: d.title, description: d.description, url: d.url, images: [absoluteUrl(d.poster)] } }
}
export default async function MotionPage(props: Props) {
  const d = await getData(props)
  return <article className="max-w-4xl mx-auto px-5 py-12 md:py-20">
    <JsonLd data={{ '@context': 'https://schema.org', '@type': 'VideoObject', '@id': d.url + '#video',
      name: d.title, description: d.description, thumbnailUrl: absoluteUrl(d.poster),
      contentUrl: absoluteUrl(d.video), uploadDate: d.pilot.date, inLanguage: d.locale }} />
    <p className="text-xs uppercase tracking-[0.24em] mb-3">{d.fr ? 'L’art en mouvement' : 'Art in motion'}</p>
    <h1 className="text-2xl md:text-4xl mb-6">{d.title}</h1>
    <video controls playsInline preload="metadata" poster={d.poster} src={d.video}
      aria-label={d.title} className="w-full max-h-[70vh] object-contain bg-black" />
    <p className="mt-6 leading-relaxed">{d.description}</p>
    <p className="mt-4 leading-relaxed">{d.fr ? 'Fabian PhiL peint sur plusieurs couches de plexiglas. En changeant de position, le spectateur découvre une image qui se transforme par la perspective.' : 'Fabian PhiL paints on multiple layers of plexiglass. As the viewer changes position, the layers appear to shift, transforming the image through perspective.'}</p>
    <Link className="inline-block mt-7 underline underline-offset-4" href={localizedPath(d.locale, 'artwork', { id: d.artwork.id })}>{d.fr ? 'Découvrir l’œuvre' : 'View the artwork'} →</Link>
  </article>
}
