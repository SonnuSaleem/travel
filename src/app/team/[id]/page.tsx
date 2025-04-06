'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { teamMembers } from '@/data/team';
import BackButton from '@/components/BackButton';
import { FaEnvelope, FaPhone, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';

export default function TeamMemberDetail() {
  const router = useRouter();
  const params = useParams();
  const [member, setMember] = useState<any>(null);

  useEffect(() => {
    const id = params.id as string;
    const foundMember = teamMembers.find(m => m.id === id);

    if (foundMember) {
      setMember(foundMember);
    } else {
      // Member not found, redirect to team page
      router.push('/team');
    }
  }, [params.id, router]);

  if (!member) {
    return (
      <div className="pt-16 min-h-screen bg-dark flex items-center justify-center">
        <div className="animate-pulse text-light">Loading...</div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gradient-to-b from-dark-light to-dark">
      <div className="container mx-auto px-4 py-8">
        <BackButton />
        
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-dark rounded-xl overflow-hidden shadow-2xl">
            {/* Hero Section */}
            <div className="relative h-64 md:h-96">
              <Image 
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                alt={member.name}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark to-transparent" />
              
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex items-end">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-light mr-4 md:mr-6 flex-shrink-0">
                  <Image 
                    src={member.imageUrl}
                    alt={member.name}
                    width={128}
                    height={128}
                    className="object-cover"
                  />
                </div>
                
                <div>
                  <h1 className="text-2xl md:text-4xl font-bold text-light">{member.name}</h1>
                  <p className="text-secondary text-lg md:text-xl">{member.role}</p>
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2">
                  <h2 className="text-xl font-bold text-light mb-4">About</h2>
                  <p className="text-light-dark mb-6">{member.description}</p>
                  
                  <h2 className="text-xl font-bold text-light mb-4">Expertise</h2>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['Travel Planning', 'Customer Service', 'Local Knowledge', 'Cultural Experience'].map((skill, idx) => (
                      <span key={idx} className="bg-dark-light px-3 py-1 rounded-full text-light-dark text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                  
                  <h2 className="text-xl font-bold text-light mb-4">Background</h2>
                  <p className="text-light-dark">
                    With over 10 years of experience in the travel industry, {member.name} has developed a deep understanding of what makes a journey truly memorable. Their passion for Pakistan's diverse landscapes and rich cultural heritage shines through in every itinerary they create.
                  </p>
                </div>
                
                {/* Contact Info */}
                <div className="bg-dark-light rounded-lg p-6">
                  <h2 className="text-xl font-bold text-light mb-4">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                        <FaEnvelope className="text-dark" />
                      </div>
                      <div>
                        <p className="text-sm text-light-dark">Email</p>
                        <p className="text-light">{member.name.toLowerCase().replace(' ', '.')}@safarnamatravels.fun</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center mr-3">
                        <FaPhone className="text-dark" />
                      </div>
                      <div>
                        <p className="text-sm text-light-dark">Phone</p>
                        <p className="text-light">+92 300 555 7890</p>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-dark">
                      <p className="text-light mb-2">Social Media</p>
                      <div className="flex space-x-3">
                        <a href="#" className="w-10 h-10 rounded-full bg-dark-lighter hover:bg-secondary transition-colors duration-300 flex items-center justify-center">
                          <FaLinkedin className="text-light" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-dark-lighter hover:bg-secondary transition-colors duration-300 flex items-center justify-center">
                          <FaTwitter className="text-light" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-dark-lighter hover:bg-secondary transition-colors duration-300 flex items-center justify-center">
                          <FaFacebook className="text-light" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-dark-light">
                <h2 className="text-xl font-bold text-light mb-4">Featured Destinations</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[1, 2, 3].map((num) => (
                    <div key={num} className="bg-dark-light rounded-lg overflow-hidden">
                      <div className="h-40 relative">
                        <Image 
                          src={`https://images.unsplash.com/photo-${1560000000000 + num * 10000}?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`}
                          alt="Destination"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-3">
                        <h3 className="text-light font-semibold">Destination {num}</h3>
                        <p className="text-light-dark text-sm">Expert guide</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 