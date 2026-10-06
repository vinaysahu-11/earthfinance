import { Request, Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendPaginated, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { sendLeadNotification } from '../services/emailService';
import { createSystemNotification } from '../services/notificationService';
import { Lead } from '../types';

export const createLead = async (req: Request, res: Response) => {
  try {
    const {
      name,
      phone,
      email,
      loan_category_id,
      loan_product_id,
      loan_type,
      required_amount,
      city,
      business_type,
      message,
      source = 'WEBSITE'
    } = req.body;

    const insertResult = await query<Lead>(
      `INSERT INTO public.leads (
        name, phone, email, loan_category_id, loan_product_id,
        loan_type, required_amount, city, business_type,
        message, source, status, created_at, updated_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, 'NEW', NOW(), NOW())
      RETURNING *`,
      [
        name,
        phone,
        email,
        loan_category_id || null,
        loan_product_id || null,
        loan_type,
        required_amount,
        city,
        business_type || null,
        message || null,
        source
      ]
    );

    const newLead = insertResult.rows[0];

    // Record initial status in status history
    await query(
      `INSERT INTO public.lead_status_history (lead_id, old_status, new_status, remarks, created_at)
       VALUES ($1, NULL, 'NEW', 'Lead created via website form', NOW())`,
      [newLead.id]
    );

    // Asynchronously trigger notification emails and in-app alerts
    sendLeadNotification({
      name: newLead.name,
      phone: newLead.phone,
      email: newLead.email,
      loanType: newLead.loan_type,
      amount: newLead.required_amount,
      city: newLead.city
    }).catch(() => {});

    createSystemNotification({
      title: 'New Lead Submitted',
      message: `${newLead.name} applied for ${newLead.loan_type || 'Loan'} (${newLead.required_amount || 'Amount not stated'})`,
      type: 'LEAD',
      data: { leadId: newLead.id }
    }).catch(() => {});

    return sendSuccess(res, newLead, 'Enquiry submitted successfully. A specialist will contact you soon.', 201);
  } catch (error) {
    return sendError(res, 'Failed to submit loan enquiry', 500);
  }
};

export const getLeads = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 15;
    const offset = (page - 1) * limit;
    const status = req.query.status as string;
    const search = req.query.search as string;

    const conditions: string[] = [];
    const params: any[] = [];
    let paramIndex = 1;

    if (status && status !== 'ALL') {
      conditions.push(`l.status = $${paramIndex}`);
      params.push(status);
      paramIndex++;
    }

    if (search && search.trim() !== '') {
      conditions.push(`(l.name ILIKE $${paramIndex} OR l.phone ILIKE $${paramIndex} OR l.email ILIKE $${paramIndex} OR l.city ILIKE $${paramIndex})`);
      params.push(`%${search.trim()}%`);
      paramIndex++;
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const countResult = await query<{ count: string }>(
      `SELECT COUNT(*) FROM public.leads l ${whereClause}`,
      params
    );
    const total = parseInt(countResult.rows[0].count, 10);

    const listQuery = `
      SELECT l.*,
             u.name as assigned_to_name,
             lp.name as loan_product_name,
             lc.name as loan_category_name
      FROM public.leads l
      LEFT JOIN public.admin_users u ON l.assigned_to = u.id
      LEFT JOIN public.loan_products lp ON l.loan_product_id = lp.id
      LEFT JOIN public.loan_categories lc ON l.loan_category_id = lc.id
      ${whereClause}
      ORDER BY l.created_at DESC
      LIMIT $${paramIndex} OFFSET $${paramIndex + 1}
    `;

    const leadsResult = await query(listQuery, [...params, limit, offset]);

    return sendPaginated(res, leadsResult.rows, { page, limit, total }, 'Leads retrieved successfully');
  } catch (error) {
    return sendError(res, 'Failed to retrieve leads', 500);
  }
};

export const getLeadById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;

    const leadRes = await query(
      `SELECT l.*,
              u.name as assigned_to_name,
              u.email as assigned_to_email,
              lp.name as loan_product_name,
              lc.name as loan_category_name
       FROM public.leads l
       LEFT JOIN public.admin_users u ON l.assigned_to = u.id
       LEFT JOIN public.loan_products lp ON l.loan_product_id = lp.id
       LEFT JOIN public.loan_categories lc ON l.loan_category_id = lc.id
       WHERE l.id = $1`,
      [id]
    );

    if (leadRes.rows.length === 0) {
      return sendError(res, 'Lead not found', 404);
    }

    const lead = leadRes.rows[0];

    const notesRes = await query(
      `SELECT * FROM public.lead_notes WHERE lead_id = $1 ORDER BY created_at DESC`,
      [id]
    );

    const historyRes = await query(
      `SELECT h.*, u.name as changed_by_name
       FROM public.lead_status_history h
       LEFT JOIN public.admin_users u ON h.changed_by = u.id
       WHERE h.lead_id = $1
       ORDER BY h.created_at DESC`,
      [id]
    );

    const appointmentsRes = await query(
      `SELECT * FROM public.appointments WHERE lead_id = $1 OR email = $2 OR phone = $3 ORDER BY appointment_date DESC`,
      [id, lead.email, lead.phone]
    );

    return sendSuccess(res, {
      lead,
      notes: notesRes.rows,
      statusHistory: historyRes.rows,
      appointments: appointmentsRes.rows
    });
  } catch (error) {
    return sendError(res, 'Failed to fetch lead details', 500);
  }
};

export const updateLeadStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, remarks } = req.body;
    const adminUser = req.user;

    const currentLeadRes = await query<Lead>('SELECT status FROM public.leads WHERE id = $1', [id]);
    if (currentLeadRes.rows.length === 0) {
      return sendError(res, 'Lead not found', 404);
    }

    const oldStatus = currentLeadRes.rows[0].status;

    await query(
      `UPDATE public.leads SET status = $1, updated_at = NOW() WHERE id = $2`,
      [status, id]
    );

    await query(
      `INSERT INTO public.lead_status_history (lead_id, old_status, new_status, changed_by, remarks, created_at)
       VALUES ($1, $2, $3, $4, $5, NOW())`,
      [id, oldStatus, status, adminUser?.id || null, remarks || null]
    );

    return sendSuccess(res, { status }, `Lead status updated to ${status}`);
  } catch (error) {
    return sendError(res, 'Failed to update lead status', 500);
  }
};

export const assignLead = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { assigned_to } = req.body;

    await query(
      `UPDATE public.leads SET assigned_to = $1, updated_at = NOW() WHERE id = $2`,
      [assigned_to || null, id]
    );

    return sendSuccess(res, null, 'Lead assignment updated');
  } catch (error) {
    return sendError(res, 'Failed to assign lead', 500);
  }
};

export const addLeadNote = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { note } = req.body;
    const adminUser = req.user;

    const result = await query(
      `INSERT INTO public.lead_notes (lead_id, author_id, author_name, note, created_at)
       VALUES ($1, $2, $3, $4, NOW())
       RETURNING *`,
      [id, adminUser?.id || null, adminUser?.name || 'Staff', note]
    );

    return sendSuccess(res, result.rows[0], 'Note added successfully', 201);
  } catch (error) {
    return sendError(res, 'Failed to add lead note', 500);
  }
};
