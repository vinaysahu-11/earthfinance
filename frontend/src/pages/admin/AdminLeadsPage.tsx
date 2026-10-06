import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { leadApi } from '../../services/leadApi';
import { useFetch } from '../../hooks/useFetch';
import { useDebounce } from '../../hooks/useDebounce';
import { Spinner } from '../../components/common/Spinner';
import { Badge } from '../../components/common/Badge';
import { Search, Eye, Phone, MessageCircle } from 'lucide-react';
import { formatDate } from '../../utils/formatters';
import { getWhatsAppLink, createLeadWhatsAppMessage } from '../../utils/whatsapp';
import { Lead } from '../../types';

export const AdminLeadsPage: React.FC = () => {
  const [status, setStatus] = useState<string>('ALL');
  const [searchInput, setSearchInput] = useState<string>('');
  const debouncedSearch = useDebounce(searchInput, 300);
  const [page, setPage] = useState<number>(1);

  const { data: leads, isLoading, refetch } = useFetch<Lead[]>(
    () => leadApi.getLeads({ page, limit: 15, status, search: debouncedSearch }),
    [page, status, debouncedSearch]
  );

  const statuses = [
    'ALL',
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#071B3A]">Leads & Financing Applications</h1>
          <p className="text-xs text-[#667085]">End-to-end enterprise credit lifecycle CRM</p>
        </div>
      </div>

      {/* Filter and search bar */}
      <div className="p-4 bg-white rounded-xl border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, email, phone, city..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
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
              {s.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {isLoading ? (
          <Spinner text="Loading leads records..." />
        ) : !leads || leads.length === 0 ? (
          <div className="p-12 text-center text-xs text-[#667085]">
            No leads found matching your criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F4F8FC] border-b border-slate-200 text-[#071B3A] font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Facility / Amount</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Assigned To</th>
                  <th className="py-3 px-4">Created</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leads.map((l) => {
                  const waUrl = getWhatsAppLink(
                    createLeadWhatsAppMessage({ loanType: l.loan_type || '', amount: l.required_amount || '', city: l.city || '' }),
                    l.phone
                  );

                  return (
                    <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4">
                        <Link to={`/admin/leads/${l.id}`} className="font-bold text-[#071B3A] hover:underline">
                          {l.name}
                        </Link>
                        <span className="block text-[11px] text-[#667085]">{l.email} • {l.phone}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-semibold text-slate-800">{l.loan_type || 'Loan'}</span>
                        <span className="block text-[11px] text-[#168B45] font-bold">{l.required_amount}</span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{l.city}</td>
                      <td className="py-3 px-4">
                        <Badge label={l.status} />
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {l.assigned_to_name || <span className="text-slate-400 italic">Unassigned</span>}
                      </td>
                      <td className="py-3 px-4 text-slate-500">{formatDate(l.created_at)}</td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <a
                          href={`tel:${l.phone}`}
                          title="Call Lead"
                          className="p-1.5 inline-block text-slate-600 hover:text-[#071B3A] hover:bg-slate-100 rounded"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={waUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="WhatsApp Lead"
                          className="p-1.5 inline-block text-[#168B45] hover:bg-emerald-50 rounded"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                        </a>
                        <Link
                          to={`/admin/leads/${l.id}`}
                          title="View Details"
                          className="p-1.5 inline-block text-[#071B3A] hover:bg-slate-100 rounded font-semibold"
                        >
                          <Eye className="w-3.5 h-3.5" />
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
    </div>
  );
};
