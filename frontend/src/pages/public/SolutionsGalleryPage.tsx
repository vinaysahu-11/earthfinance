import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building,
  ArrowRight,
  X,
  Phone,
  CheckCircle2,
  TrendingUp,
  Sparkles,
  Layers,
  Clock,
  Coins,
  FileCheck,
  Calendar,
  ExternalLink,
  Info,
  Check
} from 'lucide-react';
import { SUPPORT_PHONE, OFFICE_ADDRESS } from '../../config/constants';

interface CaseStudyItem {
  id: string;
  category: 'business' | 'property' | 'industrial' | 'medical' | 'education' | 'agro' | 'fleet';
  categoryLabel: string;
  assetId: string;
  badgeLabel: string;
  title: string;
  description: string;
  image?: string;
  iconName?: string;
  gridSpan: string; // e.g. 'lg:col-span-7'
  sanction: string;
  tenure: string;
  moratoriumOrGrace: string;
  lenderType: string;
  turnaroundTime: string;
  specPill1: { label: string; value: string; color?: string };
  specPill2: { label: string; value: string; color?: string };
  specPill3?: { label: string; value: string; color?: string };
  highlights: string[];
}

const GALLERY_DATA: CaseStudyItem[] = [
  {
    id: 'siltara-steel-rolling-mill',
    category: 'industrial',
    categoryLabel: 'Industrial Capex',
    assetId: 'EF-IND-2024',
    badgeLabel: 'Industrial Capex • Siltara',
    title: 'Automated Steel Rolling Mill Capex Line',
    description: '₹18.5 Cr multi-bank syndication for high-speed CNC mill modernization, expanding processing throughput by 140% in Siltara Industrial Zone.',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1UCT3x_4MWy7QaicaSaXNTdjy2ZVzGQM_hdhLJSKWAuHBmDiKUVbZkBrFPPCiWS-01qh5DwRLLf81LQQMy16kvEejyp29vUQHKvBgupkOfA_HpXqiWtvzcrOxtAwS18jUSasaguL3UeYI3C-5xmcqqXoZOWZri4IoWbm7PRod5k_ZHortDV1QXKSHuKXNMpmNTJka5aNYozPVLiUIyYOWhRuSJHEyWU0pbm9JxXUvAQKXUtSPqQTMJROQ',
    gridSpan: 'lg:col-span-7',
    sanction: '₹18.5 Cr',
    tenure: '7 Years',
    moratoriumOrGrace: '9 Mos Moratorium',
    lenderType: 'Consortium (3 PSU Banks)',
    turnaroundTime: '45 Days',
    specPill1: { label: 'Sanction', value: '₹18.5 Cr', color: 'text-primary-container' },
    specPill2: { label: 'Tenure', value: '7 Years' },
    specPill3: { label: 'Moratorium', value: '9 Mos', color: 'text-secondary' },
    highlights: [
      'Audited project report preparation with TEV (Techno-Economic Viability) vetting.',
      'Pari-passu charge structuring across plant machinery, civil structures, and current assets.',
      '100% compliance with RBI and Central Banking consortium debt covenants.'
    ]
  },
  {
    id: 'raipur-office-park-lap',
    category: 'property',
    categoryLabel: 'Property & LAP',
    assetId: 'EF-LAP-2024',
    badgeLabel: 'Property & LAP • Raipur',
    title: 'Commercial Office Park Mortgage & Refinancing',
    description: '₹24 Cr Loan Against Property consolidating high-interest mezzanine debt into structured long-term commercial real estate financing.',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1UBjOAeaRoSthxdWJQflfD_Tg8wyggrKmJjSD3DCiHmTgdpYPfNbjvImswa5eL2nRUimR69FmdVUK3xmunnOaBymBpFNWvQsSWmgm-UAIoW5GOOCxyr9zaWHKsTA9KOG2nBCfULkC285fX6Vx5rP5B7cS1V_MZvCc2HtGpvTZSF6wg3zNUSShzhOvr7iLQcN0knQVQUGTuvfdEM28SqLK94v72eshsnUTnvg5-uFfEiBWLlCJDKiv_orkI',
    gridSpan: 'lg:col-span-5',
    sanction: '₹24.0 Cr',
    tenure: '12 Years Amortization',
    moratoriumOrGrace: 'Nil (Immediate Amortization)',
    lenderType: 'Tier-1 Housing Finance & Private Bank',
    turnaroundTime: '21 Days',
    specPill1: { label: 'LTV Ratio', value: '72%', color: 'text-secondary' },
    specPill2: { label: 'Interest Structure', value: 'Benchmark Linked' },
    highlights: [
      '30-year clear legal title verification and municipal development clearance.',
      'Replaced 14% NBFC bridge debt with 8.95% repo-linked banking line.',
      'Flexible drop-line overdraft tranche included for ongoing tenant fit-outs.'
    ]
  },
  {
    id: 'fmcg-consortium-cc',
    category: 'business',
    categoryLabel: 'Business Finance',
    assetId: 'EF-CC-2024',
    badgeLabel: 'Working Capital • Central India',
    title: 'Consortium Cash Credit Limit for Wholesale FMCG',
    description: '₹12 Cr structured drawing power factoring seasonal inventory bulges and receivables for Chhattisgarh\'s largest confectionery distributor.',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1UCS_UiVGB8rV64SNliZ7UN_945abx5AD4plmB6Yx9knzwnWgPkgyF8sh_CMtv8e-O-0wWBvC8MrCIaTwC679x9hAuJ2zKG1VfSFhjd2ZOuOYD2iyy1P3eTUnULDgNS0JFA10fJm0kFEABIxBC0BizFT8mkEZHE0_MFfX4hLYma1hF8s5G1O6a1ggu9b2DjtdvZCxFoivR27OK7_VHMMbyhqroRhJLZQ3jFygtoqz9hBivHG4URXMVD7kI',
    gridSpan: 'lg:col-span-6',
    sanction: '₹12.0 Cr',
    tenure: 'Annual Renewable CC/OD',
    moratoriumOrGrace: 'Seasonal Margin Relief',
    lenderType: '3 Scheduled Commercial Banks',
    turnaroundTime: '5 Working Days',
    specPill1: { label: 'Disbursal Horizon', value: '5 Working Days', color: 'text-secondary' },
    specPill2: { label: 'Syndication', value: '3 Partner Banks' },
    highlights: [
      'Multi-banking arrangement with Lead Bank holding 60% and Second Bank holding 40%.',
      'Dynamic inventory margin relaxation from 25% down to 15% during festival peaks.',
      'Direct GST 2A/3B reconciliation integrated with bank drawing power statements.'
    ]
  },
  {
    id: 'bhilai-contractor-bg-line',
    category: 'business',
    categoryLabel: 'Business Finance',
    assetId: 'EF-BG-2024',
    badgeLabel: 'Corporate Review • Bhilai',
    title: 'Engineering Contractor Performance Guarantee & BG Line',
    description: '₹6.5 Cr non-fund based limit expansion enabling national tender bids for railway infrastructure electrification projects.',
    image: 'https://lh3.googleusercontent.com/aida/AEtjO1VZMSPZu5EVZMCabor3jIYlyVOJv8LdWyAd9lodWQaukJRSCQGbEGdMXfu1pIOSvM1aIgXBeoOt_eBPfVubC9CKDm88Ud2IqXF_QT5xBcETwKsfN4R-Hq0bMMPs2lxEKziHEYmWfZiqeEgYAhIU9-4ROq6ik0M7hMlDqXfx1_zCITbUcJSiKGuJ1H_1oMWMmc9e2Pz7Rs3m9fcIedxtEEkqUrTXIOyN2ABqkU0hJNQF3QL9D2wzPM4jBw',
    gridSpan: 'lg:col-span-6',
    sanction: '₹6.5 Cr Non-Fund',
    tenure: '18 Months Project Window',
    moratoriumOrGrace: 'Performance Release Milestones',
    lenderType: 'Nationalized PSU Bank Limit',
    turnaroundTime: '48 Hours Expedited',
    specPill1: { label: 'Turnaround', value: '48 Hours', color: 'text-secondary' },
    specPill2: { label: 'Collateral Margin', value: 'Zero Margin Relief', color: 'text-primary-container' },
    highlights: [
      'Cash collateral reduced from 25% down to 5% with corporate guarantees.',
      'Instant tender guarantee issuance via dedicated branch desk in Bhilai.',
      'Seamless conversion to inland Letters of Credit for steel procurement.'
    ]
  },
  {
    id: 'rajnandgaon-rice-mill',
    category: 'agro',
    categoryLabel: 'Agro & Food Processing',
    assetId: 'EF-AGRO-2024',
    badgeLabel: 'Agro Processing • Rajnandgaon',
    title: 'Modern Parboiled Rice Mill Silo & Packaging Facility',
    description: '₹9.0 Cr capex credit structured under Central Food Processing credit linked subsidy scheme with customized interest subvention.',
    gridSpan: 'lg:col-span-4',
    iconName: 'agriculture',
    sanction: '₹9.00 Cr',
    tenure: '8 Years with Capital Subsidy',
    moratoriumOrGrace: '12 Mos Construction Moratorium',
    lenderType: 'State Bank & NABARD Refinance',
    turnaroundTime: '30 Days Complete Setup',
    specPill1: { label: 'Sanction Amount', value: '₹9.00 Cr' },
    specPill2: { label: 'Subsidy Status', value: 'NABARD / MoFPI Verified', color: 'text-secondary' },
    highlights: [
      'Claimed 35% capital investment subsidy under Central Ministry of Food Processing scheme.',
      '5% interest subvention for 5 consecutive operating years through CSIDC integration.',
      'Silo storage asset hypothecation covering primary security requirements.'
    ]
  },
  {
    id: 'bilaspur-ct-scanner-lease',
    category: 'medical',
    categoryLabel: 'Medical & Healthcare',
    assetId: 'EF-MED-2024',
    badgeLabel: 'Healthcare • Bilaspur',
    title: 'Multi-Slice 128-Slice CT Scanner & ICU Suite Lease',
    description: '₹4.5 Cr specialized medical equipment line with deferred initial amortization tailored to hospital revenue gestation cycles.',
    gridSpan: 'lg:col-span-4',
    iconName: 'local_hospital',
    sanction: '₹4.50 Cr',
    tenure: '5 Years Direct Equipment Lease',
    moratoriumOrGrace: '6 Mos Gestation Moratorium',
    lenderType: 'Specialized Medical NBFC Line',
    turnaroundTime: '14 Calendar Days',
    specPill1: { label: 'Tenure', value: '5 Years Asset-Backed' },
    specPill2: { label: 'Disbursal Type', value: 'Vendor Direct Escrow', color: 'text-secondary' },
    highlights: [
      'Zero real estate mortgage required; scanner asset itself hypothecated.',
      'Tripartite escrow agreement executed directly with international medical OEM.',
      'Structured step-up repayments matching patient diagnostic volume growth.'
    ]
  },
  {
    id: 'raipur-cbse-campus-term-loan',
    category: 'education',
    categoryLabel: 'Education Institutions',
    assetId: 'EF-EDU-2024',
    badgeLabel: 'Education • Raipur',
    title: 'CBSE School Science Wing & Academic Campus Expansion',
    description: '₹7.5 Cr infrastructure term loan for an accredited educational trust with staggered drawdown matching Phase-II construction milestones.',
    gridSpan: 'lg:col-span-4',
    iconName: 'school',
    sanction: '₹7.50 Cr',
    tenure: '10 Years Amortization with Milestones',
    moratoriumOrGrace: 'Staggered Tranche Disbursal',
    lenderType: 'Consortium Infrastructure Book',
    turnaroundTime: '28 Days Sanction',
    specPill1: { label: 'Tenure', value: '10 Years Long-Horizon' },
    specPill2: { label: 'Cost of Funds', value: 'Sub-Prime Institutional', color: 'text-secondary' },
    highlights: [
      'Society 12A/80G compliance vetting and tuition fee escrow structuring.',
      'Tranche disbursements linked directly to certified architect progress certificates.',
      'Long repayment horizon of 120 months providing low monthly debt service pressure.'
    ]
  },
  {
    id: 'korba-mining-tipper-fleet',
    category: 'fleet',
    categoryLabel: 'Commercial Fleet',
    assetId: 'EF-FLEET-2024',
    badgeLabel: 'Commercial Fleet • Korba',
    title: 'Mining Tipper Fleet & Heavy Transit Vehicle Package',
    description: '₹5.2 Cr vehicle financing package covering 24 high-capacity commercial tippers and trailers for coal transit operations in the Korba mineral belt.',
    gridSpan: 'lg:col-span-12',
    sanction: '₹5.20 Cr',
    tenure: '4 Years Fleet Amortization',
    moratoriumOrGrace: 'Quarterly Seasonal Moratorium',
    lenderType: 'Commercial Vehicle NBFC & Private Bank',
    turnaroundTime: '7 Working Days Bulk Allotment',
    specPill1: { label: 'Funding Coverage', value: '90% On-Road', color: 'text-secondary' },
    specPill2: { label: 'Fleet Size', value: '24 Heavy Units' },
    specPill3: { label: 'Rate Structure', value: 'Concession Slab', color: 'text-primary-container' },
    highlights: [
      'Direct OEM fleet pricing discounts negotiated via manufacturer corporate tie-ups.',
      'Comprehensive in-built transit insurance and RTO road tax bundled into loan tranches.',
      'Customized monsoon quarter repayment reduction matching seasonal quarry shutdowns.'
    ]
  }
];

export const SolutionsGalleryPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedModalItem, setSelectedModalItem] = useState<CaseStudyItem | null>(null);

  const categories = useMemo(
    () => [
      { key: 'all', label: 'All Solutions', count: GALLERY_DATA.length },
      { key: 'business', label: 'Business Finance' },
      { key: 'property', label: 'Property & LAP' },
      { key: 'industrial', label: 'Industrial Capex' },
      { key: 'medical', label: 'Medical & Healthcare' },
      { key: 'education', label: 'Education Institutions' },
      { key: 'agro', label: 'Agro & Food Processing' },
      { key: 'fleet', label: 'Commercial Fleet' }
    ],
    []
  );

  const filteredCards = useMemo(() => {
    if (activeCategory === 'all') return GALLERY_DATA;
    return GALLERY_DATA.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="w-full bg-surface">
      {/* 1. HERO SECTION */}
      <section className="relative bg-primary-container text-surface-container-lowest px-4 sm:px-6 lg:px-8 py-14 lg:py-24 overflow-hidden">
        {/* Ambient architectural vector glow & blueprint geometry */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" fill="none" viewBox="0 0 1000 600" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern height="40" id="grid-blueprint" patternUnits="userSpaceOnUse" width="40">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"></path>
              </pattern>
            </defs>
            <rect fill="url(#grid-blueprint)" height="600" width="1000"></rect>
            <circle cx="850" cy="120" r="260" stroke="#ffdf94" strokeDasharray="8 8" strokeWidth="1.5"></circle>
            <line stroke="#b5c7ee" strokeDasharray="4 4" strokeWidth="1" x1="200" x2="800" y1="0" y2="600"></line>
          </svg>
        </div>

        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-surface-tint/20 blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto flex flex-col items-start gap-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-tertiary-fixed text-xs tracking-wider uppercase shadow-sm border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#F4C542] animate-ping"></span>
            <span className="font-bold">Visual Solutions &amp; Syndication Showcase</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white max-w-4xl leading-tight">
            Our Financial Solutions &amp; <span className="text-tertiary-fixed text-[#F4C542]">Project Deployments</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl leading-relaxed">
            Explore key credit facilities, enterprise case studies, and specialized funding structures architected by Earth Finance across Central India.
          </p>

          {/* Key Aggregate Micro Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 w-full max-w-4xl">
            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm shadow-sm border border-white/10">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F4C542]">₹350+ Cr</p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider mt-1 font-semibold">
                Syndicated Debt
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm shadow-sm border border-white/10">
              <p className="text-2xl sm:text-3xl font-extrabold text-emerald-400">85+</p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider mt-1 font-semibold">
                Industrial Projects
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm shadow-sm border border-white/10">
              <p className="text-2xl sm:text-3xl font-extrabold text-white">48 Hrs</p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider mt-1 font-semibold">
                Average Sanction Review
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 backdrop-blur-sm shadow-sm border border-white/10">
              <p className="text-2xl sm:text-3xl font-extrabold text-[#F4C542]">100%</p>
              <p className="text-[11px] text-slate-300 uppercase tracking-wider mt-1 font-semibold">
                Consortium Adherence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY FILTER (Sticky Tab Strip) */}
      <section className="sticky top-20 z-40 bg-surface-container-lowest shadow-sm py-3 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto no-scrollbar py-1 gap-2">
          <div className="flex items-center gap-2 flex-nowrap" id="gallery-filters">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setActiveCategory(cat.key)}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-primary-container text-white shadow-sm'
                      : 'bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span>{cat.label}</span>
                  {cat.key === 'all' && (
                    <span className="px-1.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed text-[11px] font-bold">
                      {cat.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant pl-4 shrink-0">
            <span className="material-symbols-outlined text-[16px] text-secondary">verified_user</span>
            <span>Institutional Grade Syndication</span>
          </div>
        </div>
      </section>

      {/* 3. SOPHISTICATED MASONRY / GRID GALLERY */}
      <section className="px-4 sm:px-6 lg:px-8 py-10 lg:py-16 bg-surface">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Section Intro Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs text-on-secondary-container bg-secondary-container/40 px-3 py-1 rounded-md uppercase tracking-wider font-bold inline-block mb-1">
                Verified Case Deployments
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-on-surface tracking-tight mt-1">
                Commercial &amp; Enterprise Project Portfolio
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-md leading-relaxed">
              Structured debt mechanisms delivered in collaboration with top nationalized, private banks and institutional NBFC consortiums across Chhattisgarh.
            </p>
          </div>

          {/* Responsive Mosaic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 sm:gap-8" id="showcase-grid">
            {filteredCards.map((card) => {
              const isLargeSpan = card.gridSpan === 'lg:col-span-12';
              const isAgroOrMedOrEdu = card.gridSpan === 'lg:col-span-4';

              // Card 8: Fleet Banner Format (Full 12 cols)
              if (isLargeSpan) {
                return (
                  <article
                    key={card.id}
                    className="lg:col-span-12 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 group"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
                      <div className="lg:col-span-8 p-6 sm:p-8 lg:p-10 space-y-4">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="px-3 py-1 bg-primary-container text-white text-xs rounded-md uppercase tracking-wider font-bold">
                            {card.badgeLabel}
                          </span>
                          <span className="px-3 py-1 bg-secondary-container/40 text-on-secondary-container text-xs rounded-md font-semibold">
                            Mining Logistics Corridor
                          </span>
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold text-on-surface group-hover:text-primary-container transition-colors">
                          {card.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl leading-relaxed">
                          {card.description}
                        </p>

                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                          <div>
                            <span className="text-[11px] text-on-surface-variant block font-medium">Funding Coverage</span>
                            <span className="text-xl sm:text-2xl font-extrabold text-secondary">
                              {card.specPill1.value}
                            </span>
                          </div>
                          <div>
                            <span className="text-[11px] text-on-surface-variant block font-medium">Fleet Size</span>
                            <span className="text-xl sm:text-2xl font-extrabold text-on-surface">
                              {card.specPill2.value}
                            </span>
                          </div>
                          <div>
                            <span className="text-[11px] text-on-surface-variant block font-medium">Rate Structure</span>
                            <span className="text-xl sm:text-2xl font-extrabold text-[#071B3A]">
                              {card.specPill3?.value}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="lg:col-span-4 bg-surface-container-low p-6 sm:p-8 flex flex-col justify-center gap-4 h-full border-t lg:border-t-0 lg:border-l border-slate-200">
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                            <span>Direct OEM Tie-up Pricing</span>
                          </div>
                          <div className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                            <span>Instant RTO &amp; Comprehensive Insurance</span>
                          </div>
                          <div className="flex items-center gap-2 text-on-surface-variant text-xs font-semibold">
                            <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                            <span>Customized Quarterly Moratorium</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedModalItem(card)}
                          className="w-full py-3 px-4 bg-tertiary-fixed hover:bg-tertiary-fixed-dim text-[#071B3A] text-xs sm:text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2"
                        >
                          <span>View Details &amp; Fleet Term Sheet</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              }

              // 4-Column Minimal Cards (Agro, Medical, Education)
              if (isAgroOrMedOrEdu) {
                return (
                  <article
                    key={card.id}
                    className="lg:col-span-4 bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-slate-200"
                  >
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between bg-gradient-to-b from-surface-container-low to-surface-container-lowest space-y-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="px-3 py-1 bg-secondary/10 text-secondary text-xs rounded-md uppercase tracking-wider font-bold">
                            {card.badgeLabel}
                          </span>
                          <span className="material-symbols-outlined text-secondary text-[24px]">
                            {card.iconName || 'verified'}
                          </span>
                        </div>

                        <h3 className="text-base sm:text-lg font-bold text-on-surface group-hover:text-primary-container transition-colors leading-snug">
                          {card.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                          {card.description}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-slate-100 space-y-4">
                        <div className="space-y-1.5 text-xs">
                          <div className="flex items-center justify-between">
                            <span className="text-on-surface-variant">{card.specPill1.label}</span>
                            <span className="font-bold text-on-surface">{card.specPill1.value}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-on-surface-variant">{card.specPill2.label}</span>
                            <span className="font-bold text-secondary">{card.specPill2.value}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedModalItem(card)}
                          className="w-full py-2.5 px-3 rounded-xl bg-surface-container-high hover:bg-primary-container hover:text-white text-on-surface text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                        >
                          <span>View Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              }

              // Standard Image Mosaic Cards (Cards 1, 2, 3, 4)
              return (
                <article
                  key={card.id}
                  className={`${card.gridSpan} bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-slate-200`}
                >
                  <div className="relative w-full h-64 sm:h-72 overflow-hidden bg-primary-container">
                    <img
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={card.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-container/90 via-primary-container/20 to-transparent"></div>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary-container/90 backdrop-blur-md text-tertiary-fixed text-xs rounded-md uppercase tracking-wider font-bold">
                        {card.badgeLabel}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white text-xs">
                      <span className="bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md font-semibold">
                        {card.categoryLabel}
                      </span>
                      <span className="text-slate-300 font-mono text-[11px]">{card.assetId}</span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <h3 className="text-base sm:text-xl font-bold text-on-surface group-hover:text-primary-container transition-colors leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    <div className="pt-4 bg-surface-container-low p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 text-[10px] block uppercase">{card.specPill1.label}</span>
                          <span className="font-bold text-[#071B3A]">{card.specPill1.value}</span>
                        </div>
                        <div className="h-6 w-px bg-slate-300"></div>
                        <div>
                          <span className="text-slate-400 text-[10px] block uppercase">{card.specPill2.label}</span>
                          <span className="font-bold text-slate-800">{card.specPill2.value}</span>
                        </div>
                        {card.specPill3 && (
                          <>
                            <div className="h-6 w-px bg-slate-300"></div>
                            <div>
                              <span className="text-slate-400 text-[10px] block uppercase">{card.specPill3.label}</span>
                              <span className="font-bold text-secondary">{card.specPill3.value}</span>
                            </div>
                          </>
                        )}
                      </div>

                      <button
                        type="button"
                        onClick={() => setSelectedModalItem(card)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071B3A] hover:text-[#1455A0] transition-colors"
                      >
                        <span>View Details &amp; Case Study</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE LIGHTBOX MODAL PREVIEW */}
      {selectedModalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200">
            {/* Modal Header */}
            <div className="bg-primary-container text-white px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-[#071B3A] text-xs font-bold uppercase tracking-wider">
                  {selectedModalItem.categoryLabel}
                </span>
                <span className="text-xs text-slate-300 font-medium">Institutional Dossier</span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedModalItem(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Visual Media Preview */}
              <div className="relative w-full h-56 sm:h-64 rounded-xl overflow-hidden bg-primary-container">
                <img
                  alt={selectedModalItem.title}
                  className="w-full h-full object-cover"
                  src={
                    selectedModalItem.image ||
                    'https://lh3.googleusercontent.com/aida/AEtjO1UCS_UiVGB8rV64SNliZ7UN_945abx5AD4plmB6Yx9knzwnWgPkgyF8sh_CMtv8e-O-0wWBvC8MrCIaTwC679x9hAuJ2zKG1VfSFhjd2ZOuOYD2iyy1P3eTUnULDgNS0JFA10fJm0kFEABIxBC0BizFT8mkEZHE0_MFfX4hLYma1hF8s5G1O6a1ggu9b2DjtdvZCxFoivR27OK7_VHMMbyhqroRhJLZQ3jFygtoqz9hBivHG4URXMVD7kI'
                  }
                />
                <div className="absolute bottom-3 left-3 bg-primary-container/90 backdrop-blur-md px-3 py-1 rounded-md text-white text-xs font-semibold">
                  Confidential Client Syndicate • Chhattisgarh
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold text-[#071B3A]">
                  {selectedModalItem.title}
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Comprehensive multi-lender syndication engineered under Earth Finance's corporate underwriting practice. Designed to optimize capital weighted cost while providing grace periods aligned with trial production runs.
                </p>
              </div>

              {/* Structured Specifications Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-surface-container-low p-4 rounded-xl border border-slate-200">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Sanction Facility</span>
                  <p className="text-sm font-bold text-[#071B3A]">{selectedModalItem.sanction}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Tenure &amp; Grace</span>
                  <p className="text-sm font-bold text-slate-800">{selectedModalItem.tenure}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Lender Type</span>
                  <p className="text-sm font-bold text-slate-800">{selectedModalItem.lenderType}</p>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-on-surface-variant uppercase font-semibold">Execution Time</span>
                  <p className="text-sm font-bold text-secondary">{selectedModalItem.turnaroundTime}</p>
                </div>
              </div>

              {/* Fiduciary Bullet Points */}
              <div className="space-y-2 bg-surface-container/40 p-4 rounded-xl border border-slate-100">
                <p className="text-xs text-on-surface-variant uppercase tracking-wider font-bold">
                  Facility Highlights &amp; Governance
                </p>
                <ul className="text-xs text-on-surface-variant space-y-2">
                  {selectedModalItem.highlights.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-secondary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Action Footer */}
            <div className="bg-surface-container-low px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-200">
              <p className="text-xs text-on-surface-variant text-center sm:text-left">
                Ready to syndicate this facility for your corporate unit?
              </p>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Link
                  to="/book-consultation"
                  onClick={() => setSelectedModalItem(null)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold text-center transition-colors"
                >
                  Book Consultation
                </Link>
                <Link
                  to={`/apply?solution=${encodeURIComponent(selectedModalItem.title)}`}
                  onClick={() => setSelectedModalItem(null)}
                  className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-tertiary-fixed hover:bg-tertiary-fixed-dim text-[#071B3A] text-xs font-bold text-center shadow-sm transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Enquire About This Solution</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. BOTTOM CTA BANNER */}
      <section className="bg-primary-container text-surface px-4 sm:px-6 lg:px-8 py-14 lg:py-20 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary/20 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2.5 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-tertiary-fixed text-xs uppercase tracking-wider font-semibold border border-white/10">
              <span className="material-symbols-outlined text-[16px]">handshake</span>
              <span>Bespoke Underwriting Desk</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Have a Project Requirement Similar to These Deployments?
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Our senior syndication and underwriting team can structure an optimal credit line for your enterprise with customized tenures and lowest institutional rates.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto shrink-0">
            <Link
              to="/apply"
              className="px-6 py-3.5 bg-tertiary-fixed hover:bg-tertiary-fixed-dim text-[#071B3A] text-xs sm:text-sm font-bold rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Apply for Financing</span>
              <TrendingUp className="w-4 h-4" />
            </Link>

            <a
              className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors border border-white/20"
              href={`tel:${SUPPORT_PHONE}`}
            >
              <Phone className="w-4 h-4 text-tertiary-fixed" />
              <span>Talk to an Underwriter: {SUPPORT_PHONE}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
