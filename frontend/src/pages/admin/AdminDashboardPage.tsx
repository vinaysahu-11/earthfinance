import React from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import { useFetch } from '../../hooks/useFetch';
import { Spinner } from '../../components/common/Spinner';
import { Alert } from '../../components/common/Alert';
import { Badge } from '../../components/common/Badge';
import {
  Users,
  Calendar,
  FileCheck2,
  DollarSign,
  Clock,
  Star,
  ArrowRight
} from 'lucide-react';
import { DashboardStats } from '../../types';
import { formatDate } from '../../utils/formatters';

export const AdminDashboardPage: React.FC = () => {
  const { data: stats, isLoading, error } = useFetch<DashboardStats>(() => adminApi.getDashboardStats());

  if (isLoading) return <Spinner size="lg" text="Loading dashboard metrics..." />;
  if (error) return <Alert type="error" message={error} />;

  const metrics = stats?.metrics;
  const hasData = stats?.hasData;

  const statCards = [
    { label: 'Total Leads', val: metrics?.totalLeads ?? 0, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'New Leads', val: metrics?.newLeads ?? 0, icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Pending Appointments', val: metrics?.pendingAppointments ?? 0, icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: "Today's Appointments", val: metrics?.todayAppointments ?? 0, icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Applications', val: metrics?.applications ?? 0, icon: FileCheck2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Approved Leads', val: metrics?.approvedLeads ?? 0, icon: FileCheck2, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Disbursed Facilities', val: metrics?.disbursedLeads ?? 0, icon: DollarSign, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: 'Pending Reviews', val: metrics?.pendingReviews ?? 0, icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#071B3A]">Operations & Advisory Dashboard</h1>
        <p className="text-xs text-[#667085]">Real-time metrics from the InsForge database</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div>
                <span className="text-xs text-[#667085] block font-medium">{c.label}</span>
                <span className="text-2xl font-extrabold text-[#071B3A] mt-1 block">
                  {c.val}
                </span>
              </div>
              <div className={`p-3 rounded-lg ${c.bg} ${c.color}`}>
                <Icon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts / Breakdown row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-[#071B3A] mb-4">Lead Status Pipeline</h3>
          {!hasData || !stats?.statusDistribution || stats.statusDistribution.length === 0 ? (
            <p className="text-xs text-[#667085] py-8 text-center">No data available</p>
          ) : (
            <div className="space-y-3">
              {stats.statusDistribution.map((s) => (
                <div key={s.status} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Badge label={s.status} />
                  </div>
                  <span className="font-bold text-[#071B3A]">{s.count} leads</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Loan Categories Breakdown */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-[#071B3A] mb-4">Loan Category Statistics</h3>
          {!hasData || !stats?.categoryDistribution || stats.categoryDistribution.length === 0 ? (
            <p className="text-xs text-[#667085] py-8 text-center">No data available</p>
          ) : (
            <div className="space-y-3">
              {stats.categoryDistribution.map((c) => (
                <div key={c.name} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-none">
                  <span className="text-slate-700 font-medium">{c.name}</span>
                  <span className="font-bold text-[#071B3A]">{c.count} applications</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tables Row: Recent Leads & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#071B3A]">Recent Leads</h3>
            <Link to="/admin/leads" className="text-xs text-[#071B3A] font-semibold flex items-center gap-1 hover:underline">
              <span>View All</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {!stats?.recentLeads || stats.recentLeads.length === 0 ? (
            <p className="text-xs text-[#667085] py-8 text-center">No data available</p>
          ) : (
            <div className="divide-y divide-slate-100 text-xs">
              {stats.recentLeads.map((l) => (
                <div key={l.id} className="py-3 flex items-center justify-between">
                  <div>
                    <Link to={`/admin/leads/${l.id}`} className="font-bold text-[#071B3A] hover:underline">
                      {l.name}
                    </Link>
                    <span className="block text-[11px] text-[#667085]">{l.loan_type} • {l.required_amount}</span>
                  </div>
                  <div className="text-right">
                    <Badge label={l.status} />
                    <span className="block text-[10px] text-slate-400 mt-1">{formatDate(l.created_at)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-[#071B3A]">Upcoming Consultations</h3>
            <Link to="/admin/appointments" className="text-xs text-[#071B3A] font-semibold flex items-center gap-1 hover:underline">
              <span>View All</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {!stats?.upcomingAppointments || stats.upcomingAppointments.length === 0 ? (
            <p className="text-xs text-[#667085] py-8 text-center">No data available</p>
          ) : (
            <div className="divide-y divide-slate-100 text-xs">
              {stats.upcomingAppointments.map((a) => (
                <div key={a.id} className="py-3 flex items-center justify-between">
                  <div>
                    <Link to={`/admin/appointments/${a.id}`} className="font-bold text-[#071B3A] hover:underline">
                      {a.name}
                    </Link>
                    <span className="block text-[11px] text-[#667085]">{a.service} • {a.consultation_type}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-[#071B3A] block">{a.appointment_date} {a.appointment_time}</span>
                    <Badge label={a.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
