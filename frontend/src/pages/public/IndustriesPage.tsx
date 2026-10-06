import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SUPPORT_PHONE } from '../../config/constants';
import { Modal } from '../../components/common/Modal';
import { EnquiryForm } from '../../components/forms/EnquiryForm';

interface IndustryItem {
  id: string;
  name: string;
  tag: string;
  tagBg: string;
  tagColor: string;
  icon: string;
  image: string;
  description: string;
  highlight: string;
  highlightIcon: string;
  slug: string;
}

export const IndustriesPage: React.FC = () => {
  // State for interactive sector calculator
  const [sectorMultiplier, setSectorMultiplier] = useState(0.45);
  const [activeSectorName, setActiveSectorName] = useState('Manufacturing');
  const [turnover, setTurnover] = useState(10);

  // State for modal
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

  const calculatedFacility = (turnover * sectorMultiplier).toFixed(2);

  const industries: IndustryItem[] = [
    {
      id: 'manufacturing',
      name: 'Manufacturing & Industrial',
      tag: 'Primary Core',
      tagBg: 'bg-primary-container/85',
      tagColor: 'text-surface-container-lowest',
      icon: 'precision_manufacturing',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDzPRIjGJYPX44EvcZpDged7--FLYNGzsJRmpgPw4vn5jXDi16XQs2v--MMBMWJtI89JmSia9GhZU4sPvBh8AeuMSo2b6h2LdeXjvmmVFBy73ZkCRimb2FKMzkR-OxV_Mc9imV70tVQmezJLqZivG-KvYeDaEHtynDe5x8_GZI--UXEVyUVUwpAj5t9wDOv4qtkfF0sNKwRMa_A1iMOven9FOwyVlApv-WaSVu-fpMV5mMvKhVz1bKn',
      description:
        'Heavy machinery financing, plant modernization, raw material procurement, and export-import liquidity.',
      highlight: 'Up to ₹25 Cr Capex • Extended Amortization',
      highlightIcon: 'verified_user',
      slug: 'manufacturing'
    },
    {
      id: 'healthcare',
      name: 'Healthcare & Diagnostics',
      tag: 'Priority Desk',
      tagBg: 'bg-secondary',
      tagColor: 'text-white',
      icon: 'medical_services',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC_Jxqo6kMMiMEqZVRDLDDI2hf_EnJvhQytp2LJAO02ToEvbgPQes04z900hxjEwj_k9dEqmPacETn7O177zLACXFdG2cHufk6uBxPDBgfC9hlUKyL8pHst5abK3qdk12Fg_dhbqEqUFgR91-LD6QH8XtBk9LnjFImFwCFGKcVkQzSWyVGmTR1Cw7DslTumDE9P5bfrcJOtFEwaTeMBnMiZ6eYhDe7z5cfCX8TlJQu-fHG4ltIqAj2K',
      description:
        'Turnkey financing for private hospitals, specialized diagnostic labs, and advanced medical equipment leasing.',
      highlight: 'Fast-track sanction for Doctors & Clinics',
      highlightIcon: 'bolt',
      slug: 'healthcare'
    },
    {
      id: 'education',
      name: 'Education & Institutions',
      tag: 'Institutional',
      tagBg: 'bg-surface-container-high',
      tagColor: 'text-primary-container',
      icon: 'school',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDpru2uRE5_j3QRkc3MIRR3EZrEHTKukQKmXe5RoQ96IDQbx7e7iE1_Qak3LKeuBrK7WyRayFKaFtGnChukP9vJiy5TOxBjAg_2SHKp6lLanK3NktF9EPm5oQCsOgj5TnIOrkUo6Yzx7Tfnz_TABGw1Lz--qBFTCmQtvv8GZvUTRk8aEH9hDHOaDXG3zODqUkQnF3FpsCCUzABZwo7KJb3gXyQSScDWPp0mt6I1ey0tWUwTMgS5kUz5',
      description:
        'Campus development, laboratory setup, digital infrastructure, and institutional liquidity.',
      highlight: 'Long-term institutional tenures',
      highlightIcon: 'calendar_month',
      slug: 'education'
    },
    {
      id: 'agro',
      name: 'Food & Agro Processing',
      tag: 'Agro Core',
      tagBg: 'bg-secondary-fixed/40',
      tagColor: 'text-emerald-900',
      icon: 'nutrition',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD7WZ_G0Xwyr5GBB3IqK5UHYBdCi3o4es5KdC0WlnF2usDL7xphIIIIuwXTQBfeqFeXPiFESXTtruxEEw-HkHS-0tweSRmwOvAL3gbx8q4qZq7DAIV4ihjWkcblT6QURiQXzgWsaBczIq4X3JpoKtmNx1HG_0jTSJaNVY42EID9n_lAjb3udWVXqaEQhGoxBsbUOEU9rqk4Yd0hssxHhUAS_pengQi6Q4-7nZjKXcxMGzLRU6H5PPK-',
      description:
        'Cold storage setup, grain milling facilities, packaging plants, and seasonal crop cycle working capital.',
      highlight: 'Aligned with central subsidy programs',
      highlightIcon: 'account_balance',
      slug: 'manufacturing'
    },
    {
      id: 'engineering',
      name: 'Engineering & Fabrication',
      tag: 'EPC Ready',
      tagBg: 'bg-primary-container/85',
      tagColor: 'text-surface-container-lowest',
      icon: 'build',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCKrfgXkTik_4AstYFJEWCGoM89FQNGJyqu0kw8MLwwKUprLVqJTSc1_pDOCjCovbsLVRlj0AXYwCMHGEi3iC2alZxl1ZwZOAVC3tdJIgsdyYLr9mxpozslTmWCqyvix1dTIcWhWWa35v_dtZvxe9gx88C9SzWFla5isd8cTGARYi4vClBqBlLOLWBhVkYg26PQtiRwXAtBlIGUzrCdXerIrLaQiqVMyanW0rpJ4Fy4gHPHQVYu7kps',
      description:
        'CNC equipment, metal processing, structural engineering, and EPC contract performance guarantees.',
      highlight: 'Performance bank guarantees & CC limits',
      highlightIcon: 'handshake',
      slug: 'manufacturing'
    },
    {
      id: 'logistics',
      name: 'Trading & Logistics Services',
      tag: 'High Velocity',
      tagBg: 'bg-tertiary-fixed',
      tagColor: 'text-primary-container',
      icon: 'local_shipping',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDqlTSMIby-fNEZqcl78-Q6fePqXI96DWmx8wpcauKanxeqd-7f9OH9XNz8vMDnbcJ7OG02g7jY8rs9YEEkZmcnQgh4tdqzl10faNKLb_O8Lpn8dmWzcn4P4mNhUW4SKqWgmHpgiPhD6ShP1ndBWb6dTZZQcBlfB--eVhQq1bDrxlx84DxeeJIBSM8kGJ7DGLPSaCiZxBExHvQVPHzOzhRvh6e0zL7rbtGNMOyMISY4x-JMrGx4WNnJ',
      description:
        'Warehouse stocking, commercial vehicle fleets, supply chain financing, and wholesale distribution capital.',
      highlight: 'Flexible receivables discounting',
      highlightIcon: 'receipt_long',
      slug: 'manufacturing'
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ========================================================
          HERO SECTION: Split Corporate Fintech Expression
          ======================================================== */}
      <section className="relative w-full bg-gradient-to-br from-primary-container via-[#0d2a58] to-surface-tint overflow-hidden text-surface-container-lowest">
        {/* Subtle Geometric Line Art Texture */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern height="48" id="industrial-grid" patternUnits="userSpaceOnUse" width="48">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1"></path>
                <circle cx="24" cy="24" fill="currentColor" r="1.5"></circle>
              </pattern>
            </defs>
            <rect fill="url(#industrial-grid)" height="100%" width="100%"></rect>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Copy & Value Proposition */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/10 backdrop-blur-md border border-white/10">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                <span className="text-xs uppercase tracking-wider text-tertiary-fixed font-bold">
                  Industry-Specific Expertise
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[54px] tracking-tight font-extrabold text-surface-container-lowest leading-tight">
                Finance Solutions for <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-tertiary-fixed via-tertiary-fixed-dim to-secondary-fixed bg-clip-text text-transparent">
                  Growing Businesses
                </span>
              </h1>

              <p className="text-base sm:text-lg text-surface-container-high/90 max-w-2xl leading-relaxed">
                Customized financial structures engineered around the unique working capital cycles, capex requirements, and regulatory frameworks of core Indian industries.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <a
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container font-bold text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  href={`tel:${SUPPORT_PHONE}`}
                >
                  <span className="material-symbols-outlined text-[20px]">precision_manufacturing</span>
                  <span>Explore Specialized Sectors</span>
                </a>

                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-container-lowest/5 backdrop-blur-sm border border-white/10">
                  <span className="material-symbols-outlined text-secondary-fixed text-[24px]">verified</span>
                  <div>
                    <p className="text-[11px] text-surface-container-high uppercase tracking-wider font-semibold">
                      Turnaround Time
                    </p>
                    <p className="text-sm font-bold text-surface-container-lowest">48–72 Hrs In-Principle</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Industrial Visual Mosaic with Overlay Badge */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-surface-container-high/5 border border-white/10">
                <img
                  className="w-full h-[420px] object-cover transition-transform duration-700 hover:scale-105"
                  alt="Modern industrial manufacturing facility in India"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZrTATF9vsDU7mXT_8XDNPJBC82FUdhF1BE6TTdOPfGNa03GZtET5eejbxCKZjDuNPdwhJH-qaXwGMX7fjdjDrOdLRl7VKbL0wojwKTqYM74oJh5cUMfjoOV7HI_3Fh1Yot6RkgmPdXiQLNRjh6TYa-lNPJUNRBttOUzPhGPy3UODYvnCboR3K4zip6-UX1eGeJf44e88nH3YaJeIuKsPsV_dHOp7sZgVxtC8xU79QSOpF1PoOORa6"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md text-on-surface shadow-xl border border-slate-100">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container flex-shrink-0">
                      <span className="material-symbols-outlined text-[22px]">factory</span>
                    </div>
                    <div className="min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-secondary-fixed/30 text-emerald-900 text-[11px] font-bold uppercase tracking-wider mb-1">
                        Direct Appraisal Desk
                      </span>
                      <h2 className="text-sm font-bold text-primary-container leading-snug">
                        Specialized Underwriting for Heavy &amp; Light Industries
                      </h2>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        Field-level asset valuations &amp; machinery lifecycle evaluation in Raipur &amp; Central India.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          METRICS QUICK STRIP: Contextual Authority
          ======================================================== */}
      <section className="w-full bg-surface-container-low py-4 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center md:text-left">
            <div className="p-2">
              <p className="text-xs uppercase tracking-wider text-on-surface-variant font-medium">Sectors Financed</p>
              <p className="text-2xl font-extrabold text-primary-container">18+ Niches</p>
            </div>
            <div className="p-2">
              <p className="text-xs uppercase tracking-wider text-on-surface-variant font-medium">Max Capex Ticket</p>
              <p className="text-2xl font-extrabold text-primary-container">₹25 Cr</p>
            </div>
            <div className="p-2">
              <p className="text-xs uppercase tracking-wider text-on-surface-variant font-medium">Central &amp; CG Subsidies</p>
              <p className="text-2xl font-extrabold text-secondary">Aligned</p>
            </div>
            <div className="p-2">
              <p className="text-xs uppercase tracking-wider text-on-surface-variant font-medium">Client Retention</p>
              <p className="text-2xl font-extrabold text-primary-container">96.4%</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          6 TARGET INDUSTRY SHOWCASE CARDS: 3x2 Grid
          ======================================================== */}
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-2 max-w-2xl mb-12">
            <div className="inline-flex items-center gap-1.5 text-on-primary-container text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-primary-container">domain</span>
              <span>Target Vertical Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-container">
              Tailored Capital for Sector-Specific Demands
            </h2>
            <p className="text-sm text-on-surface-variant">
              Generic business loans fail when production stops for maintenance or seasonal supplies surge. Our structured lending programs mirror your operational reality.
            </p>
          </div>

          {/* 3x2 Grid Container */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind) => (
              <div
                key={ind.id}
                className="group flex flex-col justify-between bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-100"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={ind.name}
                      src={ind.image}
                    />
                    <div className="absolute top-3 left-3 w-10 h-10 rounded-lg bg-surface-container-lowest/90 backdrop-blur-sm flex items-center justify-center text-primary-container shadow-md">
                      <span className="material-symbols-outlined text-[22px]">{ind.icon}</span>
                    </div>
                    <div
                      className={`absolute top-3 right-3 px-2.5 py-1 rounded-full ${ind.tagBg} ${ind.tagColor} text-xs font-semibold shadow-sm`}
                    >
                      {ind.tag}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold text-primary-container group-hover:text-surface-tint transition-colors">
                      {ind.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      {ind.description}
                    </p>
                    <div className="p-3 rounded-lg bg-surface-container-low flex items-center gap-2">
                      <span className="material-symbols-outlined text-secondary text-[20px] flex-shrink-0">
                        {ind.highlightIcon}
                      </span>
                      <span className="text-xs font-semibold text-primary-container">
                        {ind.highlight}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-1">
                  <button
                    onClick={() => setSelectedIndustry(ind.name)}
                    className="inline-flex items-center gap-1.5 text-primary-container text-xs sm:text-sm font-bold group-hover:text-secondary group-hover:gap-2.5 transition-all"
                  >
                    <span>Learn More &amp; Apply</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE ADVISORY SECTION: Comparison Pillars
          ======================================================== */}
      <section className="w-full py-16 lg:py-24 bg-surface-container-low">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-2 mb-14">
            <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs uppercase tracking-wider font-semibold">
              Structural Differentiation
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-container">
              Why Industry Experience Matters in Finance
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant">
              Standard banks look strictly at historical ledger balance. We appraise the underlying machinery life, billing pipeline, and cycle dynamics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">hourglass_top</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary-container mb-2">
                  Cash-Flow Timing Realities
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Standard commercial credit lines mandate rigid monthly interest services. We configure milestone repayments and balloon periods attuned to corporate realization cycles and EPC project sign-offs.
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">Retail Bank Flexibility</span>
                  <span className="text-rose-600 font-semibold">Rigid 30-Day</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: '25%' }}></div>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-primary-container font-semibold">Earth Finance Flexibility</span>
                  <span className="text-secondary font-semibold">Quarterly / Milestone</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">cyclone</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary-container mb-2">
                  Seasonal Trough Navigation
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Agro and allied manufacturing suffer cyclical monsoon pauses. Our underwriting recognizes low-season margins without panicking rating algorithms or triggering artificial penal interest.
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">Seasonal Buffer Cap</span>
                  <span className="text-primary-container font-semibold">Up to 4 Months</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: '80%' }}></div>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-on-surface-variant">Overdraft Tolerance</span>
                  <span className="text-secondary font-semibold">120% Peak Cycle</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '85%' }}></div>
                </div>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm space-y-4 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-primary-container text-tertiary-fixed flex items-center justify-center">
                <span className="material-symbols-outlined text-[28px]">trending_down</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-primary-container mb-2">
                  Real Capital Depreciation
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  While general lenders write off German or Japanese tooling values arbitrarily, our specialized asset appraisers compute true salvage yield, allowing higher Loan-To-Value against imported machinery.
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-on-surface-variant">Retail LTV on Used Plants</span>
                  <span className="text-slate-600 font-semibold">45% - 50%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: '48%' }}></div>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-primary-container font-semibold">Earth Finance LTV</span>
                  <span className="text-secondary font-semibold">Up to 75% - 80%</span>
                </div>
                <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          INTERACTIVE CAPITAL CALCULATOR TEASER
          ======================================================== */}
      <section className="w-full py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-10 shadow-lg border border-slate-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Controls */}
              <div className="lg:col-span-6 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-primary-container text-xs font-bold">
                  <span className="material-symbols-outlined text-[16px]">calculate</span>
                  <span>Rapid Estimator</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-primary-container">
                  Check Capex Eligibility By Sector
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant">
                  Select your operating domain and annual turnover to observe indicative credit limit ceilings and projected servicing timelines.
                </p>

                <div className="space-y-4 pt-2">
                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                      Industry Classification
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setSectorMultiplier(0.45);
                          setActiveSectorName('Manufacturing');
                        }}
                        className={`px-3 py-2 text-center rounded-lg text-xs font-bold transition-all ${
                          activeSectorName === 'Manufacturing'
                            ? 'bg-primary-container text-surface-container-lowest'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        Manufacturing
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSectorMultiplier(0.55);
                          setActiveSectorName('Healthcare');
                        }}
                        className={`px-3 py-2 text-center rounded-lg text-xs font-bold transition-all ${
                          activeSectorName === 'Healthcare'
                            ? 'bg-primary-container text-surface-container-lowest'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        Healthcare
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setSectorMultiplier(0.35);
                          setActiveSectorName('Trading / Agro');
                        }}
                        className={`px-3 py-2 text-center rounded-lg text-xs font-bold transition-all ${
                          activeSectorName === 'Trading / Agro'
                            ? 'bg-primary-container text-surface-container-lowest'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        Trading / Agro
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="text-xs font-bold text-on-surface uppercase tracking-wider">
                        Annual Turnover (Cr)
                      </label>
                      <span className="text-lg font-bold text-primary-container">
                        ₹{turnover} Cr
                      </span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={turnover}
                      onChange={(e) => setTurnover(Number(e.target.value))}
                      className="w-full h-2 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary-container"
                    />
                  </div>
                </div>
              </div>

              {/* Live Result Output */}
              <div className="lg:col-span-6 bg-surface-container-low p-6 rounded-xl space-y-4 border border-slate-100">
                <div className="flex items-center justify-between pb-3 bg-surface-container-lowest/90 p-4 rounded-lg">
                  <span className="text-xs font-semibold text-on-surface-variant">Estimated Facility Ceiling</span>
                  <span className="text-2xl sm:text-3xl font-black text-secondary">
                    ₹{calculatedFacility} Cr
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-surface-container-lowest rounded-lg">
                    <span className="block text-on-surface-variant uppercase tracking-wider font-semibold text-[10px]">
                      Repayment Tenure
                    </span>
                    <span className="block text-base font-bold text-primary-container mt-1">
                      Up to 84 Mos
                    </span>
                  </div>
                  <div className="p-3 bg-surface-container-lowest rounded-lg">
                    <span className="block text-on-surface-variant uppercase tracking-wider font-semibold text-[10px]">
                      Collateral Ratio
                    </span>
                    <span className="block text-base font-bold text-primary-container mt-1">
                      Flexible (LAP/Stock)
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-tertiary-fixed/30 text-on-surface flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-primary-container text-[20px] flex-shrink-0 mt-0.5">
                    info
                  </span>
                  <p className="text-xs text-on-surface leading-relaxed">
                    Figures represent institutional benchmark ceilings. Contact our Raipur underwriting desk for customized covenant relaxation.
                  </p>
                </div>

                <a
                  className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-primary-container text-surface-container-lowest text-xs sm:text-sm font-bold hover:bg-slate-800 transition-colors shadow-md"
                  href={`tel:${SUPPORT_PHONE}`}
                >
                  <span className="material-symbols-outlined text-[20px]">phone_in_talk</span>
                  <span>Sanction Consultation: {SUPPORT_PHONE}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          BOTTOM CTA: Deep Navy Card with Gold Border & Direct Line
          ======================================================== */}
      <section className="w-full pb-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary-container via-[#0d2a58] to-primary-container p-8 sm:p-12 shadow-2xl">
            {/* Golden Accent Border Overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_0_2px_#ffdf94]"></div>
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-tertiary-fixed/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
              <div className="space-y-2 max-w-2xl">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed/20 text-tertiary-fixed text-xs uppercase tracking-wider font-bold">
                  <span className="material-symbols-outlined text-[14px]">headset_mic</span>
                  <span>Direct Sector Desk Raipur</span>
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-container-lowest tracking-tight">
                  Have a unique business requirement?
                </h2>
                <p className="text-xs sm:text-sm text-surface-container-high leading-relaxed">
                  Our industry desk can construct a tailored capital structure matching your business scale, working cycle, and expansion goals.
                </p>
              </div>

              <div className="flex-shrink-0 w-full md:w-auto">
                <a
                  className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container text-xs sm:text-sm font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                  href={`tel:${SUPPORT_PHONE}`}
                >
                  <span className="material-symbols-outlined text-[20px]">phone_enabled</span>
                  <span>Talk to an Expert ({SUPPORT_PHONE}) →</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Express Industry Inquiry Modal */}
      <Modal
        isOpen={Boolean(selectedIndustry)}
        onClose={() => setSelectedIndustry(null)}
        title={selectedIndustry ? `Inquiry: ${selectedIndustry}` : 'Industry Financing'}
      >
        <div className="py-2">
          <p className="text-xs text-slate-500 mb-4">
            Connect with our dedicated industry underwriting specialists. We analyze operational cycles and asset bases to formulate credit limits.
          </p>
          <EnquiryForm
            initialLoanType={selectedIndustry ? `${selectedIndustry} Credit` : 'Industrial Finance'}
            onSuccess={() => setSelectedIndustry(null)}
          />
        </div>
      </Modal>
    </div>
  );
};
