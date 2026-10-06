import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  FileText,
  BadgePercent,
  CheckCircle2,
  Mail,
  Phone,
  ArrowRight,
  ChevronRight,
  List,
  Building,
  UserCheck,
  Scale,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { SUPPORT_PHONE, SUPPORT_EMAIL, OFFICE_ADDRESS } from '../../config/constants';

interface TocSection {
  id: string;
  num: string;
  title: string;
}

const TOC_SECTIONS: TocSection[] = [
  { id: 'section-1', num: '01', title: 'Introduction & Fiduciary Commitment' },
  { id: 'section-2', num: '02', title: 'Information We Collect' },
  { id: 'section-3', num: '03', title: 'Purpose & Usage of Information' },
  { id: 'section-4', num: '04', title: 'Enquiry & Application Parameters' },
  { id: 'section-5', num: '05', title: 'Appointment & Consultation Notes' },
  { id: 'section-6', num: '06', title: 'Communication & Direct Alerts' },
  { id: 'section-7', num: '07', title: 'Data Security Architecture' },
  { id: 'section-8', num: '08', title: 'Authorized Banking Partners' },
  { id: 'section-9', num: '09', title: 'Cookies & Session Integrity' },
  { id: 'section-10', num: '10', title: 'Data Retention Mandates' },
  { id: 'section-11', num: '11', title: 'Your Statutory Rights' },
  { id: 'section-12', num: '12', title: 'Compliance Officer & Contact' }
];

export const PrivacyPolicyPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('section-1');

  // Scroll spy effect to highlight currently active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (const section of TOC_SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -140;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <div className="w-full bg-[#f9f9ff] min-h-screen text-[#141b2c] pt-24 pb-16 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Minimal Ambient Hero Header */}
      <section className="w-full bg-[#f1f3ff] px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative overflow-hidden border-b border-slate-200/60">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-[#dbe2f9]/60 blur-3xl pointer-events-none" />
        <div className="absolute left-1/4 -bottom-16 w-80 h-80 rounded-full bg-[#8cf6a3]/20 blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-start gap-4">
          {/* Compliance Meta Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#e0e8ff] text-[#071b3a] text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#071b3a]" />
              Legal &amp; Compliance
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white text-[#44474e] text-xs font-semibold shadow-sm border border-slate-200">
              <span className="material-symbols-outlined text-[14px] text-[#44474e]">schedule</span>
              Last Updated: October 2024
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8cf6a3]/30 text-[#007235] text-xs font-bold">
              <span className="material-symbols-outlined text-[14px]">verified_user</span>
              RBI Digital Lending &amp; IT Act Compliant
            </span>
          </div>

          {/* Main Heading & Lede */}
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#071b3a] tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-base sm:text-lg text-[#44474e] leading-relaxed">
              Your privacy, institutional confidentiality, and financial information security matter to us. Learn how
              Earth Finance systematically collects, protects, and handles your financial data across debt advisory
              and syndication workflows.
            </p>
          </div>

          {/* Quick Document Facts Bar */}
          <div className="w-full mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-200/70">
              <p className="text-xs text-[#44474e]">Data Jurisdiction</p>
              <p className="text-sm text-[#141b2c] font-bold mt-0.5">Republic of India</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-200/70">
              <p className="text-xs text-[#44474e]">Encryption Standard</p>
              <p className="text-sm text-[#141b2c] font-bold mt-0.5">256-bit AES / TLS 1.3</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-200/70">
              <p className="text-xs text-[#44474e]">Commercial Desk</p>
              <p className="text-sm text-[#141b2c] font-bold mt-0.5">Raipur, Chhattisgarh</p>
            </div>
            <div className="bg-white p-3.5 rounded-xl shadow-sm border border-slate-200/70">
              <p className="text-xs text-[#44474e]">Fiduciary Protocol</p>
              <p className="text-sm text-[#141b2c] font-bold mt-0.5">Consent-Driven Syndication</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Body with Asymmetric Table of Contents Layout */}
      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Table of Contents & Quick Contact (Sticky) */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-[120px] space-y-5">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-200">
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                <span className="text-xs font-bold text-[#071b3a] tracking-wider uppercase">
                  Table of Contents
                </span>
                <span className="material-symbols-outlined text-[#44474e] text-[18px]">format_list_bulleted</span>
              </div>
              <nav className="space-y-1 text-xs">
                {TOC_SECTIONS.map((sec) => (
                  <button
                    key={sec.id}
                    type="button"
                    onClick={() => scrollToSection(sec.id)}
                    className={`w-full flex items-center justify-between py-1.5 px-2 rounded-lg text-left transition-all ${
                      activeSection === sec.id
                        ? 'bg-[#f1f3ff] text-[#071b3a] font-bold translate-x-1'
                        : 'text-[#44474e] hover:text-[#071b3a] hover:bg-slate-50'
                    }`}
                  >
                    <span className="truncate pr-2">
                      {sec.num}. {sec.title}
                    </span>
                    <span
                      className={`material-symbols-outlined text-[14px] shrink-0 transition-opacity ${
                        activeSection === sec.id ? 'opacity-100 text-[#071b3a]' : 'opacity-30'
                      }`}
                    >
                      chevron_right
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Privacy Officer Direct Card */}
            <div className="bg-[#e0e8ff]/70 rounded-2xl p-5 space-y-3 border border-[#c5c6cf]/40 shadow-sm">
              <div className="flex items-center gap-2 text-[#071b3a]">
                <span className="material-symbols-outlined text-[20px] text-[#006d33]">verified</span>
                <span className="text-xs font-bold uppercase tracking-wider">Data Grievance Redressal</span>
              </div>
              <p className="text-xs text-[#44474e] leading-relaxed">
                Have a question regarding your submitted balance sheet or wish to withdraw syndication consent?
              </p>
              <div className="pt-1 text-xs space-y-1.5">
                <p className="text-[#141b2c] font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#071b3a]">mail</span>
                  <a className="hover:underline" href={`mailto:${SUPPORT_EMAIL}`}>
                    {SUPPORT_EMAIL}
                  </a>
                </p>
                <p className="text-[#141b2c] font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-[#071b3a]">call</span>
                  <a className="hover:underline" href={`tel:${SUPPORT_PHONE.replace(/[^0-9]/g, '')}`}>
                    {SUPPORT_PHONE}
                  </a>
                </p>
              </div>
            </div>
          </aside>

          {/* Right Column: Document Content */}
          <article className="lg:col-span-8 bg-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-sm border border-slate-200/80 space-y-10">
            {/* Mobile Jump Navigation Dropdown */}
            <div className="lg:hidden bg-[#f1f3ff] p-3 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border border-slate-200">
              <span className="text-xs font-bold text-[#071b3a]">Jump to Section:</span>
              <select
                className="w-full sm:w-auto bg-white text-[#141b2c] text-xs py-1.5 px-3 rounded-lg border border-slate-200 outline-none shadow-sm"
                value={activeSection}
                onChange={(e) => scrollToSection(e.target.value)}
              >
                {TOC_SECTIONS.map((sec) => (
                  <option key={sec.id} value={sec.id}>
                    {sec.num}. {sec.title}
                  </option>
                ))}
              </select>
            </div>

            {/* 1. Introduction */}
            <section className="scroll-mt-32 space-y-3" id="section-1">
              <div className="flex items-center gap-2 text-[#071b3a]">
                <span className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                  01
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Introduction &amp; Fiduciary Commitment
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
                Earth Finance (“we”, “our”, or “us”), operating headquartered at Rajbandha Maidan, Raipur,
                Chhattisgarh, provides strategic debt syndication, corporate financing advisory, and loan consultancy
                solutions. We are unequivocally dedicated to safeguarding the privacy, confidentiality, and integrity of
                the personal, financial, and proprietary enterprise records provided by prospective and existing
                borrowers.
              </p>
              <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
                This policy articulates the parameters governing data gathering, processing, transmission, and retention
                in strict conformity with the Information Technology Act, 2000, the Information Technology (Reasonable
                Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, and relevant
                Reserve Bank of India (RBI) guidelines governing financial intermediaries and loan syndicators.
              </p>
              {/* Green Compliance Callout */}
              <div className="bg-[#8cf6a3]/20 rounded-xl p-4 sm:p-5 flex gap-3 items-start border border-[#8cf6a3]/40 mt-3">
                <span className="material-symbols-outlined text-[#006d33] text-[22px] shrink-0 mt-0.5">verified</span>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-[#00210b]">
                    Zero Data Commercialization Pledge
                  </h4>
                  <p className="text-xs sm:text-sm text-[#005224] leading-relaxed">
                    Earth Finance acts solely as an authorized fiduciary debt syndicator. We do not sell, rent, monetize,
                    or publicly disseminate borrower contact records, proprietary financials, or audit statements to
                    unauthorized aggregators or third-party marketing brokers.
                  </p>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-slate-200/80" />

            {/* 2. Information We Collect */}
            <section className="scroll-mt-32 space-y-3" id="section-2">
              <div className="flex items-center gap-2 text-[#071b3a]">
                <span className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                  02
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Information We Collect</h2>
              </div>
              <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
                To assess borrowing feasibility, structure term credit, and route formal credit proposals to public and
                private banking partners, we collect specific categories of verifiable client data:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                <div className="bg-[#f1f3ff] p-5 rounded-xl space-y-2 border border-slate-200/60">
                  <div className="flex items-center gap-2 text-[#071b3a] text-xs font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[18px]">badge</span>
                    <span>Individual Identification</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-[#44474e] list-disc list-inside space-y-1.5 leading-relaxed">
                    <li>Authorized signatory legal name</li>
                    <li>Permanent Account Number (PAN)</li>
                    <li>Aadhaar authentication details</li>
                    <li>Residential proof &amp; utility statements</li>
                    <li>Official email &amp; direct mobile numbers</li>
                  </ul>
                </div>
                <div className="bg-[#f1f3ff] p-5 rounded-xl space-y-2 border border-slate-200/60">
                  <div className="flex items-center gap-2 text-[#071b3a] text-xs font-bold uppercase tracking-wider">
                    <span className="material-symbols-outlined text-[18px]">domain</span>
                    <span>Enterprise &amp; Corporate Data</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-[#44474e] list-disc list-inside space-y-1.5 leading-relaxed">
                    <li>Certificate of Incorporation / Partnership Deed</li>
                    <li>GSTIN Registration &amp; 3B Filings</li>
                    <li>Audited Balance Sheets &amp; P&amp;L Statements</li>
                    <li>12-Month Operating Bank Statements</li>
                    <li>Udyam / MSME Registration Certificates</li>
                  </ul>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-slate-200/80" />

            {/* 3. How We Use Information */}
            <section className="scroll-mt-32 space-y-3" id="section-3">
              <div className="flex items-center gap-2 text-[#071b3a]">
                <span className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                  03
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">How We Use Information</h2>
              </div>
              <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
                Every data field acquired through physical documentation, website intake channels, or electronic
                transmission is utilized strictly within designated underwriting and syndication channels:
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="material-symbols-outlined text-[#071b3a] text-[22px] shrink-0 mt-0.5">
                    analytics
                  </span>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    <strong className="text-[#141b2c]">Underwriting &amp; Solvency Assessment:</strong> Performing
                    Debt Service Coverage Ratio (DSCR) calculations, asset cover evaluations, and commercial credit
                    suitability modeling prior to institutional submission.
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="material-symbols-outlined text-[#071b3a] text-[22px] shrink-0 mt-0.5">
                    account_tree
                  </span>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    <strong className="text-[#141b2c]">Multi-Lender Syndication:</strong> Formatting structured credit
                    appraisal memorandums (CAM) submitted directly to scheduled commercial banks, NBFCs, and sovereign
                    development funds.
                  </p>
                </div>
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="material-symbols-outlined text-[#071b3a] text-[22px] shrink-0 mt-0.5">
                    gavel
                  </span>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    <strong className="text-[#141b2c]">Statutory Compliance &amp; KYC:</strong> Satisfying
                    anti-money laundering (AML), Prevention of Money Laundering Act (PMLA), and Know-Your-Customer due
                    diligence directives.
                  </p>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-slate-200/80" />

            {/* 4. Enquiry and Application Information */}
            <section className="scroll-mt-32 space-y-3" id="section-4">
              <div className="flex items-center gap-2 text-[#071b3a]">
                <span className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                  04
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Enquiry &amp; Loan Application Information
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
                When users submit an eligibility check or loan application via earthfinance.example, we process credit
                parameters including requested ticket size (e.g., ₹25 Lakhs to ₹50 Crores), intended purpose (e.g.,
                Working Capital, Machinery Term Loan, LAP), current turnover, existing collateral asset titles, and
                encumbrance certificates.
              </p>
              {/* Blue Advisory Callout */}
              <div className="bg-[#e0e8ff]/50 rounded-xl p-4 sm:p-5 flex gap-3 items-start border border-[#c5c6cf]/40 mt-3">
                <span className="material-symbols-outlined text-[#071b3a] text-[22px] shrink-0 mt-0.5">shield</span>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-bold text-[#071b3a]">Collateral Title Security</h4>
                  <p className="text-xs sm:text-sm text-[#364768] leading-relaxed">
                    Property deeds, revenue map records (Khasra/Khatauni), and municipal sanction blueprints submitted for
                    Loan Against Property (LAP) or Industrial Finance undergo legal vetting in restricted offline
                    repositories. Original titles are never held by Earth Finance.
                  </p>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-slate-200/80" />

            {/* 5. Appointment Information */}
            <section className="scroll-mt-32 space-y-3" id="section-5">
              <div className="flex items-center gap-2 text-[#071b3a]">
                <span className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                  05
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Appointment &amp; Consultation Information
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
                When you schedule an advisory session at our Raipur headquarters or an on-site manufacturing unit visit,
                our booking coordination engine logs consultation notes, strategic requirements, and representative
                attendees. These records ensure continuity across senior debt advisory teams and are accessible solely to
                your designated relationship manager.
              </p>
            </section>

            <div className="w-full h-px bg-slate-200/80" />

            {/* 6. Communication and Notifications */}
            <section className="scroll-mt-32 space-y-3" id="section-6">
              <div className="flex items-center gap-2 text-[#071b3a]">
                <span className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                  06
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Communication &amp; Direct Notifications
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
                By initiating an enquiry or submitting a loan portfolio, you authorize Earth Finance to transmit
                transactional updates, sanction advisories, and term-sheet stipulations through:
              </p>
              <ul className="text-xs sm:text-sm text-[#44474e] list-disc list-inside space-y-2 pl-2 leading-relaxed">
                <li>
                  <strong className="text-[#141b2c]">Voice Communications:</strong> Direct advisory calls from our
                  dedicated desk (+91 93000 22732).
                </li>
                <li>
                  <strong className="text-[#141b2c]">Encrypted Messaging:</strong> WhatsApp Business updates conveying
                  application milestone progress.
                </li>
                <li>
                  <strong className="text-[#141b2c]">Official Email:</strong> Formal credit dossiers, in-principle sanction
                  terms, and document checklists.
                </li>
              </ul>
              <p className="text-xs sm:text-sm text-[#44474e] italic pt-1">
                You may adjust notification preferences or opt-out of informative market updates at any time by
                emailing us with the subject line “Communication Preference”.
              </p>
            </section>

            <div className="w-full h-px bg-slate-200/80" />

            {/* 7. Data Security Architecture */}
            <section className="scroll-mt-32 space-y-3" id="section-7">
              <div className="flex items-center gap-2 text-[#071b3a]">
                <span className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                  07
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Data Security Architecture</h2>
              </div>
              <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
                We deploy multi-layered institutional safeguards designed to prevent unauthorized alteration,
                interception, or destruction of enterprise documents:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="bg-[#f1f3ff] p-4 rounded-xl space-y-1.5 border border-slate-200/60">
                  <span className="text-xs font-bold text-[#071b3a] uppercase tracking-wider block">Encryption</span>
                  <p className="text-xs text-[#44474e] leading-relaxed">
                    256-bit AES encryption at rest and TLS 1.3 cryptographic transport across web portals.
                  </p>
                </div>
                <div className="bg-[#f1f3ff] p-4 rounded-xl space-y-1.5 border border-slate-200/60">
                  <span className="text-xs font-bold text-[#071b3a] uppercase tracking-wider block">Access Control</span>
                  <p className="text-xs text-[#44474e] leading-relaxed">
                    Role-based credential restrictions ensuring only assigned credit officers handle your dossier.
                  </p>
                </div>
                <div className="bg-[#f1f3ff] p-4 rounded-xl space-y-1.5 border border-slate-200/60">
                  <span className="text-xs font-bold text-[#071b3a] uppercase tracking-wider block">Staff NDA</span>
                  <p className="text-xs text-[#44474e] leading-relaxed">
                    All financial analysts execute legally binding non-disclosure agreements with criminal liabilities.
                  </p>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-slate-200/80" />

            {/* 8. Third-Party Services & Banking Partners */}
            <section className="scroll-mt-32 space-y-3" id="section-8">
              <div className="flex items-center gap-2 text-[#071b3a]">
                <span className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                  08
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Third-Party Services &amp; Banking Partners
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
                Earth Finance interacts with scheduled public-sector banks, premier private financial institutions, and
                Category-A NBFCs. Information dissemination adheres strictly to the following parameters:
              </p>
              <ul className="text-xs sm:text-sm text-[#44474e] list-disc list-inside space-y-1.5 pl-2 leading-relaxed">
                <li>Dossiers are presented exclusively to lenders selected with the borrower’s explicit consensus.</li>
                <li>We do not utilize open web scrapers or unvetted algorithmic data exchanges.</li>
                <li>Receiving institutions process your data under their respective RBI-governed privacy standards.</li>
              </ul>
            </section>

            <div className="w-full h-px bg-slate-200/80" />

            {/* 9. Cookies and Tracking */}
            <section className="scroll-mt-32 space-y-3" id="section-9">
              <div className="flex items-center gap-2 text-[#071b3a]">
                <span className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                  09
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Cookies &amp; Session Integrity</h2>
              </div>
              <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
                Our platform deploys low-footprint technical session cookies required to verify CSRF tokens, secure
                interactive loan calculator calculations, and retain consultation stage selections. We do not use
                third-party biometric trackers or intrusive surveillance pixels.
              </p>
            </section>

            <div className="w-full h-px bg-slate-200/80" />

            {/* 10. Data Retention */}
            <section className="scroll-mt-32 space-y-3" id="section-10">
              <div className="flex items-center gap-2 text-[#071b3a]">
                <span className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                  10
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Data Retention Mandates</h2>
              </div>
              <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
                In compliance with statutory requirements stipulated by the Prevention of Money Laundering Act (PMLA)
                and financial accounting guidelines, records of successfully syndicated loan facilities are retained for
                a minimum mandatory statutory duration (typically up to 5 to 8 years following credit clearance).
                Incomplete or abandoned exploratory applications are securely purged after 180 days.
              </p>
            </section>

            <div className="w-full h-px bg-slate-200/80" />

            {/* 11. Your Rights */}
            <section className="scroll-mt-32 space-y-3" id="section-11">
              <div className="flex items-center gap-2 text-[#071b3a]">
                <span className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                  11
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Your Statutory Rights</h2>
              </div>
              <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
                As an institutional representative or individual borrower, you retain comprehensive statutory rights
                under Indian privacy jurisprudence:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="bg-[#f1f3ff] p-4 sm:p-5 rounded-xl space-y-1 border border-slate-200/60">
                  <span className="text-xs sm:text-sm font-bold text-[#141b2c] block">Right to Rectification</span>
                  <p className="text-xs text-[#44474e] leading-relaxed">
                    Request instantaneous updates or corrections to amended balance sheets, revised GST returns, or director changes.
                  </p>
                </div>
                <div className="bg-[#f1f3ff] p-4 sm:p-5 rounded-xl space-y-1 border border-slate-200/60">
                  <span className="text-xs sm:text-sm font-bold text-[#141b2c] block">
                    Right to Consent Revocation
                  </span>
                  <p className="text-xs text-[#44474e] leading-relaxed">
                    Halt debt syndication transmission to specific prospective lenders before formal underwriting sanction.
                  </p>
                </div>
                <div className="bg-[#f1f3ff] p-4 sm:p-5 rounded-xl space-y-1 border border-slate-200/60">
                  <span className="text-xs sm:text-sm font-bold text-[#141b2c] block">Right to Data Review</span>
                  <p className="text-xs text-[#44474e] leading-relaxed">
                    Obtain an itemized disclosure of institutional dossiers dispatched on your enterprise’s behalf.
                  </p>
                </div>
                <div className="bg-[#f1f3ff] p-4 sm:p-5 rounded-xl space-y-1 border border-slate-200/60">
                  <span className="text-xs sm:text-sm font-bold text-[#141b2c] block">Right to Erasure</span>
                  <p className="text-xs text-[#44474e] leading-relaxed">
                    Request the deletion of non-statutory records upon complete closure or formal withdrawal of the loan assignment.
                  </p>
                </div>
              </div>
            </section>

            <div className="w-full h-px bg-slate-200/80" />

            {/* 12. Contact Us */}
            <section className="scroll-mt-32 space-y-4" id="section-12">
              <div className="flex items-center gap-2 text-[#071b3a]">
                <span className="w-7 h-7 rounded-lg bg-[#e9edff] flex items-center justify-center text-xs font-bold text-[#071b3a]">
                  12
                </span>
                <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
                  Compliance Officer &amp; Regional Hub
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#44474e] leading-relaxed">
                For questions concerning this Privacy Policy, submission of statutory data requests, or formal grievance
                redressal, please contact our appointed Chief Compliance &amp; Information Security Officer:
              </p>
              <div className="bg-[#f1f3ff] rounded-xl p-5 sm:p-6 space-y-4 border border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-[#44474e] uppercase font-semibold">Designation</p>
                    <p className="text-sm font-bold text-[#141b2c] mt-0.5">Grievance &amp; Compliance Officer</p>
                    <p className="text-xs text-[#44474e]">Earth Finance Corporate Cell</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#44474e] uppercase font-semibold">Direct Contact</p>
                    <p className="text-sm font-bold text-[#141b2c] mt-0.5">{SUPPORT_EMAIL}</p>
                    <p className="text-xs text-[#44474e]">Helpline: {SUPPORT_PHONE}</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#44474e] uppercase font-semibold">Regional Office</p>
                    <p className="text-xs text-[#141b2c] font-medium leading-relaxed mt-0.5">
                      {OFFICE_ADDRESS}
                    </p>
                  </div>
                </div>
                <div className="pt-2 flex flex-wrap items-center gap-3 border-t border-slate-200/60">
                  <a
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-[#071b3a] text-white hover:bg-[#0b2d5c] transition-colors shadow-sm"
                    href={`mailto:${SUPPORT_EMAIL}?subject=Statutory%20Privacy%20Grievance`}
                  >
                    <span className="material-symbols-outlined text-[16px]">mail</span>
                    <span>Dispatch Grievance Email</span>
                  </a>
                  <a
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-white text-[#071b3a] hover:bg-slate-50 transition-colors shadow-sm border border-slate-200"
                    href={`tel:${SUPPORT_PHONE.replace(/[^0-9]/g, '')}`}
                  >
                    <span className="material-symbols-outlined text-[16px]">phone</span>
                    <span>Call Fiduciary Desk</span>
                  </a>
                </div>
              </div>
            </section>
          </article>
        </div>
      </section>

      {/* Bottom Institutional Assurance Strip */}
      <section className="w-full bg-[#e9edff] py-6 px-4 sm:px-6 lg:px-8 mt-12 border-t border-[#c5c6cf]/40">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#006d33] shadow-sm shrink-0 border border-slate-200">
              <span className="material-symbols-outlined text-[20px]">policy</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#141b2c]">Fair Practices Code &amp; Data Transparency</p>
              <p className="text-xs text-[#44474e]">
                We align all syndicated loan practices with RBI model fiduciary guidelines for institutional intermediaries.
              </p>
            </div>
          </div>
          <Link
            to="/contact"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ffdf94] text-[#241a00] hover:bg-[#efc13e] text-xs font-bold shadow-sm transition-all"
          >
            <span>Speak to Compliance Team</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
