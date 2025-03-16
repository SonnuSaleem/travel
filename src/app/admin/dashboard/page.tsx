'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaHome, FaSignOutAlt, FaCalendarCheck, FaExclamationTriangle
} from 'react-icons/fa';

// Simplified dashboard data interface
interface DashboardData {
  totalRevenue: number;
  totalBookings: number;
  totalDestinations: number;
  activeUsers: number;
}

interface Booking {
  bookingId: string;
  firstName: string;
  lastName: string;
  email: string;
  destination: string;
  travelDate: string;
  travelers: number;
  totalAmount: string;
  status: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    totalRevenue: 12500,
    totalBookings: 45,
    totalDestinations: 12,
    activeUsers: 125
  });
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [isLoadingBookings, setIsLoadingBookings] = useState(false);

  // Function to fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      const response = await fetch('/api/admin/dashboard');
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      setDashboardData({
        totalRevenue: data.totalRevenue || 0,
        totalBookings: data.totalBookings || 0,
        totalDestinations: data.totalDestinations || 0,
        activeUsers: data.activeUsers || 0
      });
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    }
  }, []);

  // Function to fetch bookings
  const fetchBookings = useCallback(async () => {
    try {
      setIsLoadingBookings(true);
      // Add admin auth header for simple authentication
      const response = await fetch('/api/admin/bookings', {
        headers: {
          'x-admin-auth': 'true'
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      
      const data = await response.json();
      setBookings(data.bookings || []);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      // Don't set error state to avoid disrupting the dashboard
    } finally {
      setIsLoadingBookings(false);
    }
  }, []);

  // Check if user is authenticated
  useEffect(() => {
    setIsClient(true);
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated || isAuthenticated !== 'true') {
      router.push('/admin');
      return;
    }

    fetchDashboardData();
    fetchBookings();
  }, [router, fetchDashboardData, fetchBookings]);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    router.push('/admin');
  };

  // Show loading state if not on client yet
  if (!isClient) {
    return <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-blue-600 text-white shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <p className="text-blue-200 text-sm">Welcome, Admin</p>
        </div>
        
        <nav className="mt-6">
          <Link href="/" className="flex items-center px-6 py-3 text-blue-100 hover:bg-blue-700">
            <FaHome className="mr-3" />
            <span>Back to Website</span>
          </Link>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-6 py-3 text-blue-100 hover:bg-blue-700"
          >
            <FaSignOutAlt className="mr-3" />
            <span>Logout</span>
          </button>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Dashboard Overview</h1>
          <p className="text-gray-600">Welcome to your admin dashboard</p>
        </div>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-md">
            {error}
          </div>
        )}
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-gray-800">${dashboardData.totalRevenue.toLocaleString()}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Total Bookings</h3>
            <p className="text-3xl font-bold text-gray-800">{dashboardData.totalBookings}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Destinations</h3>
            <p className="text-3xl font-bold text-gray-800">{dashboardData.totalDestinations}</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-gray-500 text-sm font-medium mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-gray-800">{dashboardData.activeUsers}</p>
          </div>
        </div>
        
        {/* Bookings Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <FaCalendarCheck className="text-blue-500 mr-2" />
              <h2 className="text-xl font-bold text-gray-800">Recent Bookings</h2>
            </div>
            <button 
              onClick={fetchBookings}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors"
            >
              Refresh
            </button>
          </div>
          
          {isLoadingBookings ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Booking ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Destination
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Travel Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking, index) => (
                    <tr key={booking.bookingId} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                        {booking.bookingId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.firstName} {booking.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {booking.destination}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(booking.travelDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${booking.totalAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <FaExclamationTriangle className="mx-auto text-2xl text-gray-400 mb-2" />
              <p>No bookings found. New bookings will appear here after customers complete their payments.</p>
            </div>
          )}
        </div>
        
        {/* Database Connection Status */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Database Connection Status</h2>
          <p className="text-gray-600">
            The dashboard is configured to store booking information in MongoDB. Make sure your database connection is properly set up.
          </p>
          <div className="mt-4 p-4 bg-yellow-50 text-yellow-700 rounded-md">
            <p>
              <strong>Note:</strong> To set up your database connection, add a valid MongoDB connection string to your environment variables as <code>DATABASE_URL</code>.
              The connection string should start with <code>mongodb://</code> or <code>mongodb+srv://</code>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 