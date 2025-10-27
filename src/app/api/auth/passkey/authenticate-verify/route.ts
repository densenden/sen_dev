import { NextRequest, NextResponse } from 'next/server'
import { verifyAuthResponse } from '@/lib/auth/passkey'
import { createSession } from '@/lib/auth/session'
import { AUTH_CONFIG } from '@/lib/auth/config'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { response, challenge } = body
    
    // Get stored challenge from cookie
    const storedChallenge = cookies().get('passkey-challenge')?.value
    
    if (!storedChallenge || storedChallenge !== challenge) {
      return NextResponse.json(
        { error: 'Invalid or expired challenge' },
        { status: 400 }
      )
    }
    
    // Verify the authentication response
    const verification = await verifyAuthResponse(response, storedChallenge)
    
    if (!verification.verified) {
      return NextResponse.json(
        { error: 'Authentication verification failed' },
        { status: 400 }
      )
    }
    
    // Create session
    const token = await createSession(AUTH_CONFIG.ADMIN_EMAIL)
    
    // Set session cookie
    const res = NextResponse.json({ verified: true })
    res.cookies.set('admin-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: AUTH_CONFIG.SESSION_MAX_AGE,
      path: '/'
    })
    
    // Clear the challenge cookie
    res.cookies.delete('passkey-challenge')
    
    return res
  } catch (error) {
    console.error('Error verifying authentication:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}