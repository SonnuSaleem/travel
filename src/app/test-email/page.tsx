'use client';

import { useState, useEffect, FormEvent } from 'react';
import { getApiUrl } from '@/lib/utils';
import BackButton from '@/components/BackButton';

// Define types for the test results
interface EnvironmentInfo {
  EMAIL_USER: string;
  EMAIL_PASS: string;
  ADMIN_EMAIL: string;
  NODE_ENV: string;
  VERCEL: boolean;
}

interface CredentialsCheck {
  EMAIL_USER: boolean;
  EMAIL_PASS: boolean;
  hasSpacesInPass: boolean;
  ADMIN_EMAIL: boolean;
  allCredentialsPresent: boolean;
}

interface TransporterVerification {
  success: boolean;
  error?: string;
  message?: string;
  code?: string;
}

interface TestEmailResult {
  attempted: boolean;
  result: {
    success: boolean;
    error?: string;
  } | null;
}

interface TestResults {
  environmentInfo: EnvironmentInfo;
  credentialsCheck: CredentialsCheck;
  transporterVerification: TransporterVerification;
  testEmailResult: TestEmailResult;
  message: string;
}

export default function TestEmail() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<TestResults | null>(null);
  const [error, setError] = useState('');
  const [testRunning, setTestRunning] = useState(false);
  
  // Run a test immediately when the page loads
  useEffect(() => {
    runEmailTest();
  }, []);
  
  const runEmailTest = async (customEmail = '') => {
    setLoading(true);
    setError('');
    setTestRunning(true);
    
    try {
      // Use the test email API endpoint
      const apiUrl = getApiUrl('/api/test-email');
      const fullUrl = customEmail ? `${apiUrl}?email=${encodeURIComponent(customEmail)}` : apiUrl;
      
      console.log('Running email test at:', fullUrl);
      
      const response = await fetch(fullUrl);
      const data = await response.json();
      
      setResults(data as TestResults);
    } catch (err) {
      console.error('Email test error:', err);
      setError(err instanceof Error ? err.message : 'Failed to run email test');
    } finally {
      setLoading(false);
      setTestRunning(false);
    }
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    runEmailTest(email);
  };

  return (
    <div className="min-h-screen bg-dark-light pt-16">
      <BackButton />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto bg-dark rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary to-secondary py-4 px-6">
            <h1 className="text-xl font-bold text-white">Email System Diagnostic</h1>
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-light mb-2">Send Test Email</h2>
              <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email address (optional)"
                  className="flex-grow px-4 py-2 bg-dark-light border border-dark-lighter rounded-md focus:outline-none focus:ring-1 focus:ring-primary text-light"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-primary hover:bg-primary/90 text-white rounded-md font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? 'Testing...' : 'Run Test'}
                </button>
              </form>
              {error && (
                <div className="mt-2 text-primary">{error}</div>
              )}
            </div>
            
            {testRunning ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
              </div>
            ) : results ? (
              <div className="overflow-auto">
                <h2 className="text-lg font-semibold text-light mb-2">Test Results</h2>
                
                {/* Environment Info */}
                <div className="mb-4">
                  <h3 className="text-md font-medium text-light mb-1">Environment Variables</h3>
                  <div className="bg-dark-lighter p-3 rounded-md">
                    {Object.entries(results.environmentInfo || {}).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-2 mb-1">
                        <div className="text-light-dark">{key}:</div>
                        <div className="text-light">{String(value)}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Credentials Check */}
                <div className="mb-4">
                  <h3 className="text-md font-medium text-light mb-1">Credentials Check</h3>
                  <div className="bg-dark-lighter p-3 rounded-md">
                    {Object.entries(results.credentialsCheck || {}).map(([key, value]) => (
                      <div key={key} className="grid grid-cols-2 gap-2 mb-1">
                        <div className="text-light-dark">{key}:</div>
                        <div className={`${value === true ? 'text-green-500' : value === false ? 'text-primary' : 'text-light'}`}>
                          {String(value)}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {results.credentialsCheck?.hasSpacesInPass && (
                    <div className="mt-2 text-primary bg-primary/10 p-2 rounded">
                      <strong>Warning:</strong> Your EMAIL_PASS contains spaces. This will likely cause authentication issues with Gmail. 
                      Remove all spaces from your App Password.
                    </div>
                  )}
                  
                  {!results.credentialsCheck?.allCredentialsPresent && (
                    <div className="mt-2 text-primary bg-primary/10 p-2 rounded">
                      <strong>Missing Credentials:</strong> Make sure all required environment variables are set in your Vercel project settings.
                    </div>
                  )}
                </div>
                
                {/* Transporter Verification */}
                <div className="mb-4">
                  <h3 className="text-md font-medium text-light mb-1">Email Transporter Check</h3>
                  <div className="bg-dark-lighter p-3 rounded-md">
                    <div className="grid grid-cols-2 gap-2 mb-1">
                      <div className="text-light-dark">Status:</div>
                      <div className={results.transporterVerification?.success ? 'text-green-500' : 'text-primary'}>
                        {results.transporterVerification?.success ? 'VERIFIED' : 'FAILED'}
                      </div>
                    </div>
                    
                    {results.transporterVerification?.error && (
                      <div className="grid grid-cols-2 gap-2 mb-1">
                        <div className="text-light-dark">Error:</div>
                        <div className="text-primary">{results.transporterVerification.error}</div>
                      </div>
                    )}
                    
                    {results.transporterVerification?.code && (
                      <div className="grid grid-cols-2 gap-2 mb-1">
                        <div className="text-light-dark">Error Code:</div>
                        <div className="text-primary">{results.transporterVerification.code}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Test Email Result */}
                <div className="mb-4">
                  <h3 className="text-md font-medium text-light mb-1">Test Email</h3>
                  <div className="bg-dark-lighter p-3 rounded-md">
                    {results.testEmailResult?.attempted ? (
                      <>
                        <div className="grid grid-cols-2 gap-2 mb-1">
                          <div className="text-light-dark">Status:</div>
                          <div className={results.testEmailResult.result?.success ? 'text-green-500' : 'text-primary'}>
                            {results.testEmailResult.result?.success ? 'SENT' : 'FAILED'}
                          </div>
                        </div>
                        
                        {results.testEmailResult.result?.error && (
                          <div className="grid grid-cols-2 gap-2 mb-1">
                            <div className="text-light-dark">Error:</div>
                            <div className="text-primary">{results.testEmailResult.result.error}</div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-light">Test not attempted because transporter verification failed</div>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 text-light-dark text-sm">
                  <p>If you&apos;re having issues with Gmail authentication:</p>
                  <ol className="list-decimal list-inside mt-2 space-y-1">
                    <li>Make sure you&apos;re using an App Password if you have 2-Step Verification enabled on your Gmail account</li>
                    <li>Your Gmail App Password should NOT have any spaces</li>
                    <li>Check that EMAIL_USER is your full Gmail address</li>
                    <li>Ensure ADMIN_EMAIL is set to a valid email address</li>
                    <li>Verify that all environment variables are set in your Vercel project</li>
                  </ol>
                </div>
                
                <div className="mt-6 text-center">
                  <button
                    onClick={() => runEmailTest(email)}
                    disabled={loading}
                    className="px-6 py-2 bg-secondary hover:bg-secondary/90 text-white rounded-md font-medium disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Testing...' : 'Run Test Again'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-light-dark">
                Running diagnostics...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 