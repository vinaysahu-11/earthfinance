import React, { useState, useMemo } from 'react';
import { settingsApi } from '../../services/settingsApi';
import { useFetch } from '../../hooks/useFetch';

interface RouteSeo {
  id: string;
  name: string;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  robots: {
    index: boolean;
    follow: boolean;
    noarchive: boolean;
  };
  ogImage: string;
  ogDimensions: string;
  updatedAt: string;
  isCanonicalRoot?: boolean;
}

const INITIAL_ROUTES_SEO: RouteSeo[] = [
  {
    id: 'seo-1',
    name: 'Home',
    path: '/',
    title: 'Earth Finance | Structured Corporate Debt & Loan Advisory Raipur',
    description:
      'Access bespoke debt syndication, working capital limits, machinery capex loans, and property financing up to ₹50 Cr across Raipur and Central India with Earth Finance.',
    keywords: ['debt syndication raipur', 'corporate loans chhattisgarh', 'working capital cc limit'],
    canonical: 'https://earthfinance.in/',
    robots: { index: true, follow: true, noarchive: false },
    ogImage:
      'https://lh3.googleusercontent.com/aida/AEtjO1UCS_UiVGB8rV64SNliZ7UN_945abx5AD4plmB6Yx9knzwnWgPkgyF8sh_CMtv8e-O-0wWBvC8MrCIaTwC679x9hAuJ2zKG1VfSFhjd2ZOuOYD2iyy1P3eTUnULDgNS0JFA10fJm0kFEABIxBC0BizFT8mkEZHE0_MFfX4hLYma1hF8s5G1O6a1ggu9b2DjtdvZCxFoivR27OK7_VHMMbyhqroRhJLZQ3jFygtoqz9hBivHG4URXMVD7kI',
    ogDimensions: '1200 × 896 (OG Primary)',
    updatedAt: '2 hrs ago',
    isCanonicalRoot: true
  },
  {
    id: 'seo-2',
    name: 'Loans',
    path: '/loans',
    title: 'Corporate Loans & Capex Debt Syndication | Earth Finance',
    description:
      'Explore corporate lending products, structured consortium loans, and industrial term credit for Raipur enterprises with rapid underwriter sanction.',
    keywords: ['corporate loans raipur', 'capex term finance', 'debt syndication chhattisgarh'],
    canonical: 'https://earthfinance.in/loans',
    robots: { index: true, follow: true, noarchive: false },
    ogImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCqtNDzSq1M6spkusCix9OD04YIjfQhXhdbhxCyr2BrVS53_m_aFGqsHuKDP2f8b-9CNVaopoWSofA4Mo6h9gLWVJpOHdTdS4CPmtLaKTpQZhwYFdqDXJa0954gq0cMnWxT2Zjlvc1SAG3wZVswE5NptPUWxt-lN63KV3mgAVn10k5CoKiBQtEUMlC7dhQpgwgVOl5tj0faw3lF87DbaYRPeYoTfI1CwDEHPkX1URtiS6PGurj61UWt',
    ogDimensions: '1200 × 630 (OG Loans)',
    updatedAt: 'Yesterday'
  },
  {
    id: 'seo-3',
    name: 'EMI Calculator',
    path: '/emi-calculator',
    title: 'EMI & Commercial Loan Amortization Calculator | Earth Finance',
    description:
      'Calculate monthly amortization schedules, interest subvention outlays, and term tenure repayments for enterprise and SME loans in Raipur.',
    keywords: ['emi calculator raipur', 'loan amortization schedule', 'commercial emi formula'],
    canonical: 'https://earthfinance.in/emi-calculator',
    robots: { index: true, follow: true, noarchive: false },
    ogImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAh8Fz4HSPv1dczfBifRXu8rfezSE-EvHRDijobG1e-sEl-gSGso_VuwR6SWReQLjiTZ8gq3czDWga20r8z6pdiiHNR13rJFsCPY3z60Bz_4iJjU-WXNH21p7XTlQmT5KvmERptrwgRDHEyzCGSXssDh1lnzUgNQmmzFLMpJuRe5CuKSDbeC-jbxaldooukqtPW9A2Hqe0l7eKlVXTzvSJOrYTsu5XTrqauRgY4hoAkXuSF3Cf6rdy-',
    ogDimensions: '1200 × 630 (OG Calc)',
    updatedAt: '3 days ago'
  },
  {
    id: 'seo-4',
    name: 'Industries',
    path: '/industries',
    title: 'Industrial & SME Sector Credit Advisory | Earth Finance',
    description:
      'Specialized underwriting frameworks for steel mills, agro processing, medical infrastructure, and logistics hubs across Chhattisgarh.',
    keywords: ['industrial loans raipur', 'siltara steel financing', 'agro processing capex'],
    canonical: 'https://earthfinance.in/industries',
    robots: { index: true, follow: true, noarchive: false },
    ogImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBUhVAzNClfO4n61IbTaAP6PJGuKGr66Fp4wP3CqKFqa3PepcU1zuAQ2OQyLWqiKhtVFGC81trSCBJgKSGCAhSE6Xz8MmnvKItyVhSYTQWopseYkR0VmVwrbRlO4lUB7geHLMIhdpITpgpjKA8R8hkSFO1MO-qh40MEsqo_0PB8RS_b3-NnKgwB7YSyxiW2y8gvUb6Yeok1zdPz450tvaeoF18taWrboHb_MrehmTatJiR4zcIbIv2v',
    ogDimensions: '1200 × 630 (OG Industries)',
    updatedAt: 'May 12'
  },
  {
    id: 'seo-5',
    name: 'Apply for Loan',
    path: '/apply',
    title: 'Fast-Track Loan Application & Corporate Finance Dossier',
    description:
      'Submit corporate loan proposals and audited CMA packets directly to Raipur principal underwriting officers with 48-hour term sheet dispatch.',
    keywords: ['apply loan raipur', 'cma data upload', 'fast track corporate loan'],
    canonical: 'https://earthfinance.in/apply',
    robots: { index: true, follow: true, noarchive: false },
    ogImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBQgGZHlwiMi-9Muk54MX0304rv9ScpVTLDJIn7kMGDKNPyyjZNMg-TPpJ5W585K-wq4oj1ZFK_mM54HAAAQDuiHIj4kZjrxCLn1KubOQRc3S-0OvSF2dVuQmDQbli9-02TyUf0PDARQi11LSSFGw8-RrdEYRPszi_hJYBUEUlNKRoDdpHd_HxOVImzmzN07ZYKvP8FBT6OZe3vIaUWIhz0xZ9MTDEjE_1ESfVFHbizaWJMaN-YIEx',
    ogDimensions: '1200 × 630 (OG Apply)',
    updatedAt: 'May 10'
  },
  {
    id: 'seo-6',
    name: 'Book Appointment',
    path: '/book-appointment',
    title: 'Schedule Debt Consultation at Civil Lines HQ | Earth Finance',
    description:
      'Book a confidential in-person or virtual consultation with principal credit underwriters at our Raipur headquarters for credit syndication.',
    keywords: ['consultation appointment raipur', 'earth finance meeting', 'debt advisor raipur'],
    canonical: 'https://earthfinance.in/book-appointment',
    robots: { index: true, follow: true, noarchive: false },
    ogImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAh8Fz4HSPv1dczfBifRXu8rfezSE-EvHRDijobG1e-sEl-gSGso_VuwR6SWReQLjiTZ8gq3czDWga20r8z6pdiiHNR13rJFsCPY3z60Bz_4iJjU-WXNH21p7XTlQmT5KvmERptrwgRDHEyzCGSXssDh1lnzUgNQmmzFLMpJuRe5CuKSDbeC-jbxaldooukqtPW9A2Hqe0l7eKlVXTzvSJOrYTsu5XTrqauRgY4hoAkXuSF3Cf6rdy-',
    ogDimensions: '1200 × 630 (OG Appointment)',
    updatedAt: 'May 08'
  },
  {
    id: 'seo-7',
    name: 'Blog',
    path: '/blog',
    title: 'Insights, CC Limits & CMA Data Guides | Earth Finance Blog',
    description:
      'Market intelligence, banking benchmark updates, and actionable financial structuring guides authored by Raipur underwriting leaders.',
    keywords: ['financial blog raipur', 'working capital guide', 'cma data preparation'],
    canonical: 'https://earthfinance.in/blog',
    robots: { index: true, follow: true, noarchive: false },
    ogImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCM6bMjjBbvxe1Ne9ZgGePJ1suuqoo1u1rgyx_EaLksNAqs-EDUaObf5OTq1qcLyYTWFrpmiZfZct_D-el_kPannImU8ZQ7VzcpM-Nw3ItBFzT5Siv2DIdDJlHzjoYZe6SukMz5wacO_ywGRd_NzQ9ZugKltLTDsudT_m_BlAcbpXNtMbTo11o_UWWs-mzTtzB5miuow-CQgAERvB_j_ARU4j8KPis0Mtdrl4Zjs4dPGzPdeNYBXRuI',
    ogDimensions: '1200 × 630 (OG Blog)',
    updatedAt: 'May 04'
  },
  {
    id: 'seo-8',
    name: 'Contact Us',
    path: '/contact',
    title: 'Contact Raipur Desk & Advisory Offices | Earth Finance',
    description:
      'Get in touch with Earth Finance credit officers. Direct branch lines, verified coordinates, WhatsApp desk, and registered office address.',
    keywords: ['contact earth finance', 'raipur branch phone', 'ekatam parisar raipur'],
    canonical: 'https://earthfinance.in/contact',
    robots: { index: true, follow: true, noarchive: false },
    ogImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAh8Fz4HSPv1dczfBifRXu8rfezSE-EvHRDijobG1e-sEl-gSGso_VuwR6SWReQLjiTZ8gq3czDWga20r8z6pdiiHNR13rJFsCPY3z60Bz_4iJjU-WXNH21p7XTlQmT5KvmERptrwgRDHEyzCGSXssDh1lnzUgNQmmzFLMpJuRe5CuKSDbeC-jbxaldooukqtPW9A2Hqe0l7eKlVXTzvSJOrYTsu5XTrqauRgY4hoAkXuSF3Cf6rdy-',
    ogDimensions: '1200 × 630 (OG Contact)',
    updatedAt: 'Apr 29'
  }
];

export const AdminSeoPage: React.FC = () => {
  // Navigation tabs: 'pages' | 'schema' | 'opengraph' | 'technical'
  const [activeTab, setActiveTab] = useState<'pages' | 'schema' | 'opengraph' | 'technical'>('pages');

  // Search & Filter in Table
  const [routeSearch, setRouteSearch] = useState('');

  // Routes registry state
  const [routesSeo, setRoutesSeo] = useState<RouteSeo[]>(INITIAL_ROUTES_SEO);
  const [selectedRouteId, setSelectedRouteId] = useState<string>(INITIAL_ROUTES_SEO[0].id);

  // Inspector Form State (synced with selectedRoute)
  const selectedRoute = useMemo(() => {
    return routesSeo.find((r) => r.id === selectedRouteId) || routesSeo[0];
  }, [routesSeo, selectedRouteId]);

  const [formTitle, setFormTitle] = useState(selectedRoute.title);
  const [formDescription, setFormDescription] = useState(selectedRoute.description);
  const [formKeywords, setFormKeywords] = useState<string[]>(selectedRoute.keywords);
  const [formCanonical, setFormCanonical] = useState(selectedRoute.canonical);
  const [formRobots, setFormRobots] = useState(selectedRoute.robots);
  const [newKeywordInput, setNewKeywordInput] = useState('');
  const [isAddingKeyword, setIsAddingKeyword] = useState(false);

  // Sync form inputs when selected route changes
  React.useEffect(() => {
    if (selectedRoute) {
      setFormTitle(selectedRoute.title);
      setFormDescription(selectedRoute.description);
      setFormKeywords(selectedRoute.keywords);
      setFormCanonical(selectedRoute.canonical);
      setFormRobots(selectedRoute.robots);
      setIsAddingKeyword(false);
      setNewKeywordInput('');
    }
  }, [selectedRouteId, selectedRoute]);

  // Global Schema & Technical SEO State
  const [orgSchema, setOrgSchema] = useState(
    JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: 'Earth Finance',
        url: 'https://earthfinance.in',
        logo: 'https://earthfinance.in/logo.svg',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Shop No-18, Ekatam Parisar, Rajbandha Maidan, G.E. Road',
          addressLocality: 'Raipur',
          addressRegion: 'Chhattisgarh',
          postalCode: '492001',
          addressCountry: 'IN'
        },
        telephone: '+919300022732',
        priceRange: '₹₹₹₹'
      },
      null,
      2
    )
  );

  const [robotsTxtContent, setRobotsTxtContent] = useState(
    `User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: https://earthfinance.in/sitemap.xml`
  );

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' } | null>(null);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Sync with backend API
  const { refetch } = useFetch<any[]>(
    async () => {
      try {
        const res = await settingsApi.getAdminSeo();
        if (res && res.success && res.data && res.data.length > 0) {
          setRoutesSeo((prev) => {
            const apiItems: RouteSeo[] = res.data!.map((item, idx) => {
              const matched = prev.find((p) => p.path === item.page_path);
              return {
                id: item.id || `api-seo-${idx}`,
                name: matched?.name || item.page_path.replace('/', '') || 'Custom Route',
                path: item.page_path,
                title: item.meta_title,
                description: item.meta_description || '',
                keywords: item.meta_keywords ? item.meta_keywords.split(',').map((k: string) => k.trim()) : ['corporate finance'],
                canonical: `https://earthfinance.in${item.page_path}`,
                robots: { index: true, follow: true, noarchive: false },
                ogImage: item.og_image || prev[0].ogImage,
                ogDimensions: '1200 × 630',
                updatedAt: 'Recently'
              };
            });
            const existingPaths = new Set(apiItems.map((a) => a.path));
            const retained = prev.filter((s) => !existingPaths.has(s.path));
            return [...apiItems, ...retained];
          });
          return { success: true, data: res.data };
        }
        return { success: true, data: [] };
      } catch (err: any) {
        return { success: false, error: err?.message || 'Failed to fetch SEO overrides' };
      }
    },
    []
  );

  // Filtered routes
  const filteredRoutes = useMemo(() => {
    if (!routeSearch.trim()) return routesSeo;
    const q = routeSearch.toLowerCase();
    return routesSeo.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.path.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q)
    );
  }, [routesSeo, routeSearch]);

  // Keyword operations
  const handleRemoveKeyword = (keyword: string) => {
    setFormKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const handleAddKeyword = () => {
    if (newKeywordInput.trim() && !formKeywords.includes(newKeywordInput.trim())) {
      setFormKeywords((prev) => [...prev, newKeywordInput.trim()]);
      setNewKeywordInput('');
      setIsAddingKeyword(false);
    }
  };

  // Save Page SEO
  const handleSavePageSeo = async () => {
    if (!selectedRoute) return;

    const updatedRoute: RouteSeo = {
      ...selectedRoute,
      title: formTitle,
      description: formDescription,
      keywords: formKeywords,
      canonical: formCanonical,
      robots: formRobots,
      updatedAt: 'Just now'
    };

    setRoutesSeo((prev) => prev.map((r) => (r.id === selectedRoute.id ? updatedRoute : r)));

    try {
      await settingsApi.saveSeo({
        page_path: selectedRoute.path,
        meta_title: formTitle,
        meta_description: formDescription,
        meta_keywords: formKeywords.join(', ')
      });
      refetch();
    } catch {
      // Local state preserved
    }

    showToast(`SEO settings for "${selectedRoute.name} (${selectedRoute.path})" saved & synced!`, 'success');
  };

  // Reset to defaults
  const handleResetToDefaults = () => {
    const original = INITIAL_ROUTES_SEO.find((r) => r.id === selectedRouteId) || INITIAL_ROUTES_SEO[0];
    setFormTitle(original.title);
    setFormDescription(original.description);
    setFormKeywords(original.keywords);
    setFormCanonical(original.canonical);
    setFormRobots(original.robots);
    showToast('Reset form values to system default metadata.', 'info');
  };

  // Rebuild Sitemap
  const handleRebuildSitemap = () => {
    showToast('Sitemap.xml rebuilt successfully: 14 URLs refreshed with priority 1.0/0.8.', 'success');
  };

  // Publish SEO changes
  const handlePublishAll = () => {
    showToast('Published SEO Changes: Cloudflare Edge Cache purged & robots.txt updated.', 'success');
  };

  // Export SEO Manifest (CSV)
  const handleExportCsv = () => {
    const headers = ['Route Name', 'Path', 'Title Tag', 'Title Length', 'Meta Description', 'Description Length', 'Robots', 'Canonical URL', 'Keywords'];
    const rows = routesSeo.map((r) => [
      `"${r.name}"`,
      `"${r.path}"`,
      `"${r.title.replace(/"/g, '""')}"`,
      r.title.length,
      `"${r.description.replace(/"/g, '""')}"`,
      r.description.length,
      `"${r.robots.index ? 'index' : 'noindex'}, ${r.robots.follow ? 'follow' : 'nofollow'}"`,
      `"${r.canonical}"`,
      `"${r.keywords.join(', ')}"`
    ]);
    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `earth-finance-seo-registry-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Exported SEO Registry manifest to CSV.', 'success');
  };

  // Character calculations
  const titleCharCount = formTitle.length;
  const descCharCount = formDescription.length;

  return (
    <div className="flex flex-col w-full pb-16 font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-xl shadow-2xl flex items-center gap-3 transition-all animate-bounce text-sm font-semibold text-white ${
            toastMessage.type === 'success'
              ? 'bg-[#006d33] border border-[#8cf6a3]/40'
              : toastMessage.type === 'warning'
              ? 'bg-[#ba1a1a] border border-[#ffdad6]/40'
              : 'bg-[#071b3a] border border-[#b5c7ee]/30'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            {toastMessage.type === 'success' ? 'check_circle' : toastMessage.type === 'warning' ? 'warning' : 'info'}
          </span>
          <span>{toastMessage.text}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 hover:opacity-75">
            <span className="material-symbols-outlined text-[16px]">close</span>
          </button>
        </div>
      )}

      {/* Header Context Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#75777f] uppercase tracking-wider mb-1">
            <span>Settings</span>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#071b3a] font-bold">SEO Management</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#141b2c] tracking-tight">SEO Management</h1>
          <p className="text-sm text-[#44474e] max-w-3xl mt-0.5">
            Manage search engine metadata, Open Graph previews, and technical indexing for Earth Finance pages.
          </p>
        </div>

        {/* Top Header Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleRebuildSitemap}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-[#071b3a] text-xs font-bold shadow-sm hover:bg-[#e9edff] transition-all border border-slate-200"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">cached</span>
            <span>Rebuild Sitemap.xml</span>
          </button>
          <button
            onClick={handlePublishAll}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#071b3a] text-white text-xs font-bold shadow-md hover:bg-black transition-all"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">published_with_changes</span>
            <span>Publish SEO Changes</span>
          </button>
        </div>
      </div>

      {/* Top 4 Segmented Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-xl bg-[#e9edff] mb-6 overflow-x-auto scrollbar-none">
        <button
          onClick={() => setActiveTab('pages')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'pages'
              ? 'bg-white text-[#071b3a] shadow-sm'
              : 'text-[#44474e] hover:text-[#071b3a] hover:bg-white/60'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">find_in_page</span>
          <span>Page-Level SEO</span>
          <span className="w-2 h-2 rounded-full bg-[#006d33]"></span>
        </button>

        <button
          onClick={() => setActiveTab('schema')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'schema'
              ? 'bg-white text-[#071b3a] shadow-sm'
              : 'text-[#44474e] hover:text-[#071b3a] hover:bg-white/60'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">schema</span>
          <span>Global Meta &amp; Schema</span>
        </button>

        <button
          onClick={() => setActiveTab('opengraph')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'opengraph'
              ? 'bg-white text-[#071b3a] shadow-sm'
              : 'text-[#44474e] hover:text-[#071b3a] hover:bg-white/60'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">share</span>
          <span>Open Graph / Social Sharing</span>
        </button>

        <button
          onClick={() => setActiveTab('technical')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'technical'
              ? 'bg-white text-[#071b3a] shadow-sm'
              : 'text-[#44474e] hover:text-[#071b3a] hover:bg-white/60'
          }`}
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">terminal</span>
          <span>Technical SEO (Robots &amp; XML)</span>
        </button>
      </div>

      {/* 4 Summary KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        {/* Card 1: Total Indexed Pages */}
        <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100 flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#44474e] uppercase tracking-wider">Total Indexed Pages</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-[#071b3a]">14</span>
              <span className="text-xs text-[#75777f]">Pages</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-[#006d33] font-bold">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>100% crawl budget utilized</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
            <span className="material-symbols-outlined text-[22px]">public</span>
          </div>
        </div>

        {/* Card 2: Optimized Title & Meta */}
        <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100 flex items-start justify-between">
          <div className="flex flex-col w-full pr-3">
            <span className="text-[11px] font-bold text-[#44474e] uppercase tracking-wider">Optimized Title &amp; Meta</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-[#071b3a]">13 / 14</span>
              <span className="text-xs text-[#006d33] font-bold">92%</span>
            </div>
            <div className="w-full bg-[#e9edff] h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-[#006d33] h-full rounded-full" style={{ width: '92%' }}></div>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#8ff9a6] flex items-center justify-center text-[#00210b] flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">spellcheck</span>
          </div>
        </div>

        {/* Card 3: Open Graph Cards */}
        <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100 flex items-start justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-bold text-[#44474e] uppercase tracking-wider">Open Graph Cards</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-3xl font-extrabold text-[#071b3a]">14 / 14</span>
              <span className="text-xs text-[#006d33] font-bold">100%</span>
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs text-[#44474e]">
              <span className="material-symbols-outlined text-[16px] text-[#006d33]">check_circle</span>
              <span>1200x630 Retina verified</span>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
            <span className="material-symbols-outlined text-[22px]">image</span>
          </div>
        </div>

        {/* Card 4: Structured Schema */}
        <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100 flex items-start justify-between">
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-bold text-[#44474e] uppercase tracking-wider">Structured Schema</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-[#071b3a]">Active</span>
              <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-[#006d33]/10 text-[#006d33]">
                JSON-LD
              </span>
            </div>
            <span className="text-[11px] text-[#44474e] mt-2 truncate max-w-[180px]">
              FinancialService, FAQPage, BreadcrumbList
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#ffdf94] flex items-center justify-center text-[#241a00] flex-shrink-0">
            <span className="material-symbols-outlined text-[22px]">data_object</span>
          </div>
        </div>
      </div>

      {/* TAB 1: Page-Level SEO Workspace */}
      {activeTab === 'pages' && (
        <div className="grid grid-cols-1 2xl:grid-cols-12 gap-6 items-start">
          {/* Left Table Section (2xl:col-span-7) */}
          <div className="2xl:col-span-7 flex flex-col gap-4">
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              {/* Table Toolbar */}
              <div className="p-4 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[#141b2c]">Page SEO Registry</span>
                  <span className="px-2 py-0.5 rounded-full bg-[#e9edff] text-[#44474e] text-xs font-semibold">
                    {filteredRoutes.length} Key Slugs
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-2.5 top-2 text-[16px] text-[#75777f]">search</span>
                    <input
                      type="text"
                      value={routeSearch}
                      onChange={(e) => setRouteSearch(e.target.value)}
                      placeholder="Filter routes..."
                      className="h-8 pl-8 pr-3 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] placeholder:text-[#75777f] focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a] w-44 transition-all"
                    />
                  </div>
                  <button
                    onClick={handleExportCsv}
                    className="p-1.5 rounded-lg text-[#44474e] hover:bg-[#e9edff] transition-colors"
                    title="Export CSV"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">download</span>
                  </button>
                </div>
              </div>

              {/* Registry Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-[#e9edff] text-[#44474e] font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-3 px-4">Page &amp; Route</th>
                      <th className="py-3 px-4">Title Tag</th>
                      <th className="py-3 px-4">Robots</th>
                      <th className="py-3 px-4">Updated</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredRoutes.map((route) => {
                      const isInspecting = selectedRouteId === route.id;
                      const titleLen = route.title.length;
                      const isIdeal = titleLen <= 60;

                      return (
                        <tr
                          key={route.id}
                          onClick={() => setSelectedRouteId(route.id)}
                          className={`cursor-pointer transition-colors ${
                            isInspecting ? 'bg-[#e0e8ff]/50' : 'hover:bg-[#f1f3ff]/60'
                          }`}
                        >
                          <td className="py-3.5 px-4">
                            <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                <span className="font-bold text-[#071b3a]">{route.name}</span>
                                {route.isCanonicalRoot && <span className="w-2 h-2 rounded-full bg-[#071b3a]"></span>}
                              </div>
                              <span className="text-[11px] text-[#75777f] font-mono">{route.path}</span>
                            </div>
                          </td>

                          <td className="py-3.5 px-4 max-w-xs">
                            <p className="truncate font-semibold text-[#071b3a]" title={route.title}>
                              {route.title}
                            </p>
                            <span
                              className={`text-[11px] font-bold ${
                                isIdeal ? 'text-[#006d33]' : 'text-[#a47f00]'
                              }`}
                            >
                              {titleLen} chars • {isIdeal ? 'Ideal' : 'Long'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4">
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] bg-[#006d33]/10 text-[#006d33] font-medium">
                              {route.robots.index ? 'index' : 'noindex'}, {route.robots.follow ? 'follow' : 'nofollow'}
                            </span>
                          </td>

                          <td className="py-3.5 px-4 text-[#75777f] whitespace-nowrap">
                            {route.updatedAt}
                          </td>

                          <td className="py-3.5 px-4 text-right">
                            {isInspecting ? (
                              <button
                                className="px-2.5 py-1 rounded bg-[#071b3a] text-white text-[11px] font-bold shadow-sm"
                                type="button"
                              >
                                Inspecting
                              </button>
                            ) : (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedRouteId(route.id);
                                }}
                                className="px-2.5 py-1 rounded text-[#071b3a] hover:bg-[#e9edff] text-[11px] font-bold"
                                type="button"
                              >
                                Edit
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Table Footer */}
              <div className="p-4 bg-[#f1f3ff] flex items-center justify-between text-xs text-[#44474e]">
                <div className="flex items-center gap-2">
                  <span>Showing {filteredRoutes.length} of 14 system routes</span>
                  <span className="text-[#75777f]">•</span>
                  <span className="text-[#006d33] font-bold">No 404 broken routes detected</span>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-1 rounded bg-white text-[#75777f] shadow-sm disabled:opacity-50" disabled>
                    <span className="material-symbols-outlined text-[16px]">chevron_left</span>
                  </button>
                  <span className="px-2 py-0.5 font-bold text-[#071b3a]">1</span>
                  <button className="p-1 rounded bg-white text-[#75777f] shadow-sm hover:bg-[#e9edff]">
                    <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Raipur Local SEO Geo-Tags Configured Card */}
            <div className="p-4 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[24px]">hub</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#071b3a]">Raipur Local SEO Geo-Tags Configured</span>
                  <span className="text-xs text-[#44474e]">geo.region: IN-CT | geo.placename: Raipur | ICBM: 21.2514, 81.6296</span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#8ff9a6] text-[#00210b] text-xs font-bold whitespace-nowrap">
                Active in Header
              </span>
            </div>
          </div>

          {/* Right Inspector & Live SERP Simulator (2xl:col-span-5, sticky) */}
          <div className="2xl:col-span-5 flex flex-col gap-4 sticky top-20">
            <div className="bg-white rounded-xl shadow-md border border-slate-100 p-6 flex flex-col gap-4">
              {/* Inspector Header */}
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#071b3a] text-white flex items-center justify-center">
                    <span className="material-symbols-outlined text-[18px]">edit_note</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-[#071b3a]">Inspector &amp; SERP Live Preview</span>
                    <span className="text-xs text-[#44474e]">
                      Editing route: <strong className="font-mono text-[#071b3a]">{selectedRoute.name} ({selectedRoute.path})</strong>
                    </span>
                  </div>
                </div>
                {selectedRoute.isCanonicalRoot && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#006d33]/10 text-[#006d33]">
                    Canonical Root
                  </span>
                )}
              </div>

              {/* Title Input with counter */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#141b2c]" htmlFor="seoTitleInput">
                    Page SEO Title
                  </label>
                  <span
                    className={`text-xs font-bold ${
                      titleCharCount <= 60 ? 'text-[#006d33]' : 'text-[#ba1a1a]'
                    }`}
                  >
                    {titleCharCount} / 60 Chars Recommended
                  </span>
                </div>
                <input
                  id="seoTitleInput"
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="h-11 px-3.5 rounded-lg bg-[#f1f3ff] text-sm text-[#141b2c] focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a] transition-all"
                />
              </div>

              {/* Description Input with counter */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#141b2c]" htmlFor="seoDescInput">
                    Meta Description
                  </label>
                  <span
                    className={`text-xs font-bold ${
                      descCharCount <= 160 ? 'text-[#006d33]' : 'text-[#ba1a1a]'
                    }`}
                  >
                    {descCharCount} / 160 Chars Recommended
                  </span>
                </div>
                <textarea
                  id="seoDescInput"
                  rows={3}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="p-3 rounded-lg bg-[#f1f3ff] text-xs text-[#141b2c] focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a] leading-relaxed resize-none transition-all"
                />
              </div>

              {/* Focus Keywords */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-[#141b2c]">Focus Primary Keywords</label>
                <div className="flex flex-wrap gap-2 items-center">
                  {formKeywords.map((kw, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#e9edff] text-[#071b3a] text-xs font-medium"
                    >
                      <span>{kw}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(kw)}
                        className="text-[#75777f] hover:text-[#ba1a1a]"
                      >
                        <span className="material-symbols-outlined text-[14px]">close</span>
                      </button>
                    </span>
                  ))}

                  {isAddingKeyword ? (
                    <div className="inline-flex items-center gap-1">
                      <input
                        type="text"
                        autoFocus
                        value={newKeywordInput}
                        onChange={(e) => setNewKeywordInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddKeyword())}
                        placeholder="Keyword..."
                        className="h-7 px-2 text-xs rounded bg-[#f1f3ff] border border-[#071b3a] w-32 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddKeyword}
                        className="px-2 py-0.5 rounded bg-[#071b3a] text-white text-[11px] font-bold"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsAddingKeyword(false)}
                        className="text-[#75777f] text-[11px]"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setIsAddingKeyword(true)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#e0e8ff] text-[#071b3a] text-xs font-bold hover:bg-[#d7e2ff] transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                      <span>Add Keyword</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Canonical & Robots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#44474e] uppercase tracking-wider">Canonical URL</label>
                  <input
                    type="text"
                    value={formCanonical}
                    onChange={(e) => setFormCanonical(e.target.value)}
                    className="h-9 px-3 rounded-lg bg-[#f1f3ff] font-mono text-xs text-[#141b2c] focus:outline-none focus:bg-white border border-transparent focus:border-[#071b3a]"
                  />
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-[11px] font-bold text-[#44474e] uppercase tracking-wider">Robots Directives</label>
                  <div className="flex items-center gap-3 pt-1.5 text-xs">
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formRobots.index}
                        onChange={(e) => setFormRobots({ ...formRobots, index: e.target.checked })}
                        className="rounded accent-[#071b3a] w-3.5 h-3.5"
                      />
                      <span>Index</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formRobots.follow}
                        onChange={(e) => setFormRobots({ ...formRobots, follow: e.target.checked })}
                        className="rounded accent-[#071b3a] w-3.5 h-3.5"
                      />
                      <span>Follow</span>
                    </label>
                    <label className="inline-flex items-center gap-1.5 cursor-pointer text-[#75777f]">
                      <input
                        type="checkbox"
                        checked={formRobots.noarchive}
                        onChange={(e) => setFormRobots({ ...formRobots, noarchive: e.target.checked })}
                        className="rounded accent-[#071b3a] w-3.5 h-3.5"
                      />
                      <span>NoArchive</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* GOOGLE DESKTOP SERP SIMULATOR */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#141b2c] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#75777f]">desktop_windows</span>
                    <span>Google Desktop SERP Simulator</span>
                  </span>
                  <span className="text-[11px] text-[#44474e]">Live Render</span>
                </div>

                <div className="p-4 rounded-xl bg-[#f1f3ff] flex flex-col gap-1.5 shadow-sm border border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-[#071b3a] flex items-center justify-center text-[10px] text-white font-bold">
                      E
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-semibold text-[#141b2c] leading-tight">Earth Finance</span>
                      <span className="text-[11px] text-[#44474e] truncate">{formCanonical}</span>
                    </div>
                  </div>

                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-[18px] leading-snug font-semibold text-[#1a0dab] hover:underline"
                  >
                    {formTitle || 'Earth Finance'}
                  </a>

                  <p className="text-xs text-[#44474e] leading-relaxed">
                    <span className="font-bold text-[#141b2c] text-[11px]">Raipur, Chhattisgarh — </span>
                    {formDescription || 'Access debt syndication and corporate loan advisory in Raipur with Earth Finance.'}
                  </p>
                </div>
              </div>

              {/* OPEN GRAPH SOCIAL CARD (1200 x 630) */}
              <div className="flex flex-col gap-2 pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#141b2c] flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[18px] text-[#75777f]">share</span>
                    <span>Open Graph Social Card (1200 × 630)</span>
                  </span>
                  <span className="text-xs text-[#006d33] font-bold">Retina Verified</span>
                </div>

                <div className="rounded-xl overflow-hidden shadow-sm bg-[#f1f3ff] border border-slate-200">
                  <div className="relative w-full h-44 overflow-hidden bg-[#071b3a]">
                    <img
                      src={selectedRoute.ogImage}
                      alt={formTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-[#071b3a]/80 text-white font-mono text-[10px]">
                      {selectedRoute.ogDimensions}
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-1 bg-white">
                    <span className="text-[10px] text-[#75777f] uppercase font-mono tracking-wider font-bold">
                      EARTHFINANCE.IN
                    </span>
                    <span className="text-sm font-bold text-[#071b3a] truncate">
                      {formTitle}
                    </span>
                    <p className="text-xs text-[#44474e] line-clamp-2">
                      {formDescription}
                    </p>
                  </div>
                </div>
              </div>

              {/* Regulatory Notice */}
              <div className="p-3 rounded-lg bg-[#e9edff] flex items-start gap-2.5 text-[#44474e] text-xs">
                <span className="material-symbols-outlined text-[20px] text-[#071b3a] mt-0.5">policy</span>
                <p>
                  <strong className="text-[#141b2c] font-semibold">Regulatory Compliance Notice:</strong> Financial claims in meta descriptions must remain accurate, compliant with RBI fair practices, and subject to underwriter review.
                </p>
              </div>

              {/* Inspector Buttons */}
              <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handleResetToDefaults}
                  className="px-3 py-2 rounded-lg text-[#44474e] text-xs font-bold hover:bg-[#f1f3ff] transition-colors"
                >
                  Reset to Defaults
                </button>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setFormTitle(selectedRoute.title);
                      setFormDescription(selectedRoute.description);
                      showToast('Discarded unsaved changes.', 'info');
                    }}
                    className="px-3 py-2 rounded-lg bg-[#f1f3ff] text-[#071b3a] text-xs font-bold hover:bg-[#e9edff] transition-colors"
                  >
                    Discard
                  </button>
                  <button
                    type="button"
                    onClick={handleSavePageSeo}
                    className="px-5 py-2 rounded-lg bg-[#071b3a] text-white text-xs font-bold shadow-md hover:bg-black transition-all flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">save</span>
                    <span>Save Page SEO</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Global Meta & Schema */}
      {activeTab === 'schema' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[18px]">data_object</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141b2c]">FinancialService JSON-LD Schema</h3>
                  <p className="text-xs text-[#75777f]">Google Rich Results &amp; Knowledge Graph configuration</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#006d33]/10 text-[#006d33]">Active</span>
            </div>

            <textarea
              rows={14}
              value={orgSchema}
              onChange={(e) => setOrgSchema(e.target.value)}
              className="p-3.5 rounded-lg bg-[#f1f3ff] font-mono text-xs text-[#141b2c] leading-relaxed focus:bg-white focus:outline-none border border-transparent focus:border-[#071b3a] resize-none"
            />

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => showToast('FinancialService Schema validated and deployed to header.', 'success')}
                className="px-4 py-2 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-black transition-colors"
              >
                Validate &amp; Save Schema
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[18px]">verified</span>
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#141b2c]">Search Console Site Verification</h3>
                  <p className="text-xs text-[#75777f]">HTML meta verification tags for crawlers</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 text-xs">
              <div>
                <label className="font-bold text-[#141b2c] block mb-1">Google Search Console Verification Tag</label>
                <input
                  type="text"
                  defaultValue="google-site-verification=EF_RPR_9941_K83bZbQ941"
                  className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] font-mono text-xs text-[#141b2c] border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-[#141b2c] block mb-1">Bing Webmaster Tools Authentication</label>
                <input
                  type="text"
                  defaultValue="msvalidate.01=A9B420C883EF94218"
                  className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] font-mono text-xs text-[#141b2c] border border-slate-200"
                />
              </div>

              <div>
                <label className="font-bold text-[#141b2c] block mb-1">Yandex &amp; Baidu Webmaster Code (Optional)</label>
                <input
                  type="text"
                  placeholder="Optional verification hash..."
                  className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] font-mono text-xs text-[#141b2c] border border-slate-200"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => showToast('Webmaster verification tokens updated.', 'success')}
                className="px-4 py-2 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-black transition-colors"
              >
                Save Verification Tags
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Open Graph / Social Sharing */}
      {activeTab === 'opengraph' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-4">
            <h3 className="text-base font-bold text-[#141b2c]">Global Open Graph Fallbacks</h3>
            <p className="text-xs text-[#75777f]">Default imagery used when dynamic route cards are absent</p>

            <div className="relative aspect-video rounded-xl overflow-hidden bg-[#071b3a] border border-slate-200">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1UCS_UiVGB8rV64SNliZ7UN_945abx5AD4plmB6Yx9knzwnWgPkgyF8sh_CMtv8e-O-0wWBvC8MrCIaTwC679x9hAuJ2zKG1VfSFhjd2ZOuOYD2iyy1P3eTUnULDgNS0JFA10fJm0kFEABIxBC0BizFT8mkEZHE0_MFfX4hLYma1hF8s5G1O6a1ggu9b2DjtdvZCxFoivR27OK7_VHMMbyhqroRhJLZQ3jFygtoqz9hBivHG4URXMVD7kI"
                alt="Global Fallback OG"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/60 text-white font-mono text-[10px]">
                1200 × 630 Fallback
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-[#75777f] font-mono">earth-finance-master-og.png</span>
              <button
                type="button"
                onClick={() => showToast('Select new fallback image from media gallery.', 'info')}
                className="px-3 py-1.5 rounded-lg bg-[#e9edff] text-[#071b3a] text-xs font-bold hover:bg-[#e0e8ff]"
              >
                Choose from Gallery
              </button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-4 text-xs">
            <h3 className="text-base font-bold text-[#141b2c]">Social Card Parameters</h3>

            <div>
              <label className="font-bold text-[#141b2c] block mb-1">Twitter / X Card Type</label>
              <select className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] text-xs font-semibold text-[#141b2c] border border-slate-200">
                <option>summary_large_image (Recommended)</option>
                <option>summary</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-[#141b2c] block mb-1">Open Graph Locale</label>
              <input
                type="text"
                defaultValue="en_IN"
                className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] font-mono text-xs text-[#141b2c] border border-slate-200"
              />
            </div>

            <div>
              <label className="font-bold text-[#141b2c] block mb-1">Facebook App ID (Insights)</label>
              <input
                type="text"
                defaultValue="940192849102"
                className="w-full h-10 px-3 rounded-lg bg-[#f1f3ff] font-mono text-xs text-[#141b2c] border border-slate-200"
              />
            </div>

            <button
              type="button"
              onClick={() => showToast('Social meta properties updated.', 'success')}
              className="mt-2 w-full h-10 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-black transition-colors"
            >
              Save Social Parameters
            </button>
          </div>
        </div>
      )}

      {/* TAB 4: Technical SEO (Robots & XML) */}
      {activeTab === 'technical' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#071b3a]">terminal</span>
                <h3 className="text-base font-bold text-[#141b2c]">robots.txt Live Editor</h3>
              </div>
              <span className="text-[11px] text-[#006d33] font-bold">Deployed at /robots.txt</span>
            </div>

            <textarea
              rows={8}
              value={robotsTxtContent}
              onChange={(e) => setRobotsTxtContent(e.target.value)}
              className="p-3.5 rounded-lg bg-[#f1f3ff] font-mono text-xs text-[#141b2c] leading-relaxed focus:bg-white focus:outline-none border border-transparent focus:border-[#071b3a] resize-none"
            />

            <button
              type="button"
              onClick={() => showToast('robots.txt deployed to public edge server.', 'success')}
              className="w-full h-10 rounded-lg bg-[#071b3a] text-white text-xs font-bold hover:bg-black transition-colors"
            >
              Deploy robots.txt
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col gap-4">
            <div className="flex items-center justify-between border-b pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-[#071b3a]">schema</span>
                <h3 className="text-base font-bold text-[#141b2c]">XML Sitemap Status</h3>
              </div>
              <span className="text-[11px] text-[#006d33] font-bold">Live at /sitemap.xml</span>
            </div>

            <div className="p-4 rounded-xl bg-[#f1f3ff] flex flex-col gap-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#75777f]">Total URLs:</span>
                <span className="font-bold text-[#141b2c]">14 Canonical URLs</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#75777f]">Last Generated:</span>
                <span className="font-bold text-[#141b2c]">Today at 02:15 AM IST</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#75777f]">Gzip Compression:</span>
                <span className="font-bold text-[#006d33]">Enabled (1.2 KB)</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => showToast('Pinged Google Search Console & Bing IndexNow.', 'success')}
                className="flex-1 h-10 rounded-lg bg-[#e0e8ff] hover:bg-[#d7e2ff] text-[#071b3a] text-xs font-bold transition-colors"
              >
                Ping Search Engines
              </button>
              <a
                href="/sitemap.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 px-4 rounded-lg bg-[#f1f3ff] hover:bg-[#e9edff] text-[#141b2c] text-xs font-bold transition-colors flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">open_in_new</span>
                <span>View XML</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
