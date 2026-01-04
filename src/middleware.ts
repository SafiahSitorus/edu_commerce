/**
 * Next.js Middleware
 * Route protection dan validation
 */

import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes yang memerlukan authentication
const protectedRoutes = ['/dashboard', '/profile', '/orders', '/settings'];

// Routes yang hanya bisa diakses jika BELUM login
const authRoutes = ['/login', '/register'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Get token from cookie atau header (sesuaikan dengan implementasi Anda)
  // Untuk sementara, kita check dari localStorage di client side
  // Middleware ini hanya sebagai fallback protection
  
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  
  // TODO: Implement proper token validation here
  // const token = request.cookies.get('auth_token')?.value;
  
  // For now, let client-side handle the redirect
  // This middleware can be enhanced with server-side token validation
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
