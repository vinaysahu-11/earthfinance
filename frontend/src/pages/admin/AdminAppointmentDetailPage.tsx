import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { appointmentApi } from '../../services/appointmentApi';
import { useFetch } from '../../hooks/useFetch';
import { Spinner } from '../../components/common/Spinner';
import { Alert } from '../../components/common/Alert';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { ArrowLeft, Calendar, Video, Phone, Mail } from 'lucide-react';
import { Appointment } from '../../types';

export const AdminAppointmentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [meetingLink, setMeetingLink] = useState('');
  const [appointmentNotes, setAppointmentNotes] = useState('');
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const { data: appointment, isLoading, error, refetch } = useFetch<Appointment>(
    () => appointmentApi.getAppointmentById(id || ''),
    [id]
  );

  if (isLoading) return <Spinner size="lg" text="Loading appointment record..." />;
  if (error || !appointment) return <Alert type="error" message={error || 'Appointment not found.'} />;

  const handleUpdateStatus = async (status: string) => {
    try {
      const res = await appointmentApi.updateStatus(appointment.id, status, appointmentNotes || undefined, meetingLink || undefined);
      if (res.success) {
        setActionSuccess(`Appointment status set to ${status}`);
        refetch();
      }
    } catch {
      alert('Failed to update status');
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <Link to="/admin/appointments" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#071B3A]">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Appointments
      </Link>

      {actionSuccess && <Alert type="success" message={actionSuccess} />}

      <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#071B3A]">{appointment.name}</h2>
            <span className="text-xs text-[#667085]">{appointment.email} • {appointment.phone}</span>
          </div>
          <Badge label={appointment.status} />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-slate-400 block">Service</span>
            <strong className="text-[#071B3A]">{appointment.service}</strong>
          </div>
          <div>
            <span className="text-slate-400 block">Consultation Date</span>
            <strong className="text-slate-800">{appointment.appointment_date}</strong>
          </div>
          <div>
            <span className="text-slate-400 block">Time Slot</span>
            <strong className="text-slate-800">{appointment.appointment_time}</strong>
          </div>
          <div>
            <span className="text-slate-400 block">Mode</span>
            <strong className="text-slate-800">{appointment.consultation_type}</strong>
          </div>
        </div>

        {appointment.meeting_link && (
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-xs">
            <span className="font-semibold block text-blue-900 mb-1">Meeting Link:</span>
            <a href={appointment.meeting_link} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline break-all">
              {appointment.meeting_link}
            </a>
          </div>
        )}

        {/* Update Status Controls */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <h3 className="text-sm font-bold text-[#071B3A]">Manage Consultation</h3>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Meeting Link (Google Meet / Zoom URL)</label>
            <input
              type="url"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              placeholder="https://meet.google.com/xyz-abc-123"
              className="w-full p-2 text-xs rounded-lg border border-slate-300"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Notes</label>
            <textarea
              rows={2}
              value={appointmentNotes}
              onChange={(e) => setAppointmentNotes(e.target.value)}
              placeholder="Session notes or action items..."
              className="w-full p-2 text-xs rounded-lg border border-slate-300"
            />
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Button size="sm" variant="secondary" onClick={() => handleUpdateStatus('CONFIRMED')}>
              Confirm Appointment
            </Button>
            <Button size="sm" variant="primary" onClick={() => handleUpdateStatus('COMPLETED')}>
              Mark Completed
            </Button>
            <Button size="sm" variant="danger" onClick={() => handleUpdateStatus('CANCELLED')}>
              Cancel
            </Button>
            <Button size="sm" variant="outline" onClick={() => handleUpdateStatus('NO_SHOW')}>
              Mark No Show
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
