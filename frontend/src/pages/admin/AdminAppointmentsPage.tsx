import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { appointmentApi } from '../../services/appointmentApi';
import { useFetch } from '../../hooks/useFetch';
import { Spinner } from '../../components/common/Spinner';
import { Badge } from '../../components/common/Badge';
import { Calendar, Eye, Phone, Video } from 'lucide-react';
import { Appointment } from '../../types';

export const AdminAppointmentsPage: React.FC = () => {
  const [status, setStatus] = useState('ALL');
  const [page, setPage] = useState(1);

  const { data: appointments, isLoading } = useFetch<Appointment[]>(
    () => appointmentApi.getAppointments({ page, limit: 15, status }),
    [page, status]
  );

  const statuses = ['ALL', 'PENDING', 'CONFIRMED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED', 'NO_SHOW'];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#071B3A]">Advisory Appointments</h1>
          <p className="text-xs text-[#667085]">Scheduled client calls and in-person consultations</p>
        </div>
      </div>

      <div className="p-4 bg-white rounded-xl border border-slate-200 flex items-center gap-2 overflow-x-auto">
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() => { setStatus(s); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              status === s
                ? 'bg-[#071B3A] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <Spinner text="Loading appointments..." />
        ) : !appointments || appointments.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#667085]">No appointments found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F8FC] border-b border-slate-200 text-[#071B3A] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Service</th>
                  <th className="py-3 px-4">Date & Time</th>
                  <th className="py-3 px-4">Mode</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Assigned Staff</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="py-3 px-4">
                      <Link to={`/admin/appointments/${a.id}`} className="font-bold text-[#071B3A] hover:underline">
                        {a.name}
                      </Link>
                      <span className="block text-[11px] text-[#667085]">{a.phone} • {a.email}</span>
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-800">{a.service}</td>
                    <td className="py-3 px-4">
                      <span className="font-bold text-[#071B3A]">{a.appointment_date}</span>
                      <span className="block text-[11px] text-slate-500">{a.appointment_time}</span>
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 font-medium text-slate-700">
                        {a.consultation_type === 'ONLINE' ? <Video className="w-3.5 h-3.5 text-blue-600" /> : <Phone className="w-3.5 h-3.5 text-emerald-600" />}
                        {a.consultation_type}
                      </span>
                    </td>
                    <td className="py-3 px-4"><Badge label={a.status} /></td>
                    <td className="py-3 px-4 text-slate-600">{a.assigned_to_name || 'Unassigned'}</td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/admin/appointments/${a.id}`}
                        className="p-1.5 inline-block text-[#071B3A] hover:bg-slate-100 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
