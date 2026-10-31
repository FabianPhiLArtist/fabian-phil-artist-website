export type EnquiryDeliveryState = 'complete' | 'partial' | 'unrecorded'

export type EnquiryResult =
  | { ok: true; delivery: EnquiryDeliveryState }
  | { ok: false; message: string; field?: string; error?: string }

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
    if (response.ok && data?.ok === true) {
      const delivery: EnquiryDeliveryState =
        data.delivery === 'partial' || data.delivery === 'unrecorded' ? data.delivery : 'complete'
      return { ok: true, delivery }
    }
    return {
      ok: false,
      message: typeof data?.message === 'string' ? data.message : FALLBACK_ERROR,
      field: typeof data?.field === 'string' ? data.field : undefined,
      error: typeof data?.error === 'string' ? data.error : undefined,
    }
  } catch {
    return { ok: false, message: FALLBACK_ERROR }
  }
}
