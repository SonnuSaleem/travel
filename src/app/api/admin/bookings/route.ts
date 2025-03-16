import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// Mock data for when database connection fails
const mockBookings = [
  {
    bookingId: 'BK-12345678',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    destination: 'Paris',
    travelDate: '2023-12-15',
    travelers: 2,
    totalAmount: '1200',
    status: 'confirmed',
    createdAt: new Date('2023-11-01')
  },
  {
    bookingId: 'BK-87654321',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane@example.com',
    destination: 'Tokyo',
    travelDate: '2023-12-20',
    travelers: 1,
    totalAmount: '1500',
    status: 'confirmed',
    createdAt: new Date('2023-11-02')
  }
];

// Simple authentication middleware
const authenticate = (request: NextRequest) => {
  // In a real app, you would validate a token or session
  // For now, we'll just check if the admin is authenticated via a header
  const authHeader = request.headers.get('x-admin-auth');
  return authHeader === 'true';
};

export async function GET(request: NextRequest) {
  // Check authentication
  if (!authenticate(request)) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    try {
      // Connect to database
      const db = await connectToDatabase();
      
      // Get bookings from database
      const bookings = await db.collection('bookings')
        .find({})
        .sort({ createdAt: -1 })
        .limit(50)
        .toArray();
      
      return NextResponse.json({
        success: true,
        bookings
      });
    } catch (dbError) {
      console.error('Database error:', dbError);
      
      // Return mock data if database connection fails
      return NextResponse.json({
        success: true,
        bookings: mockBookings,
        note: 'Using mock data due to database connection issues'
      });
    }
  } catch (error) {
    console.error('Admin bookings API error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
} 