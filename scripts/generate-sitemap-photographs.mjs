import { closeSync, existsSync, openSync, readSync, statSync, writeFileSync } from 'fs'
import { readFile } from 'fs/promises'
import path from 'path'

// The sitemap module is imported by the IndexNow function. Reading public/ from that
// module makes Vercel trace the artwork binaries into the function, so the eligible
// paths are written here as text and the function never opens an image file.
const root = process.cwd()
const artworksFile = path.join(root, 'src', 'data', 'artworks.ts')
const outputFile = path.join(root, 'src', 'data', 'sitemap-photographs.json')
const publicPhoto = /\.(jpe?g|png|webp|gif|avif)$/i

function isPublicPagePhotograph(src) {
  if (!src.startsWith('/images/') || src.startsWith('/images/share/')) return false
  if (src.includes('\\') || src.split('/').includes('..') || !publicPhoto.test(src)) return false
  const publicRoot = path.resolve(root, 'public')
  const resolved = path.resolve(publicRoot, src.replace(/^\/+/, ''))
  const relative = path.relative(publicRoot, resolved)
  if (!relative || relative.startsWith('..') || path.isAbsolute(relative) || !existsSync(resolved)) return false
  const handle = openSync(resolved, 'r')
  try {
    const head = Buffer.alloc(24)
    const read = readSync(handle, head, 0, head.length, 0)
    if (head.subarray(0, read).toString('utf8').startsWith('version https://git-lfs')) return false
  } finally {
    closeSync(handle)
  }
  return statSync(resolved).size > 32
}

const source = await readFile(artworksFile, 'utf8')
const candidates = [...source.matchAll(/"(\/images\/[^"]+)"/g)].map((match) => match[1])
const eligible = [...new Set(candidates.filter(isPublicPagePhotograph))].sort()

const panda = [
  '/images/artworks/panda-wanted-hong-kong-pop-art-city-fabian-phil.jpg',
  '/images/artworks/panda-wanted-hong-kong-pop-art-city-fabian-phil-angle.jpg',
  '/images/artworks/panda-wanted-hong-kong-pop-art-city-fabian-phil-gallery.png',
]
const missingPanda = panda.filter((src) => !eligible.includes(src))
if (missingPanda.length > 0) {
  throw new Error(`Missing Panda photographs: ${missingPanda.join(', ')}`)
}
if (eligible.some((src) => src.startsWith('/images/share/') || !publicPhoto.test(src))) {
  throw new Error('Share JPEG or non-photograph entered the sitemap photograph list')
}
if (eligible.length !== 60) {
  throw new Error(`Expected 60 eligible artwork photographs, found ${eligible.length}:\n${eligible.join('\n')}`)
}

writeFileSync(outputFile, `${JSON.stringify(eligible, null, 2)}\n`)
console.log(`sitemap photographs ready: ${eligible.length}`)
