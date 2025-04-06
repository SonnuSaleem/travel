'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaUser, FaPaperPlane } from 'react-icons/fa';
import BackButton from '@/components/BackButton';
import StructuredData from '@/components/StructuredData';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
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
    console.log('Contact form submission started');
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    console.log('Submitting contact form...');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      console.log('Contact API Response Status:', response.status);
      console.log('Contact API Response Status Text:', response.statusText);
      
      const data = await response.json();
      console.log('Contact API Response Data:', data);
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }
      
      if (data.success) {
        console.log('Contact form submission successful');
        console.log('Email sent status:', data.emailSent);
        console.log('Admin notified status:', data.adminNotified);
        if (data.operationResults) {
          console.log('Operation results:', data.operationResults);
        }
        
        // Reset form and show success message
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
          phone: ''
        });
        setIsSuccess(true);
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
      } else {
        throw new Error('Message sending failed');
      }
    } catch (err) {
      console.error('Contact form submission error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-16 bg-dark-light">
      <BackButton />
      
      {/* Structured Data for Contact Page */}
      <StructuredData 
        type="localBusiness" 
        url="https://www.safarnamatravels.fun/contact"
        name="Safarnama Travels - Contact Us"
        description="Contact Safarnama Travels for booking inquiries, travel assistance, or any questions about our Pakistan tour packages."
      />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <Image
          src="https://images.pexels.com/photos/1268855/pexels-photo-1268855.jpeg?cs=srgb&dl=pexels-asadphoto-1268855.jpg&fm=jpg"
          alt="Contact Our Expert Team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-shadow-lg"
            >
              Contact <span className="text-primary bg-dark/50 px-2 rounded">Our Expert</span><span className="text-secondary bg-dark/50 px-2 rounded">Team</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto bg-dark/40 py-2 px-4 rounded-lg backdrop-blur-sm"
            >
              We&apos;re here to help plan your perfect journey
            </motion.p>
          </div>
        </div>
      </div>

      {/* Contact Information and Form */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <h2 className="text-2xl font-bold text-light mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <FaMapMarkerAlt className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-light">Our Office</h3>
                  <p className="text-light-dark">358 Travel Street, Phool Nagar Tourism City</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <FaPhone className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-light">Phone</h3>
                  <p className="text-light-dark">+92 3258894708</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-primary/20 p-3 rounded-full mr-4">
                  <FaEnvelope className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-light">Email</h3>
                  <p className="text-light-dark">info@safarnamatravels.fun</p>
                </div>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-light mb-4">Business Hours</h3>
              <ul className="space-y-2 text-light-dark">
                <li className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday:</span>
                  <span>10:00 AM - 4:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday:</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <div className="bg-dark rounded-lg shadow-lg p-8">
              <div className="bg-gradient-to-r from-primary to-accent p-px rounded-t-lg -mt-8 -mx-8 mb-8">
                <h2 className="text-2xl font-bold text-light p-4">Send Us a Message</h2>
              </div>
              
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-dark border border-secondary/30 rounded-lg p-6 text-center"
                >
                  <h3 className="text-xl font-bold text-secondary mb-2">Message Sent Successfully!</h3>
                  <p className="text-light-dark mb-4">
                    Thank you for contacting us. We&apos;ll get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => setIsSuccess(false)}
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:opacity-90 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {error && (
                    <div className="bg-primary/20 text-primary p-4 rounded-md mb-6">
                      {error}
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-light text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaUser className="text-secondary" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          className="block w-full pl-10 pr-3 py-2 bg-dark-light border border-dark-lighter rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-light"
                          placeholder="M. Farhan"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-light text-sm font-medium mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FaEnvelope className="text-secondary" />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          className="block w-full pl-10 pr-3 py-2 bg-dark-light border border-dark-lighter rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-light"
                          placeholder="Mfarhan@example.com"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="subject" className="block text-light text-sm font-medium mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      className="block w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-light"
                      placeholder="How can we help you?"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-light text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      className="block w-full px-4 py-2 bg-dark-light border border-dark-lighter rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary text-light"
                      placeholder="Please provide details about your inquiry..."
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="text-right">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-yellow-500 to-amber-500 hover:opacity-90 text-white font-bold py-3 px-6 rounded-md transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></span>
                          Sending...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane className="mr-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 