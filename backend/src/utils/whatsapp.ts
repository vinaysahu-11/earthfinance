import { config } from '../config/env';

export const buildWhatsAppLink = (message: string, customPhone?: string): string => {
  const phone = (customPhone || config.whatsappNumber).replace(/[^0-9]/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
};

export const getLeadWhatsAppTemplate = (lead: {
  name: string;
  phone: string;
  loanType?: string | null;
  amount?: string | null;
  city?: string | null;
}): string => {
  return `Hello ${lead.name}, this is regarding your financial enquiry for ${lead.loanType || 'Business Loan'} with Earth Finance. How may we assist you today?`;
};

export const getAppointmentWhatsAppTemplate = (appointment: {
  name: string;
  service: string;
  date: string;
  time: string;
  type: string;
}): string => {
  return `Hello ${appointment.name}, your Earth Finance consultation for ${appointment.service} is scheduled on ${appointment.date} at ${appointment.time} (${appointment.type}). Let us know if you need any adjustments.`;
};
