import React from 'react';
import { Link } from 'react-router-dom';
import { SUPPORT_PHONE, OFFICE_ADDRESS } from '../../config/constants';

export const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full">
      {/* ========================================================
          HERO SECTION
          ======================================================== */}
      <section className="relative w-full bg-gradient-to-b from-surface-container-low via-background to-surface overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-32 right-0 w-[520px] h-[520px] rounded-full bg-primary-fixed/30 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-[420px] h-[420px] rounded-full bg-tertiary-fixed/25 blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Text Column */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container border border-slate-200/60 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-secondary"></span>
                <span className="text-xs uppercase tracking-wider text-primary-container font-bold">
                  About Earth Finance
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-[54px] font-extrabold text-primary-container leading-tight tracking-tight">
                Helping People &amp; Businesses Navigate Finance With{' '}
                <span className="relative inline-block text-on-surface">
                  Confidence
                  <span className="absolute left-0 bottom-1.5 w-full h-3 bg-tertiary-fixed/60 -z-10 rounded"></span>
                </span>
              </h1>

              <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
                Founded in Raipur, Chhattisgarh, Earth Finance is an advisory-led financing partner providing transparent, strategic capital solutions to businesses, enterprises, and families across Central India.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container text-sm font-bold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                >
                  <span>Schedule Strategic Consultation</span>
                  <span className="material-symbols-outlined text-[18px]">north_east</span>
                </Link>

                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-surface-container-lowest/80 shadow-sm backdrop-blur-sm border border-slate-100">
                  <span
                    className="material-symbols-outlined text-secondary text-[22px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                  <span className="text-xs font-semibold text-primary-container">
                    Fiduciary Transparency • Central India Focus
                  </span>
                </div>
              </div>
            </div>

            {/* Hero Visual Column */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Accent Decorative Geometry */}
                <div className="absolute -top-4 -right-4 w-full h-full rounded-2xl bg-primary-container shadow-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-28 h-28 rounded-xl bg-tertiary-fixed/80 -z-0"></div>

                {/* Image Frame */}
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-surface-container-lowest border border-white/20">
                  <img
                    className="w-full h-[440px] object-cover"
                    alt="Senior corporate advisory meeting in an executive boardroom in Raipur"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCRm_qRJ_PBAqGVVep6AIG1lF0Obm9tLu2iOhYWye5V5i2QqPrE3UncajLjzsS-CDaCdBQmt2iCJ3eKQN62st5Ok3p4kPDp6r1-gXI3D7qnhURh_8QuBpQB0_mxohHD55ROr24yl9Gwk3E-rb_PTaS1qC4Ubn_TH-M7B8PuID8Mlp0i6ydqPWAmfxnxBFzC_G3wXKkY8yx6C4JbFiExvsNcNAeTCj3P3xKWUmEGnqfz6hrEggwzQWBE"
                  />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-primary-container via-primary-container/80 to-transparent p-6 text-surface-container-lowest">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wider text-tertiary-fixed font-semibold">
                          Advisory Desk • Raipur
                        </p>
                        <p className="text-base font-bold">Institutional Grade Governance</p>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-primary-container flex items-center justify-center font-bold">
                        <span className="material-symbols-outlined text-[20px]">account_balance</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2: OUR APPROACH
          ======================================================== */}
      <section className="w-full py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            {/* Left: Story & Narrative */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-secondary font-bold">
                  Our Philosophy &amp; Mission
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-container tracking-tight">
                  Bridging the Gap Between Ambition and Capital
                </h2>
              </div>

              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                In an evolving financial ecosystem, growing enterprises and visionary entrepreneurs often face complex underwriting bottlenecks, opaque commission tiers, and slow approval cycles. Earth Finance was established to eliminate this structural friction.
              </p>

              <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                We navigate banking bureaucracy, demystify multi-tier credit policies, and orchestrate the exact loan architecture tailored to every phase of enterprise maturation—from immediate working capital infusions to multi-crore industrial expansion.
              </p>

              {/* Leadership Quote Panel */}
              <div className="relative bg-surface-container-low p-6 rounded-2xl shadow-sm space-y-4 border border-slate-100">
                <span className="material-symbols-outlined text-tertiary-fixed-dim text-4xl leading-none">
                  format_quote
                </span>
                <p className="text-base sm:text-lg text-primary-container font-semibold italic leading-relaxed">
                  "We believe financial advisory should be rooted in deep local understanding and institutional rigor."
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-tertiary-fixed flex items-center justify-center font-bold text-sm">
                    EF
                  </div>
                  <div>
                    <p className="text-xs font-bold text-primary-container">Principal Advisory Board</p>
                    <p className="text-[11px] text-on-surface-variant">Earth Finance Regional Stewardship</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Institutional Pillars & Strengths */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Pillar 1 */}
                <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-low shadow-sm hover:shadow-md transition-shadow space-y-4 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shadow-sm">
                    <span className="material-symbols-outlined text-2xl">hub</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary-container">Multi-Lender Network</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Direct portfolio access and relationships with 20+ Tier-1 Nationalized Banks, leading Private Lenders, and Top NBFCs across India.
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-secondary font-semibold">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Optimized Loan Matching</span>
                  </div>
                </div>

                {/* Pillar 2 */}
                <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-low shadow-sm hover:shadow-md transition-shadow space-y-4 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shadow-sm">
                    <span className="material-symbols-outlined text-2xl">rule</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary-container">Structured Underwriting</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Exhaustive pre-submission appraisal that stress-tests balance sheets, asset valuations, and debt service ratios for maximum approval fidelity.
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-secondary font-semibold">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Pre-Vetted File Submission</span>
                  </div>
                </div>

                {/* Pillar 3 */}
                <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-low shadow-sm hover:shadow-md transition-shadow space-y-4 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shadow-sm">
                    <span className="material-symbols-outlined text-2xl">travel_explore</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary-container">Local Presence, National Standards</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Deep ground-level presence in Raipur and Chhattisgarh backed by Tier-1 metropolitan governance, precision analytics, and advisory ethics.
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-secondary font-semibold">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>Central India Command</span>
                  </div>
                </div>

                {/* Pillar 4 */}
                <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-low shadow-sm hover:shadow-md transition-shadow space-y-4 border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary-container shadow-sm">
                    <span className="material-symbols-outlined text-2xl">visibility</span>
                  </div>
                  <h3 className="text-lg font-bold text-primary-container">Transparent Advisory</h3>
                  <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                    Zero hidden brokerage markups, unequivocal fee schedules, transparent loan covenants, and real-time step-by-step progress tracking.
                  </p>
                  <div className="inline-flex items-center gap-1.5 text-xs text-secondary font-semibold">
                    <span className="material-symbols-outlined text-base">check_circle</span>
                    <span>100% Disclosure Policy</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3: CORE VALUES
          ======================================================== */}
      <section className="w-full py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs uppercase tracking-widest text-secondary font-bold">
              Uncompromising Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-container tracking-tight">
              Our Core Values
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant">
              The non-negotiable ethical pillars that guide every client interaction, bank negotiation, and financial structuring engagement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1: Trust */}
            <div className="relative bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm hover:-translate-y-1 transition-all duration-300 space-y-4 flex flex-col justify-between border border-slate-100">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed/30 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-3xl">verified</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-secondary tracking-widest uppercase">
                    01 / Integrity
                  </span>
                  <h3 className="text-xl font-bold text-primary-container">Trust</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Built on unflinching honesty, absolute data confidentiality, and a steadfast fiduciary commitment to our clients' long-term enterprise health.
                </p>
              </div>
              <div className="w-12 h-1 bg-secondary rounded-full mt-4"></div>
            </div>

            {/* Value 2: Transparency */}
            <div className="relative bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm hover:-translate-y-1 transition-all duration-300 space-y-4 flex flex-col justify-between border border-slate-100">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-tertiary-fixed/40 flex items-center justify-center text-amber-800">
                  <span className="material-symbols-outlined text-3xl">policy</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-amber-800 tracking-widest uppercase">
                    02 / Clarity
                  </span>
                  <h3 className="text-xl font-bold text-primary-container">Transparency</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Clear breakdowns of interest rates, processing fees, documentation requirements, and repayment amortization before signing any document.
                </p>
              </div>
              <div className="w-12 h-1 bg-tertiary-fixed-dim rounded-full mt-4"></div>
            </div>

            {/* Value 3: Professionalism */}
            <div className="relative bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm hover:-translate-y-1 transition-all duration-300 space-y-4 flex flex-col justify-between border border-slate-100">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-primary-container tracking-widest uppercase">
                    03 / Competence
                  </span>
                  <h3 className="text-xl font-bold text-primary-container">Professionalism</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Domain-certified corporate advisors, structured file preparation, and rigorous follow-ups at every critical milestone of the financing lifecycle.
                </p>
              </div>
              <div className="w-12 h-1 bg-primary-container rounded-full mt-4"></div>
            </div>

            {/* Value 4: Customer Focus */}
            <div className="relative bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm hover:-translate-y-1 transition-all duration-300 space-y-4 flex flex-col justify-between border border-slate-100">
              <div className="space-y-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary-fixed/30 flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-3xl">psychology</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-secondary tracking-widest uppercase">
                    04 / Alignment
                  </span>
                  <h3 className="text-xl font-bold text-primary-container">Customer Focus</h3>
                </div>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                  Custom debt structures engineered around genuine commercial cash flows and revenue velocity rather than rigid, generic lender packages.
                </p>
              </div>
              <div className="w-12 h-1 bg-secondary rounded-full mt-4"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4: WHY WORK WITH US
          ======================================================== */}
      <section className="w-full py-20 bg-surface-container-lowest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Image Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container">
                <img
                  alt="Earth Finance Corporate Presence in Raipur"
                  className="w-full h-[480px] object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBvFctj8fxaKVYEz5SgNIA9AU9Zd_j12m0V1bxGzYO_6OrUiP3VF8Gehc6MCW2BgiXdLmVOnpTykFcOpFdZ45dUZC42e0smL7AjpUmrnWD8msSwe0zmmicYkk_xktj2P2jjG-56EZRocLbAJEnw7bRcZsY_L_YmI8nntYFyu6h6YBZbbijMa8-WyRou1jJUTqk5Hs7C0kybZaTBnFhLYCCLKgqUBbPWUxRNt056LN8SifNzxaOTKEfg"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-container/70 via-transparent to-transparent"></div>

                {/* Inset Badge */}
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-surface-container-lowest/90 backdrop-blur-md shadow-lg flex items-center gap-4 border border-slate-100">
                  <div className="w-12 h-12 rounded-lg bg-primary-container text-tertiary-fixed flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">location_city</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-primary-container">Central Regional Center</p>
                    <p className="text-xs text-on-surface-variant">Civil Lines, Raipur • Serving Chhattisgarh &amp; Beyond</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-secondary font-bold">
                  The Strategic Advantage
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-container tracking-tight">
                  Why Work With Earth Finance?
                </h2>
                <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                  We operate not as transactional agents, but as strategic debt advisors aligned directly with your balance sheet objectives.
                </p>
              </div>

              {/* 3 Clear Advantages */}
              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-surface-container-low shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed/40 text-secondary flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">speed</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-primary-container">Faster Turnaround Times</h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      Bypassing standard retail branch queues through direct escalation to zonal credit officers, ensuring rapid sanction letters and swift liquidity deployment.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-surface-container-low shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-tertiary-fixed/50 text-amber-800 flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">payments</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-primary-container">Higher Sanction Amounts</h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      Institutional collateral analysis and holistic debt-service structuring that unlock maximum legal borrowing limits from multi-lender consortia.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-surface-container-low shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                  <div className="w-12 h-12 rounded-xl bg-surface-container text-primary-container flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-2xl">support_agent</span>
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-base font-bold text-primary-container">Dedicated Relationship Manager</h4>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed">
                      Single-point corporate stewardship coordinating every facet of file drafting, legal compliance, field verification, and final disbursement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          FINAL CTA SECTION
          ======================================================== */}
      <section className="w-full py-20 bg-primary-container text-surface-container-lowest relative overflow-hidden">
        {/* Ambient gold glow */}
        <div className="absolute -bottom-24 right-0 w-96 h-96 rounded-full bg-tertiary-fixed/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high/10 text-tertiary-fixed text-xs tracking-wider uppercase font-bold border border-white/10">
            <span className="material-symbols-outlined text-base">forum</span>
            <span>Start The Dialogue</span>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-container-lowest tracking-tight">
              Let's Discuss Your Financial Requirement
            </h2>
            <p className="text-sm sm:text-base text-on-primary-container leading-relaxed">
              Visit our office in Raipur or connect with our senior advisory team online today for a comprehensive, confidential portfolio assessment.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container text-sm font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <span>Contact Us</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>

            <a
              className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-surface-container-lowest text-sm font-semibold px-8 py-4 rounded-xl shadow-sm transition-all backdrop-blur-sm border border-white/10"
              href={`tel:${SUPPORT_PHONE}`}
            >
              <span className="material-symbols-outlined text-[18px] text-tertiary-fixed">call</span>
              <span>Call {SUPPORT_PHONE}</span>
            </a>
          </div>

          <div className="pt-6 flex flex-wrap justify-center items-center gap-6 sm:gap-8 text-on-primary-container text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-base">check</span>
              <span>Zero Obligation Review</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-base">check</span>
              <span>Full NDA Discretion</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-base">check</span>
              <span>Rapid 24h Response</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
