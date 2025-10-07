'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { DollarSign, Layers, Star, ArrowRight } from 'lucide-react'

const TrypticCollectionHighlight = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              100 USD Bill Collection
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Revolutionary tryptics that literally represent 100 USD bills with iconic figures as the central portrait. 
            Each piece mimics the structure of currency while replacing traditional portraits with cultural icons, 
            creating powerful statements about value, fame, and artistic legacy.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Tryptic Innovation
            </h3>
            
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              Fabian PhiL's 100 USD Bill Collection is a groundbreaking series that literally 
              recreates 100 USD bills using tryptic format. Each piece features iconic cultural 
              figures (Mick Jagger, Andy Warhol) as the central portrait, replacing the traditional 
              Benjamin Franklin image. This innovative approach creates powerful meta-commentary 
              on art, commerce, and cultural value.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Layers className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Currency Structure</h4>
                  <p className="text-gray-700">
                    Each tryptic literally mimics the structure of a 100 USD bill, with the 
                    iconic figure replacing Benjamin Franklin in the center panel, creating 
                    an authentic currency aesthetic.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <DollarSign className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Iconic Substitution</h4>
                  <p className="text-gray-700">
                    Revolutionary concept of replacing Benjamin Franklin with cultural icons 
                    like Mick Jagger and Andy Warhol, creating powerful statements about 
                    who deserves to be on currency.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Cultural Currency</h4>
                  <p className="text-gray-700">
                    Featuring legendary figures like Mick Jagger and Andy Warhol as currency 
                    portraits, questioning who truly has cultural value and deserves to be 
                    immortalized on money.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/gallery"
                className="group bg-gray-900 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-300 flex items-center space-x-2 shadow-2xl"
              >
                <span>View 100 USD Collection</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </Link>
            </div>
          </motion.div>

          {/* Artwork Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Mick Jagger */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                <div className="text-center">
                  <DollarSign className="text-green-600 text-4xl mx-auto mb-2" />
                  <p className="text-gray-700 font-medium">100 USD Mick Jagger</p>
                  <p className="text-sm text-gray-500">2022 • Tryptic</p>
                </div>
              </div>
            </div>

            {/* Andy Warhol */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-br from-blue-100 to-cyan-200 flex items-center justify-center">
                <div className="text-center">
                  <Star className="text-blue-600 text-4xl mx-auto mb-2" />
                  <p className="text-gray-700 font-medium">100 USD Andy Warhol</p>
                  <p className="text-sm text-gray-500">2017 • Tryptic</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Collection Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Artworks</h4>
            <p className="text-gray-600">Unique tryptic pieces</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">€54K</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Price Range</h4>
            <p className="text-gray-600">Premium collector pieces</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">70x180</span>
            </div>
            <h4 className="text-xl font-semibold text-gray-900 mb-2">Dimensions</h4>
            <p className="text-gray-600">Dramatic vertical format</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default TrypticCollectionHighlight
