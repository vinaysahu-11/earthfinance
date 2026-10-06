import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { leadApi } from '../../services/leadApi';
import { useFetch } from '../../hooks/useFetch';
import { useDebounce } from '../../hooks/useDebounce';
import { Spinner } from '../../components/common/Spinner';
import { Badge } from '../../components/common/Badge';
import { Search, Eye, Phone, MessageCircle, Plus, Download, Users, FileCheck2, Clock, DollarSign, X } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { getWhatsAppLink, createLeadWhatsAppMessage } from '../../utils/whatsapp';
import { Lead, LeadStatus } from '../../types';
import { getStoredDemoLeads, saveStoredDemoLeads, updateDemoLeadStatus } from '../../data/adminDemoData';

export const AdminLeadsPage: React.FC = () => {
  const [status, setStatus] = useState<string>('ALL');
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearch = useDebounce(searchInput, 250);
  const [page, setPage] = useState<number>(1);
  const [demoLeads, setDemoLeads] = useState<Lead[]>(() => getStoredDemoLeads());
  const [showAddModal, setShowAddModal] = useState(false);
  const [newLeadForm, setNewLeadForm] = useState({
    name: '',
    phone: '',
    email: '',
    loan_type: 'Machinery & Plant Modernization Loan',
    required_amount: '₹1,50,00,000',
    city: 'Raipur, CG',
    business_type: 'Manufacturing & MSME',
    assigned_to_name: 'Vikramaditya Soni',
    message: ''
  });

  const { data: liveLeads, isLoading } = useFetch<Lead[]>(
    () => leadApi.getLeads({ page, limit: 25, status: 'ALL', search: '' }),
    [page]
  );

  const allLeads = useMemo(() => {
    const live = Array.isArray(liveLeads) ? liveLeads : [];
    const liveIds = new Set(live.map((l) => l.id));
    return [...live, ...demoLeads.filter((d) => !liveIds.has(d.id))];
  }, [liveLeads, demoLeads]);

  const filteredLeads = useMemo(() => {
    return allLeads.filter((l) => {
      const matchesStatus = status === 'ALL' || l.status === status;
      const q = debouncedSearch.trim().toLowerCase();
      const matchesSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        l.phone.toLowerCase().includes(q) ||
        (l.city || '').toLowerCase().includes(q) ||
        (l.loan_type || '').toLowerCase().includes(q) ||
        (l.business_type || '').toLowerCase().includes(q);
      return matchesStatus && matchesSearch;
    });
  }, [allLeads, status, debouncedSearch]);

  const statuses: LeadStatus[] = [
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

  const handleQuickStatusChange = (id: string, newStatus: LeadStatus) => {
    updateDemoLeadStatus(id, newStatus);
    setDemoLeads(getStoredDemoLeads());
    leadApi.updateStatus(id, newStatus).catch(() => {});
  };

  const handleCreateDemoLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.name.trim() || !newLeadForm.phone.trim()) return;
    const now = new Date().toISOString();
    const created: Lead = {
      id: `demo-lead-${Date.now()}`,
      name: newLeadForm.name.trim(),
      phone: newLeadForm.phone.trim(),
      email: newLeadForm.email.trim() || 'corporate@client.in',
      loan_type: newLeadForm.loan_type,
      required_amount: newLeadForm.required_amount,
      city: newLeadForm.city,
      business_type: newLeadForm.business_type,
      message: newLeadForm.message,
      source: 'Admin Desk Entry',
      status: 'NEW',
      assigned_to: 'staff-1',
      assigned_to_name: newLeadForm.assigned_to_name,
      created_at: now,
      updated_at: now
    };
    const updated = [created, ...demoLeads];
    saveStoredDemoLeads(updated);
    setDemoLeads(updated);
    setShowAddModal(false);
    setNewLeadForm({
      name: '',
      phone: '',
      email: '',
      loan_type: 'Machinery & Plant Modernization Loan',
      required_amount: '₹1,50,00,000',
      city: 'Raipur, CG',
      business_type: 'Manufacturing & MSME',
      assigned_to_name: 'Vikramaditya Soni',
      message: ''
    });
  };

  const handleExportCsv = () => {
    const headers = ['ID', 'Applicant Name', 'Phone', 'Email', 'Loan Facility', 'Amount', 'City', 'Industry', 'Status', 'Advisor'];
    const rows = filteredLeads.map((l) => [
      l.id,
      `"${l.name.replace(/"/g, '""')}"`,
      l.phone,
      l.email,
      `"${(l.loan_type || '').replace(/"/g, '""')}"`,
      `"${(l.required_amount || '').replace(/"/g, '""')}"`,
      `"${(l.city || '').replace(/"/g, '""')}"`,
      `"${(l.business_type || '').replace(/"/g, '""')}"`,
      l.status,
      `"${(l.assigned_to_name || 'Unassigned').replace(/"/g, '""')}"`
    ]);
    const csv = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `earthfinance-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#071B3A]">Leads & Financing Applications</h1>
          <p className="text-xs text-[#667085]">End-to-end enterprise credit lifecycle CRM & underwriting desk</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCsv}
            className="px-3.5 py-2 rounded-xl border border-slate-200 bg-white text-xs font-bold text-[#071B3A] hover:bg-slate-50 flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 rounded-xl bg-[#071B3A] text-white text-xs font-bold hover:bg-[#0c2752] flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-4 h-4" /> New Corporate Lead
          </button>
        </div>
      </div>

      {/* Summary KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#667085] block">Active CRM Mandates</span>
            <span className="text-xl font-extrabold text-[#071B3A] mt-0.5 block">{allLeads.length}</span>
          </div>
          <div className="p-2.5 rounded-lg bg-blue-50 text-blue-600"><Users className="w-4 h-4" /></div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#667085] block">New / In-Review</span>
            <span className="text-xl font-extrabold text-[#071B3A] mt-0.5 block">
              {allLeads.filter((l) => ['NEW', 'CONTACTED', 'DOCUMENTS_RECEIVED', 'PROCESSING'].includes(l.status)).length}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600"><Clock className="w-4 h-4" /></div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#667085] block">Sanctioned / Approved</span>
            <span className="text-xl font-extrabold text-[#168B45] mt-0.5 block">
              {allLeads.filter((l) => l.status === 'APPROVED').length}
            </span>
          </div>
          <div className="p-2.5 rounded-lg bg-teal-50 text-teal-600"><FileCheck2 className="w-4 h-4" /></div>
        </div>
        <div className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[11px] font-semibold text-[#667085] block">Active Pipeline Value</span>
            <span className="text-xl font-extrabold text-[#071B3A] mt-0.5 block">₹29.65 Cr</span>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-50 text-emerald-700"><DollarSign className="w-4 h-4" /></div>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search company, promoter, city, facility..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
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
            ALL ({allLeads.length})
          </button>
          {statuses.map((s) => {
            const count = allLeads.filter((l) => l.status === s).length;
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
                {s.replace(/_/g, ' ')} {count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading && filteredLeads.length === 0 ? (
          <Spinner text="Loading leads records..." />
        ) : filteredLeads.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#667085]">
            No leads found matching your filter criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F8FC] border-b border-slate-200 text-[#071B3A] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3.5 px-4">Applicant / Enterprise</th>
                  <th className="py-3.5 px-4">Facility / Mandate Size</th>
                  <th className="py-3.5 px-4">Sector & City</th>
                  <th className="py-3.5 px-4">Pipeline Stage</th>
                  <th className="py-3.5 px-4">Assigned Underwriter</th>
                  <th className="py-3.5 px-4">Filed Date</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((l) => {
                  const waUrl = getWhatsAppLink(
                    createLeadWhatsAppMessage({
                      loanType: l.loan_type || '',
                      amount: l.required_amount || '',
                      city: l.city || ''
                    }),
                    l.phone
                  );

                  return (
                    <tr key={l.id} className="hover:bg-slate-50/90 transition-colors">
                      <td className="py-3.5 px-4">
                        <Link to={`/admin/leads/${l.id}`} className="font-bold text-[#071B3A] hover:underline block">
                          {l.name}
                        </Link>
                        <span className="block text-[11px] text-[#667085] mt-0.5">
                          {l.email} • {l.phone}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-800 block">{l.loan_type || 'Corporate Facility'}</span>
                        <span className="block text-xs text-[#168B45] font-extrabold mt-0.5">{l.required_amount}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold text-slate-700 block">{l.city}</span>
                        <span className="text-[11px] text-slate-500 block">{l.business_type || 'Enterprise'}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1 items-start">
                          <Badge label={l.status} />
                          <select
                            value={l.status}
                            onChange={(e) => handleQuickStatusChange(l.id, e.target.value as LeadStatus)}
                            className="text-[10px] text-slate-500 bg-transparent border border-slate-200 rounded px-1.5 py-0.5 hover:border-slate-400 focus:outline-none"
                          >
                            {statuses.map((st) => (
                              <option key={st} value={st}>
                                Move to: {st.replace(/_/g, ' ')}
                              </option>
                            ))}
                          </select>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-700">
                        <span className="font-semibold block">{l.assigned_to_name || 'Vikramaditya Soni'}</span>
                        <span className="text-[10px] text-slate-400">{l.source}</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap">{formatDate(l.created_at)}</td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap space-x-1.5">
                        <a
                          href={`tel:${l.phone}`}
                          title="Call Promoter"
                          className="p-1.5 inline-flex items-center justify-center text-slate-600 hover:text-[#071B3A] hover:bg-slate-100 rounded-lg border border-slate-200"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp Desk"
                          className="p-1.5 inline-flex items-center justify-center text-[#168B45] hover:bg-emerald-50 rounded-lg border border-emerald-200"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <Link
                          to={`/admin/leads/${l.id}`}
                          title="Open Credit Dossier"
                          className="px-2.5 py-1.5 inline-flex items-center gap-1 text-[#071B3A] bg-slate-100 hover:bg-[#071B3A] hover:text-white rounded-lg font-bold transition-colors"
                        >
                          <Eye className="w-3.5 h-3.5" /> Dossier
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-lg w-full overflow-hidden">
            <div className="px-6 py-4 bg-[#071B3A] text-white flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold">Register Corporate / MSME Mandate</h3>
                <p className="text-[11px] text-slate-300">Direct entry into Earth Finance Underwriting Pipeline</p>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-300 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreateDemoLead} className="p-6 space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Promoter & Company Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Rajesh Agrawal (Agrawal Steels)"
                    value={newLeadForm.name}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, name: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mobile Number *</label>
                  <input
                    required
                    type="text"
                    placeholder="+91 98261 XXXXX"
                    value={newLeadForm.phone}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, phone: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Corporate Email</label>
                  <input
                    type="email"
                    placeholder="director@company.in"
                    value={newLeadForm.email}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, email: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">City / Industrial Hub</label>
                  <input
                    type="text"
                    value={newLeadForm.city}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, city: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Credit Facility Type</label>
                  <input
                    type="text"
                    value={newLeadForm.loan_type}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, loan_type: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Mandate Amount</label>
                  <input
                    type="text"
                    value={newLeadForm.required_amount}
                    onChange={(e) => setNewLeadForm({ ...newLeadForm, required_amount: e.target.value })}
                    className="w-full p-2 rounded-lg border border-slate-300"
                  />
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Credit Brief & Collateral Notes</label>
                <textarea
                  rows={2}
                  value={newLeadForm.message}
                  onChange={(e) => setNewLeadForm({ ...newLeadForm, message: e.target.value })}
                  placeholder="Turnover, collateral details, existing banker..."
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
                  Create Lead Dossier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
