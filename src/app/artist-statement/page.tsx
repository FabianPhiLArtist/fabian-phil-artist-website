'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { BookOpen, Lightbulb, Palette, Heart, Brain, Eye } from 'lucide-react'

const ArtistStatementPage = () => {
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
                  Artist Statement
                </h1>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
                  From Seismic Waves to Kinetic Art - A Journey of Discovery
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Artist Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                My artistic journey began not in an art school, but in the jungles of Brunei (2002-2006) as a geophysicist working with seismic waves. 
                Born into a family of art collectors, I was always drawn to what I was not yet - artists, philosophers, historians, 
                people who lived in the realm of ideas and emotions rather than data and equations.
              </p>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                As an engineer studying business, I felt a magnetic pull toward creative expression. My first painting in Brunei in 2003 
                took me an entire year to complete - a single artwork that taught me the patience and dedication that art demands. 
                This was my introduction to the discipline of creation, far removed from the instant gratification of corporate life.
              </p>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                The breakthrough came by chance in Africa (2006-2010). Working with seismic waves, I sought to translate their movement and 
                transparency into visual art. I painted the Blue Lady twice on two plexiglass sheets in 2010, and something magical happened. 
                The vertical strokes created movement when you moved around the painting - the eyes followed you, like the Mona Lisa. 
                This was my discovery of kinetic pop art, born from the intersection of science and serendipity.
              </p>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                After four challenging years in Iraq (2015-2019), where my work was physically and emotionally demanding, I aspired for more joy in my life. 
                I began painting pop glasses in fluorescent paint, exploring triptychs with 100 USD bills, and started mixing digital design 
                with traditional techniques, introducing cartoons, boxing themes, and fashion shows on catwalks. In 2025, seeking more peace 
                after leaving corporate life, I created pandas with zen Chinese landscapes - temples, lakes, cherry blossom trees - for a 
                peaceful, healing outcome.
              </p>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                I am driven by emotions of the character. I try to capture the movement of eyes, sometimes the flow of air. 
                I love transparency, light, and movement because they bring energy and hope into our world. Each collection serves a purpose: 
                the pop glasses and currency art because we need more light in our lives, the pandas with beautiful landscapes because 
                we need more color and joy after what we see on TV.
              </p>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                My art is not just visual - it's emotional, it's healing, it's a response to the world around us. It's a quiet, 
                peaceful environment after the chaos of my previous life, a refuge for both creator and viewer.
              </p>
              
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                I have always sought as a goal to become better than what I am. Attracted to people who speak well and tell stories - 
                historians, novelists, philosophers (my uncle), even counselors (my aunt) - I am also aspired by many historical novelists like Ken Follett, 
                Dos Santos, Lapierre & Collins and many others. I've negotiated complex contracts with multiple stakeholders in my corporate career, 
                always seeking to understand different perspectives. Never a handyman in my youth, I've started working with wood at my chalet 
                in the Alps (Chamonix/Megève), learning new skills and continuing to grow. I would love to know how to build a house.
              </p>
              
              <p className="text-xl text-gray-700 leading-relaxed">
                My artwork is a reflection of this constant self-improvement. I try to always improve and started painting on my own. 
                Each new series - from kinetic portraits to pop glasses, from currency art to zen pandas - represents growth and 
                exploration of new possibilities, always becoming better than what I am.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Key Themes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Key Themes in My Work</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Science Meets Art</h3>
              <p className="text-gray-600 text-sm">
                Translating seismic wave concepts into kinetic visual art, bridging the gap between scientific precision and creative expression.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Emotional Connection</h3>
              <p className="text-gray-600 text-sm">
                Capturing eye movement and air flow to create artworks that follow you, establishing a personal, emotional bond with viewers.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Light & Healing</h3>
              <p className="text-gray-600 text-sm">
                Using transparency and light to bring joy, hope, and healing to spaces, responding to the need for more light in our lives.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Self-Discovery</h3>
              <p className="text-gray-600 text-sm">
                A journey from corporate life to artistic expression, discovering my unique voice through chance and experimentation.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Peace After Chaos</h3>
              <p className="text-gray-600 text-sm">
                Creating quiet, peaceful environments through art as a refuge from the physical and emotional challenges of demanding work.
              </p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-6 text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-indigo-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Intellectual Curiosity</h3>
              <p className="text-gray-600 text-sm">
                Drawing inspiration from diverse influences - from modern artists to historical novels, always learning and evolving.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Influences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 lg:p-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Artistic Influences & Inspirations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Modern Artists</h3>
              <p className="text-gray-600 mb-4">
                Drawn to what I was not yet, I studied and was influenced by artists like Klasen, Delorme, Warhol, and others. 
                I tried to mix Klasen with my own style but eventually discovered my unique voice through chance and experimentation.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• <strong>Klasen</strong> - Initial influence and experimentation</li>
                <li>• <strong>Delorme</strong> - Artistic vision and technique</li>
                <li>• <strong>Warhol</strong> - Pop art sensibilities</li>
                <li>• <strong>Others</strong> - Diverse modern influences</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Literary & Cultural</h3>
              <p className="text-gray-600 mb-4">
                My intellectual curiosity extends beyond visual art to literature and history. I read many historical novels 
                by authors like Ken Follett and Dos Santos, feeding my fascination with storytelling and human experience.
              </p>
              <ul className="text-gray-600 space-y-2">
                <li>• <strong>Historical Novels</strong> - Ken Follett, Dos Santos</li>
                <li>• <strong>Philosophy</strong> - Intellectual exploration</li>
                <li>• <strong>History</strong> - Understanding human experience</li>
                <li>• <strong>Law & Acting</strong> - Diverse intellectual interests</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ArtistStatementPage
