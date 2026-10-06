export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'STAFF';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  password_hash?: string;
  role: AdminRole;
  is_active: boolean;
  last_login?: Date | null;
  created_at: Date;
  updated_at: Date;
}

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'FOLLOW_UP'
  | 'DOCUMENTS_REQUESTED'
  | 'DOCUMENTS_RECEIVED'
  | 'PROCESSING'
  | 'APPROVED'
  | 'DISBURSED'
  | 'REJECTED'
  | 'CLOSED';

export interface Lead {
  id: string;
  name: string;
  phone: string;
  email: string;
  loan_category_id?: string | null;
  loan_product_id?: string | null;
  loan_type?: string | null;
  required_amount?: string | null;
  city?: string | null;
  business_type?: string | null;
  message?: string | null;
  source: string;
  status: LeadStatus;
  assigned_to?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface LeadNote {
  id: string;
  lead_id: string;
  author_id?: string | null;
  author_name?: string | null;
  note: string;
  created_at: Date;
}

export interface LeadStatusHistory {
  id: string;
  lead_id: string;
  old_status?: string | null;
  new_status: LeadStatus;
  changed_by?: string | null;
  remarks?: string | null;
  created_at: Date;
}

export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'RESCHEDULED'
  | 'CANCELLED'
  | 'COMPLETED'
  | 'NO_SHOW';

export type ConsultationType = 'OFFICE' | 'ONLINE' | 'PHONE';

export interface Appointment {
  id: string;
  lead_id?: string | null;
  name: string;
  phone: string;
  email: string;
  service: string;
  appointment_date: string;
  appointment_time: string;
  consultation_type: ConsultationType;
  meeting_link?: string | null;
  status: AppointmentStatus;
  notes?: string | null;
  assigned_to?: string | null;
  created_at: Date;
  updated_at: Date;
}

export type ReviewStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'FEATURED';

export interface Review {
  id: string;
  name: string;
  photo?: string | null;
  rating: number;
  review: string;
  profession?: string | null;
  business?: string | null;
  status: ReviewStatus;
  created_at: Date;
  updated_at: Date;
}

export interface LoanProduct {
  id: string;
  category_id?: string | null;
  name: string;
  slug: string;
  category: string;
  short_description?: string | null;
  description?: string | null;
  loan_amount?: string | null;
  interest_rate?: string | null;
  collateral?: string | null;
  eligibility: string[];
  documents: string[];
  features: string[];
  image?: string | null;
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  seo_title?: string | null;
  seo_description?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface LoanCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  is_active: boolean;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  title: string;
  short_description?: string | null;
  description?: string | null;
  hero_image?: string | null;
  icon?: string | null;
  benefits: any[];
  loan_options: any[];
  is_active: boolean;
  display_order: number;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED';
  is_replied: boolean;
  created_at: Date;
  updated_at: Date;
}
