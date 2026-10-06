import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink, createGeneralWhatsAppMessage } from '../../utils/whatsapp';

export const WhatsAppButton: React.FC<{ message?: string; className?: string }> = ({
  message,
  className
}) => {
  const link = getWhatsAppLink(message || createGeneralWhatsAppMessage());

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Earth Finance on WhatsApp"
      className={`fixed bottom-20 sm:bottom-8 right-6 z-40 flex items-center justify-center w-14 h-14 bg-[#168B45] hover:bg-[#127439] text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 ${className || ''}`}
    >
      <MessageCircle className="w-8 h-8" />
    </a>
  );
};
