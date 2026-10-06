import { z } from 'zod';

export const createAppointmentSchema = z.object({
  lead_id: z.string().uuid().optional().nullable(),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Valid phone number required'),
  email: z.string().email('Valid email address required'),
  service: z.string().min(2, 'Service is required'),
  appointment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  appointment_time: z.string().min(2, 'Time is required'),
  consultation_type: z.enum(['OFFICE', 'ONLINE', 'PHONE']).default('ONLINE'),
  notes: z.string().optional().nullable()
});

export const updateAppointmentStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'RESCHEDULED', 'CANCELLED', 'COMPLETED', 'NO_SHOW']),
  notes: z.string().optional(),
  meeting_link: z.string().url().optional().nullable()
});

export const rescheduleAppointmentSchema = z.object({
  appointment_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format'),
  appointment_time: z.string().min(2, 'Time is required'),
  notes: z.string().optional()
});

export const assignAppointmentSchema = z.object({
  assigned_to: z.string().uuid('Valid staff UUID required').nullable()
});
