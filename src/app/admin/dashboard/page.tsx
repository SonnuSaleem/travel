'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  FaHome, FaChartLine, FaUsers, FaCalendarCheck, 
  FaMoneyBillWave, FaGlobe, FaSignOutAlt, FaEye,
  FaSync, FaExclamationTriangle
} from 'react-icons/fa';
import { 
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from 'recharts';

// Types for dashboard data
interface RevenueData {
  month: string;
  revenue: number;
}

interface DestinationRevenue {
  name: string;
  revenue: number;
  bookings: number;
  color: string;
}

interface Booking {
  id: string;
  destination: string;
  customer: string;
  date: string;
  amount: number;
  email: string;
}

interface DashboardData {
  totalRevenue: number;
  revenueData: RevenueData[];
  destinationRevenue: DestinationRevenue[];
  recentBookings: Booking[];
  activeUsers: number;
  totalBookings: number;
  totalDestinations: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [timeFrame, setTimeFrame] = useState<'1M' | '6M' | '1Y'>('1M');
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Check if authenticated
  useEffect(() => {
    setIsClient(true);
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated || isAuthenticated !== 'true') {
      router.push('/admin');
      return;
    }

    // Fetch dashboard data initially
    fetchDashboardData();

    // Set up interval to refresh data every 30 seconds
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);

    return () => clearInterval(interval);
  }, [router, timeFrame, fetchDashboardData]);

  // Function to fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/admin/dashboard?timeFrame=${timeFrame}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch dashboard data');
      }
      
      const data = await response.json();
      setDashboardData(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [timeFrame]);

  // Function to handle revenue reset
  const handleResetRevenue = async (type: 'manual' | 'annual') => {
    if (!confirm(`Are you sure you want to ${type === 'annual' ? 'perform annual' : 'manually'} reset the revenue data?`)) {
      return;
    }
    
    try {
      setIsResetting(true);
      const response = await fetch(`/api/admin/reset-revenue?type=${type}`, {
        method: 'POST'
      });
      
      if (!response.ok) {
        throw new Error('Failed to reset revenue data');
      }
      
      setResetSuccess(`Revenue data ${type === 'annual' ? 'annual' : 'manual'} reset successful!`);
      
      // Refresh dashboard data after reset
      fetchDashboardData();
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setResetSuccess(null);
      }, 5000);
    } catch (err) {
      console.error('Error resetting revenue:', err);
      setError('Failed to reset revenue data. Please try again.');
    } finally {
      setIsResetting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    router.push('/admin');
  };

  // Calculate filtered revenue data based on selected time frame
  const getFilteredRevenueData = () => {
    if (!dashboardData) return [];
    
    if (timeFrame === '1M') return dashboardData.revenueData.slice(-1);
    if (timeFrame === '6M') return dashboardData.revenueData.slice(-6);
    return dashboardData.revenueData;
  };

  if (!isClient) {
    return null; // Prevent hydration errors
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-10">
        <div className="flex flex-col h-full">
          <div className="p-6 border-b">
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Travel Agency Management</p>
          </div>
          
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              <li>
                <a href="#overview" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <FaChartLine className="mr-3" />
                  Overview
                </a>
              </li>
              <li>
                <a href="#revenue" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <FaMoneyBillWave className="mr-3" />
                  Revenue
                </a>
              </li>
              <li>
                <a href="#bookings" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <FaCalendarCheck className="mr-3" />
                  Bookings
                </a>
              </li>
              <li>
                <a href="#analytics" className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors">
                  <FaUsers className="mr-3" />
                  User Analytics
                </a>
              </li>
            </ul>
          </nav>
          
          <div className="p-4 border-t">
            <Link 
              href="/"
              className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <FaHome className="mr-3" />
              Go to Home
            </Link>
            <button 
              onClick={handleLogout}
              className="flex items-center w-full p-3 mt-2 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <FaSignOutAlt className="mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Loading State */}
        {isLoading && !dashboardData && (
          <div className="flex items-center justify-center h-screen -mt-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            <div className="flex items-center">
              <FaExclamationTriangle className="mr-2" />
              <span>{error}</span>
            </div>
            <button 
              onClick={fetchDashboardData}
              className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Reset Success Message */}
        {resetSuccess && (
          <div className="bg-green-50 text-green-600 p-4 rounded-md mb-6">
            {resetSuccess}
          </div>
        )}

        {dashboardData && (
          <>
            {/* Overview Section */}
            <section id="overview" className="mb-10">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleResetRevenue('annual')}
                    disabled={isResetting}
                    className="flex items-center px-4 py-2 bg-amber-100 text-amber-700 rounded-md hover:bg-amber-200 transition-colors disabled:opacity-50"
                  >
                    <FaSync className={`mr-2 ${isResetting ? 'animate-spin' : ''}`} />
                    Annual Reset
                  </button>
                  <button
                    onClick={() => handleResetRevenue('manual')}
                    disabled={isResetting}
                    className="flex items-center px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors disabled:opacity-50"
                  >
                    <FaSync className={`mr-2 ${isResetting ? 'animate-spin' : ''}`} />
                    Manual Reset
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Total Revenue Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-600">Total Revenue</h3>
                    <FaMoneyBillWave className="text-green-500 text-xl" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">${dashboardData.totalRevenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-2">Based on selected time frame</p>
                </div>
                
                {/* Active Users Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-600">Active Users</h3>
                    <FaUsers className="text-blue-500 text-xl" />
                  </div>
                  <div className="flex items-center">
                    <p className="text-3xl font-bold text-gray-800">{dashboardData.activeUsers}</p>
                    <span className="ml-2 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
                      Live
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Currently browsing the site</p>
                </div>
                
                {/* Total Bookings Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-600">Total Bookings</h3>
                    <FaCalendarCheck className="text-purple-500 text-xl" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{dashboardData.totalBookings.toLocaleString()}</p>
                  <p className="text-sm text-gray-500 mt-2">All time bookings</p>
                </div>
                
                {/* Destinations Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-600">Destinations</h3>
                    <FaGlobe className="text-amber-500 text-xl" />
                  </div>
                  <p className="text-3xl font-bold text-gray-800">{dashboardData.totalDestinations}</p>
                  <p className="text-sm text-gray-500 mt-2">Available destinations</p>
                </div>
              </div>
            </section>

            {/* Revenue Section */}
            <section id="revenue" className="mb-10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Revenue Analytics</h2>
                
                <div className="flex bg-white rounded-lg shadow-sm border">
                  <button 
                    onClick={() => setTimeFrame('1M')} 
                    className={`px-4 py-2 text-sm font-medium ${timeFrame === '1M' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'} rounded-l-lg transition-colors`}
                  >
                    1 Month
                  </button>
                  <button 
                    onClick={() => setTimeFrame('6M')} 
                    className={`px-4 py-2 text-sm font-medium ${timeFrame === '6M' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'} transition-colors`}
                  >
                    6 Months
                  </button>
                  <button 
                    onClick={() => setTimeFrame('1Y')} 
                    className={`px-4 py-2 text-sm font-medium ${timeFrame === '1Y' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'} rounded-r-lg transition-colors`}
                  >
                    1 Year
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Revenue Chart */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Revenue Over Time</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={getFilteredRevenueData()}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                        <Legend />
                        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Destination Revenue */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">Revenue by Destination</h3>
                  <div className="h-80">
                    {dashboardData.destinationRevenue.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={dashboardData.destinationRevenue}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="revenue"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {dashboardData.destinationRevenue.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
                        </PieChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">No destination revenue data available</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Destination Revenue Table */}
              <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Destination
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        1 Month Revenue
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        6 Months Revenue
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        1 Year Revenue
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bookings
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {dashboardData.destinationRevenue.length > 0 ? (
                      dashboardData.destinationRevenue.map((destination, index) => (
                        <tr key={destination.name} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: destination.color }}></div>
                              <div className="text-sm font-medium text-gray-900">{destination.name}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${Math.round(destination.revenue / 12).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${Math.round(destination.revenue / 2).toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            ${destination.revenue.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {destination.bookings}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-500">
                          No destination revenue data available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Recent Bookings Section */}
            <section id="bookings" className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Bookings</h2>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                        Date
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
                    {dashboardData.recentBookings.length > 0 ? (
                      dashboardData.recentBookings.map((booking, index) => (
                        <tr key={booking.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                            {booking.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {booking.customer}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.destination}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {new Date(booking.date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${booking.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Confirmed
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                          No recent bookings available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>

            {/* User Analytics Section */}
            <section id="analytics" className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">User Analytics</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Active Users Card */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-gray-700">Real-time Users</h3>
                    <div className="flex items-center text-green-600">
                      <FaEye className="mr-1" />
                      <span className="text-sm">Live</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center mb-6">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                      <FaUsers className="text-blue-600 text-2xl" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold text-gray-800">{dashboardData.activeUsers}</p>
                      <p className="text-sm text-gray-500">Active users on site</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Homepage</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-800 mr-2">{Math.round(dashboardData.activeUsers * 0.4)}</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '40%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Destinations</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-800 mr-2">{Math.round(dashboardData.activeUsers * 0.3)}</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Booking</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-800 mr-2">{Math.round(dashboardData.activeUsers * 0.2)}</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Other Pages</span>
                      <div className="flex items-center">
                        <span className="text-sm font-medium text-gray-800 mr-2">{Math.round(dashboardData.activeUsers * 0.1)}</span>
                        <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* User Devices Chart */}
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-lg font-medium text-gray-700 mb-4">User Devices</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: 'Mobile', users: 65 },
                          { name: 'Desktop', users: 40 },
                          { name: 'Tablet', users: 23 },
                        ]}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip />
                        <Bar dataKey="users" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
} 