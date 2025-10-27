import { 
  generateRegistrationOptions,
  verifyRegistrationResponse,
  generateAuthenticationOptions,
  verifyAuthenticationResponse,
  type GenerateRegistrationOptionsOpts,
  type GenerateAuthenticationOptionsOpts,
  type VerifyRegistrationResponseOpts,
  type VerifyAuthenticationResponseOpts,
  type VerifiedRegistrationResponse,
  type VerifiedAuthenticationResponse
} from '@simplewebauthn/server'
import { AUTH_CONFIG } from './config'
import { supabase } from '@/lib/supabase'

// Types for credential storage
export interface StoredCredential {
  id: string
  credentialID: string
  credentialPublicKey: string
  counter: number
  transports?: string[]
  created_at: string
}

// Get or create passkey credentials table
async function ensureCredentialsTable() {
  if (!supabase) return
  
  // This would normally be in a migration, but for simplicity:
  const { error } = await supabase.from('admin_credentials').select('id').limit(1)
  
  if (error?.code === 'PGRST116') {
    // Table doesn't exist, create it
    await supabase.rpc('create_admin_credentials_table', {
      sql: `
        CREATE TABLE IF NOT EXISTS admin_credentials (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          credentialID TEXT UNIQUE NOT NULL,
          credentialPublicKey TEXT NOT NULL,
          counter BIGINT NOT NULL,
          transports TEXT[],
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    }).catch(() => {
      console.log('Table might already exist or RPC not available')
    })
  }
}

// Store credential in database
export async function storeCredential(credential: Omit<StoredCredential, 'id' | 'created_at'>) {
  if (!supabase) {
    // Fallback to localStorage for development
    if (typeof window !== 'undefined') {
      const credentials = JSON.parse(localStorage.getItem('admin_credentials') || '[]')
      credentials.push(credential)
      localStorage.setItem('admin_credentials', JSON.stringify(credentials))
    }
    return
  }
  
  await ensureCredentialsTable()
  await supabase.from('admin_credentials').insert(credential)
}

// Get stored credentials
export async function getCredentials(): Promise<StoredCredential[]> {
  if (!supabase) {
    // Fallback to localStorage for development
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('admin_credentials') || '[]')
    }
    return []
  }
  
  await ensureCredentialsTable()
  const { data } = await supabase.from('admin_credentials').select('*')
  return data || []
}

// Get specific credential
export async function getCredential(credentialID: string): Promise<StoredCredential | null> {
  const credentials = await getCredentials()
  return credentials.find(c => c.credentialID === credentialID) || null
}

// Update credential counter
export async function updateCredentialCounter(credentialID: string, counter: number) {
  if (!supabase) {
    // Fallback to localStorage
    if (typeof window !== 'undefined') {
      const credentials = JSON.parse(localStorage.getItem('admin_credentials') || '[]')
      const index = credentials.findIndex((c: StoredCredential) => c.credentialID === credentialID)
      if (index !== -1) {
        credentials[index].counter = counter
        localStorage.setItem('admin_credentials', JSON.stringify(credentials))
      }
    }
    return
  }
  
  await supabase
    .from('admin_credentials')
    .update({ counter })
    .eq('credentialID', credentialID)
}

// Generate registration options
export async function generateRegisterOptions(userID: string) {
  const credentials = await getCredentials()
  
  const opts: GenerateRegistrationOptionsOpts = {
    rpName: AUTH_CONFIG.RP_NAME,
    rpID: AUTH_CONFIG.RP_ID,
    userID,
    userName: AUTH_CONFIG.ADMIN_EMAIL,
    userDisplayName: 'Admin',
    attestationType: 'none',
    excludeCredentials: credentials.map(c => ({
      id: Buffer.from(c.credentialID, 'base64url'),
      type: 'public-key',
      transports: c.transports as any
    })),
    authenticatorSelection: {
      residentKey: 'preferred',
      userVerification: 'preferred'
    },
    supportedAlgorithmIDs: [-7, -257]
  }
  
  return generateRegistrationOptions(opts)
}

// Verify registration response
export async function verifyRegisterResponse(
  response: any,
  expectedChallenge: string
) {
  const opts: VerifyRegistrationResponseOpts = {
    response,
    expectedChallenge,
    expectedOrigin: AUTH_CONFIG.ORIGIN,
    expectedRPID: AUTH_CONFIG.RP_ID,
    requireUserVerification: false
  }
  
  return verifyRegistrationResponse(opts)
}

// Generate authentication options
export async function generateAuthOptions() {
  const credentials = await getCredentials()
  
  const opts: GenerateAuthenticationOptionsOpts = {
    rpID: AUTH_CONFIG.RP_ID,
    allowCredentials: credentials.map(c => ({
      id: Buffer.from(c.credentialID, 'base64url'),
      type: 'public-key',
      transports: c.transports as any
    })),
    userVerification: 'preferred'
  }
  
  return generateAuthenticationOptions(opts)
}

// Verify authentication response
export async function verifyAuthResponse(
  response: any,
  expectedChallenge: string
) {
  const credential = await getCredential(response.rawId)
  if (!credential) {
    throw new Error('Credential not found')
  }
  
  const opts: VerifyAuthenticationResponseOpts = {
    response,
    expectedChallenge,
    expectedOrigin: AUTH_CONFIG.ORIGIN,
    expectedRPID: AUTH_CONFIG.RP_ID,
    authenticator: {
      credentialID: Buffer.from(credential.credentialID, 'base64url'),
      credentialPublicKey: Buffer.from(credential.credentialPublicKey, 'base64url'),
      counter: credential.counter
    },
    requireUserVerification: false
  }
  
  const result = await verifyAuthenticationResponse(opts)
  
  if (result.verified && result.authenticationInfo) {
    await updateCredentialCounter(
      credential.credentialID,
      result.authenticationInfo.newCounter
    )
  }
  
  return result
}