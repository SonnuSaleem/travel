import { NextRequest, NextResponse } from 'next/server';
import { verifyEmailTransporter, sendUserEmail, sendAdminEmail } from '@/lib/email';

export async function GET(request: NextRequest) {
  // Get the URL parameters
  const searchParams = request.nextUrl.searchParams;
  const email = searchParams.get('email') || process.env.ADMIN_EMAIL || 'test@example.com';
  
  // Collect all environment variables related to email
  const envInfo = {
    EMAIL_USER: process.env.EMAIL_USER ? 'Set' : 'Not set',
    EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set',
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ? 'Set' : 'Not set',
    NODE_ENV: process.env.NODE_ENV,
    VERCEL: Boolean(process.env.VERCEL),
    VERCEL_ENV: process.env.VERCEL_ENV || 'Not set',
    VERCEL_URL: process.env.VERCEL_URL || 'Not set',
  };
  
  // Check if we have credentials before proceeding
  const credentialsCheck = {
    EMAIL_USER: Boolean(process.env.EMAIL_USER),
    EMAIL_PASS: Boolean(process.env.EMAIL_PASS),
    hasSpacesInPass: process.env.EMAIL_PASS ? process.env.EMAIL_PASS.includes(' ') : false,
    ADMIN_EMAIL: Boolean(process.env.ADMIN_EMAIL),
    allCredentialsPresent: Boolean(process.env.EMAIL_USER && process.env.EMAIL_PASS && process.env.ADMIN_EMAIL)
  };
  
  // First, verify the email transporter
  const verifyResult = await verifyEmailTransporter();
  
  // Attempt to send a test email only if transporter is verified
  let sendTestResult = { attempted: false, result: null };
  
  if (verifyResult.success) {
    sendTestResult.attempted = true;
    try {
      // Send a simple test email with a timestamp to ensure we can see if it's newly sent
      const currentTime = new Date().toISOString();
      const result = await sendUserEmail(
        email,
        `Test Email from Your Travel Website (${currentTime})`,
        `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2>Test Email</h2>
          <p>This is a test email sent at: ${currentTime}</p>
          <p>Environment: ${process.env.NODE_ENV}</p>
          <p>Running on Vercel: ${Boolean(process.env.VERCEL)}</p>
          <p>If you received this email, your email configuration is working correctly.</p>
        </div>
        `
      );
      
      sendTestResult.result = result;
    } catch (error) {
      sendTestResult.result = {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
  
  // Provide troubleshooting guidance
  const troubleshooting = [];
  
  if (!credentialsCheck.allCredentialsPresent) {
    troubleshooting.push("Missing email credentials. Check that EMAIL_USER, EMAIL_PASS, and ADMIN_EMAIL are set in Vercel environment variables.");
  }
  
  if (credentialsCheck.hasSpacesInPass) {
    troubleshooting.push("Your EMAIL_PASS contains spaces. Gmail app passwords should not contain spaces.");
  }
  
  if (process.env.EMAIL_USER?.includes('@gmail.com') && !verifyResult.success) {
    troubleshooting.push("For Gmail accounts with 2FA enabled, you must use an App Password. Regular passwords won't work.");
    troubleshooting.push("To create an App Password: Google Account > Security > 2-Step Verification > App passwords");
  }
  
  // Return all diagnostic information
  return NextResponse.json({
    environmentInfo: envInfo,
    credentialsCheck,
    transporterVerification: verifyResult,
    testEmailResult: sendTestResult,
    troubleshooting,
    message: 'This route is for testing email functionality.'
  });
} 