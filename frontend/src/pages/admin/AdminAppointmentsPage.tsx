import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { appointmentApi } from '../../services/appointmentApi';
import { useFetch } from '../../hooks/useFetch';
import { Spinner } from '../../components/common/Spinner';
import { Badge } from '../../components/common/Badge';
import { Calendar, Eye, Phone, Video, Building2, Plus, Search, CheckCircle2, Clock, X } from 'lucide-react';
import { Appointment, AppointmentStatus, ConsultationType } from '../../types';
import {
  getStoredDemoAppointments,
  saveStoredDemoAppointments,
  updateDemoAppointmentStatus
} from '../../data/adminDemoData';

export const AdminAppointmentsPage: React.FC = () => {
  const [status, setStatus] = useState('ALL');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [demoAppointments, setDemoAppointments] = useState<Appointment[]>(() => getStoredDemoAppointments());
  const [showAddModal, setShowAddModal] = useState(false);
  const [newAppt, setNewAppt] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'Sanction Structuring & Credit Assessment',
    appointment_date: '2025-05-20',
    appointment_time: '11:30 AM',
    consultation_type: 'OFFICE' as ConsultationType,
    assigned_to_name: 'Vikramaditya Soni',
    notes: ''
  });

  const { data: liveAppointments, isLoading } = useFetch<Appointment[]>(
    () => appointmentApi.getAppointments({ page, limit: 25, status: 'ALL' }),
    [page]
  );

  const allAppointments = useMemo(() => {
    const live = Array.isArray(liveAppointments) ? liveAppointments : [];
    const liveIds = new Set(live.map((a) => a.id));
    return [...live, ...demoAppointments.filter((d) => !liveIds.has(d.id))];
  }, [liveAppointments, demoAppointments]);

  const filteredAppointments = useMemo(() => {
    return allAppointments.filter((a) => {
      const matchesStatus = status === 'ALL' || a.status === status;
      const q = search.trim().toLowerCase();
      const matchesSearch =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.phone.toLowerCase().includes(q) ||
        a.service.toLowerCase().includes(q) ||
        (a.assigned_to_name || '').toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [allAppointments, status, search]);

  const statuses: AppointmentStatus[] = [
    'PENDING',
    'CONFIRMED',
    'RESCHEDULED',
    'COMPLETED',
    'CANCELLED',
    'NO_SHOW'
  ];

  const handleQuickStatus = (id: string, nextStatus: AppointmentStatus) => {
    updateDemoAppointmentStatus(id, nextStatus);
    setDemoAppointments(getStoredDemoAppointments());
    appointmentApi.updateStatus(id, nextStatus).catch(() => {});
  };

  const handleCreateAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAppt.name.trim() || !newAppt.phone.trim()) return;
    const now = new Date().toISOString();
    const created: Appointment = {
      id: `demo-appt-${Date.now()}`,
      name: newAppt.name.trim(),
      phone: newAppt.phone.trim(),
      email: newAppt.email.trim() || 'client@enterprise.in',
      service: newAppt.service,
      appointment_date: newAppt.appointment_date,
      appointment_time: newAppt.appointment_time,
      consultation_type: newAppt.consultation_type,
      meeting_link: newAppt.consultation_type === 'ONLINE' ? 'https://meet.google.com/efn-credit-desk' : null,
      status: 'CONFIRMED',
      notes: newAppt.notes,
      assigned_to: 'staff-1',
      assigned_to_name: newAppt.assigned_to_name,
      created_at: now,
      updated_at: now
    };
    const updated = [created, ...demoAppointments];
    saveStoredDemoAppointments(updated);
    setDemoAppointments(updated);
    setShowAddModal(false);
    setNewAppt({
      name: '',
      phone: '',
      email: '',
      service: 'Sanction Structuring & Credit Assessment',
      appointment_date: '2025-05-20',
      appointment_time: '11:30 AM',
      consultation_type: 'OFFICE',
      assigned_to_name: 'Vikramaditya Soni',
      notes: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#071B3A]">Advisory Appointments</h1>
          <p className="text-xs text-[#667085]">Scheduled corporate briefings, Raipur HQ meetings, and video consultations</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2 rounded-xl bg-[#071B3A] text-white text-xs font-bold hover:bg-[#0c2752] flex items-center gap-1.5 shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" /> Schedule Consultation
        </button>
      </div>

      {/* KPI Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#667085] block">Total Scheduled</span>
            <span className="text-xl font-extrabold text-[#071B3A] mt-0.5 block">{allAppointments.length}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600"><Calendar className="w-4 h-4" /></div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#667085] block">Confirmed Slots</span>
            <span className="text-xl font-extrabold text-[#168B45] mt-0.5 block">
              {allAppointments.filter((a) => a.status === 'CONFIRMED').length}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-600"><CheckCircle2 className="w-4 h-4" /></div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#667085] block">Pending Confirmation</span>
            <span className="text-xl font-extrabold text-amber-600 mt-0.5 block">
              {allAppointments.filter((a) => a.status === 'PENDING').length}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-amber-50 text-amber-600"><Clock className="w-4 h-4" /></div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#667085] block">Raipur HQ / Video</span>
            <span className="text-xl font-extrabold text-[#071B3A] mt-0.5 block">
              {allAppointments.filter((a) => a.consultation_type === 'OFFICE').length} HQ •{' '}
              {allAppointments.filter((a) => a.consultation_type === 'ONLINE').length} Video
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-purple-50 text-purple-600"><Video className="w-4 h-4" /></div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search client, service, advisor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => { setStatus('ALL'); setPage(1); }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              status === 'ALL'
                ? 'bg-[#071B3A] text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            ALL ({allAppointments.length})
          </button>
          {statuses.map((s) => {
            const count = allAppointments.filter((a) => a.status === s).length;
            return (
              <button
                key={s}
                onClick={() => { setStatus(s); setPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  status === s
                    ? 'bg-[#071B3A] text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {s} {count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading && filteredAppointments.length === 0 ? (
          <Spinner text="Loading appointments..." />
        ) : filteredAppointments.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#667085]">No appointments found matching your filter.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F8FC] border-b border-slate-200 text-[#071B3A] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Client / Enterprise</th>
                  <th className="py-3.5 px-4">Advisory Agenda</th>
                  <th className="py-3.5 px-4">Date & Slot</th>
                  <th className="py-3.5 px-4">Channel</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Assigned Advisor</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredAppointments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50/90 transition-colors">
                    <td className="py-3.5 px-4">
                      <Link to={`/admin/appointments/${a.id}`} className="font-bold text-[#071B3A] hover:underline block">
                        {a.name}
                      </Link>
                      <span className="block text-[11px] text-[#667085] mt-0.5">{a.phone} • {a.email}</span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-slate-800 block">{a.service}</span>
                      {a.notes && <span className="text-[11px] text-slate-500 line-clamp-1 block mt-0.5">{a.notes}</span>}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-[#071B3A] block">{a.appointment_date}</span>
                      <span className="block text-[11px] text-[#168B45] font-semibold">{a.appointment_time}</span>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg">
                        {a.consultation_type === 'ONLINE' ? (
                          <Video className="w-3.5 h-3.5 text-blue-600" />
                        ) : a.consultation_type === 'OFFICE' ? (
                          <Building2 className="w-3.5 h-3.5 text-[#071B3A]" />
                        ) : (
                          <Phone className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                        {a.consultation_type === 'OFFICE' ? 'RAIPUR HQ' : a.consultation_type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex flex-col gap-1 items-start">
                        <Badge label={a.status} />
                        <select
                          value={a.status}
                          onChange={(e) => handleQuickStatus(a.id, e.target.value as AppointmentStatus)}
                          className="text-[10px] text-slate-500 bg-transparent border border-slate-200 rounded px-1.5 py-0.5 hover:border-slate-400 focus:outline-none"
                        >
                          {statuses.map((st) => (
                            <option key={st} value={st}>Set: {st}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-semibold">
                      {a.assigned_to_name || 'Vikramaditya Soni'}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <Link
                        to={`/admin/appointments/${a.id}`}
                        className="px-2.5 py-1.5 inline-flex items-center gap-1 text-[#071B3A] bg-slate-100 hover:bg-[#071B3A] hover:text-white rounded-lg font-bold transition-colors"
                      >
                        <Eye className="w-3.5 h-3.5" /> Manage
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Schedule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 bg-[#071B3A] text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Schedule Advisory Consultation</h3>
                <p className="text-[11px] text-slate-300">Book Raipur HQ or Virtual Credit Desk Session</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateAppointment} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Client / Enterprise Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g.Naveen Jindal (Jindal Infra)"
                    value={newAppt.name}
                    onChange={(e) => setNewAppt({ ...newAppt, name: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Contact Phone *</label>
                  <input
                    required
                    type="text"
                    placeholder="+91 98261 XXXXX"
                    value={newAppt.phone}
                    onChange={(e) => setNewAppt({ ...newAppt, phone: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="cfo@company.in"
                    value={newAppt.email}
                    onChange={(e) => setNewAppt({ ...newAppt, email: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Consultation Mode</label>
                  <select
                    value={newAppt.consultation_type}
                    onChange={(e) => setNewAppt({ ...newAppt, consultation_type: e.target.value as ConsultationType })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  >
                    <option value="OFFICE">OFFICE (Raipur Corporate HQ)</option>
                    <option value="ONLINE">ONLINE (Google Meet / Zoom)</option>
                    <option value="PHONE">PHONE (Telephonic Briefing)</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Appointment Date</label>
                  <input
                    type="date"
                    value={newAppt.appointment_date}
                    onChange={(e) => setNewAppt({ ...newAppt, appointment_date: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newAppt.appointment_time}
                    onChange={(e) => setNewAppt({ ...newAppt, appointment_time: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Advisory Agenda / Service</label>
                <input
                  type="text"
                  value={newAppt.service}
                  onChange={(e) => setNewAppt({ ...newAppt, service: e.target.value })}
                  className="w-full p-2 rounded-lg border border-slate-300"
                />
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Briefing Notes</label>
                <textarea
                  rows={2}
                  value={newAppt.notes}
                  onChange={(e) => setNewAppt({ ...newAppt, notes: e.target.value })}
                  placeholder="Documents to bring or agenda highlights..."
                  className="w-full p-2 rounded-lg border border-slate-300"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-[#168B45] text-white font-bold hover:bg-[#127338]"
                >
                  Confirm Consultation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
