'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Calendar, MapPin, Award, BookOpen, Briefcase, GraduationCap } from 'lucide-react'

const CVPage = () => {
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
            <div className="flex flex-col items-center gap-8">
              {/* Artist Photo */}
              <div className="relative w-32 h-32 lg:w-40 lg:h-40 rounded-full overflow-hidden shadow-2xl border-4 border-white/20">
                <Image
                  src="/images/personal/Photo Fabian PhiL artist.jpg"
                  alt="Fabian Phil Artist"
                  fill
                  className="object-cover"
                  style={{ objectPosition: '15% 40%', transform: 'scale(1.2)' }}
                />
              </div>
              
              {/* Title */}
              <div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Curriculum Vitae
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                  Fabian PhiL - Artist Biography
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Professional Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Professional Summary</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              Fabian PhiL is a self-taught kinetic pop artist whose unique technique was discovered through a serendipitous 
              experiment with seismic wave concepts in Africa. Born into a family of art collectors, he transitioned from 
              a successful career as a geophysicist initially and Business executive to become a recognized contemporary artist. His 
              work has been exhibited internationally and featured in leading art publications.
            </p>
          </div>
        </motion.div>

        {/* Education & Background */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Education & Professional Background</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <div className="flex items-center space-x-3 mb-2">
                  <GraduationCap className="text-blue-600" size={20} />
                  <h3 className="text-xl font-semibold text-gray-900">Geophysics & Engineering</h3>
                </div>
                <p className="text-gray-600">Advanced studies in geophysics and engineering, with focus on seismic wave analysis and data interpretation</p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-6">
                <div className="flex items-center space-x-3 mb-2">
                  <Briefcase className="text-green-600" size={20} />
                  <h3 className="text-xl font-semibold text-gray-900">Business Education</h3>
                </div>
                <p className="text-gray-600">Business studies (London Business School MBA) complementing technical background, providing foundation for corporate leadership roles</p>
              </div>
              
              <div className="border-l-4 border-purple-500 pl-6">
                <div className="flex items-center space-x-3 mb-2">
                  <BookOpen className="text-purple-600" size={20} />
                  <h3 className="text-xl font-semibold text-gray-900">Self-Taught Artist</h3>
                </div>
                <p className="text-gray-600">25 years of self-directed artistic development, studying modern artists and developing unique kinetic pop art technique</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Career Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Career Timeline</h2>
            
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-blue-600 rounded-full mt-2"></div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="text-blue-600" size={16} />
                    <span className="font-semibold text-gray-900">2002-2006 - Brunei, Borneo</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Business Executive & First Painting</h3>
                  <p className="text-gray-600">Working as Corporate executive in the jungle, painted first artwork in 2003 - a single painting that took one year to complete</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-purple-600 rounded-full mt-2"></div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="text-purple-600" size={16} />
                    <span className="font-semibold text-gray-900">2006-2010 - Africa</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Discovery of Kinetic Art Technique</h3>
                  <p className="text-gray-600">As geophysicist working with seismic waves, discovered kinetic pop art technique by painting Blue Lady on two plexiglass sheets in 2010</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-green-600 rounded-full mt-2"></div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="text-green-600" size={16} />
                    <span className="font-semibold text-gray-900">2010-2025 - Dubai, UAE</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Full-Time Artist</h3>
                  <p className="text-gray-600">Moved to Dubai and focused on developing kinetic pop art style, creating large format works capturing emotions and air movement. After Iraq (2015-2019), explored pop glasses in fluorescent paint, triptychs with 100 USD bills, and mixed digital design with traditional techniques</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-red-600 rounded-full mt-2"></div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="text-red-600" size={16} />
                    <span className="font-semibold text-gray-900">2015-2019 - Iraq</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Challenging Period & Artistic Evolution</h3>
                  <p className="text-gray-600">Four years of demanding work in Iraq led to exploration of pop glasses in fluorescent paint and triptych currency art</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-4 h-4 bg-yellow-600 rounded-full mt-2"></div>
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="text-yellow-600" size={16} />
                    <span className="font-semibold text-gray-900">2024-2025 - Digital Design</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Mixed Media Innovation & Zen Pandas</h3>
                  <p className="text-gray-600">Started mixing digital design with traditional techniques, introducing cartoons, boxing themes, and fashion shows on catwalks. In 2025, seeking more peace after leaving corporate life, created pandas with zen Chinese landscapes - temples, lakes, cherry blossom trees</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Exhibitions & Recognition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Exhibitions & Recognition</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Exhibitions</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Award className="text-yellow-600 mt-1" size={16} />
                    <div>
                      <p className="font-semibold text-gray-900">DIFC Art Night 2025</p>
                      <p className="text-sm text-gray-600">Dubai International Financial Centre, UAE</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Award className="text-yellow-600 mt-1" size={16} />
                    <div>
                      <p className="font-semibold text-gray-900">World Art Dubai 2024</p>
                      <p className="text-sm text-gray-600">Middle East's largest art fair</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Media & Publications</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <BookOpen className="text-blue-600 mt-1" size={16} />
                    <div>
                      <p className="font-semibold text-gray-900">Artmosphere Magazine</p>
                      <p className="text-sm text-gray-600">Featured article on kinetic art innovation</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <MapPin className="text-green-600 mt-1" size={16} />
                    <div>
                      <p className="font-semibold text-gray-900">International Recognition</p>
                      <p className="text-sm text-gray-600">Growing collector base worldwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Artistic Influences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Artistic Influences & Inspirations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Visual Artists</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Klasen - Initial influence and experimentation</li>
                <li>• Delorme - Artistic vision and technique</li>
                <li>• Andy Warhol - Pop art sensibilities</li>
                <li>• Contemporary kinetic artists</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Literary & Cultural</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Ken Follett - Historical novels</li>
                <li>• Dos Santos - Literary influences</li>
                <li>• Lapierre & Collins - Historical storytelling</li>
                <li>• Philosophy and history studies</li>
                <li>• Law and acting interests</li>
                <li>• Complex contract negotiation experience</li>
                <li>• Woodworking at Alpine chalet (Chamonix/Megève)</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Unique Technique</h4>
            <p className="text-gray-600 mb-4">
              Developed through serendipitous experimentation with seismic wave concepts, painting characters twice on two plexiglass sheets 
              to create transparency, light reflection, and kinetic movement. The technique creates optical illusions where eyes follow the viewer, 
              similar to the Mona Lisa effect.
            </p>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">Philosophy of Self-Improvement</h4>
            <p className="text-gray-600">
              "I have always sought as a goal to become better than what I am." This philosophy drives constant learning and growth - from 
              corporate contract negotiation to woodworking in the Alps, from geophysics to kinetic art. Each new series represents 
              exploration of new possibilities and continuous self-improvement.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default CVPage
