import { NextRequest, NextResponse } from 'next/server';
import { sendUserEmail, sendAdminEmail, emailTemplates } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    console.log('=== Contact form submission started ===');
    
    const contactData = await request.json();
    console.log('Contact form data received:', JSON.stringify(contactData));
    
    const { name, email, subject, message } = contactData;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      console.log('Contact form validation failed: Missing required fields');
      return NextResponse.json(
        { error: 'Please fill in all required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      console.log('Contact form validation failed: Invalid email format');
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
      
      // Check which specific credentials are missing
      console.log('EMAIL_USER available:', Boolean(process.env.EMAIL_USER));
      console.log('EMAIL_PASS available:', Boolean(process.env.EMAIL_PASS));
      console.log('ADMIN_EMAIL available:', Boolean(process.env.ADMIN_EMAIL));
    } else {
      console.log('Email credentials found, attempting to send emails');
      
      // Send confirmation email to the user's email they provided in the form
      try {
        console.log(`Sending confirmation email to user: ${email}`);
        const userEmailResult = await sendUserEmail(
          email,
          'We received your message',
          emailTemplates.contactConfirmation(name)
        );
        
        if (userEmailResult.success) {
          userEmailSuccess = true;
          operationResults.userEmail = 'Success';
          console.log('✅ User confirmation email sent successfully');
        } else {
          operationResults.userEmail = `Failed - ${userEmailResult.error}`;
          console.log('❌ Failed to send user confirmation email:', userEmailResult.error);
        }
      } catch (emailError) {
        console.error('Error sending user email:', emailError);
        operationResults.userEmail = `Failed - ${emailError instanceof Error ? emailError.message : 'Unknown error'}`;
      }

      // Send notification to admin with user's email as reply-to
      if (process.env.ADMIN_EMAIL) {
        try {
          console.log(`Sending notification email to admin: ${process.env.ADMIN_EMAIL}`);
          const adminEmailResult = await sendAdminEmail(
            `New Contact Form: ${subject}`,
            emailTemplates.contactAdminNotification(contactData),
            email // Set the user's email as the reply-to address
          );
          
          if (adminEmailResult.success) {
            adminEmailSuccess = true;
            operationResults.adminEmail = 'Success';
            console.log('✅ Admin notification email sent successfully');
          } else {
            operationResults.adminEmail = `Failed - ${adminEmailResult.error}`;
            console.log('❌ Failed to send admin notification email:', adminEmailResult.error);
          }
        } catch (emailError) {
          console.error('Error sending admin email:', emailError);
          operationResults.adminEmail = `Failed - ${emailError instanceof Error ? emailError.message : 'Unknown error'}`;
        }
      } else {
        console.log('❌ ADMIN_EMAIL not set, skipping admin notification');
        operationResults.adminEmail = 'Skipped - ADMIN_EMAIL not set';
      }
    }

    // Log operation results for debugging
    console.log('Contact form operation results:', operationResults);
    console.log('=== Contact form submission completed ===');

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your message has been received successfully',
        emailSent: userEmailSuccess,
        adminNotified: adminEmailSuccess,
        operationResults: process.env.NODE_ENV === 'development' ? operationResults : undefined
      },
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