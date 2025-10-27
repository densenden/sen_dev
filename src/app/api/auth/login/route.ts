import { NextRequest, NextResponse } from 'next/server'
import { AUTH_CONFIG, verifyPassword, hashPassword } from '@/lib/auth/config'
import { createSession, setSessionCookie } from '@/lib/auth/session'

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json()
    
    if (!password) {
      return NextResponse.json(
        { error: 'Password is required' },
        { status: 400 }
      )
    }
    
    // For initial setup - if no password hash is set, use a default
    let passwordHash = AUTH_CONFIG.ADMIN_PASSWORD_HASH
    
    if (!passwordHash) {
      // In development only - set a default password
      if (process.env.NODE_ENV === 'development') {
        // Default password: admin123 (CHANGE THIS!)
        passwordHash = await hashPassword('admin123')
        console.log('⚠️  Using default password. Set ADMIN_PASSWORD_HASH in .env.local')
        console.log('Generated hash for "admin123":', passwordHash)
      } else {
        return NextResponse.json(
          { error: 'Admin password not configured' },
          { status: 500 }
        )
      }
    }
    
    // Verify password
    const isValid = await verifyPassword(password, passwordHash)
    
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401 }
      )
    }
    
    // Create session
    const token = await createSession(AUTH_CONFIG.ADMIN_EMAIL)
    
    // Set cookie
    const response = NextResponse.json({ success: true })
    response.cookies.set('admin-session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: AUTH_CONFIG.SESSION_MAX_AGE,
      path: '/'
    })
    
    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 500 }
    )
  }
}