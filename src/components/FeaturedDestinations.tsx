'use client';

import { motion } from 'framer-motion';
import DestinationCard from './DestinationCard';
import { destinations } from '@/data/destinations';

const FeaturedDestinations = () => {
  // Filter featured destinations
  const featuredDestinations = destinations.filter(destination => destination.featured);

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
            Featured <span className="text-primary">Destinations</span>
          </h2>
          <p className="text-light-dark max-w-3xl mx-auto">
            Explore our handpicked selection of the most popular and breathtaking destinations around the world.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <DestinationCard
                id={destination.id}
                name={destination.name}
                description={destination.description}
                location={destination.location}
                price={destination.price}
                rating={destination.rating}
                imageUrl={destination.imageUrl}
                duration={destination.duration}
                featured={destination.featured}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/destinations"
            className="inline-block bg-gradient-primary hover:opacity-90 text-light font-semibold py-3 px-6 rounded-md transition-all"
          >
            View All Destinations
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedDestinations; 