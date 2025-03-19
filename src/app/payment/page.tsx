'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa';
import BackButton from '@/components/BackButton';
import { getApiUrl } from '@/lib/utils';
import { Suspense } from 'react';

// Client component that safely uses useSearchParams
function PaymentWithSearchParams() {
  const searchParams = useSearchParams();
  
  // Get booking details from URL params
  const destination = searchParams.get('destination');
  const price = searchParams.get('price');
  const travelers = searchParams.get('travelers');
  const date = searchParams.get('date');
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  
  return (
    <PaymentContent 
      destination={destination || ''}
      price={price || ''}
      travelers={travelers || ''}
      date={date || ''}
      name={name || ''}
      email={email || ''}
      phone={phone || ''}
    />
  );
}

// Component that accepts props instead of using useSearchParams directly
function PaymentContent({
  destination,
  price,
  travelers,
  date,
  name,
  email,
  phone
}: {
  destination: string;
  price: string;
  travelers: string;
  date: string;
  name: string;
  email: string;
  phone: string;
}) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    // Add spaces after every 4 digits
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    // Limit to 16 digits (19 with spaces)
    value = value.substring(0, 19);
    setCardDetails({ ...cardDetails, cardNumber: value });
  };
  
  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    setCardDetails({ ...cardDetails, expiryDate: value });
  };
  
  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').substring(0, 3);
    setCardDetails({ ...cardDetails, cvv: value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsProcessing(true);
    setError('');
    
    try {
      // Use the dynamic API URL
      const apiUrl = getApiUrl('/api/booking');
      console.log('Submitting booking to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: name?.split(' ')[0] || '',
          lastName: name?.split(' ').slice(1).join(' ') || '',
          email,
          phone,
          destination,
          date,
          travelers: parseInt(travelers || '1'),
          totalAmount: price || '0',
          cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
          cardName: cardDetails.cardHolder,
          expiryDate: cardDetails.expiryDate,
          cvv: cardDetails.cvv,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process payment');
      }
      
      // Show success message before redirecting
      setPaymentSuccess(true);
      
      // Redirect to confirmation page after a short delay
      setTimeout(() => {
        // Redirect to confirmation page
        const bookingId = data.bookingId || 'BK-' + Math.random().toString(36).substring(2, 8).toUpperCase();
        
        const params = new URLSearchParams({
          destination: destination || '',
          price: price || '',
          travelers: travelers || '',
          date: date || '',
          name: name || '',
          email: email || '',
          bookingId,
        });
        
        window.location.href = `/booking-confirmation?${params.toString()}`;
      }, 2000);
    } catch (err) {
      console.error('Payment processing error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };
  
  const validateForm = () => {
    // Card number validation (16 digits, spaces allowed)
    const cardNumberRegex = /^[\d\s]{16,19}$/;
    if (!cardNumberRegex.test(cardDetails.cardNumber)) {
      setError('Please enter a valid 16-digit card number');
      return false;
    }
    
    // Card holder validation (not empty)
    if (!cardDetails.cardHolder.trim()) {
      setError('Please enter the cardholder name');
      return false;
    }
    
    // Expiry date validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(cardDetails.expiryDate)) {
      setError('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    
    // CVV validation (3 digits)
    if (!/^\d{3}$/.test(cardDetails.cvv)) {
      setError('Please enter a valid 3-digit CVV');
      return false;
    }
    
    return true;
  };
  
  // If payment is successful, show success message
  if (paymentSuccess) {
    return (
      <div className="min-h-screen pt-16 bg-dark-light">
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <FaCheckCircle className="text-6xl text-secondary mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-light mb-4">Payment Successful!</h2>
            <p className="text-light-dark mb-8">
              Your booking has been confirmed. Redirecting to confirmation page...
            </p>
            <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          </motion.div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pt-16 bg-dark-light">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-4xl mx-auto bg-dark rounded-lg shadow-lg overflow-hidden mt-8">
          <div className="p-6 md:p-8">
            <h1 className="text-2xl md:text-3xl font-bold text-light mb-6">Complete Your Booking</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Booking Summary */}
              <div className="bg-dark-light rounded-lg p-6">
                <h2 className="text-xl font-semibold text-light mb-4">Booking Summary</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-light-dark">Destination</p>
                    <p className="text-light font-medium">{destination}</p>
                  </div>
                  
                  <div>
                    <p className="text-light-dark">Travel Date</p>
                    <p className="text-light font-medium">{date}</p>
                  </div>
                  
                  <div>
                    <p className="text-light-dark">Travelers</p>
                    <p className="text-light font-medium">{travelers}</p>
                  </div>
                  
                  <div>
                    <p className="text-light-dark">Contact Information</p>
                    <p className="text-light font-medium">{name}</p>
                    <p className="text-light font-medium">{email}</p>
                    {phone && <p className="text-light font-medium">{phone}</p>}
                  </div>
                  
                  <div className="pt-4 border-t border-dark-light">
                    <p className="text-light-dark">Total Amount</p>
                    <p className="text-2xl font-bold text-primary">${price}</p>
                  </div>
                </div>
              </div>
              
              {/* Payment Form */}
              <div>
                <h2 className="text-xl font-semibold text-light mb-4">Payment Details</h2>
                
                {error && (
                  <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="cardNumber" className="block text-light-dark mb-1">Card Number</label>
                    <div className="relative">
                      <input
                        type="text"
                        id="cardNumber"
                        className="w-full bg-dark-light border border-dark-light rounded-lg px-4 py-2 text-light focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="1234 5678 9012 3456"
                        value={cardDetails.cardNumber}
                        onChange={handleCardNumberChange}
                        required
                      />
                      <FaCreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-dark" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="cardHolder" className="block text-light-dark mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      id="cardHolder"
                      className="w-full bg-dark-light border border-dark-light rounded-lg px-4 py-2 text-light focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="John Doe"
                      value={cardDetails.cardHolder}
                      onChange={(e) => setCardDetails({ ...cardDetails, cardHolder: e.target.value })}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="expiryDate" className="block text-light-dark mb-1">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        className="w-full bg-dark-light border border-dark-light rounded-lg px-4 py-2 text-light focus:outline-none focus:ring-1 focus:ring-primary"
                        placeholder="MM/YY"
                        value={cardDetails.expiryDate}
                        onChange={handleExpiryDateChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="cvv" className="block text-light-dark mb-1">CVV</label>
                      <div className="relative">
                        <input
                          type="text"
                          id="cvv"
                          className="w-full bg-dark-light border border-dark-light rounded-lg px-4 py-2 text-light focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="123"
                          value={cardDetails.cvv}
                          onChange={handleCvvChange}
                          required
                        />
                        <FaLock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-light-dark" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                          Processing...
                        </>
                      ) : (
                        'Complete Payment'
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="mt-4 text-center text-light-dark text-sm">
                  <p>Your payment information is secure and encrypted</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main page component with proper Suspense boundary
export default function Payment() {
  return (
    <Suspense fallback={<div className="min-h-screen pt-16 bg-dark-light flex items-center justify-center">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
    </div>}>
      <PaymentWithSearchParams />
    </Suspense>
  );
}