'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getApiUrl } from '@/lib/utils';

export default function EmailDebug() {
  const [results, setResults] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [testResults, setTestResults] = useState<any>(null);
  const [sendingTest, setSendingTest] = useState(false);
  const [gmailResults, setGmailResults] = useState<any>(null);
  const [loadingGmail, setLoadingGmail] = useState(false);
  
  const runGmailTests = async () => {
    try {
      setLoadingGmail(true);
      const apiUrl = getApiUrl('/api/gmail-fix');
      const response = await fetch(apiUrl);
      const data = await response.json();
      setGmailResults(data);
    } catch (error) {
      console.error('Error running Gmail tests:', error);
      setGmailResults({ error: 'Failed to run Gmail tests' });
    } finally {
      setLoadingGmail(false);
    }
  };
  
  const fetchEmailDiagnostics = async () => {
    try {
      setLoading(true);
      const apiUrl = getApiUrl('/api/test-email');
      const response = await fetch(apiUrl);
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error fetching email diagnostics:', error);
      setResults({ error: 'Failed to fetch email diagnostics' });
    } finally {
      setLoading(false);
    }
  };
  
  const sendTestEmail = async () => {
    if (!testEmail) {
      alert('Please enter a test email address');
      return;
    }
    
    try {
      setSendingTest(true);
      const apiUrl = getApiUrl(`/api/test-email?email=${encodeURIComponent(testEmail)}`);
      const response = await fetch(apiUrl);
      const data = await response.json();
      setTestResults(data);
    } catch (error) {
      console.error('Error sending test email:', error);
      setTestResults({ error: 'Failed to send test email' });
    } finally {
      setSendingTest(false);
    }
  };
  
  useEffect(() => {
    fetchEmailDiagnostics();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">Email Debug & Diagnostics</h1>
          <p className="mb-4">
            This page helps diagnose email issues on your Vercel deployment.
          </p>
          
          <div className="flex space-x-4 mb-8">
            <Link 
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Back to Home
            </Link>
            
            <button
              onClick={fetchEmailDiagnostics}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Refresh Diagnostics'}
            </button>
            
            <button
              onClick={runGmailTests}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              disabled={loadingGmail}
            >
              {loadingGmail ? 'Testing...' : 'Test Gmail Settings'}
            </button>
          </div>
          
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Send Test Email</h2>
            <div className="flex space-x-2">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border rounded"
              />
              <button
                onClick={sendTestEmail}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={sendingTest}
              >
                {sendingTest ? 'Sending...' : 'Send Test Email'}
              </button>
            </div>
            
            {testResults && (
              <div className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
                <h3 className="font-bold mb-2">Test Results:</h3>
                <pre className="text-sm">
                  {JSON.stringify(testResults, null, 2)}
                </pre>
              </div>
            )}
          </div>
          
          {gmailResults && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Gmail Test Results</h2>
              <div className="p-4 bg-gray-100 rounded overflow-auto">
                <pre className="text-sm">
                  {JSON.stringify(gmailResults, null, 2)}
                </pre>
              </div>
            </div>
          )}
          
          {results && (
            <div>
              <h2 className="text-xl font-bold mb-4">Email Configuration Diagnostics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-gray-100 rounded">
                  <h3 className="font-bold mb-2">Email Credentials:</h3>
                  <ul className="list-disc pl-5">
                    <li>EMAIL_USER: {results.environmentInfo.EMAIL_USER}</li>
                    <li>EMAIL_PASS: {results.environmentInfo.EMAIL_PASS}</li>
                    <li>ADMIN_EMAIL: {results.environmentInfo.ADMIN_EMAIL}</li>
                  </ul>
                </div>
                
                <div className="p-4 bg-gray-100 rounded">
                  <h3 className="font-bold mb-2">Environment:</h3>
                  <ul className="list-disc pl-5">
                    <li>NODE_ENV: {results.environmentInfo.NODE_ENV}</li>
                    <li>On Vercel: {results.environmentInfo.VERCEL ? 'Yes' : 'No'}</li>
                    <li>Vercel Env: {results.environmentInfo.VERCEL_ENV}</li>
                    <li>Vercel URL: {results.environmentInfo.VERCEL_URL}</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-4 bg-gray-100 rounded mb-6">
                <h3 className="font-bold mb-2">Transporter Verification:</h3>
                <div className={results.transporterVerification.success ? 'text-green-600' : 'text-red-600'}>
                  {results.transporterVerification.success 
                    ? '✅ Email transporter verified successfully' 
                    : `❌ Email transporter verification failed: ${results.transporterVerification.error}`}
                </div>
                {results.transporterVerification.code && (
                  <div className="mt-2">Error code: {results.transporterVerification.code}</div>
                )}
              </div>
              
              {results.troubleshooting && results.troubleshooting.length > 0 && (
                <div className="p-4 bg-yellow-50 text-yellow-800 rounded mb-6 border border-yellow-200">
                  <h3 className="font-bold mb-2">Troubleshooting Suggestions:</h3>
                  <ul className="list-disc pl-5">
                    {results.troubleshooting.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="p-4 bg-gray-100 rounded mb-6 overflow-auto">
                <h3 className="font-bold mb-2">Raw Diagnostic Data:</h3>
                <pre className="text-sm">
                  {JSON.stringify(results, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 