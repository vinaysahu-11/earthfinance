import { Request, Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getPublicTestimonials = async (_req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT * FROM public.testimonials WHERE is_active = true ORDER BY is_featured DESC, display_order ASC`
    );
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch testimonials', 500);
  }
};

export const getAdminTestimonials = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await query(`SELECT * FROM public.testimonials ORDER BY created_at DESC`);
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch testimonials', 500);
  }
};

export const createTestimonial = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { client_name, client_title, company_name, avatar_url, rating = 5, content, is_featured = false, is_active = true, display_order = 0 } = req.body;
    const result = await query(
      `INSERT INTO public.testimonials (client_name, client_title, company_name, avatar_url, rating, content, is_featured, is_active, display_order, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW()) RETURNING *`,
      [client_name, client_title || null, company_name || null, avatar_url || null, rating, content, is_featured, is_active, display_order]
    );
    return sendSuccess(res, result.rows[0], 'Testimonial created', 201);
  } catch (error) {
    return sendError(res, 'Failed to create testimonial', 500);
  }
};

export const deleteTestimonial = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM public.testimonials WHERE id = $1', [id]);
    return sendSuccess(res, null, 'Testimonial deleted');
  } catch (error) {
    return sendError(res, 'Failed to delete testimonial', 500);
  }
};
