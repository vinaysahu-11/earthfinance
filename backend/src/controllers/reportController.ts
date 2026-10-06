import { Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getReports = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const monthlyLeads = await query(`
      SELECT TO_CHAR(created_at, 'YYYY-MM') as month, COUNT(*) as count
      FROM public.leads
      GROUP BY TO_CHAR(created_at, 'YYYY-MM')
      ORDER BY month DESC
      LIMIT 12
    `);

    const statusBreakdown = await query(`
      SELECT status, COUNT(*) as count
      FROM public.leads
      GROUP BY status
    `);

    const conversionRate = await query(`
      SELECT
        COUNT(*) as total,
        COUNT(CASE WHEN status = 'APPROVED' OR status = 'DISBURSED' THEN 1 END) as approved,
        COUNT(CASE WHEN status = 'DISBURSED' THEN 1 END) as disbursed
      FROM public.leads
    `);

    const categoryBreakdown = await query(`
      SELECT COALESCE(loan_type, 'General') as loan_type, COUNT(*) as count
      FROM public.leads
      GROUP BY loan_type
      ORDER BY count DESC
    `);

    const stats = conversionRate.rows[0];
    const total = parseInt(stats.total, 10) || 0;
    const approved = parseInt(stats.approved, 10) || 0;
    const disbursed = parseInt(stats.disbursed, 10) || 0;
    const rate = total > 0 ? ((approved / total) * 100).toFixed(1) : '0';

    return sendSuccess(res, {
      totalLeads: total,
      approvedLeads: approved,
      disbursedLeads: disbursed,
      conversionRate: `${rate}%`,
      monthlyLeads: monthlyLeads.rows,
      statusBreakdown: statusBreakdown.rows,
      categoryBreakdown: categoryBreakdown.rows
    });
  } catch (error) {
    return sendError(res, 'Failed to generate reports', 500);
  }
};
