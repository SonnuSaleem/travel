'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function EmailTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const testEmail = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/test-email');
      const data = await response.json();
      
      setResult(data);
      
      if (!data.success) {
        setError(data.error || 'Failed to send test email');
      }
    } catch (err) {
      console.error('Error testing email:', err);
      setError('An error occurred while testing email functionality');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Email Test Page</h1>
          <p className="mt-2 text-gray-600">
            Use this page to test if your email configuration is working correctly.
          </p>
        </div>
        
        <div className="mb-8 p-4 bg-blue-50 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-800 mb-2">Email Configuration</h2>
          <p className="text-sm text-blue-700 mb-1">
            <strong>Sender Email:</strong> {process.env.NEXT_PUBLIC_EMAIL_USER || 'Not set in environment variables'}
          </p>
          <p className="text-sm text-blue-700 mb-1">
            <strong>Admin Email:</strong> {process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'Not set in environment variables'}
          </p>
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Make sure you've set up your .env.local file with the correct email credentials.
          </p>
        </div>
        
        <div className="flex justify-center mb-8">
          <button
            onClick={testEmail}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Sending Test Email...' : 'Send Test Email'}
          </button>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Error</h3>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}
        
        {result && (
          <div className="mb-6 p-4 bg-green-50 rounded-lg">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Result</h3>
            <pre className="text-sm text-green-700 whitespace-pre-wrap overflow-auto">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
        
        <div className="mt-8 text-center">
          <Link href="/" className="text-blue-600 hover:text-blue-800">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
} 