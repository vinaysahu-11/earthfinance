import { Request, Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getPublicFaqs = async (_req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT * FROM public.faqs WHERE is_published = true ORDER BY display_order ASC, created_at ASC`
    );
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch FAQs', 500);
  }
};

export const getAdminFaqs = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await query(`SELECT * FROM public.faqs ORDER BY display_order ASC, created_at DESC`);
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch FAQs', 500);
  }
};

export const createFaq = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { category = 'General', question, answer, display_order = 0, is_published = true } = req.body;
    const result = await query(
      `INSERT INTO public.faqs (category, question, answer, display_order, is_published, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *`,
      [category, question, answer, display_order, is_published]
    );
    return sendSuccess(res, result.rows[0], 'FAQ created', 201);
  } catch (error) {
    return sendError(res, 'Failed to create FAQ', 500);
  }
};

export const updateFaq = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { category, question, answer, display_order, is_published } = req.body;
    const result = await query(
      `UPDATE public.faqs
       SET category = COALESCE($1, category),
           question = COALESCE($2, question),
           answer = COALESCE($3, answer),
           display_order = COALESCE($4, display_order),
           is_published = COALESCE($5, is_published),
           updated_at = NOW()
       WHERE id = $6 RETURNING *`,
      [category, question, answer, display_order, is_published, id]
    );
    return sendSuccess(res, result.rows[0], 'FAQ updated');
  } catch (error) {
    return sendError(res, 'Failed to update FAQ', 500);
  }
};

export const deleteFaq = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM public.faqs WHERE id = $1', [id]);
    return sendSuccess(res, null, 'FAQ deleted');
  } catch (error) {
    return sendError(res, 'Failed to delete FAQ', 500);
  }
};
