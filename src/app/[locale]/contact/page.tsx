'use client'

import React, { useEffect, useRef, useState } from 'react'
import { submitEnquiry } from '@/lib/submitEnquiry'
import { WHATSAPP_URL } from '@/lib/whatsapp'
import { errorBoxClass, fieldClass, labelClass, primaryButtonClass, textLinkClass } from '@/lib/formStyles'

const emptyForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
  website: '',
}

const infoLabelClass = 'text-[11px] tracking-[0.16em] uppercase text-gray-500 mb-1.5'
const infoLinkClass = 'text-base text-gray-900 font-light hover:text-gray-500 transition-colors'

const ContactPage = () => {
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

    const result = await submitEnquiry({ type: 'contact', ...formData }, startedAt.current)
    sending.current = false

    if (result.ok) {
      setStatus('sent')
      setFormData(emptyForm)
      return
    }
    setStatus('error')
    setErrorMessage(result.message)
    if (result.field) document.getElementById(result.field)?.focus()
  }

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="max-w-3xl mb-12 md:mb-16">
          <h1 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-6">Get In Touch</h1>
          <p className="text-xl md:text-2xl font-light text-gray-900 leading-relaxed">
            Ready to add a Fabian PhiL artwork to your collection? Have questions about my kinetic art? I&apos;d love to hear from you.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <section className="lg:col-span-4" aria-labelledby="contact-information">
            <h2 id="contact-information" className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-8">
              Contact Information
            </h2>

            <div className="space-y-7">
              <div>
                <h3 className={infoLabelClass}>Email</h3>
                <a href="mailto:fabianphilartist@gmail.com" className={`${infoLinkClass} break-all`}>
                  fabianphilartist@gmail.com
                </a>
                <p className="text-sm text-gray-500 font-light mt-1">For inquiries and commissions</p>
              </div>

              <div>
                <h3 className={infoLabelClass}>WhatsApp</h3>
                <a href="https://wa.me/971567594229" className={infoLinkClass}>
                  +971 567594229
                </a>
                <p className="text-sm text-gray-500 font-light mt-1">Quick messages and calls</p>
              </div>

              <div>
                <h3 className={infoLabelClass}>Studio Address</h3>
                <div className="text-base text-gray-900 font-light leading-relaxed">
                  <p>70 Lowaina Street</p>
                  <p>Umm Suqeim 1, Dubai, UAE</p>
                </div>
                <p className="text-sm text-gray-500 font-light mt-1">Visit by appointment</p>
              </div>

              <div>
                <h3 className={infoLabelClass}>Social Media</h3>
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
                <p className="text-sm text-gray-500 font-light mt-1">Follow for latest updates</p>
              </div>
            </div>
          </section>

          <section className="lg:col-span-8 lg:border-l lg:border-gray-100 lg:pl-16" aria-labelledby="send-a-message">
            <h2 id="send-a-message" className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-8">
              Send a Message
            </h2>

            {status === 'sent' ? (
              <div role="status" className="py-10 border-t border-gray-100">
                <h3 className="text-2xl font-light uppercase tracking-[0.04em] text-gray-900 mb-3">Message sent</h3>
                <p className="text-base text-gray-600 font-light leading-relaxed mb-8">
                  Thank you for getting in touch. Fabian will reply to you by email.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    startedAt.current = Date.now()
                    setStatus('idle')
                  }}
                  className={textLinkClass}
                >
                  Send another message →
                </button>
              </div>
            ) : (
              <form method="post" action="/api/enquiry" onSubmit={handleSubmit} className="space-y-6">
                <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
                  <label htmlFor="contact-website">Leave this field empty</label>
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
                      First Name
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
                      placeholder="Your first name"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className={labelClass}>
                      Last Name
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
                      placeholder="Your last name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className={labelClass}>
                      Email Address
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
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Phone Number (Optional)
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
                  <label htmlFor="subject" className={labelClass}>
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className={fieldClass}
                  >
                    <option value="">Select a subject</option>
                    <option value="inquiry">Artwork Inquiry</option>
                    <option value="commission">Commission Request</option>
                    <option value="exhibition">Exhibition Opportunity</option>
                    <option value="press">Press & Media</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Message
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
                    placeholder="Tell me about your interest in my art, specific artworks you're interested in, or any questions you have..."
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div role="alert" className={errorBoxClass}>
                    <p>{errorMessage}</p>
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-2 text-xs tracking-[0.16em] uppercase text-gray-900 border-b border-gray-900 pb-0.5 hover:text-gray-600 hover:border-gray-600 transition-colors"
                    >
                      Message Fabian on WhatsApp
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
                        <span>Sending...</span>
                      </>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </div>
              </form>
            )}

            <p className="mt-8 text-sm text-gray-500 font-light leading-relaxed">
              For immediate assistance, please call or WhatsApp me directly at +971 567594229
            </p>
          </section>
        </div>

        <section className="mt-20 md:mt-24 pt-12 border-t border-gray-100 max-w-3xl">
          <h2 className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-5">Ready to Start Your Collection?</h2>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed mb-8">
            I&apos;m always excited to work with new collectors and art enthusiasts. Whether you&apos;re looking for a specific piece or want to commission something unique, I&apos;m here to help you find the perfect artwork.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 sm:gap-10">
            <a href={WHATSAPP_URL} className={textLinkClass}>
              WhatsApp Me Now →
            </a>
            <a href="mailto:fabianphilartist@gmail.com" className={textLinkClass}>
              Send Email →
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ContactPage
