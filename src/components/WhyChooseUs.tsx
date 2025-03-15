'use client';

import { motion } from 'framer-motion';
import { FaGlobe, FaHandshake, FaMoneyBillWave, FaHeadset } from 'react-icons/fa';

const features = [
  {
    icon: <FaGlobe className="text-4xl text-primary" />,
    title: 'Worldwide Destinations',
    description: 'Explore hundreds of exciting destinations across the globe with our carefully curated travel packages.'
  },
  {
    icon: <FaHandshake className="text-4xl text-primary" />,
    title: 'Personalized Experience',
    description: 'We tailor each journey to your preferences, ensuring a unique and memorable travel experience.'
  },
  {
    icon: <FaMoneyBillWave className="text-4xl text-primary" />,
    title: 'Best Price Guarantee',
    description: 'Get the best value for your money with our competitive pricing and exclusive deals.'
  },
  {
    icon: <FaHeadset className="text-4xl text-primary" />,
    title: '24/7 Customer Support',
    description: 'Our dedicated support team is available around the clock to assist you before, during, and after your trip.'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-light mb-4">
            Why Choose <span className="text-primary">Travel</span><span className="text-secondary">Ease</span>
          </h2>
          <p className="text-light-dark max-w-3xl mx-auto">
            We're dedicated to making your travel dreams come true with exceptional service and unforgettable experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-dark-light p-8 rounded-lg text-center hover:shadow-lg transition-shadow border border-dark-lighter"
            >
              <div className="mb-4 flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold text-secondary mb-3">{feature.title}</h3>
              <p className="text-light-dark">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="/about"
            className="inline-block bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-light font-semibold py-3 px-6 rounded-md transition-colors"
          >
            Learn More About Us
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs; 