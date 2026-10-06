import { z } from 'zod';

export const createLeadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().min(10, 'Phone must be at least 10 digits').max(15),
  email: z.string().email('Please enter a valid email address'),
  loan_category_id: z.string().uuid().optional().nullable(),
  loan_product_id: z.string().uuid().optional().nullable(),
  loan_type: z.string().min(2, 'Loan type is required'),
  required_amount: z.union([z.string().min(1, 'Required amount is required'), z.number().transform((n) => n.toString())]),
  city: z.string().min(2, 'City is required'),
  business_type: z.string().optional().nullable(),
  message: z.string().optional().nullable(),
  source: z.string().default('WEBSITE')
});

export const updateLeadStatusSchema = z.object({
  status: z.enum([
    'NEW',
    'CONTACTED',
    'FOLLOW_UP',
    'DOCUMENTS_REQUESTED',
    'DOCUMENTS_RECEIVED',
    'PROCESSING',
    'APPROVED',
    'DISBURSED',
    'REJECTED',
    'CLOSED'
  ]),
  remarks: z.string().optional()
});

export const assignLeadSchema = z.object({
  assigned_to: z.string().uuid('Valid admin or staff UUID required').nullable()
});

export const addLeadNoteSchema = z.object({
  note: z.string().min(1, 'Note content cannot be empty')
});
