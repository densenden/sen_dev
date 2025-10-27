import { NextResponse } from 'next/server'
import { generateAuthOptions } from '@/lib/auth/passkey'
import { cookies } from 'next/headers'

export async function POST() {
  try {
    // Generate authentication options
    const options = await generateAuthOptions()
    
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
    console.error('Error generating authentication options:', error)
    return NextResponse.json(
      { error: 'Failed to generate authentication options' },
      { status: 500 }
    )
  }
}