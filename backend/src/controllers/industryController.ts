import { Request, Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { Industry } from '../types';

export const getPublicIndustries = async (_req: Request, res: Response) => {
  try {
    const result = await query<Industry>(
      `SELECT * FROM public.industries WHERE is_active = true ORDER BY display_order ASC`
    );
    return sendSuccess(res, result.rows, 'Supported industries');
  } catch (error) {
    return sendError(res, 'Failed to fetch industries', 500);
  }
};

export const getPublicIndustryBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const result = await query<Industry>(
      `SELECT * FROM public.industries WHERE slug = $1 AND is_active = true`,
      [slug]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Industry not found', 404);
    }

    return sendSuccess(res, result.rows[0]);
  } catch (error) {
    return sendError(res, 'Failed to fetch industry details', 500);
  }
};

export const getAdminIndustries = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await query<Industry>(
      `SELECT * FROM public.industries ORDER BY display_order ASC, created_at DESC`
    );
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch industries', 500);
  }
};

export const createIndustry = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const {
      name,
      slug,
      title,
      short_description,
      description,
      hero_image,
      icon,
      benefits = [],
      loan_options = [],
      is_active = true,
      display_order = 0,
      seo_title,
      seo_description
    } = req.body;

    const result = await query<Industry>(
      `INSERT INTO public.industries (
        name, slug, title, short_description, description, hero_image, icon,
        benefits, loan_options, is_active, display_order, seo_title, seo_description,
        created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
      RETURNING *`,
      [
        name,
        slug,
        title,
        short_description || null,
        description || null,
        hero_image || null,
        icon || null,
        JSON.stringify(benefits),
        JSON.stringify(loan_options),
        is_active,
        display_order,
        seo_title || null,
        seo_description || null
      ]
    );

    return sendSuccess(res, result.rows[0], 'Industry created successfully', 201);
  } catch (error: any) {
    if (error.code === '23505') {
      return sendError(res, 'An industry with this slug already exists', 409);
    }
    return sendError(res, 'Failed to create industry', 500);
  }
};

export const updateIndustry = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      slug,
      title,
      short_description,
      description,
      hero_image,
      icon,
      benefits,
      loan_options,
      is_active,
      display_order,
      seo_title,
      seo_description
    } = req.body;

    const result = await query<Industry>(
      `UPDATE public.industries
       SET name = COALESCE($1, name),
           slug = COALESCE($2, slug),
           title = COALESCE($3, title),
           short_description = COALESCE($4, short_description),
           description = COALESCE($5, description),
           hero_image = COALESCE($6, hero_image),
           icon = COALESCE($7, icon),
           benefits = COALESCE($8, benefits),
           loan_options = COALESCE($9, loan_options),
           is_active = COALESCE($10, is_active),
           display_order = COALESCE($11, display_order),
           seo_title = COALESCE($12, seo_title),
           seo_description = COALESCE($13, seo_description),
           updated_at = NOW()
       WHERE id = $14
       RETURNING *`,
      [
        name,
        slug,
        title,
        short_description,
        description,
        hero_image,
        icon,
        benefits ? JSON.stringify(benefits) : null,
        loan_options ? JSON.stringify(loan_options) : null,
        is_active,
        display_order,
        seo_title,
        seo_description,
        id
      ]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Industry not found', 404);
    }

    return sendSuccess(res, result.rows[0], 'Industry updated');
  } catch (error) {
    return sendError(res, 'Failed to update industry', 500);
  }
};

export const deleteIndustry = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    await query('DELETE FROM public.industries WHERE id = $1', [id]);
    return sendSuccess(res, null, 'Industry deleted');
  } catch (error) {
    return sendError(res, 'Failed to delete industry', 500);
  }
};
