'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, Send, X } from 'lucide-react'
import { submitEnquiry } from '@/lib/submitEnquiry'
import { WHATSAPP_URL, whatsappHref } from '@/lib/whatsapp'

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
    budget: '',
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
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 text-center max-w-md mx-auto"
      >
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">
          Your inquiry has been sent successfully. Fabian will contact you within 24 hours.
        </p>
        <p className="text-sm text-gray-500">
          You can also reach Fabian directly at fabianphilartist@gmail.com or +971 567594229
        </p>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="mt-6 bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            Close
          </button>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-2xl p-8 max-w-2xl mx-auto relative"
    >
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <X size={24} />
        </button>
      )}

      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 mb-2">Artwork Inquiry</h3>
        <p className="text-gray-600">
          {artworkTitle ? `Interested in "${artworkTitle}"?` : 'Interested in a specific artwork?'}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Fill out the form below and Fabian will get back to you personally.
        </p>
        <div className="flex justify-center space-x-6 text-sm text-gray-500 mt-4">
          <a href="mailto:fabianphilartist@gmail.com" className="flex items-center space-x-1 hover:text-blue-600 transition-colors">
            <Mail size={16} />
            <span>fabianphilartist@gmail.com</span>
          </a>
          <a href="https://wa.me/971567594229" className="flex items-center space-x-1 hover:text-green-600 transition-colors">
            <Phone size={16} />
            <span>+971 567594229</span>
          </a>
        </div>
      </div>

      <form method="post" action="/api/enquiry" onSubmit={handleSubmit} className="space-y-6">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your full name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              maxLength={150}
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="City, Country"
            />
          </div>
        </div>

        <div>
          <label htmlFor="artwork" className="block text-sm font-medium text-gray-700 mb-2">
            Artwork of Interest
          </label>
          <input
            type="text"
            id="artwork"
            name="artwork"
            maxLength={300}
            value={formData.artwork}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Artwork title or series"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
              Budget Range
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select budget range</option>
              <option value="under-1000">Under €1,000</option>
              <option value="1000-2500">€1,000 - €2,500</option>
              <option value="2500-5000">€2,500 - €5,000</option>
              <option value="5000-10000">€5,000 - €10,000</option>
              <option value="over-10000">Over €10,000</option>
            </select>
          </div>

          <div>
            <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
              Timeline
            </label>
            <select
              id="timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            maxLength={5000}
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us more about your interest in this artwork..."
          />
        </div>

        {errorMessage && (
          <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-lg text-sm text-red-800">
            <p>{errorMessage}</p>
            <a
              href={whatsappFallback}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 font-semibold text-green-700 hover:text-green-900 underline"
            >
              Message Fabian on WhatsApp
            </a>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="flex-1 bg-gray-900 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Send Inquiry</span>
              </>
            )}
          </button>

          <div className="flex space-x-4 text-sm text-gray-500">
            <a href={whatsappFallback} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 hover:text-green-600 transition-colors">
              <Phone size={16} />
              <span>Prefer WhatsApp?</span>
            </a>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default CollectorInquiry
