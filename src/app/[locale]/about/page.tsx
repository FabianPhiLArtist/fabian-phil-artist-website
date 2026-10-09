'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import SimpleImageModal from '@/components/SimpleImageModal'
import CollectionLinks from '@/components/CollectionLinks'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'
import { textLinkClass } from '@/lib/formStyles'

const biography = [
  'Originally from France, Fabian PhiL spent more than two decades living and working across Asia, Europe, Africa and the Middle East before establishing his artistic practice in Dubai.',
  'His early work with seismic waves left him with an enduring fascination for layers, movement and what lies beneath the surface—ideas that would later find an unexpected expression in his art.',
  'Working across multiple sheets of transparent plexiglass, Fabian builds his portraits layer by layer. As the viewer moves, those layers shift in relation to one another, transforming the image with perspective.',
  'Faces, expressive gazes, coloured glasses, provocative titles and familiar cultural icons have become recurring elements of a visual language designed not simply to be looked at, but experienced.',
]

const facts = [
  { label: 'Full name', value: 'Fabian Philandrianos' },
  { label: 'Based in', value: 'Dubai, UAE' },
  { label: 'Practice', value: 'Kinetic pop art on layered plexiglass' },
]

const journey = [
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
]

const sectionLabel = 'text-xs tracking-[0.24em] uppercase text-gray-900'
const bodyText = 'text-sm md:text-base text-gray-600 font-light leading-relaxed'

const studioImage = {
  src: '/images/exhibitions/fabian-phil-artist-studio-dubai.jpg',
  alt: 'Fabian PhiL in his Dubai studio at the worktable, with a layered plexiglass work in progress',
  title: 'Studio, Dubai',
}

const AboutPage = () => {
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
        <p className={`${sectionLabel} mb-6`}>The artist</p>
        <h1 className="max-w-4xl text-2xl md:text-3xl lg:text-4xl font-light uppercase tracking-[0.04em] text-gray-900 leading-snug">
          A French artist shaped by an international life.
        </h1>
      </header>

      {/* Biography */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <figure className="lg:col-span-6 m-0">
            <button
              type="button"
              onClick={() => openModal(studioImage.src, studioImage.alt, studioImage.title)}
              className="relative block w-full aspect-[4/3] bg-gray-100 overflow-hidden hover:opacity-90 transition-opacity"
            >
              <Image
                src={studioImage.src}
                alt={studioImage.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </button>
            <figcaption className="mt-2 text-[10px] tracking-[0.18em] uppercase text-gray-500">
              {studioImage.title}
            </figcaption>
          </figure>

          <div className="lg:col-span-6">
            <h2 className={`${sectionLabel} mb-8`}>Fabian PhiL</h2>
            <div className="space-y-5 mb-10">
              {biography.map((paragraph, index) => (
                <p
                  key={index}
                  className={index === 0 ? 'text-lg md:text-xl font-light text-gray-800 leading-relaxed' : bodyText}
                >
                  {paragraph}
                </p>
              ))}
            </div>
            <dl className="border-t border-gray-200 divide-y divide-gray-200">
              {facts.map((fact) => (
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
          <h2 className={`${sectionLabel} mb-10`}>The gaze, the movement, the story</h2>
          <div className="space-y-6 mb-12">
            <p className="text-lg md:text-xl font-light text-gray-800 leading-relaxed">
              The gaze is often the starting point. Eyes and expressions establish the first connection; movement changes what the viewer sees; titles introduce humour, ambiguity or provocation.
            </p>
            <p className={bodyText}>
              In the Pop Glasses works, colour alters the personality of the portrait. In the Wanted series, the language of the mugshot turns the subject into a character. Across the practice, the artwork continues to change through perspective, light and the position of the viewer.
            </p>
          </div>
          <blockquote className="border-l border-gray-900 pl-5 m-0">
            <p className="text-base md:text-lg font-light text-gray-900 leading-relaxed">
              &ldquo;What interests me is the emotion behind a face &mdash; the eyes, the expression, the sense that something is about to move.
              I use transparency, light and layered images to give the portrait a changing presence.&rdquo;
            </p>
            <footer className="mt-3 text-[11px] tracking-[0.16em] uppercase text-gray-500">Fabian PhiL</footer>
          </blockquote>
        </div>
      </section>

      {/* Journey */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${sectionLabel} mb-10 md:mb-14`}>The artistic journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
            {journey.map((chapter, index) => (
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
            Along the way he studied modern artists including Klasen, Delorme and Warhol, before finding his own voice through chance and experimentation.
          </p>
        </div>
      </section>

      {/* Explore */}
      <section className="bg-[#fafafa] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <h2 className={sectionLabel}>Explore the work</h2>
          <CollectionLinks locale={locale} />
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            <Link href={localizedHref(locale, 'gallery')} className={textLinkClass}>
              View all artworks →
            </Link>
            <Link href={localizedHref(locale, 'exhibitions')} className={textLinkClass}>
              Exhibitions →
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-gray-100 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${sectionLabel} mb-6`}>Let&apos;s Connect</h2>
          <p className="text-lg md:text-xl font-light text-gray-800 leading-relaxed mb-8">
            Interested in an artwork, exhibition or commission? Contact the studio.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            <a href="https://wa.me/971567594229" className={textLinkClass}>
              WhatsApp Me →
            </a>
            <a href="mailto:fabianphilartist@gmail.com" className={textLinkClass}>
              Send Email →
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
        />
      )}
    </div>
  )
}

export default AboutPage
