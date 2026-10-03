import React from 'react'
import { Play } from 'lucide-react'
import { getInstagramFeature } from '@/lib/instagram'
import InstagramFeatureImage from '@/components/home/InstagramFeatureImage'

export default async function InstagramFeature() {
  const feature = await getInstagramFeature()
  if (!feature) return null

  const kind = feature.isReel ? 'reel' : 'post'
  const alt = `Instagram ${kind} by Fabian PhiL${feature.excerpt ? `: ${feature.excerpt}` : ''}`
  const linkLabel = `Open this ${kind} on Instagram (opens in a new tab)`

  return (
    <section className="bg-white py-12 md:py-16 border-t border-gray-100" aria-labelledby="from-the-studio">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 lg:items-center">
          <div className="lg:order-2 max-w-xl">
            <h2 id="from-the-studio" className="text-xs tracking-[0.24em] uppercase text-gray-900 mb-4">
              From the studio
            </h2>
            <p className="text-lg md:text-xl font-light text-gray-800 leading-relaxed">
              A rotating glimpse of recent works, movement and exhibitions.
            </p>
            {feature.excerpt && (
              <p className="mt-4 text-sm text-gray-500 font-light leading-relaxed">“{feature.excerpt}”</p>
            )}
            <a
              href={feature.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={linkLabel}
              className="hidden lg:inline-block mt-6 text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
            >
              View on Instagram →
            </a>
          </div>

          <div className="lg:order-1">
            <a
              href={feature.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={linkLabel}
              className="group relative block w-full max-w-md aspect-[4/5] overflow-hidden bg-gray-50"
            >
              <InstagramFeatureImage src={feature.imageUrl} alt={alt} />
              {feature.isReel && (
                <span className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/90 px-2.5 py-1 text-[11px] tracking-[0.14em] uppercase text-gray-900">
                  <Play className="w-3 h-3" aria-hidden="true" />
                  Reel
                </span>
              )}
            </a>
            <a
              href={feature.permalink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={linkLabel}
              className="lg:hidden inline-block mt-5 text-xs tracking-[0.18em] uppercase text-gray-900 hover:text-gray-600 transition-colors"
            >
              View on Instagram →
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
