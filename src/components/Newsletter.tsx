'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter form submission started');
    
    // Simple email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      console.log('Attempting to send newsletter subscription request...');
      // Use a relative URL for the API endpoint
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      console.log('Newsletter API Response Status:', response.status);
      console.log('Newsletter API Response Status Text:', response.statusText);
      
      const data = await response.json();
      console.log('Newsletter API Response Data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      if (data.success) {
        console.log('Newsletter subscription successful');
        console.log('Email sent status:', data.emailSent);
        console.log('Admin notified status:', data.adminNotified);
        if (data.operationResults) {
          console.log('Operation results:', data.operationResults);
        }
        
        setIsSubmitted(true);
        setEmail('');
        
        // Reset the success message after 5 seconds
        setTimeout(() => {
          setIsSubmitted(false);
        }, 5000);
      } else {
        throw new Error('Subscription failed');
      }
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-r from-yellow-50 to-amber-100 text-slate-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-800">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Stay updated with our latest travel deals, new destinations, and travel tips delivered directly to your inbox.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 rounded-md bg-white border border-slate-300 text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              {error && <p className="text-red-600 text-sm mt-1 bg-red-100 p-1 rounded">{error}</p>}
            </div>
            <button
              type="submit"
              className="bg-yellow-500 text-white hover:bg-yellow-600 px-6 py-3 rounded-md font-semibold transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed shadow-md"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
              ) : (
                <FaPaperPlane className="mr-2" />
              )}
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>

          {isSubmitted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-yellow-800 mt-4 bg-yellow-100 p-2 rounded"
            >
              Thank you for subscribing! We&apos;ve sent a confirmation email to your inbox.
            </motion.p>
          )}

          <p className="text-slate-500 text-sm text-center mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter; 