import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { verifyEmailTransporter } from '@/lib/email';

// This is an admin-only endpoint to diagnose and fix email configuration issues
export async function POST(request: NextRequest) {
  try {
    // Simple authentication to prevent unauthorized access
    // In a real app, you would use a proper auth system
    const body = await request.json();
    const { authToken } = body;
    
    if (authToken !== process.env.ADMIN_AUTH_TOKEN) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized access' },
        { status: 401 }
      );
    }
    
    // Gather all email-related environment variables
    const envVars = {
      EMAIL_USER: process.env.EMAIL_USER || null,
      EMAIL_PASS: process.env.EMAIL_PASS ? '[REDACTED]' : null,
      ADMIN_EMAIL: process.env.ADMIN_EMAIL || null,
      NODE_ENV: process.env.NODE_ENV || 'unknown',
      VERCEL_ENV: process.env.VERCEL_ENV || null,
      IS_VERCEL: Boolean(process.env.VERCEL),
    };
    
    // Check if the necessary variables are set
    const missingVars = [];
    if (!process.env.EMAIL_USER) missingVars.push('EMAIL_USER');
    if (!process.env.EMAIL_PASS) missingVars.push('EMAIL_PASS');
    if (!process.env.ADMIN_EMAIL) missingVars.push('ADMIN_EMAIL');
    
    // Test the email transporter
    const transporterVerification = await verifyEmailTransporter();
    
    // Try to create a test transporter with provided credentials
    let testTransporterResult = { success: false, error: null };
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const testTransporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 465,
          secure: true,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
        
        // Verify the connection
        await testTransporter.verify();
        testTransporterResult = { success: true, error: null };
      } catch (error) {
        testTransporterResult = { 
          success: false, 
          error: error instanceof Error ? error.message : 'Unknown error' 
        };
      }
    }
    
    // Recommendations based on findings
    const recommendations = [];
    
    if (missingVars.length > 0) {
      recommendations.push(`Set the following environment variables: ${missingVars.join(', ')}`);
    }
    
    if (process.env.EMAIL_USER && process.env.EMAIL_USER.includes('@gmail.com') && !testTransporterResult.success) {
      recommendations.push(
        'For Gmail accounts, make sure you are using an App Password instead of your regular password. ' +
        'You need to have 2-Step Verification enabled on your Google account to create an App Password.'
      );
    }
    
    if (process.env.VERCEL) {
      recommendations.push(
        'Ensure your environment variables are correctly set in Vercel project settings. ' +
        'Go to Project Settings > Environment Variables and verify all email-related variables.'
      );
    }
    
    // Return the diagnosis results
    return NextResponse.json({
      success: true,
      emailConfig: {
        environmentVariables: envVars,
        missingVariables: missingVars,
        transporterVerification,
        testTransporterResult,
        recommendations,
      },
      serverInfo: {
        timestamp: new Date().toISOString(),
        nodeVersion: process.version,
      }
    });
  } catch (error) {
    console.error('Email configuration fix API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to diagnose email configuration',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 