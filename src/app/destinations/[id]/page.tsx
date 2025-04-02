'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function DestinationDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  useEffect(() => {
    // Redirect to the package detail page with the same ID
    router.push(`/packages/${id}`);
  }, [id, router]);

  return (
    <div className="pt-16 flex items-center justify-center min-h-screen bg-dark-light">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
    </div>
  );
} 