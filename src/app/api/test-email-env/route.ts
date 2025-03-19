import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Only return public information and status of environment variables
    // Do not expose actual values for security reasons
    return NextResponse.json({
      environment: process.env.NODE_ENV || 'unknown',
      hasEmailUser: Boolean(process.env.EMAIL_USER),
      hasEmailPass: Boolean(process.env.EMAIL_PASS),
      hasAdminEmail: Boolean(process.env.ADMIN_EMAIL),
      emailUserLength: process.env.EMAIL_USER?.length || 0,
      emailPassLength: process.env.EMAIL_PASS?.length || 0,
      emailUserDomain: process.env.EMAIL_USER ? `@${process.env.EMAIL_USER.split('@')[1] || 'unknown'}` : 'not set',
      nextPublicVars: {
        hasNextPublicEmailUser: Boolean(process.env.NEXT_PUBLIC_EMAIL_USER),
        hasNextPublicAdminEmail: Boolean(process.env.NEXT_PUBLIC_ADMIN_EMAIL)
      },
      serverTime: new Date().toISOString(),
      vercelEnv: process.env.VERCEL_ENV || 'not-vercel',
      isVercel: Boolean(process.env.VERCEL)
    });
  } catch (error) {
    console.error('Error checking email environment:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to check email environment variables',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
} 