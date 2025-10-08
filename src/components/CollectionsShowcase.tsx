'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Users, DollarSign, Heart, Eye, Palette, Sparkles, Monitor, Smile } from 'lucide-react'

const CollectionsShowcase = () => {
  const collections = [
    {
      name: "Mugshot Collection",
      count: 4,
      description: "A powerful series exploring themes of justice, rebellion, and social commentary through the lens of wanted posters. Features LED lighting and innovative acrylic techniques.",
      icon: Users,
      color: "from-gray-800 to-gray-900",
      featured: "Wanted for Racing Life",
      image: "/images/artworks/Fabian PhiL_Wanted for Racing Life_2024_18000ead_LightBlue_LED.jpg"
    },
    {
      name: "Pop glasses Collection",
      count: 10,
      description: "Revolutionary portraits featuring fluorescent glasses that glow in the dark. Each piece illuminates emotions and creates a luminous connection that transcends the physical artwork.",
      icon: Sparkles,
      color: "from-gray-800 to-gray-900",
      featured: "Wanted for Loving Art",
      image: "/images/artworks/Fabian PhiL_Wanted for Loving Art_2023_18000aed.jpg"
    },
    {
      name: "100 USD Bill Collection",
      count: 2,
      description: "Revolutionary tryptics that literally represent 100 USD bills with iconic figures as the central portrait. Each piece mimics currency structure while replacing traditional portraits with cultural icons, creating powerful statements about value and fame.",
      icon: DollarSign,
      color: "from-gray-800 to-gray-900",
      featured: "100 USD Mick Jagger",
      image: "/images/artworks/Fabian PhiL_100USD Mick Jagger_2022_54000aed.jpg"
    },
    {
      name: "Expressive Emotion Collection",
      count: 6,
      description: "Revolutionary large-format portraits with eyes that follow you as you move. Each piece creates an emotional connection that transcends the artwork through optical illusion.",
      icon: Eye,
      color: "from-gray-800 to-gray-900",
      featured: "Why…?",
      image: "/images/artworks/Fabian PhiL_Why_2021_72000aed.jpg"
    },
    {
      name: "Panda Pop Collection",
      count: 1,
      description: "Charming mixed media pieces featuring pandas in wanted poster format. Digital design printed on acrylic sheets enhanced with traditional painting techniques, creating playful yet thought-provoking art.",
      icon: Smile,
      color: "from-gray-800 to-gray-900",
      featured: "Wanted Panda PopArt Dealer",
      image: "/images/artworks/Fabian Phil Wanted Panda Popart Dealer 2025 5.jpg"
    },
    {
      name: "Digital Design Collection",
      count: 2,
      description: "Revolutionary mixed media combining digital design with traditional techniques. Digital designs are printed on acrylic sheets, then enhanced with painting and collage elements.",
      icon: Monitor,
      color: "from-gray-800 to-gray-900",
      featured: "Wanted for Toon KnockOut",
      image: "/images/artworks/Fabian PhiL_Wanted for Toon KO_2024.jpg"
    },
    {
      name: "Moving Hair Collection",
      count: 2,
      description: "Revolutionary kinetic art featuring portraits with moving hair elements. Unique acrylic sheet technique creates living, breathing artworks.",
      icon: Eye,
      color: "from-gray-800 to-gray-900",
      featured: "Old Man in Peace",
      image: "/images/artworks/Fabian PhiL_Old Man in Peace_2020_72400aed Copyright.jpg"
    },
    {
      name: "Pop Art Series",
      count: 4,
      description: "Vibrant works celebrating modern life, communication, and the joy of self-expression.",
      icon: Palette,
      color: "from-gray-800 to-gray-900",
      featured: "Blue Lady",
      image: "/images/artworks/Fabian Phil_Blue Lady 2013_37000aed.jpg"
    },
    {
      name: "Abstract Series",
      count: 3,
      description: "Thought-provoking abstract works exploring deeper philosophical and artistic concepts.",
      icon: Palette,
      color: "from-gray-800 to-gray-900",
      featured: "Maybe I Will See Him",
      image: "/images/artworks/Fabian PhiL_Maybe I Will See Him_2018_58000aed 2.jpg"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Art Collections
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore the diverse range of artistic expressions across different themes and emotions. 
            Each collection tells a unique story and captures different aspects of the human experience.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 group-hover:scale-105 border border-gray-100">
                {/* Collection Header */}
                <div className={`h-32 bg-gradient-to-r ${collection.color} p-6 flex items-center justify-between`}>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <collection.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{collection.name}</h3>
                      <p className="text-white/80 text-sm">{collection.count} artworks</p>
                    </div>
                  </div>
                </div>

                {/* Collection Image */}
                <div className="h-48 relative overflow-hidden">
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 grayscale hover:grayscale-0"
                  />
                </div>

                {/* Collection Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {collection.description}
                  </p>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 mb-1">Featured Work:</p>
                    <p className="font-medium text-gray-900">{collection.featured}</p>
                  </div>

                  <Link
                    href="/gallery"
                    className="group inline-flex items-center text-gray-900 hover:text-blue-600 transition-colors duration-200 font-medium"
                  >
                    <span>View Collection</span>
                    <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/gallery"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-lg hover:bg-gray-800 transition-colors duration-300"
          >
            Explore All Collections
            <ArrowRight className="ml-2" size={20} />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default CollectionsShowcase
