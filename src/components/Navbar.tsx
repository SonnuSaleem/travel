'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 50);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ${
      scrolled || isOpen
        ? 'bg-dark/95 backdrop-blur-md border-b border-orange-500/10 text-light shadow-lg shadow-orange-500/5 py-2' 
        : 'bg-transparent py-2 sm:py-4'
    }`}>
      <div className="container mx-auto px-2 sm:px-4 md:px-6">
        <div className="flex justify-between items-center w-full">
          <div className="flex-shrink-0">
            <Logo 
              size={scrolled ? 'small' : 'medium'} 
              animated={false}
              className="text-white"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 lg:space-x-8">
            <Link href="/" className="text-light hover:text-orange-400 relative group transition-colors duration-300 text-sm lg:text-base">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/destinations" className="text-light hover:text-orange-400 relative group transition-colors duration-300 text-sm lg:text-base">
              <span>Destinations</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/packages" className="text-light hover:text-orange-400 relative group transition-colors duration-300 text-sm lg:text-base">
              <span>Packages</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/about" className="text-light hover:text-orange-400 relative group transition-colors duration-300 text-sm lg:text-base">
              <span>About Us</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/contact" className="text-light hover:text-orange-400 relative group transition-colors duration-300 text-sm lg:text-base">
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="block md:hidden text-light hover:text-orange-400 transition-colors duration-300 focus:outline-none relative z-50 p-1"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX size={22} className="transform transition-transform duration-300" />
            ) : (
              <FiMenu size={22} className="transform transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-[48px] sm:top-[56px] left-0 right-0 bg-dark/95 backdrop-blur-md border-t border-orange-500/10 max-h-[calc(100vh-48px)] overflow-y-auto"
          >
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-2">
              <Link 
                href="/" 
                className="text-light hover:text-orange-400 transition-all duration-300 py-2 border-b border-orange-500/10 relative group text-sm"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">Home</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link 
                href="/destinations" 
                className="text-light hover:text-orange-400 transition-all duration-300 py-2 border-b border-orange-500/10 relative group text-sm"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">Destinations</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link 
                href="/packages" 
                className="text-light hover:text-orange-400 transition-all duration-300 py-2 border-b border-orange-500/10 relative group text-sm"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">Packages</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link 
                href="/about" 
                className="text-light hover:text-orange-400 transition-all duration-300 py-2 border-b border-orange-500/10 relative group text-sm"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">About Us</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
              <Link 
                href="/contact" 
                className="text-light hover:text-orange-400 transition-all duration-300 py-2 relative group text-sm"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">Contact</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-orange-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 