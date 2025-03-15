'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaEnvelope, FaMapMarkerAlt, FaCalendarAlt, FaUsers, FaCreditCard } from 'react-icons/fa';
import BackButton from '@/components/BackButton';

export default function BookingConfirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const destination = searchParams.get('destination');
  const price = searchParams.get('price');
  const travelers = searchParams.get('travelers');
  const date = searchParams.get('date');
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const bookingId = searchParams.get('bookingId');

  return (
    <div className="min-h-screen pt-16 bg-dark-light">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-start mb-8">
          <BackButton goToHome={true} />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* Success Message */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-block p-4 bg-secondary/20 rounded-full mb-6"
            >
              <FaCheckCircle className="text-6xl text-secondary" />
            </motion.div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-light mb-4">
              Booking Confirmed!
            </h1>
            <p className="text-light-dark text-lg max-w-xl mx-auto">
              Thank you for booking with us. Your travel adventure is now confirmed. We've sent a confirmation email to your inbox.
            </p>
          </div>

          {/* Booking Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-dark p-6 md:p-8 rounded-xl shadow-xl mb-8"
          >
            <h2 className="text-2xl font-bold text-light mb-6 border-b border-dark-lighter pb-4">
              Booking Details
            </h2>
            
            {bookingId && (
              <div className="flex items-start mb-6">
                <div className="bg-primary/10 p-3 rounded-full mr-4">
                  <FaCreditCard className="text-primary text-xl" />
                </div>
                <div>
                  <h3 className="text-light font-medium">Booking ID</h3>
                  <p className="text-light-dark">{bookingId}</p>
                </div>
              </div>
            )}
            
            <div className="flex items-start mb-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <FaMapMarkerAlt className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="text-light font-medium">Destination</h3>
                <p className="text-light-dark">{destination}</p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <FaCalendarAlt className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="text-light font-medium">Travel Date</h3>
                <p className="text-light-dark">{date}</p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <FaUsers className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="text-light font-medium">Number of Travelers</h3>
                <p className="text-light-dark">{travelers}</p>
              </div>
            </div>
            
            <div className="flex items-start mb-6">
              <div className="bg-primary/10 p-3 rounded-full mr-4">
                <FaEnvelope className="text-primary text-xl" />
              </div>
              <div>
                <h3 className="text-light font-medium">Contact Information</h3>
                <p className="text-light-dark">{name}</p>
                <p className="text-light-dark">{email}</p>
              </div>
            </div>
            
            <div className="border-t border-dark-lighter pt-6 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-light font-medium">Total Amount</h3>
                <p className="text-xl font-bold text-secondary">${price}</p>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center"
          >
            <button
              onClick={() => router.push('/')}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md font-semibold transition-colors"
            >
              Return to Home
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 