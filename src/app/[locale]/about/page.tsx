'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import SimpleImageModal from '@/components/SimpleImageModal'
import { textLinkClass } from '@/lib/formStyles'

const facts = [
  'Geophysicist & Former Corporate Executive',
  'Self-Taught Kinetic Pop Artist',
  'Based in Dubai, UAE',
  'From Seismic Waves to Kinetic Art',
]

const journey = [
  {
    title: 'The First Painting - Brunei (2002-2006)',
    text: "Born into a family of art collectors, I was always drawn to what I was not yet - artists, philosophers, historians. As an engineer studying business, I felt a pull toward creative expression. In Brunei's jungle in 2003, I painted my first artwork - a single painting that took me an entire year to complete, teaching me the patience and dedication art demands.",
  },
  {
    title: 'The Blue Lady Discovery - Africa (2006-2010)',
    text: 'As a geophysicist by background working with seismic waves, I wanted to translate their movement into paintings. I sought something lean with transparency, where light would reflect the characters. By chance in 2010, I painted the Blue Lady twice on two plexiglass sheets. The vertical strokes created movement when you moved around the painting - the eyes followed you, like the Mona Lisa. This was my breakthrough into kinetic pop art.',
  },
  {
    title: 'Evolution in Dubai (2010-2025)',
    text: 'After four challenging years in Iraq (2015-2019), I aspired for more joy and began painting pop glasses in fluorescent paint. I explored triptychs with 100 USD bills and started mixing digital design with traditional techniques, introducing cartoons, boxing themes, and fashion shows on catwalks. In 2025, seeking more peace after leaving corporate life, I created pandas with zen Chinese landscapes - temples, lakes, cherry blossom trees - for a peaceful, healing outcome.',
  },
]

const influences = [
  {
    title: 'From Science to Art',
    text: 'As a geophysicist by background working with seismic waves, I found myself translating scientific concepts into visual art. The movement, transparency, and light reflection I studied in geophysics became the foundation of my kinetic art technique.',
  },
  {
    title: 'Artistic Influences',
    text: 'Drawn to what I was not yet, I studied modern artists like Klasen, Delorme, Warhol, Seaty, and others. I tried to mix Klasen with my own style but eventually discovered my unique voice through chance and experimentation.',
  },
  {
    title: 'Quest for Peace',
    text: "After the physical and emotional challenges of working in Iraq, I sought a quiet, peaceful environment. My art became a refuge - a response to chaos, bringing light, joy, and zen into my life and others'.",
  },
]

const growth = [
  {
    title: 'Intellectual Curiosity',
    text: "Attracted to people who speak well and tell stories - historians, novelists, counselors (my aunt), philosophers (my uncle). I've read many historical novels by Ken Follett, Dos Santos, Lapierre & Collins, and others. I've negotiated complex contracts with multiple stakeholders in my corporate career, always seeking to understand different perspectives.",
  },
  {
    title: 'Hands-On Learning',
    text: "Never a handyman in my youth, I've started working with wood at my chalet in the Alps (Chamonix/Megève), learning new skills and continuing to grow. I would love to know how to build a house - always seeking to become better than what I am.",
  },
  {
    title: 'Artistic Evolution',
    text: 'My artwork is a reflection of this constant self-improvement. I try to always improve and started painting on my own. Each new series - from kinetic portraits to pop glasses, from currency art to zen pandas - represents growth and exploration of new possibilities.',
  },
]

const collections = [
  { title: 'Mugshot Collection', text: 'Capturing the movement of eyes and air flow in high-speed life' },
  { title: 'Expressive Emotion', text: 'Eye movement that follows you - pure emotional connection' },
  { title: 'Pop glasses', text: 'Pop glasses bringing light and joy to our lives' },
  { title: '100 USD Bill', text: 'Currency art bringing more light and energy' },
  { title: 'Digital Design', text: 'Mixed media innovation exploring new possibilities' },
  { title: 'Panda Pop', text: 'Colorful pandas with beautiful landscapes - joy after TV news' },
]

const studioImages = [
  {
    src: '/images/exhibitions/Fabian Studio Dubai.jpg',
    alt: "Fabian PhiL's artwork in studio",
    title: 'Studio Dubai',
  },
  {
    src: '/images/exhibitions/WAD_photos all paintings.jpg',
    alt: 'Fabian PhiL paintings at World Art Dubai 2024',
    title: 'World Art Dubai 2024',
  },
]

const sectionLabel = 'text-xs tracking-[0.24em] uppercase text-gray-900'
const bodyText = 'text-sm md:text-base text-gray-600 font-light leading-relaxed'
const itemTitle = 'text-[13px] md:text-sm tracking-[0.12em] uppercase text-gray-900 mb-3'

const TextList = ({ heading, items }: { heading: string; items: { title: string; text: string }[] }) => (
  <div>
    <h2 className={`${sectionLabel} mb-8`}>{heading}</h2>
    <div className="divide-y divide-gray-200 border-t border-gray-200">
      {items.map((item) => (
        <div key={item.title} className="py-6 md:py-7">
          <h3 className={itemTitle}>{item.title}</h3>
          <p className={bodyText}>{item.text}</p>
        </div>
      ))}
    </div>
  </div>
)

const AboutPage = () => {
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
        <h1 className={`${sectionLabel} mb-6`}>The Artist Behind the Art</h1>
        <p className="max-w-3xl text-2xl md:text-3xl font-light uppercase tracking-[0.04em] text-gray-900 leading-snug">
          From Corporate Executive to International Artist
        </p>
      </header>

      {/* Meet Fabian PhiL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <button
            type="button"
            onClick={() => openModal('/images/about/Fabian Phil Artist overview.png', 'Fabian PhiL Artist', 'Meet Fabian PhiL')}
            className="lg:col-span-5 relative block w-full aspect-[805/1076] bg-gray-100 overflow-hidden hover:opacity-90 transition-opacity"
          >
            <Image
              src="/images/about/Fabian Phil Artist overview.png"
              alt="Fabian PhiL Artist"
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover object-top"
            />
          </button>

          <div className="lg:col-span-7">
            <h2 className={`${sectionLabel} mb-8`}>Meet Fabian PhiL</h2>
            <ul className="border-t border-gray-200 divide-y divide-gray-200 mb-12 md:mb-16">
              {facts.map((fact) => (
                <li key={fact} className="py-4 text-base md:text-lg font-light text-gray-800">
                  {fact}
                </li>
              ))}
            </ul>

            <h3 className={`${sectionLabel} mb-6`}>My Studio</h3>
            <div className="grid grid-cols-2 gap-4 md:gap-6 mb-6">
              {studioImages.map((image) => (
                <figure key={image.src}>
                  <button
                    type="button"
                    onClick={() => openModal(image.src, image.alt, image.title)}
                    className="relative block w-full aspect-square bg-gray-100 overflow-hidden hover:opacity-90 transition-opacity"
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover grayscale"
                    />
                  </button>
                  <figcaption className="mt-2 text-[10px] tracking-[0.18em] uppercase text-gray-500">
                    {image.title}
                  </figcaption>
                </figure>
              ))}
            </div>
            <p className={bodyText}>
              Located in the heart of Dubai, my studio is where the magic happens.
              This is where I create my kinetic artworks, experimenting with acrylic sheets,
              LED lighting, and innovative techniques that bring my art to life.
            </p>
          </div>
        </div>
      </section>

      {/* Journey */}
      <section className="bg-[#fafafa] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${sectionLabel} mb-10 md:mb-14`}>My Artistic Journey</h2>
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
        </div>
      </section>

      {/* Influences & growth */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          <TextList heading="Intellectual Journey & Influences" items={influences} />
          <TextList heading="Always Becoming Better" items={growth} />
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-[#fafafa] py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${sectionLabel} mb-10`}>My Artistic Philosophy</h2>
          <blockquote className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed mb-10">
            &ldquo;I am driven by emotions of the character. I try to capture the eyes movement, sometimes the air flow.
            I love transparency, light and movement. We need more light in our lives.&rdquo;
          </blockquote>
          <div className="space-y-5">
            <p className={bodyText}>
              My art is born from emotion - I&apos;m driven by the character&apos;s feelings, capturing the movement of eyes,
              the flow of air, the essence of life itself. I love transparency, light, and movement because they
              bring energy and hope into our world.
            </p>
            <p className={bodyText}>
              Each collection serves a purpose: the pop glasses and 100 USD bills because we need more light in our lives,
              the pandas with beautiful landscapes because we need more color and joy after what we see on TV.
              My art is not just visual - it&apos;s emotional, it&apos;s healing, it&apos;s a response to the world around us.
            </p>
          </div>
        </div>
      </section>

      {/* Collections */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${sectionLabel} mb-10 md:mb-14`}>My Art Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 border-t border-gray-200">
            {collections.map((collection) => (
              <div key={collection.title} className="py-6 border-b border-gray-200">
                <h3 className={itemTitle}>{collection.title}</h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed">{collection.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="border-t border-gray-100 py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`${sectionLabel} mb-6`}>Let&apos;s Connect</h2>
          <p className="text-lg md:text-xl font-light text-gray-800 leading-relaxed mb-8">
            Interested in learning more about my artistic process or commissioning a piece?
            I&apos;d love to share my story with you.
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
