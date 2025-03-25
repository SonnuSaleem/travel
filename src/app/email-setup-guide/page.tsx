import Link from 'next/link';

export default function EmailSetupGuide() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h1 className="text-2xl font-bold mb-4">Gmail Setup Guide for Vercel Deployment</h1>
          
          <div className="mb-8">
            <Link 
              href="/email-debug"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block"
            >
              Back to Email Debug Tool
            </Link>
          </div>
          
          <div className="prose max-w-none">
            <h2>Why Email Might Not Be Working on Vercel</h2>
            <p>
              When deploying to Vercel, email sending from Gmail can fail due to several factors:
            </p>
            <ul>
              <li><strong>Security Restrictions:</strong> Gmail restricts "less secure apps" from sending emails</li>
              <li><strong>Authentication Issues:</strong> Regular passwords don't work with 2FA enabled accounts</li>
              <li><strong>Rate Limits:</strong> Gmail limits how many emails you can send per day</li>
              <li><strong>Environment Variables:</strong> Improperly configured secrets on Vercel</li>
            </ul>
            
            <h2>Solution: Using Gmail App Passwords</h2>
            <p>
              The most reliable way to send emails from Gmail on Vercel is using an <strong>App Password</strong>.
              This is a special 16-character password that bypasses 2FA and allows specific apps to access your Gmail account.
            </p>
            
            <h3>Step 1: Enable 2-Step Verification</h3>
            <p>You must have 2-Step Verification enabled on your Google account first:</p>
            <ol>
              <li>Go to your <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer">Google Account Security</a> page</li>
              <li>Click on "2-Step Verification"</li>
              <li>Follow the steps to turn on 2-Step Verification</li>
            </ol>
            
            <h3>Step 2: Create an App Password</h3>
            <ol>
              <li>Go to your <a href="https://myaccount.google.com/apppasswords" target="_blank" rel="noopener noreferrer">App passwords</a> page</li>
              <li>Click "Select app" and choose "Mail"</li>
              <li>Click "Select device" and choose "Other"</li>
              <li>Enter a name (e.g., "Vercel Travel Website")</li>
              <li>Click "Generate"</li>
              <li>You'll see a 16-character password (with spaces)</li>
              <li><strong>Important:</strong> Copy this password WITHOUT any spaces</li>
            </ol>
            
            <div className="bg-yellow-50 p-4 my-4 border-l-4 border-yellow-500">
              <p className="font-bold">Important Note:</p>
              <p>
                When Google shows your App Password, it displays it with spaces (like "xxxx xxxx xxxx xxxx").
                When copying to your Vercel environment variables, you must REMOVE all spaces.
              </p>
            </div>
            
            <h3>Step 3: Update Vercel Environment Variables</h3>
            <ol>
              <li>Go to your Vercel project dashboard</li>
              <li>Navigate to "Settings" → "Environment Variables"</li>
              <li>Set the following variables:
                <ul>
                  <li><code>EMAIL_USER</code>: Your Gmail address (e.g., yourname@gmail.com)</li>
                  <li><code>EMAIL_PASS</code>: The App Password WITHOUT any spaces</li>
                  <li><code>ADMIN_EMAIL</code>: The email where you want to receive notifications</li>
                </ul>
              </li>
              <li>Click "Save"</li>
              <li>Redeploy your project to apply the changes</li>
            </ol>
            
            <h3>Step 4: Test Email Functionality</h3>
            <p>
              After updating your environment variables and redeploying, you can use the 
              <Link href="/email-debug" className="text-blue-600 hover:underline"> Email Debug Tool </Link>
              to verify your email configuration and send test emails.
            </p>
            
            <h2>Common Issues & Troubleshooting</h2>
            
            <h3>Authentication Failed Error</h3>
            <p>If you see "Authentication Failed" errors:</p>
            <ul>
              <li>Double-check that you're using an App Password, not your regular Gmail password</li>
              <li>Ensure all spaces are removed from the App Password</li>
              <li>Verify that the EMAIL_USER matches the Gmail account where you created the App Password</li>
              <li>Try generating a new App Password and updating it in Vercel</li>
            </ul>
            
            <h3>Rate Limiting</h3>
            <p>
              Gmail limits how many emails you can send per day (typically 500 for regular accounts).
              If you're sending too many emails too quickly, Gmail might temporarily block your account from sending.
            </p>
            
            <h3>Multiple Deployment Environments</h3>
            <p>
              If you have multiple environments (development, preview, production), make sure to set the
              environment variables for each environment where email sending is needed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 