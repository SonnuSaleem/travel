import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

// Function to get the start date for different time frames
function getStartDate(timeFrame: string): Date {
  const now = new Date();
  switch (timeFrame) {
    case '1M':
      return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    case '6M':
      return new Date(now.getFullYear(), now.getMonth() - 6, now.getDate());
    case '1Y':
    default:
      return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const timeFrame = searchParams.get('timeFrame') || '1Y';
    
    const db = await connectToDatabase();
    const bookingsCollection = db.collection('bookings');
    const analyticsCollection = db.collection('analytics');
    const destinationsCollection = db.collection('destinations');
    
    // Get start date based on time frame
    const startDate = getStartDate(timeFrame);
    
    // Get total revenue
    const revenueAggregation = await bookingsCollection.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: { $toDouble: "$totalAmount" } }
        }
      }
    ]).toArray();
    
    const totalRevenue = revenueAggregation.length > 0 ? revenueAggregation[0].totalRevenue : 0;
    
    // Get monthly revenue data
    const monthlyRevenueAggregation = await bookingsCollection.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(new Date().getFullYear() - 1, 0, 1) }
        }
      },
      {
        $group: {
          _id: { 
            year: { $year: "$createdAt" },
            month: { $month: "$createdAt" }
          },
          revenue: { $sum: { $toDouble: "$totalAmount" } }
        }
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 }
      }
    ]).toArray();
    
    // Format monthly revenue data
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const revenueData = Array(12).fill(0).map((_, index) => ({
      month: months[index],
      revenue: 0
    }));
    
    monthlyRevenueAggregation.forEach(item => {
      const monthIndex = item._id.month - 1;
      revenueData[monthIndex].revenue = item.revenue;
    });
    
    // Get revenue by destination
    const destinationRevenueAggregation = await bookingsCollection.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate }
        }
      },
      {
        $group: {
          _id: "$destination",
          revenue: { $sum: { $toDouble: "$totalAmount" } },
          bookings: { $sum: 1 }
        }
      },
      {
        $sort: { revenue: -1 }
      },
      {
        $limit: 6
      }
    ]).toArray();
    
    // Get destination colors
    const destinationColors = {
      'Paris': '#3B82F6',
      'Bali': '#10B981',
      'Tokyo': '#F59E0B',
      'New York': '#EF4444',
      'Swiss Alps': '#8B5CF6',
      'Santorini': '#EC4899'
    };
    
    // Format destination revenue data
    const destinationRevenue = destinationRevenueAggregation.map(item => ({
      name: item._id,
      revenue: item.revenue,
      bookings: item.bookings,
      color: destinationColors[item._id as keyof typeof destinationColors] || '#6B7280'
    }));
    
    // Get recent bookings
    const recentBookings = await bookingsCollection.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .toArray();
    
    // Format recent bookings data
    const formattedRecentBookings = recentBookings.map(booking => ({
      id: booking.bookingId,
      destination: booking.destination,
      customer: `${booking.firstName} ${booking.lastName}`,
      date: booking.createdAt,
      amount: parseFloat(booking.totalAmount),
      email: booking.email
    }));
    
    // Get active users (from analytics collection or use a default value)
    const activeUsersData = await analyticsCollection.findOne({ type: 'activeUsers' });
    const activeUsers = activeUsersData?.count || Math.floor(Math.random() * 50) + 80;
    
    // Get total bookings
    const totalBookings = await bookingsCollection.countDocuments({});
    
    // Get total destinations
    const totalDestinations = await destinationsCollection.countDocuments({});
    
    return NextResponse.json({
      totalRevenue,
      revenueData,
      destinationRevenue,
      recentBookings: formattedRecentBookings,
      activeUsers,
      totalBookings,
      totalDestinations
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 