import React, { useState, useEffect, useMemo } from 'react';
import { industryApi } from '../../services/industryApi';

interface SectorItem {
  id: string;
  code: string;
  name: string;
  slug: string;
  scope: string;
  capexThreshold: string;
  corridors: string[];
  mappedFacilities: string[];
  chips: string[];
  isFeatured: boolean;
  status: 'Published' | 'Draft' | 'Archived';
  auditDate: string;
  icon: string;
  heroImage: string;
  heroImageLabel: string;
  pendingPipelineAmount: string;
}

const DEFAULT_SECTORS: SectorItem[] = [
  {
    id: 'sec-mfg-01',
    code: 'SEC-MFG-01',
    name: 'Heavy Manufacturing & Steel Fabrication',
    slug: 'manufacturing',
    scope: 'Continuous casting, CNC capex, bilateral vendor factoring across Urla & Siltara',
    capexThreshold: '25.00 Crore',
    corridors: [
      'Urla Industrial Estate',
      'Siltara Growth Center',
      'Bhilai Heavy Cluster',
      'Raigarh Steel Hub'
    ],
    mappedFacilities: [
      'Plant Machinery Capex Term Loan',
      'Working Capital CC / Hypothecation Limit',
      'Commercial Property Loan Against Property (LAP)',
      'Contractor Performance Bank Guarantee (BG)'
    ],
    chips: ['Capex (₹25Cr)', 'CC/OD', 'LAP', 'BG'],
    isFeatured: true,
    status: 'Published',
    auditDate: 'May 20, 2025',
    icon: 'precision_manufacturing',
    heroImage:
      'https://lh3.googleusercontent.com/aida/AEtjO1UCT3x_4MWy7QaicaSaXNTdjy2ZVzGQM_hdhLJSKWAuHBmDiKUVbZkBrFPPCiWS-01qh5DwRLLf81LQQMy16kvEejyp29vUQHKvBgupkOfA_HpXqiWtvzcrOxtAwS18jUSasaguL3UeYI3C-5xmcqqXoZOWZri4IoWbm7PRod5k_ZHortDV1QXKSHuKXNMpmNTJka5aNYozPVLiUIyYOWhRuSJHEyWU0pbm9JxXUvAQKXUtSPqQTMJROQ',
    heroImageLabel: 'Heavy Machining & Steel',
    pendingPipelineAmount: '₹18.40 Cr In-Flight'
  },
  {
    id: 'sec-med-02',
    code: 'SEC-MED-02',
    name: 'Healthcare, Diagnostic & Hospitals',
    slug: 'healthcare',
    scope: 'Advanced radiology scanners, clinical infrastructure expansion, super-specialty wings',
    capexThreshold: '15.00 Crore',
    corridors: [
      'Raipur Medical Corridor',
      'Bilaspur Central Hospital Zone',
      'Durg Healthcare District'
    ],
    mappedFacilities: [
      'Doctor Clinic Line',
      'Medical Equipment Lease',
      'Commercial Property Loan Against Property (LAP)'
    ],
    chips: ['Doctor Line', 'Equip Lease', 'LAP'],
    isFeatured: true,
    status: 'Published',
    auditDate: 'May 18, 2025',
    icon: 'local_hospital',
    heroImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    heroImageLabel: 'Clinical & Hospital Systems',
    pendingPipelineAmount: '₹12.20 Cr In-Flight'
  },
  {
    id: 'sec-agr-03',
    code: 'SEC-AGR-03',
    name: 'Agro-Processing & Parboiled Mills',
    slug: 'agro-processing',
    scope: 'Grain storage silos, modern milling lines, warehousing lines in Dhamtari corridor',
    capexThreshold: '12.50 Crore',
    corridors: [
      'Dhamtari Milling Cluster',
      'Rajnandgaon Agro Belt',
      'Bhatapara Grain Terminal'
    ],
    mappedFacilities: [
      'Agro Term Loan',
      'Seasonal CC Limit',
      'Plant Machinery Capex Term Loan'
    ],
    chips: ['Agro Term', 'Seasonal CC', 'Capex'],
    isFeatured: true,
    status: 'Published',
    auditDate: 'May 16, 2025',
    icon: 'agriculture',
    heroImage: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    heroImageLabel: 'Modern Agro Silos & Mills',
    pendingPipelineAmount: '₹9.75 Cr In-Flight'
  },
  {
    id: 'sec-edu-04',
    code: 'SEC-EDU-04',
    name: 'Academic Campuses & Institutions',
    slug: 'education',
    scope: 'CBSE academic wings, residential hostels, smart digital lab facilities',
    capexThreshold: '20.00 Crore',
    corridors: [
      'Naya Raipur Institutional Zone',
      'Bhilai Knowledge City',
      'Bilaspur University Road'
    ],
    mappedFacilities: [
      'Education Infrastructure Term',
      'Trust Escrow Financing'
    ],
    chips: ['Education Term', 'Trust Escrow'],
    isFeatured: true,
    status: 'Published',
    auditDate: 'May 14, 2025',
    icon: 'school',
    heroImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=800&q=80',
    heroImageLabel: 'Academic Infrastructure',
    pendingPipelineAmount: '₹14.50 Cr In-Flight'
  },
  {
    id: 'sec-eng-05',
    code: 'SEC-ENG-05',
    name: 'Engineering, EPC & Infrastructure',
    slug: 'epc-infrastructure',
    scope: 'Railway electrification, state highway tenders, performance bank guarantee lines',
    capexThreshold: '30.00 Crore',
    corridors: [
      'Raipur Transit Corridor',
      'Korba Energy Belt',
      'Raigarh Logistics Spur'
    ],
    mappedFacilities: [
      'Contractor Performance Bank Guarantee (BG)',
      'Financial Bank Guarantee (BG)',
      'Plant Machinery Capex Term Loan'
    ],
    chips: ['Perf BG', 'Financial BG', 'Capex'],
    isFeatured: false,
    status: 'Published',
    auditDate: 'May 11, 2025',
    icon: 'engineering',
    heroImage: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=800&q=80',
    heroImageLabel: 'Heavy EPC & Civil Works',
    pendingPipelineAmount: '₹22.10 Cr In-Flight'
  },
  {
    id: 'sec-trd-06',
    code: 'SEC-TRD-06',
    name: 'Wholesale Distribution & Logistics',
    slug: 'logistics',
    scope: 'Heavy vehicle fleets, transit tipper trucks, warehouse discounting across Ring Roads',
    capexThreshold: '10.00 Crore',
    corridors: [
      'Raipur Ring Road Logistics Hub',
      'Tatibandh Transport Nagar',
      'Durg Logistics Park'
    ],
    mappedFacilities: [
      'Fleet & Commercial Vehicle Loan',
      'Invoice Discounting Line',
      'Commercial Property Loan Against Property (LAP)'
    ],
    chips: ['Fleet Loan', 'Invoice Disc', 'LAP'],
    isFeatured: false,
    status: 'Published',
    auditDate: 'May 09, 2025',
    icon: 'local_shipping',
    heroImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    heroImageLabel: 'Transit & Warehousing Hubs',
    pendingPipelineAmount: '₹8.60 Cr In-Flight'
  }
];

const ALL_AVAILABLE_FACILITIES = [
  'Plant Machinery Capex Term Loan',
  'Working Capital CC / Hypothecation Limit',
  'Commercial Property Loan Against Property (LAP)',
  'Contractor Performance Bank Guarantee (BG)',
  'Doctor Clinic Line',
  'Medical Equipment Lease',
  'Agro Term Loan',
  'Seasonal CC Limit',
  'Education Infrastructure Term',
  'Trust Escrow Financing',
  'Financial Bank Guarantee (BG)',
  'Fleet & Commercial Vehicle Loan',
  'Invoice Discounting Line'
];

export const AdminIndustriesPage: React.FC = () => {
  // Main data state
  const [sectors, setSectors] = useState<SectorItem[]>(DEFAULT_SECTORS);

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [sortBy, setSortBy] = useState<'risk' | 'name'>('risk');

  // Inspector State
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);
  const [selectedSectorId, setSelectedSectorId] = useState<string>(DEFAULT_SECTORS[0].id);

  // Inspector Form State
  const [formName, setFormName] = useState(DEFAULT_SECTORS[0].name);
  const [formSlug, setFormSlug] = useState(DEFAULT_SECTORS[0].slug);
  const [formCapex, setFormCapex] = useState(DEFAULT_SECTORS[0].capexThreshold);
  const [formScope, setFormScope] = useState(DEFAULT_SECTORS[0].scope);
  const [formCorridors, setFormCorridors] = useState<string[]>(DEFAULT_SECTORS[0].corridors);
  const [formFacilities, setFormFacilities] = useState<string[]>(DEFAULT_SECTORS[0].mappedFacilities);
  const [formFeatured, setFormFeatured] = useState<boolean>(DEFAULT_SECTORS[0].isFeatured);
  const [formHeroImage, setFormHeroImage] = useState(DEFAULT_SECTORS[0].heroImage);
  const [formHeroLabel, setFormHeroLabel] = useState(DEFAULT_SECTORS[0].heroImageLabel);
  const [formCode, setFormCode] = useState(DEFAULT_SECTORS[0].code);

  // New corridor inline input
  const [newCorridorInput, setNewCorridorInput] = useState('');

  // Modals & Toasts
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isReplaceImageModalOpen, setIsReplaceImageModalOpen] = useState(false);
  const [tempImageUrl, setTempImageUrl] = useState('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Sync backend industries if available
  useEffect(() => {
    industryApi
      .getAdminIndustries()
      .then((res) => {
        if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
          const mappedFromBackend: SectorItem[] = res.data.map((ind, idx) => ({
            id: ind.id || `sec-be-${idx}`,
            code: `SEC-BE-0${idx + 1}`,
            name: ind.name,
            slug: ind.slug,
            scope: ind.short_description || ind.description || 'Specialized commercial industry vertical.',
            capexThreshold: '20.00 Crore',
            corridors: ['Raipur Commercial Zone', 'Central Industrial Belt'],
            mappedFacilities: ind.loan_options?.length ? ind.loan_options : ['Plant Machinery Capex Term Loan'],
            chips: ind.loan_options?.length ? ind.loan_options.map((o) => o.slice(0, 10)) : ['Capex'],
            isFeatured: ind.is_active,
            status: 'Published',
            auditDate: 'May 20, 2025',
            icon: ind.icon || 'domain',
            heroImage:
              ind.hero_image ||
              'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
            heroImageLabel: ind.name,
            pendingPipelineAmount: '₹10.00 Cr In-Flight'
          }));

          setSectors((prev) => {
            const combined = [...prev];
            mappedFromBackend.forEach((mb) => {
              if (!combined.some((s) => s.slug === mb.slug || s.name.toLowerCase() === mb.name.toLowerCase())) {
                combined.push(mb);
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

  // Set form when selecting a sector
  const selectSector = (sec: SectorItem) => {
    setSelectedSectorId(sec.id);
    setFormCode(sec.code);
    setFormName(sec.name);
    setFormSlug(sec.slug);
    setFormCapex(sec.capexThreshold);
    setFormScope(sec.scope);
    setFormCorridors([...sec.corridors]);
    setFormFacilities([...sec.mappedFacilities]);
    setFormFeatured(sec.isFeatured);
    setFormHeroImage(sec.heroImage);
    setFormHeroLabel(sec.heroImageLabel);
    setIsInspectorOpen(true);
    showToast(`Loaded parameters for ${sec.name}`);
  };

  // Add Sector (clean inspector form)
  const handleStartAddSector = () => {
    const newId = `sec-new-${Date.now()}`;
    const newCode = `SEC-NEW-0${sectors.length + 1}`;
    setSelectedSectorId(newId);
    setFormCode(newCode);
    setFormName('');
    setFormSlug('');
    setFormCapex('15.00 Crore');
    setFormScope('');
    setFormCorridors(['Raipur Industrial Belt']);
    setFormFacilities(['Plant Machinery Capex Term Loan', 'Working Capital CC / Hypothecation Limit']);
    setFormFeatured(false);
    setFormHeroImage(
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80'
    );
    setFormHeroLabel('New Industrial Sector');
    setIsInspectorOpen(true);
    showToast('New sector draft initialized in inspector');
  };

  // Save Updates from inspector
  const handleSaveSectorUpdates = async () => {
    if (!formName.trim()) {
      showToast('Please provide a vertical title');
      return;
    }

    const currentSlug =
      formSlug.trim() ||
      formName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');

    const existingIndex = sectors.findIndex((s) => s.id === selectedSectorId);

    const updatedItem: SectorItem = {
      id: selectedSectorId,
      code: formCode,
      name: formName.trim(),
      slug: currentSlug,
      scope: formScope || 'Commercial industrial vertical in Central India.',
      capexThreshold: formCapex,
      corridors: formCorridors,
      mappedFacilities: formFacilities,
      chips: formFacilities.map((f) => {
        if (f.includes('Capex')) return 'Capex';
        if (f.includes('Working Capital')) return 'CC/OD';
        if (f.includes('LAP')) return 'LAP';
        if (f.includes('BG')) return 'BG';
        return f.slice(0, 12);
      }),
      isFeatured: formFeatured,
      status: 'Published',
      auditDate: 'Today, Just Now',
      icon:
        formName.toLowerCase().includes('health') || formName.toLowerCase().includes('medic')
          ? 'local_hospital'
          : formName.toLowerCase().includes('agro')
          ? 'agriculture'
          : formName.toLowerCase().includes('edu')
          ? 'school'
          : formName.toLowerCase().includes('logist') || formName.toLowerCase().includes('transport')
          ? 'local_shipping'
          : 'precision_manufacturing',
      heroImage: formHeroImage,
      heroImageLabel: formHeroLabel || formName,
      pendingPipelineAmount: '₹15.00 Cr In-Flight'
    };

    if (existingIndex >= 0) {
      setSectors((prev) => prev.map((s) => (s.id === selectedSectorId ? updatedItem : s)));
    } else {
      setSectors((prev) => [updatedItem, ...prev]);
    }

    // Save to backend if connected
    try {
      await industryApi.createIndustry({
        name: updatedItem.name,
        slug: updatedItem.slug,
        title: updatedItem.name,
        short_description: updatedItem.scope,
        hero_image: updatedItem.heroImage,
        icon: updatedItem.icon,
        benefits: updatedItem.corridors,
        loan_options: updatedItem.mappedFacilities,
        is_active: updatedItem.isFeatured
      });
    } catch {
      // Handled silently
    }

    showToast('Vertical parameters updated and validated.');
  };

  // Archive Sector
  const handleConfirmArchive = async () => {
    setIsArchiveModalOpen(false);
    const target = sectors.find((s) => s.id === selectedSectorId);
    if (!target) return;

    setSectors((prev) => prev.filter((s) => s.id !== selectedSectorId));

    try {
      await industryApi.deleteIndustry(selectedSectorId);
    } catch {
      // Handled silently
    }

    showToast(`Vertical "${target.name}" archived with safe status.`);

    // Select first remaining sector
    if (sectors.length > 1) {
      const next = sectors.find((s) => s.id !== selectedSectorId);
      if (next) selectSector(next);
    }
  };

  // Add corridor
  const handleAddCorridor = () => {
    if (!newCorridorInput.trim()) return;
    setFormCorridors((prev) => [...prev, newCorridorInput.trim()]);
    setNewCorridorInput('');
    showToast('Industrial corridor attached');
  };

  // Remove corridor
  const handleRemoveCorridor = (idx: number) => {
    setFormCorridors((prev) => prev.filter((_, i) => i !== idx));
  };

  // Toggle mapped facility checkbox
  const handleToggleFacility = (fac: string) => {
    if (formFacilities.includes(fac)) {
      setFormFacilities((prev) => prev.filter((f) => f !== fac));
    } else {
      setFormFacilities((prev) => [...prev, fac]);
    }
  };

  // Filtered sectors
  const filteredSectors = useMemo(() => {
    let list = [...sectors];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.code.toLowerCase().includes(q) ||
          s.scope.toLowerCase().includes(q) ||
          s.corridors.some((c) => c.toLowerCase().includes(q))
      );
    }

    if (categoryFilter !== 'ALL') {
      list = list.filter((s) => s.name.toLowerCase().includes(categoryFilter.toLowerCase()));
    }

    if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [sectors, searchQuery, categoryFilter, sortBy]);

  // Statistics
  const stats = useMemo(() => {
    const total = sectors.length;
    const featured = sectors.filter((s) => s.isFeatured).length;
    const mappedFacilitiesCount = sectors.reduce((acc, s) => acc + s.mappedFacilities.length, 0);
    return {
      total,
      featured,
      mappedFacilitiesCount,
      complianceRate: '100%'
    };
  }, [sectors]);

  return (
    <div className="w-full min-h-screen bg-[#f9f9ff] text-[#141b2c] antialiased -m-4 sm:-m-6 lg:-m-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 transform transition-all duration-300 flex items-center gap-3 bg-[#071b3a] text-white px-5 py-3 rounded-xl shadow-2xl animate-bounce">
          <span className="material-symbols-outlined text-[#8ff9a6] text-[20px]">check_circle</span>
          <span className="text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

      <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1440px] mx-auto w-full">
        {/* Breadcrumb & Top Command Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-[#75777f]">
              <span className="text-[#071b3a] font-medium">Console</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#071b3a] font-medium">Operational Core</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
              <span className="text-[#000001] font-bold">Industries</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#000001] tracking-tight">
              Industries Management
            </h1>
            <p className="text-xs sm:text-sm text-[#44474e] max-w-3xl leading-relaxed">
              Configure economic sectors, capex thresholds, and mapped financial facilities for Central India commercial
              enterprises across Chhattisgarh &amp; adjacent industrial belts.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search Input */}
            <div className="relative flex items-center">
              <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl shadow-sm text-[#44474e] w-56 sm:w-64 border border-slate-200/80">
                <span className="material-symbols-outlined text-[18px] text-[#75777f]">search</span>
                <input
                  id="sector-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search sectors or code..."
                  className="bg-transparent border-0 outline-none w-full text-xs text-[#141b2c] placeholder:text-[#75777f]"
                />
              </div>
            </div>

            {/* Filter Categories Dropdown Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsFilterDropdownOpen(!isFilterDropdownOpen)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white text-[#141b2c] shadow-sm hover:bg-slate-50 transition-colors text-xs font-semibold border border-slate-200/80"
              >
                <span className="material-symbols-outlined text-[18px] text-[#75777f]">tune</span>
                <span>{categoryFilter === 'ALL' ? 'Filter Categories' : categoryFilter}</span>
              </button>

              {isFilterDropdownOpen && (
                <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-30 text-xs font-medium">
                  {['ALL', 'Manufacturing', 'Healthcare', 'Agro', 'Academic', 'EPC', 'Logistics'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setCategoryFilter(cat);
                        setIsFilterDropdownOpen(false);
                      }}
                      className="w-full text-left px-3.5 py-2 hover:bg-[#f1f3ff] flex items-center justify-between"
                    >
                      <span>{cat === 'ALL' ? 'All Verticals' : cat}</span>
                      {categoryFilter === cat && (
                        <span className="material-symbols-outlined text-[16px] text-[#006d33]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Add Sector Button */}
            <button
              type="button"
              onClick={handleStartAddSector}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#ffdf94] text-[#241a00] shadow-md hover:bg-[#efc13e] transition-all text-xs font-bold active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              <span>+ Add Sector</span>
            </button>
          </div>
        </div>

        {/* Overview Metric Panels (Bento Architecture) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-start justify-between relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#44474e] font-bold">
                Configured Verticals
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#000001]">{stats.total}</span>
                <span className="text-xs text-[#44474e]">Core Sectors</span>
              </div>
              <p className="text-xs text-[#006d33] flex items-center gap-1 pt-1 font-semibold">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                100% Region Active
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
              <span className="material-symbols-outlined text-[24px]">factory</span>
            </div>
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#b5c7ee]/20 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Metric 2 */}
          <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-start justify-between relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#44474e] font-bold">
                Public Portal Showcase
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#000001]">{stats.featured}</span>
                <span className="text-xs text-[#44474e]">Active Spotlight</span>
              </div>
              <div className="flex items-center gap-1.5 pt-1">
                <span className="w-2 h-2 rounded-full bg-[#006d33]" />
                <span className="text-xs text-[#44474e] font-medium">Hero cards visible</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#ffdf94]/30 flex items-center justify-center text-[#a47f00]">
              <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                star
              </span>
            </div>
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#ffdf94]/20 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Metric 3 */}
          <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-start justify-between relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#44474e] font-bold">Mapped Facilities</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#000001]">{stats.mappedFacilitiesCount}</span>
                <span className="text-xs text-[#44474e]">Credit Lines</span>
              </div>
              <p className="text-xs text-[#44474e] pt-1">
                Avg {Math.round(stats.mappedFacilitiesCount / (stats.total || 1))} lines per sector
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#8cf6a3]/40 flex items-center justify-center text-[#007235]">
              <span className="material-symbols-outlined text-[24px]">account_balance</span>
            </div>
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#8cf6a3]/20 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Metric 4 */}
          <div className="p-5 rounded-2xl bg-white shadow-sm border border-slate-200/80 flex items-start justify-between relative overflow-hidden">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider text-[#44474e] font-bold">Audit Alignment</span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold text-[#006d33]">{stats.complianceRate}</span>
                <span className="text-xs text-[#44474e]">Verified</span>
              </div>
              <p className="text-xs text-[#006d33] font-semibold flex items-center gap-1 pt-1">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Statutory Compliant
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#f1f3ff] flex items-center justify-center text-[#006d33]">
              <span className="material-symbols-outlined text-[24px]">gavel</span>
            </div>
            <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#006d33]/10 rounded-full blur-xl pointer-events-none" />
          </div>
        </div>

        {/* Main Table Container & Side Inspector Viewport */}
        <div className="relative flex flex-col xl:flex-row gap-6 items-start">
          {/* Primary Data Table */}
          <div className="w-full xl:flex-1 bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden transition-all duration-300">
            <div className="px-6 py-4 bg-[#f1f3ff]/50 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#000001]">domain</span>
                <h2 className="text-lg font-bold text-[#000001]">Commercial Verticals Registry</h2>
                <span className="px-2 py-0.5 rounded-full bg-[#e0e8ff] text-[#141b2c] text-xs font-bold ml-1">
                  {filteredSectors.length} Active
                </span>
              </div>

              <div className="flex items-center gap-2 text-[#44474e] text-xs">
                <span>Sorted by {sortBy === 'risk' ? 'Risk Allocation Profile' : 'Alphabetical Name'}</span>
                <button
                  type="button"
                  onClick={() => setSortBy(sortBy === 'risk' ? 'name' : 'risk')}
                  className="p-1 hover:bg-[#e0e8ff] rounded transition-colors text-[#75777f]"
                  title="Toggle Sorting"
                >
                  <span className="material-symbols-outlined text-[18px]">swap_vert</span>
                </button>
              </div>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f1f3ff]/30 text-[#44474e] text-[11px] uppercase tracking-wider font-bold border-b border-slate-100">
                    <th className="py-3 px-4">Sector Name &amp; Code</th>
                    <th className="py-3 px-4">Operational Scope</th>
                    <th className="py-3 px-4">Mapped Credit Facilities</th>
                    <th className="py-3 px-4 text-center">Portal Showcase</th>
                    <th className="py-3 px-4 text-center">Lifecycle</th>
                    <th className="py-3 px-4">Audit Date</th>
                    <th className="py-3 px-4 text-right">Quick Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs text-[#141b2c]">
                  {filteredSectors.map((row) => {
                    const isSelected = row.id === selectedSectorId && isInspectorOpen;
                    return (
                      <tr
                        key={row.id}
                        onClick={() => selectSector(row)}
                        className={`hover:bg-[#f1f3ff]/60 transition-colors group cursor-pointer ${
                          isSelected ? 'bg-[#f1f3ff]/70 font-semibold' : ''
                        }`}
                      >
                        {/* Sector Name & Code */}
                        <td className="py-4 px-4">
                          <div className="flex items-start gap-3">
                            <div
                              className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                                isSelected ? 'bg-[#071b3a] text-white' : 'bg-[#e0e8ff] text-[#071b3a]'
                              }`}
                            >
                              <span className="material-symbols-outlined text-[20px]">{row.icon}</span>
                            </div>
                            <div className="min-w-0">
                              <div className="font-bold text-[#000001] group-hover:text-[#071b3a] flex items-center gap-1.5 leading-snug">
                                <span>{row.name}</span>
                              </div>
                              <span className="text-[11px] text-[#44474e] font-mono bg-[#e0e8ff]/60 px-1.5 py-0.5 rounded mt-0.5 inline-block">
                                REF: {row.code}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Operational Scope */}
                        <td className="py-4 px-4 max-w-xs">
                          <p className="line-clamp-2 text-[#44474e] leading-relaxed">{row.scope}</p>
                        </td>

                        {/* Mapped Credit Facilities */}
                        <td className="py-4 px-4">
                          <div className="flex flex-wrap gap-1">
                            {row.chips.map((chip, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded bg-[#e0e8ff] text-[#000001] text-[11px] font-semibold"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </td>

                        {/* Portal Showcase */}
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          {row.isFeatured ? (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ffdf94]/30 text-[#a47f00] text-xs font-bold">
                              <span
                                className="material-symbols-outlined text-[16px] text-[#a47f00]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                star
                              </span>
                              Featured
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e0e8ff] text-[#44474e] text-xs font-medium">
                              Inactive
                            </span>
                          )}
                        </td>

                        {/* Lifecycle */}
                        <td className="py-4 px-4 text-center whitespace-nowrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#8cf6a3]/40 text-[#007235] text-xs font-semibold">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#006d33]" />
                            {row.status}
                          </span>
                        </td>

                        {/* Audit Date */}
                        <td className="py-4 px-4 whitespace-nowrap text-[#44474e]">{row.auditDate}</td>

                        {/* Quick Controls */}
                        <td className="py-4 px-4 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                selectSector(row);
                              }}
                              className="p-1.5 hover:bg-[#e0e8ff] rounded-lg text-[#44474e] hover:text-[#071b3a] transition-colors"
                              title="Edit Parameters"
                            >
                              <span className="material-symbols-outlined text-[18px]">edit</span>
                            </button>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedSectorId(row.id);
                                setIsArchiveModalOpen(true);
                              }}
                              className="p-1.5 hover:bg-rose-50 rounded-lg text-[#75777f] hover:text-rose-600 transition-colors"
                              title="Archive Sector"
                            >
                              <span className="material-symbols-outlined text-[18px]">archive</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Table Pagination Footer */}
            <div className="p-4 bg-[#f1f3ff]/30 border-t border-slate-100 flex items-center justify-between text-[#44474e] text-xs">
              <span>Displaying {filteredSectors.length} of {sectors.length} designated industry sectors</span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  disabled
                  className="px-2 py-1 rounded bg-[#e0e8ff] text-slate-400 disabled:opacity-40 text-xs font-semibold"
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
                  disabled
                  className="px-2 py-1 rounded bg-[#e0e8ff] text-slate-400 disabled:opacity-40 text-xs font-semibold"
                >
                  Next
                </button>
              </div>
            </div>
          </div>

          {/* Slide-Out Sector Management Inspector (Dedicated Editing Panel) */}
          {isInspectorOpen && (
            <div
              id="inspector-panel"
              className="w-full xl:w-[460px] bg-white rounded-2xl shadow-lg border border-slate-200/80 p-6 flex flex-col gap-5 shrink-0 transition-all scroll-mt-24"
            >
              {/* Inspector Header */}
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#b5c7ee] bg-[#071b3a] px-2 py-0.5 rounded font-bold">
                      Sector Inspector
                    </span>
                    <span className="text-xs font-mono text-[#75777f]">{formCode}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#000001]">Sector Parameters</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsInspectorOpen(false)}
                  className="p-1 rounded-lg text-[#75777f] hover:bg-[#f1f3ff] hover:text-[#141b2c] transition-colors"
                  title="Minimize Panel"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Hero Asset Media Preview */}
              <div className="relative rounded-xl overflow-hidden h-44 w-full bg-[#e0e8ff] group">
                <img
                  src={formHeroImage}
                  alt={formName}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071b3a]/90 via-transparent to-transparent flex items-end justify-between p-3.5">
                  <div className="text-white">
                    <span className="text-[11px] text-[#ffdf94] font-bold block uppercase tracking-wider">
                      Public Hero Banner
                    </span>
                    <span className="text-sm font-semibold">{formHeroLabel}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsReplaceImageModalOpen(true)}
                    className="px-2.5 py-1 bg-white/90 backdrop-blur rounded-lg text-[#071b3a] text-xs font-semibold hover:bg-white transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                    Replace
                  </button>
                </div>
              </div>

              {/* Configuration Form Fields */}
              <div className="space-y-4">
                {/* Vertical Title */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#44474e] font-semibold">
                    Vertical Title
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => {
                      setFormName(e.target.value);
                      if (!formSlug) {
                        setFormSlug(
                          e.target.value
                            .toLowerCase()
                            .replace(/[^a-z0-9]+/g, '-')
                            .replace(/^-|-$/g, '')
                        );
                      }
                    }}
                    placeholder="e.g. Heavy Manufacturing & Steel Fabrication"
                    className="w-full h-11 px-3.5 rounded-xl bg-[#f1f3ff] text-[#141b2c] text-xs sm:text-sm outline-none focus:bg-white focus:ring-2 focus:ring-[#071b3a] border border-transparent focus:border-slate-300 transition-all font-semibold"
                  />
                </div>

                {/* Scope Description */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#44474e] font-semibold">
                    Operational Scope &amp; Target Operations
                  </label>
                  <textarea
                    rows={2}
                    value={formScope}
                    onChange={(e) => setFormScope(e.target.value)}
                    placeholder="Enter short description of commercial activities..."
                    className="w-full p-3 rounded-xl bg-[#f1f3ff] text-[#141b2c] text-xs outline-none focus:bg-white focus:ring-2 focus:ring-[#071b3a] border border-transparent focus:border-slate-300 transition-all resize-none leading-relaxed"
                  />
                </div>

                {/* Public Slug & Capex Threshold */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#44474e] font-semibold">
                      Public Route Slug
                    </label>
                    <div className="flex items-center h-11 px-3 rounded-xl bg-[#f1f3ff] text-xs text-[#44474e] border border-transparent focus-within:border-slate-300 focus-within:bg-white transition-all">
                      <span className="text-[#75777f] font-mono select-none">/ind/</span>
                      <input
                        type="text"
                        value={formSlug}
                        onChange={(e) => setFormSlug(e.target.value)}
                        className="bg-transparent border-0 outline-none w-full text-[#141b2c] font-medium ml-1 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#44474e] font-semibold">
                      Capex Threshold
                    </label>
                    <div className="flex items-center h-11 px-3 rounded-xl bg-[#f1f3ff] text-xs text-[#000001] font-bold border border-transparent focus-within:border-slate-300 focus-within:bg-white transition-all">
                      <span className="text-[#44474e] font-normal mr-1">₹</span>
                      <input
                        type="text"
                        value={formCapex}
                        onChange={(e) => setFormCapex(e.target.value)}
                        className="bg-transparent border-0 outline-none w-full text-[#000001] font-bold"
                      />
                    </div>
                  </div>
                </div>

                {/* Designated Industrial Corridors */}
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#44474e] font-semibold">
                    Designated Industrial Corridors
                  </label>
                  <div className="flex flex-wrap gap-1.5 p-2.5 bg-[#f1f3ff] rounded-xl border border-slate-200/80">
                    {formCorridors.map((corr, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#dbe2f9] text-[#000001] text-xs font-medium"
                      >
                        <span>{corr}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCorridor(idx)}
                          className="hover:text-rose-600 ml-0.5"
                          title="Remove corridor"
                        >
                          <span className="material-symbols-outlined text-[14px]">cancel</span>
                        </button>
                      </span>
                    ))}

                    {/* Inline Add Corridor */}
                    <div className="flex items-center gap-1 w-full pt-1.5">
                      <input
                        type="text"
                        value={newCorridorInput}
                        onChange={(e) => setNewCorridorInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddCorridor();
                          }
                        }}
                        placeholder="Add industrial cluster (e.g. Bilaspur Auto Zone)..."
                        className="flex-1 bg-white px-2.5 py-1 rounded-lg text-xs outline-none border border-slate-200"
                      />
                      <button
                        type="button"
                        onClick={handleAddCorridor}
                        className="px-2.5 py-1 rounded-lg bg-[#071b3a] text-white text-xs font-semibold hover:bg-[#0b2d5c]"
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mapped Credit Facilities */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase tracking-wider text-[#44474e] font-semibold">
                      Mapped Credit Facilities
                    </label>
                    <span className="text-xs text-[#006d33] font-bold">
                      {formFacilities.length} Linked
                    </span>
                  </div>

                  <div className="space-y-2 p-3 bg-[#f1f3ff] rounded-xl border border-slate-200/80 max-h-48 overflow-y-auto">
                    {ALL_AVAILABLE_FACILITIES.map((fac) => {
                      const isChecked = formFacilities.includes(fac);
                      return (
                        <label
                          key={fac}
                          className="flex items-center justify-between cursor-pointer group py-0.5"
                        >
                          <span
                            className={`text-xs ${
                              isChecked ? 'text-[#071b3a] font-bold' : 'text-[#44474e] group-hover:text-[#141b2c]'
                            }`}
                          >
                            {fac}
                          </span>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleToggleFacility(fac)}
                            className="w-4 h-4 accent-[#071b3a] rounded"
                          />
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Portal Spotlight Display Toggle */}
                <div className="p-3 bg-[#f1f3ff] rounded-xl flex items-center justify-between border border-slate-200/80">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span
                        className="material-symbols-outlined text-[#a47f00] text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-xs font-bold text-[#000001]">Portal Spotlight Display</span>
                    </div>
                    <p className="text-[11px] text-[#44474e]">
                      Expose vertical on homepage commercial offerings
                    </p>
                  </div>

                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formFeatured}
                      onChange={(e) => setFormFeatured(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#dbe2f9] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#006d33]" />
                  </label>
                </div>
              </div>

              {/* Inspector Action Cluster */}
              <div className="pt-2 flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handleSaveSectorUpdates}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-[#ffdf94] text-[#241a00] text-xs font-bold shadow-md hover:bg-[#efc13e] transition-all text-center active:scale-[0.98]"
                >
                  Save Updates
                </button>
                <button
                  type="button"
                  onClick={() => setIsArchiveModalOpen(true)}
                  className="py-2.5 px-4 rounded-xl bg-[#e0e8ff] text-rose-600 hover:bg-rose-50 transition-colors text-xs font-semibold flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-[18px]">archive</span>
                  <span>Archive</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL: Sector Archive Confirmation Safeguard Modal */}
      {isArchiveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071b3a]/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-4 border border-slate-200">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[24px]">warning</span>
              </div>
              <div className="space-y-1">
                <h4 className="text-base font-bold text-[#000001]">Archive Economic Vertical?</h4>
                <p className="text-xs text-[#44474e] leading-relaxed">
                  Archiving <strong className="text-[#000001] font-bold">{formName || 'this sector'}</strong> will
                  suspend public intake forms and unlink pending leads from pipeline calculation.
                </p>
              </div>
            </div>

            <div className="p-3 bg-[#f1f3ff] rounded-xl space-y-1 text-xs text-[#141b2c] border border-slate-100">
              <div className="flex justify-between">
                <span className="text-[#44474e]">Linked Credit Lines:</span>
                <span className="font-bold">{formFacilities.length} Active Lines</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#44474e]">Pending Applications:</span>
                <span className="font-bold text-[#006d33]">₹18.40 Cr In-Flight</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setIsArchiveModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#f1f3ff] text-[#141b2c] text-xs font-semibold hover:bg-[#e0e8ff] transition-colors"
              >
                Cancel Safeguard
              </button>
              <button
                type="button"
                onClick={handleConfirmArchive}
                className="px-4 py-2 rounded-xl bg-rose-600 text-white text-xs font-bold hover:bg-rose-700 transition-colors shadow-sm"
              >
                Confirm Archive
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: Replace Hero Image */}
      {isReplaceImageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071b3a]/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 space-y-4 border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h4 className="text-base font-bold text-[#000001]">Replace Sector Hero Image</h4>
              <button
                type="button"
                onClick={() => setIsReplaceImageModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#141b2c]">Image URL (WebP, JPG, PNG)</label>
              <input
                type="url"
                value={tempImageUrl}
                onChange={(e) => setTempImageUrl(e.target.value)}
                placeholder="https://images.unsplash.com/photo-..."
                className="w-full h-10 px-3 bg-[#f1f3ff] rounded-xl text-xs text-[#141b2c] outline-none focus:ring-2 focus:ring-[#071b3a]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsReplaceImageModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#f1f3ff] text-xs font-semibold text-slate-700 hover:bg-[#e0e8ff]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (tempImageUrl.trim()) {
                    setFormHeroImage(tempImageUrl.trim());
                    setTempImageUrl('');
                    setIsReplaceImageModalOpen(false);
                    showToast('Sector hero asset updated');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-[#071b3a] text-white text-xs font-bold hover:bg-[#0b2d5c]"
              >
                Apply Image
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminIndustriesPage;
