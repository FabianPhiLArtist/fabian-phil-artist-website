'use client'

import React, { useEffect, useId, useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { useLocale } from '@/i18n/useLocale'
import {
  artworkCanonicalUrl,
  buildEnquiryMessage,
  enquiryMailto,
  isInternationalPhone,
  isPlausibleEmail,
  STUDIO_EMAIL,
  STUDIO_MAILTO,
  type EnquiryMessageLines,
} from '@/lib/artworkEnquiry'
import { collectorLocationLabel, collectorLocationOptions } from '@/lib/collectorLocations'
import { STUDIO_WHATSAPP_DISPLAY, STUDIO_WHATSAPP_INTERNATIONAL, whatsappHref } from '@/lib/whatsapp'
import { fill } from '@/lib/template'
import { fieldClass, labelClass, primaryButtonClass, textLinkClass } from '@/lib/formStyles'

export type CollectorInquiryCopy = {
  eyebrow: string
  close: string
  headingWithTitle: string
  heading: string
  intro: string
  studioNumber: string
  copyNumber: string
  numberCopied: string
  honeypot: string
  name: string
  namePlaceholder: string
  nameError: string
  email: string
  emailPlaceholder: string
  emailError: string
  phone: string
  phonePlaceholder: string
  phoneHint: string
  phoneError: string
  location: string
  locationPlaceholder: string
  locationError: string
  message: string
  messagePlaceholder: string
  // General price page only. "{subject}" is replaced in lineSubject.
  subject?: string
  subjectPlaceholder?: string
  linePricing?: string
  lineSubject?: string
  submit: string
  emailOption: string
  sendNote: string
  openedNote: string
  privacy: string
  lineArtwork: string
  lineGeneral: string
  lineName: string
  linePhone: string
  lineEmail: string
  lineLocation: string
  emailSubjectArtwork: string
  emailSubjectGeneral: string
  emailSubjectPricing?: string
  // Shared with the contact form, which still sends through the enquiry route.
  whatsappError: string
  error?: string
  fieldError?: string
}

const englishCopy: CollectorInquiryCopy = {
  eyebrow: 'Artwork inquiry',
  close: 'Close',
  headingWithTitle: 'Interested in "{title}"?',
  heading: 'Interested in an artwork?',
  intro: 'Continue this enquiry in a personal WhatsApp conversation with Fabian.',
  studioNumber: 'WhatsApp number',
  copyNumber: 'Copy number',
  numberCopied: 'Copied',
  honeypot: 'Leave this field empty',
  name: 'Full name *',
  namePlaceholder: 'Your full name',
  nameError: 'Please enter your name.',
  email: 'Email *',
  emailPlaceholder: 'you@email.com',
  emailError: 'Please enter a valid email address.',
  phone: 'WhatsApp *',
  phonePlaceholder: '+971 50 000 0000',
  phoneHint: 'Include the country code, starting with +.',
  phoneError: 'Enter a WhatsApp number with its country code, starting with +.',
  location: 'Location *',
  locationPlaceholder: 'Select your location',
  locationError: 'Please select your location.',
  message: 'Message',
  messagePlaceholder: 'Anything you would like Fabian to know',
  submit: 'Open WhatsApp',
  emailOption: 'Email instead',
  sendNote: 'WhatsApp will open with your message. It is sent only after you press Send.',
  openedNote: 'WhatsApp should now be open. Your message is sent only after you press Send there.',
  privacy:
    'Your name, location, WhatsApp number, email and anything you write here are included in the message you send. WhatsApp processes that information when you press Send. This website does not store it.',
  lineArtwork: 'Hello Fabian, I would like to enquire about "{title}" ({url}).',
  lineGeneral: 'Hello Fabian, I would like to enquire about an artwork.',
  lineName: 'My name is {name}.',
  linePhone: 'WhatsApp: {phone}',
  lineEmail: 'Email: {email}',
  lineLocation: 'Location: {location}',
  emailSubjectArtwork: 'Artwork enquiry: {title}',
  emailSubjectGeneral: 'Artwork enquiry',
  whatsappError: 'Message Fabian on WhatsApp',
  error: 'Your message could not be sent. Please try again or contact us on WhatsApp.',
  fieldError: 'Please check this field. Your message could not be sent. Please try again or contact us on WhatsApp.',
}

export const englishPricingInquiryCopy: CollectorInquiryCopy = {
  ...englishCopy,
  eyebrow: 'Pricing enquiry',
  heading: 'Enquire about pricing',
  headingWithTitle: 'Enquire about pricing',
  intro: 'Name an artwork, or ask a general question. Fabian replies personally on WhatsApp.',
  subject: 'Artwork or question',
  subjectPlaceholder: 'An artwork title, or your question',
  linePricing: 'Hello Fabian, I would like to enquire about pricing.',
  lineSubject: 'Artwork or question: {subject}',
  emailSubjectPricing: 'Pricing enquiry',
}

type FieldName = 'name' | 'email' | 'phone' | 'location'

interface CollectorInquiryProps {
  artworkTitle?: string
  artworkId?: number
  onClose?: () => void
  copy?: CollectorInquiryCopy
  // Artwork pages name the work automatically. The price pages ask the visitor instead.
  purpose?: 'artwork' | 'pricing'
}

function openWhatsApp(href: string) {
  const link = document.createElement('a')
  link.href = href
  link.target = '_blank'
  link.rel = 'noopener noreferrer'
  link.referrerPolicy = 'no-referrer'
  document.body.appendChild(link)
  link.click()
  window.setTimeout(() => link.remove(), 0)
}

const CollectorInquiry = ({
  artworkTitle,
  artworkId,
  onClose,
  copy = englishCopy,
  purpose = 'artwork',
}: CollectorInquiryProps) => {
  const locale = useLocale()
  const reactId = useId()
  const fieldId = (name: string) => `${reactId}-${name}`
  const isPricing = purpose === 'pricing'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: '',
    subject: '',
    website: '',
  })
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({})
  const [opened, setOpened] = useState(false)
  const [numberCopied, setNumberCopied] = useState(false)

  const heading = !isPricing && artworkTitle ? fill(copy.headingWithTitle, { title: artworkTitle }) : copy.heading
  const headingId = fieldId('heading')
  const nameFieldId = fieldId('name')
  const artworkUrl =
    !isPricing && artworkTitle && typeof artworkId === 'number' ? artworkCanonicalUrl(locale, artworkId) : undefined

  useEffect(() => {
    if (isPricing) return
    document.getElementById(nameFieldId)?.focus()
  }, [isPricing, nameFieldId])

  useEffect(() => {
    if (!onClose) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  useEffect(() => {
    if (!numberCopied) return
    const timer = window.setTimeout(() => setNumberCopied(false), 2000)
    return () => window.clearTimeout(timer)
  }, [numberCopied])

  const copyStudioNumber = async () => {
    const value = STUDIO_WHATSAPP_INTERNATIONAL
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable')
      await navigator.clipboard.writeText(value)
    } catch {
      try {
        const area = document.createElement('textarea')
        area.value = value
        area.setAttribute('readonly', '')
        area.style.position = 'fixed'
        area.style.left = '-9999px'
        document.body.appendChild(area)
        area.select()
        const copied = document.execCommand('copy')
        area.remove()
        if (!copied) return
      } catch {
        return
      }
    }
    setNumberCopied(true)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
    if (name === 'name' || name === 'email' || name === 'phone' || name === 'location') {
      setErrors((current) => ({ ...current, [name]: undefined }))
    }
  }

  const selectedLocation = collectorLocationLabel(locale, formData.location)

  const composeMessage = () => {
    const lines: EnquiryMessageLines = {
      artwork: copy.lineArtwork,
      general: copy.lineGeneral,
      ...(isPricing && copy.linePricing ? { pricing: copy.linePricing } : {}),
      ...(isPricing && copy.lineSubject ? { subject: copy.lineSubject } : {}),
      name: copy.lineName,
      phone: copy.linePhone,
      email: copy.lineEmail,
      location: copy.lineLocation,
    }
    return buildEnquiryMessage({
      lines,
      ...(artworkTitle && artworkUrl ? { artworkTitle, artworkUrl } : {}),
      ...(isPricing ? { subject: formData.subject } : {}),
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      ...(selectedLocation ? { location: selectedLocation } : {}),
      ...(isPricing ? {} : { message: formData.message }),
    })
  }

  const emailSubject =
    isPricing && copy.emailSubjectPricing
      ? copy.emailSubjectPricing
      : !isPricing && artworkTitle
        ? fill(copy.emailSubjectArtwork, { title: artworkTitle })
        : copy.emailSubjectGeneral
  const emailHref = enquiryMailto(STUDIO_EMAIL, emailSubject, composeMessage())

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (formData.website.trim()) return

    const nextErrors: Partial<Record<FieldName, string>> = {}
    if (!formData.name.trim()) nextErrors.name = copy.nameError
    if (!isPlausibleEmail(formData.email)) nextErrors.email = copy.emailError
    if (!isInternationalPhone(formData.phone)) nextErrors.phone = copy.phoneError
    if (!selectedLocation) nextErrors.location = copy.locationError
    setErrors(nextErrors)

    const firstInvalid = (['name', 'email', 'phone', 'location'] as const).find((field) => nextErrors[field])
    if (firstInvalid) {
      document.getElementById(fieldId(firstInvalid))?.focus()
      return
    }

    openWhatsApp(whatsappHref(composeMessage()))
    setOpened(true)
  }

  const describedBy = (field: FieldName, hintId?: string) => {
    const ids = [hintId, errors[field] ? fieldId(`${field}-error`) : undefined].filter(Boolean)
    return ids.length > 0 ? ids.join(' ') : undefined
  }

  const shellClass = isPricing
    ? 'w-full'
    : 'bg-white px-5 py-8 sm:px-10 sm:py-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-auto relative'

  const body = (
    <>
      {onClose && !isPricing && (
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.close}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>
      )}

      <div className={isPricing ? 'mb-8' : 'mb-8 pr-8'}>
        <p className="text-xs tracking-[0.24em] uppercase text-gray-500 mb-3">{copy.eyebrow}</p>
        {isPricing ? (
          <h2 id={headingId} className="text-xl md:text-2xl font-light text-gray-900 leading-snug">
            {heading}
          </h2>
        ) : (
          <h3 id={headingId} className="text-xl md:text-2xl font-light text-gray-900 leading-snug">
            {heading}
          </h3>
        )}
        <p className="text-sm text-gray-600 font-light leading-relaxed mt-3">{copy.intro}</p>
        <div className="mt-6 border border-gray-200 px-4 py-4 sm:px-5">
          <p className="text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-2">{copy.studioNumber}</p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <p className="text-xl md:text-2xl font-light tracking-wide text-gray-900">{STUDIO_WHATSAPP_DISPLAY}</p>
            <button
              type="button"
              onClick={copyStudioNumber}
              className="inline-flex items-center justify-center border border-gray-300 px-4 py-2.5 text-[11px] tracking-[0.16em] uppercase text-gray-900 hover:border-gray-900 transition-colors"
            >
              {copy.copyNumber}
            </button>
            <p
              role="status"
              aria-live="polite"
              className={`text-sm text-gray-600 font-light ${numberCopied ? '' : 'sr-only'}`}
            >
              {numberCopied ? copy.numberCopied : ''}
            </p>
          </div>
        </div>
      </div>

      <form
        noValidate
        method="post"
        action={STUDIO_MAILTO}
        encType="text/plain"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label htmlFor={fieldId('website')}>{copy.honeypot}</label>
          <input
            type="text"
            id={fieldId('website')}
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor={fieldId('name')} className={labelClass}>
            {copy.name}
          </label>
          <input
            type="text"
            id={fieldId('name')}
            name="name"
            required
            maxLength={150}
            autoComplete="name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={describedBy('name')}
            className={fieldClass}
            placeholder={copy.namePlaceholder}
          />
          {errors.name && (
            <p id={fieldId('name-error')} role="alert" className="mt-2 text-sm text-red-800 font-light">
              {errors.name}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor={fieldId('phone')} className={labelClass}>
              {copy.phone}
            </label>
            <input
              type="tel"
              id={fieldId('phone')}
              name="phone"
              required
              maxLength={40}
              inputMode="tel"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy('phone', fieldId('phone-hint'))}
              className={fieldClass}
              placeholder={copy.phonePlaceholder}
            />
            <p id={fieldId('phone-hint')} className="mt-2 text-xs text-gray-500 font-light">
              {copy.phoneHint}
            </p>
            {errors.phone && (
              <p id={fieldId('phone-error')} role="alert" className="mt-2 text-sm text-red-800 font-light">
                {errors.phone}
              </p>
            )}
          </div>

          <div>
            <label htmlFor={fieldId('email')} className={labelClass}>
              {copy.email}
            </label>
            <input
              type="email"
              id={fieldId('email')}
              name="email"
              required
              maxLength={254}
              inputMode="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy('email')}
              className={fieldClass}
              placeholder={copy.emailPlaceholder}
            />
            {errors.email && (
              <p id={fieldId('email-error')} role="alert" className="mt-2 text-sm text-red-800 font-light">
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor={fieldId('location')} className={labelClass}>
            {copy.location}
          </label>
          <select
            id={fieldId('location')}
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            autoComplete="off"
            aria-invalid={errors.location ? true : undefined}
            aria-describedby={describedBy('location')}
            className={fieldClass}
          >
            <option value="">{copy.locationPlaceholder}</option>
            {collectorLocationOptions[locale].map((label) => (
              <option key={label} value={label}>
                {label}
              </option>
            ))}
          </select>
          {errors.location && (
            <p id={fieldId('location-error')} role="alert" className="mt-2 text-sm text-red-800 font-light">
              {errors.location}
            </p>
          )}
        </div>

        {isPricing && copy.subject ? (
          <div>
            <label htmlFor={fieldId('subject')} className={labelClass}>
              {copy.subject}
            </label>
            <input
              type="text"
              id={fieldId('subject')}
              name="subject"
              maxLength={200}
              value={formData.subject}
              onChange={handleChange}
              className={fieldClass}
              placeholder={copy.subjectPlaceholder}
            />
          </div>
        ) : (
          <div>
            <label htmlFor={fieldId('message')} className={labelClass}>
              {copy.message}
            </label>
            <textarea
              id={fieldId('message')}
              name="message"
              rows={4}
              maxLength={1000}
              value={formData.message}
              onChange={handleChange}
              className={fieldClass}
              placeholder={copy.messagePlaceholder}
            />
          </div>
        )}

        <div className="flex flex-col gap-4 pt-2">
          <p id={fieldId('send-note')} role="status" className="text-sm text-gray-600 font-light leading-relaxed">
            {opened ? copy.openedNote : copy.sendNote}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button type="submit" className={`${primaryButtonClass} w-full sm:w-auto`}>
              {copy.submit}
            </button>
            <a href={emailHref} className={textLinkClass}>
              {copy.emailOption}
            </a>
          </div>
          <p className="text-xs text-gray-500 font-light leading-relaxed">{copy.privacy}</p>
        </div>
      </form>
    </>
  )

  if (isPricing) {
    return (
      <section aria-labelledby={headingId} className={shellClass}>
        {body}
      </section>
    )
  }

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-labelledby={headingId}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={shellClass}
    >
      {body}
    </motion.div>
  )
}

export default CollectorInquiry
