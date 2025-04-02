'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaWhatsapp, FaArrowLeft } from 'react-icons/fa';

export default function WhatsAppShare() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  
  // The phone number and message to be used
  const phoneNumber = "+923258894708";
  const message = "Hi! I'm interested in your travel packages. Can you provide more information?";
  
  // The nature image URL - using one from your Cloudinary account
  const natureImageUrl = "https://res.cloudinary.com/dfwbsedxv/image/upload/v1743396282/bath-indus_rv2gae.jpg";
  
  useEffect(() => {
    setIsReady(true);
  }, []);
  
  // Format the phone number for WhatsApp API
  const formattedNumber = phoneNumber.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${encodeURIComponent(message)}`;
  
  // Handle going to WhatsApp
  const goToWhatsApp = () => {
    window.open(whatsappUrl, '_blank');
  };
  
  // Handle going back
  const goBack = () => {
    router.back();
  };
  
  if (!isReady) {
    return null;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="relative w-full h-64">
          <Image 
            src={natureImageUrl}
            alt="Beautiful nature scene"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="absolute top-4 left-4">
            <button 
              onClick={goBack}
              className="flex items-center justify-center bg-white/70 backdrop-blur-sm p-2 rounded-full text-slate-800 hover:bg-white/90 transition-all"
            >
              <FaArrowLeft size={16} />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <h1 className="text-xl font-bold text-slate-900 mb-4">Ready to chat with us?</h1>
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 mb-6">
            <p className="text-slate-700">{message}</p>
          </div>
          
          <motion.button
            onClick={goToWhatsApp}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-500 text-white py-3 px-4 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWhatsapp size={20} />
            <span>Continue to WhatsApp</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
} 