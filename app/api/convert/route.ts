import { NextRequest, NextResponse } from 'next/server'
import { createJob, getJobStatus, CONVERSION_MAP } from '@/lib/cloudconvert'

// Simple in-memory rate limiter (resets on cold start)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const MAX_REQUESTS = 10
const WINDOW_MS = 60 * 60 * 1000 // 1 hour

function getRateLimitKey(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS })
    return true
  }

  if (entry.count >= MAX_REQUESTS) return false
  entry.count++
  return true
}

export async function POST(req: NextRequest) {
  const ip = getRateLimitKey(req)
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: 'Service busy — please try again in a few minutes' },
      { status: 429 }
    )
  }

  try {
    const { tool, fileBase64, fileName, options = {} } = await req.json()

    if (!tool || !fileBase64 || !fileName) {
      return NextResponse.json({ error: 'Missing required fields: tool, fileBase64, fileName' }, { status: 400 })
    }

    if (!(tool in CONVERSION_MAP)) {
      return NextResponse.json({ error: `Unknown tool: ${tool}` }, { status: 400 })
    }

    const jobId = await createJob(tool, fileBase64, fileName, options)
    return NextResponse.json({ jobId })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  const jobId = req.nextUrl.searchParams.get('jobId')

  if (!jobId) {
    return NextResponse.json({ error: 'Missing jobId parameter' }, { status: 400 })
  }

  try {
    const result = await getJobStatus(jobId)
    return NextResponse.json(result)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to fetch job status'
    return NextResponse.json({ status: 'error', message }, { status: 500 })
  }
}
