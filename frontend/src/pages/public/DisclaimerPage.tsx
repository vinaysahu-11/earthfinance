import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Gavel,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Info,
  Calendar,
  Phone,
  Mail,
  ArrowRight,
  ExternalLink,
  Building,
  Scale,
  Clock,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SUPPORT_PHONE, SUPPORT_EMAIL, OFFICE_ADDRESS, DISCLAIMER_TEXT } from '../../config/constants';

interface ClauseNav {
  id: string;
  num: string;
  title: string;
}

const CLAUSES: ClauseNav[] = [
  { id: 'sec-financial-info', num: '01', title: 'Financial Information' },
  { id: 'sec-loan-approval', num: '02', title: 'Loan Approval Protocol' },
  { id: 'sec-rates-fluctuations', num: '03', title: 'Rates & Benchmark Spreads' },
  { id: 'sec-amounts-sanctions', num: '04', title: 'Amounts & Sanction Caps' },
  { id: 'sec-third-party', num: '05', title: 'Third-Party Lending Entities' },
  { id: 'sec-eligibility', num: '06', title: 'Statutory Eligibility Prerequisites' },
  { id: 'sec-processing-time', num: '07', title: 'Processing & Turnaround Cycle' },
  { id: 'sec-calculators', num: '08', title: 'Calculators & Algorithmic Models' },
  { id: 'sec-external-links', num: '09', title: 'External Gateways & Portals' },
  { id: 'sec-regulatory', num: '10', title: 'RBI Compliance & Alignment' }
];

export const DisclaimerPage: React.FC = () => {
  const [activeClause, setActiveClause] = useState<string>('sec-financial-info');

  // Scroll spy to highlight current clause
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const clause of CLAUSES) {
        const el = document.getElementById(clause.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveClause(clause.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToClause = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -140;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveClause(id);
    }
  };

  return (
    <div className="w-full bg-[#f9f9ff] min-h-screen text-[#141b2c] pt-24 pb-16 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Banner / Hero Scrim */}
      <section className="relative w-full bg-[#f1f3ff] py-12 md:py-16 overflow-hidden border-b border-slate-200/60">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#dbe2f9]/60 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-[#8ff9a6]/20 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[#44474e] mb-4">
            <Link to="/" className="hover:text-[#071b3a] transition-colors">
              Home
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <Link to="/about" className="hover:text-[#071b3a] transition-colors">
              Compliance &amp; Legal
            </Link>
            <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            <span className="text-[#071b3a] font-semibold">Regulatory Disclaimer</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#e0e8ff] text-[#364768] text-xs font-semibold">
                <span className="material-symbols-outlined text-[16px] text-[#006d33]">gavel</span>
                <span>Statutory &amp; Fiduciary Notice</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#006d33]" />
                <span>Ref: EF-DISC-2024</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#141b2c] tracking-tight">
                Disclaimer
              </h1>
              <p className="text-base sm:text-lg text-[#44474e] leading-relaxed">
                Important information about the financial information and advisory services presented on this website.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
              <div className="w-10 h-10 rounded-lg bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
                <span className="material-symbols-outlined text-[22px]">history_edu</span>
              </div>
              <div>
                <span className="block text-xs text-[#44474e] uppercase tracking-wider font-semibold">
                  Governance Cycle
                </span>
                <span className="text-sm font-bold text-[#141b2c]">Last Updated: October 2024</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Public Disclosure Callout Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20 w-full mb-12">
        <div className="bg-[#071b3a] text-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-xl relative overflow-hidden border border-[#0b2d5c]">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ffdf94] via-[#8ff9a6] to-[#b5c7ee]" />
          <div className="flex flex-col md:flex-row gap-6 items-start relative z-10">
            <div className="p-3.5 rounded-xl bg-white/10 text-[#ffdf94] shrink-0 border border-white/10">
              <span className="material-symbols-outlined text-[36px]">verified_user</span>
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-xs uppercase tracking-wider text-[#ffdf94] font-bold">
                  Mandatory Public Disclosure
                </span>
                <span className="px-2 py-0.5 rounded text-[11px] bg-[#006d33] text-white font-bold">
                  Binding Notice
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-100 font-medium leading-relaxed">
                “Information presented on this website is for general informational purposes only and does not constitute
                a guarantee of loan approval, interest rate, loan amount or financing terms. All financing facilities,
                sanctions, interest rates, and disbursal timelines are subject to individual credit assessment, collateral
                valuation, and final approval by participating banks and NBFCs.”
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-[#dbe2f9]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#8ff9a6]">check_circle</span>
                  Institutional Syndication Desk
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#ffdf94]">shield</span>
                  Raipur Hub Legal Oversight
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-[#b5c7ee]">account_balance</span>
                  Scheduled Commercial Banks Network
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Two-Column Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Sticky Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-32 space-y-5">
            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-[#071b3a] uppercase tracking-wider">
                  Document Index
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded bg-[#e0e8ff] text-[#364768] font-bold">
                  10 Clauses
                </span>
              </div>
              <nav className="space-y-1 text-xs">
                {CLAUSES.map((clause) => (
                  <button
                    key={clause.id}
                    type="button"
                    onClick={() => scrollToClause(clause.id)}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-left transition-all ${
                      activeClause === clause.id
                        ? 'bg-[#f1f3ff] text-[#071b3a] font-bold translate-x-1'
                        : 'text-[#44474e] hover:text-[#071b3a] hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate pr-2">
                      {clause.num}. {clause.title}
                    </span>
                    <span
                      className={`material-symbols-outlined text-[16px] transition-opacity ${
                        activeClause === clause.id ? 'opacity-100 text-[#071b3a]' : 'opacity-0'
                      }`}
                    >
                      arrow_forward
                    </span>
                  </button>
                ))}
              </nav>

              <div className="mt-4 p-3.5 bg-[#f1f3ff] rounded-xl text-[#44474e] space-y-2 text-xs border border-slate-200/60">
                <div className="flex items-center gap-1.5 text-[#071b3a] font-bold">
                  <span className="material-symbols-outlined text-[18px]">contact_support</span>
                  <span>Regulatory Queries?</span>
                </div>
                <p className="leading-snug">
                  Our Raipur central operations office handles all regulatory and credit syndication inquiries directly.
                </p>
                <a
                  className="text-[#071b3a] font-bold hover:underline block pt-1"
                  href={`tel:${SUPPORT_PHONE.replace(/[^0-9]/g, '')}`}
                >
                  Direct: {SUPPORT_PHONE}
                </a>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#44474e] font-bold block">
                Affiliated Banking Network
              </span>
              <div className="grid grid-cols-2 gap-2 text-center text-xs font-semibold text-[#44474e]">
                <div className="p-2 rounded-lg bg-[#f1f3ff] border border-slate-100">Public Banks</div>
                <div className="p-2 rounded-lg bg-[#f1f3ff] border border-slate-100">Private Banks</div>
                <div className="p-2 rounded-lg bg-[#f1f3ff] border border-slate-100">Apex NBFCs</div>
                <div className="p-2 rounded-lg bg-[#f1f3ff] border border-slate-100">SIDBI / HFCs</div>
              </div>
            </div>
          </aside>

          {/* Right Main Stream: 10 Clauses */}
          <div className="lg:col-span-8 space-y-6">
            {/* Mobile Jump Select */}
            <div className="lg:hidden bg-[#f1f3ff] p-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-slate-200">
              <span className="text-xs font-bold text-[#071b3a]">Jump to Clause:</span>
              <select
                className="w-full sm:w-auto bg-white text-[#141b2c] text-xs py-1.5 px-3 rounded-lg border border-slate-200 outline-none shadow-sm"
                value={activeClause}
                onChange={(e) => scrollToClause(e.target.value)}
              >
                {CLAUSES.map((clause) => (
                  <option key={clause.id} value={clause.id}>
                    {clause.num}. {clause.title}
                  </option>
                ))}
              </select>
            </div>

            {/* 01. Financial Information */}
            <article
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 transition-all hover:shadow-md scroll-mt-32"
              id="sec-financial-info"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] text-[#071b3a] flex items-center justify-center font-bold text-sm shrink-0">
                  01
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-[#141b2c]">Financial Information</h2>
                    <span className="px-2.5 py-0.5 rounded bg-[#f1f3ff] text-[#44474e] text-xs font-semibold">
                      Educational Scope
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    All materials, articles, research summaries, rate indications, case studies, and corporate briefs
                    published on this portal are made available purely for general educational and orientation purposes.
                    They do not constitute formal financial, investment, legal, or tax advice. Prospective borrowers and
                    commercial organizations must conduct independent auditing and engage licensed chartered
                    accountants before finalizing debt liabilities.
                  </p>
                  <div className="mt-3 p-3 bg-[#f1f3ff] rounded-xl text-xs text-[#44474e] flex items-center gap-2 border border-slate-100">
                    <span className="material-symbols-outlined text-[18px] text-[#4e5e81]">info</span>
                    <span>Projections do not represent an official financial underwriting commitment by Earth Finance.</span>
                  </div>
                </div>
              </div>
            </article>

            {/* 02. Loan Approval Protocol */}
            <article
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 transition-all hover:shadow-md scroll-mt-32"
              id="sec-loan-approval"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] text-[#071b3a] flex items-center justify-center font-bold text-sm shrink-0">
                  02
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-[#141b2c]">
                      Loan Approval &amp; Credit Sanction
                    </h2>
                    <span className="px-2.5 py-0.5 rounded bg-[#8cf6a3]/40 text-[#007235] text-xs font-bold">
                      Syndication Only
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    Earth Finance operates as a strategic financial advisory, debt documentation architect, and loan
                    syndication facilitator. We explicitly confirm that Earth Finance is not a banking company or direct
                    lender under the Banking Regulation Act, 1949, and does not issue direct credit disbursements. Final
                    loan approval, issuance of the formal sanction letter, disbursement limits, and covenant stipulations
                    rest entirely at the sole discretion of the sanctioning committee of the partnered bank or NBFC.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 mt-3 text-xs">
                    <div className="p-2.5 rounded-lg bg-[#f1f3ff] flex items-center gap-2 text-[#141b2c] font-medium border border-slate-100">
                      <span className="material-symbols-outlined text-[#006d33] text-[16px]">check</span>
                      <span>DPR &amp; CMA Preparation Included</span>
                    </div>
                    <div className="p-2.5 rounded-lg bg-[#f1f3ff] flex items-center gap-2 text-[#141b2c] font-medium border border-slate-100">
                      <span className="material-symbols-outlined text-[#ba1a1a] text-[16px]">close</span>
                      <span>No Direct Underwriting Authority</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* 03. Rates & Benchmark Spreads */}
            <article
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 transition-all hover:shadow-md scroll-mt-32"
              id="sec-rates-fluctuations"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] text-[#071b3a] flex items-center justify-center font-bold text-sm shrink-0">
                  03
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-[#141b2c]">
                      Interest Rates &amp; Benchmark Fluctuations
                    </h2>
                    <span className="px-2.5 py-0.5 rounded bg-[#f1f3ff] text-[#44474e] text-xs font-semibold">
                      Floating / External Benchmarks
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    Interest rate figures, spreads, and processing fees displayed on this website are benchmark
                    approximations (typically linked to the RBI Repo Lending Rate, Marginal Cost of Funds Based Lending
                    Rate - MCLR, or individual lender base rates). Commercial loan rates are dynamic and influenced by
                    monetary policy reviews, macro-economic liquidity, credit committee risk assessment, CIBIL/Commercial
                    Bureau ratings, and asset coverage ratios. Earth Finance holds no liability for rate shifts occurring
                    between preliminary consultation and formal disbursal.
                  </p>
                </div>
              </div>
            </article>

            {/* 04. Amounts & Sanctions */}
            <article
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 transition-all hover:shadow-md scroll-mt-32"
              id="sec-amounts-sanctions"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] text-[#071b3a] flex items-center justify-center font-bold text-sm shrink-0">
                  04
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-[#141b2c]">Loan Amounts &amp; Sanctions</h2>
                    <span className="px-2.5 py-0.5 rounded bg-[#f1f3ff] text-[#44474e] text-xs font-semibold">
                      Subject to Appraisal
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    Indicative facility ceilings (e.g., Working Capital up to ₹50 Cr, Term Loans up to ₹100 Cr) signify the
                    structural syndication capacity of our advisory desk. The exact sanction amount is determined strictly
                    following comprehensive financial appraisal, Debt Service Coverage Ratio (DSCR) calculations, Fixed
                    Asset Coverage Ratio (FACR), collateral valuation by registered empanelled valuers, and legal title
                    clearance of offered securities.
                  </p>
                </div>
              </div>
            </article>

            {/* 05. Third-Party Lenders */}
            <article
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 transition-all hover:shadow-md scroll-mt-32"
              id="sec-third-party"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] text-[#071b3a] flex items-center justify-center font-bold text-sm shrink-0">
                  05
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-[#141b2c]">
                      Third-Party Lenders &amp; Banking Partners
                    </h2>
                    <span className="px-2.5 py-0.5 rounded bg-[#ffdf94] text-[#241a00] text-xs font-bold">
                      Independent Underwriters
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    Earth Finance maintains professional direct-selling, advisory, and syndication partnerships with
                    leading nationalized public sector banks, scheduled private commercial banks, specialized
                    infrastructure funds, and RBI-registered NBFCs. Each financing partner governs its own credit policy,
                    appraisal fees, documentation charges, pre-payment terms, and penal clauses. Earth Finance does not
                    control or assume responsibility for independent credit rejections, revisions, or structural covenants
                    imposed by lenders.
                  </p>
                </div>
              </div>
            </article>

            {/* 06. Eligibility Criteria */}
            <article
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 transition-all hover:shadow-md scroll-mt-32"
              id="sec-eligibility"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] text-[#071b3a] flex items-center justify-center font-bold text-sm shrink-0">
                  06
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-[#141b2c]">
                      Eligibility Criteria &amp; Documentation
                    </h2>
                    <span className="px-2.5 py-0.5 rounded bg-[#f1f3ff] text-[#44474e] text-xs font-semibold">
                      KYC / PMLA Compliance
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    Submission of an inquiry or preliminary profile on this website does not guarantee eligibility.
                    Borrowers must satisfy statutory compliance mandates, including full Know Your Customer (KYC)
                    documentation, Anti-Money Laundering (AML) standards, authentic audited financials for at least 3
                    fiscal years (for MSME/Corporate loans), Goods and Services Tax (GST) returns, and valid enterprise
                    registrations (Udyam, CIN).
                  </p>
                </div>
              </div>
            </article>

            {/* 07. Processing Time */}
            <article
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 transition-all hover:shadow-md scroll-mt-32"
              id="sec-processing-time"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] text-[#071b3a] flex items-center justify-center font-bold text-sm shrink-0">
                  07
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-[#141b2c]">
                      Processing Time &amp; Turnaround Cycle
                    </h2>
                    <span className="px-2.5 py-0.5 rounded bg-[#f1f3ff] text-[#44474e] text-xs font-semibold">
                      Indicative Timelines
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    Referenced turnaround benchmarks (such as “Initial Triage in 48-72 Hours”) represent Earth Finance’s
                    internal diagnostic structuring and desk preparation cadence. Total cycle times through to formal
                    sanction and disbursal are governed by institutional bank processes, legal search report lead times,
                    physical site inspections, revenue authority non-encumbrance verification, and board approval cycles
                    within Chhattisgarh and national credit hubs.
                  </p>
                </div>
              </div>
            </article>

            {/* 08. Website Content & Calculators */}
            <article
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 transition-all hover:shadow-md scroll-mt-32"
              id="sec-calculators"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] text-[#071b3a] flex items-center justify-center font-bold text-sm shrink-0">
                  08
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-[#141b2c]">
                      Website Content &amp; Calculators
                    </h2>
                    <span className="px-2.5 py-0.5 rounded bg-[#f1f3ff] text-[#44474e] text-xs font-semibold">
                      Mathematical Estimation
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    Online financial widgets, EMI simulators, working capital estimators, and capex readiness tools
                    presented on this domain use standardized mathematical compounding formulas. These calculators do
                    not factor in lender-specific risk adjustments, broken-period interest, statutory stamp duties,
                    legal fees, or GST on processing costs. Computed outputs are strictly non-binding estimates.
                  </p>
                </div>
              </div>
            </article>

            {/* 09. External Links */}
            <article
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 transition-all hover:shadow-md scroll-mt-32"
              id="sec-external-links"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] text-[#071b3a] flex items-center justify-center font-bold text-sm shrink-0">
                  09
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-[#141b2c]">
                      External Links &amp; Integrations
                    </h2>
                    <span className="px-2.5 py-0.5 rounded bg-[#f1f3ff] text-[#44474e] text-xs font-semibold">
                      External Portals
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    Our site may furnish hyperlinks to regulatory platforms, government initiatives (CGTMSE, MUDRA,
                    Stand-Up India), and institutional repositories such as the Reserve Bank of India (RBI), Ministry of
                    Corporate Affairs (MCA), or Goods and Services Tax Network (GSTN). Earth Finance assumes no jurisdiction
                    or warranty regarding the operational uptime, accuracy, security, or contents of these third-party
                    statutory destinations.
                  </p>
                </div>
              </div>
            </article>

            {/* 10. Regulatory Alignment */}
            <article
              className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 transition-all hover:shadow-md scroll-mt-32"
              id="sec-regulatory"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#e0e8ff] text-[#071b3a] flex items-center justify-center font-bold text-sm shrink-0">
                  10
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <h2 className="text-lg sm:text-xl font-bold text-[#141b2c]">
                      Regulatory Alignment &amp; Fair Practices
                    </h2>
                    <span className="px-2.5 py-0.5 rounded bg-[#8cf6a3]/40 text-[#007235] text-xs font-bold">
                      RBI Ethical Standards
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    Earth Finance upholds transparency in line with the ethical guidelines of the RBI Fair Practices Code
                    for financial intermediaries and syndication advisors. We champion zero hidden advisory mandates, clear
                    written scopes of work, and strict client data confidentiality. All consumer rights regarding data
                    retention and communication protocols are respected under relevant Indian IT regulations.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Bottom Direct Advisory Access Section */}
      <section className="w-full bg-[#f1f3ff] py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white p-6 sm:p-8 md:p-10 rounded-2xl shadow-md flex flex-col md:flex-row items-center justify-between gap-6 border border-slate-200">
            <div className="space-y-2 text-center md:text-left max-w-2xl">
              <span className="text-xs text-[#007235] font-bold uppercase tracking-wider block">
                Direct Advisory Access
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#141b2c]">
                Have questions regarding our regulatory frameworks or syndication terms?
              </h3>
              <p className="text-xs sm:text-sm text-[#44474e]">
                Our corporate syndication and compliance team at Rajbandha Maidan, Raipur is available for structured
                consultations and legal document reviews.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#071b3a] text-white hover:bg-[#0b2d5c] transition-colors text-xs font-bold shadow-sm"
                href={`tel:${SUPPORT_PHONE.replace(/[^0-9]/g, '')}`}
              >
                <span className="material-symbols-outlined text-[18px] text-[#ffdf94]">call</span>
                <span>Talk to an Expert: {SUPPORT_PHONE}</span>
              </a>
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#ffdf94] text-[#241a00] hover:bg-[#efc13e] transition-colors text-xs font-bold shadow-sm"
              >
                <span>Contact Earth Finance</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
