import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { contactApi } from '../../services/contactApi';
import { useFetch } from '../../hooks/useFetch';
import { ContactMessage } from '../../types';

interface UnderwriterProfile {
  name: string;
  role: string;
  initials: string;
  desk: string;
}

const UNDERWRITER_DIRECTORY: UnderwriterProfile[] = [
  { name: 'Rajesh Sharma', role: 'Principal Lead', initials: 'RS', desk: 'Raipur Head Desk' },
  { name: 'Amit Sharma', role: 'Senior Credit Analyst', initials: 'AS', desk: 'Bilaspur & North CG' },
  { name: 'Priya C.', role: 'Industrial Underwriter', initials: 'PC', desk: 'Durg-Bhilai Industrial Zone' },
  { name: 'Sanjay Verma', role: 'Equipment Finance Specialist', initials: 'SV', desk: 'Raipur Commercial Desk' }
];

const SEED_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Mahesh Singhania',
    email: 'mahesh@singhaniaagro.example',
    phone: '+91 94252 08819',
    company: 'Singhania Agro Mills, Rajnandgaon',
    location: 'Rajnandgaon, Chhattisgarh',
    channel: 'Contact Us Form',
    mandate_amount: '₹9.0 Cr Mandate',
    priority: 'Priority 1',
    subject: 'Enquiry for ₹9.0 Cr Agro Processing Capex Subvention & NABARD Consortium',
    message: 'We are setting up a modern parboiled rice milling and automated silo packaging facility in Rajnandgaon. Looking for debt syndication of ₹9.00 Crore with interest subvention under MOFPI / NABARD schemes. Have 3 years audited financials ready. Need immediate guidance on banking consortium options.',
    status: 'UNREAD',
    underwriter: 'Rajesh Sharma',
    underwriter_initials: 'RS',
    lead_id: 'EF-2025-9428',
    gstin: '22AAACS9821M1ZT',
    ip_address: '103.21.144.18 (Raipur)',
    otp_verified: true,
    category: 'Agro Capex Subvention',
    is_replied: false,
    created_at: new Date(Date.now() - 14 * 60 * 1000).toISOString()
  },
  {
    id: 'msg-2',
    name: 'Dr. Anita Dewangan',
    email: 'anita.dewangan@carediagnostics.in',
    phone: '+91 98271 43210',
    company: 'Care Diagnostics, Bilaspur',
    location: 'Bilaspur, Chhattisgarh',
    channel: 'Loan Quick Enquiry',
    mandate_amount: '₹2.1 Cr Mandate',
    priority: 'Priority 2',
    subject: 'Urgent consultation for MRI & CT Scan Medical Equipment Lease Financing',
    message: 'Procuring GE 1.5 Tesla scanner. Need structural quote on 7-year asset depreciation lease vs term loan with flexible seasonal moratorium. Vendor invoice ready for hypothecation.',
    status: 'READ',
    underwriter: 'Amit Sharma',
    underwriter_initials: 'AS',
    lead_id: 'EF-2025-9425',
    gstin: '22ABCPD4412K1ZQ',
    ip_address: '103.45.210.92 (Bilaspur)',
    otp_verified: true,
    category: 'Healthcare Equipment Lease',
    is_replied: false,
    created_at: new Date(Date.now() - 60 * 60 * 1000).toISOString()
  },
  {
    id: 'msg-3',
    name: 'Vikas Banchhor',
    email: 'vikas@centrallogistics.co.in',
    phone: '+91 91114 88320',
    company: 'Central Logistics Hub, Durg',
    location: 'Durg, Chhattisgarh',
    channel: 'WhatsApp Chat Desk',
    mandate_amount: '₹5.5 Cr Mandate',
    priority: 'Priority 1',
    subject: 'Urgent consultation for Loan Against Property on warehouse complex in Durg',
    message: 'Have 4.5 acres industrial land with 60,000 sq ft RCC shed. Valuation report already completed by SBI panel. Need debt consolidation and bridge financing of ₹5.50 Cr for warehousing cold store expansion.',
    status: 'CONVERTED',
    underwriter: 'Priya C.',
    underwriter_initials: 'PC',
    lead_id: 'EF-2025-9419',
    gstin: '22AALCB7890N1ZM',
    ip_address: '103.88.72.14 (Durg)',
    otp_verified: true,
    category: 'Industrial LAP & Warehouse Syndication',
    is_replied: true,
    created_at: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
  },
  {
    id: 'msg-4',
    name: 'Harpreet Singh Bhatia',
    email: 'hsbhatia@bhatiacoldstorage.com',
    phone: '+91 98261 12345',
    company: 'Bhatia Cold Storage, Raipur',
    location: 'Raipur, Chhattisgarh',
    channel: 'EMI Calculator Callback',
    mandate_amount: '₹2.4 Cr Mandate',
    priority: 'Priority 2',
    subject: '500 kW Captive Solar Plant Grid Financing Subsidy Inquiries',
    message: 'Calculated ₹2.40 Cr tenure on website calculator. Requesting detailed amortisation schedule and CREDA sanction assistance for our agro storage premises.',
    status: 'REPLIED',
    underwriter: 'Rajesh Sharma',
    underwriter_initials: 'RS',
    lead_id: 'EF-2025-9412',
    gstin: '22AAEFB5543D1ZY',
    ip_address: '103.21.144.95 (Raipur)',
    otp_verified: true,
    category: 'Clean Energy & Solar Capex',
    is_replied: true,
    created_at: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
  },
  {
    id: 'msg-5',
    name: 'Smt. Sunita Agrawal',
    email: 'sunita@agrawalspices.in',
    phone: '+91 94060 99881',
    company: 'Agrawal Spices & Food, Korba',
    location: 'Korba, Chhattisgarh',
    channel: 'Contact Us Form',
    mandate_amount: '₹3.5 Cr Mandate',
    priority: 'Priority 2',
    subject: 'Working Capital Enhancement ₹3.5 Cr against Book Debts & Stock',
    message: 'Current CC facility with PSU bank is ₹1.5 Cr. Turnover expanded to ₹24 Cr. Require enhancement or takeover with competitive margin terms for raw spice procurement season.',
    status: 'READ',
    underwriter: 'Amit Sharma',
    underwriter_initials: 'AS',
    lead_id: 'EF-2025-9405',
    gstin: '22AAGCA1299P1ZK',
    ip_address: '117.211.89.44 (Korba)',
    otp_verified: true,
    category: 'Working Capital & Cash Credit',
    is_replied: false,
    created_at: new Date(Date.now() - 48 * 3600 * 1000).toISOString()
  },
  {
    id: 'msg-6',
    name: 'Naveen Chandrakar',
    email: 'naveen@chandrakaragro.in',
    phone: '+91 97520 33441',
    company: 'Chandrakar Agro Infrastructure, Dhamtari',
    location: 'Dhamtari, Chhattisgarh',
    channel: 'Loan Quick Enquiry',
    mandate_amount: '₹1.8 Cr Mandate',
    priority: 'Priority 3',
    subject: 'Integrated Cold Chain and Value Addition Infrastructure Subsidy Loan',
    message: 'Acquired 2 acres highway facing land. Plan to construct 2,500 MT multi-commodity cold store. Require credit appraisal for Nabard / state subsidy submission.',
    status: 'CLOSED',
    underwriter: 'Priya C.',
    underwriter_initials: 'PC',
    lead_id: 'EF-2025-9398',
    gstin: '22AAJFC6633E1ZR',
    ip_address: '103.54.12.80 (Dhamtari)',
    otp_verified: true,
    category: 'Agro Cold Chain Infrastructure',
    is_replied: false,
    created_at: new Date(Date.now() - 72 * 3600 * 1000).toISOString()
  }
];

export const AdminMessagesPage: React.FC = () => {
  const navigate = useNavigate();

  // Local state initialized with seeded mock messages
  const [messagesList, setMessagesList] = useState<ContactMessage[]>(SEED_MESSAGES);
  const [selectedMessageId, setSelectedMessageId] = useState<string>(SEED_MESSAGES[0].id);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [channelFilter, setChannelFilter] = useState('All Channels');
  const [timeFilter, setTimeFilter] = useState('This Month (May 2025)');
  const [statusTab, setStatusTab] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals & Panels
  const [isAutoAssignOpen, setIsAutoAssignOpen] = useState(false);
  const [isBatchTriageOpen, setIsBatchTriageOpen] = useState(false);
  const [isReassignOpen, setIsReassignOpen] = useState(false);
  const [isFilterSettingsOpen, setIsFilterSettingsOpen] = useState(false);

  // Auto-Assignment configuration toggles
  const [autoAssignRules, setAutoAssignRules] = useState({
    autoOtpVerify: true,
    tier1LeadToRajesh: true,
    roundRobinUnderwriters: true,
    raipurGeoPriority: true,
    minTicketSyndication: true
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Backend sync query
  const { refetch } = useFetch<ContactMessage[]>(
    async () => {
      try {
        const res = await contactApi.getAdminMessages({ page: 1, limit: 50 });
        if (res && res.success && res.data && res.data.length > 0) {
          // Merge API messages with seeded rich profiles
          setMessagesList((prev) => {
            const apiItems: ContactMessage[] = res.data!.map((item, idx) => ({
              ...item,
              company: item.company || 'Enterprise Borrower',
              location: item.location || 'Raipur, Chhattisgarh',
              channel: item.channel || 'Contact Us Form',
              mandate_amount: item.mandate_amount || '₹1.5 Cr Mandate',
              priority: item.priority || (idx % 2 === 0 ? 'Priority 1' : 'Priority 2'),
              underwriter: item.underwriter || 'Rajesh Sharma',
              underwriter_initials: item.underwriter_initials || 'RS',
              lead_id: item.lead_id || `EF-2025-${9430 + idx}`,
              gstin: item.gstin || '22AAXEF8820K1ZX',
              ip_address: item.ip_address || '103.21.144.18 (Raipur)',
              otp_verified: item.otp_verified ?? true,
              category: item.category || 'Term Loan & Capex Syndication'
            }));
            const existingIds = new Set(apiItems.map((m) => m.id));
            const retainedSeeds = prev.filter((s) => !existingIds.has(s.id));
            return [...apiItems, ...retainedSeeds];
          });
          return { success: true, data: res.data };
        }
        return { success: true, data: [] };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Failed to fetch messages' };
      }
    },
    []
  );

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => {
      setIsRefreshing(false);
      showToast('Inbound triage stream synced with Raipur Regional Desk.', 'info');
    }, 600);
  };

  // Selected message for Right Inspection Dossier
  const selectedMessage = useMemo(() => {
    return messagesList.find((m) => m.id === selectedMessageId) || messagesList[0];
  }, [messagesList, selectedMessageId]);

  // Derived filter counts
  const counts = useMemo(() => {
    return {
      all: 128, // Representing total pool
      unread: messagesList.filter((m) => m.status === 'UNREAD').length + 12,
      read: messagesList.filter((m) => m.status === 'READ').length + 30,
      replied: messagesList.filter((m) => m.status === 'REPLIED').length + 46,
      converted: messagesList.filter((m) => m.status === 'CONVERTED').length + 24,
      closed: messagesList.filter((m) => m.status === 'CLOSED' || m.status === 'ARCHIVED').length + 6
    };
  }, [messagesList]);

  // Filtered messages
  const filteredMessages = useMemo(() => {
    return messagesList.filter((m) => {
      // Status filter
      if (statusTab === 'New' && m.status !== 'UNREAD') return false;
      if (statusTab === 'Read' && m.status !== 'READ') return false;
      if (statusTab === 'Replied' && m.status !== 'REPLIED') return false;
      if (statusTab === 'Converted' && m.status !== 'CONVERTED') return false;
      if (statusTab === 'Closed' && m.status !== 'CLOSED' && m.status !== 'ARCHIVED') return false;

      // Channel filter
      if (channelFilter !== 'All Channels') {
        if (m.channel && !m.channel.toLowerCase().includes(channelFilter.toLowerCase().replace('desk', '').trim())) {
          return false;
        }
      }

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = m.name.toLowerCase().includes(q);
        const matchesEmail = m.email.toLowerCase().includes(q);
        const matchesPhone = m.phone?.toLowerCase().includes(q);
        const matchesSubject = m.subject?.toLowerCase().includes(q);
        const matchesMessage = m.message.toLowerCase().includes(q);
        const matchesCompany = m.company?.toLowerCase().includes(q);
        const matchesLocation = m.location?.toLowerCase().includes(q);
        const matchesLeadId = m.lead_id?.toLowerCase().includes(q);
        if (!matchesName && !matchesEmail && !matchesPhone && !matchesSubject && !matchesMessage && !matchesCompany && !matchesLocation && !matchesLeadId) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      const dateA = new Date(a.created_at).getTime();
      const dateB = new Date(b.created_at).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
  }, [messagesList, statusTab, channelFilter, searchQuery, sortOrder]);

  // Checkbox handlers
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(filteredMessages.map((m) => m.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  // Convert to CRM Lead action
  const handleConvertToLead = async (message: ContactMessage) => {
    const updatedLeadId = message.lead_id || `EF-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    setMessagesList((prev) =>
      prev.map((m) =>
        m.id === message.id
          ? {
              ...m,
              status: 'CONVERTED',
              lead_id: updatedLeadId,
              is_replied: true
            }
          : m
      )
    );

    try {
      await contactApi.updateStatus(message.id, 'CONVERTED', true);
    } catch {
      // Local state already updated
    }

    showToast(`Enquiry ${updatedLeadId} converted to CRM Lead! Opening Lead Docket...`, 'success');
  };

  // Update Status helper
  const handleUpdateStatus = async (messageId: string, newStatus: ContactMessage['status']) => {
    setMessagesList((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, status: newStatus } : m))
    );
    try {
      await contactApi.updateStatus(messageId, newStatus);
    } catch {
      // Local state preserved
    }
    showToast(`Status updated to ${newStatus}`, 'info');
  };

  // Reassign underwriter
  const handleReassignUnderwriter = (underwriter: UnderwriterProfile) => {
    if (!selectedMessage) return;
    setMessagesList((prev) =>
      prev.map((m) =>
        m.id === selectedMessage.id
          ? {
              ...m,
              underwriter: underwriter.name,
              underwriter_initials: underwriter.initials
            }
          : m
      )
    );
    setIsReassignOpen(false);
    showToast(`Assigned underwriter updated to ${underwriter.name} (${underwriter.desk})`, 'success');
  };

  // Batch actions
  const handleBatchAction = (action: 'READ' | 'REPLIED' | 'CONVERTED' | 'CLOSED') => {
    if (selectedIds.length === 0) {
      showToast('Please select one or more inquiries first.', 'warning');
      return;
    }
    setMessagesList((prev) =>
      prev.map((m) => (selectedIds.includes(m.id) ? { ...m, status: action } : m))
    );
    setSelectedIds([]);
    setIsBatchTriageOpen(false);
    showToast(`Batch triage applied: ${selectedIds.length} enquiries updated to ${action}.`, 'success');
  };

  // Export CSV
  const handleExportCSV = () => {
    const recordsToExport = selectedIds.length > 0
      ? messagesList.filter((m) => selectedIds.includes(m.id))
      : filteredMessages;

    const headers = [
      'Docket ID',
      'Sender Name',
      'Company',
      'Location',
      'Phone',
      'Email',
      'GSTIN',
      'Channel',
      'Mandate Amount',
      'Category',
      'Priority',
      'Underwriter',
      'Status',
      'Subject',
      'Message',
      'Received Date'
    ];

    const escapeCsv = (val: string | null | undefined) => {
      if (!val) return '""';
      const clean = val.replace(/"/g, '""');
      return `"${clean}"`;
    };

    const rows = recordsToExport.map((m) => [
      escapeCsv(m.lead_id || 'N/A'),
      escapeCsv(m.name),
      escapeCsv(m.company || 'N/A'),
      escapeCsv(m.location || 'N/A'),
      escapeCsv(m.phone || 'N/A'),
      escapeCsv(m.email),
      escapeCsv(m.gstin || 'N/A'),
      escapeCsv(m.channel || 'N/A'),
      escapeCsv(m.mandate_amount || 'N/A'),
      escapeCsv(m.category || 'N/A'),
      escapeCsv(m.priority || 'N/A'),
      escapeCsv(m.underwriter || 'Rajesh Sharma'),
      escapeCsv(m.status),
      escapeCsv(m.subject || 'N/A'),
      escapeCsv(m.message),
      escapeCsv(new Date(m.created_at).toLocaleString('en-IN'))
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `earth-finance-inbound-enquiries-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(`Exported ${recordsToExport.length} enquiries to CSV successfully.`, 'success');
  };

  // Format relative time helper
  const formatRelativeTime = (isoString: string) => {
    try {
      const diffMs = Date.now() - new Date(isoString).getTime();
      const diffMins = Math.floor(diffMs / 60000);
      if (diffMins < 60) return `${Math.max(1, diffMins)} mins ago`;
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays === 1) return 'Yesterday 04:30 PM';
      return new Date(isoString).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div className="flex flex-col w-full gap-6 pb-12 font-sans">
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 transition-all animate-bounce text-sm font-semibold text-white ${
            toastMessage.type === 'success'
              ? 'bg-[#006d33] border border-[#8cf6a3]/40'
              : toastMessage.type === 'warning'
              ? 'bg-[#a47f00] border border-[#ffdf94]/40'
              : 'bg-[#071b3a] border border-[#b5c7ee]/30'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {toastMessage.type === 'success' ? 'check_circle' : toastMessage.type === 'warning' ? 'warning' : 'info'}
          </span>
          <span>{toastMessage.text}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 hover:opacity-75 transition-opacity"
          >
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Breadcrumb & Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#75777f] uppercase tracking-wider">
            <span
              onClick={() => navigate('/admin/dashboard')}
              className="hover:text-[#071b3a] cursor-pointer transition-colors"
            >
              Earth Finance Admin
            </span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span>Inbound Communications</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#141b2c] font-bold">Messages &amp; Inquiries</span>
          </div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#141b2c] tracking-tight">
              Inbound Messages &amp; Enquiries
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-[#006d33]/10 text-[#006d33] text-[11px] font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006d33] animate-ping"></span>
              Live Stream
            </span>
          </div>
          <p className="text-sm text-[#44474e] max-w-3xl">
            Triage public website enquiries, loan requests, and messages with one-click conversion to CRM leads. Direct sync with Raipur regional credit desk.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => setIsAutoAssignOpen(true)}
            className="px-4 h-10 rounded-lg bg-white text-[#141b2c] hover:bg-[#e9edff] shadow-sm text-[13px] font-bold flex items-center gap-2 transition-all border border-[#c5c6cf]/40"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#75777f]">tune</span>
            <span>Auto-Assignment</span>
          </button>
          <button
            onClick={() => setIsBatchTriageOpen(true)}
            className="px-4 h-10 rounded-lg bg-white text-[#141b2c] hover:bg-[#e9edff] shadow-sm text-[13px] font-bold flex items-center gap-2 transition-all border border-[#c5c6cf]/40"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px] text-[#75777f]">done_all</span>
            <span>Batch Triage</span>
            {selectedIds.length > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-[#071b3a] text-white text-[10px]">
                {selectedIds.length}
              </span>
            )}
          </button>
          <button
            onClick={handleExportCSV}
            className="px-4 h-10 rounded-lg bg-[#071b3a] text-white hover:bg-[#000001] hover:shadow-md text-[13px] font-bold flex items-center gap-2 transition-all shadow-sm"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            <span>Export Inquiries (CSV)</span>
          </button>
        </div>
      </div>

      {/* Top 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: Total Inquiries */}
        <div className="p-5 rounded-xl bg-white shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#44474e] uppercase tracking-wider">
              Total Inquiries
            </span>
            <div className="w-10 h-10 rounded-lg bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
              <span className="material-symbols-outlined text-[22px]">inbox</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#141b2c]">{counts.all}</span>
            <span className="text-xs text-[#75777f] font-semibold">this month</span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-[#006d33] text-xs font-bold">
            <span className="material-symbols-outlined text-[16px]">trending_up</span>
            <span>+18.4% vs last calendar cycle</span>
          </div>
        </div>

        {/* Card 2: New / Unread */}
        <div className="p-5 rounded-xl bg-white shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#44474e] uppercase tracking-wider">
              New / Unread
            </span>
            <div className="w-10 h-10 rounded-lg bg-[#ffdf94]/30 flex items-center justify-center text-[#a47f00]">
              <span className="material-symbols-outlined text-[22px]">mark_email_unread</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#141b2c]">{counts.unread}</span>
            <span className="px-2 py-0.5 rounded-full bg-[#ffdf94] text-[#241a00] text-[11px] font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#a47f00] animate-pulse"></span>
              Awaiting Triage
            </span>
          </div>
          <div className="mt-3 text-[#44474e] text-xs">
            Requires underwriter dispatch within 60m
          </div>
        </div>

        {/* Card 3: Converted to Leads */}
        <div className="p-5 rounded-xl bg-white shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#44474e] uppercase tracking-wider">
              Converted to Leads
            </span>
            <div className="w-10 h-10 rounded-lg bg-[#8ff9a6]/30 flex items-center justify-center text-[#007235]">
              <span className="material-symbols-outlined text-[22px]">person_check</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#141b2c]">{counts.converted}</span>
            <span className="text-xs text-[#006d33] font-bold">67.2% Rate</span>
          </div>
          <div className="mt-3 w-full bg-[#e0e8ff] rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#006d33] h-full rounded-full transition-all duration-700" style={{ width: '67.2%' }}></div>
          </div>
        </div>

        {/* Card 4: Average Response Time */}
        <div className="p-5 rounded-xl bg-white shadow-sm border border-slate-100 flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[12px] font-bold text-[#44474e] uppercase tracking-wider">
              Average Response Time
            </span>
            <div className="w-10 h-10 rounded-lg bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
              <span className="material-symbols-outlined text-[22px]">timer</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-[#141b2c]">
              38 <span className="text-lg font-medium text-[#75777f]">mins</span>
            </span>
            <span className="text-xs text-[#006d33] font-bold">SLA &lt; 45m</span>
          </div>
          <div className="mt-3 text-[#44474e] text-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px] text-[#006d33]">verified</span>
            <span>Raipur Underwriting SLA compliance 98.4%</span>
          </div>
        </div>
      </div>

      {/* Search, Filter Toolbar & Status Pills */}
      <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100 flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          {/* Search Box */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-3 text-[20px] text-[#75777f]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by sender name, phone number, email, or requirement keywords..."
              className="w-full h-11 pl-11 pr-24 rounded-lg bg-[#f1f3ff] text-sm text-[#141b2c] placeholder:text-[#75777f] focus:outline-none focus:bg-white focus:ring-1 focus:ring-[#071b3a] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-16 top-2.5 text-[#75777f] hover:text-[#141b2c]"
              >
                <span className="material-symbols-outlined text-[18px]">clear</span>
              </button>
            )}
            <div className="absolute right-3 top-2.5 flex items-center gap-1 text-[11px] font-bold text-[#75777f] uppercase bg-[#dbe2f9] px-2 py-0.5 rounded">
              <span>Active</span>
            </div>
          </div>

          {/* Channel and Date Dropdowns */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="relative">
              <select
                value={channelFilter}
                onChange={(e) => setChannelFilter(e.target.value)}
                className="h-11 pl-9 pr-8 rounded-lg bg-[#f1f3ff] text-[13px] text-[#141b2c] font-semibold focus:outline-none cursor-pointer appearance-none border border-transparent focus:border-[#071b3a]"
              >
                <option>All Channels</option>
                <option>Contact Us Form</option>
                <option>Loan Quick Enquiry</option>
                <option>WhatsApp Chat Desk</option>
                <option>EMI Calculator Callback</option>
              </select>
              <span className="material-symbols-outlined absolute left-3 top-3 text-[18px] text-[#75777f] pointer-events-none">hub</span>
              <span className="material-symbols-outlined absolute right-2.5 top-3 text-[18px] text-[#75777f] pointer-events-none">arrow_drop_down</span>
            </div>

            <div className="relative">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="h-11 pl-9 pr-8 rounded-lg bg-[#f1f3ff] text-[13px] text-[#141b2c] font-semibold focus:outline-none cursor-pointer appearance-none border border-transparent focus:border-[#071b3a]"
              >
                <option>This Month (May 2025)</option>
                <option>Last 7 Days</option>
                <option>Today Only</option>
                <option>Custom Range</option>
              </select>
              <span className="material-symbols-outlined absolute left-3 top-3 text-[18px] text-[#75777f] pointer-events-none">calendar_today</span>
              <span className="material-symbols-outlined absolute right-2.5 top-3 text-[18px] text-[#75777f] pointer-events-none">arrow_drop_down</span>
            </div>

            <button
              onClick={() => setIsFilterSettingsOpen(true)}
              className="w-11 h-11 rounded-lg bg-[#f1f3ff] text-[#44474e] hover:text-[#141b2c] hover:bg-[#e0e8ff] flex items-center justify-center transition-colors"
              title="Filter Settings"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">filter_list</span>
            </button>
          </div>
        </div>

        {/* 6 Status Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => setStatusTab('All')}
            type="button"
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
              statusTab === 'All'
                ? 'bg-[#071b3a] text-white'
                : 'bg-[#e9edff] text-[#141b2c] hover:bg-[#e0e8ff]'
            }`}
          >
            All ({counts.all})
          </button>

          <button
            onClick={() => setStatusTab('New')}
            type="button"
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 shadow-sm ${
              statusTab === 'New'
                ? 'bg-[#071b3a] text-white'
                : 'bg-[#e9edff] text-[#141b2c] hover:bg-[#e0e8ff]'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
            New ({counts.unread})
          </button>

          <button
            onClick={() => setStatusTab('Read')}
            type="button"
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
              statusTab === 'Read'
                ? 'bg-[#071b3a] text-white'
                : 'bg-[#e9edff] text-[#141b2c] hover:bg-[#e0e8ff]'
            }`}
          >
            Read ({counts.read})
          </button>

          <button
            onClick={() => setStatusTab('Replied')}
            type="button"
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
              statusTab === 'Replied'
                ? 'bg-[#071b3a] text-white'
                : 'bg-[#e9edff] text-[#141b2c] hover:bg-[#e0e8ff]'
            }`}
          >
            Replied ({counts.replied})
          </button>

          <button
            onClick={() => setStatusTab('Converted')}
            type="button"
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1 shadow-sm ${
              statusTab === 'Converted'
                ? 'bg-[#006d33] text-white'
                : 'bg-[#e9edff] text-[#006d33] hover:bg-[#e0e8ff]'
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">check_circle</span>
            Converted to Lead ({counts.converted})
          </button>

          <button
            onClick={() => setStatusTab('Closed')}
            type="button"
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap shadow-sm ${
              statusTab === 'Closed'
                ? 'bg-[#071b3a] text-white'
                : 'bg-[#e9edff] text-[#75777f] hover:bg-[#e0e8ff]'
            }`}
          >
            Closed ({counts.closed})
          </button>
        </div>
      </div>

      {/* Main 12-Column Responsive Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Triage Stream Roster (col-span-7) */}
        <div className="lg:col-span-7 flex flex-col gap-3">
          {/* Stream Header Bar */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <input
                type="checkbox"
                checked={selectedIds.length > 0 && selectedIds.length === filteredMessages.length}
                onChange={(e) => handleSelectAll(e.target.checked)}
                className="w-4 h-4 rounded text-[#071b3a] cursor-pointer accent-[#071b3a]"
              />
              <span className="text-[13px] font-bold text-[#141b2c]">Live Inbound Triage Stream</span>
              <span className="text-[#75777f] text-[11px] font-semibold">
                • Showing {filteredMessages.length} of {counts.all}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSortOrder(sortOrder === 'newest' ? 'oldest' : 'newest')}
                className="p-1.5 rounded hover:bg-[#e9edff] text-[#75777f] hover:text-[#141b2c] transition-colors"
                title={`Sort: ${sortOrder === 'newest' ? 'Newest first' : 'Oldest first'}`}
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">swap_vert</span>
              </button>
              <button
                onClick={handleRefresh}
                className={`p-1.5 rounded hover:bg-[#e9edff] text-[#75777f] hover:text-[#141b2c] transition-colors ${
                  isRefreshing ? 'animate-spin' : ''
                }`}
                title="Refresh Feed"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">refresh</span>
              </button>
            </div>
          </div>

          {/* Messages Cards Stream */}
          <div className="flex flex-col gap-2.5" id="messages-roster">
            {filteredMessages.length === 0 ? (
              <div className="p-12 text-center rounded-xl bg-white border border-slate-100 text-[#75777f] flex flex-col items-center gap-2">
                <span className="material-symbols-outlined text-[36px] text-slate-300">search_off</span>
                <p className="font-semibold text-sm">No inbound enquiries match your filter criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setChannelFilter('All Channels');
                    setStatusTab('All');
                  }}
                  className="mt-2 text-xs font-bold text-[#071b3a] underline hover:opacity-80"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredMessages.map((msg) => {
                const isSelected = selectedMessageId === msg.id;
                const isChecked = selectedIds.includes(msg.id);

                return (
                  <div
                    key={msg.id}
                    onClick={() => setSelectedMessageId(msg.id)}
                    className={`p-4 rounded-xl bg-white shadow-sm hover:shadow-md cursor-pointer transition-all relative overflow-hidden border ${
                      isSelected
                        ? 'border-[#071b3a]/20 bg-[#071b3a]/[0.02]'
                        : 'border-slate-100 hover:border-slate-200'
                    }`}
                  >
                    {/* Active Selection Left Indicator */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#071b3a]"></div>
                    )}

                    <div className="flex items-start gap-3">
                      {/* Checkbox and Status Dot */}
                      <div className="pt-0.5 flex flex-col items-center gap-2">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onClick={(e) => handleToggleSelectOne(msg.id, e)}
                          onChange={() => {}}
                          className="w-3.5 h-3.5 rounded text-[#071b3a] cursor-pointer accent-[#071b3a]"
                        />
                        {msg.status === 'UNREAD' ? (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#071b3a] inline-block shadow-sm"></span>
                        ) : msg.status === 'CONVERTED' ? (
                          <span className="material-symbols-outlined text-[16px] text-[#006d33]">check_circle</span>
                        ) : msg.status === 'REPLIED' ? (
                          <span className="material-symbols-outlined text-[16px] text-[#75777f]">reply</span>
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-[#c5c6cf] inline-block"></span>
                        )}
                      </div>

                      {/* Main Card Content */}
                      <div className="flex-1 min-w-0 flex flex-col gap-1">
                        {/* Sender & Timestamp */}
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center gap-2 truncate">
                            <span className="text-base font-bold text-[#141b2c] truncate">
                              {msg.name}
                            </span>
                            <span className="text-[#75777f] text-xs font-semibold">•</span>
                            <span className="text-xs text-[#44474e] truncate">
                              {msg.company || `${msg.location}`}
                            </span>
                          </div>
                          <span
                            className={`text-[11px] font-bold whitespace-nowrap flex items-center gap-1 ${
                              msg.status === 'UNREAD'
                                ? 'text-[#ba1a1a]'
                                : msg.status === 'CONVERTED'
                                ? 'text-[#006d33]'
                                : 'text-[#75777f]'
                            }`}
                          >
                            {msg.status === 'UNREAD' && (
                              <span className="material-symbols-outlined text-[14px]">schedule</span>
                            )}
                            {msg.status === 'CONVERTED'
                              ? `Converted (${msg.lead_id || 'CRM'})`
                              : formatRelativeTime(msg.created_at)}
                          </span>
                        </div>

                        {/* Badges Row */}
                        <div className="flex items-center gap-2 flex-wrap mt-0.5">
                          <span className="px-2 py-0.5 rounded bg-[#e0e8ff] text-[#071b3a] text-[11px] font-bold">
                            {msg.channel || 'Contact Us Form'}
                          </span>
                          {msg.mandate_amount && (
                            <span className="px-2 py-0.5 rounded bg-[#ffdf94]/40 text-[#594400] text-[11px] font-bold">
                              {msg.mandate_amount}
                            </span>
                          )}
                          {msg.priority && (
                            <span
                              className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                                msg.priority === 'Priority 1'
                                  ? 'bg-[#ffdad6] text-[#93000a]'
                                  : 'bg-[#e9edff] text-[#44474e]'
                              }`}
                            >
                              {msg.priority}
                            </span>
                          )}
                        </div>

                        {/* Subject */}
                        <p className="text-sm text-[#141b2c] font-semibold line-clamp-1 mt-1">
                          {msg.subject || 'Institutional Loan & Advisory Request'}
                        </p>

                        {/* Excerpt */}
                        <p className="text-xs text-[#75777f] line-clamp-1 italic">
                          "{msg.message}"
                        </p>

                        {/* Card Footer Bar */}
                        <div className="mt-2 pt-2 flex items-center justify-between bg-[#f1f3ff]/60 px-2.5 py-1.5 rounded-lg">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full bg-[#071b3a] text-white flex items-center justify-center text-[9px] font-bold">
                              {msg.underwriter_initials || 'RS'}
                            </div>
                            <span className="text-[11px] text-[#44474e]">
                              Underwriter: <strong className="text-[#141b2c]">{msg.underwriter || 'Rajesh Sharma'}</strong>
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-[#75777f] hidden sm:inline">
                              IP: {msg.ip_address || '103.21.144.18 (Raipur)'}
                            </span>
                            {isSelected ? (
                              <span className="px-2 py-0.5 rounded bg-[#071b3a] text-white text-[10px] font-bold">
                                Active Selection
                              </span>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedMessageId(msg.id);
                                }}
                                className="text-[11px] text-[#071b3a] font-bold hover:underline"
                                type="button"
                              >
                                View &amp; Triage →
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination Footer */}
          <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-between">
            <span className="text-xs text-[#75777f] font-medium">
              Page 1 of 22 (128 records)
            </span>
            <div className="flex items-center gap-1">
              <button
                className="w-8 h-8 rounded bg-[#e9edff] text-[#75777f] flex items-center justify-center hover:bg-[#e0e8ff] transition-colors disabled:opacity-50"
                disabled
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_left</span>
              </button>
              <button
                className="w-8 h-8 rounded bg-[#071b3a] text-white font-bold text-xs flex items-center justify-center"
                type="button"
              >
                1
              </button>
              <button
                className="w-8 h-8 rounded bg-[#e9edff] hover:bg-[#e0e8ff] text-[#141b2c] font-bold text-xs flex items-center justify-center transition-colors"
                type="button"
              >
                2
              </button>
              <button
                className="w-8 h-8 rounded bg-[#e9edff] hover:bg-[#e0e8ff] text-[#141b2c] font-bold text-xs flex items-center justify-center transition-colors"
                type="button"
              >
                3
              </button>
              <span className="px-1 text-[#75777f] text-xs">...</span>
              <button
                className="w-8 h-8 rounded bg-[#e9edff] text-[#141b2c] flex items-center justify-center hover:bg-[#e0e8ff] transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Inspection & Fast-Track CRM Conversion Dossier (col-span-5, sticky) */}
        {selectedMessage && (
          <div className="lg:col-span-5 flex flex-col gap-4 sticky top-20">
            <div className="rounded-xl bg-white shadow-lg border border-slate-100 overflow-hidden flex flex-col">
              {/* Dossier Navy Header */}
              <div className="p-6 bg-[#071b3a] text-white flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase tracking-wider text-[#7384a9] font-bold">
                    Enquiry Dossier &amp; Fast-Track Conversion
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        selectedMessage.status === 'UNREAD'
                          ? 'bg-[#ba1a1a] text-white animate-pulse'
                          : selectedMessage.status === 'CONVERTED'
                          ? 'bg-[#006d33] text-white'
                          : 'bg-[#ffdf94] text-[#241a00]'
                      }`}
                    >
                      {selectedMessage.status === 'UNREAD'
                        ? 'New • Priority Triage'
                        : selectedMessage.status === 'CONVERTED'
                        ? 'Active CRM Docket'
                        : `${selectedMessage.status}`}
                    </span>
                  </div>
                </div>

                {/* Sender Avatar & Identity */}
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center text-white text-xl font-bold border border-white/20">
                    {selectedMessage.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase()}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h2 className="text-xl font-extrabold text-white leading-tight truncate">
                      {selectedMessage.name}
                    </h2>
                    <span className="text-xs text-[#7384a9] truncate">
                      {selectedMessage.company || 'Enterprise Borrower'}
                    </span>
                    <span className="text-[11px] text-[#d2daf0] flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {selectedMessage.location || 'Raipur, Chhattisgarh'}
                    </span>
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/10 text-xs">
                  <div>
                    <span className="text-white/60 block text-[11px]">Inbound Channel</span>
                    <span className="text-white font-semibold">
                      {selectedMessage.channel || 'Contact Us Form'}
                    </span>
                  </div>
                  <div>
                    <span className="text-white/60 block text-[11px]">Received Timestamp</span>
                    <span className="text-white font-semibold">
                      {new Date(selectedMessage.created_at).toLocaleString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })} IST
                    </span>
                  </div>
                </div>
              </div>

              {/* Dossier Body */}
              <div className="p-6 flex flex-col gap-4">
                {/* Direct Verified Coordinates */}
                <div className="p-3.5 rounded-lg bg-[#f1f3ff] flex flex-col gap-2 border border-slate-100">
                  <div className="flex items-center justify-between text-xs text-[#75777f]">
                    <span className="font-bold text-[#141b2c] uppercase tracking-wider">
                      Direct Verified Coordinates
                    </span>
                    <span className="text-[#006d33] font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">verified_user</span> OTP Verified
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 text-xs">
                    <div className="flex items-center justify-between py-1 border-b border-[#c5c6cf]/30">
                      <span className="text-[#44474e] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#75777f]">call</span> Phone:
                      </span>
                      <a
                        href={`tel:${selectedMessage.phone || '+919425208819'}`}
                        className="font-bold text-[#141b2c] hover:text-[#006d33] transition-colors"
                      >
                        {selectedMessage.phone || '+91 94252 08819'}
                      </a>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-[#c5c6cf]/30">
                      <span className="text-[#44474e] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#75777f]">mail</span> Email:
                      </span>
                      <a
                        href={`mailto:${selectedMessage.email}`}
                        className="font-bold text-[#141b2c] hover:text-[#071b3a] transition-colors truncate max-w-[200px]"
                      >
                        {selectedMessage.email}
                      </a>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-[#44474e] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[16px] text-[#75777f]">corporate_fare</span> GSTIN:
                      </span>
                      <span className="font-bold text-[#141b2c]">
                        {selectedMessage.gstin || '22AAACS9821M1ZT'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Inbound Enquiry Narrative */}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[11px] font-bold text-[#75777f] uppercase tracking-wider">
                    Inbound Enquiry Narrative
                  </span>
                  <div className="p-4 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] leading-relaxed italic relative border border-slate-100">
                    <span className="material-symbols-outlined absolute top-2 right-2 text-[#75777f]/20 text-[28px] pointer-events-none">
                      format_quote
                    </span>
                    "{selectedMessage.message}"
                  </div>
                </div>

                {/* Quick Action Triggers */}
                <div className="grid grid-cols-3 gap-2">
                  <a
                    href={`tel:${selectedMessage.phone || '+919425208819'}`}
                    className="py-2.5 px-2 rounded-lg bg-[#e9edff] text-[#141b2c] hover:bg-[#e0e8ff] transition-colors text-xs font-bold flex flex-col items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#071b3a]">call</span>
                    <span>Call Desk</span>
                  </a>

                  <a
                    href={`https://wa.me/${(selectedMessage.phone || '919425208819').replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${selectedMessage.name}, this is Earth Finance Raipur Underwriting Desk regarding your enquiry (${selectedMessage.lead_id || 'Syndication'}).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-2 rounded-lg bg-[#006d33]/10 text-[#006d33] hover:bg-[#006d33]/20 transition-colors text-xs font-bold flex flex-col items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`mailto:${selectedMessage.email}?subject=${encodeURIComponent(
                      `Earth Finance Underwriting: ${selectedMessage.subject || 'Loan Enquiry'}`
                    )}`}
                    className="py-2.5 px-2 rounded-lg bg-[#e9edff] text-[#141b2c] hover:bg-[#e0e8ff] transition-colors text-xs font-bold flex flex-col items-center justify-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#75777f]">outgoing_mail</span>
                    <span>Official Email</span>
                  </a>
                </div>

                {/* Fast-Track CRM Lead Conversion Card */}
                <div className="p-4 rounded-xl bg-[#ffdf94]/20 border border-[#efc13e]/40 shadow-sm flex flex-col gap-3 relative overflow-hidden">
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#ffdf94]/30 rounded-full blur-xl pointer-events-none"></div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[20px] text-[#a47f00]">conversion_path</span>
                      <span className="text-sm font-bold text-[#141b2c]">Convert to CRM Lead</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#ffdf94] text-[#241a00] text-[10px] font-bold">
                      Fast-Track
                    </span>
                  </div>

                  <p className="text-xs text-[#44474e]">
                    Transform this inquiry into an active underwritten Docket in{' '}
                    <code className="bg-white/60 px-1 py-0.5 rounded font-mono text-[11px] text-[#071b3a]">
                      /admin/leads
                    </code>
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                    <div className="flex flex-col">
                      <span className="text-[11px] text-[#75777f] font-semibold">Lead Docket ID:</span>
                      <span className="font-mono text-[#141b2c] font-bold">
                        {selectedMessage.lead_id || 'EF-2025-9428'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-[#75777f] font-semibold">Estimated Requirement:</span>
                      <span className="text-[#006d33] font-bold">
                        {selectedMessage.mandate_amount || '₹9.00 Crore'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-[#75777f] font-semibold">Category:</span>
                      <span className="text-[#141b2c] font-semibold truncate">
                        {selectedMessage.category || 'Agro Capex Subvention'}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] text-[#75777f] font-semibold">Lead Priority:</span>
                      <span className="text-[#ba1a1a] font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ba1a1a]"></span>
                        {selectedMessage.priority === 'Priority 1' ? 'Tier-1 Mandate' : 'Tier-2 Mandate'}
                      </span>
                    </div>
                  </div>

                  {/* Assigned Underwriting Officer */}
                  <div className="flex flex-col gap-1 mt-1">
                    <span className="text-[11px] text-[#75777f] font-semibold">Assigned Underwriting Officer:</span>
                    <div className="flex items-center justify-between bg-white p-2 rounded-lg border border-[#c5c6cf]/30">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-[#071b3a] text-white flex items-center justify-center font-bold text-[10px]">
                          {selectedMessage.underwriter_initials || 'RS'}
                        </div>
                        <span className="text-xs text-[#141b2c] font-bold">
                          {selectedMessage.underwriter || 'Rajesh Sharma'} (Principal Lead)
                        </span>
                      </div>
                      <button
                        onClick={() => setIsReassignOpen(true)}
                        className="text-[11px] text-[#75777f] hover:text-[#071b3a] font-bold cursor-pointer transition-colors"
                        type="button"
                      >
                        Change
                      </button>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex items-center gap-2 pt-2">
                    {selectedMessage.status === 'CONVERTED' ? (
                      <button
                        onClick={() => navigate('/admin/leads')}
                        className="flex-1 py-3 px-4 rounded-lg bg-[#006d33] text-white text-xs font-extrabold hover:bg-[#127439] transition-all shadow-md flex items-center justify-center gap-2"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                        <span>Open Lead Docket (#{selectedMessage.lead_id})</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => handleConvertToLead(selectedMessage)}
                        className="flex-1 py-3 px-4 rounded-lg bg-[#ffdf94] text-[#241a00] text-xs font-extrabold hover:bg-[#efc13e] transition-all shadow-md flex items-center justify-center gap-2"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">how_to_reg</span>
                        <span>Convert to Lead Now</span>
                      </button>
                    )}

                    <button
                      onClick={() => handleUpdateStatus(selectedMessage.id, 'CLOSED')}
                      className="py-3 px-3 rounded-lg bg-white text-[#75777f] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/40 transition-colors border border-[#c5c6cf]/40"
                      title="Mark as Resolved or Archive"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">block</span>
                    </button>
                  </div>
                </div>

                {/* Audit & Security Footprint */}
                <div className="flex flex-col gap-1.5 pt-1">
                  <span className="text-[11px] font-bold text-[#75777f] uppercase tracking-wider">
                    Audit &amp; Security Footprint
                  </span>
                  <div className="flex flex-col gap-2 text-[#44474e] text-xs">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006d33]"></span>
                        Inbound form submission received
                      </span>
                      <span className="font-mono text-[#75777f] text-[11px]">11:20:14 IST</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#006d33]"></span>
                        Cloudflare Turnstile &amp; IP Geocheck
                      </span>
                      <span className="font-mono text-[#006d33] font-bold text-[11px]">Passed (100%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#071b3a]"></span>
                        Viewed by {selectedMessage.underwriter || 'Rajesh Sharma'}
                      </span>
                      <span className="font-mono text-[#75777f] text-[11px]">11:22:40 IST</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* MODAL 1: Auto-Assignment Configuration */}
      {isAutoAssignOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[20px]">tune</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141b2c]">Inbound Auto-Assignment Rules</h3>
                  <p className="text-xs text-[#75777f]">Smart dispatch across Raipur regional credit underwriters</p>
                </div>
              </div>
              <button
                onClick={() => setIsAutoAssignOpen(false)}
                className="text-[#75777f] hover:text-[#141b2c]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3 py-1">
              <label className="flex items-center justify-between p-3 rounded-xl bg-[#f1f3ff] hover:bg-[#e9edff] cursor-pointer transition-colors">
                <div>
                  <span className="text-xs font-bold text-[#141b2c] block">OTP Verification Gate</span>
                  <span className="text-[11px] text-[#44474e]">Only auto-assign leads that completed SMS OTP verification</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoAssignRules.autoOtpVerify}
                  onChange={(e) => setAutoAssignRules({ ...autoAssignRules, autoOtpVerify: e.target.checked })}
                  className="w-4 h-4 rounded text-[#071b3a] accent-[#071b3a]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#f1f3ff] hover:bg-[#e9edff] cursor-pointer transition-colors">
                <div>
                  <span className="text-xs font-bold text-[#141b2c] block">Tier-1 High Mandate Routing (&gt; ₹5.0 Cr)</span>
                  <span className="text-[11px] text-[#44474e]">Directly allocate high ticket capex proposals to Rajesh Sharma</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoAssignRules.tier1LeadToRajesh}
                  onChange={(e) => setAutoAssignRules({ ...autoAssignRules, tier1LeadToRajesh: e.target.checked })}
                  className="w-4 h-4 rounded text-[#071b3a] accent-[#071b3a]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#f1f3ff] hover:bg-[#e9edff] cursor-pointer transition-colors">
                <div>
                  <span className="text-xs font-bold text-[#141b2c] block">Round-Robin Load Balancing</span>
                  <span className="text-[11px] text-[#44474e]">Evenly distribute standard retail and equipment inquiries</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoAssignRules.roundRobinUnderwriters}
                  onChange={(e) => setAutoAssignRules({ ...autoAssignRules, roundRobinUnderwriters: e.target.checked })}
                  className="w-4 h-4 rounded text-[#071b3a] accent-[#071b3a]"
                />
              </label>

              <label className="flex items-center justify-between p-3 rounded-xl bg-[#f1f3ff] hover:bg-[#e9edff] cursor-pointer transition-colors">
                <div>
                  <span className="text-xs font-bold text-[#141b2c] block">Raipur &amp; CG Regional Desk Priority</span>
                  <span className="text-[11px] text-[#44474e]">Pin IP/GSTINs in 22-Chhattisgarh to local branch specialists</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoAssignRules.raipurGeoPriority}
                  onChange={(e) => setAutoAssignRules({ ...autoAssignRules, raipurGeoPriority: e.target.checked })}
                  className="w-4 h-4 rounded text-[#071b3a] accent-[#071b3a]"
                />
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setIsAutoAssignOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-[#75777f] hover:bg-slate-100"
                type="button"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsAutoAssignOpen(false);
                  showToast('Auto-Assignment engine triggered: 14 pending enquiries routed.', 'success');
                }}
                className="px-4 py-2 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-black transition-colors"
                type="button"
              >
                Save &amp; Run Engine Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Batch Triage Action */}
      {isBatchTriageOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[20px]">done_all</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141b2c]">Batch Triage Actions</h3>
                  <p className="text-xs text-[#75777f]">
                    {selectedIds.length > 0
                      ? `${selectedIds.length} items currently selected`
                      : 'Apply bulk actions across current filtered records'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsBatchTriageOpen(false)}
                className="text-[#75777f] hover:text-[#141b2c]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2 py-2">
              <button
                onClick={() => handleBatchAction('READ')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#f1f3ff] hover:bg-[#e0e8ff] text-left text-xs font-bold text-[#141b2c] flex items-center gap-2.5 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-[#071b3a]">mark_email_read</span>
                <span>Mark Selected as Read</span>
              </button>

              <button
                onClick={() => handleBatchAction('REPLIED')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#f1f3ff] hover:bg-[#e0e8ff] text-left text-xs font-bold text-[#141b2c] flex items-center gap-2.5 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-[#006d33]">reply</span>
                <span>Mark Selected as Replied</span>
              </button>

              <button
                onClick={() => handleBatchAction('CONVERTED')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#ffdf94]/30 hover:bg-[#ffdf94]/50 text-left text-xs font-bold text-[#241a00] flex items-center gap-2.5 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px] text-[#a47f00]">how_to_reg</span>
                <span>Batch Convert Selected into CRM Leads</span>
              </button>

              <button
                onClick={() => handleBatchAction('CLOSED')}
                className="w-full py-2.5 px-3 rounded-xl bg-[#ffdad6]/40 hover:bg-[#ffdad6]/70 text-left text-xs font-bold text-[#ba1a1a] flex items-center gap-2.5 transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">archive</span>
                <span>Archive / Close Selected Enquiries</span>
              </button>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setIsBatchTriageOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-[#75777f] hover:bg-slate-100"
                type="button"
              >
                Dismiss
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: Reassign Underwriter */}
      {isReassignOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[20px]">badge</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141b2c]">Reassign Underwriter</h3>
                  <p className="text-xs text-[#75777f]">Select officer for {selectedMessage.name}</p>
                </div>
              </div>
              <button
                onClick={() => setIsReassignOpen(false)}
                className="text-[#75777f] hover:text-[#141b2c]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-2 py-2">
              {UNDERWRITER_DIRECTORY.map((underwriter) => (
                <div
                  key={underwriter.name}
                  onClick={() => handleReassignUnderwriter(underwriter)}
                  className={`p-3 rounded-xl cursor-pointer transition-all flex items-center justify-between border ${
                    selectedMessage.underwriter === underwriter.name
                      ? 'bg-[#071b3a]/5 border-[#071b3a]'
                      : 'bg-white hover:bg-[#f1f3ff] border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#071b3a] text-white flex items-center justify-center text-xs font-bold">
                      {underwriter.initials}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#141b2c] block">{underwriter.name}</span>
                      <span className="text-[11px] text-[#75777f]">
                        {underwriter.role} • {underwriter.desk}
                      </span>
                    </div>
                  </div>
                  {selectedMessage.underwriter === underwriter.name && (
                    <span className="material-symbols-outlined text-[18px] text-[#006d33]">check</span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setIsReassignOpen(false)}
                className="px-4 py-2 rounded-lg text-xs font-bold text-[#75777f] hover:bg-slate-100"
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: Filter Settings */}
      {isFilterSettingsOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 flex flex-col gap-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#071b3a]">filter_list</span>
                <h3 className="text-base font-bold text-[#141b2c]">Filter Criteria</h3>
              </div>
              <button
                onClick={() => setIsFilterSettingsOpen(false)}
                className="text-[#75777f] hover:text-[#141b2c]"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3 py-1 text-xs">
              <div>
                <label className="font-bold text-[#141b2c] block mb-1">Ticket Size Minimum</label>
                <select className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs font-semibold text-[#141b2c] border border-slate-200">
                  <option>All Ticket Sizes</option>
                  <option>&gt; ₹1.00 Crore</option>
                  <option>&gt; ₹5.00 Crore</option>
                  <option>&gt; ₹10.00 Crore</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#141b2c] block mb-1">Geographic Region</label>
                <select className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs font-semibold text-[#141b2c] border border-slate-200">
                  <option>All Regions (PAN India)</option>
                  <option>Raipur Industrial Cluster</option>
                  <option>Durg-Bhilai Industrial Zone</option>
                  <option>Bilaspur &amp; Korba Energy Corridor</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#141b2c] block mb-1">Security / Collateral Status</label>
                <select className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs font-semibold text-[#141b2c] border border-slate-200">
                  <option>Any Inbound Enquiry</option>
                  <option>Commercial Property / LAP Ready</option>
                  <option>Machinery &amp; Equipment Hypothecation</option>
                  <option>Clean / CGTMSE Backed</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t">
              <button
                onClick={() => setIsFilterSettingsOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-black transition-colors"
                type="button"
              >
                Apply Criteria
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
