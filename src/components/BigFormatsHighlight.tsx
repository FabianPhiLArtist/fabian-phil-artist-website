'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Eye, Move, Heart, Sparkles, ArrowRight } from 'lucide-react'

const BigFormatsHighlight = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
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
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
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
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
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
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center flex-shrink-0">
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
            <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
              {/* Animated eye that follows cursor */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                  <Eye className="text-white text-4xl" />
                </motion.div>
                <div className="text-center">
                  <p className="text-gray-600 font-medium">Eyes That Follow You</p>
                  <p className="text-sm text-gray-500">Move around to experience</p>
                </div>
              </div>
              
              {/* Animated elements showing movement */}
              <motion.div
                animate={{ 
                  x: [0, 20, 0],
                  y: [0, -10, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity,
                  delay: 0.5
                }}
                className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-30"
              />
              <motion.div
                animate={{ 
                  x: [0, -15, 0],
                  y: [0, 15, 0],
                  opacity: [0.2, 0.6, 0.2]
                }}
                transition={{ 
                  duration: 5, 
                  repeat: Infinity,
                  delay: 1
                }}
                className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-30"
              />
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
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">6</span>
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Artworks</h4>
            <p className="text-gray-300">Large format portraits</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Eye Tracking</h4>
            <p className="text-gray-300">Optical illusion effect</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Emotional</h4>
            <p className="text-gray-300">Deep connection</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
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
