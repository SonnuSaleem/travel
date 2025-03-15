'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { testimonials } from '@/data/testimonials';

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <section className="py-16 bg-dark-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
            What Our <span className="text-primary">Travelers</span> Say
          </h2>
          <p className="text-light-dark max-w-3xl mx-auto">
            Read testimonials from our satisfied customers who have experienced unforgettable journeys with us.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-dark rounded-xl shadow-lg p-8 md:p-12 border border-dark-light">
            <FaQuoteLeft className="text-primary/30 text-4xl absolute top-8 left-8" />
            
            <div className="flex flex-col md:flex-row items-center">
              <div className="mb-6 md:mb-0 md:mr-8">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary/20">
                  <Image
                    src={testimonials[activeIndex].customerImage || '/images/testimonials/default-avatar.jpg'}
                    alt={testimonials[activeIndex].customerName}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`${
                        i < testimonials[activeIndex].rating ? 'text-secondary' : 'text-dark-lighter'
                      } text-xl mr-1`}
                    />
                  ))}
                </div>
                
                <p className="text-light-dark italic mb-6 text-lg">
                  "{testimonials[activeIndex].comment}"
                </p>
                
                <div>
                  <h4 className="font-bold text-light text-lg">
                    {testimonials[activeIndex].customerName}
                  </h4>
                  <p className="text-primary">
                    {testimonials[activeIndex].destination}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dots for navigation */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`w-3 h-3 rounded-full mx-1 focus:outline-none ${
                  index === activeIndex ? 'bg-primary' : 'bg-dark-lighter'
                }`}
                aria-label={`View testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 