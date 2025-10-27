import { NextRequest, NextResponse } from 'next/server'
import { verifyRegisterResponse, storeCredential } from '@/lib/auth/passkey'
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
    
    // Verify the registration response
    const verification = await verifyRegisterResponse(response, storedChallenge)
    
    if (!verification.verified || !verification.registrationInfo) {
      return NextResponse.json(
        { error: 'Registration verification failed' },
        { status: 400 }
      )
    }
    
    // Store the credential
    const { credentialPublicKey, credentialID, counter } = verification.registrationInfo
    
    await storeCredential({
      credentialID: Buffer.from(credentialID).toString('base64url'),
      credentialPublicKey: Buffer.from(credentialPublicKey).toString('base64url'),
      counter,
      transports: response.response.transports
    })
    
    // Clear the challenge cookie
    cookies().delete('passkey-challenge')
    
    return NextResponse.json({ verified: true })
  } catch (error) {
    console.error('Error verifying registration:', error)
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    )
  }
}