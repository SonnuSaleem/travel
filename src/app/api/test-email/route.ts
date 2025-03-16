import { NextResponse } from 'next/server';
import { sendUserEmail, sendAdminEmail } from '@/lib/email';

export async function GET() {
  try {
    console.log('Testing email functionality...');
    
    // Test sending an email to the admin
    const adminResult = await sendAdminEmail(
      'Test Email from Travel Agency',
      `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
          <h2 style="color: #4a5568;">Test Email</h2>
          <p>This is a test email to verify that the email functionality is working correctly.</p>
          <p>If you received this email, it means the email sending functionality is working!</p>
          <p>Time sent: ${new Date().toLocaleString()}</p>
        </div>
      `
    );
    
    console.log('Admin email test result:', adminResult);
    
    return NextResponse.json({
      success: true,
      message: 'Test email sent. Check your admin email inbox.',
      result: adminResult
    });
  } catch (error) {
    console.error('Error testing email:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to send test email' },
      { status: 500 }
    );
  }
} 