'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCog, FaClipboard, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function EmailTest() {
  const [authToken, setAuthToken] = useState('');
  const [testEmail, setTestEmail] = useState('');
  const [testResult, setTestResult] = useState<any>(null);
  const [configResult, setConfigResult] = useState<any>(null);
  const [isTestingEmail, setIsTestingEmail] = useState(false);
  const [isFixingConfig, setIsFixingConfig] = useState(false);
  const [message, setMessage] = useState('');
  
  const testEmailFunctionality = async () => {
    if (!testEmail) {
      setMessage('Please enter a test email address');
      return;
    }
    
    setIsTestingEmail(true);
    setMessage('');
    
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
      
      if (data.success) {
        setMessage('Email test completed successfully. Check the test email inbox.');
      } else {
        setMessage(`Email test failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error testing email:', error);
      setMessage('An error occurred while testing email functionality');
    } finally {
      setIsTestingEmail(false);
    }
  };
  
  const fixEmailConfiguration = async () => {
    if (!authToken) {
      setMessage('Please enter an admin auth token');
      return;
    }
    
    setIsFixingConfig(true);
    setMessage('');
    
    try {
      const response = await fetch('/api/email-config-fix', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ authToken }),
      });
      
      const data = await response.json();
      setConfigResult(data);
      
      if (data.success) {
        setMessage('Email configuration diagnosis completed.');
      } else {
        setMessage(`Email configuration diagnosis failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error fixing email configuration:', error);
      setMessage('An error occurred while diagnosing email configuration');
    } finally {
      setIsFixingConfig(false);
    }
  };
  
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(JSON.stringify(text, null, 2));
    setMessage('Copied to clipboard!');
  };
  
  return (
    <div className="min-h-screen pt-20 bg-dark-light">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-light">Email System Test & Configuration</h1>
        </div>
        
        {message && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-4 mb-6 rounded-lg ${message.includes('failed') || message.includes('error') ? 'bg-red-900/30 border border-red-500/50 text-red-200' : 'bg-green-900/30 border border-green-500/50 text-green-200'}`}
          >
            <p>{message}</p>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email Test Section */}
          <div className="bg-dark rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-primary mr-2" />
              <h2 className="text-xl font-semibold text-light">Test Email Sending</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="testEmail" className="block text-light-dark mb-1">Test Email Address</label>
                <input
                  type="email"
                  id="testEmail"
                  className="w-full bg-dark-light border border-dark-light rounded-lg px-4 py-2 text-light focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="example@example.com"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                />
              </div>
              
              <button
                onClick={testEmailFunctionality}
                disabled={isTestingEmail || !testEmail}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isTestingEmail ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Testing...
                  </>
                ) : (
                  'Test Email Functionality'
                )}
              </button>
              
              {testResult && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-light">Test Result</h3>
                    <button
                      onClick={() => copyToClipboard(testResult)}
                      className="text-primary hover:text-primary-light"
                      title="Copy to clipboard"
                    >
                      <FaClipboard />
                    </button>
                  </div>
                  
                  <div className="bg-dark-light rounded-lg p-4 overflow-x-auto">
                    <pre className="text-xs text-light-dark whitespace-pre-wrap">
                      {JSON.stringify(testResult, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Email Configuration Section */}
          <div className="bg-dark rounded-lg p-6">
            <div className="flex items-center mb-4">
              <FaCog className="text-primary mr-2" />
              <h2 className="text-xl font-semibold text-light">Email Configuration</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="authToken" className="block text-light-dark mb-1">Admin Auth Token</label>
                <input
                  type="password"
                  id="authToken"
                  className="w-full bg-dark-light border border-dark-light rounded-lg px-4 py-2 text-light focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Enter admin auth token"
                  value={authToken}
                  onChange={(e) => setAuthToken(e.target.value)}
                />
              </div>
              
              <button
                onClick={fixEmailConfiguration}
                disabled={isFixingConfig || !authToken}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isFixingConfig ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                    Diagnosing...
                  </>
                ) : (
                  'Diagnose Email Configuration'
                )}
              </button>
              
              {configResult && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-light">Configuration Result</h3>
                    <button
                      onClick={() => copyToClipboard(configResult)}
                      className="text-primary hover:text-primary-light"
                      title="Copy to clipboard"
                    >
                      <FaClipboard />
                    </button>
                  </div>
                  
                  <div className="bg-dark-light rounded-lg p-4 overflow-x-auto">
                    <pre className="text-xs text-light-dark whitespace-pre-wrap">
                      {JSON.stringify(configResult, null, 2)}
                    </pre>
                  </div>
                  
                  {configResult.success && configResult.emailConfig?.recommendations?.length > 0 && (
                    <div className="mt-4">
                      <h3 className="font-semibold text-light mb-2">Recommendations</h3>
                      <ul className="list-disc pl-5 space-y-2 text-light-dark">
                        {configResult.emailConfig.recommendations.map((rec: string, idx: number) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {configResult.success && (
                    <div className="mt-4 flex items-start">
                      <div className={`flex-shrink-0 mt-1 ${configResult.emailConfig?.testTransporterResult?.success ? 'text-green-500' : 'text-red-500'}`}>
                        {configResult.emailConfig?.testTransporterResult?.success ? (
                          <FaCheckCircle size={18} />
                        ) : (
                          <FaExclamationTriangle size={18} />
                        )}
                      </div>
                      <div className="ml-2 text-light-dark">
                        <p>
                          {configResult.emailConfig?.testTransporterResult?.success
                            ? 'Email transporter is correctly configured.'
                            : 'Email transporter configuration issue detected. See recommendations above.'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Environment Info Section */}
        {(testResult || configResult) && (
          <div className="mt-8 bg-dark rounded-lg p-6">
            <h2 className="text-xl font-semibold text-light mb-4">Environment Variables Status</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="font-semibold text-light mb-2">EMAIL_USER</h3>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${testResult?.details?.emailConfig?.EMAIL_USER_AVAILABLE || configResult?.emailConfig?.environmentVariables?.EMAIL_USER ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                  <p className="text-light-dark">
                    {testResult?.details?.emailConfig?.EMAIL_USER_AVAILABLE || configResult?.emailConfig?.environmentVariables?.EMAIL_USER ? 'Configured' : 'Not configured'}
                  </p>
                </div>
              </div>
              
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="font-semibold text-light mb-2">EMAIL_PASS</h3>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${testResult?.details?.emailConfig?.EMAIL_PASS_AVAILABLE || configResult?.emailConfig?.environmentVariables?.EMAIL_PASS ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                  <p className="text-light-dark">
                    {testResult?.details?.emailConfig?.EMAIL_PASS_AVAILABLE || configResult?.emailConfig?.environmentVariables?.EMAIL_PASS ? 'Configured' : 'Not configured'}
                  </p>
                </div>
              </div>
              
              <div className="bg-dark-light rounded-lg p-4">
                <h3 className="font-semibold text-light mb-2">ADMIN_EMAIL</h3>
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full ${configResult?.emailConfig?.environmentVariables?.ADMIN_EMAIL ? 'bg-green-500' : 'bg-red-500'} mr-2`}></div>
                  <p className="text-light-dark">
                    {configResult?.emailConfig?.environmentVariables?.ADMIN_EMAIL ? 'Configured' : 'Not configured'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 