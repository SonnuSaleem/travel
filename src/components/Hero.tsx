'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Add event listeners to the video
    const videoElement = videoRef.current;
    if (videoElement) {
      // Ensure video plays properly
      videoElement.play().catch(error => {
        console.log('Video autoplay failed:', error);
      });
    }
  }, []);

  // Animation variants for smoother transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.25, 0.1, 0.25, 1] // cubic-bezier easing for smoother motion
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.6
      }
    }
  };

  return (
    <div className="relative h-screen">
      {/* Background Video */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Video Background */}
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source 
            src="/HeroVideo.mp4" 
            type="video/mp4" 
          />
          Your browser does not support the video tag.
        </video>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark/80 via-dark/60 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-light px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mb-12"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white drop-shadow-lg"
          >
            <span className="block"><span className="bg-gradient-to-r from-purple-800 via-pink-500 to-red-400 bg-clip-text text-transparent">Phool Nagar</span> Travels</span>
            <span className="text-primary-light drop-shadow-[0_2px_4px_rgba(255,107,107,0.6)]">Your Trusted </span>
            <span className="text-secondary drop-shadow-[0_2px_4px_rgba(255,183,3,0.6)]">Travel Agency</span>
          </motion.h1>
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl mb-12 text-secondary-light drop-shadow-md"
          >
            Best travel agency in Phool Nagar offering affordable tour packages and visa services
          </motion.p>
          
          <motion.div
            variants={buttonVariants}
            className="flex justify-center"
          >
            <button
              type="button"
              onClick={() => window.location.href = '/destinations'}
              className="group relative bg-gradient-to-r from-primary via-accent to-secondary text-white font-bold py-4 px-12 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-dark shadow-lg shadow-accent/20 transform hover:scale-105 active:scale-95 hover:bg-gradient-to-r hover:from-purple-800 hover:via-indigo-700 hover:to-blue-700"
            >
              <span className="flex items-center justify-center">
                <FaSearch className="mr-2 animate-pulse z-1" />
                <span className="tracking-wider text-white z-1">Explore Our Packages</span>
              </span>
              <div className="absolute inset-0 rounded-full bg-gray-700 opacity-80 z-0"></div>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero; 