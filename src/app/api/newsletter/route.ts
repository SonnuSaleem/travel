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

    // Send confirmation email to the user's email they provided in the form
    await sendUserEmail(
      email, // Send to the user's email from the form
      'Newsletter Subscription Confirmation',
      emailTemplates.newsletterConfirmation(email)
    );

    // Send notification to admin with user's email as reply-to
    await sendAdminEmail(
      'New Newsletter Subscription',
      emailTemplates.newsletterAdminNotification(email),
      email // Set the user's email as the reply-to address
    );

    return NextResponse.json(
      { success: true, message: 'Successfully subscribed to newsletter' },
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