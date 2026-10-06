import { Request, Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getSeoByPath = async (req: Request, res: Response) => {
  try {
    const pagePath = (req.query.path as string) || '/';
    const result = await query('SELECT * FROM public.seo_settings WHERE page_path = $1', [pagePath]);

    if (result.rows.length === 0) {
      return sendSuccess(res, {
        page_path: pagePath,
        meta_title: 'Earth Finance | Corporate Financing & Business Advisory',
        meta_description: 'Empowering enterprise growth with tailored corporate financing, working capital, and specialized credit solutions across India.',
        meta_keywords: 'business loans, corporate finance, working capital, MSME finance, machinery loans'
      });
    }

    return sendSuccess(res, result.rows[0]);
  } catch (error) {
    return sendError(res, 'Failed to fetch SEO settings', 500);
  }
};

export const getAdminSeoList = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await query('SELECT * FROM public.seo_settings ORDER BY page_path ASC');
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch SEO list', 500);
  }
};

export const upsertSeoSetting = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { page_path, meta_title, meta_description, meta_keywords, og_image } = req.body;

    const result = await query(
      `INSERT INTO public.seo_settings (page_path, meta_title, meta_description, meta_keywords, og_image, updated_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (page_path)
       DO UPDATE SET
         meta_title = $2,
         meta_description = $3,
         meta_keywords = $4,
         og_image = $5,
         updated_at = NOW()
       RETURNING *`,
      [page_path, meta_title, meta_description || null, meta_keywords || null, og_image || null]
    );

    return sendSuccess(res, result.rows[0], 'SEO settings saved');
  } catch (error) {
    return sendError(res, 'Failed to save SEO settings', 500);
  }
};
