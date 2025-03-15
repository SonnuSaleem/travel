import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Destination from '@/models/Destination';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      destination, 
      customerName, 
      customerEmail, 
      customerPhone, 
      travelDate, 
      numberOfTravelers, 
      specialRequests 
    } = body;

    if (!destination || !customerName || !customerEmail || !customerPhone || !travelDate || !numberOfTravelers) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields' },
        { status: 400 }
      );
    }

    await connectToDatabase();
    
    // Verify destination exists and get its price
    const destinationDoc = await Destination.findById(destination);
    if (!destinationDoc) {
      return NextResponse.json(
        { success: false, message: 'Destination not found' },
        { status: 404 }
      );
    }

    // Calculate total price
    const totalPrice = destinationDoc.price * numberOfTravelers;

    // Create booking
    const booking = await Booking.create({
      destination,
      customerName,
      customerEmail,
      customerPhone,
      travelDate: new Date(travelDate),
      numberOfTravelers,
      totalPrice,
      status: 'pending',
      specialRequests: specialRequests || '',
      createdAt: new Date()
    });

    return NextResponse.json(
      { success: true, data: booking },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create booking' },
      { status: 500 }
    );
  }
} 