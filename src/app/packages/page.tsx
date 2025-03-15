'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSort } from 'react-icons/fa';
import DestinationCard from '@/components/DestinationCard';
import { destinations } from '@/data/destinations';
import BackButton from '@/components/BackButton';

export default function Packages() {
  const [sortBy, setSortBy] = useState('price-low');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 3000]);
  const [durationFilter, setDurationFilter] = useState<string | null>(null);

  // Filter and sort destinations
  const filteredDestinations = destinations
    .filter((destination) => {
      const matchesPrice = destination.price >= priceRange[0] && destination.price <= priceRange[1];
      const matchesDuration = !durationFilter || destination.duration.includes(durationFilter);
      return matchesPrice && matchesDuration;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="pt-16 bg-dark-light min-h-screen">
      <BackButton />
      
      {/* Hero Section */}
      <div className="bg-gradient-primary text-light py-16">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
          >
            Travel Packages
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-center max-w-3xl mx-auto mb-8"
          >
            Discover our carefully curated travel packages for unforgettable experiences
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-64 bg-dark rounded-lg shadow-md p-6 h-fit"
          >
            <h2 className="text-xl font-bold text-light mb-6">Filters</h2>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-light mb-3">Price Range</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-light-dark">${priceRange[0]}</span>
                <span className="text-light-dark">${priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="0"
                max="3000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-dark-light rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            {/* Duration Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-light mb-3">Duration</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="duration-all"
                    name="duration"
                    checked={durationFilter === null}
                    onChange={() => setDurationFilter(null)}
                    className="mr-2"
                  />
                  <label htmlFor="duration-all" className="text-light-dark">
                    All Durations
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="duration-short"
                    name="duration"
                    checked={durationFilter === '5 days'}
                    onChange={() => setDurationFilter('5 days')}
                    className="mr-2"
                  />
                  <label htmlFor="duration-short" className="text-light-dark">
                    Short (5-6 days)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="duration-medium"
                    name="duration"
                    checked={durationFilter === '7 days'}
                    onChange={() => setDurationFilter('7 days')}
                    className="mr-2"
                  />
                  <label htmlFor="duration-medium" className="text-light-dark">
                    Medium (7-9 days)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="duration-long"
                    name="duration"
                    checked={durationFilter === '10 days'}
                    onChange={() => setDurationFilter('10 days')}
                    className="mr-2"
                  />
                  <label htmlFor="duration-long" className="text-light-dark">
                    Long (10+ days)
                  </label>
                </div>
              </div>
            </div>
            
            {/* Sort By */}
            <div>
              <h3 className="font-semibold text-light mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 bg-dark-light border border-dark-lighter rounded-md text-light"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </motion.div>

          {/* Packages Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-dark">Available Packages</h2>
              <div className="flex items-center text-dark">
                <FaSort className="mr-2" />
                <span>{filteredDestinations.length} packages found</span>
              </div>
            </div>

            {filteredDestinations.length === 0 ? (
              <div className="text-center py-12 bg-dark-light/20 rounded-lg">
                <h3 className="text-xl font-bold text-dark mb-2">No packages found</h3>
                <p className="text-dark-lighter">
                  Try adjusting your filters to see more options.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <DestinationCard
                      id={destination.id}
                      name={destination.name}
                      description={destination.description}
                      location={destination.location}
                      price={destination.price}
                      rating={destination.rating}
                      imageUrl={destination.imageUrl}
                      duration={destination.duration}
                      featured={destination.featured}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 