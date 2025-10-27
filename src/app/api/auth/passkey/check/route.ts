import { NextResponse } from 'next/server'
import { getCredentials } from '@/lib/auth/passkey'

export async function GET() {
  try {
    const credentials = await getCredentials()
    return NextResponse.json({
      hasCredentials: credentials.length > 0,
      count: credentials.length
    })
  } catch (error) {
    console.error('Error checking credentials:', error)
    return NextResponse.json(
      { hasCredentials: false, count: 0 },
      { status: 200 }
    )
  }
}