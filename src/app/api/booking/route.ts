import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { v4 as uuidv4 } from 'uuid';
import { sendUserEmail, sendAdminEmail, emailTemplates } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['firstName', 'lastName', 'email', 'destination', 'travelDate', 'travelers', 'totalAmount'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { success: false, error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Generate a unique booking ID
    const bookingId = `BK-${uuidv4().substring(0, 8).toUpperCase()}`;
    
    // Create booking object with all data
    const bookingData = {
      bookingId,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone || '',
      destination: body.destination,
      travelDate: body.travelDate,
      travelers: parseInt(body.travelers) || 1,
      totalAmount: body.totalAmount,
      paymentMethod: 'Credit Card',
      cardDetails: {
        lastFour: body.cardNumber ? body.cardNumber.slice(-4) : '****',
        cardHolder: body.cardHolder || '',
        expiryDate: body.expiryDate || ''
      },
      status: 'confirmed',
      createdAt: new Date()
    };

    // Track success of operations
    let dbSuccess = false;
    let emailSuccess = false;
    const operationResults = {
      database: 'Not attempted',
      userEmail: 'Not attempted',
      adminEmail: 'Not attempted'
    };

    // Try to store in database if we have a valid DATABASE_URL
    if (!process.env.DATABASE_URL || 
        !(process.env.DATABASE_URL.startsWith('mongodb://') || 
          process.env.DATABASE_URL.startsWith('mongodb+srv://'))) {
      console.log('No valid DATABASE_URL found, skipping database storage');
      operationResults.database = 'Skipped - No valid DATABASE_URL';
    } else {
      try {
        // Connect to database
        const db = await connectToDatabase();
        
        // Insert booking into database
        const result = await db.collection('bookings').insertOne(bookingData);
        
        if (result.acknowledged) {
          // Successfully stored in database
          dbSuccess = true;
          operationResults.database = 'Success';
        } else {
          operationResults.database = 'Failed - Not acknowledged';
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        operationResults.database = `Failed - ${dbError.message}`;
      }
    }

    // Try to send confirmation emails
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('Email credentials not found, skipping email sending');
      operationResults.userEmail = 'Skipped - Missing email credentials';
      operationResults.adminEmail = 'Skipped - Missing email credentials';
    } else {
      // Prepare booking data for email template
      const emailBookingData = {
        id: bookingId,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone || '',
        destination: body.destination,
        travelDate: body.travelDate,
        travelers: parseInt(body.travelers) || 1,
        totalAmount: body.totalAmount,
        packageName: body.destination, // Using destination as package name
        cardNumber: body.cardNumber || '****'
      };

      // Send confirmation email to user
      try {
        const userEmailResult = await sendUserEmail(
          body.email,
          'Your Booking Confirmation',
          emailTemplates.bookingConfirmation(emailBookingData)
        );
        
        if (userEmailResult.success) {
          operationResults.userEmail = 'Success';
        } else {
          operationResults.userEmail = `Failed - ${userEmailResult.error}`;
        }
      } catch (emailError) {
        console.error('Error sending user email:', emailError);
        operationResults.userEmail = `Failed - ${emailError.message}`;
      }

      // Send notification to admin
      try {
        const adminEmailResult = await sendAdminEmail(
          'New Booking Received',
          emailTemplates.bookingAdminNotification(emailBookingData),
          body.email // Set reply-to as customer email
        );
        
        if (adminEmailResult.success) {
          emailSuccess = true;
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
    console.log('Booking operation results:', operationResults);

    // Return success response with booking ID
    return NextResponse.json({
      success: true,
      bookingId,
      message: 'Booking confirmed successfully',
      dbStored: dbSuccess,
      emailSent: emailSuccess,
      operationResults: process.env.NODE_ENV === 'development' ? operationResults : undefined
    });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process booking' },
      { status: 500 }
    );
  }
} 