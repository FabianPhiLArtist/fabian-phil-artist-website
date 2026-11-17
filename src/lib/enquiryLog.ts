// Optional enquiry log: sends one flat row per enquiry to a Google Apps Script web app
// that appends it to a Google Sheet. Does nothing unless ENQUIRY_SHEET_WEBHOOK_URL is set,
// and never blocks or fails the enquiry itself.

const FIELDS = [
  'type',
  'purpose',
  'locale',
  'name',
  'firstName',
  'lastName',
  'email',
  'phone',
  'location',
  'subject',
  'artworkId',
  'artworkTitle',
  'message',
] as const

function clean(value: unknown, max = 1000): string {
  if (typeof value === 'number') return String(value)
  if (typeof value !== 'string') return ''
  // Stop spreadsheet formula injection: text starting with = + - @ is stored as text.
  const trimmed = value.trim().slice(0, max)
  return /^[=+\-@]/.test(trimmed) ? `'${trimmed}` : trimmed
}

export async function logEnquiry(
  request: Request,
  data: Record<string, unknown>,
  now: Date,
  extra: { artworkTitle?: string } = {}
): Promise<void> {
  const url = process.env.ENQUIRY_SHEET_WEBHOOK_URL
  if (!url) return
  try {
    const row: Record<string, string> = { submittedAt: now.toISOString() }
    for (const key of FIELDS) row[key] = clean(key === 'artworkTitle' ? extra.artworkTitle : data[key])
    row.page = clean(request.headers.get('referer'), 300)
    row.ipCountry = clean(request.headers.get('x-vercel-ip-country'), 8)
    const secret = process.env.ENQUIRY_SHEET_WEBHOOK_SECRET
    if (secret) row.secret = secret
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(row),
      signal: AbortSignal.timeout(5_000),
      cache: 'no-store',
      redirect: 'follow',
    })
  } catch {
    console.error('[enquiry] log request failed')
  }
}
