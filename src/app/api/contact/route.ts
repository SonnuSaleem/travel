import { NextRequest, NextResponse } from 'next/server';
import { sendUserEmail, sendAdminEmail, emailTemplates } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const contactData = await request.json();
    const { name, email, subject, message } = contactData;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Send confirmation email to the user's email they provided in the form
    await sendUserEmail(
      email,
      'We received your message',
      emailTemplates.contactConfirmation(name)
    );

    // Send notification to admin with user's email as reply-to
    await sendAdminEmail(
      `New Contact Form: ${subject}`,
      emailTemplates.contactAdminNotification(contactData),
      email // Set the user's email as the reply-to address
    );

    return NextResponse.json(
      { success: true, message: 'Your message has been sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { error: 'Failed to process your message' },
      { status: 500 }
    );
  }
} 