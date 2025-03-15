'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';

const Hero = () => {
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [travelers, setTravelers] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate inputs
    if (!destination.trim()) {
      alert('Please enter a destination');
      return;
    }
    if (!date) {
      alert('Please select a date');
      return;
    }
    if (!travelers) {
      alert('Please select number of travelers');
      return;
    }

    // For now, redirect to destinations page with search params
    const searchParams = new URLSearchParams({
      destination: destination.trim(),
      date,
      travelers
    });
    
    window.location.href = `/destinations?${searchParams.toString()}`;
  };

  return (
    <div className="relative h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="https://c4.wallpaperflare.com/wallpaper/680/388/949/nature-landscape-field-terraces-wallpaper-preview.jpg"
          alt="Snow-capped mountains and misty evergreen forest"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-dark/80 via-dark/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-light px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mb-8"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg">
            <span className="block"><span className="bg-gradient-to-r from-purple-800 via-pink-500 to-red-400 bg-clip-text text-transparent">Explore</span> The</span>
            <span className="text-primary-light drop-shadow-[0_2px_4px_rgba(255,107,107,0.6)]">Beautiful </span>
            <span className="text-secondary drop-shadow-[0_2px_4px_rgba(255,183,3,0.6)]">World</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-secondary-light drop-shadow-md">
            Discover amazing places at exclusive deals. Adventure awaits!
          </p>
        </motion.div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full max-w-5xl"
        >
          <div className="bg-gradient-to-r from-primary via-accent to-secondary p-1 rounded-xl shadow-2xl">
            <div 
              className="rounded-xl p-8 backdrop-blur-xl"
              style={{
                backgroundColor: 'rgba(29, 29, 29, 0.8)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(251, 133, 0, 0.2)'
              }}
            >
              <form onSubmit={handleSearch} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="relative">
                    <label htmlFor="destination" className="block text-secondary text-sm font-medium mb-2">
                      Where To?
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaMapMarkerAlt className="text-accent" />
                      </div>
                      <input
                        type="text"
                        id="destination"
                        className="block w-full pl-12 pr-4 py-4 bg-dark-light/50 border border-accent/20 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-white placeholder-light/30"
                        placeholder="Where would you like to go?"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="date" className="block text-secondary text-sm font-medium mb-2">
                      When?
                    </label>
                    <div className="relative">
                      <div 
                        className="absolute inset-y-0 left-0 pl-4 flex items-center cursor-pointer z-10"
                        onClick={() => {
                          const dateInput = document.getElementById('date') as HTMLInputElement;
                          if (dateInput) {
                            try {
                              dateInput.showPicker();
                            } catch {
                              // Fallback for browsers that don't support showPicker
                              dateInput.click();
                            }
                          }
                        }}
                      >
                        <FaCalendarAlt className="text-accent hover:text-primary transition-colors duration-300" />
                      </div>
                      <input
                        type="date"
                        id="date"
                        className="block w-full pl-12 pr-4 py-4 bg-dark-light/50 border border-accent/20 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-white calendar-white"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                        required
                        style={{
                          colorScheme: 'dark'
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="travelers" className="block text-secondary text-sm font-medium mb-2">
                      Travelers
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <FaUsers className="text-accent" />
                      </div>
                      <select
                        id="travelers"
                        className="block w-full pl-12 pr-10 py-4 bg-dark-light/50 border border-accent/20 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent text-white appearance-none cursor-pointer hover:bg-dark-light/60 transition-colors duration-300"
                        value={travelers}
                        onChange={(e) => setTravelers(e.target.value)}
                        required
                      >
                        <option value="" className="bg-dark text-light/80">Number of travelers</option>
                        <option value="1" className="bg-dark text-light">1 Traveler</option>
                        <option value="2" className="bg-dark text-light">2 Travelers</option>
                        <option value="3" className="bg-dark text-light">3 Travelers</option>
                        <option value="4" className="bg-dark text-light">4 Travelers</option>
                        <option value="5+" className="bg-dark text-light">5+ Travelers</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                        <FaArrowRight className="text-accent" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-center">
                  <button
                    type="submit"
                    className="group relative bg-gradient-to-r from-primary via-accent to-secondary hover:from-primary-dark hover:via-accent-dark hover:to-secondary-dark text-white font-bold py-4 px-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark shadow-lg hover:shadow-accent/20 transform hover:scale-105 active:scale-95"
                  >
                    <span className="flex items-center justify-center">
                      <FaSearch className="mr-2 group-hover:animate-pulse" />
                      <span className="group-hover:tracking-wider transition-all duration-300">Search Now</span>
                    </span>
                    <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 