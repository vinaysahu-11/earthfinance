import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink, createGeneralWhatsAppMessage } from '../../utils/whatsapp';

export const WhatsAppContactButton: React.FC<{ text?: string; className?: string }> = ({
  text = 'Connect on WhatsApp',
  className
}) => {
  const link = getWhatsAppLink(createGeneralWhatsAppMessage());

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#168B45] hover:bg-[#127439] text-white text-sm font-semibold rounded-md shadow-sm transition-all duration-200 ${className || ''}`}
    >
      <MessageCircle className="w-4 h-4" />
      <span>{text}</span>
    </a>
  );
};
