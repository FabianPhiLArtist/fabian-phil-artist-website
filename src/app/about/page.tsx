'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Instagram, Facebook, Award, Palette, Lightbulb } from 'lucide-react'
import SimpleImageModal from '@/components/SimpleImageModal'

const AboutPage = () => {
  const [modalImage, setModalImage] = useState<{
    src: string
    alt: string
    title?: string
  } | null>(null)

  const openModal = (src: string, alt: string, title?: string) => {
    setModalImage({ src, alt, title })
  }

  const closeModal = () => {
    setModalImage(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              The Artist Behind the Art
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              From Shell Executive to International Artist
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Artist Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Meet Fabian PhiL</h2>
              
              {/* Artist photo */}
              <div className="relative h-96 rounded-xl mb-6 overflow-hidden">
                <Image
                  src="/images/about/Fabian Phil Artist overview.png"
                  alt="Fabian PhiL Artist"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                  <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-center">
                    <div className="text-lg font-semibold">Click to view full image</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award size={20} className="text-blue-600" />
                  <span className="text-gray-700">Geophysicist & Former Shell Executive</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Palette size={20} className="text-purple-600" />
                  <span className="text-gray-700">Self-Taught Kinetic Pop Artist</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={20} className="text-green-600" />
                  <span className="text-gray-700">Based in Dubai, UAE</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Lightbulb size={20} className="text-yellow-600" />
                  <span className="text-gray-700">From Seismic Waves to Kinetic Art</span>
                </div>
              </div>
            </div>

            {/* Studio/Workplace Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">My Studio</h3>
              
              {/* Studio photos */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div 
                  className="relative h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                  onClick={() => openModal('/images/exhibitions/WAD_photos all paintings.jpg', "Fabian PhiL's studio workspace", 'Studio Workspace')}
                >
                  <Image
                    src="/images/exhibitions/WAD_photos all paintings.jpg"
                    alt="Fabian PhiL's studio workspace"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-center text-sm">
                      Click to view
                    </div>
                  </div>
                </div>
                <div 
                  className="relative h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                  onClick={() => openModal('/images/exhibitions/Fabian Studio Dubai.jpg', "Fabian PhiL's artwork in studio", 'Studio Dubai')}
                >
                  <Image
                    src="/images/exhibitions/Fabian Studio Dubai.jpg"
                    alt="Fabian PhiL's artwork in studio"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                    <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-center text-sm">
                      Click to view
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600">
                Located in the heart of Dubai, my studio is where the magic happens. 
                This is where I create my kinetic artworks, experimenting with acrylic sheets, 
                LED lighting, and innovative techniques that bring my art to life.
              </p>
            </div>
          </motion.div>

          {/* Story Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Journey Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">My Artistic Journey</h2>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">The First Painting - Brunei (2002-2006)</h3>
                  <p className="text-gray-600">
                    Born into a family of art collectors, I was always drawn to what I was not yet - artists, philosophers, historians. 
                    As an engineer studying business, I felt a pull toward creative expression. In Brunei's jungle in 2003, I painted my first 
                    artwork - a single painting that took me an entire year to complete, teaching me the patience and dedication art demands.
                  </p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">The Blue Lady Discovery - Africa (2006-2010)</h3>
                  <p className="text-gray-600">
                    As a geophysicist working with seismic waves, I wanted to translate their movement into paintings. I sought something 
                    lean with transparency, where light would reflect the characters. By chance in 2010, I painted the Blue Lady twice on two 
                    plexiglass sheets. The vertical strokes created movement when you moved around the painting - the eyes followed you, 
                    like the Mona Lisa. This was my breakthrough into kinetic pop art.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Evolution in Dubai (2010-2025)</h3>
                  <p className="text-gray-600">
                    After four challenging years in Iraq (2015-2019), I aspired for more joy and began painting pop glasses in fluorescent paint. 
                    I explored triptychs with 100 USD bills and started mixing digital design with traditional techniques, introducing 
                    cartoons, boxing themes, and fashion shows on catwalks. In 2025, seeking more peace after leaving corporate life, 
                    I created pandas with zen Chinese landscapes - temples, lakes, cherry blossom trees - for a peaceful, healing outcome.
                  </p>
                </div>
              </div>
            </div>

            {/* Intellectual Background Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Intellectual Journey & Influences</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-indigo-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">From Science to Art</h4>
                  <p className="text-gray-600">
                    As a geophysicist working with seismic waves, I found myself translating scientific concepts into visual art. 
                    The movement, transparency, and light reflection I studied in geophysics became the foundation of my kinetic art technique.
                  </p>
                </div>
                
                <div className="border-l-4 border-teal-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Artistic Influences</h4>
                  <p className="text-gray-600">
                    Drawn to what I was not yet, I studied modern artists like Klasen, Delorme, Warhol, Seaty, and others. 
                    I tried to mix Klasen with my own style but eventually discovered my unique voice through chance and experimentation.
                  </p>
                </div>
                
                <div className="border-l-4 border-rose-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Quest for Peace</h4>
                  <p className="text-gray-600">
                    After the physical and emotional challenges of working in Iraq, I sought a quiet, peaceful environment. 
                    My art became a refuge - a response to chaos, bringing light, joy, and zen into my life and others'.
                  </p>
                </div>
              </div>
            </div>

            {/* Personal Growth & Self-Improvement Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Always Becoming Better</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-purple-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Intellectual Curiosity</h4>
                  <p className="text-gray-600">
                    Attracted to people who speak well and tell stories - historians, novelists, counselors (my aunt), philosophers (my uncle). 
                    I've read many historical novels by Ken Follett, Dos Santos, Lapierre & Collins, and others. I've negotiated complex 
                    contracts with multiple stakeholders in my corporate career, always seeking to understand different perspectives.
                  </p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Hands-On Learning</h4>
                  <p className="text-gray-600">
                    Never a handyman in my youth, I've started working with wood at my chalet in the Alps (Chamonix/Megève), learning 
                    new skills and continuing to grow. I would love to know how to build a house - always seeking to become better than what I am.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Artistic Evolution</h4>
                  <p className="text-gray-600">
                    My artwork is a reflection of this constant self-improvement. I try to always improve and started painting on my own. 
                    Each new series - from kinetic portraits to pop glasses, from currency art to zen pandas - represents growth and 
                    exploration of new possibilities.
                  </p>
                </div>
              </div>
            </div>

            {/* Philosophy Section */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">My Artistic Philosophy</h3>
              
              <blockquote className="text-lg italic text-gray-700 mb-6 border-l-4 border-yellow-400 pl-6">
                "I am driven by emotions of the character. I try to capture the eyes movement, sometimes the air flow. 
                I love transparency, light and movement. We need more light in our lives."
              </blockquote>
              
              <div className="space-y-4">
                <p className="text-gray-600">
                  My art is born from emotion - I'm driven by the character's feelings, capturing the movement of eyes, 
                  the flow of air, the essence of life itself. I love transparency, light, and movement because they 
                  bring energy and hope into our world.
                </p>
                <p className="text-gray-600">
                  Each collection serves a purpose: the pop glasses and 100 USD bills because we need more light in our lives, 
                  the pandas with beautiful landscapes because we need more color and joy after what we see on TV. 
                  My art is not just visual - it's emotional, it's healing, it's a response to the world around us.
                </p>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Let's Connect</h3>
              <p className="text-lg mb-6 opacity-90">
                Interested in learning more about my artistic process or commissioning a piece? 
                I'd love to share my story with you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="https://wa.me/971567594229"
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
                >
                  WhatsApp Me
                </a>
                <a
                  href="mailto:fabianphilartist@gmail.com"
                  className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
                >
                  Send Email
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Collections Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Art Collections</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏃</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Mugshot Collection</h3>
              <p className="text-gray-600 text-sm">Capturing the movement of eyes and air flow in high-speed life</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👁️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expressive Emotion</h3>
              <p className="text-gray-600 text-sm">Eye movement that follows you - pure emotional connection</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Pop glasses</h3>
              <p className="text-gray-600 text-sm">Pop glasses bringing light and joy to our lives</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💸</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">100 USD Bill</h3>
              <p className="text-gray-600 text-sm">Currency art bringing more light and energy</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Digital Design</h3>
              <p className="text-gray-600 text-sm">Mixed media innovation exploring new possibilities</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🐼</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Panda Pop</h3>
              <p className="text-gray-600 text-sm">Colorful pandas with beautiful landscapes - joy after TV news</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <SimpleImageModal
          isOpen={!!modalImage}
          onClose={closeModal}
          imageSrc={modalImage.src}
          alt={modalImage.alt}
          title={modalImage.title}
        />
      )}
    </div>
  )
}

export default AboutPage
