'use client';

import { useState } from 'react';
import { getApiUrl } from '@/lib/utils';

export default function TestEmail() {
  const [testEmail, setTestEmail] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [envVariables, setEnvVariables] = useState<any>(null);
  
  const testEmailSending = async () => {
    setIsLoading(true);
    setTestResult(null);
    
    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: testEmail }),
      });
      
      const data = await response.json();
      setTestResult(data);
      
      // Get environment variable info (public only)
      const envResponse = await fetch('/api/test-email-env');
      const envData = await envResponse.json();
      setEnvVariables(envData);
    } catch (error) {
      setTestResult({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen pt-20 bg-dark-light text-light">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl md:text-3xl font-bold mb-6">Email Functionality Test</h1>
        
        <div className="bg-dark rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Email Sending</h2>
          <p className="mb-4">This page helps diagnose email sending issues in the deployed environment.</p>
          
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <input
              type="email"
              value={testEmail}
              onChange={(e) => setTestEmail(e.target.value)}
              placeholder="Enter test email address"
              className="flex-grow bg-dark-light border border-dark-light rounded-lg px-4 py-2 text-light focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
            <button
              onClick={testEmailSending}
              disabled={isLoading || !testEmail}
              className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Testing...' : 'Test Email'}
            </button>
          </div>
          
          {testResult && (
            <div className={`mt-4 p-4 rounded-lg ${testResult.success ? 'bg-green-900/30 border border-green-500/50' : 'bg-red-900/30 border border-red-500/50'}`}>
              <h3 className="font-semibold mb-2">{testResult.success ? 'Success' : 'Error'}</h3>
              <pre className="whitespace-pre-wrap overflow-x-auto text-sm">
                {JSON.stringify(testResult, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        {envVariables && (
          <div className="bg-dark rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Environment Configuration</h2>
            <pre className="whitespace-pre-wrap overflow-x-auto text-sm bg-dark-light p-4 rounded-lg">
              {JSON.stringify(envVariables, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
} 