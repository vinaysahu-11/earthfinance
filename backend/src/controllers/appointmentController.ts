import { Request, Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendPaginated, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { sendAppointmentConfirmation } from '../services/emailService';
import { createSystemNotification } from '../services/notificationService';
import { Appointment } from '../types';

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const {
      lead_id,
      name,
      phone,
      email,
      service,
      appointment_date,
      appointment_time,
      consultation_type = 'ONLINE',
      notes
    } = req.body;

    const insertRes = await query<Appointment>(
      `INSERT INTO public.appointments (
        lead_id, name, phone, email, service,
        appointment_date, appointment_time, consultation_type,
        status, notes, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'PENDING', $9, NOW(), NOW())
      RETURNING *`,
      [
        lead_id || null,
        name,
        phone,
        email,
        service,
        appointment_date,
        appointment_time,
        consultation_type,
        notes || null
      ]
    );

    const appointment = insertRes.rows[0];

    sendAppointmentConfirmation({
      name: appointment.name,
      email: appointment.email,
      service: appointment.service,
      date: appointment.appointment_date,
      time: appointment.appointment_time,
      consultationType: appointment.consultation_type
    }).catch(() => {});

    createSystemNotification({
      title: 'New Consultation Booked',
      message: `${appointment.name} booked a consultation for ${appointment.service} on ${appointment.appointment_date}`,
      type: 'APPOINTMENT',
      data: { appointmentId: appointment.id }
    }).catch(() => {});

    return sendSuccess(res, appointment, 'Consultation appointment scheduled successfully.', 201);
  } catch (error) {
    return sendError(res, 'Failed to book consultation appointment', 500);
  }
};

export const getAppointments = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 15;
    const offset = (page - 1) * limit;
    const status = req.query.status as string;
    const date = req.query.date as string;

    const conditions: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (status && status !== 'ALL') {
      conditions.push(`a.status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    }

    if (date) {
      conditions.push(`a.appointment_date = $${paramIndex}`);
      params.push(date);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countRes = await query<{ count: string }>(
      `SELECT COUNT(*) FROM public.appointments a ${whereClause}`,
      params
    );
    const total = parseInt(countRes.rows[0].count, 10);

    const listRes = await query(
      `SELECT a.*, u.name as assigned_to_name
       FROM public.appointments a
       LEFT JOIN public.admin_users u ON a.assigned_to = u.id
       ${whereClause}
       ORDER BY a.appointment_date DESC, a.appointment_time ASC
       LIMIT $${paramIndex} OFFSET $${paramIndex + 1}`,
      [...params, limit, offset]
    );

    return sendPaginated(res, listRes.rows, { page, limit, total }, 'Appointments retrieved');
  } catch (error) {
    return sendError(res, 'Failed to retrieve appointments', 500);
  }
};

export const getAppointmentById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const result = await query(
      `SELECT a.*, u.name as assigned_to_name
       FROM public.appointments a
       LEFT JOIN public.admin_users u ON a.assigned_to = u.id
       WHERE a.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Appointment not found', 404);
    }

    return sendSuccess(res, result.rows[0]);
  } catch (error) {
    return sendError(res, 'Failed to fetch appointment', 500);
  }
};

export const updateAppointmentStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, notes, meeting_link } = req.body;

    const updateRes = await query<Appointment>(
      `UPDATE public.appointments
       SET status = $1,
           notes = COALESCE($2, notes),
           meeting_link = COALESCE($3, meeting_link),
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [status, notes || null, meeting_link || null, id]
    );

    if (updateRes.rows.length === 0) {
      return sendError(res, 'Appointment not found', 404);
    }

    return sendSuccess(res, updateRes.rows[0], `Appointment marked as ${status}`);
  } catch (error) {
    return sendError(res, 'Failed to update appointment status', 500);
  }
};

export const rescheduleAppointment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { appointment_date, appointment_time, notes } = req.body;

    const updateRes = await query<Appointment>(
      `UPDATE public.appointments
       SET appointment_date = $1,
           appointment_time = $2,
           status = 'RESCHEDULED',
           notes = COALESCE($3, notes),
           updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [appointment_date, appointment_time, notes || null, id]
    );

    if (updateRes.rows.length === 0) {
      return sendError(res, 'Appointment not found', 404);
    }

    return sendSuccess(res, updateRes.rows[0], 'Appointment rescheduled successfully');
  } catch (error) {
    return sendError(res, 'Failed to reschedule appointment', 500);
  }
};

export const assignAppointment = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { assigned_to } = req.body;

    await query(
      `UPDATE public.appointments SET assigned_to = $1, updated_at = NOW() WHERE id = $2`,
      [assigned_to || null, id]
    );

    return sendSuccess(res, null, 'Staff assigned to appointment');
  } catch (error) {
    return sendError(res, 'Failed to assign appointment', 500);
  }
};
