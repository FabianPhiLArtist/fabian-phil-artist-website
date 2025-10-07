import React from 'react'
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react'

interface ContactInfoProps {
  showTitle?: boolean
  className?: string
}

const ContactInfo = ({ showTitle = true, className = '' }: ContactInfoProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {showTitle && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
      )}
      
      <div className="space-y-3">
        {/* Email */}
        <div className="flex items-center space-x-3">
          <Mail size={20} className="text-blue-600" />
          <a
            href="mailto:fabianphilartist@gmail.com"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            fabianphilartist@gmail.com
          </a>
        </div>

        {/* WhatsApp */}
        <div className="flex items-center space-x-3">
          <Phone size={20} className="text-green-600" />
          <a
            href="https://wa.me/971567594229"
            className="text-gray-700 hover:text-green-600 transition-colors duration-200"
          >
            +971 567594229 (WhatsApp)
          </a>
        </div>

        {/* Gallery Address */}
        <div className="flex items-start space-x-3">
          <MapPin size={20} className="text-purple-600 mt-1" />
          <div className="text-gray-700">
            <p>70 Lowaina Street</p>
            <p>Umm Suqeim 1, Dubai, UAE</p>
          </div>
        </div>

        {/* Social Media */}
        <div className="flex items-center space-x-4 pt-2">
          <a
            href="https://instagram.com/fabianphilartist"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-600 transition-colors duration-200"
            title="Follow on Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="https://facebook.com/fabianphilartist"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200"
            title="Follow on Facebook"
          >
            <Facebook size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default ContactInfo





