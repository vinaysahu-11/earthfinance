import React, { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SUPPORT_PHONE } from '../../config/constants';
import { Modal } from '../../components/common/Modal';
import { EnquiryForm } from '../../components/forms/EnquiryForm';

interface ProductItem {
  id: string;
  group: 'business' | 'property' | 'specialized' | 'personal';
  name: string;
  badge: string;
  badgeColor?: string;
  badgeBg?: string;
  icon: string;
  description: string;
  features: string[];
  metaLabel: string;
  metaValue: string;
  ctaText: string;
  bgCard?: string;
  highlightColor?: string;
  stats?: { label: string; value: string; valueColor?: string }[];
}

export const LoansPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [activeCategory, setActiveCategory] = useState<string>(
    ['all', 'business', 'property', 'specialized', 'personal'].includes(initialCategory)
      ? initialCategory
      : 'all'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const products: ProductItem[] = useMemo(
    () => [
      // 1. BUSINESS FINANCE
      {
        id: 'business-loan',
        group: 'business',
        name: 'Business Loan',
        badge: 'Up to ₹10 Crore',
        badgeBg: 'bg-[#EFFAF3]',
        badgeColor: 'text-[#168B45]',
        icon: 'apartment',
        description:
          'Unsecured and secured expansion loans up to ₹10 Cr designed for plant expansions, branch openings, and tech upgrades.',
        features: [
          'Fast 48-Hour Approval Window',
          'Minimal Business Disruption',
          'Flexible Structured Repayment Tenures'
        ],
        metaLabel: 'Pricing Matrix',
        metaValue: 'Market-Linked Competitive',
        ctaText: 'Check Eligibility'
      },
      {
        id: 'working-capital',
        group: 'business',
        name: 'Working Capital',
        badge: 'Cash-Flow Smoother',
        badgeBg: 'bg-white',
        badgeColor: 'text-primary-container',
        icon: 'sync_alt',
        description:
          'Facilities tailored specifically for seasonal demand cycles, supply chain bottlenecks, and sudden high-volume vendor obligations.',
        features: [
          'Optimized Inventory Financing',
          'Upfront Early Vendor Payment Discounting',
          'Quick Renewal & Facility Enhancements'
        ],
        metaLabel: 'Turnaround',
        metaValue: 'Fast Documentation',
        ctaText: 'Apply for Capital',
        bgCard: 'bg-[#EEF5FF]'
      },
      {
        id: 'cc-limit',
        group: 'business',
        name: 'Cash Credit / CC Limit',
        badge: 'Interest on Use Only',
        badgeBg: 'bg-[#FFF9E6]',
        badgeColor: 'text-[#A47F00]',
        icon: 'account_balance_wallet',
        description:
          'Revolving credit limits linked seamlessly to daily turnover, invoices, and debtor receivables for maximum treasury efficiency.',
        features: [
          'Pay Interest Only on Utilized Balance',
          'Annual Hassle-Free Limit Renewal',
          'Multi-Banking Integration Available'
        ],
        metaLabel: 'Repayment',
        metaValue: 'Dynamic Float Structure',
        ctaText: 'Set Up Credit Limit'
      },

      // 2. PROPERTY FINANCE
      {
        id: 'property-loan',
        group: 'property',
        name: 'Property Loan (Commercial & Retail)',
        badge: 'Acquisitions & Expansion',
        badgeBg: 'bg-surface-container',
        badgeColor: 'text-primary-container',
        icon: 'real_estate_agent',
        description:
          'Acquisition finance customized for corporate offices, retail spaces, industrial warehouses, and mixed-use commercial developments across prime zones in Chhattisgarh.',
        stats: [
          { label: 'Max LTV Ratio', value: 'Up to 75% LTV', valueColor: 'text-primary-container' },
          { label: 'Sanction Speed', value: '7-10 Working Days', valueColor: 'text-secondary' }
        ],
        features: [
          'Title clearance and legal due diligence managed in-house',
          'Flexible amortization options during building construction'
        ],
        metaLabel: 'Type',
        metaValue: 'Commercial Purchase',
        ctaText: 'Apply for Property Loan'
      },
      {
        id: 'lap',
        group: 'property',
        name: 'Mortgage / Loan Against Property (LAP)',
        badge: 'Extended Tenure (15 Yrs)',
        badgeBg: 'bg-[#EFFAF3]',
        badgeColor: 'text-[#168B45]',
        icon: 'home_work',
        description:
          'High-value liquidity against your owned residential, industrial, or commercial assets. Enjoy significantly lower interest rates and gentle monthly amortizations.',
        stats: [
          { label: 'Repayment Window', value: 'Up to 180 Months', valueColor: 'text-primary-container' },
          { label: 'Rate Structure', value: 'Low Cost of Funds', valueColor: 'text-[#168B45]' }
        ],
        features: [
          'Both self-occupied and leased properties eligible',
          'Seamless balance transfer option with top-up limits'
        ],
        metaLabel: 'Tenure',
        metaValue: '15 Years Amortization',
        ctaText: 'Structure Your LAP'
      },

      // 3. SPECIALIZED & INSTITUTIONAL FINANCE
      {
        id: 'industrial-finance',
        group: 'specialized',
        name: 'Industrial Finance',
        badge: 'Capex & Greenfield',
        badgeBg: 'bg-surface-container',
        badgeColor: 'text-primary-container',
        icon: 'factory',
        description:
          'Strategic Capex financing for plant setups, heavy automated machinery, steel fabrication, and greenfield industrial clusters.',
        features: [
          'Equipment & Assembly Line Funding',
          'Custom Moratorium During Commissioning',
          'Letter of Credit (LC) Syndication'
        ],
        metaLabel: 'Structure',
        metaValue: 'Institutional Capex',
        ctaText: 'Finance Industrial Plant'
      },
      {
        id: 'medical-finance',
        group: 'specialized',
        name: 'Doctor / Medical Finance',
        badge: 'Priority Sector Terms',
        badgeBg: 'bg-[#EFFAF3]',
        badgeColor: 'text-[#168B45]',
        icon: 'medical_services',
        description:
          'Specialized credit lines for establishing polyclinics, multi-specialty hospitals, pathology labs, and procuring advanced diagnostic equipment.',
        features: [
          'MRI, CT Scanner & ICU Equipment Loans',
          'Expedited Sanction for Practitioners',
          'Zero Prepayment Penalty Structures'
        ],
        metaLabel: 'Target',
        metaValue: 'Doctors & Clinics',
        ctaText: 'Medical Credit Access'
      },
      {
        id: 'education-finance',
        group: 'specialized',
        name: 'Education Finance',
        badge: 'Institutional Scale',
        badgeBg: 'bg-[#FFF9E6]',
        badgeColor: 'text-[#A47F00]',
        icon: 'school',
        description:
          'Institutional debt funding for private colleges, CBSE schools, and skill academies for hostel builds, smart classrooms, and infrastructure.',
        features: [
          'Campus Infrastructure & Auditoriums',
          'Aligned to Academic Fee Cycles',
          'Long Amortization Options'
        ],
        metaLabel: 'Target',
        metaValue: 'Trusts & Universities',
        ctaText: 'Fund Education Asset'
      },

      // 4. PERSONAL & VEHICLE FINANCE
      {
        id: 'personal-loan',
        group: 'personal',
        name: 'High-Value Personal Loan',
        badge: 'Bespoke Privileges',
        badgeBg: 'bg-surface-container',
        badgeColor: 'text-primary-container',
        icon: 'shield_person',
        description:
          'Tailored personal financing for senior executives, business leaders, and professionals. Rapid digital processing with complete confidentiality and no collateral.',
        stats: [
          { label: 'Loan Quantum', value: 'Up to ₹50 Lakhs', valueColor: 'text-primary-container' },
          { label: 'Processing Speed', value: '24-48 Hours', valueColor: 'text-secondary' }
        ],
        features: [
          'Unsecured facility requiring zero pledged assets',
          'Direct VIP relationship manager assigned to your application'
        ],
        metaLabel: 'Security',
        metaValue: '100% Clean Credit Line',
        ctaText: 'Apply for Personal Facility'
      },
      {
        id: 'vehicle-loan',
        group: 'personal',
        name: 'Commercial & Executive Vehicle Loan',
        badge: 'Fleet & Luxury Class',
        badgeBg: 'bg-[#EFFAF3]',
        badgeColor: 'text-[#168B45]',
        icon: 'local_shipping',
        description:
          'Strategic fleet funding for logistics and mining operators across Central India, alongside premium financing for luxury executive company vehicles.',
        stats: [
          { label: 'Vehicle Coverage', value: 'Up to 90% on On-Road', valueColor: 'text-primary-container' },
          { label: 'Fleet Scale', value: 'Single to 100+ Units', valueColor: 'text-[#168B45]' }
        ],
        features: [
          'Fast tie-ups with leading Indian automobile OEMs',
          'Flexible moratorium structures for heavy commercial trucks'
        ],
        metaLabel: 'Fleet',
        metaValue: 'Commercial & Executive',
        ctaText: 'Explore Fleet Rates'
      }
    ],
    []
  );

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.group === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.features.some((f) => f.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, searchQuery]);

  const groups = [
    {
      id: 'business',
      num: '1',
      title: 'Business Finance',
      subtitle: 'Commercial Capitalization',
      icon: 'trending_up',
      desc: 'Fuel operations, purchase bulk materials, and unlock liquidity without diluting equity.'
    },
    {
      id: 'property',
      num: '2',
      title: 'Property Finance',
      subtitle: 'Real Estate Assetization',
      icon: 'domain_add',
      desc: 'Unlock untapped enterprise value from real estate assets or acquire premier commercial plots.'
    },
    {
      id: 'specialized',
      num: '3',
      title: 'Specialized & Institutional Finance',
      subtitle: 'Infrastructure & Industry',
      icon: 'precision_manufacturing',
      desc: 'Capital expenditure backing, diagnostic medical machines, and academic campus investments.'
    },
    {
      id: 'personal',
      num: '4',
      title: 'Personal & Vehicle Finance',
      subtitle: 'Individual & Mobility',
      icon: 'commute',
      desc: 'Discreet high-ticket personal liquidity and robust commercial fleet operations.'
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ========================================================
          HERO & OVERVIEW SECTION
          ======================================================== */}
      <section className="relative bg-gradient-to-br from-primary-container via-[#0c244d] to-primary-container overflow-hidden py-16 md:py-24 text-on-primary">
        {/* Ambient Gold Glow & Structural Grid lines */}
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-tertiary-fixed/10 blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-surface-container/10 blur-2xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Column */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/15 border-0 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                <span className="text-xs text-tertiary-fixed tracking-wider uppercase font-semibold">
                  Institutional Grade Financing • Central India
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[54px] font-extrabold tracking-tight text-surface-container-lowest leading-[1.1]">
                Financial Solutions <br className="hidden sm:block" />
                <span className="bg-gradient-to-r from-tertiary-fixed via-tertiary-fixed-dim to-secondary-fixed bg-clip-text text-transparent">
                  Designed Around
                </span>{' '}
                Your Needs
              </h1>

              <p className="text-base sm:text-lg text-surface-variant/90 max-w-2xl leading-relaxed">
                Comprehensive financing assistance spanning business expansion, real estate liquidity, institutional facilities, and tailored personal funding across Raipur and nationwide.
              </p>

              {/* Key Stats Micro Ribbon */}
              <div className="pt-2 flex flex-wrap items-center gap-y-3 gap-x-6 text-surface-container text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px]">verified</span>
                  <span>Flexible Tenures up to 15 Yrs</span>
                </div>
                <span className="text-surface-variant/30 hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">percent</span>
                  <span>Competitive Linked Rates</span>
                </div>
                <span className="text-surface-variant/30 hidden sm:inline">•</span>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-surface-container-high text-[20px]">speed</span>
                  <span>End-to-End Assisted Processing</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column: Institutional Overview Card */}
            <div className="lg:col-span-5 relative">
              <div className="bg-surface-container-lowest/10 backdrop-blur-md rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6 border border-white/10">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs text-tertiary-fixed uppercase tracking-wider font-bold">
                      Disbursal Pipeline
                    </span>
                    <div className="text-3xl sm:text-4xl text-surface-container-lowest font-black tracking-tight">
                      ₹480+ Cr
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high/15 flex items-center justify-center text-tertiary-fixed">
                    <span className="material-symbols-outlined text-[28px]">account_balance</span>
                  </div>
                </div>

                {/* Mini Live Visual Metric Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-surface-variant">
                    <span>Working Capital &amp; Term Debt</span>
                    <span className="text-secondary-fixed font-bold">98.4% Approval Rate</span>
                  </div>
                  <div className="h-2 w-full bg-surface-container-highest/20 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-tertiary-fixed to-secondary-fixed w-[86%] rounded-full"></div>
                  </div>
                </div>

                {/* Micro Quick Calculator Preview */}
                <div className="p-4 rounded-xl bg-primary-container/60 space-y-2 border border-white/5">
                  <div className="flex items-center justify-between text-surface-container text-xs sm:text-sm font-semibold">
                    <span>Indicative EMI Anchor</span>
                    <span className="text-tertiary-fixed font-bold">From ₹845 / Lakh</span>
                  </div>
                  <p className="text-xs text-on-primary-container">
                    Structured loan brackets custom-built for high-volume enterprises, hospitals, and local SME clusters.
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs text-surface-variant">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed"></span> No Hidden Surprises
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-tertiary-fixed"></span> Raipur HQ Direct Team
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FILTER & SEGMENT NAVIGATION BAR
          ======================================================== */}
      <section className="bg-surface-container-lowest sticky top-[120px] z-30 shadow-md py-4 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary-container text-surface-container-lowest shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              All Portfolios (10)
            </button>
            <button
              onClick={() => setActiveCategory('business')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === 'business'
                  ? 'bg-primary-container text-surface-container-lowest shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              Business Finance (3)
            </button>
            <button
              onClick={() => setActiveCategory('property')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === 'property'
                  ? 'bg-primary-container text-surface-container-lowest shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              Property &amp; LAP (2)
            </button>
            <button
              onClick={() => setActiveCategory('specialized')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === 'specialized'
                  ? 'bg-primary-container text-surface-container-lowest shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              Specialized &amp; Institutional (3)
            </button>
            <button
              onClick={() => setActiveCategory('personal')}
              className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === 'personal'
                  ? 'bg-primary-container text-surface-container-lowest shadow-sm'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              Personal &amp; Auto (2)
            </button>
          </div>

          {/* Quick Search Input Field */}
          <div className="relative w-full md:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter facility, machinery, LAP..."
              className="w-full pl-10 pr-4 py-2 h-10 rounded-xl bg-surface-container-low text-on-surface text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-primary-container/20 transition-all placeholder:text-slate-400 border border-transparent focus:border-slate-300"
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE PRODUCT GRID CANVAS
          ======================================================== */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
        {groups.map((grp) => {
          const groupProducts = filteredProducts.filter((p) => p.group === grp.id);
          if (groupProducts.length === 0) return null;

          return (
            <section key={grp.id} className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[18px]">{grp.icon}</span>
                    <span>{grp.subtitle}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight mt-1">
                    {grp.num}. {grp.title}
                  </h2>
                  <p className="text-sm text-on-surface-variant mt-1">{grp.desc}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-surface-container-high text-primary-container font-semibold self-start sm:self-auto">
                  {groupProducts.length} Solution{groupProducts.length > 1 ? 's' : ''} Available
                </span>
              </div>

              <div
                className={`grid grid-cols-1 ${
                  grp.id === 'property' || grp.id === 'personal'
                    ? 'md:grid-cols-2'
                    : 'md:grid-cols-2 lg:grid-cols-3'
                } gap-6`}
              >
                {groupProducts.map((prod) => (
                  <article
                    key={prod.id}
                    className={`flex flex-col justify-between rounded-xl ${
                      prod.bgCard || 'bg-surface-container-lowest'
                    } p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative group border border-slate-100`}
                  >
                    <div className="absolute top-0 left-0 right-0 h-1 bg-primary-container rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container">
                          <span className="material-symbols-outlined text-[26px]">{prod.icon}</span>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-md ${prod.badgeBg || 'bg-surface-container'} ${
                            prod.badgeColor || 'text-primary-container'
                          } text-xs font-semibold`}
                        >
                          {prod.badge}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-xl font-bold text-on-surface">{prod.name}</h3>
                        <p className="text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
                          {prod.description}
                        </p>
                      </div>

                      {/* Optional Stats Block for Property / High Value */}
                      {prod.stats && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                          {prod.stats.map((st, sidx) => (
                            <div key={sidx} className="p-3 rounded-lg bg-surface-container-low space-y-1">
                              <span className="text-xs text-slate-500">{st.label}</span>
                              <p className={`text-base font-bold ${st.valueColor || 'text-primary-container'}`}>
                                {st.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Features Checklist */}
                      <ul className="space-y-2 py-2">
                        {prod.features.map((feat, fidx) => (
                          <li key={fidx} className="flex items-center gap-2 text-on-surface text-xs sm:text-sm">
                            <span className="material-symbols-outlined text-[#168B45] text-[18px]">
                              check_circle
                            </span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Meta Highlight */}
                      <div className="p-3 rounded-lg bg-surface-container-low flex items-center justify-between">
                        <span className="text-xs text-on-surface-variant font-medium">{prod.metaLabel}</span>
                        <span className="text-xs sm:text-sm text-primary-container font-bold">
                          {prod.metaValue}
                        </span>
                      </div>
                    </div>

                    <div className="pt-6 mt-4 flex items-center gap-3">
                      <button
                        onClick={() => setSelectedProduct(prod.name)}
                        className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container text-xs sm:text-sm font-bold py-3.5 px-4 rounded-xl shadow-sm hover:shadow-md transition-all"
                      >
                        <span>{prod.ctaText}</span>
                        <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}

        {filteredProducts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <span className="material-symbols-outlined text-4xl text-slate-400">search_off</span>
            <h3 className="text-lg font-bold text-slate-800 mt-2">No financing programs found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try searching with another keyword or reset the category filter.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 bg-primary-container text-white text-xs font-semibold rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ========================================================
            RAIPUR INSTITUTIONAL ARCHITECTURE SHOWCASE MOSAIC
            ======================================================== */}
        <section className="rounded-2xl bg-surface-container-low p-8 md:p-12 relative overflow-hidden border border-slate-200/60">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-secondary text-xs font-bold uppercase">
                <span className="material-symbols-outlined text-[18px]">corporate_fare</span>
                <span>Central Hub • Raipur, Chhattisgarh</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-on-surface tracking-tight">
                Direct Access to Institutional Capital
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                Headquartered in the premier corporate hub of Raipur, Earth Finance provides an unmediated conduit between business houses and top-tier banking syndicates. We structure deals with precision, ensuring zero bureaucratic delays.
              </p>
              <div className="pt-2 flex flex-wrap gap-6 text-on-surface text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-secondary"></span>
                  <span>Local Presence, National Clout</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-tertiary-fixed-dim"></span>
                  <span>Transparent Fee Architecture</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
                  <span>Dedicated Relationship Bankers</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/3] rounded-xl overflow-hidden shadow-lg relative border border-white/20">
                <img
                  className="w-full h-full object-cover"
                  alt="Corporate headquarters building in Raipur, Chhattisgarh"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAh87ls8H3alMlQdrN-UN_nyt5xWuNH4GFLV7cyi8p5YjoZ_XLqY849eTdwSB8kKOClilfXthonSJjv6dq7eu5gjOrBZF9Yvw1Lg6crGOrlILigqVQhSc2FXkiFAE1ejFRX69Iof3kCUa8w4-huiDPR2LD-zWBlRcXZwiyQ3VAp8-TipkFmp1Ozs5pMfiXM7g9I540IMgiXMOxkICgHy0hl3Tg5o6VlF28rALVy2GCyttz79bXU_Gnb"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent flex items-end p-6">
                  <div className="text-surface-container-lowest space-y-1">
                    <span className="text-xs text-tertiary-fixed uppercase font-semibold">Corporate Office</span>
                    <p className="text-lg font-bold">Civil Lines, Raipur</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ========================================================
          BOTTOM HIGH-IMPACT CTA BANNER
          ======================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <div className="relative rounded-2xl bg-gradient-to-br from-primary-container via-[#0B254E] to-primary-container text-surface-container-lowest p-8 sm:p-12 md:p-16 overflow-hidden shadow-xl border border-white/10">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-tertiary-fixed/15 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-secondary-fixed/10 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/10 text-tertiary-fixed text-xs uppercase font-bold tracking-wider border border-white/10">
                <span className="material-symbols-outlined text-[16px]">support_agent</span>
                <span>Senior Advisory Available</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-surface-container-lowest">
                Not sure which financing option is right for you?
              </h2>
              <p className="text-base sm:text-lg text-surface-variant/90 leading-relaxed">
                Speak with our senior finance specialists in Raipur for a confidential, customized loan assessment and syndication blueprint tailored to your enterprise.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-stretch sm:items-center gap-4 flex-shrink-0 w-full sm:w-auto">
              <a
                className="inline-flex items-center justify-center gap-2 bg-surface-container-high/10 hover:bg-surface-container-high/20 text-surface-container-lowest text-sm font-semibold py-4 px-6 rounded-xl transition-all border border-white/10"
                href={`tel:${SUPPORT_PHONE}`}
              >
                <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">call</span>
                <span>{SUPPORT_PHONE}</span>
              </a>
              <Link
                to="/appointment"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tertiary-fixed via-tertiary-fixed-dim to-[#dfae2b] text-primary-container text-sm font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-center"
              >
                <span>Book a Consultation</span>
                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Express Inquiry Modal */}
      <Modal
        isOpen={Boolean(selectedProduct)}
        onClose={() => setSelectedProduct(null)}
        title={selectedProduct ? `Apply: ${selectedProduct}` : 'Financing Application'}
      >
        <div className="py-2">
          <p className="text-xs text-slate-500 mb-4">
            Provide your facility details below. Our underwriting and advisory desk will verify eligibility within 24 business hours.
          </p>
          <EnquiryForm
            initialLoanType={selectedProduct || 'General Business Loan'}
            onSuccess={() => setSelectedProduct(null)}
          />
        </div>
      </Modal>
    </div>
  );
};
