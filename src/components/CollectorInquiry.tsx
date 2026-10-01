'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'
import { submitEnquiry } from '@/lib/submitEnquiry'
import { WHATSAPP_URL, whatsappHref } from '@/lib/whatsapp'
import { errorBoxClass, fieldClass, labelClass, primaryButtonClass, textLinkClass } from '@/lib/formStyles'

interface CollectorInquiryProps {
  artworkTitle?: string
  artworkId?: number
  onClose?: () => void
}

const CollectorInquiry = ({ artworkTitle, artworkId, onClose }: CollectorInquiryProps) => {
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
    ? whatsappHref(`Hello Fabian, I would like to enquire about the artwork "${artworkTitle}".`)
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
    setErrorMessage(result.message)
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
        <p className="text-xs tracking-[0.24em] uppercase text-gray-500 mb-4">Artwork inquiry</p>
        <h3 className="text-2xl font-light uppercase tracking-[0.04em] text-gray-900 mb-4">Thank You!</h3>
        <p className="text-sm text-gray-600 font-light leading-relaxed mb-3">
          Your inquiry has been sent successfully. Fabian will contact you within 24 hours.
        </p>
        <p className="text-xs text-gray-500 font-light leading-relaxed">
          You can also reach Fabian directly at fabianphilartist@gmail.com or +971 567594229
        </p>
        {onClose && (
          <button type="button" onClick={onClose} className={`${primaryButtonClass} mt-8`}>
            Close
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
          aria-label="Close"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 transition-colors"
        >
          <X size={20} />
        </button>
      )}

      <div className="mb-8 pr-8">
        <p className="text-xs tracking-[0.24em] uppercase text-gray-500 mb-3">Artwork inquiry</p>
        <h3 className="text-xl md:text-2xl font-light text-gray-900 leading-snug">
          {artworkTitle ? `Interested in "${artworkTitle}"?` : 'Interested in a specific artwork?'}
        </h3>
        <p className="text-sm text-gray-600 font-light leading-relaxed mt-3">
          Fill out the form below and Fabian will get back to you personally.
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
          <label htmlFor="inquiry-website">Leave this field empty</label>
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
              Full Name *
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
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email Address *
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
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number
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
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="location" className={labelClass}>
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              maxLength={150}
              value={formData.location}
              onChange={handleChange}
              className={fieldClass}
              placeholder="City, Country"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="artwork" className={labelClass}>
              Artwork of Interest
            </label>
            <input
              type="text"
              id="artwork"
              name="artwork"
              maxLength={300}
              value={formData.artwork}
              onChange={handleChange}
              className={fieldClass}
              placeholder="Artwork title or series"
            />
          </div>

          <div>
            <label htmlFor="timeline" className={labelClass}>
              Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className={fieldClass}
            >
              <option value="">Select timeline</option>
              <option value="immediate">Immediate</option>
              <option value="1-3-months">1-3 months</option>
              <option value="3-6-months">3-6 months</option>
              <option value="6-12-months">6-12 months</option>
              <option value="flexible">Flexible</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClass}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={5000}
            value={formData.message}
            onChange={handleChange}
            className={fieldClass}
            placeholder="Tell us more about your interest in this artwork..."
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
              Message Fabian on WhatsApp
            </a>
          </div>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
          <button type="submit" disabled={isSubmitting} aria-busy={isSubmitting} className={primaryButtonClass}>
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border border-white border-t-transparent rounded-full animate-spin" aria-hidden="true" />
                <span>Sending...</span>
              </>
            ) : (
              <span>Send Inquiry</span>
            )}
          </button>

          <a href={whatsappFallback} target="_blank" rel="noopener noreferrer" className={textLinkClass}>
            Prefer WhatsApp? →
          </a>
        </div>
      </form>
    </motion.div>
  )
}

export default CollectorInquiry
