export type CollectorSubmitPlan = 'ignore' | 'invalid' | 'reopen' | 'send'

export function collectorFingerprint(values: Record<string, string>): string {
  return JSON.stringify(values)
}

// inFlight and a filled honeypot never reach the server.
// The same contents after a success reopen WhatsApp and do not email again.
export function collectorSubmitPlan(input: {
  inFlight: boolean
  honeypot: string
  valid: boolean
  succeededFingerprint: string | null
  fingerprint: string
}): CollectorSubmitPlan {
  if (input.inFlight || input.honeypot.trim()) return 'ignore'
  if (!input.valid) return 'invalid'
  if (input.succeededFingerprint === input.fingerprint) return 'reopen'
  return 'send'
}

export type CollectorSubmitResult = {
  status: 'idle' | 'error' | 'sent'
  error?: string
  field?: string
}

// Opens WhatsApp only after the website accepts the enquiry, or when reopening an enquiry already accepted.
// Does not clear the form.
export async function executeCollectorSubmit(args: {
  plan: CollectorSubmitPlan
  post: () => Promise<{ ok: boolean; error?: string; field?: string }>
  openWhatsApp: () => void
}): Promise<CollectorSubmitResult> {
  if (args.plan === 'ignore') return { status: 'idle' }
  if (args.plan === 'invalid') return { status: 'error' }
  if (args.plan === 'reopen') {
    args.openWhatsApp()
    return { status: 'sent' }
  }
  const result = await args.post()
  if (!result.ok) return { status: 'error', error: result.error, field: result.field }
  args.openWhatsApp()
  return { status: 'sent' }
}
