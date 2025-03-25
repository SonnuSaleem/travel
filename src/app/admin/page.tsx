'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to home page 
    router.push('/');
  }, [router]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Admin Access Removed</h1>
        <p className="mb-6">The admin dashboard has been removed from this application.</p>
        <p className="text-gray-600">Redirecting to home page...</p>
      </div>
    </div>
  );
} 