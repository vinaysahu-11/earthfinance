import { z } from 'zod';

export const submitReviewSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  photo: z.string().url().optional().nullable().or(z.literal('')),
  rating: z.number().int().min(1).max(5),
  review: z.string().min(10, 'Review must be at least 10 characters long'),
  profession: z.string().optional().nullable(),
  business: z.string().optional().nullable()
});

export const updateReviewStatusSchema = z.object({
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED', 'FEATURED'])
});
