'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Fingerprint, Key, Loader2, Smartphone, ShieldCheck, Mail } from 'lucide-react'
import { startAuthentication, startRegistration } from '@simplewebauthn/browser'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') || '/admin'
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [passkeySupported, setPasskeySupported] = useState(false)
  const [hasCredentials, setHasCredentials] = useState(false)
  
  useEffect(() => {
    // Check if WebAuthn is supported
    const checkPasskeySupport = async () => {
      if (window.PublicKeyCredential && 
          PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        setPasskeySupported(available)
        
        // Check if user has existing credentials
        if (available) {
          checkExistingCredentials()
        }
      }
    }
    checkPasskeySupport()
  }, [])
  
  async function checkExistingCredentials() {
    try {
      const response = await fetch('/api/auth/passkey/check')
      const data = await response.json()
      setHasCredentials(data.hasCredentials)
    } catch (error) {
      console.error('Error checking credentials:', error)
    }
  }
  
  async function handlePasskeyLogin() {
    setLoading(true)
    setError('')
    
    try {
      // Get authentication options from server
      const optionsResponse = await fetch('/api/auth/passkey/authenticate-options', {
        method: 'POST'
      })
      
      if (!optionsResponse.ok) {
        throw new Error('Failed to get authentication options')
      }
      
      const options = await optionsResponse.json()
      
      // Start authentication with browser
      const authResponse = await startAuthentication(options)
      
      // Verify with server
      const verifyResponse = await fetch('/api/auth/passkey/authenticate-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: authResponse,
          challenge: options.challenge
        })
      })
      
      if (!verifyResponse.ok) {
        throw new Error('Authentication failed')
      }
      
      // Success - redirect
      router.push(from)
    } catch (error: any) {
      console.error('Passkey login error:', error)
      setError(error.message || 'Failed to authenticate with passkey')
    } finally {
      setLoading(false)
    }
  }
  
  async function handlePasskeyRegister() {
    setLoading(true)
    setError('')
    
    try {
      // Get registration options from server
      const optionsResponse = await fetch('/api/auth/passkey/register-options', {
        method: 'POST'
      })
      
      if (!optionsResponse.ok) {
        throw new Error('Failed to get registration options')
      }
      
      const options = await optionsResponse.json()
      
      // Start registration with browser
      const regResponse = await startRegistration(options)
      
      // Verify with server
      const verifyResponse = await fetch('/api/auth/passkey/register-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          response: regResponse,
          challenge: options.challenge
        })
      })
      
      if (!verifyResponse.ok) {
        throw new Error('Registration failed')
      }
      
      setHasCredentials(true)
      setError('') // Clear any errors
      alert('Passkey registered successfully! You can now sign in with your passkey.')
    } catch (error: any) {
      console.error('Passkey registration error:', error)
      setError(error.message || 'Failed to register passkey')
    } finally {
      setLoading(false)
    }
  }
  
  async function handlePasswordLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      
      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Invalid password')
      }
      
      router.push(from)
    } catch (error: any) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl">Admin Access</CardTitle>
          <CardDescription>
            Secure authentication required to access admin panel
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <Tabs defaultValue={passkeySupported ? "passkey" : "password"} className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="passkey" disabled={!passkeySupported}>
                <Fingerprint className="h-4 w-4 mr-2" />
                Passkey
              </TabsTrigger>
              <TabsTrigger value="password">
                <Key className="h-4 w-4 mr-2" />
                Password
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="passkey" className="space-y-4">
              {passkeySupported ? (
                <>
                  <div className="text-center space-y-2 py-4">
                    <div className="text-sm text-muted-foreground">
                      Use your device's biometric authentication
                    </div>
                    <div className="flex justify-center gap-4 py-2">
                      <div className="text-center">
                        <Fingerprint className="h-8 w-8 mx-auto text-muted-foreground mb-1" />
                        <div className="text-xs">Touch ID</div>
                      </div>
                      <div className="text-center">
                        <Smartphone className="h-8 w-8 mx-auto text-muted-foreground mb-1" />
                        <div className="text-xs">Face ID</div>
                      </div>
                      <div className="text-center">
                        <ShieldCheck className="h-8 w-8 mx-auto text-muted-foreground mb-1" />
                        <div className="text-xs">Security Key</div>
                      </div>
                    </div>
                  </div>
                  
                  {hasCredentials ? (
                    <Button 
                      onClick={handlePasskeyLogin} 
                      className="w-full" 
                      disabled={loading}
                    >
                      {loading ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Fingerprint className="h-4 w-4 mr-2" />
                      )}
                      Sign in with Passkey
                    </Button>
                  ) : (
                    <>
                      <Button 
                        onClick={handlePasskeyRegister} 
                        className="w-full" 
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <ShieldCheck className="h-4 w-4 mr-2" />
                        )}
                        Register This Device
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        First time? Register your device to enable passkey authentication
                      </p>
                    </>
                  )}
                </>
              ) : (
                <div className="text-center py-8 text-sm text-muted-foreground">
                  Passkey authentication is not available on this device
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="password" className="space-y-4">
              <form onSubmit={handlePasswordLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Admin Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Key className="h-4 w-4 mr-2" />
                  )}
                  Sign in
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          {error && (
            <div className="mt-4 p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 rounded-md">
              {error}
            </div>
          )}
          
          <Separator className="my-6" />
          
          <div className="text-xs text-center text-muted-foreground space-y-2">
            <p>🔒 This is a protected area</p>
            <p>Unauthorized access is prohibited</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}