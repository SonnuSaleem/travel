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
          className="object-cover bowl-shape"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark/50" />
        
        {/* Curved bottom shape - Bowl shape */}
        <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ height: "100px" }}>
          <div className="absolute bottom-0 w-full h-[200px] rounded-[50%] bg-dark" style={{ transform: "scale(2, 1)", marginBottom: "-100px" }}></div>
        </div>
        
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
                Founded in 2018, Safarnama began with a simple mission: to showcase the natural beauty and cultural richness of Pakistan to the world. What started as a small team of passionate local travelers has grown into a leading travel agency connecting visitors to Pakistan&apos;s hidden treasures.
              </p>
              <p className="text-light-dark mb-4">
                Our founders, avid explorers of Pakistan&apos;s diverse landscapes, were frustrated by the lack of comprehensive travel services that truly captured the essence of Pakistani hospitality and adventure. They envisioned a service that combined modern convenience with authentic local experiences.
              </p>
              <p className="text-light-dark">
                Today, we&apos;re proud to have helped thousands of travelers create memories that last a lifetime across Pakistan&apos;s breathtaking northern areas, historic sites, and coastal regions. Our commitment to exceptional service, cultural sensitivity, and passion for our homeland remains at the heart of everything we do.
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
                We&apos;re committed to sustainable tourism practices that respect local cultures, support communities, and protect Pakistan&apos;s natural environments.
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
                We strive for excellence in every detail, continuously improving our services to deliver the best travel experiences across Pakistan&apos;s diverse landscapes.
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
            Our diverse team of local travel experts is passionate about sharing Pakistan&apos;s beauty and cultural heritage with the world.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: 'Muzammil Saleem',
                title: 'CEO & Founder',
                description: 'Together, we challenge ourselves for a better tomorrow by exploring amazing places that help live our best life and maintain lasting impression',
                image: 'https://res.cloudinary.com/dfwbsedxv/image/upload/v1735480454/Untitled_design_18_snrdwk.png'
              },
              {
                name: 'Fatima Hassan',
                title: 'Travel Expert',
                description: 'Contemporary design and well-made products are things that we think everybody should be able to have. It&apos;s the reason we do what we do',
                image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
              },
              {
                name: 'Ahmed Khan',
                title: 'Marketing Director',
                description: 'Our collection is ever-evolving. Yet, it remains consistently relatable and accessible. Our purpose is to inspire and help create the look you want',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
              },
              {
                name: 'Sara Malik',
                title: 'Lead Tour Guide',
                description: 'With passion for exploration and deep knowledge of local cultures, I ensure our travelers have authentic and unforgettable experiences',
                image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="bg-dark rounded-lg overflow-hidden shadow-xl h-full flex flex-col mx-auto max-w-[340px] md:max-w-[280px] w-full"
                style={{ 
                  transform: 'perspective(1000px) rotateY(6deg) rotateX(4deg)', 
                  transformStyle: 'preserve-3d',
                  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                }}
              >
                <div className="relative h-[450px] sm:h-[420px] w-full flex flex-col items-center">
                  {/* Profile Image - 60% height */}
                  <div className="absolute w-full h-[60%] overflow-hidden z-10"
                      style={{ 
                        transform: 'translateZ(20px)' 
                      }}>
                    <div className="absolute w-36 h-36 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-light shadow-lg z-10 left-1/2 -translate-x-1/2 top-8">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute top-56 sm:top-48 px-5 text-center w-full">
                    <h3 className="text-2xl sm:text-xl font-bold text-light mb-2 sm:mb-1"
                        style={{ transform: 'translateZ(20px)' }}>
                      {member.name}
                    </h3>
                    <p className="text-secondary text-lg sm:text-base mb-4 sm:mb-3"
                        style={{ transform: 'translateZ(15px)' }}>
                      {member.title}
                    </p>
                    <p className="text-light-dark text-base sm:text-xs px-2 leading-relaxed"
                        style={{ transform: 'translateZ(10px)' }}>
                      {member.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 