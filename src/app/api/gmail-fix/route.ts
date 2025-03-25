import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function GET(request: NextRequest) {
  // Test Gmail authentication directly with different settings
  
  const results = {
    gmailTests: [] as any[],
    envVariables: {
      EMAIL_USER: process.env.EMAIL_USER?.substring(0, 3) + '...' + process.env.EMAIL_USER?.substring(process.env.EMAIL_USER.indexOf('@')),
      EMAIL_PASS_LENGTH: process.env.EMAIL_PASS?.length,
      EMAIL_PASS_FIRST_CHARS: process.env.EMAIL_PASS?.substring(0, 2) + '...',
      ADMIN_EMAIL: process.env.ADMIN_EMAIL?.substring(0, 3) + '...' + process.env.ADMIN_EMAIL?.substring(process.env.ADMIN_EMAIL?.indexOf('@')),
      NODE_ENV: process.env.NODE_ENV,
      VERCEL: Boolean(process.env.VERCEL),
    },
    troubleshooting: [
      "If you're using a Gmail account, make sure:",
      "1. 2FA is enabled on your Google account",
      "2. You're using an App Password (not your regular password)",
      "3. The App Password is entered without spaces",
      "4. The Less secure app access is OFF (this is actually good)",
      "5. Your Gmail account doesn't have any unusual security restrictions"
    ]
  };
  
  // Test 1: Standard configuration
  try {
    const password = process.env.EMAIL_PASS || '';
    const cleanPassword = password.replace(/\s+/g, '');
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: cleanPassword,
      },
    });
    
    // Verify connection
    const verification = await transporter.verify();
    results.gmailTests.push({
      name: 'Standard Gmail SMTP',
      success: true,
      message: 'Connection verified successfully'
    });
  } catch (error) {
    results.gmailTests.push({
      name: 'Standard Gmail SMTP',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      code: error instanceof Error && 'code' in error ? (error as any).code : null
    });
  }
  
  // Test 2: TLS configuration
  try {
    const password = process.env.EMAIL_PASS || '';
    const cleanPassword = password.replace(/\s+/g, '');
    
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: cleanPassword,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    // Verify connection
    const verification = await transporter.verify();
    results.gmailTests.push({
      name: 'Gmail TLS (port 587)',
      success: true,
      message: 'Connection verified successfully'
    });
  } catch (error) {
    results.gmailTests.push({
      name: 'Gmail TLS (port 587)',
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      code: error instanceof Error && 'code' in error ? (error as any).code : null
    });
  }
  
  // If both tests failed, add more detailed troubleshooting
  if (results.gmailTests.every(test => !test.success)) {
    results.troubleshooting.push(
      "6. Create a new App Password specifically for this application",
      "7. Check if your Google account has any security alerts or blocks",
      "8. Try enabling 'Allow less secure apps' temporarily just for testing"
    );
  }
  
  return NextResponse.json(results);
} 