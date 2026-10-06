export type AdminRole = 'SUPER_ADMIN' | 'ADMIN' | 'STAFF';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  is_active: boolean;
  last_login?: string | null;
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
  loan_product_name?: string | null;
  loan_category_name?: string | null;
  loan_type?: string | null;
  required_amount?: string | null;
  city?: string | null;
  business_type?: string | null;
  message?: string | null;
  source: string;
  status: LeadStatus;
  assigned_to?: string | null;
  assigned_to_name?: string | null;
  created_at: string;
  updated_at: string;
}

export interface LeadNote {
  id: string;
  lead_id: string;
  author_id?: string | null;
  author_name?: string | null;
  note: string;
  created_at: string;
}

export interface LeadStatusHistory {
  id: string;
  lead_id: string;
  old_status?: string | null;
  new_status: LeadStatus;
  changed_by?: string | null;
  changed_by_name?: string | null;
  remarks?: string | null;
  created_at: string;
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
  assigned_to_name?: string | null;
  created_at: string;
  updated_at: string;
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
  created_at: string;
}

export interface LoanCategory {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  icon?: string | null;
  is_active: boolean;
  display_order: number;
}

export interface LoanProduct {
  id: string;
  category_id?: string | null;
  category_name?: string | null;
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
  created_at: string;
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
  benefits: string[];
  loan_options: string[];
  is_active: boolean;
  display_order: number;
}

export interface Testimonial {
  id: string;
  client_name: string;
  client_title?: string | null;
  company_name?: string | null;
  avatar_url?: string | null;
  rating: number;
  content: string;
  is_featured: boolean;
}

export interface Faq {
  id: string;
  category: string;
  question: string;
  answer: string;
  display_order: number;
  is_published?: boolean;
  status?: 'Published' | 'Draft' | 'Archived';
  views?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string | null;
  cta_text?: string | null;
  cta_link?: string | null;
  background_image?: string | null;
  position: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption?: string | null;
  image_url: string;
  category?: string | null;
  display_order?: number;
  is_active?: boolean;
  alt_text?: string | null;
  filename?: string | null;
  dimensions?: string | null;
  file_size?: string | null;
  format?: string | null;
  cms_token?: string | null;
  page_references?: string[];
  pages_count?: number;
  author?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  content: string;
  cover_image?: string | null;
  author: string;
  category?: string | null;
  tags: string[];
  status?: 'PUBLISHED' | 'DRAFT' | 'SCHEDULED' | 'ARCHIVED';
  read_time?: string;
  methodology?: string;
  reads_count?: number;
  shares_count?: number;
  leads_count?: number;
  author_role?: string;
  author_initials?: string;
  published_at?: string | null;
  scheduled_at?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
  status: 'UNREAD' | 'READ' | 'REPLIED' | 'ARCHIVED' | 'CONVERTED' | 'CLOSED';
  company?: string | null;
  location?: string | null;
  channel?: string | null;
  mandate_amount?: string | null;
  priority?: string | null;
  underwriter?: string | null;
  underwriter_initials?: string | null;
  lead_id?: string | null;
  gstin?: string | null;
  ip_address?: string | null;
  otp_verified?: boolean;
  category?: string | null;
  is_replied?: boolean;
  created_at: string;
}

export interface DashboardStats {
  hasData: boolean;
  metrics: {
    totalLeads: number;
    newLeads: number;
    pendingAppointments: number;
    todayAppointments: number;
    applications: number;
    approvedLeads: number;
    disbursedLeads: number;
    pendingReviews: number;
  };
  statusDistribution: { status: string; count: number }[];
  categoryDistribution: { name: string; count: number }[];
  recentLeads: Lead[];
  upcomingAppointments: Appointment[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
