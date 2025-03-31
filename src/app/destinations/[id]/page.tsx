'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { FaStar, FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';
import BookingForm from '@/components/BookingForm';
import { destinations } from '@/data/destinations';
import BackButton from '@/components/BackButton';

interface Destination {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  imageUrl: string;
  duration: string;
  featured: boolean;
  highlights?: string[];
  includes?: string[];
  excludes?: string[];
}

export default function DestinationDetails() {
  const params = useParams();
  const id = params.id as string;
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, this would fetch from the API
    // For now, we'll use our dummy data
    const foundDestination = destinations.find(dest => dest.id === id);
    
    if (foundDestination) {
      setDestination(foundDestination);
    }
    
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="pt-16 flex items-center justify-center min-h-screen bg-dark-light">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="pt-16 flex flex-col items-center justify-center min-h-screen bg-dark-light text-light">
        <h1 className="text-3xl font-bold mb-4">Destination not found</h1>
        <p>The destination you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="pt-16 bg-dark-light">
      <BackButton />
      
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <Image
          src={destination.imageUrl}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark to-dark/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4 text-shiny-white"
            >
              {destination.name}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center justify-center mb-4"
            >
              <FaMapMarkerAlt className="mr-2 text-yellow-400" />
              <span className="text-shiny-white">{destination.location}</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center"
            >
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`${
                    i < Math.floor(destination.rating) ? 'text-yellow-400' : 'text-dark-lighter'
                  } mx-0.5`}
                />
              ))}
              <span className="ml-2 text-shiny-white">{destination.rating.toFixed(1)}</span>
            </motion.div>
            
            {destination.featured && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-6"
              >
                <span className="feature-badge">Featured Destination</span>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Right Column - Booking Form */}
          <div className="lg:col-span-1 order-first lg:order-last">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="transform hover:scale-[1.02] transition-all duration-300"
              >
                <BookingForm
                  destinationId={destination.id}
                  destinationName={destination.name}
                  price={destination.price}
                />
              </motion.div>
            </div>
          </div>

          {/* Left Column - Destination Details */}
          <div className="lg:col-span-2 order-last lg:order-first">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-dark p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-3xl font-bold text-light mb-6">About This Destination</h2>
              <p className="text-light-dark mb-8 text-lg leading-relaxed">
                {destination.description}
              </p>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-light mb-4">Trip Details</h3>
                <div className="bg-dark-light p-6 rounded-lg">
                  <div className="flex items-center mb-4">
                    <FaClock className="text-primary mr-3" />
                    <div>
                      <p className="font-semibold text-light">Duration</p>
                      <p className="text-light-dark">{destination.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-primary mr-3" />
                    <div>
                      <p className="font-semibold text-light">Location</p>
                      <p className="text-light-dark">{destination.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-8">
                <h3 className="text-xl font-bold text-light mb-4">Activities Included</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {destination.activities.map((activity: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <FaCheck className="text-secondary mr-2" />
                      <span className="text-light-dark">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 