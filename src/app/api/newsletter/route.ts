import { NextRequest, NextResponse } from 'next/server';
import { sendUserEmail, sendAdminEmail, emailTemplates } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json(); // This is the user's email from the newsletter form

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Track success of operations
    let userEmailSuccess = false;
    let adminEmailSuccess = false;
    const operationResults = {
      userEmail: 'Not attempted',
      adminEmail: 'Not attempted'
    };

    // Check if email credentials are available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email credentials not found, skipping email sending');
      operationResults.userEmail = 'Skipped - Missing email credentials';
      operationResults.adminEmail = 'Skipped - Missing email credentials';
    } else {
      // Send confirmation email to the user's email they provided in the form
      try {
        const userEmailResult = await sendUserEmail(
          email, // Send to the user's email from the form
          'Newsletter Subscription Confirmation',
          emailTemplates.newsletterSubscription({ email }) // Pass an object with email property
        );
        
        if (userEmailResult.success) {
          userEmailSuccess = true;
          operationResults.userEmail = 'Success';
        } else {
          operationResults.userEmail = `Failed - ${userEmailResult.error}`;
        }
      } catch (emailError) {
        console.error('Error sending user email:', emailError);
        operationResults.userEmail = `Failed - ${emailError.message}`;
      }

      // Send notification to admin with user's email as reply-to
      try {
        const adminEmailResult = await sendAdminEmail(
          'New Newsletter Subscription',
          emailTemplates.newsletterAdminNotification(email),
          email // Set the user's email as the reply-to address
        );
        
        if (adminEmailResult.success) {
          adminEmailSuccess = true;
          operationResults.adminEmail = 'Success';
        } else {
          operationResults.adminEmail = `Failed - ${adminEmailResult.error}`;
        }
      } catch (emailError) {
        console.error('Error sending admin email:', emailError);
        operationResults.adminEmail = `Failed - ${emailError.message}`;
      }
    }

    // Log operation results for debugging
    console.log('Newsletter operation results:', operationResults);

    return NextResponse.json(
      { 
        success: true, 
        message: 'Successfully subscribed to newsletter',
        emailSent: userEmailSuccess,
        operationResults: process.env.NODE_ENV === 'development' ? operationResults : undefined
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to process newsletter subscription' },
      { status: 500 }
    );
  }
} 