import { mkdir, readFile, stat, writeFile } from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const root = process.cwd()
const artworksFile = path.join(root, 'src', 'data', 'artworks.ts')
const shareDir = path.join(root, 'public', 'images', 'share')
const MAX_BYTES = 280 * 1024
const MAX_EDGE = 1920

const sourceText = await readFile(artworksFile, 'utf8')
const sources = [...new Set([...sourceText.matchAll(/image:\s*"(\/images\/artworks\/[^"]+)"/g)].map((match) => match[1]))]

if (sources.length < 30) {
  throw new Error(`Expected catalogue images, found ${sources.length}`)
}

await mkdir(shareDir, { recursive: true })

/** @type {Record<string, { url: string, width: number, height: number, type: 'image/jpeg' }>} */
const manifest = {}

for (const source of sources) {
  const abs = path.join(root, 'public', source)
  const info = await stat(abs)
  const meta = await sharp(abs, { failOn: 'none' }).metadata()
  const width = meta.width ?? 0
  const height = meta.height ?? 0
  const baselineJpeg = meta.format === 'jpeg' && meta.isProgressive !== true
  const withinLimits = info.size <= MAX_BYTES && width > 0 && height > 0 && width <= MAX_EDGE && height <= MAX_EDGE && width >= 200 && height >= 200
  if (baselineJpeg && withinLimits) {
    manifest[source] = { url: source, width, height, type: 'image/jpeg' }
    console.log(`keep ${source} ${info.size} ${width}x${height}`)
    continue
  }

  const filename = path.basename(source).replace(/\.(png|jpe?g|webp)$/i, '.jpg')
  const sharePath = `/images/share/${filename}`
  const compressed = await toWhatsAppJpeg(abs)
  await writeFile(path.join(shareDir, filename), compressed.buf)
  manifest[source] = {
    url: sharePath,
    width: compressed.width,
    height: compressed.height,
    type: 'image/jpeg',
  }
  console.log(`share ${sharePath} ${compressed.buf.length} ${compressed.width}x${compressed.height}`)
}

await writeFile(path.join(shareDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`)
console.log(`share images ready: ${Object.keys(manifest).length}`)

/**
 * @param {string} input
 */
async function toWhatsAppJpeg(input) {
  const meta = await sharp(input, { failOn: 'none' }).rotate().metadata()
  const sourceEdge = Math.max(meta.width ?? 0, meta.height ?? 0)
  let target = Math.min(1200, sourceEdge || 1200)
  if (sourceEdge > 0 && sourceEdge < 200) target = 600
  let quality = 80
  let buf = Buffer.alloc(0)
  for (let attempt = 0; attempt < 8; attempt += 1) {
    buf = await sharp(input, { failOn: 'none' })
      .rotate()
      .resize({
        width: target,
        height: target,
        fit: 'inside',
        withoutEnlargement: sourceEdge >= 200,
      })
      .jpeg({ quality, mozjpeg: true, progressive: false, chromaSubsampling: '4:2:0' })
      .toBuffer()
    if (buf.length <= MAX_BYTES) break
    if (quality > 52) quality -= 8
    else target = Math.max(480, Math.round(target * 0.85))
  }
  if (buf.length > 300 * 1024) {
    throw new Error(`${path.basename(input)} is still ${buf.length} bytes`)
  }
  const out = await sharp(buf).metadata()
  if (!out.width || !out.height || out.width < 200 || out.height < 200) {
    throw new Error(`${path.basename(input)} preview is ${out.width}x${out.height}`)
  }
  return { buf, width: out.width, height: out.height }
}
