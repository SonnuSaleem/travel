'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { useMemo } from 'react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
  className?: string;
}

const Logo = ({ 
  size = 'medium', 
  animated = true,
  className = ''
}: LogoProps) => {
  // Define size classes for text
  const textSizeClasses = useMemo(() => {
    switch (size) {
      case 'small':
        return 'text-xl md:text-2xl';
      case 'large':
        return 'text-3xl md:text-4xl';
      case 'medium':
      default:
        return 'text-2xl md:text-3xl';
    }
  }, [size]);

  // Define size for tree image
  const imageSize = useMemo(() => {
    switch (size) {
      case 'small':
        return { width: 28, height: 28 };
      case 'large':
        return { width: 40, height: 40 };
      case 'medium':
      default:
        return { width: 32, height: 32 };
    }
  }, [size]);

  // Define animation variants
  const logoVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1 
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 200, 
        damping: 10 
      }
    }
  };

  // Logo with tree image
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <Link href="/">
        <motion.div 
          className={`font-extrabold ${textSizeClasses} flex items-center`}
          initial={animated ? "hidden" : "visible"}
          animate="visible"
          variants={logoVariants}
        >
          {/* Tree Image */}
          <div className="relative mt-0">
            <motion.div 
              variants={letterVariants}
            >
              <Image 
                src="/tree.png" 
                alt="Palm Tree" 
                width={imageSize.width} 
                height={imageSize.height}
                className="object-contain"
              />
            </motion.div>
          </div>

          {/* Safarnama text in shiny white */}
          <motion.span 
            className="text-white font-light tracking-wider drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
            variants={letterVariants}
          >
            Safarnama 2.0
          </motion.span>
        </motion.div>
      </Link>
    </div>
  );
};

export default Logo; 