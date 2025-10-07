'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Palette, Award, Users } from 'lucide-react'

const AboutPreview = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              From Corporate to
              <span className="block bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Canvas
              </span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Former Shell executive turned international artist, Fabian Phil creates 
              kinetic pop art that challenges perceptions and moves the soul. His work 
              bridges the gap between corporate precision and artistic expression.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Palette className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">3 Series</h3>
                <p className="text-sm text-gray-600">Pandas, F1, Wanted</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">International</h3>
                <p className="text-sm text-gray-600">Global Recognition</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="text-white" size={24} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Collectors</h3>
                <p className="text-sm text-gray-600">Worldwide</p>
              </div>
            </div>

            <Link
              href="/about"
              className="group inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-gray-800 transition-all duration-300"
            >
              <span>Learn More</span>
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={20} />
            </Link>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl overflow-hidden">
              {/* Placeholder for artist photo or artwork */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-blue-500/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-white text-4xl font-bold">FP</span>
                  </div>
                  <p className="text-gray-600 font-medium">Fabian Phil</p>
                  <p className="text-sm text-gray-500">Artist & Former Executive</p>
                </div>
              </div>
            </div>
            
            {/* Floating elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-80"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-80"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutPreview
