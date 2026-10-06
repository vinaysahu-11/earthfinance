import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { leadApi } from '../../services/leadApi';
import { adminApi } from '../../services/adminApi';
import { useFetch } from '../../hooks/useFetch';
import { Spinner } from '../../components/common/Spinner';
import { Alert } from '../../components/common/Alert';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  ArrowLeft,
  Phone,
  Mail,
  MessageCircle,
  Building,
  Calendar,
  Clock,
  UserCheck
} from 'lucide-react';
import { formatDate, formatDateTime } from '../../utils/formatters';
import { getWhatsAppLink, createLeadWhatsAppMessage } from '../../utils/whatsapp';
import { LeadStatus } from '../../types';

export const AdminLeadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [newNote, setNewNote] = useState('');
  const [statusRemark, setStatusRemark] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const { data, isLoading, error, refetch } = useFetch<{
    lead: any;
    notes: any[];
    statusHistory: any[];
    appointments: any[];
  }>(() => leadApi.getLeadById(id || ''), [id]);

  const { data: staffList } = useFetch<any[]>(() => adminApi.getStaff());

  if (isLoading) return <Spinner size="lg" text="Loading CRM record..." />;
  if (error || !data) return <Alert type="error" message={error || 'Lead not found.'} />;

  const { lead, notes, statusHistory, appointments } = data;

  const allStatuses: LeadStatus[] = [
    'NEW',
    'CONTACTED',
    'FOLLOW_UP',
    'DOCUMENTS_REQUESTED',
    'DOCUMENTS_RECEIVED',
    'PROCESSING',
    'APPROVED',
    'DISBURSED',
    'REJECTED',
    'CLOSED'
  ];

  const handleStatusChange = async (newStatus: string) => {
    try {
      const res = await leadApi.updateStatus(lead.id, newStatus, statusRemark || undefined);
      if (res.success) {
        setActionSuccess(`Status updated to ${newStatus}`);
        setStatusRemark('');
        refetch();
      }
    } catch {
      alert('Failed to update status');
    }
  };

  const handleAssignStaff = async (staffId: string) => {
    try {
      const res = await leadApi.assignStaff(lead.id, staffId === '' ? null : staffId);
      if (res.success) {
        setActionSuccess('Assigned staff updated');
        refetch();
      }
    } catch {
      alert('Failed to assign staff');
    }
  };

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;

    try {
      const res = await leadApi.addNote(lead.id, newNote.trim());
      if (res.success) {
        setNewNote('');
        setActionSuccess('CRM note logged');
        refetch();
      }
    } catch {
      alert('Failed to add note');
    }
  };

  const waUrl = getWhatsAppLink(
    createLeadWhatsAppMessage({
      loanType: lead.loan_type,
      amount: lead.required_amount,
      city: lead.city
    }),
    lead.phone
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link to="/admin/leads" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#071B3A]">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Leads
        </Link>
        <div className="flex items-center gap-3">
          <a
            href={`tel:${lead.phone}`}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-[#071B3A] flex items-center gap-1.5"
          >
            <Phone className="w-3.5 h-3.5" /> Call
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 bg-[#168B45] hover:bg-[#127439] rounded-lg text-xs font-semibold text-white flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </a>
          <a
            href={`mailto:${lead.email}`}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-800 flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" /> Email
          </a>
        </div>
      </div>

      {actionSuccess && <Alert type="success" message={actionSuccess} />}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Lead profile */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-xl font-bold text-[#071B3A]">{lead.name}</h2>
                <span className="text-xs text-[#667085]">{lead.email} • {lead.phone}</span>
              </div>
              <div>
                <Badge label={lead.status} />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">Facility Type</span>
                <strong className="text-[#071B3A]">{lead.loan_type || 'Loan'}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Required Amount</span>
                <strong className="text-[#168B45]">{lead.required_amount}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Location</span>
                <strong className="text-slate-800">{lead.city}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Industry</span>
                <strong className="text-slate-800">{lead.business_type || 'N/A'}</strong>
              </div>
            </div>

            {lead.message && (
              <div className="p-3 bg-slate-50 rounded-lg text-xs text-slate-700">
                <span className="font-semibold block mb-1 text-slate-900">Applicant Notes:</span>
                {lead.message}
              </div>
            )}
          </div>

          {/* Timeline and History */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#071B3A] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#168B45]" /> Lead Activity & Status Timeline
            </h3>

            {(!statusHistory || statusHistory.length === 0) ? (
              <p className="text-xs text-[#667085]">No status changes recorded.</p>
            ) : (
              <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {statusHistory.map((h: any) => (
                  <div key={h.id} className="relative text-xs">
                    <div className="absolute -left-6 top-1 w-2.5 h-2.5 rounded-full bg-[#071B3A] ring-4 ring-white" />
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#071B3A]">{h.new_status}</span>
                      {h.old_status && <span className="text-[10px] text-slate-400">(from {h.old_status})</span>}
                      <span className="text-[10px] text-slate-400">• {formatDateTime(h.created_at)}</span>
                    </div>
                    {h.remarks && <p className="text-[11px] text-slate-600 mt-0.5">{h.remarks}</p>}
                    {h.changed_by_name && <span className="text-[10px] text-slate-400 block">by {h.changed_by_name}</span>}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CRM Notes */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#071B3A]">Internal Advisor Notes</h3>

            <form onSubmit={handleAddNote} className="space-y-2">
              <textarea
                rows={2}
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Log call summary, lender feedback, or document observations..."
                className="w-full p-2.5 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
              />
              <Button type="submit" variant="primary" size="sm">
                Add Note
              </Button>
            </form>

            <div className="space-y-2 pt-2">
              {notes.map((n: any) => (
                <div key={n.id} className="p-3 bg-slate-50 rounded-lg text-xs space-y-1">
                  <div className="flex justify-between text-[10px] text-[#667085]">
                    <span className="font-semibold text-slate-800">{n.author_name || 'Staff'}</span>
                    <span>{formatDateTime(n.created_at)}</span>
                  </div>
                  <p className="text-slate-700">{n.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick actions sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {/* Status Change Widget */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#071B3A]">Update Pipeline Status</h3>
            <select
              value={lead.status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="w-full p-2 text-xs rounded-lg border border-slate-300 font-semibold focus:ring-2 focus:ring-[#071B3A]"
            >
              {allStatuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Remarks for this transition..."
              value={statusRemark}
              onChange={(e) => setStatusRemark(e.target.value)}
              className="w-full p-2 text-xs rounded-lg border border-slate-300"
            />
          </div>

          {/* Assign Staff Widget */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#071B3A] flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-[#168B45]" /> Assigned Advisor
            </h3>
            <select
              value={lead.assigned_to || ''}
              onChange={(e) => handleAssignStaff(e.target.value)}
              className="w-full p-2 text-xs rounded-lg border border-slate-300"
            >
              <option value="">Unassigned</option>
              {staffList?.map((s) => (
                <option key={s.id} value={s.id}>{s.name} ({s.role})</option>
              ))}
            </select>
          </div>

          {/* Linked Appointments */}
          <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-[#071B3A] flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#071B3A]" /> Linked Consultations
            </h3>
            {appointments.length === 0 ? (
              <p className="text-xs text-[#667085]">No appointments booked for this applicant.</p>
            ) : (
              <div className="space-y-2">
                {appointments.map((a: any) => (
                  <div key={a.id} className="p-2.5 bg-slate-50 rounded-lg text-xs">
                    <span className="font-semibold block">{a.service}</span>
                    <span className="text-[11px] text-slate-500">{a.appointment_date} at {a.appointment_time}</span>
                    <div className="mt-1"><Badge label={a.status} /></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
