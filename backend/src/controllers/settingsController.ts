import { Request, Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getPublicSettings = async (_req: Request, res: Response) => {
  try {
    const result = await query(
      `SELECT setting_key, setting_value FROM public.website_settings WHERE setting_key NOT LIKE 'secret_%'`
    );
    const settingsMap: Record<string, any> = {};
    result.rows.forEach((row) => {
      settingsMap[row.setting_key] = row.setting_value;
    });
    return sendSuccess(res, settingsMap);
  } catch (error) {
    return sendError(res, 'Failed to fetch website settings', 500);
  }
};

export const getAdminSettings = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await query('SELECT * FROM public.website_settings ORDER BY setting_key ASC');
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch settings', 500);
  }
};

export const updateSetting = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { key } = req.params;
    const { setting_value, description } = req.body;

    const result = await query(
      `INSERT INTO public.website_settings (setting_key, setting_value, description, updated_at)
       VALUES ($1, $2, $3, NOW())
       ON CONFLICT (setting_key)
       DO UPDATE SET setting_value = $2, description = COALESCE($3, public.website_settings.description), updated_at = NOW()
       RETURNING *`,
      [key, JSON.stringify(setting_value), description || null]
    );

    return sendSuccess(res, result.rows[0], 'Setting updated successfully');
  } catch (error) {
    return sendError(res, 'Failed to update setting', 500);
  }
};
