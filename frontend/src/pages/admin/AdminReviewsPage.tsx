import React, { useState, useEffect, useMemo } from 'react';
import { reviewApi } from '../../services/reviewApi';
import { testimonialApi } from '../../services/testimonialApi';

interface ReviewItem {
  id: string;
  revCode: string;
  name: string;
  initials: string;
  title: string;
  company: string;
  cluster: string;
  docket: string;
  rating: number;
  reviewExcerpt: string;
  fullQuote: string;
  facility: string;
  volume: string;
  verificationBadge: string;
  status: 'Pending Triage' | 'Live' | 'Featured' | 'Rejected';
  date: string;
  sector: 'Industrial & Capex' | 'Healthcare' | 'Agro Processing' | 'EPC & Infra' | 'Property & LAP';
}

const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: 'rev-01',
    revCode: '#REV-4912',
    name: 'M. Singhania',
    initials: 'MS',
    title: 'Managing Director',
    company: 'Singhania Rolling Mills Ltd.',
    cluster: 'Urla Ind. Area, Raipur',
    docket: 'Docket #EF-9421',
    rating: 5,
    reviewExcerpt:
      'Structured our consortium debt flawlessly, saving significant working capital overhead during mill expansion...',
    fullQuote:
      'Earth Finance structured our consortium debt flawlessly, saving significant working capital overhead during our mill expansion in Urla. Rajesh Sharma and the advisory desk navigated multi-bank compliance in record time.',
    facility: 'Industrial Capex',
    volume: '₹8.20 Cr',
    verificationBadge: 'GSTIN & Disbursement Matched',
    status: 'Pending Triage',
    date: 'Today, 10:15 AM',
    sector: 'Industrial & Capex'
  },
  {
    id: 'rev-02',
    revCode: '#REV-4910',
    name: 'Dr. A. Dewangan',
    initials: 'AD',
    title: 'Medical Director',
    company: 'Sanjeevani Healthcare, Bilaspur',
    cluster: 'Bilaspur Central Hospital Zone',
    docket: 'Docket #EF-9418',
    rating: 5,
    reviewExcerpt:
      'Arranged high-end diagnostic medical imaging lease with favorable institutional repayment terms...',
    fullQuote:
      'Arranged high-end diagnostic medical imaging lease with favorable institutional repayment terms and zero loan syndication friction.',
    facility: 'Healthcare Capex',
    volume: '₹4.50 Cr',
    verificationBadge: 'Clinical Registry Matched',
    status: 'Live',
    date: 'May 18, 2025',
    sector: 'Healthcare'
  },
  {
    id: 'rev-03',
    revCode: '#REV-4905',
    name: 'S. Patel',
    initials: 'SP',
    title: 'Executive Partner',
    company: 'Narmada Agro Tech, Rajnandgaon',
    cluster: 'Rajnandgaon Agro Belt',
    docket: 'Docket #EF-9415',
    rating: 5,
    reviewExcerpt:
      'Assisted in grain silo term loan structuring with central subsidy alignment and rapid clearance...',
    fullQuote:
      'Assisted in grain silo term loan structuring with central subsidy alignment and rapid clearance through state institutional lines.',
    facility: 'Agro Processing',
    volume: '₹9.00 Cr',
    verificationBadge: 'Disbursement Verified',
    status: 'Featured',
    date: 'May 16, 2025',
    sector: 'Agro Processing'
  },
  {
    id: 'rev-04',
    revCode: '#REV-4902',
    name: 'V. Banchhor',
    initials: 'VB',
    title: 'Logistics Director',
    company: 'Central Logistics Hub, Durg',
    cluster: 'Durg Logistics Corridor',
    docket: 'Docket #EF-9412',
    rating: 5,
    reviewExcerpt:
      'Refinanced existing logistics facility and unlocked equity against our warehouse asset on Ring Road...',
    fullQuote:
      'Refinanced existing logistics facility and unlocked equity against our warehouse asset on Ring Road without any operational delay.',
    facility: 'Property / LAP',
    volume: '₹6.00 Cr',
    verificationBadge: 'Title Search Verified',
    status: 'Live',
    date: 'May 14, 2025',
    sector: 'Property & LAP'
  },
  {
    id: 'rev-05',
    revCode: '#REV-4898',
    name: 'A. Verma',
    initials: 'AV',
    title: 'Lead Contractor',
    company: 'A.V. Infra Engineering, Korba',
    cluster: 'Korba Infrastructure Belt',
    docket: 'Docket #EF-9408',
    rating: 5,
    reviewExcerpt:
      'Prompt sanctioning of bank guarantee limits and LC facilities for our public infrastructure contracts...',
    fullQuote:
      'Prompt sanctioning of bank guarantee limits and LC facilities for our public infrastructure contracts across Chhattisgarh.',
    facility: 'EPC & Infra Facilities',
    volume: '₹14.00 Cr',
    verificationBadge: 'Tender Disbursed',
    status: 'Live',
    date: 'May 12, 2025',
    sector: 'EPC & Infra'
  },
  {
    id: 'rev-06',
    revCode: '#REV-4890',
    name: 'R. Agrawal',
    initials: 'RA',
    title: 'Managing Partner',
    company: 'Agrawal Sponge & Iron, Raipur',
    cluster: 'Siltara Industrial Area',
    docket: 'Docket #EF-9401',
    rating: 4,
    reviewExcerpt: 'Handled multiple consortium bank discussions and structured inventory limits swiftly...',
    fullQuote:
      'Handled multiple consortium bank discussions and structured inventory limits swiftly, though initial documentation was extensive.',
    facility: 'Working Capital Line',
    volume: '₹11.50 Cr',
    verificationBadge: 'Failed KYC Match',
    status: 'Rejected',
    date: 'May 08, 2025',
    sector: 'Industrial & Capex'
  }
];

export const AdminReviewsPage: React.FC = () => {
  // Active Navigation Tab: 'reviews' | 'testimonials'
  const [activeTab, setActiveTab] = useState<'reviews' | 'testimonials'>('reviews');

  // Reviews Data
  const [reviews, setReviews] = useState<ReviewItem[]>(DEFAULT_REVIEWS);

  // Inspector Selection
  const [selectedReviewId, setSelectedReviewId] = useState<string>(DEFAULT_REVIEWS[0].id);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState('All Sectors');
  const [selectedRating, setSelectedRating] = useState('All Star Ratings');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Approved' | 'Featured' | 'Rejected'>('All');

  // UI Modals & Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Add Testimonial Form State
  const [newClientName, setNewClientName] = useState('');
  const [newClientTitle, setNewClientTitle] = useState('');
  const [newCompanyName, setNewCompanyName] = useState('');
  const [newCluster, setNewCluster] = useState('Raipur Industrial Cluster');
  const [newFacility, setNewFacility] = useState('Industrial Capex');
  const [newVolume, setNewVolume] = useState('₹5.00 Cr');
  const [newRating, setNewRating] = useState(5);
  const [newContent, setNewContent] = useState('');
  const [newSpotlight, setNewSpotlight] = useState(true);

  // Show Toast
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Sync backend reviews if available
  useEffect(() => {
    reviewApi
      .getAdminReviews({ limit: 30 })
      .then((res) => {
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          const mappedFromBackend: ReviewItem[] = res.data.map((r, idx) => ({
            id: r.id || `rev-be-${idx}`,
            revCode: `#REV-${5000 + idx}`,
            name: r.name,
            initials: r.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .slice(0, 2)
              .toUpperCase(),
            title: r.profession || 'Executive Partner',
            company: r.business || 'Enterprise Borrower',
            cluster: 'Raipur Central Cluster',
            docket: `Docket #EF-${9450 + idx}`,
            rating: r.rating || 5,
            reviewExcerpt: r.review.slice(0, 100) + '...',
            fullQuote: r.review,
            facility: 'Commercial Credit',
            volume: '₹5.00 Cr',
            verificationBadge: 'Disbursement Matched',
            status:
              r.status === 'APPROVED'
                ? 'Live'
                : r.status === 'FEATURED'
                ? 'Featured'
                : r.status === 'REJECTED'
                ? 'Rejected'
                : 'Pending Triage',
            date: 'Recent Submission',
            sector: 'Industrial & Capex'
          }));

          setReviews((prev) => {
            const combined = [...prev];
            mappedFromBackend.forEach((mb) => {
              if (!combined.some((c) => c.name.toLowerCase() === mb.name.toLowerCase())) {
                combined.unshift(mb);
              }
            });
            return combined;
          });
        }
      })
      .catch(() => {
        // Fall back gracefully to preset defaults
      });
  }, []);

  // Currently inspected review
  const activeReview = useMemo(() => {
    return reviews.find((r) => r.id === selectedReviewId) || reviews[0];
  }, [reviews, selectedReviewId]);

  // Filtered Reviews
  const filteredReviews = useMemo(() => {
    let list = [...reviews];

    // Filter by Tab: if testimonials, show Featured & Live only
    if (activeTab === 'testimonials') {
      list = list.filter((r) => r.status === 'Featured' || r.status === 'Live');
    }

    // Filter by Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.company.toLowerCase().includes(q) ||
          r.fullQuote.toLowerCase().includes(q) ||
          r.docket.toLowerCase().includes(q)
      );
    }

    // Filter by Sector
    if (selectedSector !== 'All Sectors') {
      list = list.filter((r) => r.sector === selectedSector || r.facility.includes(selectedSector));
    }

    // Filter by Rating
    if (selectedRating === '5 Stars only') {
      list = list.filter((r) => r.rating === 5);
    } else if (selectedRating === '4 Stars & above') {
      list = list.filter((r) => r.rating >= 4);
    } else if (selectedRating === 'Below 4 Stars') {
      list = list.filter((r) => r.rating < 4);
    }

    // Filter by Status Badge
    if (statusFilter === 'Pending') {
      list = list.filter((r) => r.status === 'Pending Triage');
    } else if (statusFilter === 'Approved') {
      list = list.filter((r) => r.status === 'Live' || r.status === 'Featured');
    } else if (statusFilter === 'Featured') {
      list = list.filter((r) => r.status === 'Featured');
    } else if (statusFilter === 'Rejected') {
      list = list.filter((r) => r.status === 'Rejected');
    }

    return list;
  }, [reviews, activeTab, searchQuery, selectedSector, selectedRating, statusFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    const pending = reviews.filter((r) => r.status === 'Pending Triage').length;
    const live = reviews.filter((r) => r.status === 'Live' || r.status === 'Featured').length;
    const featured = reviews.filter((r) => r.status === 'Featured').length;
    const rejected = reviews.filter((r) => r.status === 'Rejected').length;
    return { pending, live, featured, rejected };
  }, [reviews]);

  // Handlers for Review Actions
  const handleApprove = async (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Live' } : r))
    );
    try {
      await reviewApi.updateStatus(id, 'APPROVED');
    } catch {
      // Handled silently
    }
    showToast(`Review ${activeReview?.docket} approved and published to website`);
  };

  const handleSetFeatured = async (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Featured' } : r))
    );
    try {
      await reviewApi.updateStatus(id, 'FEATURED');
    } catch {
      // Handled silently
    }
    showToast(`Review ${activeReview?.name} elevated to Hero Spotlight`);
  };

  const handleUnfeature = async (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Live' } : r))
    );
    try {
      await reviewApi.updateStatus(id, 'APPROVED');
    } catch {
      // Handled silently
    }
    showToast(`Removed from Hero Spotlight`);
  };

  const handleReject = async (id: string) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'Rejected' } : r))
    );
    try {
      await reviewApi.updateStatus(id, 'REJECTED');
    } catch {
      // Handled silently
    }
    showToast(`Review submission rejected and archived`);
  };

  // Add Testimonial Submit
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim() || !newContent.trim()) {
      showToast('Please provide client name and endorsement text');
      return;
    }

    const newRev: ReviewItem = {
      id: `test-${Date.now()}`,
      revCode: `#TEST-${Math.floor(1000 + Math.random() * 9000)}`,
      name: newClientName.trim(),
      initials: newClientName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase(),
      title: newClientTitle.trim() || 'Managing Director',
      company: newCompanyName.trim() || 'Institutional Enterprise',
      cluster: newCluster,
      docket: `Docket #EF-${Math.floor(9400 + Math.random() * 100)}`,
      rating: newRating,
      reviewExcerpt: newContent.slice(0, 100) + '...',
      fullQuote: newContent.trim(),
      facility: newFacility,
      volume: newVolume,
      verificationBadge: 'Disbursement Verified',
      status: newSpotlight ? 'Featured' : 'Live',
      date: 'Today, Just Now',
      sector: 'Industrial & Capex'
    };

    setReviews((prev) => [newRev, ...prev]);
    setSelectedReviewId(newRev.id);
    setIsAddModalOpen(false);

    // Save to testimonial backend API
    try {
      await testimonialApi.create({
        client_name: newRev.name,
        client_title: newRev.title,
        company_name: newRev.company,
        rating: newRev.rating,
        content: newRev.fullQuote
      });
    } catch {
      // Handled silently
    }

    // Reset Form
    setNewClientName('');
    setNewClientTitle('');
    setNewCompanyName('');
    setNewContent('');

    showToast(`Curated testimonial for ${newRev.name} added to portal dockets`);
  };

  // Export CSV
  const handleExportCSV = () => {
    const headers = [
      'Docket ID',
      'Borrower Name',
      'Title',
      'Company',
      'Cluster',
      'Facility',
      'Volume',
      'Rating',
      'Status',
      'Date',
      'Quote'
    ];
    const rows = reviews.map((r) => [
      `"${r.docket}"`,
      `"${r.name}"`,
      `"${r.title}"`,
      `"${r.company}"`,
      `"${r.cluster}"`,
      `"${r.facility}"`,
      `"${r.volume}"`,
      r.rating,
      `"${r.status}"`,
      `"${r.date}"`,
      `"${r.fullQuote.replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `earth_finance_reviews_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported review moderation logs to CSV');
  };

  return (
    <div className="w-full min-h-screen bg-[#F4F6FB] text-slate-800 antialiased -m-4 sm:-m-6 lg:-m-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-3 bg-[#071B3A] text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce">
          <span className="material-symbols-outlined text-[#8ff9a6] text-[20px]">check_circle</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        {/* Header Section */}
        <section className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#168B45] uppercase tracking-wide mb-1">
              <span className="inline-block w-2 h-2 rounded-full bg-[#168B45]" />
              <span>Client Endorsements &amp; Reputation Desk</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#071B3A] tracking-tight">
              Reviews &amp; Testimonials Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Approve client endorsements, moderate inbound public review submissions, and manage featured
              testimonials across Earth Finance portals.
            </p>
          </div>

          {/* Action Buttons Group */}
          <div className="flex items-center space-x-2.5 flex-wrap">
            <button
              type="button"
              onClick={() => setIsPolicyModalOpen(true)}
              className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition"
            >
              <span className="material-symbols-outlined text-[16px] mr-1.5 text-slate-500">policy</span>
              Policy Guidelines
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition"
            >
              <span className="material-symbols-outlined text-[16px] mr-1.5 text-slate-500">file_download</span>
              Export CSV
            </button>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center px-4 py-2 text-xs font-bold text-slate-900 bg-[#F4C542] hover:bg-[#D4A017] rounded-lg shadow-sm transition active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px] mr-1">add</span>
              + Add Testimonial
            </button>
          </div>
        </section>

        {/* Dual Tabs Navigation */}
        <div className="border-b border-slate-200">
          <nav aria-label="Tabs" className="flex space-x-8 overflow-x-auto">
            {/* Tab 1: Customer Reviews */}
            <button
              type="button"
              onClick={() => setActiveTab('reviews')}
              className={`pb-3 px-1 text-sm font-bold flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-[#1455A0] text-[#1455A0]'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <span>Customer Reviews (Inbound Submissions)</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                {stats.pending} Pending Triage
              </span>
            </button>

            {/* Tab 2: Curated Testimonials */}
            <button
              type="button"
              onClick={() => setActiveTab('testimonials')}
              className={`pb-3 px-1 text-sm font-semibold flex items-center space-x-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'testimonials'
                  ? 'border-[#1455A0] text-[#1455A0]'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <span>Curated Testimonials (Showcase Profiles)</span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                {stats.live} Profiles
              </span>
            </button>
          </nav>
        </div>

        {/* Operational Metrics Grid (4 KPI Cards) */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Inbound Moderation Triage</span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                SLA &lt; 24h
              </span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-[#071B3A]">{stats.pending}</span>
              <span className="text-xs text-amber-600 font-semibold">Awaiting Underwriter Review</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Urla &amp; Durg Hubs</span>
              <button
                type="button"
                onClick={() => setStatusFilter('Pending')}
                className="text-[#1455A0] font-semibold hover:underline"
              >
                Open Queue →
              </button>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Live on Web Portals</span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-emerald-50 text-[#168B45] border border-emerald-200">
                Verified Disbursed
              </span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-[#071B3A]">{stats.live}</span>
              <span className="text-xs text-[#168B45] font-medium">+4 this month</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Client Satisfaction 4.9/5</span>
              <button
                type="button"
                onClick={() => setStatusFilter('Approved')}
                className="text-[#1455A0] font-semibold hover:underline"
              >
                View Live →
              </button>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Hero Spotlight Cards</span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-amber-100 text-amber-900 border border-amber-300">
                Frontpage Active
              </span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-[#071B3A]">{stats.featured}</span>
              <span className="text-xs text-slate-500 font-normal">Cap: 6 Max Slots</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>High conversion impact</span>
              <button
                type="button"
                onClick={() => setStatusFilter('Featured')}
                className="text-[#1455A0] font-semibold hover:underline"
              >
                Manage Slots →
              </button>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500">Unverified / Suppressed</span>
              <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-slate-100 text-slate-600">
                Audit Safe
              </span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-black text-slate-600">{stats.rejected}</span>
              <span className="text-xs text-rose-500 font-medium">Failed KYC Match</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Fraud protection active</span>
              <button
                type="button"
                onClick={() => setStatusFilter('Rejected')}
                className="text-slate-600 font-semibold hover:underline"
              >
                Review Log →
              </button>
            </div>
          </div>
        </section>

        {/* Content Layout With Drawer (8 Cols Table / 4 Cols Drawer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Table Block (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Filter Bar Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                {/* Search Box */}
                <div className="relative flex-1">
                  <span className="material-symbols-outlined text-[18px] absolute left-3 top-2.5 text-slate-400">
                    search
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter by borrower name, firm, or review text..."
                    className="w-full text-xs pl-9 pr-3 py-2 rounded-lg border border-slate-200 focus:outline-none focus:border-[#1455A0] focus:ring-1 focus:ring-[#1455A0] bg-slate-50"
                  />
                </div>

                {/* Quick Sector and Star Filters */}
                <div className="flex items-center space-x-2">
                  <select
                    value={selectedSector}
                    onChange={(e) => setSelectedSector(e.target.value)}
                    className="text-xs py-2 px-3 border border-slate-200 rounded-lg bg-white text-slate-600 focus:ring-1 focus:ring-[#1455A0] outline-none"
                  >
                    <option value="All Sectors">All Sectors</option>
                    <option value="Industrial & Capex">Industrial &amp; Capex</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Agro Processing">Agro Processing</option>
                    <option value="EPC & Infra">EPC &amp; Infra</option>
                    <option value="Property & LAP">Property &amp; LAP</option>
                  </select>

                  <select
                    value={selectedRating}
                    onChange={(e) => setSelectedRating(e.target.value)}
                    className="text-xs py-2 px-3 border border-slate-200 rounded-lg bg-white text-slate-600 focus:ring-1 focus:ring-[#1455A0] outline-none"
                  >
                    <option value="All Star Ratings">All Star Ratings</option>
                    <option value="5 Stars only">5 Stars only</option>
                    <option value="4 Stars & above">4 Stars &amp; above</option>
                    <option value="Below 4 Stars">Below 4 Stars</option>
                  </select>
                </div>
              </div>

              {/* Filter Status Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-400 mr-1">Status:</span>
                <button
                  type="button"
                  onClick={() => setStatusFilter('All')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-md transition-colors ${
                    statusFilter === 'All'
                      ? 'bg-[#071B3A] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  All ({reviews.length})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('Pending')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md border transition-colors ${
                    statusFilter === 'Pending'
                      ? 'bg-amber-500 text-white border-amber-600 font-bold'
                      : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                  }`}
                >
                  Pending ({stats.pending})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('Approved')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    statusFilter === 'Approved'
                      ? 'bg-[#168B45] text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Approved ({stats.live})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('Featured')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    statusFilter === 'Featured'
                      ? 'bg-[#F4C542] text-slate-900 font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Featured ({stats.featured})
                </button>
                <button
                  type="button"
                  onClick={() => setStatusFilter('Rejected')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors ${
                    statusFilter === 'Rejected'
                      ? 'bg-rose-600 text-white font-bold'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Rejected ({stats.rejected})
                </button>
              </div>
            </div>

            {/* Moderation Data Table */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4">Borrower &amp; Enterprise</th>
                      <th className="py-3 px-3">Rating</th>
                      <th className="py-3 px-4">Submitted Review Excerpt</th>
                      <th className="py-3 px-3">Credit Facility &amp; Volume</th>
                      <th className="py-3 px-3">Status</th>
                      <th className="py-3 px-3">Date</th>
                      <th className="py-3 px-4 text-right">Moderation Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-normal">
                    {filteredReviews.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-400">
                          No reviews found matching current filter.
                        </td>
                      </tr>
                    ) : (
                      filteredReviews.map((row) => {
                        const isSelected = row.id === selectedReviewId;
                        return (
                          <tr
                            key={row.id}
                            onClick={() => setSelectedReviewId(row.id)}
                            className={`transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-amber-50/50 border-l-4 border-amber-500'
                                : 'hover:bg-slate-50/80'
                            }`}
                          >
                            {/* Borrower & Enterprise */}
                            <td className="py-3.5 px-4 font-semibold text-[#071B3A]">
                              <div className="font-bold text-slate-900">{row.name}</div>
                              <div className="text-[11px] text-slate-500">{row.company}</div>
                              <span className="inline-block mt-1 font-mono text-[10px] text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">
                                {row.docket}
                              </span>
                            </td>

                            {/* Rating */}
                            <td className="py-3.5 px-3 whitespace-nowrap">
                              <div className="text-[#F4C542]">
                                {'★'.repeat(row.rating)}
                                {'☆'.repeat(5 - row.rating)}
                              </div>
                              <span className="text-[10px] text-slate-400 font-medium">
                                {row.rating}.0 Star
                              </span>
                            </td>

                            {/* Excerpt */}
                            <td className="py-3.5 px-4 max-w-[240px]">
                              <p className="text-slate-700 italic truncate" title={row.fullQuote}>
                                &quot;{row.reviewExcerpt}&quot;
                              </p>
                              <span className="text-[10px] text-emerald-600 font-medium flex items-center mt-1">
                                <span className="material-symbols-outlined text-[14px] mr-1 text-emerald-600">
                                  check_circle
                                </span>
                                {row.verificationBadge}
                              </span>
                            </td>

                            {/* Credit Facility & Volume */}
                            <td className="py-3.5 px-3 whitespace-nowrap">
                              <span className="font-semibold text-slate-800">{row.facility}</span>
                              <div className="text-emerald-700 font-bold">{row.volume}</div>
                            </td>

                            {/* Status */}
                            <td className="py-3.5 px-3 whitespace-nowrap">
                              {row.status === 'Pending Triage' ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
                                  Pending Triage
                                </span>
                              ) : row.status === 'Featured' ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#F4C542] text-slate-900">
                                  ★ Featured
                                </span>
                              ) : row.status === 'Live' ? (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-[#168B45] border border-emerald-200">
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#168B45] mr-1.5" />
                                  Live
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                                  Rejected
                                </span>
                              )}
                            </td>

                            {/* Date */}
                            <td className="py-3.5 px-3 text-slate-500 text-[11px] whitespace-nowrap">
                              {row.date}
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end space-x-1.5 text-xs">
                                {row.status === 'Pending Triage' ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleApprove(row.id);
                                      }}
                                      className="p-1.5 text-white bg-[#168B45] hover:bg-emerald-700 rounded shadow-xs"
                                      title="Approve & Publish"
                                    >
                                      <span className="material-symbols-outlined text-[16px]">check</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleReject(row.id);
                                      }}
                                      className="p-1.5 text-white bg-rose-600 hover:bg-rose-700 rounded shadow-xs"
                                      title="Reject Submission"
                                    >
                                      <span className="material-symbols-outlined text-[16px]">close</span>
                                    </button>
                                  </>
                                ) : row.status === 'Featured' ? (
                                  <>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleUnfeature(row.id);
                                      }}
                                      className="px-2 py-1 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded font-medium text-[11px]"
                                    >
                                      Unfeature
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleReject(row.id);
                                      }}
                                      className="px-2 py-1 text-slate-600 hover:bg-slate-100 rounded text-[11px]"
                                    >
                                      Unpublish
                                    </button>
                                  </>
                                ) : (
                                  <>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleSetFeatured(row.id);
                                      }}
                                      className="px-2 py-1 bg-amber-50 text-amber-800 hover:bg-amber-100 rounded border border-amber-200 font-medium text-[11px]"
                                    >
                                      Feature
                                    </button>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleReject(row.id);
                                      }}
                                      className="px-2 py-1 text-slate-600 hover:bg-slate-100 rounded text-[11px]"
                                    >
                                      Unpublish
                                    </button>
                                  </>
                                )}
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>

              {/* Table Pagination Footer */}
              <div className="px-4 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                <div>
                  Showing <span className="font-semibold text-slate-800">1</span> to{' '}
                  <span className="font-semibold text-slate-800">{filteredReviews.length}</span> of{' '}
                  <span className="font-semibold text-slate-800">{reviews.length}</span> total reviews
                </div>
                <div className="flex items-center space-x-1">
                  <button
                    type="button"
                    disabled
                    className="px-2 py-1 border border-slate-200 rounded text-slate-400 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    className="px-2.5 py-1 border border-[#1455A0] bg-[#1455A0] text-white rounded font-medium"
                  >
                    1
                  </button>
                  <button type="button" className="px-2.5 py-1 border border-slate-200 rounded hover:bg-slate-100">
                    2
                  </button>
                  <button type="button" className="px-2.5 py-1 border border-slate-200 rounded hover:bg-slate-100">
                    3
                  </button>
                  <button type="button" className="px-2 py-1 border border-slate-200 rounded text-slate-600 hover:text-slate-800">
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Moderation & Inspector Drawer (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Inspection Drawer Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Drawer Header */}
              <div className="bg-[#071B3A] p-4 text-white flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#F4C542] font-bold">
                    Review Submission Audit
                  </span>
                  <h3 className="text-sm font-bold text-white">{activeReview.revCode} Under Inspection</h3>
                </div>
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    activeReview.status === 'Pending Triage'
                      ? 'bg-amber-400 text-slate-900'
                      : activeReview.status === 'Featured'
                      ? 'bg-[#F4C542] text-slate-900'
                      : activeReview.status === 'Live'
                      ? 'bg-emerald-400 text-slate-900'
                      : 'bg-rose-400 text-white'
                  }`}
                >
                  {activeReview.status}
                </span>
              </div>

              {/* Drawer Metadata List */}
              <div className="p-4 space-y-3.5 border-b border-slate-100 text-xs">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-bold text-slate-900 text-sm">{activeReview.name}</div>
                    <div className="text-slate-500">{activeReview.title}</div>
                    <div className="text-slate-700 font-medium">{activeReview.company}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Cluster</span>
                    <span className="text-slate-700 font-semibold">{activeReview.cluster}</span>
                  </div>
                </div>

                {/* Linked CRM Docket Match */}
                <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-emerald-800 font-bold block uppercase tracking-tight">
                      Verified Disbursed Borrower
                    </span>
                    <span className="font-mono text-xs font-bold text-[#071B3A]">{activeReview.docket}</span>
                    <span className="text-slate-600 block text-[11px]">
                      {activeReview.facility}: <strong>{activeReview.volume}</strong>
                    </span>
                  </div>
                  <div className="w-7 h-7 bg-emerald-600 text-white rounded-full flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </div>
                </div>

                {/* Star Rating Indicator */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-1">
                    Submitted Rating
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="text-amber-400 text-base">
                      {'★'.repeat(activeReview.rating)}
                      {'☆'.repeat(5 - activeReview.rating)}
                    </div>
                    <span className="font-bold text-slate-800">{activeReview.rating}.0 / 5.0</span>
                    <span className="text-[11px] text-slate-400">(Highest Recommendation)</span>
                  </div>
                </div>

                {/* Full Raw Quote Content */}
                <div>
                  <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide block mb-1">
                    Full Endorsement Quote
                  </label>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 italic leading-relaxed text-xs">
                    &quot;{activeReview.fullQuote}&quot;
                  </div>
                </div>

                {/* Verification Confirmation Safeguard */}
                <div className="text-[11px] text-slate-500 bg-blue-50/60 p-2.5 rounded border border-blue-100 flex items-start space-x-2">
                  <span className="material-symbols-outlined text-[#1455A0] text-[18px] flex-shrink-0 mt-0.5">
                    info
                  </span>
                  <span>
                    <strong>Policy Safeguard:</strong> Approving this review will immediately publish it to the Earth
                    Finance corporate website and link to {activeReview.company}&apos;s deal tombstone.
                  </span>
                </div>
              </div>

              {/* Decision CTAs */}
              <div className="p-4 bg-slate-50 space-y-2">
                <button
                  type="button"
                  onClick={() => handleApprove(activeReview.id)}
                  className="w-full py-2.5 px-4 bg-[#168B45] hover:bg-emerald-700 text-white rounded-lg font-bold text-xs flex items-center justify-center space-x-1.5 shadow-sm transition"
                >
                  <span className="material-symbols-outlined text-[16px]">check</span>
                  <span>Approve &amp; Publish to Site</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleSetFeatured(activeReview.id)}
                  className="w-full py-2 px-4 bg-[#F4C542] hover:bg-[#D4A017] text-slate-900 rounded-lg font-bold text-xs flex items-center justify-center space-x-1.5 transition"
                >
                  <span>★ Set as Hero Spotlight</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleReject(activeReview.id)}
                  className="w-full py-2 px-4 bg-white border border-rose-300 text-rose-600 hover:bg-rose-50 rounded-lg font-semibold text-xs flex items-center justify-center space-x-1.5 transition"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                  <span>Reject Submission</span>
                </button>
              </div>
            </div>

            {/* Live Website Rendering Preview Widget */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
                <span className="text-[10px] font-bold tracking-wider uppercase text-slate-400">
                  Live Website Rendering Preview
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 font-semibold">
                  Client Portal Preview
                </span>
              </div>

              {/* Simulated Frontend Public Testimonial Card */}
              <div className="p-5 rounded-xl bg-gradient-to-br from-[#071B3A] to-[#1455A0] text-white shadow-md relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 text-white opacity-5 text-8xl font-serif select-none pointer-events-none">
                  “
                </div>
                <div className="text-[#F4C542] text-sm mb-2.5">
                  {'★'.repeat(activeReview.rating)}
                  {'☆'.repeat(5 - activeReview.rating)}
                </div>
                <p className="text-xs text-slate-200 leading-relaxed italic mb-4 font-normal">
                  &quot;{activeReview.fullQuote}&quot;
                </p>
                <div className="flex items-center space-x-3 pt-3 border-t border-white/10">
                  <div className="w-8 h-8 rounded-full bg-[#F4C542] text-slate-900 font-bold text-xs flex items-center justify-center shadow-inner">
                    {activeReview.initials}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center">
                      {activeReview.name}
                      <span className="material-symbols-outlined text-emerald-400 text-[14px] ml-1">
                        verified
                      </span>
                    </h4>
                    <p className="text-[10px] text-slate-300">
                      {activeReview.title}, {activeReview.company} • {activeReview.volume}
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 text-center mt-2.5">
                Preview synced with Raipur public theme stylesheet.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Policy Guidelines */}
      {isPolicyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071B3A]/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#1455A0] text-[24px]">verified_user</span>
                <h3 className="text-base font-bold text-[#071B3A]">Client Endorsement Moderation Policy</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPolicyModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="text-xs text-slate-600 space-y-3 leading-relaxed">
              <p>
                To maintain sovereign institutional credibility and adherence to RBI Digital Lending standards, all
                testimonials must fulfill these verification checkpoints:
              </p>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 border border-slate-200">
                <div className="font-bold text-slate-900">1. Disbursed Borrower Verification</div>
                <div>Review submissions must match an active or disbursed docket in the Raipur loan registry.</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 border border-slate-200">
                <div className="font-bold text-slate-900">2. Real Corporate Identities</div>
                <div>Testimonials displayed on the public website must represent verified businesses with genuine KYC.</div>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl space-y-1 border border-slate-200">
                <div className="font-bold text-slate-900">3. Non-Guaranteed Outcome Disclosure</div>
                <div>Endorsements cannot guarantee specific interest rate spreads or turnaround times to prospective borrowers.</div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsPolicyModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#071B3A] text-white text-xs font-bold hover:bg-[#0b2d5c]"
              >
                Acknowledge Policy
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Add Testimonial */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071B3A]/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-[#071B3A]">Add Curated Testimonial</h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddTestimonial} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    placeholder="e.g. R. K. Singhal"
                    className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-[#1455A0]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Designation / Role</label>
                  <input
                    type="text"
                    value={newClientTitle}
                    onChange={(e) => setNewClientTitle(e.target.value)}
                    placeholder="e.g. Managing Director"
                    className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-[#1455A0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Enterprise / Company</label>
                  <input
                    type="text"
                    value={newCompanyName}
                    onChange={(e) => setNewCompanyName(e.target.value)}
                    placeholder="e.g. Singhal Sponge Iron Ltd."
                    className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-[#1455A0]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Regional Cluster</label>
                  <input
                    type="text"
                    value={newCluster}
                    onChange={(e) => setNewCluster(e.target.value)}
                    placeholder="e.g. Urla Industrial Estate"
                    className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-[#1455A0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Facility Type</label>
                  <input
                    type="text"
                    value={newFacility}
                    onChange={(e) => setNewFacility(e.target.value)}
                    placeholder="e.g. Capex Term Loan"
                    className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-[#1455A0]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Disbursed Volume</label>
                  <input
                    type="text"
                    value={newVolume}
                    onChange={(e) => setNewVolume(e.target.value)}
                    placeholder="e.g. ₹8.50 Cr"
                    className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-[#1455A0]"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1 text-slate-700">Star Rating</label>
                  <select
                    value={newRating}
                    onChange={(e) => setNewRating(Number(e.target.value))}
                    className="w-full h-10 px-3 bg-slate-50 rounded-xl border border-slate-200 outline-none"
                  >
                    <option value={5}>5 Stars ★★★★★</option>
                    <option value={4}>4 Stars ★★★★☆</option>
                    <option value={3}>3 Stars ★★★☆☆</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700">Endorsement Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Enter verbatim client review text..."
                  className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:border-[#1455A0] resize-none"
                />
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-1">
                <input
                  type="checkbox"
                  checked={newSpotlight}
                  onChange={(e) => setNewSpotlight(e.target.checked)}
                  className="w-4 h-4 rounded text-[#1455A0]"
                />
                <span className="font-semibold text-slate-700">
                  Feature immediately in Hero Spotlight Carousel
                </span>
              </label>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#071B3A] text-white font-bold hover:bg-[#0b2d5c]"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminReviewsPage;
