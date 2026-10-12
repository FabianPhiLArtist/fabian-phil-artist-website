'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import SimpleImageModal, { type SimpleImageModalCopy } from '@/components/SimpleImageModal'
import CollectionLinks from '@/components/CollectionLinks'
import LocaleLink from '@/components/LocaleLink'
import type { CollectionSlug } from '@/data/collections'
import { useLocale } from '@/i18n/useLocale'
import { textLinkClass } from '@/lib/formStyles'

export type AboutPageCopy = {
  eyebrow: string
  title: string
  studioImage: { alt: string; title: string }
  biography: string[]
  facts: { label: string; value: string }[]
  gazeHeading: string
  gazeLead: string
  gazeText: string
  // Rendered as is, including its quotation marks.
  quote: string
  journeyHeading: string
  journey: { title: string; text: string }[]
  influences: string
  exploreHeading: string
  collectionsLabel?: string
  collectionNames?: Record<CollectionSlug, string>
  viewAll: string
  exhibitions: string
  contactHeading: string
  contactText: string
  whatsapp: string
  email: string
  modal?: SimpleImageModalCopy
}

const englishCopy: AboutPageCopy = {
  eyebrow: 'The artist',
  title: 'A French artist shaped by an international life.',
  studioImage: {
    alt: 'Fabian PhiL, French contemporary pop artist, in his Dubai studio',
    title: 'Studio, Dubai',
  },
  biography: [
    'Originally from France, Fabian PhiL spent more than two decades living and working across Asia, Europe, Africa and the Middle East before establishing his artistic practice in Dubai.',
    'His early work with seismic waves left him with an enduring fascination for layers, movement and what lies beneath the surface—ideas that would later find an unexpected expression in his art.',
    'Working across multiple sheets of transparent plexiglass, Fabian builds his portraits layer by layer. As the viewer moves, those layers shift in relation to one another, transforming the image with perspective.',
    'Faces, expressive gazes, coloured glasses, provocative titles and familiar cultural icons have become recurring elements of a visual language designed not simply to be looked at, but experienced.',
  ],
  facts: [
    { label: 'Full name', value: 'Fabian Philandrianos' },
    { label: 'Based in', value: 'Dubai, UAE' },
    { label: 'Practice', value: 'Kinetic pop art on layered plexiglass' },
  ],
  gazeHeading: 'The gaze, the movement, the story',
  gazeLead:
    'The gaze is often the starting point. Eyes and expressions establish the first connection; movement changes what the viewer sees; titles introduce humour, ambiguity or provocation.',
  gazeText:
    'In the Pop Glasses works, colour alters the personality of the portrait. In the Wanted series, the language of the mugshot turns the subject into a character. Across the practice, the artwork continues to change through perspective, light and the position of the viewer.',
  quote:
    '“What interests me is the emotion behind a face — the eyes, the expression, the sense that something is about to move. I use transparency, light and layered images to give the portrait a changing presence.”',
  journeyHeading: 'The artistic journey',
  journey: [
    {
      title: 'The first painting — Brunei',
      text: 'Fabian painted his first artwork in Brunei in 2003. That single painting took him an entire year to complete, and taught him the patience and dedication art demands.',
    },
    {
      title: 'The Blue Lady — Africa',
      text: 'In 2011, painting the Blue Lady twice, on two plexiglass sheets, he discovered that vertical strokes created movement as the viewer moved around the work: the eyes seemed to follow, like the Mona Lisa. This became the foundation of his kinetic technique.',
    },
    {
      title: 'Evolution — Dubai',
      text: 'In Dubai the work expanded into Pop Glasses painted in fluorescent colour, 100 USD bill triptychs, and digital design combined with painting, cartoons and boxing themes. In 2025 he introduced pandas set in zen landscapes of temples, lakes and cherry blossom trees.',
    },
  ],
  influences:
    'Along the way he studied modern artists including Klasen, Delorme and Warhol, before finding his own voice through chance and experimentation.',
  exploreHeading: 'Explore the work',
  viewAll: 'View all artworks →',
  exhibitions: 'Exhibitions →',
  contactHeading: "Let's Connect",
  contactText: 'Interested in an artwork, exhibition or commission? Contact the studio.',
  whatsapp: 'WhatsApp Me →',
  email: 'Send Email →',
}

const sectionLabel = 'text-xs tracking-[0.24em] uppercase text-gray-900'
const bodyText = 'text-sm md:text-base text-gray-600 font-light leading-relaxed'

const studioImageSrc = '/images/exhibitions/fabian-phil-artist-studio-dubai.jpg'

const AboutPage = ({ copy = englishCopy }: { copy?: AboutPageCopy }) => {
  const locale = useLocale()
  const [modalImage, setModalImage] = useState<{
    src: string
    alt: string
    title?: string
  } | null>(null)

  const openModal = (src: string, alt: string, title?: string) => {
    setModalImage({ src, alt, title })
  }

  const closeModal = () => {
    setModalImage(null)
  }

  return (
    <div className="min-h-screen bg-white pt-28">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16">
        <p className={`${sectionLabel} mb-6`}>{copy.eyebrow}</p>
        <h1 className="max-w-4xl text-2xl md:text-3xl lg:text-4xl font-light uppercase tracking-[0.04em] text-gray-900 leading-snug">
          {copy.title}
        </h1>
      </header>

      {/* Biography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <figure className="lg:col-span-6 m-0">
            <button
              type="button"
              onClick={() => openModal(studioImageSrc, copy.studioImage.alt, copy.studioImage.title)}
              className="relative block w-full aspect-[4/3] bg-gray-100 overflow-hidden hover:opacity-90 transition-opacity"
            >
              <Image
                src={studioImageSrc}
                alt={copy.studioImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </button>
            <figcaption className="mt-2 text-[10px] tracking-[0.18em] uppercase text-gray-500">
              {copy.studioImage.title}
            </figcaption>
          </figure>

          <div className="lg:col-span-6">
            <h2 className={`${sectionLabel} mb-8`}>Fabian PhiL</h2>
            <div className="space-y-5 mb-10">
              {copy.biography.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 0 ? 'text-lg md:text-xl font-light text-gray-800 leading-relaxed' : bodyText}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <dl className="border-t border-gray-200 divide-y divide-gray-200">
              {copy.facts.map((fact) => (
                <div key={fact.label} className="flex justify-between gap-6 py-3.5">
                  <dt className="text-[11px] tracking-[0.16em] uppercase text-gray-500 pt-0.5">{fact.label}</dt>
                  <dd className="text-sm text-gray-900 font-light text-right">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* The gaze, the movement, the story */}
      <section className="bg-[#fafafa] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${sectionLabel} mb-10`}>{copy.gazeHeading}</h2>
          <div className="space-y-6 mb-12">
            <p className="text-lg md:text-xl font-light text-gray-800 leading-relaxed">
              {copy.gazeLead}
            </p>
            <p className={bodyText}>
              {copy.gazeText}
            </p>
          </div>
          <blockquote className="border-l border-gray-900 pl-5 m-0">
            <p className="text-base md:text-lg font-light text-gray-900 leading-relaxed">
              {copy.quote}
            </p>
            <footer className="mt-3 text-[11px] tracking-[0.16em] uppercase text-gray-500">Fabian PhiL</footer>
          </blockquote>
        </div>
      </section>

      {/* Journey */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${sectionLabel} mb-10 md:mb-14`}>{copy.journeyHeading}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {copy.journey.map((chapter, index) => (
              <div key={chapter.title} className="border-t border-gray-900 pt-6">
                <p className="text-[11px] tracking-[0.2em] uppercase text-gray-400 mb-4">
                  {String(index + 1).padStart(2, '0')}
                </p>
                <h3 className="text-base md:text-lg font-light uppercase tracking-[0.04em] text-gray-900 leading-snug mb-4">
                  {chapter.title}
                </h3>
                <p className={bodyText}>{chapter.text}</p>
              </div>
            ))}
          </div>
          <p className={`${bodyText} mt-12 max-w-3xl`}>
            {copy.influences}
          </p>
        </div>
      </section>

      {/* Explore */}
      <section className="bg-[#fafafa] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className={sectionLabel}>{copy.exploreHeading}</h2>
          <CollectionLinks
            locale={locale}
            {...(copy.collectionsLabel ? { label: copy.collectionsLabel } : {})}
            names={copy.collectionNames}
          />
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            <LocaleLink locale={locale} route="gallery" className={textLinkClass}>
              {copy.viewAll}
            </LocaleLink>
            <LocaleLink locale={locale} route="exhibitions" className={textLinkClass}>
              {copy.exhibitions}
            </LocaleLink>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-gray-100 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${sectionLabel} mb-6`}>{copy.contactHeading}</h2>
          <p className="text-lg md:text-xl font-light text-gray-800 leading-relaxed mb-8">
            {copy.contactText}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            <a href="https://wa.me/971567594229" className={textLinkClass}>
              {copy.whatsapp}
            </a>
            <a href="mailto:fabianphilartist@gmail.com" className={textLinkClass}>
              {copy.email}
            </a>
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {modalImage && (
        <SimpleImageModal
          isOpen={!!modalImage}
          onClose={closeModal}
          imageSrc={modalImage.src}
          alt={modalImage.alt}
          title={modalImage.title}
          {...(copy.modal ? { copy: copy.modal } : {})}
        />
      )}
    </div>
  )
}

export default AboutPage
