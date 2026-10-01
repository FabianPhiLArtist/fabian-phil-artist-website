'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'
import { WHATSAPP_URL, PRICE_WHATSAPP } from '@/lib/whatsapp'

export type FaqId =
  | 'availability'
  | 'price'
  | 'sizes'
  | 'galleries'
  | 'artist-book'
  | 'contact'
  | 'commissions'
  | 'specific-space'
  | 'commission-timing'
  | 'commission-cost'
  | 'interior-designers'

const linkClass = 'text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-900 transition-colors'

const WhatsAppLink = ({ href = WHATSAPP_URL }: { href?: string }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
    WhatsApp
  </a>
)

const size = (dimensions: string) => (
  <span className="whitespace-nowrap">{dimensions} cm</span>
)

type Item = { id: FaqId; q: string; a: React.ReactNode }

type Props = {
  only?: FaqId[]
}

const FaqAccordion = ({ only }: Props) => {
  const locale = useLocale()
  const [open, setOpen] = useState<FaqId | null>(null)
  const priceInquiry = (
    <Link href={localizedHref(locale, 'price-inquiry')} className={linkClass}>
      Price Inquiry
    </Link>
  )

  const allItems: Item[] = [
    {
      id: 'availability',
      q: 'Is this artwork available?',
      a: (
        <p>
          Availability is indicated on each artwork page. For the latest availability of a specific work, contact Fabian directly via <WhatsAppLink href={PRICE_WHATSAPP} /> or send a {priceInquiry}.
        </p>
      ),
    },
    {
      id: 'price',
      q: 'How can I request a price?',
      a: (
        <p>
          Prices are available on request. Simply identify the artwork you are interested in through the {priceInquiry} page or contact Fabian directly on <WhatsAppLink href={PRICE_WHATSAPP} />.
        </p>
      ),
    },
    {
      id: 'sizes',
      q: 'What sizes are available?',
      a: (
        <>
          <p>
            Each artwork page includes the dimensions of the original work. Fabian works across a range of formats, mainly {size('70 × 70')}, {size('70 × 90')}, {size('90 × 120')}, {size('120 × 120')} and triptychs of {size('70 × 200')}.
          </p>
          <p>
            If you are looking for a particular size for your home or project, contact Fabian to discuss what may be possible.
          </p>
        </>
      ),
    },
    {
      id: 'galleries',
      q: 'Do you work with galleries and curators?',
      a: (
        <>
          <p>
            Yes. Galleries and curators are welcome to contact Fabian regarding exhibitions, available works and curatorial opportunities. A price-free artist book/portfolio is available on request.
          </p>
          <p>
            Currently, Fabian exhibits his works at Noor Royal Gallery (2026, Mar. – Dec.) and at Alliance Française Dubai (30 September – 14 October 2026).
          </p>
        </>
      ),
    },
    {
      id: 'artist-book',
      q: 'Can I request Fabian PhiL’s artist book?',
      a: (
        <p>
          Yes. Galleries, curators and other art professionals can request the latest artist book directly from Fabian.
        </p>
      ),
    },
    {
      id: 'contact',
      q: 'How can I contact Fabian directly?',
      a: (
        <p>
          For artwork, commission, collaboration or professional enquiries, the fastest way to reach Fabian is via <WhatsAppLink />.
        </p>
      ),
    },
    {
      id: 'commissions',
      q: 'Do you accept commissions?',
      a: (
        <p>
          Yes. Fabian accepts selected commissions for private collectors and for interior, residential, hospitality and architectural projects. Each commission is developed within Fabian PhiL’s artistic language and discussed individually.
        </p>
      ),
    },
    {
      id: 'specific-space',
      q: 'Can an artwork be created for a specific space?',
      a: (
        <p>
          Yes, this can be discussed as part of a commission or collaboration. Share the dimensions of the space, photographs or plans, and any relevant project information with Fabian to explore what may be possible.
        </p>
      ),
    },
    {
      id: 'commission-timing',
      q: 'How long does a commissioned artwork take?',
      a: (
        <p>
          Timing depends on the size, complexity and requirements of the artwork. Contact Fabian with your project and desired timeframe to discuss feasibility and timing.
        </p>
      ),
    },
    {
      id: 'commission-cost',
      q: 'How much does a commissioned artwork cost?',
      a: (
        <p>
          Commission pricing depends on the dimensions, complexity and requirements of the work. Contact Fabian for a proposal based on your project.
        </p>
      ),
    },
    {
      id: 'interior-designers',
      q: 'Do you work with interior designers and architects?',
      a: (
        <p>
          Yes. Fabian welcomes selected collaborations with interior designers, architects and professionals working on distinctive residential and hospitality projects.
        </p>
      ),
    },
  ]

  const items = only
    ? only.map((id) => allItems.find((item) => item.id === id)).filter((item): item is Item => Boolean(item))
    : allItems

  return (
    <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
      {items.map((item) => {
        const isOpen = open === item.id
        const panelId = `faq-panel-${item.id}`
        return (
          <div key={item.id}>
            <button
              type="button"
              className="w-full text-left py-3.5 md:py-4 flex items-center justify-between gap-4 group"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : item.id)}
            >
              <span className="text-[13px] md:text-sm text-gray-900 leading-snug group-hover:text-gray-600 transition-colors">
                {item.q}
              </span>
              <span
                className={`shrink-0 text-gray-400 text-base leading-none transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`}
                aria-hidden
              >
                +
              </span>
            </button>
            <div
              id={panelId}
              role="region"
              ref={(el) => {
                el?.toggleAttribute('inert', !isOpen)
              }}
              className={`grid transition-[grid-template-rows] duration-200 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
            >
              <div className="overflow-hidden">
                <div className="pb-4 pr-6 text-[13px] md:text-sm text-gray-600 font-light leading-relaxed space-y-2">
                  {item.a}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FaqAccordion
