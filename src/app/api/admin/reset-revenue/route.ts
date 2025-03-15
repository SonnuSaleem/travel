import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const resetType = searchParams.get('type') || 'manual';
    
    const db = await connectToDatabase();
    const revenueResetCollection = db.collection('revenueResets');
    
    // Create a record of this reset
    await revenueResetCollection.insertOne({
      type: resetType,
      resetDate: new Date(),
      resetBy: 'admin'
    });
    
    // If it's an annual reset, we don't actually delete data
    // We just mark the reset point so we can filter data after this date
    // For manual reset, we could optionally archive the data instead of just tracking the reset
    
    return NextResponse.json({
      success: true,
      message: `Revenue data ${resetType === 'annual' ? 'annual' : 'manual'} reset point created successfully`,
      resetDate: new Date()
    });
  } catch (error) {
    console.error('Error resetting revenue data:', error);
    return NextResponse.json(
      { error: 'Failed to reset revenue data' },
      { status: 500 }
    );
  }
} 