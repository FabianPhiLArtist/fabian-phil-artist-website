'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useLocale } from '@/i18n/useLocale'
import { localizedHref } from '@/i18n/pathnames'
import { WHATSAPP_URL, PRICE_WHATSAPP } from '@/lib/whatsapp'
import { faqItems, faqItemsById, type FaqId, type FaqPart } from '@/data/faq'
import type { Locale } from '@/i18n/locales'

export type { FaqId }

const linkClass = 'text-gray-900 underline underline-offset-2 decoration-gray-300 hover:decoration-gray-900 transition-colors'

const renderPart = (part: FaqPart, key: number, locale: Locale) => {
  if (typeof part === 'string') return part
  if ('size' in part) {
    return (
      <span key={key} className="whitespace-nowrap">{part.size} cm</span>
    )
  }
  if ('whatsapp' in part) {
    return (
      <a
        key={key}
        href={part.whatsapp === 'price' ? PRICE_WHATSAPP : WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClass}
      >
        {part.text}
      </a>
    )
  }
  return (
    <Link key={key} href={localizedHref(locale, part.route, part.options)} className={linkClass}>
      {part.text}
    </Link>
  )
}

type Props = {
  only?: FaqId[]
}

const FaqAccordion = ({ only }: Props) => {
  const locale = useLocale()
  const [open, setOpen] = useState<FaqId | null>(null)

  const items = only ? faqItemsById(only) : faqItems

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
                  {item.a.map((paragraph, index) => (
                    <p key={index}>{paragraph.map((part, partIndex) => renderPart(part, partIndex, locale))}</p>
                  ))}
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
