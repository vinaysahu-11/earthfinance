import { Request, Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getPublicGallery = async (_req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT * FROM public.gallery_items WHERE is_active = true ORDER BY display_order ASC, created_at DESC`
    );
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch gallery items', 500);
  }
};

export const getAdminGallery = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await query(`SELECT * FROM public.gallery_items ORDER BY display_order ASC, created_at DESC`);
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch gallery items', 500);
  }
};

export const createGalleryItem = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { title, caption, image_url, category, display_order = 0, is_active = true } = req.body;
    const result = await query(
      `INSERT INTO public.gallery_items (title, caption, image_url, category, display_order, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW()) RETURNING *`,
      [title, caption || null, image_url, category || null, display_order, is_active]
    );
    return sendSuccess(res, result.rows[0], 'Gallery item created', 201);
  } catch (error) {
    return sendError(res, 'Failed to create gallery item', 500);
  }
};

export const deleteGalleryItem = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM public.gallery_items WHERE id = $1', [id]);
    return sendSuccess(res, null, 'Gallery item deleted');
  } catch (error) {
    return sendError(res, 'Failed to delete gallery item', 500);
  }
};

export const updateGalleryItem = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { title, caption, image_url, category, display_order, is_active } = req.body;
    const result = await query(
      `UPDATE public.gallery_items
       SET title = COALESCE($1, title),
           caption = COALESCE($2, caption),
           image_url = COALESCE($3, image_url),
           category = COALESCE($4, category),
           display_order = COALESCE($5, display_order),
           is_active = COALESCE($6, is_active),
           updated_at = NOW()
       WHERE id = $7 RETURNING *`,
      [title, caption, image_url, category, display_order, is_active, id]
    );
    if (result.rows.length === 0) {
      return sendError(res, 'Gallery item not found', 404);
    }
    return sendSuccess(res, result.rows[0], 'Gallery item updated');
  } catch (error) {
    return sendError(res, 'Failed to update gallery item', 500);
  }
};
