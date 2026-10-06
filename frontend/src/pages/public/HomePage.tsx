import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SUPPORT_PHONE } from '../../config/constants';
import { Modal } from '../../components/common/Modal';
import { EnquiryForm } from '../../components/forms/EnquiryForm';
import { EmiCalculator } from '../../components/common/EmiCalculator';

export const HomePage: React.FC = () => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState('Business Finance');
  const [isEmiModalOpen, setIsEmiModalOpen] = useState(false);

  const openEnquiry = (type: string) => {
    setSelectedLoanType(type);
    setIsEnquiryOpen(true);
  };

  return (
    <div className="flex flex-col w-full">
      {/* ========================================================
          SECTION 1: HERO
          ======================================================== */}
      <section className="relative bg-gradient-to-br from-primary-container via-[#0B2D5C] to-primary-container text-surface-container-lowest overflow-hidden">
        {/* Subtle architectural background glow & decorative gold gradient shapes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-tertiary-fixed/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#1455A0]/20 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Hero Left Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Authority Micro-Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary-container/90 text-tertiary-fixed shadow-sm border border-tertiary-fixed/20">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                <span className="text-xs uppercase font-bold tracking-widest text-tertiary-fixed">
                  Trusted Financial Solutions
                </span>
                <span className="material-symbols-outlined text-[14px] text-tertiary-fixed">verified</span>
              </div>

              {/* Hero Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-surface-container-lowest leading-[1.08] tracking-tight">
                Financial Solutions Built Around{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tertiary-fixed via-tertiary-fixed-dim to-tertiary-fixed">
                  Your Goals
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-surface-container max-w-2xl leading-relaxed font-normal">
                Explore institutional-grade financing solutions architected for businesses, enterprises, and visionary professionals. From dynamic working capital to pan-India asset acquisition, unlock growth with tailored fiscal advisory.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container font-bold text-base px-7 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <span>Apply for Loan</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </Link>

                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-surface-container-lowest font-semibold text-base px-6 py-3.5 rounded-xl transition-all border border-white/10"
                >
                  <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">calendar_today</span>
                  <span>Book Consultation</span>
                </Link>

                <button
                  onClick={() => setIsEmiModalOpen(true)}
                  className="inline-flex items-center justify-center gap-1.5 text-xs text-surface-container hover:text-tertiary-fixed font-medium underline underline-offset-4 py-2 transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">calculate</span>
                  <span>Calculate EMI</span>
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-y-3 gap-x-6 text-surface-container">
                <div className="flex items-center gap-2 bg-primary-container/40 px-3 py-1.5 rounded-lg shadow-sm border border-white/5">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                  <span className="text-xs sm:text-sm font-medium">Professional Guidance</span>
                </div>
                <div className="flex items-center gap-2 bg-primary-container/40 px-3 py-1.5 rounded-lg shadow-sm border border-white/5">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                  <span className="text-xs sm:text-sm font-medium">Transparent Process</span>
                </div>
                <div className="flex items-center gap-2 bg-primary-container/40 px-3 py-1.5 rounded-lg shadow-sm border border-white/5">
                  <span className="material-symbols-outlined text-secondary-fixed text-[18px]">check_circle</span>
                  <span className="text-xs sm:text-sm font-medium">Multiple Finance Solutions</span>
                </div>
              </div>
            </div>

            {/* Hero Right Column (Composition & Advisory Visual) */}
            <div className="lg:col-span-5 relative mt-6 lg:mt-0">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Glow background circle */}
                <div className="absolute inset-0 bg-gradient-to-tr from-secondary/30 via-tertiary-fixed/15 to-transparent rounded-2xl transform rotate-2 scale-105 blur-lg"></div>

                {/* Main Advisor Portrait Canvas */}
                <div className="relative bg-primary-container rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                  <img
                    className="w-full h-[460px] object-cover object-center"
                    alt="Distinguished Indian executive and senior corporate financial director engaged in an institutional consultation across an executive mahogany boardroom table in Raipur."
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuD0w6cT7Dt82dxl7dGQ7Gymhc6dk600eiLwtI6AOnOhbAURU2E3PYzWSUgx-Qlsy2K3PZ86p_z7Qboe6vEiASXzgBg2p0T9mUjSaI700f1YkTXPPftwNsTmqA58gItl14Ta9Gw2DkKlvnkgDUovSX1gOgpYKoVWYH2_COXPwrcqgEUZJCP4JBlkNt5JdBoJrul72IEg4GXFd_ve24ziHbn17NwmQMVxI3LTLJBmWRLBRf93eFvy-hpn"
                  />
                  {/* Gradient Scrim for contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-transparent to-transparent opacity-80"></div>

                  {/* Inline Micro Data Chart Badge */}
                  <div className="absolute bottom-4 left-4 right-4 bg-primary-container/90 backdrop-blur-md rounded-xl p-4 shadow-xl text-surface-container-lowest border border-white/10">
                    <div className="flex items-center justify-between pb-2">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">trending_up</span>
                        <span className="text-xs uppercase font-bold tracking-wider text-surface-variant">Regional Impact Metric</span>
                      </div>
                      <span className="bg-secondary/30 text-secondary-fixed text-[11px] font-bold px-2 py-0.5 rounded-full">Audited FY24</span>
                    </div>

                    {/* Mini inline SVG Growth Sparkline */}
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-3xl font-extrabold text-tertiary-fixed">₹250+ Cr</div>
                        <div className="text-xs text-surface-variant">Disbursed across Central India</div>
                      </div>
                      <svg className="w-24 h-10 text-secondary-fixed" fill="none" preserveAspectRatio="none" viewBox="0 0 100 40">
                        <path d="M0 35 L20 28 L40 30 L60 18 L80 14 L100 4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"></path>
                        <path d="M0 35 L20 28 L40 30 L60 18 L80 14 L100 4 V40 H0 Z" fill="currentColor" fillOpacity="0.15"></path>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Floating Micro-Card 1 (Top Left Overlap) */}
                <div className="absolute -top-5 -left-4 sm:-left-8 bg-surface-container-lowest text-on-surface p-3.5 rounded-xl shadow-xl max-w-[210px] hidden sm:flex items-center gap-3 transform -rotate-1 hover:rotate-0 transition-transform border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">speed</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-on-surface truncate">98.4% Readiness</div>
                    <div className="text-[11px] text-on-surface-variant truncate">Fast Approval Track</div>
                  </div>
                </div>

                {/* Floating Micro-Card 2 (Middle Right Overlap) */}
                <div className="absolute top-1/2 -right-4 sm:-right-6 -translate-y-1/2 bg-surface-container-lowest text-on-surface p-3.5 rounded-xl shadow-xl max-w-[200px] hidden sm:flex items-center gap-3 transform rotate-1 hover:rotate-0 transition-transform border border-slate-100">
                  <div className="w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container flex-shrink-0">
                    <span className="material-symbols-outlined text-[20px]">verified_user</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-on-surface">Institutional</div>
                    <div className="text-[11px] text-on-surface-variant">Bank Grade KYC</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: QUICK FINANCE CATEGORIES
          ======================================================== */}
      <section className="bg-surface-container-lowest py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-14">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-primary-container text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-[16px] text-primary-container">account_balance_wallet</span>
              <span>Comprehensive Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              Find the Right Financial Solution
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant">
              Solutions architected for specific financial requirements across enterprise scale and personal wealth generation.
            </p>
          </div>

          {/* 6 Category Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Business Finance */}
            <div
              onClick={() => openEnquiry('Business Finance')}
              className="group relative bg-surface-container-low rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer border border-slate-100"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-surface-container-lowest transition-colors">
                  <span className="material-symbols-outlined text-[26px]">storefront</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-on-surface group-hover:text-primary-container transition-colors">
                    Business Finance
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Working capital, CC limits, bill discounting, and structural enterprise term expansion.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-2 flex items-center justify-between text-primary-container font-semibold text-xs">
                <span>Explore business credit</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 2. Property Finance */}
            <div
              onClick={() => openEnquiry('Property Finance')}
              className="group relative bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer border border-slate-100"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-surface-container-lowest transition-colors">
                  <span className="material-symbols-outlined text-[26px]">apartment</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-on-surface group-hover:text-primary-container transition-colors">
                    Property Finance
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Loan Against Property (LAP), commercial real estate purchase, and builder asset leverage.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-2 flex items-center justify-between text-primary-container font-semibold text-xs">
                <span>Explore property equity</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 3. Industrial Finance */}
            <div
              onClick={() => openEnquiry('Industrial Finance')}
              className="group relative bg-surface-container-low rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer border border-slate-100"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center text-on-secondary-container group-hover:bg-secondary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-[26px]">precision_manufacturing</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-on-surface group-hover:text-secondary transition-colors">
                    Industrial Finance
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Heavy plant machinery, automation upgrades, factory setup, and industrial warehouse credit.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-2 flex items-center justify-between text-secondary font-semibold text-xs">
                <span>Explore industrial terms</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 4. Medical Finance */}
            <div
              onClick={() => openEnquiry('Medical Finance')}
              className="group relative bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer border border-slate-100"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-surface-container-lowest transition-colors">
                  <span className="material-symbols-outlined text-[26px]">medical_services</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-on-surface group-hover:text-primary-container transition-colors">
                    Medical Finance
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Specialized doctor loans, diagnostic center setups, MRI/CT scanners, and hospital expansions.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-2 flex items-center justify-between text-primary-container font-semibold text-xs">
                <span>Explore medical lines</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 5. Education Finance */}
            <div
              onClick={() => openEnquiry('Education Finance')}
              className="group relative bg-surface-container-low rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer border border-slate-100"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-surface-container-lowest transition-colors">
                  <span className="material-symbols-outlined text-[26px]">school</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-on-surface group-hover:text-primary-container transition-colors">
                    Education Finance
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    School campus infrastructure, university lab funding, institutional bus fleets, and expansion loans.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-2 flex items-center justify-between text-primary-container font-semibold text-xs">
                <span>Explore campus funding</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
              </div>
            </div>

            {/* 6. Personal & Vehicle */}
            <div
              onClick={() => openEnquiry('Personal & Vehicle')}
              className="group relative bg-surface-container-lowest rounded-xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between cursor-pointer border border-slate-100"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-surface-container-lowest transition-colors">
                  <span className="material-symbols-outlined text-[26px]">directions_car</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-on-surface group-hover:text-primary-container transition-colors">
                    Personal &amp; Vehicle
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    High-net-worth personal liquidity lines, commercial fleet packages, and premium vehicle financing.
                  </p>
                </div>
              </div>
              <div className="mt-6 pt-2 flex items-center justify-between text-primary-container font-semibold text-xs">
                <span>Explore liquidity</span>
                <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: FEATURED SOLUTIONS (ANCHOR FACILITIES)
          ======================================================== */}
      <section className="bg-surface-container-low py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-primary-container">Anchor Facilities</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                Solutions That Help You Move Forward
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md">
              Structured institutional facilities configured to match cyclical capital requirements with minimal turnaround.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Featured Card 1: Business Finance */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group border border-slate-100">
              <div className="relative h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt="Modern Indian business executives reviewing quarterly corporate financial books and growth data inside a glass conference room."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDLcmURF7CoOkQFYmQY25JtHyF25rhERc95Q6QdaFsGi25dbR1MZPAUAaUvt5BXIs28cZqyuRV0ezYn5tVxwLYyXViDOa_vcSM9uCT7dqtqqbKxFpNbVHWf5Lr1wVz5MdSACYhAJWvPyVHDmKVwc5YHTlUJhKd1ZgYt8W4X8JtSNgk0bJT1hd65SCrJhH30ueuWy8nbzllAqb87VG-E0lFc72oGQrdPSAfVF3UNN4k1HijLOf8wcZuU"
                />
                <span className="absolute top-4 left-4 bg-primary-container text-surface-container-lowest text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Enterprise Ready
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-on-surface group-hover:text-primary-container transition-colors">
                    Corporate &amp; Business Loans
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Structured capital assistance for manufacturing, trading, and service enterprises looking to expand national footprints.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <div className="text-xs font-medium text-on-surface-variant">Tenure up to 10 Yrs</div>
                  <Link
                    to="/loans"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary-container group-hover:text-amber-700 transition-colors"
                  >
                    <span>Explore Solution</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Card 2: Property Finance */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group border border-slate-100">
              <div className="relative h-56 overflow-hidden">
                <img
                  alt="Modern architectural commercial property and high-end corporate office building in an Indian metropolitan hub."
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvFctj8fxaKVYEz5SgNIA9AU9Zd_j12m0V1bxGzYO_6OrUiP3VF8Gehc6MCW2BgiXdLmVOnpTykFcOpFdZ45dUZC42e0smL7AjpUmrnWD8msSwe0zmmicYkk_xktj2P2jjG-56EZRocLbAJEnw7bRcZsY_L_YmI8nntYFyu6h6YBZbbijMa8-WyRou1jJUTqk5Hs7C0kybZaTBnFhLYCCLKgqUBbPWUxRNt056LN8SifNzxaOTKEfg"
                />
                <span className="absolute top-4 left-4 bg-tertiary-fixed text-primary-container text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  High Value
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-on-surface group-hover:text-primary-container transition-colors">
                    Commercial Property &amp; LAP
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Unlock maximum liquidity from your commercial assets and residential properties with optimized loan-to-value ratios.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <div className="text-xs font-medium text-on-surface-variant">LTV up to 75%</div>
                  <Link
                    to="/loans"
                    className="inline-flex items-center gap-1 text-xs font-bold text-primary-container group-hover:text-amber-700 transition-colors"
                  >
                    <span>Explore Solution</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Featured Card 3: Industrial Finance */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group border border-slate-100">
              <div className="relative h-56 overflow-hidden">
                <img
                  alt="Modern manufacturing and industrial warehouse facility in India with high-tech equipment."
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDI9DY0ZxfAJ_cwHb8JDVwDEc1hlKVQ7ckeG6ydI5gnEwVQTT3cjBvD6rSqDglIPs7-Uj7-JxycqSlRFOZSE8JBYLmO1mDtZoKHadUIF9W5HhiKEawjH80cTAVJQUcA1NG376yz5dRTU92h4Q_mC96OhY7IWgwFi2bVlABZD2wDyA7mqqf4TlYpc5LCwg_sFQYaZBZez5Yj96GvBh9dmm6QDel_SHn81fr4Z6T-XKfqGGH0u7v8HX3O"
                />
                <span className="absolute top-4 left-4 bg-secondary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                  Capex Financing
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-on-surface group-hover:text-secondary transition-colors">
                    Plant &amp; Machinery Loans
                  </h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Technological upgrades and new industrial plants with competitive amortization cycles aligned to production milestones.
                  </p>
                </div>
                <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                  <div className="text-xs font-medium text-on-surface-variant">Fast Capex Release</div>
                  <Link
                    to="/loans"
                    className="inline-flex items-center gap-1 text-xs font-bold text-secondary group-hover:text-green-800 transition-colors"
                  >
                    <span>Explore Solution</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: WHY EARTH FINANCE
          ======================================================== */}
      <section className="bg-surface-container-lowest py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  alt="Modern architectural commercial property and corporate office building in Raipur, Chhattisgarh."
                  className="w-full h-[480px] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvFctj8fxaKVYEz5SgNIA9AU9Zd_j12m0V1bxGzYO_6OrUiP3VF8Gehc6MCW2BgiXdLmVOnpTykFcOpFdZ45dUZC42e0smL7AjpUmrnWD8msSwe0zmmicYkk_xktj2P2jjG-56EZRocLbAJEnw7bRcZsY_L_YmI8nntYFyu6h6YBZbbijMa8-WyRou1jJUTqk5Hs7C0kybZaTBnFhLYCCLKgqUBbPWUxRNt056LN8SifNzxaOTKEfg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-transparent"></div>

                {/* Regional Anchor Badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-surface-container-lowest/95 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-4 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center text-primary-container flex-shrink-0">
                    <span className="material-symbols-outlined text-[24px]">corporate_fare</span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-on-surface truncate">Regional Headquarters</div>
                    <div className="text-xs text-on-surface-variant">Civil Lines, Raipur, Chhattisgarh</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-primary-container">Why Earth Finance</span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                  Guidance You Can Trust
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-tertiary-fixed to-secondary rounded-full mt-2"></div>
              </div>

              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                We operate as your dedicated institutional debt partner, cutting through bureaucracy to secure optimal funding structures tailored to your balance sheet.
              </p>

              {/* 4 Concise Feature Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Feature 1 */}
                <div className="bg-surface-container-low p-4 rounded-xl space-y-2 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <h4 className="text-sm font-bold text-on-surface">Expert Guidance</h4>
                  <p className="text-xs text-on-surface-variant">
                    Decades of combined advisory experience in premier institutional banking.
                  </p>
                </div>

                {/* Feature 2 */}
                <div className="bg-surface-container-low p-4 rounded-xl space-y-2 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <h4 className="text-sm font-bold text-on-surface">Customized Structures</h4>
                  <p className="text-xs text-on-surface-variant">
                    Repayment and drawdown models aligned to your real cash-flow cycle.
                  </p>
                </div>

                {/* Feature 3 */}
                <div className="bg-surface-container-low p-4 rounded-xl space-y-2 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <h4 className="text-sm font-bold text-on-surface">Transparent Terms</h4>
                  <p className="text-xs text-on-surface-variant">
                    Zero hidden charges, straightforward milestones, and dedicated liaison officers.
                  </p>
                </div>

                {/* Feature 4 */}
                <div className="bg-surface-container-low p-4 rounded-xl space-y-2 border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-secondary-container flex items-center justify-center text-on-secondary-container">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <h4 className="text-sm font-bold text-on-surface">Multi-Lender Access</h4>
                  <p className="text-xs text-on-surface-variant">
                    Strategic tie-ups with leading public banks, private institutions, and top NBFCs.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5: HOW IT WORKS
          ======================================================== */}
      <section className="bg-primary-container text-surface-container-lowest py-16 lg:py-24 relative overflow-hidden">
        {/* Faint gradient accents */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B2D5C]/30 via-transparent to-primary-container/80 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-14">
            <span className="text-xs uppercase font-bold tracking-widest text-tertiary-fixed">
              Disciplined Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-container-lowest tracking-tight">
              Your Financing Journey, Simplified
            </h2>
            <p className="text-sm sm:text-base text-surface-container max-w-xl mx-auto">
              A four-step institutional execution model delivering speed, accuracy, and clear underwriting approvals.
            </p>
          </div>

          {/* 4 Horizontal Step Cards with Gold Numbers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting decorative line on desktop */}
            <div className="hidden lg:block absolute top-12 left-12 right-12 h-0.5 bg-gradient-to-r from-tertiary-fixed/30 via-secondary-fixed/40 to-tertiary-fixed/30 pointer-events-none"></div>

            {/* Step 1 */}
            <div className="bg-surface-container-high/10 rounded-xl p-6 relative flex flex-col justify-between shadow-lg border border-white/10 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-tertiary-fixed">01</span>
                  <span className="material-symbols-outlined text-surface-container-high text-[24px]">assignment</span>
                </div>
                <h3 className="text-lg font-bold text-surface-container-lowest">Share Requirement</h3>
                <p className="text-xs sm:text-sm text-surface-container leading-relaxed">
                  Initial consultation and requirement profiling to analyze capital volume, tenure, and security profile.
                </p>
              </div>
              <div className="pt-4 text-tertiary-fixed text-xs font-semibold">Step 1 of 4</div>
            </div>

            {/* Step 2 */}
            <div className="bg-surface-container-high/10 rounded-xl p-6 relative flex flex-col justify-between shadow-lg border border-white/10 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-tertiary-fixed">02</span>
                  <span className="material-symbols-outlined text-surface-container-high text-[24px]">balance</span>
                </div>
                <h3 className="text-lg font-bold text-surface-container-lowest">Advisory Appraisal</h3>
                <p className="text-xs sm:text-sm text-surface-container leading-relaxed">
                  Comprehensive financial assessment, balance-sheet restructuring, and strategic lender product matching.
                </p>
              </div>
              <div className="pt-4 text-tertiary-fixed text-xs font-semibold">Step 2 of 4</div>
            </div>

            {/* Step 3 */}
            <div className="bg-surface-container-high/10 rounded-xl p-6 relative flex flex-col justify-between shadow-lg border border-white/10 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-tertiary-fixed">03</span>
                  <span className="material-symbols-outlined text-surface-container-high text-[24px]">folder_managed</span>
                </div>
                <h3 className="text-lg font-bold text-surface-container-lowest">Documentation</h3>
                <p className="text-xs sm:text-sm text-surface-container leading-relaxed">
                  Hassle-free dossier compilation, corporate filings verification, and expedited underwriting coordination.
                </p>
              </div>
              <div className="pt-4 text-tertiary-fixed text-xs font-semibold">Step 3 of 4</div>
            </div>

            {/* Step 4 */}
            <div className="bg-surface-container-high/10 rounded-xl p-6 relative flex flex-col justify-between shadow-lg border border-white/10 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-extrabold text-tertiary-fixed">04</span>
                  <span className="material-symbols-outlined text-secondary-fixed text-[24px]">check_circle</span>
                </div>
                <h3 className="text-lg font-bold text-surface-container-lowest">Sanction &amp; Disbursal</h3>
                <p className="text-xs sm:text-sm text-surface-container leading-relaxed">
                  Swift credit sanction letter handover followed by end-to-end disbursement tracking directly into your account.
                </p>
              </div>
              <div className="pt-4 text-secondary-fixed text-xs font-semibold">Final Stage</div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 6: CTA BANNER
          ======================================================== */}
      <section className="bg-surface-container-lowest py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-r from-[#1455A0] via-primary-container to-primary-container rounded-2xl p-8 lg:p-16 text-surface-container-lowest overflow-hidden shadow-2xl border border-white/10">
            {/* Background decorative geometric mesh */}
            <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-tertiary-fixed/10 blur-2xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-lowest/10 text-tertiary-fixed text-xs font-bold uppercase tracking-wider border border-white/10">
                <span className="material-symbols-outlined text-[16px]">support_agent</span>
                <span>Immediate Advisory Response</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-surface-container-lowest tracking-tight">
                Let's Find the Right Financing Solution for You
              </h2>

              <p className="text-base sm:text-lg text-surface-container leading-relaxed max-w-2xl">
                Tell us your capital vision and our senior debt consultants will provide a comprehensive feasibility breakdown within 24 business hours.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container font-bold text-base px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <span>Apply for Loan</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </Link>

                <a
                  className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-surface-container-lowest font-semibold text-base px-7 py-4 rounded-xl transition-all border border-white/10"
                  href={`tel:${SUPPORT_PHONE}`}
                >
                  <span className="material-symbols-outlined text-tertiary-fixed text-[20px]">call</span>
                  <span>Talk to an Expert ({SUPPORT_PHONE})</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Instant Enquiry from Categories */}
      <Modal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        title={`Express Inquiry: ${selectedLoanType}`}
      >
        <div className="py-2">
          <p className="text-xs text-slate-500 mb-4">
            Submit your contact information and requirement details. Our corporate desk will connect with you within 24 business hours.
          </p>
          <EnquiryForm
            initialLoanType={selectedLoanType}
            onSuccess={() => setIsEnquiryOpen(false)}
          />
        </div>
      </Modal>

      {/* Modal for EMI Calculator */}
      <Modal
        isOpen={isEmiModalOpen}
        onClose={() => setIsEmiModalOpen(false)}
        title="Interactive EMI & Repayment Calculator"
      >
        <div className="py-2">
          <EmiCalculator />
        </div>
      </Modal>
    </div>
  );
};
