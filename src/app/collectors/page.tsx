'use client'

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Phone, Award, Shield, Star, Heart, MessageSquare, Download, Calendar, MapPin } from 'lucide-react'

const CollectorsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              For Art Collectors
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Art Born from Emotion - Bringing Light, Joy, and Healing to Your Space
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Why Collect Fabian PhiL Art */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Collect Fabian PhiL Art?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each piece is born from emotion - capturing eye movement, air flow, and the essence of life. 
              My art brings light, joy, and healing to spaces, responding to the world around us with hope and beauty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Unique Innovation</h3>
              <p className="text-gray-600">
                Revolutionary kinetic art using two plexiglass sheets with paint, print, spray, and collage techniques. 
                This 25-year perfected method creates transparency, attracts light, and generates movement that brings 
                characters to life with unprecedented optical effects.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Investment Value</h3>
              <p className="text-gray-600">
                Limited edition pieces with growing recognition in international exhibitions (DIFC Art Night 2025, 
                World Art Dubai 2024) and media features. Each artwork represents 25 years of artistic evolution 
                and is a unique investment in the future of kinetic pop art.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Emotional Healing</h3>
              <p className="text-gray-600">
                Each artwork is born from emotion - capturing eye movement, air flow, and the essence of life. 
                My art brings light, joy, and healing to spaces, responding to the world around us with hope and beauty.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Artist Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h2 className="text-3xl font-bold mb-6 text-center">Artist Recognition & Achievements</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">International Exhibitions</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Award className="text-yellow-400" size={20} />
                    <span>DIFC Art Night 2025 - Prestigious Dubai financial district</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Award className="text-yellow-400" size={20} />
                    <span>World Art Dubai 2024 - Middle East's largest art fair</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-blue-300" size={20} />
                    <span>25 years of artistic evolution across 3 continents</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold mb-4">Media Recognition</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Star className="text-yellow-400" size={20} />
                    <span>Featured in Artmosphere Magazine</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="text-red-300" size={20} />
                    <span>Growing collector base worldwide</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Collection Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Collection Highlights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-red-100 to-pink-100 flex items-center justify-center">
                <span className="text-4xl">🏃</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Mugshot Collection</h3>
                <p className="text-gray-600 text-sm mb-4">Capturing eye movement and air flow in high-speed life</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">4 pieces available</span>
                  <span className="text-sm font-semibold text-blue-600">€3,000 - €3,000</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                <span className="text-4xl">👁️</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Expressive Emotion</h3>
                <p className="text-gray-600 text-sm mb-4">Eye movement that follows you - pure emotional connection</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">4 pieces available</span>
                  <span className="text-sm font-semibold text-blue-600">€8,000 - €10,000</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="relative h-48 bg-gradient-to-br from-green-100 to-blue-100 flex items-center justify-center">
                <span className="text-4xl">💡</span>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Luminous Vision</h3>
                <p className="text-gray-600 text-sm mb-4">Pop glasses bringing light and joy to our lives</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">4 pieces available</span>
                  <span className="text-sm font-semibold text-blue-600">€3,000 - €3,000</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Collector Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Collector Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Personal Consultation</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MessageSquare className="text-blue-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">One-on-One Consultation</h4>
                    <p className="text-gray-600 text-sm">Personal meeting to discuss your collection goals and preferences</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="text-green-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Studio Visits</h4>
                    <p className="text-gray-600 text-sm">Visit my studio in Dubai to see works in progress and discuss commissions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Download className="text-purple-600 mt-1" size={20} />
                  <div>
                    <h4 className="font-semibold text-gray-900">Digital Catalog</h4>
                    <p className="text-gray-600 text-sm">Complete catalog of available works with detailed specifications</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Acquisition Process</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">1</div>
                  <span className="text-gray-700">Initial inquiry and consultation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">2</div>
                  <span className="text-gray-700">Artwork selection and viewing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">3</div>
                  <span className="text-gray-700">Purchase agreement and payment</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">4</div>
                  <span className="text-gray-700">Professional packaging and shipping</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">5</div>
                  <span className="text-gray-700">Installation guidance and support</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Collection?</h3>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss how Fabian PhiL's kinetic art can enhance your collection. 
            I'm here to guide you through every step of the acquisition process.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://wa.me/971567594229"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Phone size={20} />
              <span>WhatsApp: +971 567594229</span>
            </a>
            <a
              href="mailto:fabianphilartist@gmail.com"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Mail size={20} />
              <span>Email: fabianphilartist@gmail.com</span>
            </a>
          </div>
          
          <div className="text-sm opacity-75">
            <p>Gallery Address: 70 Lowaina Street, Umm Suqeim 1, Dubai, UAE</p>
            <p>Visits by appointment • Professional consultation available</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CollectorsPage
