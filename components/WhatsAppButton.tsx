'use client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({ 
  phoneNumber = '1234567890', // Replace with your WhatsApp number (with country code, no +)
  message = 'Hello! I need help with your products.'
}: WhatsAppButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute right-16 mb-2 px-4 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap shadow-lg">
            Chat with us on WhatsApp
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
          </div>
        )}
        
        {/* WhatsApp Button */}
        <div className="bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 flex items-center justify-center group">
          <MessageCircle className="h-6 w-6" />
        </div>
      </a>
    </div>
  );
}

