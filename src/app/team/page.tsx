'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import TeamMemberCard from '@/components/TeamMemberCard';
import { teamMembers } from '@/data/team';
import BackButton from '@/components/BackButton';

export default function Team() {
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-dark-light to-dark">
      <BackButton />
      
      {/* Hero Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <Image 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Our Team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 to-dark/50" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-light mb-4"
            >
              Meet Our <span className="text-secondary">Team</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-light-dark max-w-2xl mx-auto px-4"
            >
              Our passionate experts are dedicated to creating unforgettable travel experiences across Pakistan's most breathtaking destinations
            </motion.p>
          </div>
        </div>
      </div>

      {/* Team Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <TeamMemberCard 
                id={member.id}
                name={member.name}
                role={member.role}
                description={member.description}
                imageUrl={member.imageUrl}
                bgColor={member.bgColor}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Join Us Section */}
      <div className="bg-gradient-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-light mb-4">Join Our Team</h2>
          <p className="text-light-dark max-w-2xl mx-auto mb-8">
            Passionate about travel and showcasing the beauty of Pakistan? We're always looking for talented individuals to join our growing team.
          </p>
          <button className="bg-dark hover:bg-dark-light text-light font-bold py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg">
            View Open Positions
          </button>
        </div>
      </div>
    </div>
  );
} 