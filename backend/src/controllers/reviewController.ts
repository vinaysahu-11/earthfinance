import { Request, Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendPaginated, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { Review } from '../types';

export const submitReview = async (req: Request, res: Response) => {
  try {
    const { name, photo, rating, review, profession, business } = req.body;

    const result = await query<Review>(
      `INSERT INTO public.reviews (name, photo, rating, review, profession, business, status, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, 'PENDING', NOW(), NOW())
       RETURNING id, name, rating, status, created_at`,
      [name, photo || null, rating, review, profession || null, business || null]
    );

    return sendSuccess(
      res,
      result.rows[0],
      'Thank you for your feedback! Your review has been submitted for moderation.',
      201
    );
  } catch (error) {
    return sendError(res, 'Failed to submit review', 500);
  }
};

export const getPublicReviews = async (_req: Request, res: Response) => {
  try {
    const result = await query<Review>(
      `SELECT id, name, photo, rating, review, profession, business, status, created_at
       FROM public.reviews
       WHERE status IN ('APPROVED', 'FEATURED')
       ORDER BY (status = 'FEATURED') DESC, created_at DESC`
    );
    return sendSuccess(res, result.rows, 'Customer reviews');
  } catch (error) {
    return sendError(res, 'Failed to fetch reviews', 500);
  }
};

export const getAdminReviews = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 15;
    const offset = (page - 1) * limit;
    const status = req.query.status as string;

    const conditions: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (status && status !== 'ALL') {
      conditions.push(`status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countRes = await query<{ count: string }>(
      `SELECT COUNT(*) FROM public.reviews ${whereClause}`,
      params
    );
    const total = parseInt(countRes.rows[0].count, 10);

    const listRes = await query(
      `SELECT * FROM public.reviews ${whereClause} ORDER BY created_at DESC LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    return sendPaginated(res, listRes.rows, { page, limit, total }, 'Reviews retrieved');
  } catch (error) {
    return sendError(res, 'Failed to fetch reviews', 500);
  }
};

export const updateReviewStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await query<Review>(
      `UPDATE public.reviews SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, id]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Review not found', 404);
    }

    return sendSuccess(res, result.rows[0], `Review status updated to ${status}`);
  } catch (error) {
    return sendError(res, 'Failed to update review status', 500);
  }
};

export const deleteReview = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM public.reviews WHERE id = $1', [id]);
    return sendSuccess(res, null, 'Review deleted');
  } catch (error) {
    return sendError(res, 'Failed to delete review', 500);
  }
};
