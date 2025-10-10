'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, Move, Heart, Sparkles, ArrowRight } from 'lucide-react'

const BigFormatsHighlight = () => {
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
              Expressive Emotion Collection
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Revolutionary large-format portraits with eyes that follow you as you move around the room. 
            <em> "Le regard qui est capturé, expressif, insolite reflète une émotion qui transcende la pièce."</em>
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
              Eyes That Follow You
            </h3>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Fabian PhiL's Expressive Emotion Collection features revolutionary optical illusions where 
              the eyes of each portrait follow you as you move around the room. This creates an 
              intimate, emotional connection that transcends the physical artwork, making each 
              piece feel alive and present.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                  <Eye className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Optical Illusion</h4>
                  <p className="text-gray-300">
                    Advanced technique using acrylic sheets and mirror vinyl creates the 
                    mesmerizing effect of eyes that track your movement across the room.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Move className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Interactive Experience</h4>
                  <p className="text-gray-300">
                    Each portrait creates a unique emotional connection as the eyes follow 
                    you, making you feel seen, understood, and part of the artwork's story.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Emotional Transcendence</h4>
                  <p className="text-gray-300">
                    The expressive, unusual gaze reflects emotions that transcend the piece, 
                    creating a profound connection between viewer and artwork.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/gallery"
                className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 shadow-2xl"
              >
                <span>Experience Expressive Emotion</span>
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
                src="/images/artworks/Fabian PhiL_Why_2021_72000aed.jpg"
                alt="Expressive Emotion Collection - Why...?"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="font-medium">Expressive Emotion Collection</p>
                <p className="text-sm text-gray-300">Eyes that follow you</p>
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
              <span className="text-white text-2xl font-bold">6</span>
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Artworks</h4>
            <p className="text-gray-300">Large format portraits</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-500 to-gray-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Eye Tracking</h4>
            <p className="text-gray-300">Optical illusion effect</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Emotional</h4>
            <p className="text-gray-300">Deep connection</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Unique</h4>
            <p className="text-gray-300">Revolutionary technique</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default BigFormatsHighlight
