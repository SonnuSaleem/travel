'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FaStar, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface DestinationCardProps {
  id: string;
  name: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  imageUrl: string;
  duration: string;
  featured?: boolean;
}

const DestinationCard = ({
  id,
  name,
  description,
  location,
  price,
  rating,
  imageUrl,
  duration,
  featured = false,
}: DestinationCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/destinations/${id}`);
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`bg-dark rounded-lg overflow-hidden shadow-lg transition-all duration-300 h-full flex flex-col ${
        featured ? 'border-2 border-primary' : ''
      } cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="relative h-60 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className={`object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        {featured && (
          <div className="absolute top-4 right-4 z-10">
            <span className="feature-badge">Featured</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-dark to-transparent h-20" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-light line-clamp-1">{name}</h3>
          <div className="flex items-center bg-dark-light/30 px-2 py-1 rounded">
            <FaStar className="text-secondary mr-1" />
            <span className="text-light">{rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-center text-light-dark mb-2">
          <FaMapMarkerAlt className="mr-2 text-primary" />
          <span className="line-clamp-1">{location}</span>
        </div>

        <div className="flex items-center text-light-dark mb-2">
          <FaClock className="mr-2 text-primary" />
          <span>{duration}</span>
        </div>

        <p className="text-light-dark mb-6 line-clamp-3 flex-grow">{description}</p>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-dark-light/10">
          <div className="text-secondary font-bold">
            ${price.toLocaleString()}
            <span className="text-light-dark font-normal text-sm"> /person</span>
          </div>
          <Link
            href={`/destinations/${id}`}
            className="bg-gradient-primary hover:opacity-90 text-black px-4 py-2 rounded-md transition-all transform hover:scale-105 active:scale-95 shadow-md font-medium"
            onClick={(e) => e.stopPropagation()}
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default DestinationCard; 