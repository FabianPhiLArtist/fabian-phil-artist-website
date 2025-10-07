'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Calendar, MapPin, ExternalLink, Award, BookOpen, Video, Camera } from 'lucide-react'
import SimpleImageModal from '@/components/SimpleImageModal'
import VideoModal from '@/components/VideoModal'

const ExhibitionsPage = () => {
  const [modalImage, setModalImage] = useState<{
    src: string
    alt: string
    title?: string
  } | null>(null)

  const [modalVideo, setModalVideo] = useState<{
    src: string
    title?: string
    poster?: string
  } | null>(null)

  const openImageModal = (src: string, alt: string, title?: string) => {
    setModalImage({ src, alt, title })
  }

  const openVideoModal = (src: string, title?: string, poster?: string) => {
    setModalVideo({ src, title, poster })
  }

  const closeModals = () => {
    setModalImage(null)
    setModalVideo(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Exhibitions & Publications
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Showcasing Kinetic Art on the World Stage
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* DIFC Art Night 2025 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Exhibition Info */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-3 mb-6">
                  <Award className="text-yellow-600" size={32} />
                  <h2 className="text-3xl font-bold text-gray-900">DIFC Art Night 2025</h2>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-blue-600" size={20} />
                    <span className="text-gray-700">January 2025</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-green-600" size={20} />
                    <span className="text-gray-700">Dubai International Financial Centre, UAE</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ExternalLink className="text-purple-600" size={20} />
                    <a 
                      href="https://www.difc.ae" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      difc.ae
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">About DIFC Art Night</h3>
                  <p className="text-gray-600">
                    DIFC Art Night is a prestigious event that transforms the financial district into a vibrant art gallery. 
                    It brings together established and emerging artists to showcase their work in one of Dubai's most 
                    iconic locations, attracting art collectors, professionals, and art enthusiasts.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900">My Participation</h3>
                  <p className="text-gray-600">
                    I exhibited my latest kinetic pop art collection, featuring works from the "Luminous Vision" series. 
                    The unique lighting effects of my fluorescent glasses created a mesmerizing display that captivated 
                    visitors and demonstrated the innovative potential of kinetic art in contemporary settings.
                  </p>
                </div>
              </div>

              {/* Photos and Videos */}
              <div className="bg-gray-100 p-8 lg:p-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Exhibition Photos & Videos</h3>
                
                {/* Exhibition photos */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div 
                    className="relative h-32 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                    onClick={() => openImageModal('/images/exhibitions/DIFC Christies.jpg', 'DIFC Art Night 2025 - Christies Exhibition', 'DIFC Art Night 2025')}
                  >
                    <Image
                      src="/images/exhibitions/DIFC Christies.jpg"
                      alt="DIFC Art Night 2025 - Christies Exhibition"
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
                    onClick={() => openImageModal('/images/exhibitions/DIFC Maybe I will see him.jpg', 'DIFC Art Night 2025 - Maybe I will see him', 'DIFC Art Night 2025')}
                  >
                    <Image
                      src="/images/exhibitions/DIFC Maybe I will see him.jpg"
                      alt="DIFC Art Night 2025 - Maybe I will see him"
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
                    onClick={() => openImageModal('/images/exhibitions/DIFC you call this Art.jpg', 'DIFC Art Night 2025 - You call this Art', 'DIFC Art Night 2025')}
                  >
                    <Image
                      src="/images/exhibitions/DIFC you call this Art.jpg"
                      alt="DIFC Art Night 2025 - You call this Art"
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
                    onClick={() => openImageModal('/images/exhibitions/DIFC Wanted Smoking Rock Star.jpg', 'DIFC Art Night 2025 - Wanted Smoking Rock Star', 'DIFC Art Night 2025')}
                  >
                    <Image
                      src="/images/exhibitions/DIFC Wanted Smoking Rock Star.jpg"
                      alt="DIFC Art Night 2025 - Wanted Smoking Rock Star"
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

                {/* Exhibition videos */}
                <div className="space-y-4">
                  <div 
                    className="relative h-40 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                    onClick={() => openVideoModal('/videos/exhibitions/DIFC Christies.MOV', 'DIFC Art Night 2025 - Christies Exhibition')}
                  >
                    <video
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    >
                      <source src="/videos/exhibitions/DIFC Christies.MOV" type="video/mp4" />
                      <source src="/videos/exhibitions/DIFC Christies.MOV" type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Video size={40} className="mx-auto mb-2" />
                        <div className="text-base font-semibold">Click to play video</div>
                        <div className="text-xs opacity-90">Christies Exhibition</div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="relative h-40 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                    onClick={() => openVideoModal('/videos/exhibitions/DIFC Opera Gallery.mov', 'DIFC Art Night 2025 - Opera Gallery')}
                  >
                    <video
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    >
                      <source src="/videos/exhibitions/DIFC Opera Gallery.mov" type="video/mp4" />
                      <source src="/videos/exhibitions/DIFC Opera Gallery.mov" type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Video size={40} className="mx-auto mb-2" />
                        <div className="text-base font-semibold">Click to play video</div>
                        <div className="text-xs opacity-90">Opera Gallery</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* World Art Dubai 2024 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Exhibition Info */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-3 mb-6">
                  <Award className="text-yellow-600" size={32} />
                  <h2 className="text-3xl font-bold text-gray-900">World Art Dubai 2024</h2>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-blue-600" size={20} />
                    <span className="text-gray-700">May 2024</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="text-green-600" size={20} />
                    <span className="text-gray-700">Dubai World Trade Centre, UAE</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ExternalLink className="text-purple-600" size={20} />
                    <a 
                      href="https://www.worldartdubai.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      worldartdubai.com
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">About World Art Dubai</h3>
                  <p className="text-gray-600">
                    World Art Dubai is the Middle East's largest contemporary art fair, attracting 
                    thousands of art collectors, galleries, and art enthusiasts from around the world. 
                    It's a prestigious platform for emerging and established artists to showcase their work.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900">My Participation</h3>
                  <p className="text-gray-600">
                    I exhibited my kinetic art collection, featuring works from the "Expressive Emotion" 
                    and "Luminous Vision" series. The interactive nature of my artworks created a unique 
                    experience for visitors, with many collectors drawn to the eye-following optical 
                    illusions and fluorescent effects.
                  </p>
                </div>
              </div>

              {/* Photos and Videos */}
              <div className="bg-gray-100 p-8 lg:p-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Exhibition Photos & Videos</h3>
                
                {/* Exhibition photo */}
                <div className="mb-6">
                  <div 
                    className="relative h-48 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                    onClick={() => openImageModal('/images/exhibitions/WAD_photos all paintings.jpg', 'World Art Dubai - All paintings display', 'World Art Dubai 2024')}
                  >
                    <Image
                      src="/images/exhibitions/WAD_photos all paintings.jpg"
                      alt="World Art Dubai - All paintings display"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-center">
                        <div className="text-lg font-semibold">Click to view full image</div>
                        <div className="text-sm opacity-90">All paintings display</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Exhibition videos */}
                <div className="space-y-4">
                  <div 
                    className="relative h-40 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                    onClick={() => openVideoModal('/videos/exhibitions/WAD24_exhibition May2024.MOV', 'World Art Dubai 2024 - Exhibition Overview')}
                  >
                    <video
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    >
                      <source src="/videos/exhibitions/WAD24_exhibition May2024.MOV" type="video/mp4" />
                      <source src="/videos/exhibitions/WAD24_exhibition May2024.MOV" type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Video size={40} className="mx-auto mb-2" />
                        <div className="text-base font-semibold">Click to play video</div>
                        <div className="text-xs opacity-90">Exhibition Overview</div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className="relative h-40 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                    onClick={() => openVideoModal('/videos/exhibitions/WAD24_exhibition catwalk.MOV', 'World Art Dubai 2024 - Catwalk Show')}
                  >
                    <video
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                    >
                      <source src="/videos/exhibitions/WAD24_exhibition catwalk.MOV" type="video/mp4" />
                      <source src="/videos/exhibitions/WAD24_exhibition catwalk.MOV" type="video/quicktime" />
                      Your browser does not support the video tag.
                    </video>
                    <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                      <div className="text-white text-center">
                        <Video size={40} className="mx-auto mb-2" />
                        <div className="text-base font-semibold">Click to play video</div>
                        <div className="text-xs opacity-90">Catwalk Show</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Artmosphere Magazine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Magazine Info */}
              <div className="p-8 lg:p-12">
                <div className="flex items-center space-x-3 mb-6">
                  <BookOpen className="text-red-600" size={32} />
                  <h2 className="text-3xl font-bold text-gray-900">Artmosphere Magazine</h2>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <Calendar className="text-blue-600" size={20} />
                    <span className="text-gray-700">2024</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <ExternalLink className="text-purple-600" size={20} />
                    <a 
                      href="https://www.artmosphere.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      artmosphere.com
                    </a>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">About Artmosphere</h3>
                  <p className="text-gray-600">
                    Artmosphere is a leading art magazine that features contemporary artists, 
                    exhibitions, and art trends. Being published in Artmosphere is a significant 
                    recognition in the art world and helps artists reach a broader audience of 
                    collectors and art enthusiasts.
                  </p>
                  
                  <h3 className="text-xl font-semibold text-gray-900">My Feature</h3>
                  <p className="text-gray-600">
                    I was featured in an article discussing the innovation of kinetic art and 
                    the unique techniques I use in my work. The article highlighted my transition 
                    from corporate life to art and the distinctive optical effects in my pieces.
                  </p>
                </div>
              </div>

              {/* Magazine Photos */}
              <div className="bg-gray-100 p-8 lg:p-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Magazine Feature</h3>
                
                {/* Magazine photos */}
                <div className="space-y-4">
                  <div 
                    className="relative h-64 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                    onClick={() => openImageModal('/images/about/Fabian PhiL_Artmosphere Cover.jpg', 'Artmosphere Magazine Cover featuring Fabian PhiL', 'Artmosphere Magazine Feature')}
                  >
                    <Image
                      src="/images/about/Fabian PhiL_Artmosphere Cover.jpg"
                      alt="Artmosphere Magazine Cover featuring Fabian PhiL"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                      <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-center">
                        <div className="text-lg font-semibold">Click to view full cover</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div 
                      className="relative h-24 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                      onClick={() => openImageModal('/images/about/Art Magazine picture.png', 'Art Magazine feature', 'Artmosphere Magazine Feature')}
                    >
                      <Image
                        src="/images/about/Art Magazine picture.png"
                        alt="Art Magazine feature"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-center text-xs">
                          Click to view
                        </div>
                      </div>
                    </div>
                    <div 
                      className="relative h-24 rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300 shadow-md hover:shadow-lg"
                      onClick={() => openImageModal('/images/about/Fabian Phil Artist overview.png', 'Fabian Phil Artist overview', 'Artmosphere Magazine Feature')}
                    >
                      <Image
                        src="/images/about/Fabian Phil Artist overview.png"
                        alt="Fabian Phil Artist overview"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                        <div className="text-white opacity-0 hover:opacity-100 transition-opacity duration-300 text-center text-xs">
                          Click to view
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Achievements Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Recognition & Achievements</h3>
          <p className="text-lg mb-6 opacity-90">
            These exhibitions and publications demonstrate the growing recognition of your innovative 
            kinetic art in the international art community.
          </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 rounded-lg p-6">
                <Award size={32} className="mx-auto mb-3" />
                <h4 className="text-lg font-semibold mb-2">DIFC Art Night 2025</h4>
                <p className="text-sm opacity-90">Prestigious Dubai financial district exhibition</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <Award size={32} className="mx-auto mb-3" />
                <h4 className="text-lg font-semibold mb-2">World Art Dubai 2024</h4>
                <p className="text-sm opacity-90">Middle East's largest art fair</p>
              </div>
              <div className="bg-white/10 rounded-lg p-6">
                <BookOpen size={32} className="mx-auto mb-3" />
                <h4 className="text-lg font-semibold mb-2">Magazine Feature</h4>
                <p className="text-sm opacity-90">Artmosphere - Leading contemporary art publication</p>
              </div>
            </div>
        </motion.div>
      </div>

      {/* Image Modal */}
      {modalImage && (
        <SimpleImageModal
          isOpen={!!modalImage}
          onClose={closeModals}
          imageSrc={modalImage.src}
          alt={modalImage.alt}
          title={modalImage.title}
        />
      )}

      {/* Video Modal */}
      {modalVideo && (
        <VideoModal
          isOpen={!!modalVideo}
          onClose={closeModals}
          videoSrc={modalVideo.src}
          title={modalVideo.title}
          poster={modalVideo.poster}
        />
      )}
    </div>
  )
}

export default ExhibitionsPage
