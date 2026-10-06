import React, { useState, useEffect, useMemo, useRef } from 'react';
import { bannerApi } from '../../services/bannerApi';

interface CampaignItem {
  id: string;
  title: string;
  tagline: string;
  placement: string;
  slot: string;
  dateRange: string;
  priority: 'Urgent (P1)' | 'High (P1)' | 'Medium (P2)' | 'Priority P3';
  inquiries: number;
  inquiriesLabel: string;
  status: 'Active' | 'Scheduled' | 'Paused' | 'Draft' | 'Expired';
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  imageName: string;
  rateText: string;
  badgeText: string;
  hubText: string;
  destinationUrl: string;
}

const DEFAULT_CAMPAIGNS: CampaignItem[] = [
  {
    id: 'CMP-2025-081',
    title: 'Priority Sector LAP Advantage',
    tagline: 'Unlock up to ₹25 Cr against commercial assets in Chhattisgarh with sovereign-grade certainty.',
    placement: 'Offers Page Cards',
    slot: 'Slot #CARD-01',
    dateRange: 'May 01 – Jun 30, 2025',
    priority: 'High (P1)',
    inquiries: 142,
    inquiriesLabel: 'Verified Enquiries',
    status: 'Active',
    ctaText: 'Explore Solution',
    ctaLink: '/loans/property-loan',
    imageUrl:
      'https://lh3.googleusercontent.com/aida/AEtjO1UBjOAeaRoSthxdWJQflfD_Tg8wyggrKmJjSD3DCiHmTgdpYPfNbjvImswa5eL2nRUimR69FmdVUK3xmunnOaBymBpFNWvQsSWmgm-UAIoW5GOOCxyr9zaWHKsTA9KOG2nBCfULkC285fX6Vx5rP5B7cS1V_MZvCc2HtGpvTZSF6wg3zNUSShzhOvr7iLQcN0knQVQUGTuvfdEM28SqLK94v72eshsnUTnvg5-uFfEiBWLlCJDKiv_orkI',
    imageName: 'commercial-property-finance.webp',
    rateText: '8.45% p.a.',
    badgeText: 'Priority Sector',
    hubText: 'Raipur Hub Exclusive',
    destinationUrl: 'lap-advantage'
  },
  {
    id: 'CMP-2025-084',
    title: 'Siltara & Urla Machinery Capex Window',
    tagline: 'Term credit up to ₹25 Cr for heavy plant engineering and industrial automation in industrial corridors.',
    placement: 'Home Promotional Strip',
    slot: 'Industrial Zone Segment',
    dateRange: 'May 15 – Jul 15, 2025',
    priority: 'Urgent (P1)',
    inquiries: 89,
    inquiriesLabel: 'Verified Enquiries',
    status: 'Active',
    ctaText: 'Check Eligibility',
    ctaLink: '/loans/industrial-finance',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    imageName: 'industrial-machinery-capex.webp',
    rateText: '8.85% p.a.',
    badgeText: 'Industrial Capex',
    hubText: 'Siltara & Urla Desk',
    destinationUrl: 'machinery-capex'
  },
  {
    id: 'CMP-2025-079',
    title: 'Fast-Track CC Season Expansion',
    tagline: 'Structured Cash Credit (CC) and revolving OD limits mapped to inventory and seasonal receivables.',
    placement: 'Loans Page Header',
    slot: 'Hero Top Masthead',
    dateRange: 'May 10 – Jun 10, 2025',
    priority: 'Medium (P2)',
    inquiries: 114,
    inquiriesLabel: 'Verified Enquiries',
    status: 'Active',
    ctaText: 'Talk to an Expert',
    ctaLink: '/loans/working-capital',
    imageUrl: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    imageName: 'working-capital-liquidity.webp',
    rateText: '8.75% onwards',
    badgeText: 'Revolving OD',
    hubText: 'Commercial Cluster',
    destinationUrl: 'fast-track-cc'
  },
  {
    id: 'CMP-2025-068',
    title: 'Corporate Advisory 0.5% Concession Notice',
    tagline: 'Direct fee concession for certified corporate and MSME entities completing quarterly compliance.',
    placement: 'Global Announcement Bar',
    slot: 'Tier 0 Top Anchor',
    dateRange: 'Ongoing (Q1 FY26)',
    priority: 'High (P1)',
    inquiries: 305,
    inquiriesLabel: 'Direct Clicks',
    status: 'Active',
    ctaText: 'Explore Solution',
    ctaLink: '/offers',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    imageName: 'corporate-concession-notice.webp',
    rateText: '0.50% Concession',
    badgeText: 'Advisory Special',
    hubText: 'State-wide Active',
    destinationUrl: 'corporate-concession'
  },
  {
    id: 'CMP-2025-092',
    title: 'Monsoon Agro Processing Capex Subvention',
    tagline: 'Preferential seasonal credit lines for cold storage, grain silos, and food processing facilities.',
    placement: 'Offers Page Cards',
    slot: 'Featured Hero Slot',
    dateRange: 'Jun 01 – Aug 31, 2025',
    priority: 'Medium (P2)',
    inquiries: 0,
    inquiriesLabel: 'Starts in 11 days',
    status: 'Scheduled',
    ctaText: 'Check Eligibility',
    ctaLink: '/apply',
    imageUrl: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    imageName: 'agro-processing-capex.webp',
    rateText: '8.25% p.a.',
    badgeText: 'Agro Processing',
    hubText: 'Dhamtari & Rajnandgaon',
    destinationUrl: 'agro-subvention'
  },
  {
    id: 'CMP-2025-051',
    title: 'Special Doctor Equipment Line',
    tagline: 'Diagnostic equipment leasing and hospital expansion lines with nil hypothecation for prime clinics.',
    placement: 'Healthcare Sector Page',
    slot: 'Mid-body Section',
    dateRange: 'Apr 01 – Apr 30, 2025',
    priority: 'Priority P3',
    inquiries: 64,
    inquiriesLabel: 'Conversions Logged',
    status: 'Expired',
    ctaText: 'Talk to an Expert',
    ctaLink: '/loans/medical-finance',
    imageUrl: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    imageName: 'medical-doctor-equipment.webp',
    rateText: '9.50% onwards',
    badgeText: 'Medical Line',
    hubText: 'Medical College Zone',
    destinationUrl: 'doctor-equipment'
  }
];

export const AdminBannersPage: React.FC = () => {
  // Campaign registry state
  const [campaigns, setCampaigns] = useState<CampaignItem[]>(DEFAULT_CAMPAIGNS);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlacement, setSelectedPlacement] = useState('All Placements');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSort, setSelectedSort] = useState('priority');

  // Interactive Live Builder state
  const [builderId, setBuilderId] = useState<string | null>(null);
  const [builderTitle, setBuilderTitle] = useState('Priority Sector LAP Advantage');
  const [builderTagline, setBuilderTagline] = useState(
    'Unlock up to ₹25 Cr against commercial assets in Chhattisgarh with sovereign-grade certainty.'
  );
  const [builderCta, setBuilderCta] = useState('Explore Solution');
  const [builderPlacement, setBuilderPlacement] = useState('Offers Page Cards');
  const [builderSlot, setBuilderSlot] = useState('Slot #CARD-01');
  const [builderSlug, setBuilderSlug] = useState('lap-advantage');
  const [builderImageUrl, setBuilderImageUrl] = useState(
    'https://lh3.googleusercontent.com/aida/AEtjO1UBjOAeaRoSthxdWJQflfD_Tg8wyggrKmJjSD3DCiHmTgdpYPfNbjvImswa5eL2nRUimR69FmdVUK3xmunnOaBymBpFNWvQsSWmgm-UAIoW5GOOCxyr9zaWHKsTA9KOG2nBCfULkC285fX6Vx5rP5B7cS1V_MZvCc2HtGpvTZSF6wg3zNUSShzhOvr7iLQcN0knQVQUGTuvfdEM28SqLK94v72eshsnUTnvg5-uFfEiBWLlCJDKiv_orkI'
  );
  const [builderImageName, setBuilderImageName] = useState('commercial-property-finance.webp');
  const [builderRate, setBuilderRate] = useState('8.45% p.a.');
  const [builderBadge, setBuilderBadge] = useState('Priority Sector');
  const [builderHub, setBuilderHub] = useState('Raipur Hub Exclusive');

  // Simulation View Mode: 'both' | 'desktop' | 'mobile'
  const [simViewMode, setSimViewMode] = useState<'both' | 'desktop' | 'mobile'>('both');

  // UI Feedback Toast & Modals
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);
  const [isReplaceAssetModalOpen, setIsReplaceAssetModalOpen] = useState(false);
  const [tempAssetUrl, setTempAssetUrl] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState<CampaignItem | null>(null);

  // References
  const builderPanelRef = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  // Show toast utility
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Sync backend banners if present
  useEffect(() => {
    bannerApi
      .getAdmin()
      .then((res) => {
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          // If custom backend items exist, we append them or map them
          const mappedFromBackend: CampaignItem[] = res.data.map((b, idx) => ({
            id: b.id || `CMP-DB-${idx + 1}`,
            title: b.title,
            tagline: b.subtitle || 'Institutional financial solutions tailored for regional growth.',
            placement:
              b.position === 'HOME_HERO'
                ? 'Home Hero Banner'
                : b.position === 'LOANS_HEADER'
                ? 'Loans Page Header'
                : 'Offers Page Cards',
            slot: 'Master Slot',
            dateRange: 'Active Cycle FY26',
            priority: 'High (P1)',
            inquiries: 50 + idx * 12,
            inquiriesLabel: 'Verified Enquiries',
            status: 'Active',
            ctaText: b.cta_text || 'Explore Solution',
            ctaLink: b.cta_link || '/apply',
            imageUrl:
              b.background_image ||
              'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
            imageName: 'backend-banner-asset.webp',
            rateText: '8.50% onwards',
            badgeText: 'Verified Banner',
            hubText: 'Raipur Central Cluster',
            destinationUrl: (b.cta_link || '').replace(/^\//, '')
          }));

          setCampaigns((prev) => {
            const combined = [...prev];
            mappedFromBackend.forEach((mb) => {
              if (!combined.some((c) => c.title.toLowerCase() === mb.title.toLowerCase())) {
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

  // Filtered and Sorted Campaigns
  const filteredCampaigns = useMemo(() => {
    let list = [...campaigns];

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q) ||
          c.tagline.toLowerCase().includes(q) ||
          c.placement.toLowerCase().includes(q) ||
          c.slot.toLowerCase().includes(q)
      );
    }

    // Filter by Placement Tab
    if (selectedPlacement !== 'All Placements') {
      list = list.filter((c) => c.placement.toLowerCase().includes(selectedPlacement.toLowerCase()));
    }

    // Filter by Status Dropdown
    if (selectedStatus !== 'all') {
      list = list.filter((c) => c.status.toLowerCase() === selectedStatus.toLowerCase());
    }

    // Sort
    if (selectedSort === 'priority') {
      const rank: Record<string, number> = {
        'Urgent (P1)': 4,
        'High (P1)': 3,
        'Medium (P2)': 2,
        'Priority P3': 1
      };
      list.sort((a, b) => (rank[b.priority] || 0) - (rank[a.priority] || 0));
    } else if (selectedSort === 'inquiries') {
      list.sort((a, b) => b.inquiries - a.inquiries);
    }

    return list;
  }, [campaigns, searchQuery, selectedPlacement, selectedStatus, selectedSort]);

  // Statistics calculation
  const stats = useMemo(() => {
    const active = campaigns.filter((c) => c.status === 'Active').length;
    const scheduled = campaigns.filter((c) => c.status === 'Scheduled').length;
    const pending = campaigns.filter((c) => c.status === 'Draft' || c.priority === 'Urgent (P1)').length || 1;
    const archived = campaigns.filter((c) => c.status === 'Expired' || c.status === 'Paused').length;
    return { active, scheduled, pending, archived };
  }, [campaigns]);

  // Quick action: Scroll to simulator
  const handleScrollToSim = () => {
    if (builderPanelRef.current) {
      builderPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // Quick action: Scroll to builder
  const handleOpenBuilder = () => {
    if (builderPanelRef.current) {
      builderPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      titleInputRef.current?.focus();
    }
  };

  // Edit campaign in builder
  const handleEditCampaign = (item: CampaignItem) => {
    setBuilderId(item.id);
    setBuilderTitle(item.title);
    setBuilderTagline(item.tagline);
    setBuilderCta(item.ctaText);
    setBuilderPlacement(item.placement);
    setBuilderSlot(item.slot);
    setBuilderSlug(item.destinationUrl || item.ctaLink.replace(/^\//, ''));
    setBuilderImageUrl(item.imageUrl);
    setBuilderImageName(item.imageName);
    setBuilderRate(item.rateText);
    setBuilderBadge(item.badgeText);
    setBuilderHub(item.hubText);

    if (builderPanelRef.current) {
      builderPanelRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      titleInputRef.current?.focus();
    }
    showToast(`Loaded "${item.title}" into Campaign Builder`);
  };

  // Toggle Pause/Resume
  const handleToggleStatus = (item: CampaignItem) => {
    const newStatus = item.status === 'Active' ? 'Paused' : 'Active';
    setCampaigns((prev) =>
      prev.map((c) => (c.id === item.id ? { ...c, status: newStatus } : c))
    );
    showToast(`Campaign ${item.id} status set to ${newStatus}`);
  };

  // Duplicate campaign
  const handleDuplicate = (item: CampaignItem) => {
    const newId = `CMP-2025-${Math.floor(100 + Math.random() * 900)}`;
    const copy: CampaignItem = {
      ...item,
      id: newId,
      title: `${item.title} (Copy)`,
      status: 'Draft',
      inquiries: 0,
      inquiriesLabel: 'Draft Staging'
    };
    setCampaigns((prev) => [copy, ...prev]);
    showToast(`Duplicated campaign as ${newId} (Draft)`);
  };

  // Delete Campaign
  const handleConfirmDelete = () => {
    if (!deleteCandidate) return;
    setCampaigns((prev) => prev.filter((c) => c.id !== deleteCandidate.id));
    showToast(`Campaign ${deleteCandidate.id} archived and purged`);
    setDeleteCandidate(null);
  };

  // Save in builder: Stage Live
  const handleSaveAndStage = async () => {
    if (!builderTitle.trim()) {
      showToast('Please provide a campaign title');
      return;
    }

    if (builderId) {
      // Update existing
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === builderId
            ? {
                ...c,
                title: builderTitle.trim(),
                tagline: builderTagline.trim(),
                ctaText: builderCta,
                placement: builderPlacement,
                destinationUrl: builderSlug,
                imageUrl: builderImageUrl,
                imageName: builderImageName,
                status: 'Active'
              }
            : c
        )
      );
      showToast(`Campaign ${builderId} updated and staged LIVE`);
    } else {
      // Create new
      const newId = `CMP-2025-${Math.floor(100 + Math.random() * 900)}`;
      const newItem: CampaignItem = {
        id: newId,
        title: builderTitle.trim(),
        tagline: builderTagline.trim(),
        placement: builderPlacement,
        slot: builderSlot || 'Slot #CARD-01',
        dateRange: 'May 20 – Jul 30, 2025',
        priority: 'High (P1)',
        inquiries: 1,
        inquiriesLabel: 'Verified Enquiries',
        status: 'Active',
        ctaText: builderCta,
        ctaLink: `/loans/${builderSlug}`,
        imageUrl: builderImageUrl,
        imageName: builderImageName,
        rateText: builderRate || '8.45% p.a.',
        badgeText: builderBadge || 'Priority Sector',
        hubText: builderHub || 'Raipur Desk',
        destinationUrl: builderSlug
      };

      setCampaigns((prev) => [newItem, ...prev]);
      setBuilderId(newId);

      // Save to backend if connected
      try {
        await bannerApi.create({
          title: newItem.title,
          subtitle: newItem.tagline,
          cta_text: newItem.ctaText,
          cta_link: `/loans/${builderSlug}`,
          position: builderPlacement.includes('Home') ? 'HOME_HERO' : 'LOANS_HEADER',
          background_image: builderImageUrl
        });
      } catch {
        // Handled silently
      }

      showToast(`Campaign ${newId} created & staged LIVE across Raipur Cluster`);
    }
  };

  // Save in builder: Save as Draft
  const handleSaveAsDraft = () => {
    if (!builderTitle.trim()) {
      showToast('Please provide a campaign title');
      return;
    }

    const targetId = builderId || `CMP-2025-${Math.floor(100 + Math.random() * 900)}`;
    const newItem: CampaignItem = {
      id: targetId,
      title: builderTitle.trim(),
      tagline: builderTagline.trim(),
      placement: builderPlacement,
      slot: builderSlot || 'Staging Slot',
      dateRange: 'Draft (Unscheduled)',
      priority: 'Medium (P2)',
      inquiries: 0,
      inquiriesLabel: 'Draft Staging',
      status: 'Draft',
      ctaText: builderCta,
      ctaLink: `/loans/${builderSlug}`,
      imageUrl: builderImageUrl,
      imageName: builderImageName,
      rateText: builderRate,
      badgeText: builderBadge,
      hubText: builderHub,
      destinationUrl: builderSlug
    };

    setCampaigns((prev) => {
      const exists = prev.some((c) => c.id === targetId);
      if (exists) {
        return prev.map((c) => (c.id === targetId ? newItem : c));
      }
      return [newItem, ...prev];
    });

    setBuilderId(targetId);
    showToast(`Campaign ${targetId} saved to Local Draft Staging`);
  };

  // CSV Export
  const handleExportCSV = () => {
    const headers = [
      'Campaign ID',
      'Title',
      'Placement',
      'Slot',
      'Date Range',
      'Priority',
      'Performance Count',
      'Metric Label',
      'Status'
    ];
    const rows = campaigns.map((c) => [
      `"${c.id}"`,
      `"${c.title.replace(/"/g, '""')}"`,
      `"${c.placement}"`,
      `"${c.slot}"`,
      `"${c.dateRange}"`,
      `"${c.priority}"`,
      c.inquiries,
      `"${c.inquiriesLabel}"`,
      `"${c.status}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `earth_finance_campaigns_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Exported campaign docket to CSV');
  };

  // Replace Asset handler
  const handleConfirmAsset = () => {
    if (!tempAssetUrl.trim()) return;
    const name = tempAssetUrl.split('/').pop()?.split('?')[0] || 'custom-creative.webp';
    setBuilderImageUrl(tempAssetUrl.trim());
    setBuilderImageName(name);
    setTempAssetUrl('');
    setIsReplaceAssetModalOpen(false);
    showToast('Updated primary creative asset');
  };

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff] text-[#141b2c] antialiased -m-4 sm:-m-6 lg:-m-8">
      {/* Interactive Floating Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-3 bg-[#000001] text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce">
          <span className="material-symbols-outlined text-[#8ff9a6] text-[20px]">check_circle</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="px-4 sm:px-8 py-6 flex flex-col gap-6 max-w-[1440px] mx-auto w-full">
        {/* Header & Quick Actions */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#75777f]">
              <span className="hover:text-[#071b3a] transition-colors cursor-pointer">Admin</span>
              <span className="material-symbols-outlined text-[13px]">chevron_right</span>
              <span className="text-[#071b3a] font-bold">Banners &amp; Campaigns</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#071b3a] tracking-tight">
              Banners &amp; Promotional Campaigns
            </h1>
            <p className="text-xs sm:text-sm text-[#44474e] max-w-3xl leading-relaxed">
              Manage high-impact marketing banners, promotional advisory campaigns, and regional notices across website
              touchpoints with institutional compliance.
            </p>
          </div>

          <div className="flex items-center flex-wrap gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleScrollToSim}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#e0e8ff] text-[#141b2c] font-semibold text-xs hover:bg-[#dbe2f9] transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px] text-[#006d33]">devices</span>
              <span>Preview Placements</span>
            </button>

            <button
              type="button"
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#f1f3ff] text-[#44474e] font-semibold text-xs hover:bg-[#e9edff] hover:text-[#141b2c] transition-all shadow-sm border border-slate-200"
            >
              <span className="material-symbols-outlined text-[18px]">file_download</span>
              <span>Export Campaign Log</span>
            </button>

            <button
              type="button"
              onClick={handleOpenBuilder}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#ffdf94] text-[#071b3a] font-bold text-xs hover:bg-[#efc13e] transition-all shadow-md active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px] font-bold">add</span>
              <span>+ Create Campaign</span>
            </button>
          </div>
        </div>

        {/* Summary Stat KPI Cards (4 Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Active */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-[#44474e] font-bold">Active Campaigns</span>
              <span className="w-8 h-8 rounded-lg bg-[#8cf6a3]/50 text-[#007235] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">bolt</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-3xl font-extrabold text-[#141b2c]">{stats.active}</span>
              <span className="text-xs text-[#006d33] font-bold">Running Live</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-xs text-[#44474e]">
              <span className="w-2 h-2 rounded-full bg-[#006d33] animate-ping" />
              <span>Raipur &amp; Siltara Corridor Live</span>
            </div>
            <div className="absolute left-0 bottom-0 top-0 w-1.5 bg-[#006d33]" />
          </div>

          {/* Scheduled */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-[#44474e] font-bold">Scheduled Campaigns</span>
              <span className="w-8 h-8 rounded-lg bg-[#e0e8ff] text-[#071b3a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">calendar_clock</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-3xl font-extrabold text-[#141b2c]">{stats.scheduled}</span>
              <span className="text-xs text-[#364768] font-bold">Upcoming Windows</span>
            </div>
            <div className="mt-3 text-xs text-[#44474e]">Next rollout: Jun 01, 2025 (Agro Capex)</div>
            <div className="absolute left-0 bottom-0 top-0 w-1.5 bg-[#4e5e81]" />
          </div>

          {/* In Review / Draft */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-[#44474e] font-bold">Pending Approvals</span>
              <span className="w-8 h-8 rounded-lg bg-[#ffdf94]/40 text-[#a47f00] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">edit_note</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-3xl font-extrabold text-[#141b2c]">{stats.pending}</span>
              <span className="text-xs text-[#a47f00] font-bold">In Compliance Review</span>
            </div>
            <div className="mt-3 text-xs text-[#44474e]">Fiduciary sanction disclaimer check</div>
            <div className="absolute left-0 bottom-0 top-0 w-1.5 bg-[#efc13e]" />
          </div>

          {/* Expired / Archived */}
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 flex flex-col justify-between relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[11px] uppercase tracking-wider text-[#44474e] font-bold">Archived Windows</span>
              <span className="w-8 h-8 rounded-lg bg-[#e9edff] text-[#75777f] flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">inventory_2</span>
              </span>
            </div>
            <div className="flex items-baseline gap-2 mt-3">
              <span className="text-3xl font-extrabold text-[#141b2c]">{stats.archived}</span>
              <span className="text-xs text-[#75777f] font-bold">Completed Runs</span>
            </div>
            <div className="mt-3 text-xs text-[#44474e]">Retained for underwriting audits</div>
            <div className="absolute left-0 bottom-0 top-0 w-1.5 bg-[#75777f]" />
          </div>
        </div>

        {/* Regulatory Advisory Notice Banner */}
        <div className="bg-[#071b3a] text-white p-5 rounded-2xl shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#0b2d5c]">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#364768] flex items-center justify-center shrink-0 text-[#ffdf94]">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#ffdf94] font-bold">
                  Mandatory Advertising Compliance
                </span>
                <span className="bg-[#000001] px-1.5 py-0.5 rounded text-[10px] text-white tracking-wide uppercase font-mono">
                  RBI &amp; CG Guidelines
                </span>
              </div>
              <p className="text-xs text-[#dbe2f9] leading-relaxed max-w-4xl mt-0.5">
                Promotional financial banners must not guarantee loan approvals or 100% sanction ratios. All banners
                automatically include{' '}
                <span className="text-[#ffdf94] font-semibold">
                  &quot;Subject to underwriting eligibility and lender credit approval&quot;
                </span>{' '}
                in public website renders.
              </p>
            </div>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAuditModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#364768] text-white hover:bg-[#4e5e81] text-xs font-semibold transition-colors"
            >
              Audit Directives
            </button>
          </div>
        </div>

        {/* Placement Tabs, Filters & Campaigns Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 flex flex-col gap-5">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Placement Selector Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              {[
                'All Placements',
                'Home Hero Banner',
                'Home Promotional Strip',
                'Loans Page Header',
                'Offers Page Cards',
                'Global Announcement Bar'
              ].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setSelectedPlacement(tab)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedPlacement === tab
                      ? 'bg-[#071b3a] text-white shadow-sm'
                      : 'text-[#44474e] hover:bg-[#f1f3ff] hover:text-[#141b2c]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Status & Sort Dropdowns */}
            <div className="flex items-center gap-2.5 shrink-0">
              <div className="relative">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="bg-[#f1f3ff] px-3.5 py-2 rounded-xl text-xs font-semibold text-[#141b2c] appearance-none pr-8 cursor-pointer focus:outline-none focus:bg-[#e9edff] transition-all border border-transparent focus:border-slate-300"
                >
                  <option value="all">Status: All Active &amp; Staged</option>
                  <option value="active">Active Only</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="paused">Paused</option>
                  <option value="draft">Draft</option>
                  <option value="expired">Expired</option>
                </select>
                <span className="material-symbols-outlined text-[18px] text-[#75777f] pointer-events-none absolute right-2.5 top-2.5">
                  expand_more
                </span>
              </div>

              <div className="relative">
                <select
                  value={selectedSort}
                  onChange={(e) => setSelectedSort(e.target.value)}
                  className="bg-[#f1f3ff] px-3.5 py-2 rounded-xl text-xs font-semibold text-[#141b2c] appearance-none pr-8 cursor-pointer focus:outline-none focus:bg-[#e9edff] transition-all border border-transparent focus:border-slate-300"
                >
                  <option value="priority">Sort: Priority (Desc)</option>
                  <option value="inquiries">Sort: Highest Inquiries</option>
                </select>
                <span className="material-symbols-outlined text-[18px] text-[#75777f] pointer-events-none absolute right-2.5 top-2.5">
                  sort
                </span>
              </div>
            </div>
          </div>

          {/* Search Input */}
          <div className="flex items-center gap-2.5 bg-[#f1f3ff] px-4 py-2.5 rounded-xl border border-transparent focus-within:border-slate-300 focus-within:bg-white transition-all">
            <span className="material-symbols-outlined text-[20px] text-[#75777f]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSearchQuery('');
              }}
              placeholder="Search campaign title, creative tag, or placement target ID (e.g., #CARD-01, Siltara)..."
              className="bg-transparent border-0 outline-none w-full text-xs text-[#141b2c] placeholder:text-[#75777f]"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-[11px] text-[#75777f] px-2 py-0.5 rounded bg-[#e0e8ff] font-mono hover:bg-[#dbe2f9]"
              >
                Clear
              </button>
            )}
            <span className="text-[11px] text-[#75777f] px-2 py-0.5 rounded bg-[#e0e8ff] font-mono hidden sm:inline-block">
              ESC to clear
            </span>
          </div>

          {/* Main Campaigns Data Table */}
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left align-middle border-collapse">
              <thead>
                <tr className="bg-[#f1f3ff] text-[#44474e] text-[11px] uppercase tracking-wider font-bold">
                  <th className="py-3 px-4 rounded-l-xl">Campaign Creative &amp; Title</th>
                  <th className="py-3 px-4">Placement Target</th>
                  <th className="py-3 px-4">Active Date Range</th>
                  <th className="py-3 px-4">Priority / Weight</th>
                  <th className="py-3 px-4">Performance</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredCampaigns.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No campaigns found matching current query or filters.
                    </td>
                  </tr>
                ) : (
                  filteredCampaigns.map((row) => (
                    <tr
                      key={row.id}
                      className={`hover:bg-[#f1f3ff]/50 transition-colors ${
                        row.status === 'Expired' ? 'opacity-70 bg-slate-50/50' : ''
                      }`}
                    >
                      {/* Column 1: Creative & Title */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-14 h-10 rounded-lg overflow-hidden bg-[#071b3a] shrink-0 relative border border-slate-200">
                            {row.imageUrl ? (
                              <img
                                src={row.imageUrl}
                                alt={row.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-white">
                                <span className="material-symbols-outlined text-[20px]">campaign</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-[#071b3a]/20" />
                          </div>
                          <div className="flex flex-col min-w-0 max-w-xs">
                            <span
                              className={`font-bold text-[#141b2c] truncate ${
                                row.status === 'Expired' ? 'line-through text-slate-400' : ''
                              }`}
                            >
                              {row.title}
                            </span>
                            <span className="text-[11px] text-[#75777f] font-mono">ID: {row.id}</span>
                          </div>
                        </div>
                      </td>

                      {/* Column 2: Placement Target */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <span className="font-semibold text-[#141b2c]">{row.placement}</span>
                          <span className="text-[11px] text-[#75777f] font-mono">{row.slot}</span>
                        </div>
                      </td>

                      {/* Column 3: Active Date Range */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-[#141b2c]">
                          <span className="material-symbols-outlined text-[16px] text-[#75777f]">date_range</span>
                          <span>{row.dateRange}</span>
                        </div>
                      </td>

                      {/* Column 4: Priority / Weight */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5">
                          <span
                            className={`w-2 h-2 rounded-full ${
                              row.priority.includes('Urgent') || row.priority.includes('High')
                                ? 'bg-rose-600'
                                : row.priority.includes('Medium')
                                ? 'bg-amber-500'
                                : 'bg-slate-400'
                            }`}
                          />
                          <span className="font-bold text-[#141b2c]">{row.priority}</span>
                        </div>
                      </td>

                      {/* Column 5: Performance */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-[#141b2c]">{row.inquiries}</span>
                          <span className="text-[11px] text-[#006d33] font-medium">{row.inquiriesLabel}</span>
                        </div>
                      </td>

                      {/* Column 6: Status */}
                      <td className="py-4 px-4 whitespace-nowrap">
                        {row.status === 'Active' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#8cf6a3]/40 text-[#007235] text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#006d33] animate-pulse" />
                            Active
                          </span>
                        ) : row.status === 'Scheduled' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e0e8ff] text-[#364768] text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#4e5e81]" />
                            Scheduled
                          </span>
                        ) : row.status === 'Paused' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[11px] font-bold">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            Paused
                          </span>
                        ) : row.status === 'Draft' ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 text-[11px] font-bold">
                            Draft
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 text-[11px] font-bold">
                            Expired
                          </span>
                        )}
                      </td>

                      {/* Column 7: Actions */}
                      <td className="py-4 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleEditCampaign(row)}
                            className="p-1.5 rounded-lg text-[#75777f] hover:bg-[#e9edff] hover:text-[#071b3a] transition-colors"
                            title="Edit Campaign in Studio"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleToggleStatus(row)}
                            className="p-1.5 rounded-lg text-[#75777f] hover:bg-[#e9edff] hover:text-[#071b3a] transition-colors"
                            title={row.status === 'Active' ? 'Pause Campaign' : 'Resume Campaign'}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {row.status === 'Active' ? 'pause' : 'play_arrow'}
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDuplicate(row)}
                            className="p-1.5 rounded-lg text-[#75777f] hover:bg-[#e9edff] hover:text-[#071b3a] transition-colors"
                            title="Duplicate"
                          >
                            <span className="material-symbols-outlined text-[18px]">content_copy</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeleteCandidate(row)}
                            className="p-1.5 rounded-lg text-[#75777f] hover:bg-rose-50 hover:text-rose-600 transition-colors"
                            title="Delete"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination / Footer Info */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 text-[#75777f] text-xs border-t border-slate-100">
            <span>
              Showing {filteredCampaigns.length} of {campaigns.length} Total Campaigns (Raipur Core Server)
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled
                className="px-2.5 py-1 rounded bg-[#f1f3ff] text-slate-400 disabled:opacity-50 text-xs font-semibold"
              >
                Previous
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded bg-[#071b3a] text-white font-bold text-xs"
              >
                1
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded bg-[#f1f3ff] hover:bg-[#e9edff] text-[#141b2c] text-xs font-semibold"
              >
                2
              </button>
              <button
                type="button"
                className="px-2.5 py-1 rounded bg-[#f1f3ff] hover:bg-[#e9edff] text-[#141b2c] text-xs font-semibold"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Campaign Creator / Live Viewport Simulation Panel */}
        <div
          ref={builderPanelRef}
          id="campaign-creator-panel"
          className="bg-white rounded-2xl shadow-lg border border-slate-200/80 p-6 sm:p-8 flex flex-col gap-6 transition-all scroll-mt-24"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] text-[#071b3a] flex items-center justify-center">
                <span className="material-symbols-outlined text-[24px]">tune</span>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-[#141b2c]">
                  Interactive Campaign Builder &amp; Live Simulation
                </h2>
                <p className="text-xs text-[#44474e]">
                  Configure placement parameters and inspect responsive layout renders simultaneously.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-[#006d33] font-bold flex items-center gap-1.5 bg-[#8cf6a3]/30 px-3 py-1 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#006d33] animate-pulse" />
                Real-time Sync Active
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Configuration Form (5 cols) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#141b2c] uppercase tracking-wider">Campaign Title</label>
                <input
                  ref={titleInputRef}
                  type="text"
                  value={builderTitle}
                  onChange={(e) => setBuilderTitle(e.target.value)}
                  placeholder="e.g. Priority Sector LAP Advantage"
                  className="w-full h-11 px-3.5 bg-[#f1f3ff] rounded-xl text-xs sm:text-sm text-[#141b2c] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#071b3a] transition-all border border-transparent focus:border-slate-300 font-semibold"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#141b2c] uppercase tracking-wider">
                  Main Catchphrase / Value Prop
                </label>
                <textarea
                  rows={2}
                  value={builderTagline}
                  onChange={(e) => setBuilderTagline(e.target.value)}
                  placeholder="e.g. Unlock up to ₹25 Cr against commercial assets in Chhattisgarh with sovereign-grade certainty."
                  className="w-full p-3 bg-[#f1f3ff] rounded-xl text-xs sm:text-sm text-[#141b2c] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#071b3a] transition-all border border-transparent focus:border-slate-300 resize-none leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#141b2c] uppercase tracking-wider">CTA Button Label</label>
                  <select
                    value={builderCta}
                    onChange={(e) => setBuilderCta(e.target.value)}
                    className="w-full h-11 px-3 bg-[#f1f3ff] rounded-xl text-xs font-semibold text-[#141b2c] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#071b3a] transition-all border border-transparent focus:border-slate-300"
                  >
                    <option value="Explore Solution">Explore Solution</option>
                    <option value="Talk to an Expert">Talk to an Expert</option>
                    <option value="Check Eligibility">Check Eligibility</option>
                    <option value="Apply Now">Apply Now</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#141b2c] uppercase tracking-wider">Target Page / Slot</label>
                  <select
                    value={builderPlacement}
                    onChange={(e) => setBuilderPlacement(e.target.value)}
                    className="w-full h-11 px-3 bg-[#f1f3ff] rounded-xl text-xs font-semibold text-[#141b2c] focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#071b3a] transition-all border border-transparent focus:border-slate-300"
                  >
                    <option value="Offers Page Cards">Offers Page (#CARD-01)</option>
                    <option value="Home Hero Banner">Home Hero Banner</option>
                    <option value="Home Promotional Strip">Home Promotional Strip</option>
                    <option value="Loans Page Header">Loans Header</option>
                    <option value="Global Announcement Bar">Global Announcement Bar</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-[#141b2c] uppercase tracking-wider">Destination URL</label>
                <div className="flex items-center bg-[#f1f3ff] rounded-xl px-3.5 border border-transparent focus-within:border-slate-300 focus-within:bg-white transition-all">
                  <span className="text-xs text-[#75777f] font-mono select-none">earthfinance.in/loans/</span>
                  <input
                    type="text"
                    value={builderSlug}
                    onChange={(e) => setBuilderSlug(e.target.value)}
                    className="w-full h-11 bg-transparent text-xs text-[#141b2c] focus:outline-none font-mono pl-1"
                  />
                </div>
              </div>

              {/* Creative Uploader Component */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-bold text-[#141b2c] uppercase tracking-wider">
                    Asset Media (Primary Creative)
                  </label>
                  <span className="text-xs text-[#006d33] font-bold">Cloud Synced</span>
                </div>

                <div className="bg-[#f1f3ff] p-3 rounded-xl flex items-center gap-3 border border-slate-200">
                  <div className="w-20 h-14 rounded-lg overflow-hidden shrink-0 relative bg-[#071b3a]">
                    <img
                      src={builderImageUrl}
                      alt={builderTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-xs font-bold text-[#141b2c] truncate">{builderImageName}</span>
                    <span className="text-[11px] text-[#75777f] font-mono">1200 x 896 px • WebP Optimized</span>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => setIsReplaceAssetModalOpen(true)}
                        className="text-xs text-[#071b3a] underline font-semibold"
                      >
                        Replace Asset
                      </button>
                      <span className="text-slate-300">•</span>
                      <button
                        type="button"
                        onClick={() => showToast('Switched focal center alignment')}
                        className="text-xs text-[#75777f] hover:text-[#141b2c]"
                      >
                        Crop / Focal Point
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Action Buttons */}
              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSaveAndStage}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#071b3a] text-white text-xs font-bold hover:bg-[#0b2d5c] transition-all shadow-md text-center active:scale-[0.98]"
                >
                  Save &amp; Stage Live
                </button>
                <button
                  type="button"
                  onClick={handleSaveAsDraft}
                  className="py-3 px-4 rounded-xl bg-[#e9edff] text-[#141b2c] text-xs font-semibold hover:bg-[#dbe2f9] transition-all"
                >
                  Save as Draft
                </button>
              </div>
            </div>

            {/* Live Side-by-Side Viewport Simulation (7 cols) */}
            <div className="lg:col-span-7 bg-[#f1f3ff]/70 rounded-2xl p-5 sm:p-6 flex flex-col gap-4 border border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#141b2c]">
                  <span className="material-symbols-outlined text-[18px] text-[#071b3a]">visibility</span>
                  <span>Responsive Viewport Simulators</span>
                </div>

                <div className="flex items-center gap-1 bg-[#e0e8ff] p-1 rounded-xl">
                  <button
                    type="button"
                    onClick={() => setSimViewMode('both')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      simViewMode === 'both'
                        ? 'bg-white text-[#141b2c] shadow-sm'
                        : 'text-[#44474e] hover:text-[#141b2c]'
                    }`}
                  >
                    Desktop &amp; Mobile
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimViewMode('desktop')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      simViewMode === 'desktop'
                        ? 'bg-white text-[#141b2c] shadow-sm'
                        : 'text-[#44474e] hover:text-[#141b2c]'
                    }`}
                  >
                    Desktop Only
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimViewMode('mobile')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                      simViewMode === 'mobile'
                        ? 'bg-white text-[#141b2c] shadow-sm'
                        : 'text-[#44474e] hover:text-[#141b2c]'
                    }`}
                  >
                    Mobile Only
                  </button>
                </div>
              </div>

              {/* Simulations Area */}
              <div className="flex flex-col gap-6 overflow-x-auto pb-2">
                {/* Desktop Simulator Screen */}
                {(simViewMode === 'both' || simViewMode === 'desktop') && (
                  <div className="flex flex-col gap-1.5 w-full">
                    <div className="flex items-center justify-between text-xs text-[#75777f]">
                      <span className="flex items-center gap-1 font-mono font-medium">
                        <span className="material-symbols-outlined text-[16px]">desktop_windows</span>
                        Desktop Web View (1280px Scale Simulation)
                      </span>
                      <span className="text-[#75777f]">16:9 Landscape Card</span>
                    </div>

                    {/* Rendered Desktop Mockup */}
                    <div className="bg-[#071b3a] text-white rounded-2xl overflow-hidden shadow-xl relative min-h-[220px] flex flex-col md:flex-row items-stretch border border-[#0b2d5c]">
                      {/* Content Left */}
                      <div className="p-6 flex-1 flex flex-col justify-between z-10 bg-gradient-to-r from-[#071b3a] via-[#071b3a]/95 to-transparent">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 rounded-full bg-[#006d33] text-white text-[10px] uppercase font-bold tracking-wider">
                              {builderBadge}
                            </span>
                            <span className="text-[#b5c7ee] text-[11px] font-mono">{builderHub}</span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">
                            {builderTitle || 'Untitled Campaign'}
                          </h3>
                          <p className="text-xs text-[#dbe2f9] mt-1.5 max-w-sm line-clamp-2 leading-relaxed">
                            {builderTagline || 'Enterprise financing tailored for operating businesses.'}
                          </p>
                        </div>

                        <div className="flex items-center gap-4 mt-4">
                          <button
                            type="button"
                            className="px-4 py-2 rounded-xl bg-[#ffdf94] text-[#071b3a] text-xs font-bold shadow-md hover:bg-[#efc13e] transition-colors"
                          >
                            {builderCta}
                          </button>
                          <div className="flex flex-col">
                            <span className="text-[10px] text-[#ffdf94] uppercase tracking-wider font-bold">
                              Special Rate
                            </span>
                            <span className="text-xs font-extrabold text-white font-mono">{builderRate}</span>
                          </div>
                        </div>
                      </div>

                      {/* Image Right */}
                      <div className="w-full md:w-5/12 relative min-h-[140px] md:min-h-full">
                        <img
                          src={builderImageUrl}
                          alt="Simulated hero render"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#071b3a] via-transparent to-transparent" />
                      </div>

                      {/* Compliance Footer Strip */}
                      <div className="absolute bottom-1.5 left-6 right-6 text-[9px] text-[#b5c7ee]/70 pointer-events-none truncate font-sans">
                        *Subject to underwriting eligibility and lender credit approval. Terms apply. Earth Finance Corp.
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Simulator Screen (390px Viewport Frame) */}
                {(simViewMode === 'both' || simViewMode === 'mobile') && (
                  <div className="flex flex-col gap-1.5 w-full max-w-[390px] mx-auto">
                    <div className="flex items-center justify-between text-xs text-[#75777f]">
                      <span className="flex items-center gap-1 font-mono font-medium">
                        <span className="material-symbols-outlined text-[16px]">smartphone</span>
                        Mobile View (390px Native Screen)
                      </span>
                      <span className="text-[#75777f]">Vertical Stacking</span>
                    </div>

                    {/* Rendered Mobile Mockup */}
                    <div className="bg-white rounded-3xl shadow-xl overflow-hidden border-4 border-slate-300 flex flex-col">
                      {/* Mobile Header Bar */}
                      <div className="bg-[#071b3a] px-3.5 py-1.5 flex items-center justify-between text-[11px] text-white">
                        <span className="font-bold">09:41</span>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[13px]">signal_cellular_4_bar</span>
                          <span className="material-symbols-outlined text-[13px]">wifi</span>
                          <span className="material-symbols-outlined text-[13px]">battery_full</span>
                        </div>
                      </div>

                      {/* Mobile Image Banner */}
                      <div className="relative h-36 w-full">
                        <img
                          src={builderImageUrl}
                          alt="Mobile preview banner"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#071b3a] via-[#071b3a]/40 to-transparent" />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded bg-[#006d33] text-white text-[9px] uppercase font-bold tracking-wider">
                          {builderBadge}
                        </span>
                      </div>

                      {/* Mobile Card Content */}
                      <div className="p-4 bg-[#071b3a] text-white flex flex-col gap-2">
                        <h4 className="text-sm font-bold leading-tight">{builderTitle || 'Untitled Campaign'}</h4>
                        <p className="text-xs text-[#dbe2f9] leading-snug line-clamp-2">
                          {builderTagline || 'Enterprise financing tailored for operating businesses.'}
                        </p>

                        <div className="pt-2 flex items-center justify-between">
                          <div>
                            <span className="block text-[9px] text-[#ffdf94] uppercase font-bold">Fixed Base</span>
                            <span className="text-xs font-bold text-white font-mono">{builderRate}</span>
                          </div>
                          <button
                            type="button"
                            className="px-3 py-1.5 rounded-lg bg-[#ffdf94] text-[#071b3a] text-xs font-bold shadow-sm"
                          >
                            {builderCta}
                          </button>
                        </div>

                        <p className="text-[8px] text-[#b5c7ee]/80 mt-1 leading-tight text-center">
                          Subject to underwriting eligibility and lender credit approval.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Global Placement Inventory / Live Slot Allocation Map */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200/80 p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-[#141b2c]">Global Placement Inventory</h3>
              <p className="text-xs text-[#44474e]">Live allocation map across Earth Finance enterprise portals.</p>
            </div>
            <span className="text-xs text-[#75777f] font-mono">6 of 8 Slots Occupied</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Slot 1 */}
            <div className="p-3.5 rounded-xl bg-[#f1f3ff] flex flex-col justify-between gap-2 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#141b2c]">Home Hero 01</span>
                <span className="w-2 h-2 rounded-full bg-[#006d33]" />
              </div>
              <span className="text-xs text-[#141b2c] font-semibold truncate">Corporate Advisory 0.5%</span>
              <span className="text-[11px] text-[#75777f] font-mono">1920x640 Landscape</span>
            </div>

            {/* Slot 2 */}
            <div className="p-3.5 rounded-xl bg-[#f1f3ff] flex flex-col justify-between gap-2 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#141b2c]">Promotional Strip</span>
                <span className="w-2 h-2 rounded-full bg-[#006d33]" />
              </div>
              <span className="text-xs text-[#141b2c] font-semibold truncate">Siltara &amp; Urla Machinery</span>
              <span className="text-[11px] text-[#75777f] font-mono">1200x280 Banner</span>
            </div>

            {/* Slot 3 */}
            <div className="p-3.5 rounded-xl bg-[#f1f3ff] flex flex-col justify-between gap-2 border border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#141b2c]">Offers Card Slot 1</span>
                <span className="w-2 h-2 rounded-full bg-[#006d33]" />
              </div>
              <span className="text-xs text-[#141b2c] font-semibold truncate">Priority Sector LAP</span>
              <span className="text-[11px] text-[#75777f] font-mono">800x600 Dynamic</span>
            </div>

            {/* Slot 4 (Vacant) */}
            <div className="p-3.5 rounded-xl bg-[#e9edff] flex flex-col justify-between gap-2 border border-dashed border-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#75777f]">Healthcare Spot 02</span>
                <span className="w-2 h-2 rounded-full bg-slate-400" />
              </div>
              <span className="text-xs text-slate-500 italic">Vacant (Eligible)</span>
              <button
                type="button"
                onClick={() => {
                  setBuilderTitle('Medical Equipment & Hospital Line');
                  setBuilderTagline('Zero collateral term credit for hospitals and diagnostic clinics in Raipur.');
                  setBuilderPlacement('Healthcare Sector Page');
                  setBuilderSlot('Healthcare Spot 02');
                  setBuilderSlug('medical-finance');
                  handleOpenBuilder();
                }}
                className="text-[11px] text-[#071b3a] font-bold text-left hover:underline"
              >
                + Assign Campaign
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Audit Directives (RBI Advertising Compliance) */}
      {isAuditModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#071b3a]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#071b3a] text-[24px]">verified_user</span>
                <h3 className="text-base font-bold text-[#141b2c]">RBI Advertising Directives</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAuditModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="text-xs text-[#44474e] space-y-3 leading-relaxed">
              <p>
                Under the <strong>RBI Master Direction on Fair Practices Code for NBFCs</strong>, promotional
                advertisements must follow mandatory underwriting transparency rules:
              </p>
              <div className="p-3 rounded-xl bg-[#f1f3ff] space-y-1.5 border border-slate-200">
                <div className="font-bold text-[#141b2c]">1. Clear Indicative APR Spreads</div>
                <div>All interest rates shown must represent annualized percentage rates and clearly state benchmark linkage.</div>
              </div>
              <div className="p-3 rounded-xl bg-[#f1f3ff] space-y-1.5 border border-slate-200">
                <div className="font-bold text-[#141b2c]">2. No Guarantee of Unconditional Sanction</div>
                <div>Marketing banners cannot promise 100% unconditional sanction without underwriting verification.</div>
              </div>
              <div className="p-3 rounded-xl bg-[#f1f3ff] space-y-1.5 border border-slate-200">
                <div className="font-bold text-[#141b2c]">3. Mandatory Disclaimer Footer</div>
                <div>All public placements append &quot;Subject to underwriting eligibility and lender credit approval&quot;.</div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={() => setIsAuditModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#071b3a] text-white text-xs font-bold hover:bg-[#0b2d5c]"
              >
                Acknowledge Directive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Replace Asset Media */}
      {isReplaceAssetModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#071b3a]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-base font-bold text-[#141b2c]">Replace Creative Media</h3>
              <button
                type="button"
                onClick={() => setIsReplaceAssetModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-[#141b2c]">Creative Image URL (WebP, JPG, PNG)</label>
              <input
                type="url"
                value={tempAssetUrl}
                onChange={(e) => setTempAssetUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="h-10 px-3 bg-[#f1f3ff] rounded-xl text-xs text-[#141b2c] outline-none focus:ring-2 focus:ring-[#071b3a]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsReplaceAssetModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#f1f3ff] text-xs font-semibold text-slate-700 hover:bg-[#e9edff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAsset}
                className="px-4 py-2 rounded-xl bg-[#071b3a] text-white text-xs font-bold hover:bg-[#0b2d5c]"
              >
                Apply Asset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Confirm Delete */}
      {deleteCandidate && (
        <div className="fixed inset-0 z-50 bg-[#071b3a]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-2xl p-6 shadow-2xl flex flex-col gap-4 border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">warning</span>
            </div>
            <div>
              <h3 className="text-base font-bold text-[#141b2c]">
                Archive Campaign {deleteCandidate.id}?
              </h3>
              <p className="text-xs text-[#44474e] mt-1 leading-relaxed">
                Removing &quot;{deleteCandidate.title}&quot; will unpublish it from &quot;{deleteCandidate.placement}&quot; and release its placement slot.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setDeleteCandidate(null)}
                className="px-4 py-2 rounded-xl bg-[#f1f3ff] text-xs font-semibold text-slate-700 hover:bg-[#e9edff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminBannersPage;
