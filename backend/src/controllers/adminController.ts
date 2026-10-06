import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../config/database';
import { sendSuccess, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export const getDashboardStats = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    // 1. Lead counts
    const totalLeadsRes = await query<{ count: string }>('SELECT COUNT(*) FROM public.leads');
    const newLeadsRes = await query<{ count: string }>("SELECT COUNT(*) FROM public.leads WHERE status = 'NEW'");
    const approvedLeadsRes = await query<{ count: string }>("SELECT COUNT(*) FROM public.leads WHERE status = 'APPROVED'");
    const disbursedLeadsRes = await query<{ count: string }>("SELECT COUNT(*) FROM public.leads WHERE status = 'DISBURSED'");

    // 2. Appointments counts
    const pendingApptRes = await query<{ count: string }>("SELECT COUNT(*) FROM public.appointments WHERE status = 'PENDING'");
    const todayApptRes = await query<{ count: string }>(
      "SELECT COUNT(*) FROM public.appointments WHERE appointment_date = CURRENT_DATE"
    );

    // 3. Reviews pending
    const pendingReviewsRes = await query<{ count: string }>("SELECT COUNT(*) FROM public.reviews WHERE status = 'PENDING'");

    // 4. Status breakdown for charts
    const statusChartRes = await query<{ status: string; count: string }>(
      `SELECT status, COUNT(*) as count FROM public.leads GROUP BY status ORDER BY count DESC`
    );

    // 5. Loan category / type breakdown
    const categoryStatsRes = await query<{ loan_type: string; count: string }>(
      `SELECT COALESCE(loan_type, 'Unspecified') as loan_type, COUNT(*) as count
       FROM public.leads GROUP BY loan_type ORDER BY count DESC LIMIT 5`
    );

    // 6. Recent leads (last 5)
    const recentLeadsRes = await query(
      `SELECT id, name, phone, email, loan_type, required_amount, status, created_at
       FROM public.leads ORDER BY created_at DESC LIMIT 5`
    );

    // 7. Upcoming appointments (next 5)
    const upcomingApptRes = await query(
      `SELECT id, name, phone, service, appointment_date, appointment_time, consultation_type, status
       FROM public.appointments
       WHERE appointment_date >= CURRENT_DATE
       ORDER BY appointment_date ASC, appointment_time ASC LIMIT 5`
    );

    const totalLeads = parseInt(totalLeadsRes.rows[0].count, 10);
    const hasData = totalLeads > 0 || parseInt(pendingApptRes.rows[0].count, 10) > 0;

    return sendSuccess(res, {
      hasData,
      metrics: {
        totalLeads,
        newLeads: parseInt(newLeadsRes.rows[0].count, 10),
        pendingAppointments: parseInt(pendingApptRes.rows[0].count, 10),
        todayAppointments: parseInt(todayApptRes.rows[0].count, 10),
        applications: totalLeads,
        approvedLeads: parseInt(approvedLeadsRes.rows[0].count, 10),
        disbursedLeads: parseInt(disbursedLeadsRes.rows[0].count, 10),
        pendingReviews: parseInt(pendingReviewsRes.rows[0].count, 10)
      },
      statusDistribution: statusChartRes.rows.map((r) => ({ status: r.status, count: parseInt(r.count, 10) })),
      categoryDistribution: categoryStatsRes.rows.map((r) => ({ name: r.loan_type, count: parseInt(r.count, 10) })),
      recentLeads: recentLeadsRes.rows,
      upcomingAppointments: upcomingApptRes.rows
    });
  } catch (error) {
    return sendError(res, 'Failed to fetch dashboard statistics', 500);
  }
};

export const getStaffList = async (_req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await query(
      'SELECT id, name, email, role, is_active, last_login, created_at FROM public.admin_users ORDER BY created_at ASC'
    );
    return sendSuccess(res, result.rows);
  } catch (error) {
    return sendError(res, 'Failed to fetch staff members', 500);
  }
};

export const createStaffUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, email, password, role = 'STAFF' } = req.body;

    const existing = await query('SELECT id FROM public.admin_users WHERE LOWER(email) = LOWER($1)', [email]);
    if (existing.rows.length > 0) {
      return sendError(res, 'A staff member with this email already exists', 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const result = await query(
      `INSERT INTO public.admin_users (name, email, password_hash, role, is_active, created_at, updated_at)
       VALUES ($1, $2, $3, $4, true, NOW(), NOW())
       RETURNING id, name, email, role, is_active, created_at`,
      [name, email, hash, role]
    );

    return sendSuccess(res, result.rows[0], 'Staff member registered successfully', 201);
  } catch (error) {
    return sendError(res, 'Failed to create staff member', 500);
  }
};

export const updateStaffStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { is_active, role } = req.body;

    const result = await query(
      `UPDATE public.admin_users
       SET is_active = COALESCE($1, is_active),
           role = COALESCE($2, role),
           updated_at = NOW()
       WHERE id = $3
       RETURNING id, name, email, role, is_active`,
      [is_active !== undefined ? is_active : null, role || null, id]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Staff member not found', 404);
    }

    return sendSuccess(res, result.rows[0], 'Staff details updated');
  } catch (error) {
    return sendError(res, 'Failed to update staff member', 500);
  }
};
