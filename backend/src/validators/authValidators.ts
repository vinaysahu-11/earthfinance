import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().min(1, 'Please enter a username or email address'),
  password: z.string().min(4, 'Password is required')
});

export const createStaffSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().min(2, 'Please enter a valid username or email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'STAFF']).default('STAFF')
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(4, 'Current password is required'),
  newPassword: z.string().min(6, 'New password must be at least 6 characters')
});
