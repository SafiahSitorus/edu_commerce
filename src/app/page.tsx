/**
 * Home Page
 * Shows landing page for non-authenticated users
 * Redirects to dashboard for authenticated users
 * Uses lazy loading for better performance
 */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useAppSelector } from '@/store/hooks';
import { Loader2 } from 'lucide-react';

// Lazy load Landing Page component
const LandingPage = dynamic(() => import('@/features/landing'), {
  loading: () => (
    <div className="d-flex justify-center align-center min-h-screen">
      <div className="loader" style={{ width: '40px', height: '40px' }}></div>
    </div>
  ),
  ssr: false, // Disable SSR for this component if needed
});

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAppSelector((state) => state.auth);
  const [showLanding, setShowLanding] = useState(false);

  useEffect(() => {
    // Wait for auth state to be initialized
    if (!isLoading) {
      if (isAuthenticated) {
        router.push('/dashboard');
      } else {
        setShowLanding(true);
      }
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading || !showLanding) {
    return (
      <div className="d-flex justify-center align-center min-h-screen">
        <div className="loader" style={{ width: '40px', height: '40px' }}></div>
      </div>
    );
  }

  // Show landing page for non-authenticated users
  return <LandingPage />;
}

