'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Monitor, Palette, Layers, Zap, ArrowRight } from 'lucide-react'

const DigitalFusionHighlight = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-cyan-900 via-blue-900 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Digital Design Collection
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto">
            Revolutionary mixed media combining digital design with traditional artistic techniques. 
            Digital designs are printed on acrylic sheets, then enhanced with painting and collage elements, 
            creating a unique fusion of analog and digital art.
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
              Digital Meets Traditional
            </h3>
            
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Fabian PhiL's Digital Design Collection represents a groundbreaking approach to contemporary art, 
              where digital design meets traditional painting techniques. Each piece starts as a digital design 
              printed on acrylic sheets, then evolves through traditional painting, collage, and mixed media 
              applications, creating truly unique artworks that bridge the gap between digital and analog worlds.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Monitor className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Digital Foundation</h4>
                  <p className="text-gray-300">
                    Each artwork begins as a digital design, allowing for precise composition and 
                    complex visual elements that would be impossible to achieve through traditional means alone.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Palette className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Traditional Enhancement</h4>
                  <p className="text-gray-300">
                    Digital prints are then enhanced with traditional painting techniques, adding 
                    texture, depth, and the human touch that makes each piece truly unique and irreplaceable.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Layers className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">Collage Elements</h4>
                  <p className="text-gray-300">
                    Main characters like Clint Eastwood are enhanced with collage techniques, 
                    creating layered compositions that add narrative depth and visual complexity.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/gallery"
                className="group bg-white text-gray-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 shadow-2xl"
              >
                <span>Experience Digital Design</span>
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
              {/* Digital/Traditional fusion visualization */}
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
                  className="w-32 h-32 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center"
                >
                  <Monitor className="text-white text-4xl" />
                </motion.div>
                <div className="text-center">
                  <p className="text-gray-600 font-medium">Digital + Traditional</p>
                  <p className="text-sm text-gray-500">Mixed media fusion</p>
                </div>
              </div>
              
              {/* Animated elements showing the fusion process */}
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
                className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-30"
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
                className="absolute bottom-8 left-8 w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full opacity-30"
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
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl font-bold">2</span>
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Artworks</h4>
            <p className="text-gray-300">Digital fusion pieces</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Monitor className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Digital</h4>
            <p className="text-gray-300">Printed design base</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Palette className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Traditional</h4>
            <p className="text-gray-300">Painting enhancement</p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="text-white text-2xl" />
            </div>
            <h4 className="text-xl font-semibold text-white mb-2">Fusion</h4>
            <p className="text-gray-300">Unique combination</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default DigitalFusionHighlight





