'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Instagram } from 'lucide-react'

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Side - Artwork Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[4/3] lg:aspect-[5/4]"
          >
            <div className="relative w-full h-full bg-gray-50 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/artworks/Wanted for Being Too Smart - WideWall.jpg"
                alt="Wanted for Being Too Smart - Fabian PhiL"
                fill
                className="object-cover"
                style={{ objectPosition: 'center center' }}
                priority
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-7 lg:pt-4"
          >
            {/* Title */}
            <div className="max-w-xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-gray-900 mb-4 leading-tight tracking-tight">
                Fabian PhiL
              </h1>
              <div className="h-px w-24 bg-gray-900 mb-6"></div>
              <p className="text-xl md:text-2xl text-gray-700 font-light mb-2">
                Kinetic Pop Artist
              </p>
              <p className="text-lg md:text-xl text-gray-600 font-light">
                Painter on Layered Plexiglass
              </p>
            </div>

            {/* Bio */}
            <div className="space-y-4">
              <p className="text-base md:text-lg text-gray-700 leading-relaxed font-light">
                Fabian PhiL is a Dubai-based contemporary artist of French origin whose work invites viewers to slow down and look beyond first impressions. Drawing from pop culture imagery and iconic figures, he creates layered compositions that shift with light, perspective, and movement.
              </p>
            </div>

            {/* Call to Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link
                href="/gallery"
                className="group inline-flex items-center justify-center bg-gray-900 text-white px-8 py-3 rounded-sm font-medium text-sm hover:bg-gray-800 transition-all duration-300 uppercase tracking-wider"
              >
                <span>View Collection</span>
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
              </Link>
              
              <a
                href="https://instagram.com/fabianphilartist"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center border border-gray-900 text-gray-900 px-8 py-3 rounded-sm font-medium text-sm hover:bg-gray-900 hover:text-white transition-all duration-300 uppercase tracking-wider"
              >
                <Instagram size={18} className="mr-2" />
                <span>Instagram</span>
              </a>
            </motion.div>

            {/* Additional Links */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                <Link href="/about" className="hover:text-gray-900 transition-colors duration-200">
                  About
                </Link>
                <Link href="/artist-statement" className="hover:text-gray-900 transition-colors duration-200">
                  Artist Statement
                </Link>
                <Link href="/exhibitions" className="hover:text-gray-900 transition-colors duration-200">
                  Exhibitions
                </Link>
                <Link href="/contact" className="hover:text-gray-900 transition-colors duration-200">
                  Contact
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Hero
