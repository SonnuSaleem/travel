import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { sendUserEmail, sendAdminEmail, emailTemplates } from '@/lib/email';

// Enable CORS
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle OPTIONS request for CORS
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    console.log('=== Booking submission started ===');
    console.log('Request headers:', Object.fromEntries(request.headers.entries()));
    
    const body = await request.json();
    console.log('Request body:', body);
    
    // Generate a unique booking ID
    const bookingId = `BK-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'destination', 'travelDate', 'travelers'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400, headers: corsHeaders }
        );
      }
    }

    // Validate email format
    if (!/^\S+@\S+\.\S+$/.test(body.email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Track success of operations
    let userEmailSuccess = false;
    let adminEmailSuccess = false;
    const operationResults = {
      userEmail: 'Not attempted',
      adminEmail: 'Not attempted',
      emailConfig: {
        userSet: Boolean(process.env.EMAIL_USER),
        passSet: Boolean(process.env.EMAIL_PASS),
        adminSet: Boolean(process.env.ADMIN_EMAIL)
      }
    };

    // Check if email credentials are available
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email credentials not found, skipping email sending');
      operationResults.userEmail = 'Skipped - Missing email credentials';
      operationResults.adminEmail = 'Skipped - Missing email credentials';
    } else {
      console.log('Email credentials found, attempting to send emails');
      
      // Prepare booking data for email template
      const bookingData = {
        id: bookingId,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone || '',
        destination: body.destination,
        travelDate: body.travelDate,
        travelers: parseInt(body.travelers) || 1,
        totalAmount: body.totalAmount || '0',
        packageName: body.destination
      };

      // Send confirmation email to user
      try {
        console.log(`Sending confirmation email to user: ${body.email}`);
        const userEmailResult = await sendUserEmail(
          body.email,
          'Your Booking Confirmation',
          emailTemplates.bookingConfirmation(bookingData)
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

      // Send notification to admin
      if (process.env.ADMIN_EMAIL) {
        try {
          console.log(`Sending notification email to admin: ${process.env.ADMIN_EMAIL}`);
          const adminEmailResult = await sendAdminEmail(
            'New Booking Received',
            emailTemplates.bookingAdminNotification(bookingData),
            body.email // Set reply-to as customer email
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
    console.log('Booking operation results:', operationResults);
    console.log('=== Booking submission completed ===');

    return NextResponse.json(
      {
        success: true,
        bookingId,
        message: 'Booking confirmed successfully',
        emailSent: userEmailSuccess,
        adminNotified: adminEmailSuccess,
        operationResults
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process booking',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500, headers: corsHeaders }
    );
  }
} 