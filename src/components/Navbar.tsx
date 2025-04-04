'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiMenu, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

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

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <div className="fixed top-0 z-50 pt-4 navbardimensions">
      <nav className={`rounded-xl border-2 transition-all duration-300 ${
      scrolled || isOpen
          ? 'bg-white/95 text-slate-800 shadow-lg shadow-slate-300/10 border-slate-200' 
          : 'bg-white/70 text-slate-800 border-slate-200/50'
    }`}>
        <div className="container mx-auto px-4 h-14 flex items-center">
        <div className="flex justify-between items-center w-full">
            <div className="flex-shrink-0 text-rendering-auto antialiased">
            <Logo 
              size={scrolled ? 'small' : 'medium'} 
              animated={false}
                className="text-slate-800"
            />
          </div>

          {/* Desktop Menu */}
            <div className="hidden md:flex space-x-4 lg:space-x-8 text-rendering-auto antialiased">
              <Link href="/" className={`text-slate-800 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline relative group transition-colors duration-300 text-sm lg:text-base font-medium ${isActive('/') ? 'text-yellow-500 nav-link-active' : ''}`}>
              <span>Home</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform transition-transform duration-300 ${isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus-visible:scale-x-100'}`}></span>
            </Link>
              <Link href="/destinations" className={`text-slate-800 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline relative group transition-colors duration-300 text-sm lg:text-base font-medium ${isActive('/destinations') ? 'text-yellow-500 nav-link-active' : ''}`}>
              <span>Destinations</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform transition-transform duration-300 ${isActive('/destinations') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus-visible:scale-x-100'}`}></span>
            </Link>
              <Link href="/packages" className={`text-slate-800 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline relative group transition-colors duration-300 text-sm lg:text-base font-medium ${isActive('/packages') ? 'text-yellow-500 nav-link-active' : ''}`}>
              <span>Packages</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform transition-transform duration-300 ${isActive('/packages') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus-visible:scale-x-100'}`}></span>
            </Link>
              <Link href="/about" className={`text-slate-800 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline relative group transition-colors duration-300 text-sm lg:text-base font-medium ${isActive('/about') ? 'text-yellow-500 nav-link-active' : ''}`}>
              <span>About Us</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform transition-transform duration-300 ${isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus-visible:scale-x-100'}`}></span>
            </Link>
              <Link href="/contact" className={`text-slate-800 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline relative group transition-colors duration-300 text-sm lg:text-base font-medium ${isActive('/contact') ? 'text-yellow-500 nav-link-active' : ''}`}>
              <span>Contact</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform transition-transform duration-300 ${isActive('/contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus-visible:scale-x-100'}`}></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
              className="block md:hidden text-slate-800 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline transition-colors duration-300 relative z-50 p-1 rounded-lg font-medium"
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
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed top-[72px] bg-white/95 border-2 border-slate-200 rounded-b-xl max-h-[calc(100vh-80px)] overflow-y-auto shadow-lg shadow-slate-300/10 w-[85%] left-[50%] transform -translate-x-1/2"
          >
            <div className="container mx-auto px-4 py-2 flex flex-col space-y-2 antialiased">
              <Link 
                href="/" 
                className={`text-slate-800 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline transition-all duration-300 py-2 border-b border-slate-200/30 relative group text-sm rounded-md font-medium ${isActive('/') ? 'text-yellow-500 nav-link-active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">Home</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform transition-transform duration-300 ${isActive('/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus-visible:scale-x-100'}`}></span>
              </Link>
              <Link 
                href="/destinations" 
                className={`text-slate-800 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline transition-all duration-300 py-2 border-b border-slate-200/30 relative group text-sm rounded-md font-medium ${isActive('/destinations') ? 'text-yellow-500 nav-link-active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">Destinations</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform transition-transform duration-300 ${isActive('/destinations') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus-visible:scale-x-100'}`}></span>
              </Link>
              <Link 
                href="/packages" 
                className={`text-slate-800 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline transition-all duration-300 py-2 border-b border-slate-200/30 relative group text-sm rounded-md font-medium ${isActive('/packages') ? 'text-yellow-500 nav-link-active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">Packages</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform transition-transform duration-300 ${isActive('/packages') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus-visible:scale-x-100'}`}></span>
              </Link>
              <Link 
                href="/about" 
                className={`text-slate-800 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline transition-all duration-300 py-2 border-b border-slate-200/30 relative group text-sm rounded-md font-medium ${isActive('/about') ? 'text-yellow-500 nav-link-active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">About Us</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform transition-transform duration-300 ${isActive('/about') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus-visible:scale-x-100'}`}></span>
              </Link>
              <Link 
                href="/contact" 
                className={`text-slate-800 hover:text-yellow-500 active:text-yellow-500 focus-visible:text-yellow-500 no-focus-outline transition-all duration-300 py-2 relative group text-sm rounded-md font-medium ${isActive('/contact') ? 'text-yellow-500 nav-link-active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="relative z-10">Contact</span>
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform transition-transform duration-300 ${isActive('/contact') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100 group-active:scale-x-100 group-focus-visible:scale-x-100'}`}></span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar; 