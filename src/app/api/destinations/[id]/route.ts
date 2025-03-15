import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Destination from '@/models/Destination';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    await connectToDatabase();
    const destination = await Destination.findById(id);
    
    if (!destination) {
      return NextResponse.json(
        { success: false, message: 'Destination not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, data: destination });
  } catch (error) {
    console.error('Error fetching destination:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch destination' },
      { status: 500 }
    );
  }
} 