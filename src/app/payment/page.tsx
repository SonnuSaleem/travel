'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaQrcode, FaCopy, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import BackButton from '@/components/BackButton';
import { Suspense } from 'react';
import Image from 'next/image';

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
  const [showJazzCashDetails, setShowJazzCashDetails] = useState(false);
  const [showEasyPaisaDetails, setShowEasyPaisaDetails] = useState(false);
  const [copySuccess, setCopySuccess] = useState('');
  const [copyAnimation, setCopyAnimation] = useState('');
  
  const jazzCashIban = "PK64JCMA2411923258894708";
  const easyPaisaIban = "PK70TMFB0000000087175402";
  
  const handleCopyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyAnimation(type);
      setCopySuccess(`Copied!`);
      setTimeout(() => {
        setCopyAnimation('');
      }, 1500);
    }, (err) => {
      console.error('Could not copy text: ', err);
      setCopySuccess('Failed to copy');
      setTimeout(() => setCopySuccess(''), 3000);
    });
  };
  
  // State for mobile tip
  const [showMobileTip, setShowMobileTip] = useState(false);
  
  // Auto-hide tip after 5 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showMobileTip) {
      timer = setTimeout(() => {
        setShowMobileTip(false);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [showMobileTip]);
  
  // Function to toggle the exclusive dropdown
  const toggleDropdown = (dropdown: string) => {
    if (dropdown === 'jazzCash') {
      setShowJazzCashDetails(!showJazzCashDetails);
      if (!showJazzCashDetails) setShowEasyPaisaDetails(false);
    } else if (dropdown === 'easyPaisa') {
      setShowEasyPaisaDetails(!showEasyPaisaDetails);
      if (!showEasyPaisaDetails) setShowJazzCashDetails(false);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsProcessing(true);
    setError('');
    
    try {
      console.log('Processing payment confirmation...');
      
      const response = await fetch('/api/booking', {
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
          travelDate: date,
          travelers: parseInt(travelers || '1'),
          totalAmount: price || '0',
          paymentMethod: 'manual_transfer'
        }),
      });
      
      console.log('Payment API Response Status:', response.status);
      console.log('Payment API Response Status Text:', response.statusText);
      
      const data = await response.json();
      console.log('Payment API Response Data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process confirmation');
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
      console.error('Confirmation processing error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process confirmation. Please try again.');
    } finally {
      setIsProcessing(false);
    }
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
            <h2 className="text-2xl font-bold text-light mb-4">Booking Under Processing!</h2>
            <p className="text-light-dark mb-8">
              Thank you for your booking. Your request is being processed. Redirecting to details page...
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
              {/* For mobile: Show payment options first and booking summary second */}
              <div className="md:order-2">
                <h2 className="text-xl font-semibold text-light mb-4">Payment Options</h2>
                
                {error && (
                  <div className="bg-red-900/30 border border-red-500/50 text-red-200 px-4 py-3 rounded mb-4">
                    <p>{error}</p>
                  </div>
                )}
                
                <div className="bg-dark-light rounded-lg p-4 mb-4">
                  <h3 className="text-light font-semibold mb-3 flex items-center">
                    <FaQrcode className="mr-2" /> Scan QR Code to Pay
                  </h3>
                  <div className="flex justify-center bg-white p-4 rounded-lg relative">
                    <Image
                      src="/images/QR.jpg"
                      alt="Payment QR Code"
                      width={200}
                      height={200}
                      className="mx-auto"
                    />
                  </div>
                  <div className="flex justify-center mt-2">
                    <a 
                      href="/images/QR.jpg" 
                      download="safarnama-payment-qr.jpg"
                      className="bg-dark-light/80 hover:bg-dark-light p-2 rounded-full text-light hover:text-primary transition-colors inline-flex items-center"
                      title="Download QR Code"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                        <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                      </svg>
                    </a>
                  </div>
                  <p className="text-light-dark text-sm text-center mt-3">
                    Scan the QR code with your banking app to make the payment
                  </p>
                  <div className="mt-3">
                    <button
                      onClick={() => setShowMobileTip(!showMobileTip)}
                      className="text-primary text-sm font-medium hover:text-secondary transition-colors w-full text-center no-focus-outline"
                    >
                      Mobile User Tip
                    </button>
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        showMobileTip ? 'max-h-20 opacity-100 mt-2' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <p className="text-light-dark text-xs bg-dark/50 p-2 rounded">
                        Take a screenshot of the QR code and scan it from your gallery when using your payment app for easier payment processing.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-light font-semibold mb-3">Or Make a Manual Transfer</h3>
                  
                  {/* JazzCash Account */}
                  <div className="mb-3 bg-dark-light border border-dark-lighter rounded-lg overflow-hidden">
                    <button 
                      onClick={() => toggleDropdown('jazzCash')} 
                      className="flex items-center justify-between w-full p-3 text-left text-light hover:bg-dark-lighter transition-colors duration-300 no-focus-outline"
                    >
                      <span className="font-medium">JazzCash Account</span>
                      <span className={`transform transition-transform duration-500 ${showJazzCashDetails ? 'rotate-180' : 'rotate-0'}`}>
                        <FaChevronDown />
                      </span>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        showJazzCashDetails ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-3 border-t border-dark-lighter">
                        <div className="flex justify-between items-center bg-dark p-3 rounded mb-2">
                          <span className="text-light-dark text-sm mr-2">IBAN:</span>
                          <span className="text-light font-mono">{jazzCashIban}</span>
                          <button 
                            onClick={() => handleCopyToClipboard(jazzCashIban, "JazzCash")}
                            className={`ml-2 p-2 rounded-full transition-transform active:scale-90 no-focus-outline ${copyAnimation === 'JazzCash' ? 'bg-primary text-white ring-2 ring-primary ring-opacity-50' : 'text-primary hover:text-secondary hover:bg-dark-lighter'}`}
                            aria-label="Copy IBAN"
                          >
                            <FaCopy className={`${copyAnimation === 'JazzCash' ? 'animate-bounce' : ''}`} />
                          </button>
                        </div>
                        {copyAnimation === 'JazzCash' && (
                          <div className="text-xs text-green-400 text-right mt-1 animate-fade-in">
                            {copySuccess}
                          </div>
                        )}
                        <p className="text-light-dark text-sm">
                          Please include your name and booking date in the transfer description
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {/* EasyPaisa Account */}
                  <div className="mb-4 bg-dark-light border border-dark-lighter rounded-lg overflow-hidden">
                    <button 
                      onClick={() => toggleDropdown('easyPaisa')} 
                      className="flex items-center justify-between w-full p-3 text-left text-light hover:bg-dark-lighter transition-colors duration-300 no-focus-outline"
                    >
                      <span className="font-medium">EasyPaisa Account</span>
                      <span className={`transform transition-transform duration-500 ${showEasyPaisaDetails ? 'rotate-180' : 'rotate-0'}`}>
                        <FaChevronDown />
                      </span>
                    </button>
                    
                    <div 
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        showEasyPaisaDetails ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="p-3 border-t border-dark-lighter">
                        <div className="flex justify-between items-center bg-dark p-3 rounded mb-2">
                          <span className="text-light-dark text-sm mr-2">IBAN:</span>
                          <span className="text-light font-mono">{easyPaisaIban}</span>
                          <button 
                            onClick={() => handleCopyToClipboard(easyPaisaIban, "EasyPaisa")}
                            className={`ml-2 p-2 rounded-full transition-transform active:scale-90 no-focus-outline ${copyAnimation === 'EasyPaisa' ? 'bg-primary text-white ring-2 ring-primary ring-opacity-50' : 'text-primary hover:text-secondary hover:bg-dark-lighter'}`}
                            aria-label="Copy IBAN"
                          >
                            <FaCopy className={`${copyAnimation === 'EasyPaisa' ? 'animate-bounce' : ''}`} />
                          </button>
                        </div>
                        {copyAnimation === 'EasyPaisa' && (
                          <div className="text-xs text-green-400 text-right mt-1 animate-fade-in">
                            {copySuccess}
                          </div>
                        )}
                        <p className="text-light-dark text-sm">
                          Please include your name and booking date in the transfer description
                        </p>
                      </div>
                      </div>
                    </div>
                  </div>
                  
                <form onSubmit={handleSubmit} className="pt-4">
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-[1.02] hover:shadow-lg no-focus-outline"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                          Processing...
                        </>
                      ) : (
                        'Confirm Booking'
                      )}
                    </button>
                  </div>
                </form>
                
                <div className="mt-4 text-center text-light-dark text-sm">
                  <p>After making payment, click confirm to complete your booking</p>
                </div>
              </div>
              
              {/* Booking Summary */}
              <div className="bg-dark-light rounded-lg p-6 md:order-1">
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xl font-semibold text-light">Booking Summary</h2>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      
                      // Create a styled HTML receipt
                      const receiptHtml = `
<!DOCTYPE html>
<html>
<head>
  <title>Safarnama Travel - Booking Receipt</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f8f9fa;
    }
    .receipt {
      max-width: 800px;
      margin: 20px auto;
      background: linear-gradient(135deg, #ffffff 80%, #fff0b3 100%);
      border: 1px solid #e0e0e0;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 20px;
      position: relative;
    }
    @media (max-width: 768px) {
      .receipt {
        max-width: 100%;
        margin: 0;
        min-height: 100vh;
        border: none;
        border-radius: 0;
        padding: 15px;
      }
      body {
        background-color: #ffffff;
      }
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 20px;
      border-bottom: 2px solid #f8c301;
    }
    .logo-container {
      display: flex;
      align-items: center;
    }
    .logo {
      width: 180px;
      height: auto;
    }
    .receipt-title {
      font-size: 24px;
      color: #333;
      margin: 20px 0;
      text-align: center;
    }
    .info-section {
      margin: 20px 0;
      background-color: #f0f8ff;
      padding: 15px;
      border-radius: 8px;
    }
    .info-row {
      display: flex;
      margin-bottom: 10px;
    }
    .info-label {
      width: 150px;
      font-weight: bold;
      color: #555;
    }
    .info-value {
      flex: 1;
      color: #333;
    }
    .total-section {
      background-color: #fff0b3;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      text-align: right;
    }
    .total-amount {
      font-size: 22px;
      font-weight: bold;
      color: #333;
    }
    .footer {
      margin-top: 30px;
      display: flex;
      justify-content: space-between;
      padding-top: 20px;
      border-top: 1px solid #e0e0e0;
    }
    .signature {
      text-align: right;
    }
    .signature img {
      width: 150px;
      height: auto;
    }
    .terms {
      font-size: 12px;
      color: #777;
      margin-top: 30px;
      text-align: center;
    }
    .non-editable-notice {
      font-size: 11px;
      color: #999;
      text-align: center;
      margin-top: 10px;
      font-style: italic;
    }
  </style>
</head>
<body>
  <div class="receipt">
    <div class="header">
      <div class="logo-container">
        <div style="display: flex; align-items: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="#2e7d32">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
            <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm-3 5c0-1.65 1.35-3 3-3s3 1.35 3 3-1.35 3-3 3-3-1.35-3-3z" fill="#4caf50"/>
            <path d="M15.94 11.65l-4.29-4.29c-.26-.26-.69-.15-.83.21l-1.41 3.54c-.07.17-.06.36.03.52l.76 1.51c.08.17.22.3.4.36l1.51.76c.16.08.35.09.52.03l3.54-1.41c.35-.14.46-.58.21-.83l-1.51-1.51 1.51-1.51c.35-.35.09-.92-.44-.82z" fill="#66bb6a"/>
          </svg>
          <h2 style="font-size: 32px; color: #333; font-weight: bold; margin: 0 0 0 10px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; letter-spacing: -1px;">
            <span style="color: #f8c301; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">Safar</span><span style="color: #ff7e00; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">nama</span>
            <span style="font-size: 14px; display: block; color: #388e3c; letter-spacing: 1px; font-weight: normal; font-style: italic; margin-top: -5px;">Explore Pakistan</span>
          </h2>
        </div>
      </div>
      <div>
        <p>Receipt #: SF-${Date.now().toString().substring(7)}</p>
        <p>Date: ${new Date().toLocaleDateString()}</p>
      </div>
    </div>
    
    <h1 class="receipt-title">Booking Confirmation</h1>
    
    <div class="info-section">
      <div class="info-row">
        <div class="info-label">Customer Name:</div>
        <div class="info-value">${name}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Email:</div>
        <div class="info-value">${email}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Phone:</div>
        <div class="info-value">${phone || 'Not provided'}</div>
      </div>
    </div>
    
    <div class="info-section">
      <div class="info-row">
        <div class="info-label">Destination:</div>
        <div class="info-value">${destination}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Travel Date:</div>
        <div class="info-value">${date}</div>
      </div>
      <div class="info-row">
        <div class="info-label">Number of Travelers:</div>
        <div class="info-value">${travelers}</div>
      </div>
    </div>
    
    <div class="total-section">
      <div>Total Amount:</div>
      <div class="total-amount">PKR ${(parseFloat(price) * 270).toLocaleString()}</div>
    </div>
    
    <div class="footer">
      <div>
        <p>Payment Status: Pending</p>
      </div>
      <div class="signature">
        <div style="font-size: 48px; color: #388e3c; margin-bottom: 5px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="#2e7d32">
            <path d="M14 6l-4.22 5.63 1.25 1.67L14 9.33 19 16h-8.46l-4.01-5.37L1 18h22L14 6zM5 16l1.52-2.03L8.04 16H5z"/>
            <path d="M12,3c-0.55,0-1,0.45-1,1s0.45,1,1,1s1-0.45,1-1S12.55,3,12,3z" fill="#4caf50"/>
            <path d="M19,5c-0.55,0-1,0.45-1,1s0.45,1,1,1s1-0.45,1-1S19.55,5,19,5z" fill="#4caf50"/>
            <path d="M16,4c-0.55,0-1,0.45-1,1s0.45,1,1,1s1-0.45,1-1S16.55,4,16,4z" fill="#4caf50"/>
          </svg>
        </div>
        <p>Booking Verified</p>
      </div>
    </div>
    
    <div class="terms">
      <p>Terms and Conditions: This receipt is subject to Safarnama Travel's booking policy. 
      Cancellations must be made at least 7 days before the travel date for a full refund.</p>
    </div>
    
    <div class="non-editable-notice">
      This is an official document from Safarnama Travel. Do not edit.
    </div>
  </div>
</body>
</html>
                      `;
                      
                      // Convert HTML to Blob
                      const blob = new Blob([receiptHtml], {type: 'text/html'});
                      const url = URL.createObjectURL(blob);
                      
                      // Create link and trigger download
                      const link = document.createElement('a');
                      link.href = url;
                      link.download = 'safarnama-booking-receipt.html';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      URL.revokeObjectURL(url);
                    }}
                    className="bg-dark-light/80 hover:bg-dark-light p-2 rounded-full text-light hover:text-primary transition-colors"
                    title="Download Booking Receipt"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                      <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                    </svg>
                  </a>
                </div>
                
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
                    <p className="text-xl font-bold text-primary">PKR {(parseFloat(price) * 270).toLocaleString()}</p>
                  </div>
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