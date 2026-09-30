'use client'

import React from 'react'
import KineticClip from '@/components/home/KineticClip'

const examples = [
  {
    step: '01',
    src: encodeURI('/videos/artworks/Why 2.mp4'),
    title: 'Why…?',
    series: 'Pop glasses',
    effect: 'Movement through perspective',
    copy: 'The monochrome portrait shifts with the viewer’s position, as the glasses and layered lines move across the face.',
    label: 'Why…?, monochrome kinetic portrait from the Pop glasses works, filmed as the viewer moves',
  },
  {
    step: '02',
    src: encodeURI('/videos/artworks/Cleclerc Monza 1.mp4'),
    title: 'Charles Leclerc in Monza',
    series: 'F1 / Motorsport',
    effect: 'Perspective + colour',
    copy: 'The layered portrait shifts against the colourful graphic background, adding another dimension to the movement.',
    label: 'Wanted for Speeding in Monza, Charles Leclerc layered portrait over a colourful background, filmed as the viewer moves',
  },
  {
    step: '03',
    src: encodeURI('/videos/artworks/Racing Life Led on 2.mp4'),
    title: 'Racing Life',
    series: 'Special LED work',
    effect: 'Perspective + colour + light',
    copy: 'In this special LED work, light adds another dimension to the layered movement.',
    label: 'Wanted for Racing Life, special LED kinetic artwork, filmed as the viewer moves',
  },
]

const ArtThatMoves = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-8 md:mb-12">
          <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">
            Art that moves
          </h2>
          <p className="text-2xl md:text-3xl font-light uppercase tracking-[0.04em] text-gray-900 leading-snug mb-4">
            One technique.
            <br />
            Different ways to move.
          </p>
          <p className="text-sm md:text-base text-gray-600 font-light leading-relaxed">
            Fabian PhiL paints across multiple layers of transparent plexiglass. As the viewer moves, the layers shift in relation to one another, transforming the image with perspective.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 list-none p-0 m-0">
          {examples.map((example) => (
            <li key={example.step}>
              <figure className="m-0 flex md:block gap-4 items-start">
                <div className="relative shrink-0 w-[42%] md:w-full md:max-w-[300px] md:mx-auto aspect-[9/16] bg-black overflow-hidden">
                  <KineticClip src={example.src} label={example.label} />
                </div>
                <figcaption className="md:mt-4 md:max-w-[300px] md:mx-auto">
                  <p className="text-[10px] tracking-[0.2em] text-gray-400 mb-2">{example.step}</p>
                  <h3 className="text-xs tracking-[0.16em] uppercase text-gray-900">
                    {example.title}
                  </h3>
                  <p className="mt-1 text-[10px] tracking-[0.18em] uppercase text-gray-500">
                    {example.series}
                  </p>
                  <p className="mt-3 text-[11px] tracking-[0.14em] uppercase text-gray-900 border-l border-gray-900 pl-2">
                    {example.effect}
                  </p>
                  <p className="mt-3 text-[13px] text-gray-600 font-light leading-relaxed">
                    {example.copy}
                  </p>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ArtThatMoves
