'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';
import { getApiUrl } from '@/lib/utils';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
      // Use the dynamic API URL
      const apiUrl = getApiUrl('/api/newsletter');
      console.log('Submitting newsletter to:', apiUrl);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }
      
      setIsSubmitted(true);
      setEmail('');
      
      // Reset the success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (err) {
      console.error('Newsletter subscription error:', err);
      setError(err instanceof Error ? err.message : 'Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-primary text-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-light-dark max-w-2xl mx-auto">
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
                className="w-full px-4 py-3 rounded-md bg-dark border border-dark-light text-light focus:outline-none focus:ring-2 focus:ring-secondary"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />
              {error && <p className="text-light text-sm mt-1 bg-primary/50 p-1 rounded">{error}</p>}
            </div>
            <button
              type="submit"
              className="bg-secondary text-dark hover:bg-secondary-light px-6 py-3 rounded-md font-semibold transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="inline-block w-5 h-5 border-2 border-dark border-t-transparent rounded-full animate-spin mr-2"></span>
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
              className="text-center text-light mt-4 bg-secondary/20 p-2 rounded"
            >
              Thank you for subscribing! We&apos;ve sent a confirmation email to your inbox.
            </motion.p>
          )}

          <p className="text-light-dark text-sm text-center mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter; 