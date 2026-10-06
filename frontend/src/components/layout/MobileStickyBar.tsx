import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import { SUPPORT_PHONE } from '../../config/constants';
import { getWhatsAppLink, createGeneralWhatsAppMessage } from '../../utils/whatsapp';

export const MobileStickyBar: React.FC = () => {
  const whatsappUrl = getWhatsAppLink(createGeneralWhatsAppMessage());

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-2 px-3">
      <div className="grid grid-cols-3 gap-2">
        {/* Call button */}
        <a
          href={`tel:${SUPPORT_PHONE.replace(/\s+/g, '')}`}
          className="flex flex-col items-center justify-center py-2 px-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 transition-colors"
        >
          <Phone className="w-4 h-4 text-[#071B3A] mb-1" />
          <span className="text-[11px] font-bold">Call Now</span>
        </a>

        {/* WhatsApp button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 bg-[#168B45] hover:bg-[#127439] rounded-lg text-white transition-colors"
        >
          <MessageCircle className="w-4 h-4 text-white mb-1" />
          <span className="text-[11px] font-bold">WhatsApp</span>
        </a>

        {/* Apply button */}
        <Link
          to="/apply"
          className="flex flex-col items-center justify-center py-2 px-1 bg-[#071B3A] hover:bg-[#0d2b59] rounded-lg text-white transition-colors"
        >
          <FileText className="w-4 h-4 text-[#F4C542] mb-1" />
          <span className="text-[11px] font-bold text-[#F4C542]">Apply Now</span>
        </Link>
      </div>
    </div>
  );
};
