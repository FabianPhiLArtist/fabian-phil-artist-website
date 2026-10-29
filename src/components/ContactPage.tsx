'use client'

import React, { useEffect, useRef, useState } from 'react'
import { useLocale } from '@/i18n/useLocale'
import { collectorLocationLabel, collectorLocationOptions } from '@/lib/collectorLocations'
import { submitEnquiry } from '@/lib/submitEnquiry'
import { WHATSAPP_URL } from '@/lib/whatsapp'
import { errorBoxClass, fieldClass, labelClass, primaryButtonClass, textLinkClass } from '@/lib/formStyles'

export type ContactPageCopy = {
  heading: string
  intro: string
  contactInformation: string
  email: string
  emailNote: string
  whatsapp: string
  whatsappNote: string
  studioAddress: string
  addressLines: [string, string]
  studioNote: string
  socialMedia: string
  socialNote: string
  sendMessage: string
  sentHeading: string
  sentText: string
  sendAnother: string
  honeypot: string
  firstName: string
  firstNamePlaceholder: string
  lastName: string
  lastNamePlaceholder: string
  emailAddress: string
  emailPlaceholder: string
  phone: string
  location: string
  locationPlaceholder: string
  subject: string
  subjectOptions: Record<'' | 'inquiry' | 'commission' | 'exhibition' | 'press' | 'other', string>
  message: string
  messagePlaceholder: string
  whatsappError: string
  sending: string
  submit: string
  directContact: string
  collectionHeading: string
  collectionText: string
  whatsappNow: string
  sendEmail: string
  // Prefilled WhatsApp link for the call-to-action and error links.
  whatsappHref: string
  // Localized replacements for the API's English error messages.
  error?: string
  fieldError?: string
}

const englishCopy: ContactPageCopy = {
  heading: 'Get In Touch',
  intro:
    'Ready to add a Fabian PhiL artwork to your collection? Have questions about my kinetic art? I\'d love to hear from you.',
  contactInformation: 'Contact Information',
  email: 'Email',
  emailNote: 'For inquiries and commissions',
  whatsapp: 'WhatsApp',
  whatsappNote: 'Quick messages and calls',
  studioAddress: 'Studio Address',
  addressLines: ['70 Lowaina Street', 'Umm Suqeim 1, Dubai, UAE'],
  studioNote: 'Visit by appointment',
  socialMedia: 'Social Media',
  socialNote: 'Follow for latest updates',
  sendMessage: 'Send a Message',
  sentHeading: 'Message sent',
  sentText: 'Thank you for getting in touch. Fabian will reply to you by email.',
  sendAnother: 'Send another message →',
  honeypot: 'Leave this field empty',
  firstName: 'First Name',
  firstNamePlaceholder: 'Your first name',
  lastName: 'Last Name',
  lastNamePlaceholder: 'Your last name',
  emailAddress: 'Email Address',
  emailPlaceholder: 'your.email@example.com',
  phone: 'Phone Number (Optional)',
  location: 'Location',
  locationPlaceholder: 'Select your location',
  subject: 'Subject',
  subjectOptions: {
    '': 'Select a subject',
    inquiry: 'Artwork Inquiry',
    commission: 'Commission Request',
    exhibition: 'Exhibition Opportunity',
    press: 'Press & Media',
    other: 'Other',
  },
  message: 'Message',
  messagePlaceholder:
    'Tell me about your interest in my art, specific artworks you\'re interested in, or any questions you have...',
  whatsappError: 'Message Fabian on WhatsApp',
  sending: 'Sending...',
  submit: 'Send Message',
  directContact: 'For immediate assistance, please call or WhatsApp me directly at +971 567594229',
  collectionHeading: 'Ready to Start Your Collection?',
  collectionText:
    'I\'m always excited to work with new collectors and art enthusiasts. Whether you\'re looking for a specific piece or want to commission something unique, I\'m here to help you find the perfect artwork.',
  whatsappNow: 'WhatsApp Me Now →',
  sendEmail: 'Send Email →',
  whatsappHref: WHATSAPP_URL,
}

const subjectValues = ['', 'inquiry', 'commission', 'exhibition', 'press', 'other'] as const

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  subject: '',
  message: '',
  website: '',
}

const infoLabelClass = 'text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-1.5'
const infoLinkClass = 'text-base text-gray-900 font-light hover:text-gray-500 transition-colors'

const ContactPage = ({ copy = englishCopy }: { copy?: ContactPageCopy }) => {
  const locale = useLocale()
  const [formData, setFormData] = useState(emptyForm)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const startedAt = useRef(0)
  const sending = useRef(false)

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending.current) return
    sending.current = true
    setStatus('sending')
    setErrorMessage('')

    const location = collectorLocationLabel(locale, formData.location)
    const result = await submitEnquiry({ type: 'contact', ...formData, location }, startedAt.current)
    sending.current = false

    if (result.ok) {
      setStatus('sent')
      setFormData(emptyForm)
      return
    }
    setStatus('error')
    setErrorMessage((result.field ? copy.fieldError : copy.error) ?? result.message)
    if (result.field) document.getElementById(result.field)?.focus()
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-12 md:mb-16">
          <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6">{copy.heading}</h1>
          <p className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed">
            {copy.intro}
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <section className="lg:col-span-4" aria-labelledby="contact-information">
            <h2 id="contact-information" className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-8">
              {copy.contactInformation}
            </h2>

            <div className="space-y-7">
              <div>
                <h3 className={infoLabelClass}>{copy.email}</h3>
                <a href="mailto:fabianphilartist@gmail.com" className={`${infoLinkClass} break-all`}>
                  fabianphilartist@gmail.com
                </a>
                <p className="text-sm text-gray-500 font-light mt-1">{copy.emailNote}</p>
              </div>

              <div>
                <h3 className={infoLabelClass}>{copy.whatsapp}</h3>
                <a href="https://wa.me/971567594229" className={infoLinkClass}>
                  +971 567594229
                </a>
                <p className="text-sm text-gray-500 font-light mt-1">{copy.whatsappNote}</p>
              </div>

              <div>
                <h3 className={infoLabelClass}>{copy.studioAddress}</h3>
                <div className="text-base text-gray-900 font-light leading-relaxed">
                  <p>{copy.addressLines[0]}</p>
                  <p>{copy.addressLines[1]}</p>
                </div>
                <p className="text-sm text-gray-500 font-light mt-1">{copy.studioNote}</p>
              </div>

              <div>
                <h3 className={infoLabelClass}>{copy.socialMedia}</h3>
                <div className="space-y-1">
                  <a
                    href="https://instagram.com/fabianphilartist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block ${infoLinkClass}`}
                  >
                    @fabianphilartist
                  </a>
                  <a
                    href="https://facebook.com/fabianphilartist"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block ${infoLinkClass}`}
                  >
                    Fabian PhiL Artist
                  </a>
                </div>
                <p className="text-sm text-gray-500 font-light mt-1">{copy.socialNote}</p>
              </div>
            </div>
          </section>

          <section className="lg:col-span-8 lg:border-l lg:border-gray-100 lg:pl-16" aria-labelledby="send-a-message">
            <h2 id="send-a-message" className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-8">
              {copy.sendMessage}
            </h2>

            {status === 'sent' ? (
              <div role="status" className="py-10 border-t border-gray-100">
                <h3 className="text-2xl font-light uppercase tracking-[0.04em] text-gray-900 mb-3">{copy.sentHeading}</h3>
                <p className="text-base text-gray-600 font-light leading-relaxed mb-8">
                  {copy.sentText}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    startedAt.current = Date.now()
                    setStatus('idle')
                  }}
                  className={textLinkClass}
                >
                  {copy.sendAnother}
                </button>
              </div>
            ) : (
              <form method="post" action="/api/enquiry" onSubmit={handleSubmit} className="space-y-6">
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label htmlFor="contact-website">{copy.honeypot}</label>
                  <input
                    type="text"
                    id="contact-website"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className={labelClass}>
                      {copy.firstName}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      maxLength={100}
                      autoComplete="given-name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder={copy.firstNamePlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>
                      {copy.lastName}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      maxLength={100}
                      autoComplete="family-name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={fieldClass}
                      placeholder={copy.lastNamePlaceholder}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      {copy.emailAddress}
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
                      placeholder="+971 50 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="location" className={labelClass}>
                    {copy.location}
                  </label>
                  <select
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    autoComplete="off"
                    className={fieldClass}
                  >
                    <option value="">{copy.locationPlaceholder}</option>
                    {collectorLocationOptions[locale].map((label) => (
                      <option key={label} value={label}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="subject" className={labelClass}>
                    {copy.subject}
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={fieldClass}
                  >
                    {subjectValues.map((value) => (
                      <option key={value} value={value}>
                        {copy.subjectOptions[value]}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    {copy.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    maxLength={5000}
                    value={formData.message}
                    onChange={handleChange}
                    className={fieldClass}
                    placeholder={copy.messagePlaceholder}
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div role="alert" className={errorBoxClass}>
                    <p>{errorMessage}</p>
                    <a
                      href={copy.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs tracking-[0.16em] uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
                    >
                      {copy.whatsappError}
                    </a>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    aria-busy={status === 'sending'}
                    className={`${primaryButtonClass} w-full sm:w-auto`}
                  >
                    {status === 'sending' ? (
                      <>
                        <span className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                        <span>{copy.sending}</span>
                      </>
                    ) : (
                      <span>{copy.submit}</span>
                    )}
                  </button>
                </div>
              </form>
            )}

            <p className="mt-8 text-sm text-gray-500 font-light leading-relaxed">
              {copy.directContact}
            </p>
          </section>
        </div>

        <section className="mt-20 md:mt-24 pt-12 border-t border-gray-100 max-w-3xl">
          <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-5">{copy.collectionHeading}</h2>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed mb-8">
            {copy.collectionText}
          </p>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            <a href={copy.whatsappHref} className={textLinkClass}>
              {copy.whatsappNow}
            </a>
            <a href="mailto:fabianphilartist@gmail.com" className={textLinkClass}>
              {copy.sendEmail}
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ContactPage
