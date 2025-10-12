'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { DollarSign, ArrowRight, MessageSquare, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

const PriceInquiryPage = () => {
  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="bg-white text-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Price Inquiry
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              All artworks are priced upon inquiry. Below are indicative price ranges by format size to help guide your interest and collection planning.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Price Ranges Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
          >
            {/* Small Format */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white text-black rounded-2xl p-8 shadow-2xl text-center border-4 border-transparent hover:border-gray-300 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl font-bold">S</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Small Format</h3>
              <p className="text-gray-600 mb-6 text-lg">70x70cm</p>
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-2xl font-bold text-black">AED 10,000 - 16,000</p>
                </div>
                <div className="bg-slate-900 text-white rounded-lg p-4">
                  <p className="text-lg font-semibold">€2,500 - 4,000</p>
                </div>
              </div>
            </motion.div>

            {/* Triptych Format */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white text-black rounded-2xl p-8 shadow-2xl text-center border-4 border-transparent hover:border-gray-300 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl font-bold">T</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Triptych</h3>
              <p className="text-gray-600 mb-6 text-lg">70x180cm</p>
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-2xl font-bold text-black">AED 30,000 - 40,000</p>
                </div>
                <div className="bg-slate-900 text-white rounded-lg p-4">
                  <p className="text-lg font-semibold">€8,000 - 10,000</p>
                </div>
              </div>
            </motion.div>

            {/* Medium Format */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white text-black rounded-2xl p-8 shadow-2xl text-center border-4 border-transparent hover:border-gray-300 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl font-bold">M</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Medium Format</h3>
              <p className="text-gray-600 mb-6 text-lg">90x120cm</p>
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-2xl font-bold text-black">AED 28,000 - 50,000</p>
                </div>
                <div className="bg-slate-900 text-white rounded-lg p-4">
                  <p className="text-lg font-semibold">€7,000 - 13,000</p>
                </div>
              </div>
            </motion.div>

            {/* Large Format */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white text-black rounded-2xl p-8 shadow-2xl text-center border-4 border-transparent hover:border-gray-300 transition-all duration-300"
            >
              <div className="w-20 h-20 bg-slate-900 text-white rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-white text-3xl font-bold">L</span>
              </div>
              <h3 className="text-2xl font-bold text-black mb-3">Large Format</h3>
              <p className="text-gray-600 mb-6 text-lg">110x110cm+</p>
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="text-2xl font-bold text-black">AED 35,000 - 45,000</p>
                </div>
                <div className="bg-slate-900 text-white rounded-lg p-4">
                  <p className="text-lg font-semibold">€9,000 - 11,000</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Important Notice */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-white text-black rounded-2xl p-8 mb-16 text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Important Notice</h2>
            <p className="text-lg text-gray-700 mb-6 max-w-4xl mx-auto">
              All prices are indicative and subject to change. Final pricing depends on the specific artwork, 
              its condition, provenance, and current market conditions. For accurate pricing and availability, 
              please contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="group bg-slate-900 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-800 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Mail size={20} />
                <span>Contact for Pricing</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </Link>
              <Link
                href="/gallery"
                className="group border-2 border-slate-900 text-black px-8 py-4 rounded-lg font-semibold text-lg hover:bg-slate-900 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2"
              >
                <MessageSquare size={20} />
                <span>Browse Gallery</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  )
}

export default PriceInquiryPage
