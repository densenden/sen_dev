// Simple authentication configuration for single admin user
export const AUTH_CONFIG = {
  // Admin credentials - CHANGE THESE!
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@sen.studio',
  ADMIN_PASSWORD_HASH: process.env.ADMIN_PASSWORD_HASH || '', // Set this in .env.local
  
  // Session configuration
  SESSION_SECRET: process.env.SESSION_SECRET || 'change-this-secret-in-production',
  SESSION_MAX_AGE: 60 * 60 * 24 * 7, // 7 days
  
  // WebAuthn configuration
  RP_NAME: 'Sen Studio Admin',
  RP_ID: process.env.NEXT_PUBLIC_APP_URL ? new URL(process.env.NEXT_PUBLIC_APP_URL).hostname : 'localhost',
  ORIGIN: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  
  // Authentication methods
  ENABLE_PASSKEY: true,
  ENABLE_PASSWORD: true,
  ENABLE_MAGIC_LINK: false, // Can enable if email is configured
}

// Helper to check if we're in development
export const isDevelopment = process.env.NODE_ENV === 'development'

// Simple password hashing (for basic setup)
export async function hashPassword(password: string): Promise<string> {
  // Use Node.js crypto for server-side hashing
  if (typeof window === 'undefined') {
    const crypto = require('crypto')
    const hash = crypto.createHash('sha256')
    hash.update(password + AUTH_CONFIG.SESSION_SECRET)
    return hash.digest('hex')
  }
  
  // Fallback for client-side (shouldn't be used in production)
  const encoder = new TextEncoder()
  const data = encoder.encode(password + AUTH_CONFIG.SESSION_SECRET)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}