'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa';
import BackButton from '@/components/BackButton';

function PaymentContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState<'credit' | 'master' | null>(null);
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  // Get booking details from URL params
  const destination = searchParams.get('destination');
  const price = searchParams.get('price');
  const travelers = searchParams.get('travelers');
  const date = searchParams.get('date');
  const name = searchParams.get('name');
  const email = searchParams.get('email');

  const handleCardSelect = (type: 'credit' | 'master') => {
    setSelectedCard(type);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    }
    // Format expiry date
    if (name === 'expiryDate') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .substring(0, 5);
    }
    // Limit CVV to 3 digits
    if (name === 'cvv') {
      formattedValue = value.substring(0, 3);
    }

    setCardDetails(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Validate card details
    if (!validateCardDetails()) {
      setIsProcessing(false);
      return;
    }

    try {
      // Prepare booking data
      const bookingData = {
        firstName: name?.split(' ')[0] || '',
        lastName: name?.split(' ').slice(1).join(' ') || '',
        email: email || '',
        phone: searchParams.get('phone') || '123456789', // Default phone if not provided
        packageName: searchParams.get('package') || destination || '',
        destination: destination || '',
        travelDate: date || new Date().toISOString().split('T')[0],
        travelers: travelers || '1',
        totalAmount: price || '0',
        cardNumber: cardDetails.cardNumber.replace(/\s/g, ''),
        cardHolder: cardDetails.cardHolder,
        expiryDate: cardDetails.expiryDate
      };

      // Log the data being sent to help debug
      console.log('Sending booking data:', bookingData);

      // Send booking data to API
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Payment processing failed');
      }

      // Redirect to confirmation page with booking ID
      setPaymentSuccess(true);
      
      // Redirect to confirmation page after a short delay
      setTimeout(() => {
        const params = new URLSearchParams({
          destination: destination || '',
          price: price || '',
          travelers: travelers || '',
          date: date || '',
          name: name || '',
          email: email || '',
          bookingId: data.bookingId || ''
        });
        router.push(`/booking-confirmation?${params.toString()}`);
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed: ' + (error instanceof Error ? error.message : 'Unknown error'));
      setIsProcessing(false);
    }
  };

  const validateCardDetails = () => {
    // Card number validation (16 digits, spaces allowed)
    const cardNumberRegex = /^[\d\s]{16,19}$/;
    const cardNumberWithoutSpaces = cardDetails.cardNumber.replace(/\s/g, '');
    if (!cardNumberRegex.test(cardDetails.cardNumber) || cardNumberWithoutSpaces.length !== 16) {
      alert('Please enter a valid 16-digit card number');
      return false;
    }

    // Card holder validation (not empty, only letters and spaces)
    if (!cardDetails.cardHolder || !/^[A-Za-z\s]+$/.test(cardDetails.cardHolder)) {
      alert('Please enter a valid card holder name');
      return false;
    }

    // Expiry date validation (MM/YY format)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(cardDetails.expiryDate)) {
      alert('Please enter a valid expiry date (MM/YY)');
      return false;
    }

    // Check if card is expired
    const [month, year] = cardDetails.expiryDate.split('/');
    const expiryDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    const currentDate = new Date();
    if (expiryDate < currentDate) {
      alert('Your card has expired');
      return false;
    }

    // CVV validation (3 digits)
    if (!/^\d{3}$/.test(cardDetails.cvv)) {
      alert('Please enter a valid 3-digit CVV');
      return false;
    }

    return true;
  };

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
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-dark-light">
      <BackButton />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-dark rounded-xl shadow-2xl p-8"
          >
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-dark-light">
              <h1 className="text-2xl font-bold text-light">Complete Your Payment</h1>
              <div className="flex items-center text-accent">
                <FaLock className="mr-2" />
                <span>Secure Payment</span>
              </div>
            </div>

            {/* Booking Summary */}
            <div className="mb-8 p-6 bg-dark-light/30 rounded-lg">
              <h2 className="text-xl font-semibold text-light mb-4">Booking Summary</h2>
              <div className="space-y-2 text-light-dark">
                <p><span className="font-medium">Destination:</span> {destination}</p>
                <p><span className="font-medium">Travel Date:</span> {new Date(date || '').toLocaleDateString()}</p>
                <p><span className="font-medium">Travelers:</span> {travelers}</p>
                <p><span className="font-medium">Total Amount:</span> <span className="text-xl font-bold text-secondary">${price}</span></p>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-light mb-4">Select Payment Method</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleCardSelect('credit')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCard === 'credit'
                      ? 'border-primary bg-primary/10'
                      : 'border-dark-light hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center">
                    <FaCreditCard className="text-2xl text-primary mr-3" />
                    <div className="text-left">
                      <p className="font-semibold text-light">Credit Card</p>
                      <p className="text-sm text-light-dark">Visa, American Express</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => handleCardSelect('master')}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedCard === 'master'
                      ? 'border-primary bg-primary/10'
                      : 'border-dark-light hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center">
                    <FaCreditCard className="text-2xl text-primary mr-3" />
                    <div className="text-left">
                      <p className="font-semibold text-light">Mastercard</p>
                      <p className="text-sm text-light-dark">Debit or Credit</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="cardNumber" className="block text-light font-medium mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={handleInputChange}
                  maxLength={19}
                  className="w-full px-4 py-3 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-light"
                  required
                />
              </div>

              <div>
                <label htmlFor="cardHolder" className="block text-light font-medium mb-2">
                  Card Holder Name
                </label>
                <input
                  type="text"
                  id="cardHolder"
                  name="cardHolder"
                  placeholder="John Doe"
                  value={cardDetails.cardHolder}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-light"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiryDate" className="block text-light font-medium mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={cardDetails.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-light"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="cvv" className="block text-light font-medium mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    placeholder="123"
                    value={cardDetails.cvv}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-dark-light border border-dark-lighter rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-light"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-primary via-accent to-secondary hover:opacity-90 text-light font-bold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <FaCreditCard className="mr-2" />
                    Pay ${price}
                  </>
                )}
              </button>

              <p className="text-center text-light-dark text-sm mt-4">
                By proceeding with the payment, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Payment() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-dark-light flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>}>
      <PaymentContent />
    </Suspense>
  );
} 