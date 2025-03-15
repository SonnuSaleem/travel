'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaUsers, FaGlobe, FaHandshake, FaAward } from 'react-icons/fa';
import BackButton from '@/components/BackButton';

export default function About() {
  return (
    <div className="pt-16 bg-dark-light">
      <BackButton />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh]">
        <Image
          src="https://www.travelstourism.com/wp-content/uploads/2018/01/KAGHAN-2.jpg"
          alt="About TravelEase"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-light px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              About <span className="text-primary">Travel</span><span className="text-secondary">Ease</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto"
            >
              Your trusted partner for unforgettable travel experiences
            </motion.p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-light mb-6">Our Story</h2>
              <p className="text-light-dark mb-4">
                Founded in 2010, TravelEase began with a simple mission: to make extraordinary travel experiences accessible to everyone. What started as a small team of passionate travelers has grown into a leading travel agency with a global presence.
              </p>
              <p className="text-light-dark mb-4">
                Our founders, avid explorers themselves, were frustrated by the complexity and impersonal nature of travel planning. They envisioned a service that combined the convenience of modern technology with the personalized touch of a dedicated travel expert.
              </p>
              <p className="text-light-dark">
                Today, we're proud to have helped thousands of travelers create memories that last a lifetime. Our commitment to exceptional service, attention to detail, and passion for discovery remains at the heart of everything we do.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-lg overflow-hidden shadow-xl"
            >
              <Image
                src="https://images.unsplash.com/photo-1522199755839-a2bacb67c546?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Our story"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-primary text-light">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold mb-12 text-center"
          >
            Our Impact by the Numbers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-2 text-secondary">10K+</div>
              <div className="text-xl">Happy Travelers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-2 text-secondary">100+</div>
              <div className="text-xl">Destinations</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-2 text-secondary">12</div>
              <div className="text-xl">Years of Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-2 text-secondary">4.9</div>
              <div className="text-xl">Average Rating</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-dark-light">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-light mb-12 text-center"
          >
            Our Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-dark p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-dark-light"
            >
              <div className="flex justify-center mb-4">
                <FaUsers className="text-4xl text-primary" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Customer First</h3>
              <p className="text-light-dark">
                We prioritize your needs and preferences, crafting personalized experiences that exceed expectations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-dark p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-dark-light"
            >
              <div className="flex justify-center mb-4">
                <FaGlobe className="text-4xl text-primary" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Responsible Travel</h3>
              <p className="text-light-dark">
                We're committed to sustainable tourism practices that respect local cultures and protect the environment.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-dark p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-dark-light"
            >
              <div className="flex justify-center mb-4">
                <FaHandshake className="text-4xl text-primary" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Integrity</h3>
              <p className="text-light-dark">
                We operate with honesty and transparency, building trust through every interaction and transaction.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-dark p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow border border-dark-light"
            >
              <div className="flex justify-center mb-4">
                <FaAward className="text-4xl text-primary" />
              </div>
              <h3 className="text-xl font-bold text-secondary mb-3">Excellence</h3>
              <p className="text-light-dark">
                We strive for excellence in every detail, continuously improving our services to deliver the best travel experiences.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-dark">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-light mb-4 text-center"
          >
            Meet Our Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-light-dark max-w-3xl mx-auto mb-12 text-center"
          >
            Our diverse team of travel experts is passionate about creating unforgettable experiences for our clients.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Sarah Johnson',
                title: 'CEO & Founder',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
              },
              {
                name: 'Michael Chen',
                title: 'Head of Operations',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
              },
              {
                name: 'Emily Rodriguez',
                title: 'Lead Travel Consultant',
                image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
              },
              {
                name: 'David Thompson',
                title: 'Customer Experience Manager',
                image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative h-64 mb-4 rounded-lg overflow-hidden group">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent opacity-70" />
                </div>
                <h3 className="text-xl font-bold text-light">{member.name}</h3>
                <p className="text-primary">{member.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 