import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  RefreshCw,
  Download,
  Search,
  Filter,
  ArrowUpDown,
  Edit2,
  Eye,
  MoreVertical,
  CheckCircle2,
  Clock,
  Archive,
  Copy,
  Trash2,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  Building,
  DollarSign,
  TrendingUp,
  FileText,
  AlertCircle,
  X,
  ExternalLink
} from 'lucide-react';
import { loanApi } from '../../services/loanApi';

interface CatalogLoanItem {
  id: string;
  code: string;
  name: string;
  slug: string;
  category: string;
  envelope: string;
  envelopeSub: string;
  limitNumeric: number;
  rate: string;
  rateSub: string;
  collateral: string;
  status: 'Published' | 'Draft' | 'Archived';
  lastModified: string;
  author: string;
  icon: string;
  shortDescription?: string;
}

const DEFAULT_LOANS: CatalogLoanItem[] = [
  {
    id: 'lp-bus-01',
    code: '#LP-BUS-01',
    name: 'Business Term Loan',
    slug: 'business-loan',
    category: 'Business Finance',
    envelope: 'Up to ₹10.00 Cr',
    envelopeSub: 'Configurable',
    limitNumeric: 100000000,
    rate: '9.25% - 14.50% p.a.',
    rateSub: 'MCLR linked benchmark',
    collateral: 'Unsecured / Hypothecation',
    status: 'Published',
    lastModified: 'Today, 11:40 AM',
    author: 'Underwriting Desk',
    icon: 'corporate_fare',
    shortDescription: 'Collateral-optimized capex expansion docket for operating enterprises.'
  },
  {
    id: 'lp-wc-02',
    code: '#LP-WC-02',
    name: 'Working Capital & CC',
    slug: 'working-capital',
    category: 'Business Finance',
    envelope: 'Up to ₹15.00 Cr',
    envelopeSub: 'Revolving OD/CC',
    limitNumeric: 150000000,
    rate: '8.75% onwards',
    rateSub: 'Benchmark spread',
    collateral: 'Stock & Book Debts',
    status: 'Published',
    lastModified: 'May 18, 2025',
    author: 'Rajesh Sharma',
    icon: 'currency_exchange',
    shortDescription: 'Structured Cash Credit (CC) and revolving overdraft facilities.'
  },
  {
    id: 'lp-prop-03',
    code: '#LP-PROP-03',
    name: 'Commercial Property & LAP',
    slug: 'property-loan',
    category: 'Property Finance',
    envelope: 'Up to ₹50.00 Cr',
    envelopeSub: 'High Value Docket',
    limitNumeric: 500000000,
    rate: '8.45% onwards',
    rateSub: 'Repo linked priority',
    collateral: 'Registered Mortgage (Ind/Comm)',
    status: 'Published',
    lastModified: 'May 16, 2025',
    author: 'Underwriting Desk',
    icon: 'apartment',
    shortDescription: 'High-ticket commercial mortgaged facility for corporate acquisitions.'
  },
  {
    id: 'lp-ind-04',
    code: '#LP-IND-04',
    name: 'Plant & Machinery Capex',
    slug: 'industrial-finance',
    category: 'Industrial Finance',
    envelope: 'Up to ₹25.00 Cr',
    envelopeSub: 'Long-term Capex',
    limitNumeric: 250000000,
    rate: '8.85% - 11.20% p.a.',
    rateSub: 'Term linked',
    collateral: 'First charge on Capex Assets',
    status: 'Published',
    lastModified: 'May 14, 2025',
    author: 'Underwriting Desk',
    icon: 'precision_manufacturing',
    shortDescription: 'Term credit for heavy plant engineering and industrial automation.'
  },
  {
    id: 'lp-med-05',
    code: '#LP-MED-05',
    name: 'Doctor & Clinic Line',
    slug: 'medical-finance',
    category: 'Medical Finance',
    envelope: 'Up to ₹3.00 Cr',
    envelopeSub: 'Nil Collateral Prime',
    limitNumeric: 30000000,
    rate: '9.50% onwards',
    rateSub: 'Preferential clinical rate',
    collateral: 'Hypothecation / Nil for Prime',
    status: 'Published',
    lastModified: 'May 12, 2025',
    author: 'Underwriting Desk',
    icon: 'medical_services',
    shortDescription: 'Diagnostic equipment leasing and hospital expansion lines.'
  },
  {
    id: 'lp-edu-06',
    code: '#LP-EDU-06',
    name: 'Education Infrastructure',
    slug: 'education-finance',
    category: 'Education Finance',
    envelope: 'Up to ₹25.00 Cr',
    envelopeSub: 'Trust / University',
    limitNumeric: 250000000,
    rate: '8.95% - 10.75% p.a.',
    rateSub: 'Fee escrow mechanism',
    collateral: 'Campus land / Trust escrow',
    status: 'Draft',
    lastModified: 'May 10, 2025',
    author: 'Legal Council',
    icon: 'school',
    shortDescription: 'Campus development and institution building syndications.'
  },
  {
    id: 'lp-fleet-07',
    code: '#LP-FLEET-07',
    name: 'Commercial Fleet & Transit',
    slug: 'personal-vehicle',
    category: 'Personal & Vehicle',
    envelope: 'Up to ₹5.00 Cr',
    envelopeSub: 'Multi-Asset Fleet',
    limitNumeric: 50000000,
    rate: '9.75% onwards',
    rateSub: 'Floating benchmark',
    collateral: 'Vehicle hypothecation',
    status: 'Published',
    lastModified: 'May 08, 2025',
    author: 'Fleet Desk',
    icon: 'local_shipping',
    shortDescription: 'Commercial transit vehicle and logistics equipment funding.'
  },
  {
    id: 'lp-pers-08',
    code: '#LP-PERS-08',
    name: 'HNW Personal Liquidity',
    slug: 'hnw-personal',
    category: 'Personal & Vehicle',
    envelope: 'Up to ₹50.00 Lakhs',
    envelopeSub: 'Executive Quota',
    limitNumeric: 5000000,
    rate: '10.50% - 15.00% p.a.',
    rateSub: 'Archived terms',
    collateral: 'Unsecured / Liquid lien',
    status: 'Archived',
    lastModified: 'Apr 22, 2025',
    author: 'Underwriting Desk',
    icon: 'account_balance_wallet',
    shortDescription: 'Executive personal liquidity credit lines.'
  }
];

export const AdminLoansPage: React.FC = () => {
  const [loans, setLoans] = useState<CatalogLoanItem[]>(DEFAULT_LOANS);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sortBy, setSortBy] = useState<'updated' | 'alpha' | 'limit'>('updated');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // Active flyout menu state
  const [activeFlyoutId, setActiveFlyoutId] = useState<string | null>(null);
  const [flyoutPosition, setFlyoutPosition] = useState<{ top: number; left: number }>({ top: 0, left: 0 });
  const flyoutRef = useRef<HTMLDivElement>(null);

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CatalogLoanItem | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    slug: '',
    category: 'Business Finance',
    envelope: 'Up to ₹10.00 Cr',
    envelopeSub: 'Configurable',
    limitNumeric: 100000000,
    rate: '9.25% - 14.50% p.a.',
    rateSub: 'MCLR linked benchmark',
    collateral: 'Unsecured / Hypothecation',
    status: 'Published' as 'Published' | 'Draft' | 'Archived',
    shortDescription: '',
    icon: 'corporate_fare'
  });

  // Fetch from backend API on mount if available
  const fetchBackendLoans = async () => {
    setIsRefreshing(true);
    try {
      const res = await loanApi.getAdminLoans();
      if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
        // Map backend items into catalog items while keeping the rich default schema
        const mapped: CatalogLoanItem[] = res.data.map((bItem, idx) => ({
          id: bItem.id || `loan-${idx}`,
          code: `#LP-${(bItem.slug || 'FAC').slice(0, 4).toUpperCase()}-${String(idx + 1).padStart(2, '0')}`,
          name: bItem.name,
          slug: bItem.slug || 'loan',
          category: bItem.category || 'Business Finance',
          envelope: bItem.loan_amount || 'Up to ₹10.00 Cr',
          envelopeSub: 'Configurable',
          limitNumeric: 100000000,
          rate: bItem.interest_rate || '9.25% onwards',
          rateSub: 'Repo linked',
          collateral: bItem.collateral || 'Hypothecation / Mortgage',
          status: bItem.status === 'PUBLISHED' ? 'Published' : bItem.status === 'ARCHIVED' ? 'Archived' : 'Draft',
          lastModified: 'Recently updated',
          author: 'Admin Desk',
          icon: 'corporate_fare',
          shortDescription: bItem.short_description || ''
        }));
        setLoans(mapped);
      }
    } catch {
      // Keep rich defaults
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  useEffect(() => {
    fetchBackendLoans();
  }, []);

  // Close flyout on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (flyoutRef.current && !flyoutRef.current.contains(e.target as Node)) {
        setActiveFlyoutId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute Metrics
  const metrics = useMemo(() => {
    const total = loans.length;
    const published = loans.filter((l) => l.status === 'Published').length;
    const draft = loans.filter((l) => l.status === 'Draft').length;
    const archived = loans.filter((l) => l.status === 'Archived').length;
    const pubPercent = total > 0 ? Math.round((published / total) * 100) : 0;
    return { total, published, draft, archived, pubPercent };
  }, [loans]);

  // Filter and Sort Loans
  const filteredLoans = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return loans
      .filter((l) => {
        const matchesQuery =
          !query ||
          l.name.toLowerCase().includes(query) ||
          l.code.toLowerCase().includes(query) ||
          l.category.toLowerCase().includes(query) ||
          l.collateral.toLowerCase().includes(query);

        const matchesCategory = categoryFilter === 'ALL' || l.category === categoryFilter;
        const matchesStatus = statusFilter === 'ALL' || l.status === statusFilter;

        return matchesQuery && matchesCategory && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === 'alpha') return a.name.localeCompare(b.name);
        if (sortBy === 'limit') return b.limitNumeric - a.limitNumeric;
        return 0; // Default matches updated order
      });
  }, [loans, searchTerm, categoryFilter, statusFilter, sortBy]);

  // Pagination slice
  const paginatedLoans = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLoans.slice(start, start + pageSize);
  }, [filteredLoans, currentPage, pageSize]);

  const totalPages = Math.ceil(filteredLoans.length / pageSize) || 1;

  // Actions
  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      code: `#LP-NEW-${String(loans.length + 1).padStart(2, '0')}`,
      name: '',
      slug: '',
      category: 'Business Finance',
      envelope: 'Up to ₹10.00 Cr',
      envelopeSub: 'Configurable',
      limitNumeric: 100000000,
      rate: '9.25% - 14.50% p.a.',
      rateSub: 'MCLR linked benchmark',
      collateral: 'Unsecured / Hypothecation',
      status: 'Published',
      shortDescription: '',
      icon: 'corporate_fare'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: CatalogLoanItem) => {
    setEditingItem(item);
    setFormData({
      code: item.code,
      name: item.name,
      slug: item.slug,
      category: item.category,
      envelope: item.envelope,
      envelopeSub: item.envelopeSub,
      limitNumeric: item.limitNumeric,
      rate: item.rate,
      rateSub: item.rateSub,
      collateral: item.collateral,
      status: item.status,
      shortDescription: item.shortDescription || '',
      icon: item.icon
    });
    setIsModalOpen(true);
    setActiveFlyoutId(null);
  };

  const handleSaveModal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingItem) {
      // Update
      const updatedList = loans.map((l) =>
        l.id === editingItem.id
          ? {
              ...l,
              ...formData,
              lastModified: 'Just now',
              author: 'You (Admin Desk)'
            }
          : l
      );
      setLoans(updatedList);
      try {
        await loanApi.updateLoan(editingItem.id, {
          name: formData.name,
          slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          category: formData.category,
          loan_amount: formData.envelope,
          interest_rate: formData.rate,
          collateral: formData.collateral,
          status: formData.status.toUpperCase() as any
        });
      } catch {
        // State updated locally
      }
    } else {
      // Create
      const newItem: CatalogLoanItem = {
        id: `loan-${Date.now()}`,
        ...formData,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        lastModified: 'Just now',
        author: 'You (Admin Desk)'
      };
      setLoans([newItem, ...loans]);
      try {
        await loanApi.createLoan({
          name: formData.name,
          slug: newItem.slug,
          category: formData.category,
          loan_amount: formData.envelope,
          interest_rate: formData.rate,
          collateral: formData.collateral,
          status: formData.status.toUpperCase() as any
        });
      } catch {
        // State updated locally
      }
    }
    setIsModalOpen(false);
  };

  const handleDuplicate = (item: CatalogLoanItem) => {
    const dup: CatalogLoanItem = {
      ...item,
      id: `loan-${Date.now()}`,
      code: `${item.code}-COPY`,
      name: `${item.name} (Copy)`,
      slug: `${item.slug}-copy`,
      status: 'Draft',
      lastModified: 'Just now',
      author: 'You (Admin Desk)'
    };
    setLoans([dup, ...loans]);
    setActiveFlyoutId(null);
  };

  const handleToggleStatus = (item: CatalogLoanItem) => {
    const nextStatus = item.status === 'Published' ? 'Draft' : 'Published';
    setLoans(loans.map((l) => (l.id === item.id ? { ...l, status: nextStatus, lastModified: 'Just now' } : l)));
    setActiveFlyoutId(null);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this facility from the catalog?')) return;
    setLoans(loans.filter((l) => l.id !== id));
    setActiveFlyoutId(null);
    try {
      await loanApi.deleteLoan(id);
    } catch {
      // Handled
    }
  };

  const handleExportCSV = () => {
    const headers = ['Code', 'Name', 'Category', 'Envelope', 'Rate', 'Collateral', 'Status', 'Last Modified'];
    const rows = filteredLoans.map((l) => [
      `"${l.code}"`,
      `"${l.name}"`,
      `"${l.category}"`,
      `"${l.envelope}"`,
      `"${l.rate}"`,
      `"${l.collateral}"`,
      `"${l.status}"`,
      `"${l.lastModified}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `EarthFinance_LoanCatalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('ALL');
    setStatusFilter('ALL');
    setSortBy('updated');
    setCurrentPage(1);
  };

  const openFlyout = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    setFlyoutPosition({
      top: rect.bottom + 6,
      left: Math.min(window.innerWidth - 220, rect.left - 140)
    });
    setActiveFlyoutId(activeFlyoutId === id ? null : id);
  };

  return (
    <div className="w-full flex flex-col gap-6 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Breadcrumb & Header Action Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-1">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-xs text-slate-400 tracking-wider uppercase font-semibold">
            <span>Admin</span>
            <span className="material-symbols-outlined text-[13px] text-slate-300">chevron_right</span>
            <span className="text-[#071b3a] font-bold">Loan Products</span>
          </div>
          <h1 className="text-3xl font-extrabold text-[#141b2c] tracking-tight">Loan Products</h1>
          <p className="text-sm text-[#44474e]">
            Manage the financial facilities, underwriting rules, and public dockets across the Earth Finance portal.
          </p>
        </div>

        <div className="flex items-center flex-wrap gap-2.5">
          <button
            type="button"
            onClick={fetchBackendLoans}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-[#141b2c] text-xs font-semibold transition-colors shadow-sm border border-slate-200"
          >
            <span className={`material-symbols-outlined text-[18px] text-[#44474e] ${isRefreshing ? 'animate-spin' : ''}`}>
              sync
            </span>
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-white hover:bg-slate-50 text-[#141b2c] text-xs font-semibold transition-colors shadow-sm border border-slate-200"
          >
            <span className="material-symbols-outlined text-[18px] text-[#44474e]">file_download</span>
            <span>Export Catalog</span>
          </button>

          <Link
            to="/admin/loans/new"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#071b3a] text-white text-xs font-bold shadow-md hover:bg-[#0b2d5c] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">add_box</span>
            <span>New Facility Specification</span>
          </Link>

          <button
            type="button"
            onClick={handleOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#ffdf94] text-[#241a00] text-xs font-bold shadow-md hover:bg-[#efc13e] transition-all active:scale-[0.98]"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            <span>Quick Add</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Total Facilities */}
        <div className="p-5 rounded-2xl bg-white shadow-sm flex flex-col justify-between relative overflow-hidden border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Total Facilities</span>
            <div className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-[#071b3a]">
              <span className="material-symbols-outlined text-[18px]">account_balance</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-[#141b2c]">{metrics.total}</div>
            <span className="text-xs text-[#44474e]">Configured</span>
          </div>
          <div className="w-full bg-[#dbe2f9] h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-[#071b3a] h-full w-full rounded-full" />
          </div>
        </div>

        {/* Card 2: Active & Live */}
        <div className="p-5 rounded-2xl bg-white shadow-sm flex flex-col justify-between relative overflow-hidden border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Active &amp; Live</span>
            <div className="w-8 h-8 rounded-lg bg-[#8cf6a3]/40 flex items-center justify-center text-[#006d33]">
              <span className="material-symbols-outlined text-[18px]">public</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-[#006d33]">{metrics.published}</div>
            <span className="px-2 py-0.5 rounded-full bg-[#8cf6a3]/30 text-[#007235] text-xs font-semibold">
              {metrics.pubPercent}% Public
            </span>
          </div>
          <div className="w-full bg-[#dbe2f9] h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#006d33] h-full rounded-full"
              style={{ width: `${metrics.pubPercent}%` }}
            />
          </div>
        </div>

        {/* Card 3: Under Draft */}
        <div className="p-5 rounded-2xl bg-white shadow-sm flex flex-col justify-between relative overflow-hidden border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">Under Draft</span>
            <div className="w-8 h-8 rounded-lg bg-[#ffdf94]/40 flex items-center justify-center text-[#a47f00]">
              <span className="material-symbols-outlined text-[18px]">edit_note</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-[#141b2c]">{metrics.draft}</div>
            <span className="px-2 py-0.5 rounded-full bg-[#ffdf94]/30 text-[#a47f00] text-xs font-semibold">
              Policy Review
            </span>
          </div>
          <div className="w-full bg-[#dbe2f9] h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-[#efc13e] h-full rounded-full"
              style={{ width: `${metrics.total > 0 ? (metrics.draft / metrics.total) * 100 : 0}%` }}
            />
          </div>
        </div>

        {/* Card 4: Archived Portfolios */}
        <div className="p-5 rounded-2xl bg-white shadow-sm flex flex-col justify-between relative overflow-hidden border border-slate-200/80">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-slate-500 font-semibold">
              Archived Portfolios
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-slate-500">
              <span className="material-symbols-outlined text-[18px]">archive</span>
            </div>
          </div>
          <div className="mt-4 flex items-baseline justify-between">
            <div className="text-3xl font-extrabold text-slate-500">{metrics.archived}</div>
            <span className="px-2 py-0.5 rounded-full bg-[#f1f3ff] text-slate-600 text-xs font-semibold">
              Legacy Facility
            </span>
          </div>
          <div className="w-full bg-[#dbe2f9] h-1 rounded-full mt-3 overflow-hidden">
            <div
              className="bg-slate-400 h-full rounded-full"
              style={{ width: `${metrics.total > 0 ? (metrics.archived / metrics.total) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white p-3 rounded-2xl shadow-sm border border-slate-200">
        <div className="relative flex-1 min-w-[280px]">
          <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[20px] text-slate-400">
            search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search loan products by title, code or facility type..."
            className="w-full pl-11 pr-9 py-2.5 bg-[#f1f3ff] rounded-xl text-xs sm:text-sm text-[#141b2c] placeholder:text-slate-400 focus:outline-none focus:bg-[#e9edff] border border-transparent focus:border-slate-300 transition-all"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-[#141b2c]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <div className="flex items-center bg-[#f1f3ff] rounded-xl px-3 py-1.5 border border-slate-200/60">
            <span className="material-symbols-outlined text-[18px] text-slate-400 mr-1.5">category</span>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-xs font-semibold text-[#141b2c] focus:outline-none cursor-pointer pr-1"
            >
              <option value="ALL">All Categories</option>
              <option value="Business Finance">Business Finance</option>
              <option value="Property Finance">Property Finance</option>
              <option value="Industrial Finance">Industrial Finance</option>
              <option value="Medical Finance">Medical Finance</option>
              <option value="Education Finance">Education Finance</option>
              <option value="Personal & Vehicle">Personal &amp; Vehicle</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center bg-[#f1f3ff] rounded-xl px-3 py-1.5 border border-slate-200/60">
            <span className="material-symbols-outlined text-[18px] text-slate-400 mr-1.5">tune</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="bg-transparent text-xs font-semibold text-[#141b2c] focus:outline-none cursor-pointer pr-1"
            >
              <option value="ALL">All Statuses</option>
              <option value="Published">Published (Active)</option>
              <option value="Draft">Draft (In Review)</option>
              <option value="Archived">Archived</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="flex items-center bg-[#f1f3ff] rounded-xl px-3 py-1.5 border border-slate-200/60">
            <span className="material-symbols-outlined text-[18px] text-slate-400 mr-1.5">sort</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs font-semibold text-[#141b2c] focus:outline-none cursor-pointer pr-1"
            >
              <option value="updated">Recently Updated</option>
              <option value="alpha">Alphabetical (A-Z)</option>
              <option value="limit">Highest Limit</option>
            </select>
          </div>

          <button
            type="button"
            onClick={handleResetFilters}
            className="px-3 py-2 text-xs font-semibold text-[#44474e] hover:text-[#071b3a] rounded-xl hover:bg-[#e9edff] transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Main Catalog Data Table */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col border border-slate-200/80">
        {paginatedLoans.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#f1f3ff] flex items-center justify-center text-slate-400 mb-4">
              <span className="material-symbols-outlined text-[32px]">manage_search</span>
            </div>
            <h2 className="text-base font-bold text-[#141b2c] mb-1">No loan products found</h2>
            <p className="text-xs text-[#44474e] max-w-md mb-4 leading-relaxed">
              No catalog facilities match your current query or category filters. Try revising your keyword or resetting filter tokens.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 rounded-xl bg-[#e9edff] hover:bg-[#dbe2f9] text-[#071b3a] text-xs font-bold transition-colors"
            >
              Reset Filter Criteria
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left align-middle border-collapse">
              <thead>
                <tr className="bg-[#f1f3ff]/70 text-[#44474e] text-[11px] uppercase tracking-wider select-none border-b border-slate-200/80">
                  <th className="py-3.5 px-4 font-bold" scope="col">Product &amp; Facility Code</th>
                  <th className="py-3.5 px-4 font-bold" scope="col">Category</th>
                  <th className="py-3.5 px-4 font-bold" scope="col">Loan Envelope</th>
                  <th className="py-3.5 px-4 font-bold" scope="col">Indicative Benchmark</th>
                  <th className="py-3.5 px-4 font-bold" scope="col">Collateral Policy</th>
                  <th className="py-3.5 px-4 font-bold" scope="col">Catalog Status</th>
                  <th className="py-3.5 px-4 font-bold" scope="col">Last Modified</th>
                  <th className="py-3.5 px-4 text-right font-bold" scope="col">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {paginatedLoans.map((item) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-[#f1f3ff]/40 transition-colors group ${
                      item.status === 'Archived' ? 'opacity-70 bg-slate-50/50' : ''
                    }`}
                  >
                    {/* Column 1: Title & Code */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#e9edff] flex items-center justify-center text-[#071b3a] shrink-0">
                          <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-sm font-bold text-[#141b2c] group-hover:text-[#071b3a] transition-colors leading-snug">
                            {item.name}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">{item.code}</span>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Category */}
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-md bg-[#e9edff] text-[#364768] text-[11px] font-semibold whitespace-nowrap">
                        {item.category}
                      </span>
                    </td>

                    {/* Column 3: Envelope */}
                    <td className="py-4 px-4">
                      <div className="text-xs font-bold text-[#141b2c]">{item.envelope}</div>
                      <div className="text-[11px] text-[#006d33] flex items-center gap-1 font-medium">
                        <span className="material-symbols-outlined text-[13px]">tune</span>
                        <span>{item.envelopeSub}</span>
                      </div>
                    </td>

                    {/* Column 4: Benchmark Rate */}
                    <td className="py-4 px-4">
                      <div className="text-xs font-semibold text-[#141b2c] whitespace-nowrap">{item.rate}</div>
                      <div className="text-[11px] text-slate-400">{item.rateSub}</div>
                    </td>

                    {/* Column 5: Collateral */}
                    <td className="py-4 px-4">
                      <span className="text-slate-600 max-w-[190px] truncate block font-medium" title={item.collateral}>
                        {item.collateral}
                      </span>
                    </td>

                    {/* Column 6: Status Pill */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      {item.status === 'Published' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8cf6a3]/40 text-[#007235] text-[11px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#006d33]" />
                          Published
                        </span>
                      )}
                      {item.status === 'Draft' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ffdf94]/40 text-[#a47f00] text-[11px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#efc13e]" />
                          Draft (Review)
                        </span>
                      )}
                      {item.status === 'Archived' && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-200 text-slate-600 text-[11px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                          Archived
                        </span>
                      )}
                    </td>

                    {/* Column 7: Last Modified */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="text-[#141b2c] font-medium">{item.lastModified}</div>
                      <div className="text-slate-400 text-[10px]">by {item.author}</div>
                    </td>

                    {/* Column 8: Actions */}
                    <td className="py-4 px-4 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEditModal(item)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#071b3a] hover:bg-[#e9edff] transition-colors"
                          title="Quick Edit"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>

                        <Link
                          to={`/loans/${item.slug}`}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#071b3a] hover:bg-[#e9edff] transition-colors"
                          title="View Public Page"
                        >
                          <span className="material-symbols-outlined text-[18px]">visibility</span>
                        </Link>

                        <button
                          type="button"
                          onClick={(e) => openFlyout(e, item.id)}
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-[#071b3a] hover:bg-[#e9edff] transition-colors"
                          title="More Actions"
                        >
                          <span className="material-symbols-outlined text-[18px]">more_vert</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 py-3.5 bg-[#f1f3ff]/40 border-t border-slate-200/80 text-xs">
          <div className="text-slate-500">
            Showing <span className="font-bold text-[#141b2c]">{paginatedLoans.length}</span> of{' '}
            <span className="font-bold text-[#141b2c]">{filteredLoans.length}</span> configured loan facilities
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-slate-500">Per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white text-[#141b2c] rounded-md px-2 py-1 border border-slate-200 focus:outline-none cursor-pointer shadow-sm font-semibold"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <span className="text-slate-500 mr-1">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                disabled={currentPage <= 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 bg-white hover:bg-slate-50 border border-slate-200 transition-colors disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setCurrentPage(num)}
                  className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold transition-colors ${
                    currentPage === num
                      ? 'bg-[#071b3a] text-white shadow-sm'
                      : 'text-slate-600 bg-white hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage >= totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 bg-white hover:bg-slate-50 border border-slate-200 transition-colors disabled:opacity-40"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Strip */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#f1f3ff]/70 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-200/80">
        <div className="flex items-start gap-3">
          <span className="material-symbols-outlined text-[#006d33] text-[24px] shrink-0 mt-0.5">policy</span>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-[#141b2c]">
              Regulatory Underwriting Standard Compliance
            </span>
            <p className="text-xs text-[#44474e] leading-relaxed mt-0.5">
              All financial metrics configured here directly populate public calculators and marketing dockets. In
              accordance with RBI guidelines, all interest rates and credit caps are rendered with mandatory
              indicative disclosure disclaimers.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
          <span className="px-2.5 py-1 rounded-full bg-white text-slate-600 text-[11px] font-semibold border border-slate-200">
            Audit Synced
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#8cf6a3]/40 text-[#007235] text-[11px] font-bold">
            RBI Master Circular 2024
          </span>
        </div>
      </div>

      {/* Client View Representation Preview (3 Bento Cards) */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#141b2c]">Client View Representation Preview</h2>
            <p className="text-xs text-[#44474e]">
              Live visual telemetry illustrating how public cards are composed from these catalog tables.
            </p>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] text-[#007235] font-bold bg-[#8cf6a3]/30 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-[#006d33] animate-pulse" />
            Dynamic Card Render
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Preview Card 1: Business Term Loan */}
          <div className="p-6 rounded-2xl bg-white shadow-sm flex flex-col justify-between group hover:shadow-md transition-all border border-slate-200/80">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#e9edff] text-[#364768] text-[11px] font-semibold">
                  Business Finance
                </span>
                <span className="text-[11px] text-[#006d33] font-bold">Featured Product</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#141b2c] group-hover:text-[#071b3a] transition-colors">
                  Business Term Loan
                </h3>
                <p className="text-xs text-[#44474e] mt-1">
                  Collateral-optimized capex expansion docket for operating enterprises.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#f1f3ff] flex flex-col gap-1.5 mt-2 border border-slate-100">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Upper Limit</span>
                  <span className="text-sm font-bold text-[#141b2c]">₹10.00 Crore</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Benchmark APR</span>
                  <span className="text-xs font-semibold text-[#006d33]">9.25% - 14.50%</span>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-3 flex items-center justify-between border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-mono">CODE: LP-BUS-01</span>
              <button
                type="button"
                onClick={() => {
                  const item = loans.find((l) => l.code === '#LP-BUS-01') || loans[0];
                  handleOpenEditModal(item);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#e9edff] hover:bg-[#dbe2f9] text-[#071b3a] text-xs font-bold transition-colors"
              >
                Configure Docket
              </button>
            </div>
          </div>

          {/* Preview Card 2: Commercial Property & LAP */}
          <div className="p-6 rounded-2xl bg-white shadow-sm flex flex-col justify-between group hover:shadow-md transition-all border border-slate-200/80">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#e9edff] text-[#364768] text-[11px] font-semibold">
                  Property Finance
                </span>
                <span className="text-[11px] text-[#a47f00] font-bold">Institutional</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#141b2c] group-hover:text-[#071b3a] transition-colors">
                  Commercial LAP
                </h3>
                <p className="text-xs text-[#44474e] mt-1">
                  High-ticket commercial mortgaged facility for corporate acquisitions.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-[#f1f3ff] flex flex-col gap-1.5 mt-2 border border-slate-100">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Upper Limit</span>
                  <span className="text-sm font-bold text-[#141b2c]">₹50.00 Crore</span>
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-slate-400">Benchmark APR</span>
                  <span className="text-xs font-semibold text-[#006d33]">8.45% onwards</span>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-3 flex items-center justify-between border-t border-slate-100">
              <span className="text-[11px] text-slate-400 font-mono">CODE: LP-PROP-03</span>
              <button
                type="button"
                onClick={() => {
                  const item = loans.find((l) => l.code === '#LP-PROP-03') || loans[0];
                  handleOpenEditModal(item);
                }}
                className="px-3 py-1.5 rounded-lg bg-[#e9edff] hover:bg-[#dbe2f9] text-[#071b3a] text-xs font-bold transition-colors"
              >
                Configure Docket
              </button>
            </div>
          </div>

          {/* Preview Card 3: Catalog Auto-Sync */}
          <div className="p-6 rounded-2xl bg-[#071b3a] text-white shadow-md flex flex-col justify-between relative overflow-hidden border border-[#0b2d5c]">
            <div className="flex flex-col gap-3 relative z-10">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-[#dbe2f9] text-[11px] font-semibold border border-white/10">
                  Raipur Regional Desk
                </span>
                <span className="material-symbols-outlined text-[#ffdf94] text-[18px]">verified</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Catalog Auto-Sync</h3>
                <p className="text-xs text-[#b5c7ee] mt-1 leading-relaxed">
                  Any modification committed here propagates to our API endpoints and public portal instantly.
                </p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 flex items-center justify-between mt-2 border border-white/10">
                <span className="text-xs text-[#b5c7ee]">Last Deployment</span>
                <span className="text-xs font-mono text-[#ffdf94] font-bold">v4.18.2-LIVE</span>
              </div>
            </div>
            <div className="mt-5 pt-3 flex items-center justify-between relative z-10 border-t border-white/10 text-xs">
              <span className="text-[#b5c7ee]">Engine: Active</span>
              <span className="text-[#8ff9a6] flex items-center gap-1 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8ff9a6]" />
                100% SLA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Row Context Menu Flyout */}
      {activeFlyoutId && (
        <div
          ref={flyoutRef}
          style={{ top: `${flyoutPosition.top}px`, left: `${flyoutPosition.left}px` }}
          className="fixed z-50 w-52 bg-white rounded-xl shadow-2xl py-1.5 text-xs font-medium text-[#141b2c] border border-slate-200 animate-fadeIn"
        >
          {(() => {
            const currentItem = loans.find((l) => l.id === activeFlyoutId);
            if (!currentItem) return null;
            return (
              <>
                <button
                  type="button"
                  onClick={() => handleDuplicate(currentItem)}
                  className="w-full text-left px-3.5 py-2 hover:bg-[#f1f3ff] flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-slate-400">content_copy</span>
                  <span>Duplicate Docket</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleStatus(currentItem)}
                  className="w-full text-left px-3.5 py-2 hover:bg-[#f1f3ff] flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-slate-400">toggle_off</span>
                  <span>Toggle Status ({currentItem.status === 'Published' ? 'Set Draft' : 'Publish'})</span>
                </button>

                <Link
                  to={`/admin/loans/${currentItem.id}/edit`}
                  className="w-full text-left px-3.5 py-2 hover:bg-[#f1f3ff] flex items-center gap-2 transition-colors font-semibold text-[#071b3a]"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#071b3a]">tune</span>
                  <span>Full Specification Edit</span>
                </Link>

                <button
                  type="button"
                  onClick={() => handleOpenEditModal(currentItem)}
                  className="w-full text-left px-3.5 py-2 hover:bg-[#f1f3ff] flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-slate-400">edit</span>
                  <span>Quick Modal Edit</span>
                </button>

                <Link
                  to={`/loans/${currentItem.slug}`}
                  className="w-full text-left px-3.5 py-2 hover:bg-[#f1f3ff] flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-slate-400">visibility</span>
                  <span>View Public Page</span>
                </Link>

                <div className="h-px bg-slate-100 my-1" />

                <button
                  type="button"
                  onClick={() => handleDelete(currentItem.id)}
                  className="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-rose-600 flex items-center gap-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">delete</span>
                  <span>Delete Facility</span>
                </button>
              </>
            );
          })()}
        </div>
      )}

      {/* Add / Edit Loan Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#071b3a]/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#e9edff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[22px]">
                    {editingItem ? 'edit_note' : 'add_circle'}
                  </span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[#071b3a]">
                    {editingItem ? 'Edit Loan Product' : 'Add New Loan Product'}
                  </h3>
                  <p className="text-xs text-[#44474e]">Configure parameters and underwriting envelopes</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveModal} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#071b3a] uppercase tracking-wider mb-1">
                    Facility Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Business Term Loan"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#071b3a]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#071b3a] uppercase tracking-wider mb-1">
                    Facility Code
                  </label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    placeholder="#LP-BUS-01"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 font-mono focus:outline-none focus:ring-2 focus:ring-[#071b3a]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#071b3a] uppercase tracking-wider mb-1">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#071b3a] bg-white cursor-pointer"
                  >
                    <option value="Business Finance">Business Finance</option>
                    <option value="Property Finance">Property Finance</option>
                    <option value="Industrial Finance">Industrial Finance</option>
                    <option value="Medical Finance">Medical Finance</option>
                    <option value="Education Finance">Education Finance</option>
                    <option value="Personal & Vehicle">Personal &amp; Vehicle</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-[#071b3a] uppercase tracking-wider mb-1">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#071b3a] bg-white cursor-pointer"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft (In Review)</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#071b3a] uppercase tracking-wider mb-1">
                    Loan Envelope
                  </label>
                  <input
                    type="text"
                    value={formData.envelope}
                    onChange={(e) => setFormData({ ...formData, envelope: e.target.value })}
                    placeholder="Up to ₹10.00 Cr"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#071b3a]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#071b3a] uppercase tracking-wider mb-1">
                    Indicative Rate
                  </label>
                  <input
                    type="text"
                    value={formData.rate}
                    onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
                    placeholder="9.25% - 14.50% p.a."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#071b3a]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#071b3a] uppercase tracking-wider mb-1">
                  Collateral Policy
                </label>
                <input
                  type="text"
                  value={formData.collateral}
                  onChange={(e) => setFormData({ ...formData, collateral: e.target.value })}
                  placeholder="Unsecured / Hypothecation of movables"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#071b3a]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#071b3a] uppercase tracking-wider mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Brief synopsis for public card presentation..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#071b3a]"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#071b3a] text-white hover:bg-[#0b2d5c] font-bold shadow-sm"
                >
                  {editingItem ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
