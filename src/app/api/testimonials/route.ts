import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Testimonial from '@/models/Testimonial';

export async function GET() {
  try {
    await connectToDatabase();
    const testimonials = await Testimonial.find({}).sort({ date: -1 });
    
    return NextResponse.json({ success: true, data: testimonials });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
} 