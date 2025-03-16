'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-dark/95 backdrop-blur-md border-b border-accent/10 text-light shadow-lg shadow-accent/5 py-2' 
        : 'bg-transparent py-4'
    }`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-primary">Infinite</span>
            <span className="text-secondary">Journeys</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-light hover:text-accent relative group transition-colors duration-300">
              <span>Home</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/destinations" className="text-light hover:text-accent relative group transition-colors duration-300">
              <span>Destinations</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/packages" className="text-light hover:text-accent relative group transition-colors duration-300">
              <span>Packages</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/about" className="text-light hover:text-accent relative group transition-colors duration-300">
              <span>About Us</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
            <Link href="/contact" className="text-light hover:text-accent relative group transition-colors duration-300">
              <span>Contact</span>
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-accent hover:text-secondary transition-colors duration-300 focus:outline-none relative group"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <FiX size={24} className="transform transition-transform duration-300 group-hover:rotate-90" />
            ) : (
              <FiMenu size={24} className="transform transition-transform duration-300 group-hover:scale-110" />
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
            className="md:hidden bg-dark/95 backdrop-blur-md border-t border-accent/10"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-light hover:text-accent transition-all duration-300 py-2 border-b border-accent/10 relative group"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">Home</span>
                <span className="absolute inset-0 bg-accent/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link 
                href="/destinations" 
                className="text-light hover:text-accent transition-all duration-300 py-2 border-b border-accent/10 relative group"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">Destinations</span>
                <span className="absolute inset-0 bg-accent/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link 
                href="/packages" 
                className="text-light hover:text-accent transition-all duration-300 py-2 border-b border-accent/10 relative group"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">Packages</span>
                <span className="absolute inset-0 bg-accent/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link 
                href="/about" 
                className="text-light hover:text-accent transition-all duration-300 py-2 border-b border-accent/10 relative group"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">About Us</span>
                <span className="absolute inset-0 bg-accent/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
              <Link 
                href="/contact" 
                className="text-light hover:text-accent transition-all duration-300 py-2 relative group"
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">Contact</span>
                <span className="absolute inset-0 bg-accent/5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar; 