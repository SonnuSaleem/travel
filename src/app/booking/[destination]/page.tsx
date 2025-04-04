'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function BookingPage() {
  const { destination } = useParams();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    destination: decodeURIComponent(destination as string),
    travelDate: '',
    travelers: '1',
    totalAmount: '0',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const validateForm = () => {
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.travelDate) {
      setError('Please fill in all required fields');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Booking form submission started');
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    console.log('Submitting booking form...');
    
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      console.log('Booking API Response Status:', response.status);
      console.log('Booking API Response Status Text:', response.statusText);
      
      const data = await response.json();
      console.log('Booking API Response Data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process booking');
      }
      
      if (data.success) {
        console.log('Booking submission successful');
        console.log('Email sent status:', data.emailSent);
        console.log('Admin notified status:', data.adminNotified);
        if (data.operationResults) {
          console.log('Operation results:', data.operationResults);
        }
        
        // Reset form and show success message
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          destination: decodeURIComponent(destination as string),
          travelDate: '',
          travelers: '1',
          totalAmount: '0',
        });
        setIsSuccess(true);
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        throw new Error('Booking failed');
      }
    } catch (err) {
      console.error('Booking form submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ... rest of the component code stays the same ...
} 