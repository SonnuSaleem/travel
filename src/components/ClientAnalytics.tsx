'use client';

import { useEffect } from 'react';
import { trackUserActivity } from '@/lib/analytics';

export default function ClientAnalytics() {
  // Track user activity for analytics
  useEffect(() => {
    const cleanup = trackUserActivity();
    return cleanup;
  }, []);

  // This component doesn't render anything
  return null;
} 