'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCalendarAlt, FaUsers, FaPhone, FaEnvelope, FaUser, FaCommentDots, FaCreditCard } from 'react-icons/fa';

interface BookingFormProps {
  destinationId: string;
  destinationName: string;
  price: number;
}

const BookingForm = ({ destinationId, destinationName, price }: BookingFormProps) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    travelDate: '',
    numberOfTravelers: '1',
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // In a real application, this would send the booking data to a backend API
      // For now, we'll redirect to the payment page
      console.log('Booking data:', {
        destinationId,
        destinationName,
        ...formData,
        totalPrice: price * parseInt(formData.numberOfTravelers)
      });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to payment page with booking details
      const totalPrice = price * parseInt(formData.numberOfTravelers);
      const searchParams = new URLSearchParams({
        destination: destinationName,
        price: totalPrice.toString(),
        travelers: formData.numberOfTravelers,
        date: formData.travelDate,
        name: formData.customerName,
        email: formData.customerEmail,
        phone: formData.customerPhone,
        package: destinationName
      });
      
      router.push(`/payment?${searchParams.toString()}`);
    } catch (err) {
      setError('An error occurred while processing your booking. Please try again.');
      console.error('Booking error:', err);
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-dark rounded-lg shadow-xl p-6 border border-accent/20 sticky top-24"
    >
      <div className="bg-gradient-to-r from-primary to-secondary p-px rounded-t-lg -mt-6 -mx-6 mb-6">
        <h3 className="text-2xl font-bold text-light p-4 flex items-center justify-between">
          <span>Book Your Trip</span>
          <span className="text-3xl">${price}</span>
        </h3>
      </div>
      
      {error && (
        <div className="bg-primary/20 text-primary p-4 rounded-md mb-6">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="customerName" className="block text-light font-medium mb-2">Your Name</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUser className="text-accent" />
            </div>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 bg-dark-light border border-dark-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-light"
              placeholder="Full Name"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="customerEmail" className="block text-light font-medium mb-2">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaEnvelope className="text-accent" />
            </div>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 bg-dark-light border border-dark-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-light"
              placeholder="your@email.com"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="customerPhone" className="block text-light font-medium mb-2">Phone Number</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaPhone className="text-accent" />
            </div>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 bg-dark-light border border-dark-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-light"
              placeholder="+1 (123) 456-7890"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="travelDate" className="block text-light font-medium mb-2">Travel Date</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaCalendarAlt className="text-accent" />
            </div>
            <input
              type="date"
              id="travelDate"
              name="travelDate"
              value={formData.travelDate}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="block w-full pl-10 pr-3 py-3 bg-dark-light border border-dark-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-light calendar-white"
              required
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="numberOfTravelers" className="block text-light font-medium mb-2">Number of Travelers</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaUsers className="text-accent" />
            </div>
            <select
              id="numberOfTravelers"
              name="numberOfTravelers"
              value={formData.numberOfTravelers}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 bg-dark-light border border-dark-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-light appearance-none"
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'Traveler' : 'Travelers'}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label htmlFor="specialRequests" className="block text-light font-medium mb-2">Special Requests (Optional)</label>
          <div className="relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <FaCommentDots className="text-accent" />
            </div>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 bg-dark-light border border-dark-light rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent text-light min-h-[100px]"
              placeholder="Any special requirements or requests..."
            ></textarea>
          </div>
        </div>
        
        <div className="pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-light font-medium">Total Price:</span>
            <span className="text-secondary text-2xl font-bold">${price * parseInt(formData.numberOfTravelers)}</span>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-light font-bold py-4 px-6 rounded-md transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isSubmitting ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              <span className="flex items-center">
                <FaCreditCard className="mr-2" />
                Proceed to Payment
              </span>
            )}
          </button>
          
          <p className="text-light-dark text-sm text-center mt-4">
            By proceeding, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </form>
    </motion.div>
  );
};

export default BookingForm; 