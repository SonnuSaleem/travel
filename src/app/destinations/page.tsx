'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaFilter, FaStar } from 'react-icons/fa';
import DestinationCard from '@/components/DestinationCard';
import { destinations } from '@/data/destinations';
import BackButton from '@/components/BackButton';

export default function Destinations() {
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState<'price-low' | 'price-high' | 'rating' | 'name'>('rating');

  // Filter and sort destinations
  const filteredAndSortedDestinations = destinations
    .filter((destination) => {
      const matchesSearch = destination.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         destination.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = destination.price >= priceRange[0] && destination.price <= priceRange[1];
      const matchesRating = selectedRating ? destination.rating >= selectedRating : true;
      
      return matchesSearch && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  const clearFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 5000]);
    setSelectedRating(null);
    setSortBy('rating');
  };

  return (
    <div className="pt-16 bg-dark-light min-h-screen">
      <BackButton />
      
      {/* Page Header */}
      <div className="bg-gradient-primary text-light py-16">
        <div className="container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-center"
          >
            Explore Our Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-center max-w-3xl mx-auto mb-8"
          >
            Discover amazing places around the world and start planning your next adventure.
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-r from-primary/90 to-accent/90 p-1 rounded-lg">
              <div className="relative bg-dark rounded-md">
                <input
                  type="text"
                  placeholder="Search destinations by name or location..."
                  className="w-full px-4 py-3 pl-12 rounded-md bg-dark-light/50 border border-accent/20 text-light focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-accent" />
                <button
                  className="md:hidden absolute right-4 top-1/2 transform -translate-y-1/2 text-accent hover:text-secondary transition-colors"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <FaFilter />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters - Desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden md:block w-64 bg-dark rounded-lg shadow-md p-6 h-fit sticky top-24"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-light">Filters</h2>
              <button
                onClick={clearFilters}
                className="text-accent hover:text-secondary text-sm transition-colors"
              >
                Clear All
              </button>
            </div>
            
            {/* Sort By */}
            <div className="mb-6">
              <h3 className="font-semibold text-light mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="w-full p-2 bg-dark-light/50 border border-accent/20 rounded text-light focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent"
              >
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
            
            {/* Price Range Filter */}
            <div className="mb-6">
              <h3 className="font-semibold text-light mb-3">Price Range</h3>
              <div className="flex items-center justify-between mb-2">
                <span className="text-light">${priceRange[0].toLocaleString()}</span>
                <span className="text-light">${priceRange[1].toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="5000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full h-2 bg-dark-light rounded-lg appearance-none cursor-pointer accent-accent"
              />
            </div>
            
            {/* Rating Filter */}
            <div>
              <h3 className="font-semibold text-light mb-3">Rating</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setSelectedRating(rating === selectedRating ? null : rating)}
                    className={`w-full flex items-center justify-between p-2 rounded transition-colors ${
                      selectedRating === rating
                        ? 'bg-accent/20 text-accent'
                        : 'text-light-dark hover:bg-dark-light/30'
                    }`}
                  >
                    <span className="flex items-center">
                      {rating}+ Stars
                    </span>
                    <div className="flex">
                      {[...Array(rating)].map((_, i) => (
                        <FaStar key={i} className="text-secondary w-4 h-4" />
                      ))}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Filters - Mobile */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-dark rounded-lg shadow-md p-6 mb-6"
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
                  max="5000"
                  step="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full h-2 bg-dark-light rounded-lg appearance-none cursor-pointer"
                />
              </div>
              
              {/* Rating Filter */}
              <div>
                <h3 className="font-semibold text-light mb-3">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div key={rating} className="flex items-center">
                      <input
                        type="radio"
                        id={`mobile-rating-${rating}`}
                        name="mobile-rating"
                        checked={selectedRating === rating}
                        onChange={() => setSelectedRating(rating)}
                        className="mr-2"
                      />
                      <label htmlFor={`mobile-rating-${rating}`} className="text-light-dark">
                        {rating}+ Stars
                      </label>
                    </div>
                  ))}
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="mobile-rating-all"
                      name="mobile-rating"
                      checked={selectedRating === null}
                      onChange={() => setSelectedRating(null)}
                      className="mr-2"
                    />
                    <label htmlFor="mobile-rating-all" className="text-light-dark">
                      All Ratings
                    </label>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Destinations Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-dark">
                Showing {filteredAndSortedDestinations.length} destinations
              </p>
              <div className="md:hidden">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 text-accent hover:text-secondary transition-colors"
                >
                  <FaFilter />
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {filteredAndSortedDestinations.length === 0 ? (
              <div className="text-center py-12 bg-dark-light/20 rounded-lg">
                <h3 className="text-xl font-bold text-dark mb-2">No destinations found</h3>
                <p className="text-dark-lighter mb-4">
                  Try adjusting your search criteria or explore our other destinations.
                </p>
                <button
                  onClick={clearFilters}
                  className="text-accent hover:text-secondary transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredAndSortedDestinations.map((destination, index) => (
                  <motion.div
                    key={destination.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <DestinationCard {...destination} />
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