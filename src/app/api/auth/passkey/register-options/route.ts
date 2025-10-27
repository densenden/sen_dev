import { NextResponse } from 'next/server'
import { generateRegisterOptions } from '@/lib/auth/passkey'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // Generate unique user ID for admin
    const userID = 'admin-user-001'
    
    // Generate registration options
    const options = await generateRegisterOptions(userID)
    
    // Store challenge in cookie for verification
    cookies().set('passkey-challenge', options.challenge, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 5, // 5 minutes
      path: '/'
    })
    
    return NextResponse.json(options)
  } catch (error) {
    console.error('Error generating registration options:', error)
    return NextResponse.json(
      { error: 'Failed to generate registration options' },
      { status: 500 }
    )
  }
}