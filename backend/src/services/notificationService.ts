import { query } from '../config/database';
import { logger } from '../utils/logger';

export const createSystemNotification = async (params: {
  title: string;
  message: string;
  type: string;
  data?: any;
}) => {
  try {
    const result = await query(
      `INSERT INTO public.notifications (title, message, type, is_read, data, created_at, updated_at)
       VALUES ($1, $2, $3, false, $4, NOW(), NOW())
       RETURNING id, title, created_at`,
      [params.title, params.message, params.type, JSON.stringify(params.data || {})]
    );
    return result.rows[0];
  } catch (error) {
    logger.error('[NotificationService] Failed to create notification', error);
    return null;
  }
};
