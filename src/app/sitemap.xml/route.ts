import { sitemapEntries, type SitemapEntry } from '@/lib/sitemap'

export const dynamic = 'force-static'

const escapeXml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')

function urlElement({ url, image, alternates }: SitemapEntry) {
  const imageElement = image
    ? `
<image:image>
<image:loc>${escapeXml(image.loc)}</image:loc>
<image:title>${escapeXml(image.title)}</image:title>
<image:caption>${escapeXml(image.caption)}</image:caption>
</image:image>`
    : ''
  const alternateElements = (alternates ?? [])
    .map(
      ({ hreflang, href }) => `
<xhtml:link rel="alternate" hreflang="${escapeXml(hreflang)}" href="${escapeXml(href)}"/>`
    )
    .join('')
  return `<url>
<loc>${escapeXml(url)}</loc>${alternateElements}${imageElement}
</url>`
}

export function GET() {
  const entries = sitemapEntries()
  // The xhtml namespace is only declared once a French page is live, so the English-only sitemap is unchanged.
  const xhtmlNamespace = entries.some((entry) => entry.alternates?.length)
    ? ' xmlns:xhtml="http://www.w3.org/1999/xhtml"'
    : ''
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"${xhtmlNamespace}>
${entries.map(urlElement).join('\n')}
</urlset>
`
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } })
}
