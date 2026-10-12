'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { submitEnquiry } from '@/lib/submitEnquiry'
import { WHATSAPP_URL, whatsappHref } from '@/lib/whatsapp'
import { fill } from '@/lib/template'
import { errorBoxClass, fieldClass, labelClass, primaryButtonClass, textLinkClass } from '@/lib/formStyles'

type TimelineValue = '' | 'immediate' | '1-3-months' | '3-6-months' | '6-12-months' | 'flexible'

export type CollectorInquiryCopy = {
  eyebrow: string
  thankYou: string
  sent: string
  directContact: string
  close: string
  // "{title}" is replaced with the artwork title.
  headingWithTitle: string
  heading: string
  intro: string
  honeypot: string
  name: string
  namePlaceholder: string
  email: string
  emailPlaceholder: string
  phone: string
  phonePlaceholder: string
  location: string
  locationPlaceholder: string
  artwork: string
  artworkPlaceholder: string
  timeline: string
  timelineOptions: Record<TimelineValue, string>
  message: string
  messagePlaceholder: string
  whatsappError: string
  sending: string
  submit: string
  preferWhatsapp: string
  whatsappMessage: string
  // The enquiry API answers in English; localized forms show these instead of its messages.
  error?: string
  fieldError?: string
}

const englishCopy: CollectorInquiryCopy = {
  eyebrow: 'Artwork inquiry',
  thankYou: 'Thank You!',
  sent: 'Your inquiry has been sent successfully. Fabian will contact you within 24 hours.',
  directContact: 'You can also reach Fabian directly at fabianphilartist@gmail.com or +971 567594229',
  close: 'Close',
  headingWithTitle: 'Interested in "{title}"?',
  heading: 'Interested in a specific artwork?',
  intro: 'Fill out the form below and Fabian will get back to you personally.',
  honeypot: 'Leave this field empty',
  name: 'Full Name *',
  namePlaceholder: 'Your full name',
  email: 'Email Address *',
  emailPlaceholder: 'your@email.com',
  phone: 'Phone Number',
  phonePlaceholder: '+1 (555) 123-4567',
  location: 'Location',
  locationPlaceholder: 'City, Country',
  artwork: 'Artwork of Interest',
  artworkPlaceholder: 'Artwork title or series',
  timeline: 'Timeline',
  timelineOptions: {
    '': 'Select timeline',
    immediate: 'Immediate',
    '1-3-months': '1-3 months',
    '3-6-months': '3-6 months',
    '6-12-months': '6-12 months',
    flexible: 'Flexible',
  },
  message: 'Message',
  messagePlaceholder: 'Tell us more about your interest in this artwork...',
  whatsappError: 'Message Fabian on WhatsApp',
  sending: 'Sending...',
  submit: 'Send Inquiry',
  preferWhatsapp: 'Prefer WhatsApp? →',
  whatsappMessage: 'Hello Fabian, I would like to enquire about the artwork "{title}".',
}

const timelineValues: TimelineValue[] = ['', 'immediate', '1-3-months', '3-6-months', '6-12-months', 'flexible']

interface CollectorInquiryProps {
  artworkTitle?: string
  artworkId?: number
  onClose?: () => void
  copy?: CollectorInquiryCopy
}

const CollectorInquiry = ({ artworkTitle, artworkId, onClose, copy = englishCopy }: CollectorInquiryProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    artwork: artworkTitle || '',
    timeline: '',
    location: '',
    website: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const startedAt = useRef(0)
  const sending = useRef(false)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const whatsappFallback = artworkTitle
    ? whatsappHref(fill(copy.whatsappMessage, { title: artworkTitle }))
    : WHATSAPP_URL

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending.current) return
    sending.current = true
    setIsSubmitting(true)
    setErrorMessage('')

    const result = await submitEnquiry({ type: 'artwork', artworkId, ...formData }, startedAt.current)
    sending.current = false
    setIsSubmitting(false)

    if (result.ok) {
      setIsSubmitted(true)
      return
    }
    setErrorMessage((result.field ? copy.fieldError : copy.error) ?? result.message)
    if (result.field) document.getElementById(result.field)?.focus()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white px-6 py-10 sm:px-10 text-center max-w-md w-full mx-auto"
      >
        <p className="text-xs tracking-[0.24em] uppercase text-gray-500 mb-4">{copy.eyebrow}</p>
        <h3 className="text-2xl font-light uppercase tracking-[0.04em] text-gray-900 mb-4">{copy.thankYou}</h3>
        <p className="text-sm text-gray-600 font-light leading-relaxed mb-3">
          {copy.sent}
        </p>
        <p className="text-xs text-gray-500 font-light leading-relaxed">
          {copy.directContact}
        </p>
        {onClose && (
          <button type="button" onClick={onClose} className={`${primaryButtonClass} mt-8`}>
            {copy.close}
          </button>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white px-5 py-8 sm:px-10 sm:py-10 max-w-2xl w-full max-h-[90vh] overflow-y-auto mx-auto relative"
    >
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label={copy.close}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>
      )}

      <div className="mb-8 pr-8">
        <p className="text-xs tracking-[0.24em] uppercase text-gray-500 mb-3">{copy.eyebrow}</p>
        <h3 className="text-xl md:text-2xl font-light text-gray-900 leading-snug">
          {artworkTitle ? fill(copy.headingWithTitle, { title: artworkTitle }) : copy.heading}
        </h3>
        <p className="text-sm text-gray-600 font-light leading-relaxed mt-3">
          {copy.intro}
        </p>
        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500 font-light mt-4">
          <a href="mailto:fabianphilartist@gmail.com" className="hover:text-gray-900 transition-colors">
            fabianphilartist@gmail.com
          </a>
          <a href="https://wa.me/971567594229" className="hover:text-gray-900 transition-colors">
            +971 567594229
          </a>
        </div>
      </div>

      <form method="post" action="/api/enquiry" onSubmit={handleSubmit} className="space-y-5">
        <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
          <label htmlFor="inquiry-website">{copy.honeypot}</label>
          <input
            type="text"
            id="inquiry-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={formData.website}
            onChange={handleChange}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className={labelClass}>
              {copy.name}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              maxLength={150}
              autoComplete="name"
              value={formData.name}
              onChange={handleChange}
              className={fieldClass}
              placeholder={copy.namePlaceholder}
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              {copy.email}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              maxLength={254}
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={fieldClass}
              placeholder={copy.emailPlaceholder}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className={labelClass}>
              {copy.phone}
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              maxLength={40}
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className={fieldClass}
              placeholder={copy.phonePlaceholder}
            />
          </div>

          <div>
            <label htmlFor="location" className={labelClass}>
              {copy.location}
            </label>
            <input
              type="text"
              id="location"
              name="location"
              maxLength={150}
              value={formData.location}
              onChange={handleChange}
              className={fieldClass}
              placeholder={copy.locationPlaceholder}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="artwork" className={labelClass}>
              {copy.artwork}
            </label>
            <input
              type="text"
              id="artwork"
              name="artwork"
              maxLength={300}
              value={formData.artwork}
              onChange={handleChange}
              className={fieldClass}
              placeholder={copy.artworkPlaceholder}
            />
          </div>

          <div>
            <label htmlFor="timeline" className={labelClass}>
              {copy.timeline}
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={fieldClass}
            >
              {timelineValues.map((value) => (
                <option key={value} value={value}>{copy.timelineOptions[value]}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            {copy.message}
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={5000}
            value={formData.message}
            onChange={handleChange}
            className={fieldClass}
            placeholder={copy.messagePlaceholder}
          />
        </div>

        {errorMessage && (
          <div role="alert" className={errorBoxClass}>
            <p>{errorMessage}</p>
            <a
              href={whatsappFallback}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-xs tracking-[0.16em] uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
            >
              {copy.whatsappError}
            </a>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
          <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className={primaryButtonClass}>
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                <span>{copy.sending}</span>
              </>
            ) : (
              <span>{copy.submit}</span>
            )}
          </button>

          <a href={whatsappFallback} target="_blank" rel="noopener noreferrer" className={textLinkClass}>
            {copy.preferWhatsapp}
          </a>
        </div>
      </form>
    </motion.div>
  )
}

export default CollectorInquiry
