'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Facebook, MessageSquare } from 'lucide-react'

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 pt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to add a Fabian PhiL artwork to your collection? 
            Have questions about my kinetic art? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h2>
            
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="text-blue-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Email</h3>
                  <a
                    href="mailto:fabianphilartist@gmail.com"
                    className="text-blue-600 hover:text-blue-800 transition-colors duration-200 text-lg"
                  >
                    fabianphilartist@gmail.com
                  </a>
                  <p className="text-gray-600 mt-1">For inquiries and commissions</p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-full">
                  <Phone className="text-green-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">WhatsApp</h3>
                  <a
                    href="https://wa.me/971567594229"
                    className="text-green-600 hover:text-green-800 transition-colors duration-200 text-lg"
                  >
                    +971 567594229
                  </a>
                  <p className="text-gray-600 mt-1">Quick messages and calls</p>
                </div>
              </div>

              {/* Gallery Address */}
              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-full">
                  <MapPin className="text-purple-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Gallery Address</h3>
                  <div className="text-gray-700">
                    <p>70 Lowaina Street</p>
                    <p>Umm Suqeim 1, Dubai, UAE</p>
                  </div>
                  <p className="text-gray-600 mt-1">Visit by appointment</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-start space-x-4">
                <div className="bg-pink-100 p-3 rounded-full">
                  <Instagram className="text-pink-600" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Social Media</h3>
                  <div className="space-y-2">
                    <a
                      href="https://instagram.com/fabianphilartist"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-pink-600 hover:text-pink-800 transition-colors duration-200"
                    >
                      @fabianphilartist
                    </a>
                    <a
                      href="https://facebook.com/fabianphilartist"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      Fabian Phil Artist
                    </a>
                  </div>
                  <p className="text-gray-600 mt-1">Follow for latest updates</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Send a Message</h2>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                    placeholder="Your last name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number (Optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="+971 50 123 4567"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
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
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200"
                  placeholder="Tell me about your interest in my art, specific artworks you're interested in, or any questions you have..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <MessageSquare size={20} />
                <span>Send Message</span>
              </button>
            </form>

            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> For immediate assistance, please call or WhatsApp me directly at +971 567594229
              </p>
            </div>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Ready to Start Your Collection?</h3>
          <p className="text-lg mb-6 opacity-90">
            I'm always excited to work with new collectors and art enthusiasts. 
            Whether you're looking for a specific piece or want to commission something unique, 
            I'm here to help you find the perfect artwork.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/971567594229"
              className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              WhatsApp Me Now
            </a>
            <a
              href="mailto:fabianphilartist@gmail.com"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
            >
              Send Email
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ContactPage
