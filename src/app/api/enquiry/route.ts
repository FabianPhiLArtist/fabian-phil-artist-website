import { NextResponse } from 'next/server'
import { handleEnquiry } from '@/lib/handleEnquiry'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  return handleEnquiry(request)
}
