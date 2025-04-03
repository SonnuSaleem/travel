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
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="About Safarnama"
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
              About <span className="text-primary">Safar</span><span className="text-secondary">nama</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl max-w-3xl mx-auto"
            >
              Your trusted partner for unforgettable travel experiences in Pakistan
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
                Founded in 2018, Safarnama began with a simple mission: to showcase the natural beauty and cultural richness of Pakistan to the world. What started as a small team of passionate local travelers has grown into a leading travel agency connecting visitors to Pakistan's hidden treasures.
              </p>
              <p className="text-light-dark mb-4">
                Our founders, avid explorers of Pakistan's diverse landscapes, were frustrated by the lack of comprehensive travel services that truly captured the essence of Pakistani hospitality and adventure. They envisioned a service that combined modern convenience with authentic local experiences.
              </p>
              <p className="text-light-dark">
                Today, we're proud to have helped thousands of travelers create memories that last a lifetime across Pakistan's breathtaking northern areas, historic sites, and coastal regions. Our commitment to exceptional service, cultural sensitivity, and passion for our homeland remains at the heart of everything we do.
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
              <div className="text-5xl font-bold mb-2 text-secondary">5K+</div>
              <div className="text-xl">Happy Travelers</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-2 text-secondary">50+</div>
              <div className="text-xl">Destinations</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-2 text-secondary">6</div>
              <div className="text-xl">Years of Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold mb-2 text-secondary">4.8</div>
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
                We prioritize your needs and preferences, crafting personalized experiences that exceed expectations and showcase the best of Pakistani hospitality.
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
                We're committed to sustainable tourism practices that respect local cultures, support communities, and protect Pakistan's natural environments.
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
                We operate with honesty and transparency, building trust through every interaction and ensuring your journey through Pakistan is safe and reliable.
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
                We strive for excellence in every detail, continuously improving our services to deliver the best travel experiences across Pakistan's diverse landscapes.
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
            Our diverse team of local travel experts is passionate about sharing Pakistan's beauty and cultural heritage with the world.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Muzammil Saleem',
                title: 'CEO & Founder',
                image: 'https://res.cloudinary.com/dfwbsedxv/image/upload/v1735480454/Untitled_design_18_snrdwk.png',
                objectPosition: 'center top'
              },
              {
                name: 'Ahmed Khan',
                title: 'Head of Operations',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                objectPosition: 'center'
              },
              {
                name: 'Fatima Hassan',
                title: 'Lead Tour Guide',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                objectPosition: 'center'
              },
              {
                name: 'Ali Raza',
                title: 'Customer Experience',
                image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
                objectPosition: 'center'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                viewport={{ once: true }}
                className="relative bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all p-6 border border-amber-300 hover:scale-105 group"
              >
                {/* Shimmer effect overlay */}
                <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                  <div className="absolute -inset-[100%] top-0 opacity-30 bg-gradient-to-r from-transparent via-white to-transparent transform rotate-45 translate-x-[100%] group-hover:animate-shimmer"></div>
                </div>
                
                <div className="relative flex justify-center mb-4">
                  <div className="w-28 h-28 rounded-full overflow-hidden border-3 border-amber-400 shadow-md bg-white">
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={112}
                      height={112}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: member.objectPosition }}
                    />
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-amber-800 mb-1">{member.name}</h3>
                  <p className="text-amber-700">{member.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 