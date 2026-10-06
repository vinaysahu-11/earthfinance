import { WHATSAPP_NUMBER } from '../config/constants';

export const getWhatsAppLink = (message: string, customPhone?: string): string => {
  const phone = (customPhone || WHATSAPP_NUMBER).replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
};

export const createLeadWhatsAppMessage = (lead: {
  loanType?: string;
  amount?: string;
  city?: string;
}): string => {
  return `Hello Earth Finance, I am interested in exploring ${
    lead.loanType || 'a Business Loan'
  }${lead.amount ? ` for ${lead.amount}` : ''}${lead.city ? ` in ${lead.city}` : ''}. Please guide me on eligibility and requirements.`;
};

export const createGeneralWhatsAppMessage = (): string => {
  return `Hello Earth Finance, I would like to speak with a financial advisory specialist regarding business loan options.`;
};
