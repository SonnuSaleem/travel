import { NextRequest, NextResponse } from 'next/server';
import { sendUserEmail, sendAdminEmail } from '@/lib/email';
import nodemailer from 'nodemailer';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Check if email credentials are available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Email credentials not configured',
          details: {
            EMAIL_USER_AVAILABLE: Boolean(process.env.EMAIL_USER),
            EMAIL_PASS_AVAILABLE: Boolean(process.env.EMAIL_PASS),
            ADMIN_EMAIL_AVAILABLE: Boolean(process.env.ADMIN_EMAIL)
          }
        },
        { status: 500 }
      );
    }
    
    // Create a test transporter
    try {
      // Test SMTP connection directly
      const testTransporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      // Verify SMTP connection configuration
      await testTransporter.verify();
      
      // Send test email
      const userEmailResult = await sendUserEmail(
        email,
        'Email Test',
        `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #4a5568;">Email Functionality Test</h2>
          <p>This is a test email from your travel booking website.</p>
          <p>If you are receiving this email, it means your email functionality is working correctly.</p>
          <p>Time sent: ${new Date().toLocaleString()}</p>
        </div>
        `
      );
      
      return NextResponse.json({
        success: userEmailResult.success,
        message: userEmailResult.success ? 'Test email sent successfully' : userEmailResult.error,
        transporterVerified: true,
        details: {
          email,
          time: new Date().toISOString(),
          emailService: {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            user: process.env.EMAIL_USER?.substring(0, 5) + '...' // Only show first few characters
          }
        }
      });
    } catch (error) {
      console.error('Email test error:', error);
      
      // Provide detailed error information
      let errorDetails = {
        message: error instanceof Error ? error.message : 'Unknown error',
        code: error instanceof Error && 'code' in error ? (error as any).code : 'UNKNOWN'
      };
      
      // Detailed error messaging based on common error codes
      if (errorDetails.code === 'EAUTH') {
        errorDetails.suggestion = 'Gmail authentication failed. Make sure you are using an App Password if you have 2-Step Verification enabled.';
      } else if (errorDetails.code === 'ESOCKET') {
        errorDetails.suggestion = 'Connection to Gmail SMTP server failed. Please check your network connection and firewall settings.';
      } else if (errorDetails.code === 'EENVELOPE') {
        errorDetails.suggestion = 'Invalid envelope (recipients) configuration. Check the email address format.';
      }
      
      return NextResponse.json(
        { 
          success: false, 
          error: 'Failed to send test email',
          details: errorDetails,
          emailConfig: {
            EMAIL_USER_AVAILABLE: Boolean(process.env.EMAIL_USER),
            EMAIL_PASS_AVAILABLE: Boolean(process.env.EMAIL_PASS),
            EMAIL_USER_LENGTH: process.env.EMAIL_USER?.length || 0,
            EMAIL_PASS_LENGTH: process.env.EMAIL_PASS?.length || 0
          }
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Test email API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'An unexpected error occurred',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 