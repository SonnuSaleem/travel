'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaCalendarAlt, FaStar, FaMapMarkerAlt, 
  FaUsers, FaArrowRight, FaShieldAlt, FaHeart, FaSearch
} from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import BackButton from '@/components/BackButton';
import { destinations } from '@/data/destinations';

export default function Packages() {
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<typeof premiumPackages>([]);

  // Categories
  const categories = [
    { id: 'all', name: 'All Packages' },
    { id: 'luxury', name: 'Luxury Escapes' },
    { id: 'adventure', name: 'Adventure Trips' },
    { id: 'family', name: 'Family Friendly' },
    { id: 'honeymoon', name: 'Honeymoon Specials' },
  ];

  // Transform destinations to premium packages
  const premiumPackages = destinations.map((dest, index) => {
    // Assign fixed categories based on index to prevent re-renders
    const categoryIndex = index % 4;
    const categories = ['luxury', 'adventure', 'family', 'honeymoon'];
    
    // Use a seed based on ID to ensure consistent benefits
    const benefitSeed = parseInt(dest.id) || index;
    const allBenefits = [
      'Personal Concierge',
      'Luxury Transportation',
      'Premium Accommodations', 
      'Exclusive Experiences',
      'Gourmet Dining'
    ];
    
    // Select benefits deterministically
    const benefits = allBenefits.slice(benefitSeed % 3, (benefitSeed % 3) + 3);
    
    // Calculate fixed discount
    const hasDiscount = benefitSeed % 2 === 0;
    const discount = hasDiscount ? (benefitSeed % 3) * 10 + 10 : 0;
    
    // Fixed spots available
    const availableSpots = (benefitSeed % 10) + 1;
    
    return {
      ...dest,
      category: categories[categoryIndex],
      benefits,
      discount,
      availableSpots
    };
  });

  // Filter and sort packages based on search button click, category and sort
  useEffect(() => {
    const filtered = premiumPackages
      .filter(pkg => {
        const matchesCategory = activeTab === 'all' || pkg.category === activeTab;
        const matchesSearch = searchQuery === '' || 
          pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
          pkg.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pkg.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') return b.rating - a.rating;
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        return 0;
      });
      
    setSearchResults(filtered);
  }, [searchQuery, activeTab, sortBy]);

  // Initial load
  useEffect(() => {
    setSearchResults(premiumPackages);
  }, []);

  const toggleFavorite = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fav => fav !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const getDiscountedPrice = (price: number, discount: number) => {
    return Math.round(price * (1 - discount / 100));
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // If search is cleared, reset all filters
    if (value === '') {
      setSearchQuery('');
    }
  };

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchTerm);
  };

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 px-5 sm:px-8">
      <BackButton />
      
      {/* Hero Section with Video Background */}
      <div className="relative h-[40vh] sm:h-[50vh] overflow-hidden">
        {/* Video or Image Background */}
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
            alt="Travel Luxury"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-4 text-white drop-shadow-lg">
              Exclusive <span className="text-yellow-400">Premium</span> Packages
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-4 sm:mb-8 max-w-2xl mx-auto">
              Discover handcrafted experiences curated by travel experts for the discerning traveler
            </p>
            
            <motion.div 
              className="rounded-full bg-white/10 backdrop-blur-md p-1 inline-flex w-full max-w-md sm:max-w-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <form onSubmit={handleSearch} className="flex w-full">
                <div className="relative flex items-center flex-1">
                  <FaSearch className="absolute left-2 sm:left-4 text-white/60" />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={handleSearchChange}
                    placeholder="Where do you want to go?" 
                    className="bg-transparent text-white placeholder-white/60 border-none outline-none focus:ring-0 focus:outline-none pl-7 pr-2 sm:px-10 py-2 sm:py-3 w-full min-w-0 text-sm sm:text-base"
                    style={{ 
                      WebkitAppearance: 'none',
                      boxShadow: 'none'
                    }}
                  />
                </div>
                <button 
                  type="submit"
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-3 sm:px-6 py-2 sm:py-3 rounded-full transition-all text-sm sm:text-base whitespace-nowrap"
                >
                  Explore Now
                </button>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Premium Badge Section */}
      <div className="bg-white">
        <div className="container mx-auto py-4 sm:py-8 px-4 sm:px-8">
          <div className="flex flex-wrap justify-center gap-2 md:gap-8">
            {['Certified Experts', 'Exclusive Benefits', 'Best Price Guarantee', '24/7 Support'].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1 sm:py-2 bg-slate-50 rounded-full shadow-sm text-xs sm:text-sm"
              >
                <FaShieldAlt className="text-yellow-500" />
                <span className="text-slate-700 font-medium">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-6 sm:py-12">
        {/* Category Tabs */}
        <div className="mb-6 sm:mb-12">
          <div className="flex overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex space-x-1 sm:space-x-2 md:space-x-4 mx-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-3 sm:px-5 py-2 sm:py-3 rounded-full font-medium whitespace-nowrap transition-all text-xs sm:text-sm ${
                    activeTab === category.id
                      ? 'bg-slate-800 text-white shadow-lg'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Sort and Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 bg-white p-3 sm:p-4 rounded-xl shadow-sm">
            <div className="flex items-center gap-2 mb-3 sm:mb-0">
              <h2 className="text-lg sm:text-xl font-bold text-slate-800">
                {activeTab === 'all' 
                  ? (searchQuery ? `Search Results: "${searchQuery}"` : 'All Premium Packages')
                  : categories.find(c => c.id === activeTab)?.name}
              </h2>
              <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs sm:text-sm font-medium">
                {searchResults.length} packages
              </div>
            </div>
            
            <div className="flex items-center w-full sm:w-auto">
              <label className="text-slate-600 mr-2 text-sm sm:text-base">Sort by:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-sm sm:text-base flex-1 sm:flex-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Display message when no results */}
        {searchResults.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">No packages found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search or explore different categories
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSearchQuery('');
              }}
              className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-5 py-2 rounded-lg transition-colors"
            >
              Clear search
            </button>
          </div>
        ) : (
          /* Packages Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 pr-2 sm:pr-0">
            {searchResults.map((pkg) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.01] ${
                  selectedPackage === pkg.id ? 'ring-2 ring-yellow-500' : ''
                }`}
                onClick={() => setSelectedPackage(pkg.id === selectedPackage ? null : pkg.id)}
              >
                {/* Image Container */}
                <div className="relative h-48 sm:h-56">
                  <Image
                    src={pkg.imageUrl}
                    alt={pkg.name}
                    fill
                    className="object-cover"
                  />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  
                  {/* Top badges */}
                  <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 flex justify-between items-start">
                    <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-yellow-500 text-white rounded-lg text-xs sm:text-sm font-medium">
                      {pkg.category.charAt(0).toUpperCase() + pkg.category.slice(1)}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(pkg.id);
                      }}
                      className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full"
                    >
                      <FaHeart className={favorites.includes(pkg.id) ? "text-red-500" : "text-white"} />
                    </button>
                  </div>
                  
                  {/* Bottom info */}
                  <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex justify-between items-end">
                    <div>
                      <h3 className="text-white font-bold text-lg sm:text-xl mb-0.5 sm:mb-1 drop-shadow-md">{pkg.name}</h3>
                      <div className="flex items-center">
                        <FaMapMarkerAlt className="text-yellow-400 mr-1" />
                        <span className="text-white/90 text-xs sm:text-sm">{pkg.location}</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-lg px-1.5 sm:px-2 py-0.5 sm:py-1">
                      <FaStar className="text-yellow-400 mr-1" />
                      <span className="text-white font-medium text-xs sm:text-sm">{pkg.rating}</span>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-3 sm:p-5">
                  {/* Price */}
                  <div className="flex justify-between items-center mb-3 sm:mb-4">
                    <div>
                      {pkg.discount > 0 ? (
                        <>
                          <span className="line-through text-slate-400 mr-2 text-sm sm:text-base">${pkg.price}</span>
                          <span className="text-xl sm:text-2xl font-bold text-slate-800">
                            ${getDiscountedPrice(pkg.price, pkg.discount)}
                          </span>
                        </>
                      ) : (
                        <span className="text-xl sm:text-2xl font-bold text-slate-800">${pkg.price}</span>
                      )}
                      <span className="text-slate-500 ml-1 text-xs sm:text-sm">per person</span>
                    </div>
                    
                    {pkg.discount > 0 && (
                      <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-red-100 text-red-700 rounded-lg text-xs sm:text-sm font-medium">
                        Save {pkg.discount}%
                      </div>
                    )}
                  </div>
                  
                  {/* Features */}
                  <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
                    <div className="flex items-center">
                      <FaCalendarAlt className="text-slate-400 mr-2 sm:mr-3 text-sm sm:text-base" />
                      <span className="text-slate-700 text-sm sm:text-base">{pkg.duration}</span>
                    </div>
                    
                    <div className="flex items-center">
                      <FaUsers className="text-slate-400 mr-2 sm:mr-3 text-sm sm:text-base" />
                      <span className="text-slate-700 text-sm sm:text-base">
                        <span className="font-medium">{pkg.availableSpots}</span> spots left
                      </span>
                    </div>
                  </div>
                  
                  {/* Premium benefits */}
                  <div className="mb-4 sm:mb-5">
                    <h4 className="text-xs sm:text-sm font-semibold text-slate-400 uppercase mb-1 sm:mb-2">Premium Benefits</h4>
                    <div className="space-y-1 sm:space-y-2">
                      {pkg.benefits.map((benefit: string, idx: number) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-yellow-400 mr-1.5 sm:mr-2"></div>
                          <span className="text-slate-600 text-xs sm:text-sm">{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <Link href={`/packages/${pkg.id}`} className="block w-full">
                    <button className="w-full bg-slate-800 hover:bg-slate-900 text-white font-medium py-2 sm:py-3 px-3 sm:px-4 rounded-lg transition-colors flex items-center justify-center group text-sm sm:text-base">
                      <span>View Details</span>
                      <FaArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 