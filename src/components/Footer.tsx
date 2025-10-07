import React from 'react'
import Link from 'next/link'
import { Instagram, Mail, Phone, MapPin, Facebook } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">Fabian Phil</h3>
            <p className="text-gray-300 mb-4">
              Contemporary kinetic pop art that moves and inspires. 
              From ex-Shell executive to international artist.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com/fabianphilartist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-400 transition-colors duration-200"
                title="Follow on Instagram"
              >
                <Instagram size={24} />
              </a>
              <a
                href="https://facebook.com/fabianphilartist"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors duration-200"
                title="Follow on Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors duration-200">
                  About
                </Link>
              </li>
              <li>
                <Link href="/artist-statement" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Artist Statement
                </Link>
              </li>
              <li>
                <Link href="/cv" className="text-gray-300 hover:text-white transition-colors duration-200">
                  CV
                </Link>
              </li>
              <li>
                <Link href="/exhibitions" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Exhibitions
                </Link>
              </li>
              <li>
                <Link href="/collectors" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Collectors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Get In Touch</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={20} className="text-gray-300" />
                <a
                  href="mailto:fabianphilartist@gmail.com"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  fabianphilartist@gmail.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={20} className="text-gray-300" />
                <a
                  href="https://wa.me/971567594229"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  +971 567594229 (WhatsApp)
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={20} className="text-gray-300 mt-1" />
                <div className="text-gray-300">
                  <p>70 Lowaina Street</p>
                  <p>Umm Suqeim 1, Dubai, UAE</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Fabian Phil Artist. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
