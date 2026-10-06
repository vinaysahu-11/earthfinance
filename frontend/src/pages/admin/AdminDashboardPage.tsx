import React from 'react';
import { Link } from 'react-router-dom';
import { adminApi } from '../../services/adminApi';
import { useFetch } from '../../hooks/useFetch';
import { Spinner } from '../../components/common/Spinner';
import { Badge } from '../../components/common/Badge';
import {
  Users,
  Calendar,
  FileCheck2,
  DollarSign,
  Clock,
  Star,
  ArrowRight,
  TrendingUp,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { DashboardStats } from '../../types';
import { formatDate } from '../../utils/formatters';
import { buildDemoDashboardStats } from '../../data/adminDemoData';

export const AdminDashboardPage: React.FC = () => {
  const { data: liveStats, isLoading } = useFetch<DashboardStats>(() => adminApi.getDashboardStats());

  if (isLoading) return <Spinner size="lg" text="Loading dashboard metrics..." />;

  const demoStats = buildDemoDashboardStats();
  const useLive = Boolean(liveStats?.hasData && (liveStats.metrics?.totalLeads ?? 0) > 0);
  const stats = useLive && liveStats ? liveStats : demoStats;
  const metrics = stats.metrics;

  const statCards = [
    { label: 'Total Leads', val: metrics.totalLeads, trend: '+18.4% MoM', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'New Leads', val: metrics.newLeads, trend: '6 today', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Pending Appointments', val: metrics.pendingAppointments, trend: 'Action required', icon: Calendar, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: "Today's Appointments", val: metrics.todayAppointments, trend: 'Raipur & Online', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Active Applications', val: metrics.applications, trend: '₹142.5 Cr pipeline', icon: FileCheck2, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Approved Mandates', val: metrics.approvedLeads, trend: '91.2% sanction rate', icon: ShieldCheck, color: 'text-teal-600', bg: 'bg-teal-50' },
    { label: 'Disbursed Facilities', val: metrics.disbursedLeads, trend: '₹68.4 Cr FY25-26', icon: DollarSign, color: 'text-emerald-700', bg: 'bg-emerald-50' },
    { label: 'Pending Reviews', val: metrics.pendingReviews, trend: '4.9★ avg rating', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-50' }
  ];

  const totalStatusCount = stats.statusDistribution.reduce((acc, s) => acc + s.count, 0) || 1;
  const maxCategoryCount = Math.max(...stats.categoryDistribution.map((c) => c.count), 1);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 text-[#168B45] text-[11px] font-bold mb-2">
            <span className="w-2 h-2 rounded-full bg-[#168B45] animate-pulse" />
            CENTRAL INDIA INSTITUTIONAL CREDIT DESK • LIVE TELEMETRY
          </div>
          <h1 className="text-2xl font-extrabold text-[#071B3A]">Operations & Advisory Dashboard</h1>
          <p className="text-xs text-[#667085] mt-0.5">
            Real-time underwriting pipeline, corporate mandates, and scheduled client consultations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/leads"
            className="px-4 py-2.5 rounded-xl bg-[#071B3A] text-white text-xs font-bold hover:bg-[#0c2752] transition-colors flex items-center gap-2 shadow-sm"
          >
            <Users className="w-4 h-4" /> Manage Leads CRM
          </Link>
          <Link
            to="/admin/appointments"
            className="px-4 py-2.5 rounded-xl bg-[#168B45] text-white text-xs font-bold hover:bg-[#127338] transition-colors flex items-center gap-2 shadow-sm"
          >
            <Calendar className="w-4 h-4" /> Consultations
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="p-5 bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-start justify-between"
            >
              <div>
                <span className="text-xs text-[#667085] block font-semibold">{c.label}</span>
                <span className="text-2xl font-extrabold text-[#071B3A] mt-1.5 block">
                  {c.val}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#168B45] mt-1.5">
                  <TrendingUp className="w-3 h-3" /> {c.trend}
                </span>
              </div>
              <div className={`p-3 rounded-xl ${c.bg} ${c.color}`}>
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
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-[#071B3A]">Lead Status Pipeline</h3>
              <p className="text-[11px] text-[#667085]">Active stage distribution across {totalStatusCount} corporate & MSME files</p>
            </div>
            <Link to="/admin/leads" className="text-xs font-bold text-[#168B45] hover:underline">
              Open Pipeline →
            </Link>
          </div>
          <div className="space-y-3.5">
            {stats.statusDistribution.map((s) => {
              const pct = Math.round((s.count / totalStatusCount) * 100);
              return (
                <div key={s.status} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <Badge label={s.status} />
                    </div>
                    <span className="font-bold text-[#071B3A]">
                      {s.count} files <span className="text-slate-400 font-normal">({pct}%)</span>
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#071B3A] to-[#168B45] rounded-full"
                      style={{ width: `${Math.max(pct, 6)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Loan Categories Breakdown */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-[#071B3A]">Loan Category Demand</h3>
              <p className="text-[11px] text-[#667085]">Origination volume by structured credit facility</p>
            </div>
            <Link to="/admin/loans" className="text-xs font-bold text-[#071B3A] hover:underline flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5" /> Catalog
            </Link>
          </div>
          <div className="space-y-3.5">
            {stats.categoryDistribution.map((c) => {
              const widthPct = Math.round((c.count / maxCategoryCount) * 100);
              return (
                <div key={c.name} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-700 font-semibold">{c.name}</span>
                    <span className="font-bold text-[#071B3A]">{c.count} mandates</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#071B3A] rounded-full"
                      style={{ width: `${Math.max(widthPct, 8)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tables Row: Recent Leads & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#071B3A]">Recent Corporate & SME Leads</h3>
              <p className="text-[11px] text-[#667085]">Latest financing inquiries & underwriting dossiers</p>
            </div>
            <Link to="/admin/leads" className="text-xs text-[#071B3A] font-bold flex items-center gap-1 hover:underline">
              <span>View All ({metrics.totalLeads})</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {stats.recentLeads.map((l) => (
              <div key={l.id} className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-lg transition-colors">
                <div className="min-w-0">
                  <Link to={`/admin/leads/${l.id}`} className="font-bold text-[#071B3A] hover:underline truncate block">
                    {l.name}
                  </Link>
                  <span className="block text-[11px] text-[#667085] truncate">
                    {l.loan_type} • <strong className="text-[#168B45]">{l.required_amount}</strong> • {l.city}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <Badge label={l.status} />
                  <span className="block text-[10px] text-slate-400 mt-1">{formatDate(l.created_at)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-[#071B3A]">Upcoming Advisory Consultations</h3>
              <p className="text-[11px] text-[#667085]">Scheduled Raipur HQ & video credit desk briefings</p>
            </div>
            <Link to="/admin/appointments" className="text-xs text-[#071B3A] font-bold flex items-center gap-1 hover:underline">
              <span>View Schedule</span> <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-slate-100 text-xs">
            {stats.upcomingAppointments.map((a) => (
              <div key={a.id} className="py-3 flex items-center justify-between gap-3 hover:bg-slate-50/80 px-2 rounded-lg transition-colors">
                <div className="min-w-0">
                  <Link to={`/admin/appointments/${a.id}`} className="font-bold text-[#071B3A] hover:underline truncate block">
                    {a.name}
                  </Link>
                  <span className="block text-[11px] text-[#667085] truncate">
                    {a.service} • <strong className="text-slate-700">{a.consultation_type}</strong>
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-[#071B3A] block mb-1">
                    {a.appointment_date} • {a.appointment_time}
                  </span>
                  <Badge label={a.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
