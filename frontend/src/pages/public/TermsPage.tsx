import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Gavel,
  ShieldCheck,
  Calendar,
  MapPin,
  Printer,
  AlertTriangle,
  Info,
  CheckCircle2,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  Handshake,
  Home,
  ChevronRight,
  FileText
} from 'lucide-react';
import { SUPPORT_PHONE, SUPPORT_EMAIL, OFFICE_ADDRESS } from '../../config/constants';

interface ClauseItem {
  id: string;
  num: string;
  title: string;
}

const CLAUSES: ClauseItem[] = [
  { id: 'acceptance', num: '01', title: 'Acceptance of Terms' },
  { id: 'usage', num: '02', title: 'Website Usage & Access' },
  { id: 'finance-info', num: '03', title: 'Advisory Financial Information' },
  { id: 'enquiries', num: '04', title: 'Loan & Financing Enquiries' },
  { id: 'eligibility', num: '05', title: 'Eligibility & Underwriting' },
  { id: 'lenders', num: '06', title: 'Third-Party Lenders & Consortia' },
  { id: 'accuracy', num: '07', title: 'Accuracy of Submissions' },
  { id: 'responsibilities', num: '08', title: 'Prohibited Conduct' },
  { id: 'ip', num: '09', title: 'Intellectual Property Rights' },
  { id: 'liability', num: '10', title: 'Limitation of Liability' },
  { id: 'amendments', num: '11', title: 'Amendments & Periodic Updates' },
  { id: 'grievance', num: '12', title: 'Governing Law & Grievance' }
];

export const TermsPage: React.FC = () => {
  const [activeClause, setActiveClause] = useState<string>('acceptance');

  // Scroll spy tracking active clause
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
    <div className="w-full bg-[#f9f9ff] min-h-screen text-[#141b2c] pt-24 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Utility Scrim & Breadcrumbs */}
      <section className="w-full bg-[#f1f3ff] py-3.5 border-b border-slate-200/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-2 text-xs text-[#44474e]">
          <div className="flex items-center gap-1.5">
            <Link to="/" className="hover:text-[#071b3a] transition-colors flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px]">home</span>
              <span>Home</span>
            </Link>
            <span className="text-[#c5c6cf]">/</span>
            <span className="text-[#071b3a] font-semibold">Terms &amp; Conditions</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#e9edff] text-[#364768] text-[11px] font-semibold border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-[#006d33]" />
              <span>Fiduciary Governance</span>
            </span>
          </div>
        </div>
      </section>

      {/* Editorial Masthead */}
      <section className="w-full bg-white py-12 md:py-16 relative overflow-hidden border-b border-slate-200/80">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#e0e8ff]/40 blur-3xl pointer-events-none" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-start gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e0e8ff] text-[#071b3a] text-xs font-bold tracking-widest uppercase">
              <span className="material-symbols-outlined text-[15px] text-[#071b3a]">gavel</span>
              <span>Legal &amp; Regulatory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#071b3a] tracking-tight">
              Terms &amp; Conditions
            </h1>
            <p className="text-base sm:text-lg text-[#44474e] max-w-2xl leading-relaxed">
              Please review these terms before using Earth Finance advisory and debt syndication services across our
              Chhattisgarh and pan-India institutional desks.
            </p>

            {/* Compliance & Date Meta Capsule */}
            <div className="w-full flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#e9edff] text-[#364768] border border-slate-200">
                <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                <span>
                  Last Updated: <strong className="text-[#141b2c]">October 2024</strong>
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#e9edff] text-[#364768] border border-slate-200">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span>
                  Jurisdiction: <strong className="text-[#141b2c]">Raipur, Chhattisgarh</strong>
                </span>
              </div>
              <button
                type="button"
                onClick={() => window.print()}
                className="sm:ml-auto inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#f1f3ff] text-[#141b2c] hover:bg-[#e0e8ff] transition-colors border border-slate-200"
              >
                <span className="material-symbols-outlined text-[16px]">print</span>
                <span>Print Copy</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Institutional Notice Callout */}
      <section className="w-full bg-[#f9f9ff] py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#071b3a] text-white p-6 sm:p-8 rounded-2xl shadow-xl relative overflow-hidden border border-[#0b2d5c]">
            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-[#4e5e81]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-start gap-4 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-[#ffdf94] text-[#241a00] flex items-center justify-center shrink-0 mt-0.5 shadow-md">
                <span className="material-symbols-outlined text-[24px]">verified</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="text-lg sm:text-xl font-extrabold text-[#ffdf94] tracking-tight">
                    Important Regulatory Disclaimer
                  </span>
                  <span className="px-2 py-0.5 rounded bg-white/15 text-white text-[11px] font-bold uppercase tracking-wider">
                    Mandatory Reading
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#dbe2f9] leading-relaxed">
                  Earth Finance operates strictly as a financial advisory and corporate debt syndication consultancy.{' '}
                  <strong className="text-white font-semibold">
                    We do not charge upfront undisclosed fees, nor do we guarantee loan or credit approvals
                  </strong>
                  . Final sanction letters, disbursements, tenure decisions, and interest rate margins are governed
                  solely and independently by the credit committees of our empaneled partner Banks and Reserve Bank of
                  India (RBI)-regulated NBFCs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Document Body (Two-Column Layout with Sticky Reading Index) */}
      <section className="w-full bg-[#f9f9ff] py-8 md:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sticky Navigation Sidebar */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-[120px] space-y-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-[#071b3a] tracking-wider uppercase">Clause Index</span>
                  <span className="text-[11px] text-[#44474e] font-semibold">12 Sections</span>
                </div>
                <nav className="flex flex-col space-y-1 text-xs text-[#44474e] max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
                  {CLAUSES.map((clause) => (
                    <button
                      key={clause.id}
                      type="button"
                      onClick={() => scrollToClause(clause.id)}
                      className={`px-2.5 py-1.5 rounded-lg text-left transition-all truncate ${
                        activeClause === clause.id
                          ? 'bg-[#f1f3ff] text-[#071b3a] font-bold translate-x-1'
                          : 'hover:bg-slate-50 hover:text-[#071b3a]'
                      }`}
                    >
                      {clause.num}. {clause.title}
                    </button>
                  ))}
                </nav>
                <div className="mt-4 pt-3 bg-[#f1f3ff] p-3.5 rounded-xl border border-slate-200/60">
                  <p className="text-xs text-[#071b3a] font-bold mb-0.5">Direct Counsel Desk</p>
                  <p className="text-[11px] text-[#44474e] leading-snug">
                    Questions concerning documentation or terms compliance?
                  </p>
                  <a
                    className="inline-flex items-center gap-1.5 mt-2 text-[#071b3a] text-xs font-bold hover:underline"
                    href={`tel:${SUPPORT_PHONE.replace(/[^0-9]/g, '')}`}
                  >
                    <span className="material-symbols-outlined text-[15px]">call</span>
                    <span>{SUPPORT_PHONE}</span>
                  </a>
                </div>
              </div>
            </aside>

            {/* Main Clause Text Stream */}
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

              {/* Article 1 */}
              <article
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 scroll-mt-32"
                id="acceptance"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                    01
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#071b3a]">Acceptance of Terms</h2>
                </div>
                <div className="text-xs sm:text-sm text-[#44474e] space-y-3 leading-relaxed">
                  <p>
                    By navigating this website (earthfinance.in / related domains), engaging through our digital loan
                    enquiry portals, or availing of private debt advisory services rendered by{' '}
                    <strong className="text-[#141b2c]">Earth Finance</strong> (hereinafter referred to as the "Firm",
                    "We", "Us", or "Our"), you unequivocally agree to be bound by these Terms and Conditions in their
                    entirety.
                  </p>
                  <p>
                    If you represent a corporate borrower, partnership firm, LLP, private limited company, or
                    proprietary business entity, you represent and warrant that you possess the requisite legal
                    authority and corporate mandate to bind such entity to these provisions. If you do not agree with
                    any stipulation laid out herein, you must immediately terminate access to our portals and refrain
                    from submitting any credit applications or commercial documentation.
                  </p>
                </div>
              </article>

              {/* Article 2 */}
              <article
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 scroll-mt-32"
                id="usage"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                    02
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#071b3a]">
                    Website Usage &amp; Access Rights
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-[#44474e] space-y-3 leading-relaxed">
                  <p>
                    This digital platform is maintained strictly for legitimate commercial inquiries, financial
                    literacy, syndication framework briefings, and secure onboarding for credit underwriting
                    preparation. Users are granted a revocable, non-transferable, and non-exclusive license to utilize
                    the site in conformity with applicable Indian statutes, including the Information Technology Act,
                    2000.
                  </p>
                  <p>
                    Users shall not deploy automated scrapers, web spiders, or reverse-engineering methodologies to
                    extract proprietary financial models, loan eligibility calculators, or industrial lending
                    benchmark data hosted on our servers.
                  </p>
                </div>
              </article>

              {/* Article 3 */}
              <article
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 scroll-mt-32"
                id="finance-info"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                    03
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#071b3a]">
                    Advisory Nature of Financial Information
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-[#44474e] space-y-3 leading-relaxed">
                  <p>
                    All rate tables, projected EMIs, amortisation schedules, debt service coverage ratio (DSCR)
                    calculations, and maximum sanctioned quantum estimates featured across this website are{' '}
                    <strong className="text-[#141b2c]">purely indicative and illustrative</strong>.
                  </p>
                  <div className="bg-[#f1f3ff] p-4 rounded-xl space-y-1 border border-slate-200/60">
                    <span className="text-xs font-bold text-[#071b3a] flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-[#4e5e81]">info</span>
                      Benchmarking Criteria Note
                    </span>
                    <p className="text-xs text-[#44474e] leading-relaxed">
                      Calculators rely on idealized compounding formulas and baseline repo rates. Final pricing,
                      processing fees, penal interest covenants, and lien-charge charges are governed by dynamic bank
                      risk premium matrices at the exact moment of formal credit sanction.
                    </p>
                  </div>
                  <p>
                    Information provided on this site does not constitute binding legal, accounting, investment, or
                    statutory tax advice. Clients are encouraged to verify financial structures with their chartered
                    accountants or legal advisors.
                  </p>
                </div>
              </article>

              {/* Article 4 */}
              <article
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 scroll-mt-32"
                id="enquiries"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                    04
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#071b3a]">
                    Loan &amp; Financing Enquiries
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-[#44474e] space-y-3 leading-relaxed">
                  <p>
                    Submitting an inquiry through our digital forms, WhatsApp advisory desk, or during in-person visits to
                    our Raipur corporate offices does not constitute an agreement or offer to lend capital.
                  </p>
                  <p>An inquiry represents a preliminary mandate authorizing Earth Finance to:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#44474e]">
                    <li>Evaluate high-level balance sheet viability and credit history.</li>
                    <li>
                      Match client financing profiles with appropriate public sector banks, scheduled commercial banks,
                      or NBFC balance sheets.
                    </li>
                    <li>Reach out via telephonic, electronic, or in-person channels to compile relevant documentation.</li>
                  </ul>
                </div>
              </article>

              {/* Article 5 */}
              <article
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 scroll-mt-32"
                id="eligibility"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                    05
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#071b3a]">
                    Eligibility &amp; Lender Underwriting Discretion
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-[#44474e] space-y-3 leading-relaxed">
                  <p>
                    Approval criteria, debt-equity limits, security cover requirements, and personal guarantee demands are
                    established solely by the relevant credit sanctioning authorities. Earth Finance does not control,
                    supervise, or overturn lender underwriting models.
                  </p>
                  <p>Underwriting factors may include, without limitation:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3.5 rounded-xl bg-[#f1f3ff] flex items-start gap-2.5 border border-slate-200/60">
                      <span className="material-symbols-outlined text-[#006d33] text-[20px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span className="text-xs font-semibold text-[#141b2c]">
                        CIBIL / Experian Bureau Track Record
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#f1f3ff] flex items-start gap-2.5 border border-slate-200/60">
                      <span className="material-symbols-outlined text-[#006d33] text-[20px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span className="text-xs font-semibold text-[#141b2c]">
                        GST &amp; Bank Statement Turnover Integrity
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#f1f3ff] flex items-start gap-2.5 border border-slate-200/60">
                      <span className="material-symbols-outlined text-[#006d33] text-[20px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span className="text-xs font-semibold text-[#141b2c]">
                        Clear Collateral Title &amp; Valuation Reports
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-[#f1f3ff] flex items-start gap-2.5 border border-slate-200/60">
                      <span className="material-symbols-outlined text-[#006d33] text-[20px] shrink-0 mt-0.5">
                        check_circle
                      </span>
                      <span className="text-xs font-semibold text-[#141b2c]">
                        Statutory Compliance (ITR, ROC, Audits)
                      </span>
                    </div>
                  </div>
                </div>
              </article>

              {/* Article 6 */}
              <article
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 scroll-mt-32"
                id="lenders"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                    06
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#071b3a]">
                    Third-Party Lenders &amp; Banking Consortia
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-[#44474e] space-y-3 leading-relaxed">
                  <p>
                    Earth Finance functions solely as an institutional facilitator, credit packager, and syndication
                    liaison partner.{' '}
                    <strong className="text-[#141b2c]">
                      Earth Finance is not an NBFC, does not accept public deposits, and does not issue direct
                      balance-sheet credit lines
                    </strong>
                    .
                  </p>
                  <p>
                    All loan contracts, hypothecation deeds, mortgage registrations, rate reset clauses, and recovery
                    mechanisms are signed directly and exclusively between the borrower and the funding
                    bank/institutional lender. Any claim, grievance, or contractual dispute arising out of loan
                    servicing or foreclosure must be raised directly with the lending institution under the purview of
                    the RBI Ombudsman scheme.
                  </p>
                </div>
              </article>

              {/* Article 7 */}
              <article
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 scroll-mt-32"
                id="accuracy"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                    07
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#071b3a]">
                    Accuracy of Submissions &amp; Representation
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-[#44474e] space-y-3 leading-relaxed">
                  <p>
                    The borrower guarantees that all audited financials, provisional estimates, computation sheets,
                    property sale deeds, sanction letters of existing loans, and KYC credentials furnished to Earth
                    Finance are uncompromised, complete, authentic, and free from material misstatement.
                  </p>
                  <p>
                    Submission of fabricated audit reports, manipulated GST returns, or encumbered title papers
                    constitutes an immediate breach of these terms. Earth Finance reserves the right to immediately
                    terminate syndication advisory mandates and report fraudulent documentation to institutional fraud
                    monitoring authorities.
                  </p>
                </div>
              </article>

              {/* Article 8 */}
              <article
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 scroll-mt-32"
                id="responsibilities"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                    08
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#071b3a]">
                    User Responsibilities &amp; Prohibited Conduct
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-[#44474e] space-y-3 leading-relaxed">
                  <p>When accessing our portals or corresponding with our debt syndication officers, you agree not to:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#44474e]">
                    <li>
                      Impersonate any corporate officer, partner, or entity without explicit authorization (Board
                      Resolution / POA).
                    </li>
                    <li>
                      Upload documents containing malicious software, macros, trojans, or corrupted datasets.
                    </li>
                    <li>Circumvent security safeguards or access unauthorized server directories.</li>
                    <li>
                      Interfere with communication infrastructure through unsolicited inquiries or distributed
                      denial-of-service attempts.
                    </li>
                  </ul>
                </div>
              </article>

              {/* Article 9 */}
              <article
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 scroll-mt-32"
                id="ip"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                    09
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#071b3a]">
                    Intellectual Property Rights
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-[#44474e] space-y-3 leading-relaxed">
                  <p>
                    All digital assets—including the Earth Finance logomark, design system, interactive financial
                    calculators, syndication assessment matrices, copy, brand collateral, and custom UI components—are
                    the exclusive intellectual property of Earth Finance.
                  </p>
                  <p>
                    No portion of this website may be reproduced, mirrored, republished, or commercially disseminated
                    without prior written authorization from the partners of Earth Finance, Raipur.
                  </p>
                </div>
              </article>

              {/* Article 10 */}
              <article
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 scroll-mt-32"
                id="liability"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                    10
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#071b3a]">Limitation of Liability</h2>
                </div>
                <div className="text-xs sm:text-sm text-[#44474e] space-y-3 leading-relaxed">
                  <p>
                    To the fullest extent permissible under Indian jurisprudence, Earth Finance, its partners,
                    consultants, and personnel shall not be held liable for:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-[#44474e]">
                    <li>
                      Rejection, reduction in credit line, or delayed sanction by third-party banks or financial
                      institutions.
                    </li>
                    <li>
                      Changes in benchmark borrowing rates (MCLR, EBLR, Repo rate) occurring before or after loan
                      execution.
                    </li>
                    <li>
                      Loss of expected profits, business interruptions, opportunity costs, or secondary damages
                      resulting from loan processing timelines.
                    </li>
                    <li>
                      Technical interruptions, server downtime, or third-party telecom discrepancies outside our direct
                      control.
                    </li>
                  </ul>
                  <p className="pt-2 text-xs sm:text-sm font-bold text-[#141b2c]">
                    Our collective liability for any advisory engagement shall strictly remain capped at the advisory fee
                    explicitly invoiced and collected by Earth Finance for that specific engagement.
                  </p>
                </div>
              </article>

              {/* Article 11 */}
              <article
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 scroll-mt-32"
                id="amendments"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                    11
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#071b3a]">
                    Amendments &amp; Periodic Updates
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-[#44474e] space-y-3 leading-relaxed">
                  <p>
                    We reserve the discretionary prerogative to revise, modify, or update these Terms and Conditions at
                    any juncture to mirror shifts in financial statutes, RBI guidelines, judicial precedents, or firm
                    operational models.
                  </p>
                  <p>
                    All amendments take effect immediately upon their publication on this page, accompanied by an
                    updated date marker. Continued utilization of our web services following published revisions
                    constitutes full consent to the updated framework.
                  </p>
                </div>
              </article>

              {/* Article 12 */}
              <article
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/80 space-y-4 scroll-mt-32"
                id="grievance"
              >
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                    12
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#071b3a]">
                    Governing Law &amp; Grievance Redressal
                  </h2>
                </div>
                <div className="text-xs sm:text-sm text-[#44474e] space-y-4 leading-relaxed">
                  <p>
                    These terms are governed by and construed in conformity with the Laws of the Republic of India. Any
                    unresolved dispute, action, or proceeding arising under or in connection with these terms shall fall
                    under the exclusive territorial jurisdiction of the competent courts in{' '}
                    <strong className="text-[#141b2c]">Raipur, Chhattisgarh</strong>.
                  </p>
                  {/* Officer Contact Box */}
                  <div className="bg-[#f1f3ff] p-5 rounded-2xl space-y-3 border border-slate-200">
                    <div className="flex items-center gap-2 text-[#071b3a] text-xs font-bold uppercase tracking-wider">
                      <span className="material-symbols-outlined text-[20px]">support_agent</span>
                      <span>Grievance &amp; Compliance Officer</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <p className="font-bold text-[#141b2c]">Earth Finance Regulatory Desk</p>
                        <p className="text-[#44474e] mt-1 leading-relaxed">{OFFICE_ADDRESS}</p>
                      </div>
                      <div className="space-y-1.5">
                        <p className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-[#071b3a]">call</span>
                          <a
                            className="text-[#141b2c] hover:underline font-semibold"
                            href={`tel:${SUPPORT_PHONE.replace(/[^0-9]/g, '')}`}
                          >
                            {SUPPORT_PHONE}
                          </a>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[16px] text-[#071b3a]">mail</span>
                          <a className="text-[#141b2c] hover:underline font-semibold" href={`mailto:${SUPPORT_EMAIL}`}>
                            {SUPPORT_EMAIL}
                          </a>
                        </p>
                        <p className="flex items-center gap-2 text-[#006d33] font-medium">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                          <span>Mon – Sat: 10:00 AM – 7:00 PM IST</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance & Support Ribbon */}
      <section className="w-full bg-[#e9edff] py-12 px-4 sm:px-6 lg:px-8 mt-12 border-t border-[#c5c6cf]/40">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <div className="inline-flex p-3 rounded-full bg-white text-[#071b3a] shadow-sm mx-auto border border-slate-200">
            <span className="material-symbols-outlined text-[28px]">handshake</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071b3a] tracking-tight">
            Transparent Debt Advisory for Growth Enterprises
          </h3>
          <p className="text-xs sm:text-sm text-[#44474e] max-w-xl mx-auto leading-relaxed">
            We partner with regional manufacturing, industrial, and commercial businesses across Chhattisgarh with
            institutional integrity and zero hidden terms.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-[#ffdf94] text-[#241a00] hover:bg-[#efc13e] shadow-sm transition-all"
            >
              <span>Schedule an In-Person Consultation</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </Link>
            <a
              href={`tel:${SUPPORT_PHONE.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-white text-[#071b3a] hover:bg-slate-50 transition-colors border border-slate-200 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">phone</span>
              <span>Call: {SUPPORT_PHONE}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
