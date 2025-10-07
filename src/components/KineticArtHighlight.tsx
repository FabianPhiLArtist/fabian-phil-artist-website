'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Play, Zap, Wind } from 'lucide-react'

const KineticArtHighlight = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Revolutionary
            <span className="block bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Kinetic Art
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the world's first Moving Hair Collection - where portraits come alive 
            with dynamic hair movement, creating truly living artworks.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold mb-6">
              Moving Hair Collection
            </h3>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Fabian PhiL's groundbreaking technique uses two acrylic sheets with carefully 
              positioned hair elements that move with air currents, creating portraits that 
              literally breathe and come alive. This revolutionary approach to kinetic art 
              transforms static portraits into dynamic, living experiences.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Wind className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Air-Activated Movement</h4>
                  <p className="text-gray-300">
                    Hair elements respond to air currents, creating natural, organic movement 
                    that brings each portrait to life.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Unique Technique</h4>
                  <p className="text-gray-300">
                    Acrylic paint and ink on two acrylic sheets create depth and dimension 
                    while allowing for kinetic movement.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Play className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Living Artworks</h4>
                  <p className="text-gray-300">
                    Each piece is unique and constantly changing, offering viewers a 
                    different experience every time they look.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/gallery"
                className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 shadow-2xl"
              >
                <span>View Moving Hair Collection</span>
                <Play className="group-hover:translate-x-1 transition-transform duration-300" size={20} />
              </Link>
            </div>
          </motion.div>

          {/* Visual/Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
              {/* Placeholder for video or animated GIF */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-orange-500/20 to-red-500/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-32 h-32 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full mx-auto mb-4 flex items-center justify-center"
                  >
                    <Wind className="text-white text-4xl" />
                  </motion.div>
                  <p className="text-gray-600 font-medium">Moving Hair Art</p>
                  <p className="text-sm text-gray-500">Kinetic Movement</p>
                </div>
              </div>
              
              {/* Animated elements */}
              <motion.div
                animate={{ 
                  x: [0, 20, 0],
                  y: [0, -10, 0],
                  opacity: [0.3, 0.7, 0.3]
                }}
                transition={{ 
                  duration: 3, 
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
                  duration: 4, 
                  repeat: Infinity,
                  delay: 1
                }}
                className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-30"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default KineticArtHighlight





