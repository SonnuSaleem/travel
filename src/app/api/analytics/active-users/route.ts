import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { action } = await request.json();
    
    const db = await connectToDatabase();
    const analyticsCollection = db.collection('analytics');
    
    // Get current active users count
    const activeUsersData = await analyticsCollection.findOne({ type: 'activeUsers' });
    
    let count = activeUsersData?.count || 0;
    
    // Update count based on action
    if (action === 'join') {
      count += 1;
    } else if (action === 'leave') {
      count = Math.max(0, count - 1);
    }
    
    // Update or insert the active users count
    await analyticsCollection.updateOne(
      { type: 'activeUsers' },
      { $set: { count, lastUpdated: new Date() } },
      { upsert: true }
    );
    
    return NextResponse.json({
      success: true,
      activeUsers: count
    });
  } catch (error) {
    console.error('Error updating active users:', error);
    return NextResponse.json(
      { error: 'Failed to update active users' },
      { status: 500 }
    );
  }
} 