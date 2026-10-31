import fs from 'fs'
import path from 'path'
import { absoluteUrl } from '@/lib/site'

export type ShareImageEntry = {
  url: string
  width: number
  height: number
  type: 'image/jpeg' | 'image/png'
}

export type ShareManifest = Record<string, ShareImageEntry>

export function openGraphImageFromManifest(
  source: string,
  manifest: ShareManifest
): { url: string; width?: number; height?: number; type?: string } {
  const entry = manifest[source]
  return {
    url: absoluteUrl(entry?.url ?? source),
    ...(entry?.width && entry?.height ? { width: entry.width, height: entry.height } : {}),
    ...(entry?.type ? { type: entry.type } : {}),
  }
}

let cached: ShareManifest | undefined

export function loadShareManifest(): ShareManifest {
  if (cached) return cached
  const manifestPath = path.join(process.cwd(), 'public', 'images', 'share', 'manifest.json')
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8')) as ShareManifest
  cached = manifest
  return manifest
}

// Catalogue files are the page images. WhatsApp will not use one much above 300KB and then shows the site icon.
// scripts/generate-share-images.mjs writes a manifest that keeps a small file as-is and points a large one at /images/share.
export function artworkOpenGraphImage(source: string): { url: string; width?: number; height?: number; type?: string } {
  const manifest = loadShareManifest()
  if (!manifest[source]) {
    throw new Error(`Missing share-image manifest entry for ${source}`)
  }
  return openGraphImageFromManifest(source, manifest)
}
