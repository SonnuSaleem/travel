'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

interface TeamMemberCardProps {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  bgColor?: string;
}

const TeamMemberCard = ({
  id,
  name,
  role,
  description,
  imageUrl,
  bgColor = 'bg-dark',
}: TeamMemberCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`${bgColor} rounded-lg overflow-hidden shadow-xl transition-all duration-300 h-full flex flex-col`}
      style={{ 
        transform: 'perspective(1000px) rotateY(6deg) rotateX(4deg)', 
        transformStyle: 'preserve-3d',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div className="relative h-[400px] w-full flex flex-col items-center">
        {/* Profile Image */}
        <div className="absolute w-32 h-32 rounded-full overflow-hidden border-4 border-light shadow-lg z-10"
             style={{ 
               top: '30px',
               transform: 'translateZ(30px)' 
             }}>
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Content */}
        <div className="absolute top-48 px-5 text-center">
          <h3 className="text-2xl font-bold text-light mb-1"
              style={{ transform: 'translateZ(20px)' }}>
            {name}
          </h3>
          <p className="text-secondary text-lg mb-4"
             style={{ transform: 'translateZ(15px)' }}>
            {role}
          </p>
          <p className="text-light-dark text-sm px-3 leading-relaxed"
             style={{ transform: 'translateZ(10px)' }}>
            {description}
          </p>
        </div>
      </div>

      {/* Yellow Button */}
      <div className="mt-auto">
        <Link href={`/team/${id}`} className="block w-full">
          <div className="bg-secondary flex items-center justify-center py-5 hover:bg-secondary-dark transition-colors duration-300 cursor-pointer">
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center justify-center w-12 h-12 rounded-full bg-secondary-light"
            >
              <FaArrowRight className="text-dark text-xl" />
            </motion.div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default TeamMemberCard; 