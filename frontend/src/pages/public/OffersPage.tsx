import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Building,
  CheckCircle2,
  ArrowRight,
  Phone,
  Calendar,
  Gavel,
  Zap,
  TrendingUp,
  Sparkles,
  Layers,
  Clock,
  Coins,
  FileCheck,
  Check,
  ChevronRight,
  ExternalLink,
  X
} from 'lucide-react';
import { SUPPORT_PHONE, OFFICE_ADDRESS, DISCLAIMER_TEXT } from '../../config/constants';

interface OfferCard {
  id: string;
  title: string;
  badge: string;
  badgeColor: string;
  windowSub: string;
  windowTitle: string;
  highlightText: string;
  highlightBorder: string;
  highlightTextColor: string;
  description: string;
  footnote: string;
  image?: string;
  iconName?: string;
  exploreLink: string;
  programTier: string;
}

const PROGRAM_OFFERS: OfferCard[] = [
  {
    id: 'lap-advantage',
    title: 'Commercial Property & High-Ticket LAP Advantage Program',
    badge: 'Priority Sector • 0.5% Concession',
    badgeColor: 'bg-tertiary-fixed text-on-tertiary-fixed',
    windowSub: 'Underwritten Window',
    windowTitle: '₹50 Cr High-Ticket LAP',
    highlightText: 'Financing up to ₹50 Crore • LTV up to 75%',
    highlightBorder: 'border-secondary',
    highlightTextColor: 'text-secondary',
    description:
      'Consolidate high-interest unsecured liabilities into structured long-tenure mortgage credit with expedited 7-day documentation clearance.',
    footnote: '*Subject to property title verification, legal search, and institutional underwriter criteria.',
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1UBjOAeaRoSthxdWJQflfD_Tg8wyggrKmJjSD3DCiHmTgdpYPfNbjvImswa5eL2nRUimR69FmdVUK3xmunnOaBymBpFNWvQsSWmgm-UAIoW5GOOCxyr9zaWHKsTA9KOG2nBCfULkC285fX6Vx5rP5B7cS1V_MZvCc2HtGpvTZSF6wg3zNUSShzhOvr7iLQcN0knQVQUGTuvfdEM28SqLK94v72eshsnUTnvg5-uFfEiBWLlCJDKiv_orkI',
    exploreLink: '/loans',
    programTier: '₹20 Cr – ₹50 Cr+'
  },
  {
    id: 'machinery-capex',
    title: 'Machinery & Equipment Capex Program with Moratorium',
    badge: 'Industrial Accelerator',
    badgeColor: 'bg-secondary-fixed text-on-secondary-fixed',
    windowSub: 'Special Capex Moratorium',
    windowTitle: 'Commissioning Grace Period',
    highlightText: 'Repayment Moratorium up to 6–12 Months during Commissioning',
    highlightBorder: 'border-secondary',
    highlightTextColor: 'text-secondary',
    description:
      'Tailored for heavy engineering, fabrication, and agro-processing plants in Urla, Siltara, and Korba acquiring CNC and automated industrial machinery.',
    footnote: '*Terms governed by capital expenditure schedules and manufacturer delivery milestones.',
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1UCT3x_4MWy7QaicaSaXNTdjy2ZVzGQM_hdhLJSKWAuHBmDiKUVbZkBrFPPCiWS-01qh5DwRLLf81LQQMy16kvEejyp29vUQHKvBgupkOfA_HpXqiWtvzcrOxtAwS18jUSasaguL3UeYI3C-5xmcqqXoZOWZri4IoWbm7PRod5k_ZHortDV1QXKSHuKXNMpmNTJka5aNYozPVLiUIyYOWhRuSJHEyWU0pbm9JxXUvAQKXUtSPqQTMJROQ',
    exploreLink: '/loans',
    programTier: '₹5 Cr – ₹20 Cr'
  },
  {
    id: 'working-capital-cc',
    title: 'Working Capital & Cash Credit (CC) Expansion Window',
    badge: 'Seasonal Liquidity Desk',
    badgeColor: 'bg-surface-container-high text-on-primary-fixed',
    windowSub: 'Dynamic Drawing Limits',
    windowTitle: 'Fast-Track CC Lines',
    highlightText: 'Up to ₹10 Crore with Dynamic Drawing Power',
    highlightBorder: 'border-surface-tint',
    highlightTextColor: 'text-on-primary-fixed',
    description:
      'Designed for wholesale traders, distributors, and contractors requiring enhanced seasonal credit limits ahead of harvest and festive supply runs.',
    footnote: '*Sanctions subject to verified 12-month operational bank statements and GST 3B reconciliation.',
    image:
      'https://lh3.googleusercontent.com/aida/AEtjO1UCS_UiVGB8rV64SNliZ7UN_945abx5AD4plmB6Yx9knzwnWgPkgyF8sh_CMtv8e-O-0wWBvC8MrCIaTwC679x9hAuJ2zKG1VfSFhjd2ZOuOYD2iyy1P3eTUnULDgNS0JFA10fJm0kFEABIxBC0BizFT8mkEZHE0_MFfX4hLYma1hF8s5G1O6a1ggu9b2DjtdvZCxFoivR27OK7_VHMMbyhqroRhJLZQ3jFygtoqz9hBivHG4URXMVD7kI',
    exploreLink: '/loans',
    programTier: '₹1 Cr – ₹5 Cr'
  },
  {
    id: 'doctor-facility',
    title: 'Doctor & Diagnostic Center Setup Facility',
    badge: 'Healthcare Special',
    badgeColor: 'bg-surface-container-highest text-on-primary-fixed',
    windowSub: 'Specialized Practice Line',
    windowTitle: 'Zero Collateral Up to ₹1.5 Cr',
    highlightText: 'Zero Collateral up to ₹1.5 Cr • Extended 84-Month Tenure',
    highlightBorder: 'border-secondary',
    highlightTextColor: 'text-secondary',
    description:
      'Turnkey financing for CT/MRI scanners, specialized surgical suites, and multi-specialty polyclinic expansions with minimal bureaucracy.',
    footnote: '*Applicable for MBBS, MD, MS, BDS practitioners with minimum 3 years registered clinical practice.',
    iconName: 'medical_services',
    exploreLink: '/loans',
    programTier: '₹1 Cr – ₹5 Cr'
  },
  {
    id: 'education-campus',
    title: 'Education Campus & Infrastructure Modernization',
    badge: 'Institutional Expansion',
    badgeColor: 'bg-tertiary-fixed text-on-tertiary-fixed',
    windowSub: 'Educational Trusts & Societies',
    windowTitle: 'Funding: ₹2 Cr to ₹25 Cr',
    highlightText: 'Funding from ₹2 Cr to ₹25 Cr • Milestone-Based Tranches',
    highlightBorder: 'border-surface-tint',
    highlightTextColor: 'text-on-primary-fixed',
    description:
      'Long-term infrastructure funding for CBSE/ICSE schools, university hostels, and professional colleges in Central India.',
    footnote: '*Subject to trust/society deed clearance and audited 3-year cash flow records.',
    iconName: 'school',
    exploreLink: '/loans',
    programTier: '₹5 Cr – ₹20 Cr'
  },
  {
    id: 'logistics-fleet',
    title: 'Commercial Fleet & Logistics Vehicle Financing',
    badge: 'Corporate Mobility',
    badgeColor: 'bg-secondary-fixed text-on-secondary-fixed',
    windowSub: 'Bulk Fleet Acquisition',
    windowTitle: 'Up to 90% On-Road Funding',
    highlightText: 'Up to 90% On-Road Funding • Tie-ups with Leading OEMs',
    highlightBorder: 'border-secondary',
    highlightTextColor: 'text-secondary',
    description:
      'Fleet funding for mining trucks, transit mixers, dry-cargo containers, and luxury corporate executive vehicles.',
    footnote: '*Subject to transport permits, vehicle chassis invoices, and operator fleet credentials.',
    iconName: 'local_shipping',
    exploreLink: '/loans',
    programTier: '₹1 Cr – ₹5 Cr'
  }
];

export const OffersPage: React.FC = () => {
  const [selectedFacilitySize, setSelectedFacilitySize] = useState<'tier1' | 'tier2' | 'tier3'>('tier2');
  const [quickEnquiryOffer, setQuickEnquiryOffer] = useState<OfferCard | null>(null);

  // Dynamic parameters for the 60-second calculator
  const tierConfigs = {
    tier1: {
      label: '₹1 Cr – ₹5 Cr',
      sla: '5 to 7 Days',
      margin: 'From 8.85% p.a.',
      focus: 'Working Capital CC/OD, Practice Lines, Vehicle Fleets',
      banks: 'Top 10 Scheduled Commercial Banks & NBFCs'
    },
    tier2: {
      label: '₹5 Cr – ₹20 Cr',
      sla: '7 to 10 Days',
      margin: 'From 8.50% p.a.',
      focus: 'Machinery Capex, High-Ticket LAP, Campus Expansion',
      banks: '24+ Lead Public & Private Sector Institutions'
    },
    tier3: {
      label: '₹20 Cr – ₹50 Cr+',
      sla: '10 to 14 Days',
      margin: 'Repo Benchmark + Prime Spread',
      focus: 'Multi-Banking Consortiums, Project Debt Syndication',
      banks: 'State & National Consortia Lead Desks'
    }
  };

  const currentTier = tierConfigs[selectedFacilitySize];

  return (
    <div className="w-full bg-surface">
      {/* 1. HERO SECTION */}
      <section className="relative bg-primary-container text-surface overflow-hidden py-14 lg:py-24">
        {/* Geometric Vector Watermark & Radial Lighting */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full object-cover" fill="none" viewBox="0 0 1440 600" xmlns="http://www.w3.org/2000/svg">
            <circle className="text-tertiary-fixed" cx="120" cy="80" r="320" stroke="currentColor" strokeDasharray="6 6" strokeWidth="1.5"></circle>
            <circle className="text-surface-tint" cx="1320" cy="520" r="480" stroke="currentColor" strokeWidth="1"></circle>
            <path className="text-primary-fixed-dim" d="M-100 500 C 300 200, 800 600, 1500 250" stroke="currentColor" strokeWidth="1.5"></path>
            <path className="text-tertiary-fixed" d="M0 250 C 400 450, 900 100, 1600 400" stroke="currentColor" strokeDasharray="4 8" strokeWidth="1"></path>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Institutional Category Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-tertiary-fixed mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
            <span className="text-xs uppercase tracking-widest font-bold">
              Active Financial Programs &amp; Regional Advantages
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold max-w-4xl tracking-tight text-white leading-tight">
            Explore Our Latest <span className="text-tertiary-fixed font-extrabold text-[#F4C542]">Financial Solutions &amp; Programs</span>
          </h1>

          {/* Subtitle Description */}
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            Discover tailored credit initiatives, fast-track appraisal windows, and prioritized bank syndication programs curated for Central India enterprises and high-growth sectors.
          </p>

          {/* Trust Metrics Strip */}
          <div className="mt-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-center gap-3 text-center border border-white/10 shadow-sm">
              <span className="material-symbols-outlined text-secondary-fixed text-[24px]">verified</span>
              <span className="text-xs sm:text-sm text-white font-semibold tracking-wide">
                Zero Upfront Evaluation Fee
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-center gap-3 text-center border border-white/10 shadow-sm">
              <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">account_balance</span>
              <span className="text-xs sm:text-sm text-white font-semibold tracking-wide">
                24+ Institutional Banking Partners
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl flex items-center justify-center gap-3 text-center border border-white/10 shadow-sm">
              <span className="material-symbols-outlined text-primary-fixed-dim text-[24px]">business</span>
              <span className="text-xs sm:text-sm text-white font-semibold tracking-wide">
                Dedicated Raipur Desk
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CURATED INSTITUTIONAL CAMPAIGNS SECTION */}
      <section className="py-12 lg:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-slate-200 pb-5">
            <div>
              <span className="text-xs uppercase tracking-widest text-secondary font-bold block mb-1">
                Syndicated Portfolios
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#071B3A] tracking-tight">
                Structured Credit Initiatives
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-on-surface-variant max-w-md leading-relaxed">
              Direct liquidity injection frameworks and capex subsidies curated for enterprises across Chhattisgarh, Odisha, and Central India.
            </p>
          </div>

          {/* Grid of 6 High-Fidelity Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PROGRAM_OFFERS.map((offer) => {
              const hasImage = Boolean(offer.image);

              return (
                <div
                  key={offer.id}
                  className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col group border border-slate-200/80"
                >
                  {/* Card Visual Header */}
                  {hasImage ? (
                    <div className="relative h-56 w-full overflow-hidden bg-surface-container">
                      <img
                        alt={offer.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        src={offer.image}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary-container/85 via-primary-container/30 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full font-bold text-[11px] shadow-sm uppercase tracking-wider ${offer.badgeColor}`}>
                          {offer.badge}
                        </span>
                      </div>
                      <div className="absolute bottom-3 left-4 right-4 text-white">
                        <p className="text-[11px] text-tertiary-fixed uppercase font-semibold">
                          {offer.windowSub}
                        </p>
                        <p className="text-base sm:text-lg font-bold text-white">
                          {offer.windowTitle}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative h-56 w-full overflow-hidden bg-primary-container p-6 flex flex-col justify-between">
                      <div className="flex justify-between items-start">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm ${offer.badgeColor}`}>
                          {offer.badge}
                        </span>
                        <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-white shadow-sm border border-white/10">
                          <span className="material-symbols-outlined text-[28px]">
                            {offer.iconName || 'corporate_fare'}
                          </span>
                        </div>
                      </div>
                      <div className="text-white">
                        <p className="text-[11px] text-tertiary-fixed uppercase font-semibold">
                          {offer.windowSub}
                        </p>
                        <p className="text-base sm:text-lg font-bold text-white">
                          {offer.windowTitle}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-base sm:text-lg font-bold text-[#071B3A] group-hover:text-[#1455A0] transition-colors leading-snug">
                        {offer.title}
                      </h3>

                      <div className={`bg-surface-container-low p-3 rounded-xl border-l-4 ${offer.highlightBorder}`}>
                        <p className={`text-xs font-bold ${offer.highlightTextColor}`}>
                          {offer.highlightText}
                        </p>
                      </div>

                      <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                        {offer.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <p className="text-[11px] text-on-surface-variant italic">
                        {offer.footnote}
                      </p>

                      <div className="flex items-center gap-2">
                        <Link
                          to={`/loans`}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-primary-container text-white hover:bg-slate-800 transition-colors shadow-sm"
                        >
                          <span>Explore Solution</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <button
                          type="button"
                          onClick={() => setQuickEnquiryOffer(offer)}
                          className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl text-xs font-bold bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE PROGRAM QUALIFICATION CALCULATOR */}
      <section className="py-12 lg:py-16 bg-surface-container-low border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-container-lowest p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs uppercase tracking-widest text-secondary font-bold">
                  Syndication Velocity Desk
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#071B3A]">
                  Check Program Compatibility in 60 Seconds
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Select your enterprise credit tier to preview sanctioned tenures, processing speeds, and maximum capital thresholds.
                </p>

                <div className="pt-3 space-y-2">
                  <div className="flex items-center gap-2 text-on-surface text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    <span>Direct Underwriter Access at Raipur Office</span>
                  </div>
                  <div className="flex items-center gap-2 text-on-surface text-xs font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    <span>Multi-Banking In-Principle Approvals</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 bg-surface-container-low p-6 rounded-2xl border border-slate-200/80">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-on-surface uppercase tracking-wider mb-2">
                      Select Anticipated Facility Size
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['tier1', 'tier2', 'tier3'] as const).map((tierKey) => {
                        const isSelected = selectedFacilitySize === tierKey;
                        return (
                          <button
                            key={tierKey}
                            type="button"
                            onClick={() => setSelectedFacilitySize(tierKey)}
                            className={`py-2.5 px-2 rounded-xl text-xs sm:text-sm font-bold text-center transition-all ${
                              isSelected
                                ? 'bg-primary-container text-white shadow-md'
                                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                            }`}
                          >
                            {tierConfigs[tierKey].label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <span className="text-[11px] text-on-surface-variant uppercase font-semibold block mb-0.5">
                        Indicative Processing SLA
                      </span>
                      <span className="text-xl sm:text-2xl font-extrabold text-[#071B3A]">
                        {currentTier.sla}
                      </span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                      <span className="text-[11px] text-on-surface-variant uppercase font-semibold block mb-0.5">
                        Upfront Advisory Fee
                      </span>
                      <span className="text-xl sm:text-2xl font-extrabold text-secondary">
                        ₹0.00 NIL
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1">
                    <div className="text-[11px] text-slate-500 font-medium">Eligible Solutions for this Bracket:</div>
                    <div className="text-xs font-bold text-[#071B3A]">{currentTier.focus}</div>
                    <div className="text-[11px] text-emerald-700 font-semibold">{currentTier.banks}</div>
                  </div>

                  <div className="pt-1">
                    <Link
                      to={`/apply?tier=${encodeURIComponent(currentTier.label)}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold bg-tertiary-fixed text-[#071B3A] hover:bg-tertiary-fixed-dim transition-all shadow-md"
                    >
                      <span>Initiate Program Appraisal Desk</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRANSPARENCY & REGULATORY DISCLAIMER BANNER */}
      <section className="py-8 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-surface-container-lowest p-5 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shrink-0 border border-slate-200">
              <span className="material-symbols-outlined text-[24px]">gavel</span>
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-on-surface uppercase tracking-wider">
                Regulatory Notice &amp; Fee Transparency Guarantee
              </p>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                All interest rates, loan terms, and facility limits displayed are indicative and subject to applicant creditworthiness, collateral evaluation, and participating bank underwriting guidelines. Earth Finance charges ₹0 upfront advisory fee. We operate strictly in full adherence to RBI fair practice codes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LARGE PREMIUM CTA BANNER */}
      <section className="py-12 lg:py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-primary-container rounded-2xl overflow-hidden p-8 sm:p-12 lg:p-16 shadow-2xl text-surface border border-slate-700">
            {/* Gold Radiant Geometric Background Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
              <svg className="w-full h-full object-cover" fill="none" viewBox="0 0 1000 400" xmlns="http://www.w3.org/2000/svg">
                <path className="text-tertiary-fixed" d="M0 100 Q 250 300 500 100 T 1000 100" stroke="currentColor" strokeWidth="2"></path>
                <path className="text-primary-fixed-dim" d="M0 200 Q 250 400 500 200 T 1000 200" stroke="currentColor" strokeDasharray="6 6" strokeWidth="1.5"></path>
                <circle className="text-tertiary-fixed" cx="850" cy="180" r="140" stroke="currentColor" strokeWidth="2"></circle>
              </svg>
            </div>

            <div className="relative max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-tertiary-fixed text-xs uppercase font-bold tracking-wider border border-white/10">
                <span>Direct Raipur Desk</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Planning Your Next <span className="text-tertiary-fixed text-[#F4C542]">Strategic Business Move?</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Discuss your capex or working capital requirements with senior syndication managers in Raipur. Receive structured underwriting roadmaps and institutional term sheets tailored to your industry.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/book-consultation"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-tertiary-fixed text-[#071B3A] hover:bg-tertiary-fixed-dim transition-all shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book a Consultation</span>
                </Link>

                <a
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all border border-white/20"
                  href={`tel:${SUPPORT_PHONE}`}
                >
                  <Phone className="w-4 h-4 text-tertiary-fixed" />
                  <span>Call Helpline: {SUPPORT_PHONE}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK ENQUIRY MODAL */}
      {quickEnquiryOffer && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 border border-slate-200">
            <button
              type="button"
              onClick={() => setQuickEnquiryOffer(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-xs uppercase font-bold text-secondary tracking-wider">
                  Program Express Inquiry
                </span>
                <h3 className="text-xl font-bold text-[#071B3A] mt-1">
                  {quickEnquiryOffer.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {quickEnquiryOffer.highlightText}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
                <div className="font-semibold text-[#071B3A]">Raipur Underwriting Office</div>
                <div>Free in-principle appraisal with zero upfront evaluation fee.</div>
              </div>

              <div className="pt-2 flex flex-col gap-2.5">
                <Link
                  to={`/apply?program=${encodeURIComponent(quickEnquiryOffer.title)}`}
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary-container text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <span>Complete Online Pre-Eligibility Check</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://api.whatsapp.com/send?phone=919300022732&text=${encodeURIComponent(
                    `Hello Earth Finance, I want to enquire about ${quickEnquiryOffer.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#168B45] text-white text-xs font-bold hover:bg-[#127439] transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>Connect with Underwriter on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
