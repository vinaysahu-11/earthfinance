import { Request, Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getPublicBanners = async (_req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT * FROM public.banners WHERE is_active = true ORDER BY display_order ASC`
    );
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch banners', 500);
  }
};

export const getAdminBanners = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await query(`SELECT * FROM public.banners ORDER BY display_order ASC, created_at DESC`);
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch banners', 500);
  }
};

export const createBanner = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, subtitle, cta_text, cta_link, background_image, position = 'HOME_HERO', is_active = true, display_order = 0 } = req.body;
    const result = await query(
      `INSERT INTO public.banners (title, subtitle, cta_text, cta_link, background_image, position, is_active, display_order, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW()) RETURNING *`,
      [title, subtitle || null, cta_text || null, cta_link || null, background_image || null, position, is_active, display_order]
    );
    return sendSuccess(res, result.rows[0], 'Banner created', 201);
  } catch (error) {
    return sendError(res, 'Failed to create banner', 500);
  }
};

export const deleteBanner = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM public.banners WHERE id = $1', [id]);
    return sendSuccess(res, null, 'Banner deleted');
  } catch (error) {
    return sendError(res, 'Failed to delete banner', 500);
  }
};
