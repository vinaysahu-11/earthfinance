import { Request, Response } from 'express';
import { query } from '../config/database';
import { sendSuccess, sendPaginated, sendError } from '../utils/response';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { sendContactNotification } from '../services/emailService';
import { createSystemNotification } from '../services/notificationService';
import { ContactMessage } from '../types';

export const submitContact = async (req: Request, res: Response) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const result = await query<ContactMessage>(
      `INSERT INTO public.contact_messages (name, email, phone, subject, message, status, is_replied, created_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, 'UNREAD', false, NOW(), NOW())
       RETURNING *`,
      [name, email, phone || null, subject || null, message]
    );

    const contact = result.rows[0];

    sendContactNotification(contact).catch(() => {});
    createSystemNotification({
      title: 'New Contact Message',
      message: `${contact.name} sent a message: ${contact.subject || 'General Inquiry'}`,
      type: 'CONTACT',
      data: { contactId: contact.id }
    }).catch(() => {});

    return sendSuccess(res, contact, 'Message sent successfully. Our team will get back to you shortly.', 201);
  } catch (error) {
    return sendError(res, 'Failed to send message', 500);
  }
};

export const getContactMessages = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 15;
    const offset = (page - 1) * limit;

    const countRes = await query<{ count: string }>('SELECT COUNT(*) FROM public.contact_messages');
    const total = parseInt(countRes.rows[0].count, 10);

    const listRes = await query(
      'SELECT * FROM public.contact_messages ORDER BY created_at DESC LIMIT $1 OFFSET $2',
      [limit, offset]
    );

    return sendPaginated(res, listRes.rows, { page, limit, total });
  } catch (error) {
    return sendError(res, 'Failed to fetch contact messages', 500);
  }
};

export const updateContactStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { status, is_replied } = req.body;

    const result = await query(
      `UPDATE public.contact_messages
       SET status = COALESCE($1, status),
           is_replied = COALESCE($2, is_replied),
           updated_at = NOW()
       WHERE id = $3 RETURNING *`,
      [status, is_replied, id]
    );

    if (result.rows.length === 0) {
      return sendError(res, 'Message not found', 404);
    }

    return sendSuccess(res, result.rows[0], 'Message updated');
  } catch (error) {
    return sendError(res, 'Failed to update message', 500);
  }
};
