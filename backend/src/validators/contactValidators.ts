import { z } from 'zod';

export const submitContactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional().nullable(),
  subject: z.string().min(2, 'Subject is required').optional().nullable(),
  message: z.string().min(10, 'Message must be at least 10 characters long')
});
