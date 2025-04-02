'use client';

import { useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface WhatsAppButtonProps {
  phoneNumber: string;
}

const WhatsAppButton = ({ phoneNumber }: WhatsAppButtonProps) => {
  const [showTooltip, setShowTooltip] = useState(false);
  
  // Format the phone number for WhatsApp API
  const formattedNumber = phoneNumber.replace(/\D/g, '');
  
  // Add a predefined message that will appear in the chat
  const predefinedMessage = encodeURIComponent("Hi! I'm interested in your travel packages. Can you provide more information?");
  const whatsappUrl = `https://wa.me/${formattedNumber}?text=${predefinedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-full right-0 mb-2 bg-slate-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap md:block hidden"
            style={{ right: '0' }}
          >
            Chat with us
            <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-slate-800"></div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <div className="relative">
        {/* Shine effect overlay */}
        <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
          <div 
            className="w-[200%] h-[200%] absolute -top-[150%] -left-[50%] bg-white opacity-20 rotate-45 transform-gpu"
            style={{
              backgroundImage: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
              animation: 'shine 3s infinite'
            }}
          ></div>
        </div>
        
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative bg-gradient-to-tr from-green-600 to-green-400 text-white rounded-full p-3.5 shadow-[0_6px_16px_rgba(0,0,0,0.4),0_0_0_3px_rgba(255,255,255,0.1)_inset] hover:shadow-[0_8px_25px_rgba(0,0,0,0.5),0_0_0_3px_rgba(255,255,255,0.15)_inset] transition-all duration-300 flex items-center justify-center border border-green-400/30"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onFocus={() => setShowTooltip(true)}
          onBlur={() => setShowTooltip(false)}
          aria-label="Chat with us on WhatsApp"
        >
          <FaWhatsapp size={32} />
        </motion.a>
      </div>
      
      {/* Add CSS animation */}
      <style jsx global>{`
        @keyframes shine {
          0% {
            left: -100%;
          }
          20%, 100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton; 