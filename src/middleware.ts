import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from '@/lib/auth/session'

// List of admin routes that require authentication
const PROTECTED_ROUTES = [
  '/admin',
  '/api/jobs',
  '/api/projects',
  '/api/pdf',
]

// List of auth routes that should redirect if already logged in
const AUTH_ROUTES = ['/auth/login']

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  
  // Check if this is a protected route
  const isProtectedRoute = PROTECTED_ROUTES.some(route => path.startsWith(route))
  const isAuthRoute = AUTH_ROUTES.some(route => path.startsWith(route))
  
  // Get session from cookie
  const sessionCookie = request.cookies.get('admin-session')
  const session = sessionCookie ? await verifySession(sessionCookie.value) : null
  
  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('from', path)
    return NextResponse.redirect(loginUrl)
  }
  
  // Redirect to admin if accessing auth route with valid session
  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/admin', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api routes that don't need protection (like auth endpoints)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}