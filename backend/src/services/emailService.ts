import nodemailer from 'nodemailer';
import { config } from '../config/env';
import { logger } from '../utils/logger';

// Create configurable nodemailer transporter
const createTransporter = () => {
  if (!config.email.user || !config.email.password) {
    logger.warn('[EmailService] SMTP credentials not set. Emails will be logged to console.');
    return null;
  }

  return nodemailer.createTransport({
    host: config.email.host,
    port: config.email.port,
    secure: config.email.port === 465,
    auth: {
      user: config.email.user,
      pass: config.email.password
    }
  });
};

const transporter = createTransporter();

export const sendLeadNotification = async (lead: {
  name: string;
  phone: string;
  email: string;
  loanType?: string | null;
  amount?: string | null;
  city?: string | null;
}) => {
  const subject = `[Earth Finance] New Loan Lead: ${lead.name} (${lead.loanType || 'Business Loan'})`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #101828; max-width: 600px; margin: 0 auto; border: 1px solid #E4E7EC; border-radius: 8px; padding: 24px;">
      <h2 style="color: #071B3A; margin-top: 0;">New Lead Received - Earth Finance</h2>
      <p>A new loan enquiry has been submitted on the website:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px; font-weight: bold; background: #F4F8FC; width: 35%;">Applicant Name:</td><td style="padding: 8px;">${lead.name}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; background: #F4F8FC;">Phone:</td><td style="padding: 8px;">${lead.phone}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; background: #F4F8FC;">Email:</td><td style="padding: 8px;">${lead.email}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; background: #F4F8FC;">Loan Type:</td><td style="padding: 8px;">${lead.loanType || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; background: #F4F8FC;">Required Amount:</td><td style="padding: 8px;">${lead.amount || 'Not specified'}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; background: #F4F8FC;">City:</td><td style="padding: 8px;">${lead.city || 'Not specified'}</td></tr>
      </table>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E4E7EC; font-size: 12px; color: #667085;">
        Earth Finance Admin Portal Automated Notification
      </div>
    </div>
  `;

  if (!transporter) {
    logger.info(`[Email Simulated] sendLeadNotification to admin: ${subject}`);
    return true;
  }

  try {
    await transporter.sendMail({
      from: config.email.from,
      to: config.admin.email || config.email.user,
      subject,
      html
    });
    return true;
  } catch (error) {
    logger.error('[EmailService] Failed to send lead notification', error);
    return false;
  }
};

export const sendAppointmentConfirmation = async (appointment: {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
  consultationType: string;
}) => {
  const subject = `[Earth Finance] Consultation Confirmed for ${appointment.date}`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #101828; max-width: 600px; margin: 0 auto; border: 1px solid #E4E7EC; border-radius: 8px; padding: 24px;">
      <h2 style="color: #071B3A; margin-top: 0;">Your Consultation is Confirmed</h2>
      <p>Dear ${appointment.name},</p>
      <p>Thank you for scheduling a financial consultation with Earth Finance. Below are your appointment details:</p>
      <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
        <tr><td style="padding: 8px; font-weight: bold; background: #F4F8FC; width: 35%;">Service:</td><td style="padding: 8px;">${appointment.service}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; background: #F4F8FC;">Date:</td><td style="padding: 8px;">${appointment.date}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; background: #F4F8FC;">Time:</td><td style="padding: 8px;">${appointment.time}</td></tr>
        <tr><td style="padding: 8px; font-weight: bold; background: #F4F8FC;">Type:</td><td style="padding: 8px;">${appointment.consultationType}</td></tr>
      </table>
      <p style="margin-top: 16px; font-size: 13px; color: #667085;">
        *Note: Financial recommendations and loan approvals are subject to eligibility, documentation, and lender underwriting criteria. Terms and conditions apply.
      </p>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E4E7EC; font-size: 12px; color: #667085;">
        Earth Finance • Corporate Advisory & Business Financing
      </div>
    </div>
  `;

  if (!transporter) {
    logger.info(`[Email Simulated] sendAppointmentConfirmation to ${appointment.email}`);
    return true;
  }

  try {
    await transporter.sendMail({
      from: config.email.from,
      to: appointment.email,
      subject,
      html
    });
    return true;
  } catch (error) {
    logger.error('[EmailService] Failed to send appointment confirmation', error);
    return false;
  }
};

export const sendAppointmentReminder = async (appointment: {
  name: string;
  email: string;
  service: string;
  date: string;
  time: string;
}) => {
  const subject = `[Earth Finance] Reminder: Upcoming Appointment on ${appointment.date}`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #101828; max-width: 600px; margin: 0 auto; border: 1px solid #E4E7EC; border-radius: 8px; padding: 24px;">
      <h2 style="color: #071B3A; margin-top: 0;">Appointment Reminder</h2>
      <p>Dear ${appointment.name},</p>
      <p>This is a gentle reminder for your scheduled financial consultation on <strong>${appointment.date} at ${appointment.time}</strong> for ${appointment.service}.</p>
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #E4E7EC; font-size: 12px; color: #667085;">
        Earth Finance • Dedicated Support
      </div>
    </div>
  `;

  if (!transporter) {
    logger.info(`[Email Simulated] sendAppointmentReminder to ${appointment.email}`);
    return true;
  }

  try {
    await transporter.sendMail({
      from: config.email.from,
      to: appointment.email,
      subject,
      html
    });
    return true;
  } catch (error) {
    logger.error('[EmailService] Failed to send appointment reminder', error);
    return false;
  }
};

export const sendContactNotification = async (contact: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}) => {
  const emailSubject = `[Earth Finance] New Contact Message: ${contact.subject || contact.name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #101828; max-width: 600px; margin: 0 auto; border: 1px solid #E4E7EC; border-radius: 8px; padding: 24px;">
      <h2 style="color: #071B3A; margin-top: 0;">New Contact Form Message</h2>
      <p><strong>Name:</strong> ${contact.name}</p>
      <p><strong>Email:</strong> ${contact.email}</p>
      <p><strong>Phone:</strong> ${contact.phone || 'N/A'}</p>
      <p><strong>Subject:</strong> ${contact.subject || 'General'}</p>
      <div style="margin-top: 16px; padding: 12px; background: #F4F8FC; border-radius: 4px;">
        <strong>Message:</strong><br/>
        ${contact.message}
      </div>
    </div>
  `;

  if (!transporter) {
    logger.info(`[Email Simulated] sendContactNotification to admin: ${emailSubject}`);
    return true;
  }

  try {
    await transporter.sendMail({
      from: config.email.from,
      to: config.admin.email || config.email.user,
      subject: emailSubject,
      html
    });
    return true;
  } catch (error) {
    logger.error('[EmailService] Failed to send contact notification', error);
    return false;
  }
};
