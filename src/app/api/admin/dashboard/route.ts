import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// Mock data for when database connection fails
const mockDashboardData = {
  totalRevenue: 12500,
  revenueData: [
    { month: 'Jan', revenue: 1200 },
    { month: 'Feb', revenue: 1900 },
    { month: 'Mar', revenue: 800 },
    { month: 'Apr', revenue: 1600 },
    { month: 'May', revenue: 900 },
    { month: 'Jun', revenue: 1700 },
    { month: 'Jul', revenue: 1100 },
    { month: 'Aug', revenue: 1400 },
    { month: 'Sep', revenue: 1000 },
    { month: 'Oct', revenue: 900 },
    { month: 'Nov', revenue: 1500 },
    { month: 'Dec', revenue: 2000 }
  ],
  destinationRevenue: [
    { name: 'Paris', revenue: 4500, bookings: 15, color: '#3B82F6' },
    { name: 'Bali', revenue: 3200, bookings: 12, color: '#10B981' },
    { name: 'Tokyo', revenue: 2800, bookings: 10, color: '#F59E0B' },
    { name: 'New York', revenue: 2000, bookings: 8, color: '#EF4444' }
  ],
  recentBookings: [
    { id: 'BK001', destination: 'Paris', customer: 'John Doe', date: '2023-10-15', amount: 1200, email: 'john@example.com' },
    { id: 'BK002', destination: 'Bali', customer: 'Jane Smith', date: '2023-10-12', amount: 950, email: 'jane@example.com' },
    { id: 'BK003', destination: 'Tokyo', customer: 'Mike Johnson', date: '2023-10-10', amount: 1400, email: 'mike@example.com' }
  ],
  activeUsers: 125,
  totalBookings: 45,
  totalDestinations: 12
};

export async function GET() {
  try {
    try {
      // Try to connect to the database
      await connectToDatabase();
      
      // If we get here, the database connection was successful
      // For now, we'll still return mock data to simplify deployment
      return NextResponse.json(mockDashboardData);
      
      // In a real implementation, you would query the database here
      // and return actual data instead of mock data
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      // Return mock data if database connection fails
      return NextResponse.json(mockDashboardData);
    }
  } catch (error) {
    console.error('Error in dashboard API route:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 