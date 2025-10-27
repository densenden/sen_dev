import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { AUTH_CONFIG } from './config'

const secret = new TextEncoder().encode(AUTH_CONFIG.SESSION_SECRET)

export interface SessionData {
  userId: string
  email: string
  createdAt: number
}

export async function createSession(email: string): Promise<string> {
  const token = await new SignJWT({
    userId: 'admin',
    email,
    createdAt: Date.now()
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret)
  
  return token
}

export async function verifySession(token: string): Promise<SessionData | null> {
  try {
    const { payload } = await jwtVerify(token, secret)
    return payload as unknown as SessionData
  } catch {
    return null
  }
}

export async function setSessionCookie(token: string) {
  cookies().set('admin-session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: AUTH_CONFIG.SESSION_MAX_AGE,
    path: '/'
  })
}

export async function getSession(): Promise<SessionData | null> {
  const token = cookies().get('admin-session')?.value
  if (!token) return null
  return verifySession(token)
}

export async function clearSession() {
  cookies().delete('admin-session')
}