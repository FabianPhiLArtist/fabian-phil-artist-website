'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Sparkles, Eye, Zap, Palette, ArrowRight } from 'lucide-react'

const LuminousVisionHighlight = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 bg-clip-text text-transparent">
              Pop glasses Collection
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Revolutionary portraits featuring fluorescent glasses that glow in the dark. 
            Each piece illuminates emotions and creates a luminous connection that transcends the physical artwork.
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
            <h3 className="text-3xl font-bold mb-6">
              Fluorescent Glasses That Glow
            </h3>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Fabian PhiL's Pop glasses Collection features revolutionary fluorescent glasses 
              that glow in the dark, creating an otherworldly effect that illuminates emotions and 
              creates a luminous connection between viewer and artwork. Each piece literally glows 
              with personality and meaning.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Fluorescent Magic</h4>
                  <p className="text-gray-300">
                    Advanced fluorescent paint techniques create glasses that literally glow in the dark, 
                    transforming each portrait into a luminous beacon of emotion and personality.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Electric Energy</h4>
                  <p className="text-gray-300">
                    The glowing effect creates an electric energy that draws viewers in, making each 
                    portrait feel alive and present even in complete darkness.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Palette className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Luminous Expression</h4>
                  <p className="text-gray-300">
                    Each piece illuminates different emotions and personalities, creating a radiant 
                    expression of human nature that glows with authenticity and character.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/gallery?series=Pop glasses Collection"
                className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 shadow-2xl"
              >
                <span>Experience Pop glasses</span>
                <ArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </Link>
            </div>
          </motion.div>

          {/* Visual Demonstration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 bg-gray-900 rounded-2xl overflow-hidden">
              <Image
                src="/images/artworks/Fabian PhiL_Wanted for Loving Art_2023_18000aed.jpg"
                alt="Pop glasses Collection - Wanted for Loving Art"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-medium">Pop glasses Collection</p>
                <p className="text-sm text-gray-300">Fluorescent glasses that glow in the dark</p>
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
          className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">8</span>
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Artworks</h4>
            <p className="text-gray-300">Luminous portraits</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Fluorescent</h4>
            <p className="text-gray-300">Glow in the dark</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Electric</h4>
            <p className="text-gray-300">Luminous energy</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Vision</h4>
            <p className="text-gray-300">Illuminated gaze</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default LuminousVisionHighlight





