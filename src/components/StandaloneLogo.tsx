'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface StandaloneLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

const StandaloneLogo: React.FC<StandaloneLogoProps> = ({
  className = '',
  size = 160,
  animated = true
}) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const mainVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10,
        duration: 0.8,
        delayChildren: 0.3,
        staggerChildren: 0.1
      }
    }
  };

  const elementsVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 10,
        duration: 0.5
      }
    }
  };

  // Calculate tree image size (60% of the overall size)
  const treeSize = Math.round(size * 0.6);

  if (!isClient) {
    // Return placeholder to avoid hydration mismatch
    return <div style={{ width: size, height: size }} className={className}></div>;
  }

  return (
    <motion.div 
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
      initial={animated ? "hidden" : "visible"}
      animate="visible"
      variants={mainVariants}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Background Circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div 
            className="rounded-full bg-[#2A2A42] border border-white/20"
            style={{ width: size * 0.85, height: size * 0.85 }}
            variants={elementsVariants}
          />
        </div>
        
        {/* Tree Image */}
        <motion.div
          className="relative z-10 mb-4"
          variants={elementsVariants}
        >
          <Image 
            src="/tree.png" 
            alt="Palm Tree" 
            width={treeSize}
            height={treeSize}
            className="object-contain"
          />
        </motion.div>
        
        {/* Text "SF" (for Safarnama) */}
        <motion.div
          className="relative z-10 mt-3"
          variants={elementsVariants}
        >
          <span 
            className="text-white font-light tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
            style={{ 
              fontSize: size * 0.15,
              fontFamily: "'Oswald', sans-serif"
            }}
          >
            SF
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default StandaloneLogo; 