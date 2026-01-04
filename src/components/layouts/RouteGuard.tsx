/**
 * Route Guard Component
 * Protects routes and validates authentication
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/store/hooks';
import { Loader2 } from 'lucide-react';

interface RouteGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean; // true = requires login, false = requires NOT logged in
  redirectTo?: string;
}

export default function RouteGuard({
  children,
  requireAuth = true,
  redirectTo,
}: RouteGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    // Wait for auth state to be loaded
    if (!isLoading) {
      if (requireAuth) {
        // Route requires authentication
        if (!isAuthenticated) {
          router.push(redirectTo || '/login');
        } else {
          setIsAuthorized(true);
        }
      } else {
        // Route requires NOT authenticated (e.g., login page)
        if (isAuthenticated) {
          router.push(redirectTo || '/dashboard');
        } else {
          setIsAuthorized(true);
        }
      }
    }
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  // Show loading while checking authorization
  if (isLoading || !isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600">Checking authorization...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
