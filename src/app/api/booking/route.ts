import { NextRequest, NextResponse } from 'next/server';
import { sendUserEmail, sendAdminEmail, emailTemplates } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const bookingData = await request.json();
    console.log('Received booking data:', bookingData);
    
    const { 
      firstName, 
      lastName, 
      email, // This is the user's email from the form
      phone, 
      packageName, 
      destination, 
      travelDate, 
      travelers, 
      totalAmount,
      cardNumber 
    } = bookingData;

    // Check which fields are missing
    const missingFields = [];
    if (!firstName) missingFields.push('firstName');
    if (!lastName) missingFields.push('lastName');
    if (!email) missingFields.push('email');
    if (!phone) missingFields.push('phone');
    if (!packageName) missingFields.push('packageName');
    if (!destination) missingFields.push('destination');
    if (!travelDate) missingFields.push('travelDate');
    if (!travelers) missingFields.push('travelers');
    if (!totalAmount) missingFields.push('totalAmount');
    if (!cardNumber) missingFields.push('cardNumber');

    if (missingFields.length > 0) {
      console.error('Missing fields:', missingFields);
      return NextResponse.json(
        { error: `Please fill in all required fields: ${missingFields.join(', ')}` },
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

    // Generate a booking ID
    const bookingId = `BK-${Date.now().toString().slice(-6)}`;
    const bookingWithId = { ...bookingData, id: bookingId };

    try {
      // Send confirmation email to the user's email they provided in the form
      await sendUserEmail(
        email, // Send to the user's email from the form
        'Your Booking Confirmation',
        emailTemplates.bookingConfirmation(bookingWithId)
      );

      // Send notification to admin with user's email as reply-to
      await sendAdminEmail(
        `New Booking: ${destination}`,
        emailTemplates.bookingAdminNotification(bookingWithId),
        email // Set the user's email as the reply-to address
      );
    } catch (emailError) {
      console.error('Error sending emails:', emailError);
      // Continue with the booking process even if emails fail
    }

    return NextResponse.json(
      { 
        success: true, 
        message: 'Your booking has been confirmed', 
        bookingId 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Booking confirmation error:', error);
    return NextResponse.json(
      { error: 'Failed to process your booking. Please try again.' },
      { status: 500 }
    );
  }
} 