import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Destination from '@/models/Destination';

export async function GET() {
  try {
    await connectToDatabase();
    const destinations = await Destination.find({}).sort({ createdAt: -1 });
    
    return NextResponse.json({ success: true, data: destinations });
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
} 