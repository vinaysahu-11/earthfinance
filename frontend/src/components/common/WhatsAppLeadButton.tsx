import React from 'react';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink, createLeadWhatsAppMessage } from '../../utils/whatsapp';

interface WhatsAppLeadButtonProps {
  loanType?: string;
  amount?: string;
  city?: string;
  text?: string;
  className?: string;
}

export const WhatsAppLeadButton: React.FC<WhatsAppLeadButtonProps> = ({
  loanType,
  amount,
  city,
  text = 'Chat on WhatsApp',
  className
}) => {
  const msg = createLeadWhatsAppMessage({ loanType, amount, city });
  const link = getWhatsAppLink(msg);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#168B45] hover:bg-[#127439] text-white text-sm font-semibold rounded-md shadow-sm transition-all duration-200 ${className || ''}`}
    >
      <MessageCircle className="w-4 h-4" />
      <span>{text}</span>
    </a>
  );
};
