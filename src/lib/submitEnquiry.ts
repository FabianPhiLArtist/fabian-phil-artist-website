export type EnquiryResult = { ok: true } | { ok: false; message: string; field?: string }

const FALLBACK_ERROR = 'Your message could not be sent. Please try again or contact us on WhatsApp.'

export async function submitEnquiry(
  payload: Record<string, unknown>,
  startedAt: number
): Promise<EnquiryResult> {
  try {
    const response = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, elapsedMs: Date.now() - startedAt }),
    })
    const data = await response.json().catch(() => null)
    if (response.ok && data?.ok === true) return { ok: true }
    return {
      ok: false,
      message: typeof data?.message === 'string' ? data.message : FALLBACK_ERROR,
      field: typeof data?.field === 'string' ? data.field : undefined,
    }
  } catch {
    return { ok: false, message: FALLBACK_ERROR }
  }
}
