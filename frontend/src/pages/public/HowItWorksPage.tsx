import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SUPPORT_PHONE } from '../../config/constants';
import { Modal } from '../../components/common/Modal';
import { EnquiryForm } from '../../components/forms/EnquiryForm';

export const HowItWorksPage: React.FC = () => {
  // Interactive Accordion state
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isChecklistModalOpen, setIsChecklistModalOpen] = useState(false);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const stages = [
    {
      num: '01',
      stage: 'Stage 01',
      title: 'Share Your Requirement',
      subtitle: 'Initial Consultation',
      icon: 'forum',
      desc: 'Tell us your funding requirement, business goals, existing obligations, and preferred tenures. Available online or via in-person meeting in Raipur.',
      deliverable: 'Custom Requirement Brief',
      numBg: 'bg-tertiary-fixed text-primary-container'
    },
    {
      num: '02',
      stage: 'Stage 02',
      title: 'Understand Your Options',
      subtitle: 'Comparative Advisory',
      icon: 'balance',
      desc: 'Our specialists analyze multi-bank terms, interest structures (fixed vs floating), processing charges, and repayment feasibility across top lenders.',
      deliverable: 'Lender Comparison Matrix',
      numBg: 'bg-tertiary-fixed text-primary-container'
    },
    {
      num: '03',
      stage: 'Stage 03',
      title: 'Documentation & Assessment',
      subtitle: 'Single-Window Verification',
      icon: 'folder_shared',
      desc: 'We organize, vet, and package your financial statements, tax filings, and collateral documents to ensure zero queries from credit committees.',
      deliverable: 'Audit-Ready Dossier',
      numBg: 'bg-tertiary-fixed text-primary-container'
    },
    {
      num: '04',
      stage: 'Stage 04',
      title: 'Processing & Sanction',
      subtitle: 'Swift Disbursement',
      icon: 'payments',
      desc: 'Direct liaison with bank credit managers, sanction letter issuance, legal appraisal, and funds safely released into your account.',
      deliverable: 'Disbursement & Post-Support',
      numBg: 'bg-secondary-fixed text-primary-container'
    }
  ];

  const documents = [
    {
      title: 'PAN Card',
      desc: 'Company PAN, Director / Partner / Proprietor PAN cards.',
      tag: 'Mandatory KYC',
      icon: 'badge'
    },
    {
      title: 'ID & Address Proof',
      desc: 'Aadhaar Card, Passport, Voter ID, and registered office utility bills.',
      tag: 'Entity & Individual',
      icon: 'pin_drop'
    },
    {
      title: 'Bank Statements',
      desc: 'Last 6 to 12 months official operating bank statements for all active accounts.',
      tag: 'E-PDF / Netbanking',
      icon: 'account_balance'
    },
    {
      title: 'Financial Statements',
      desc: 'Last 3 years audited financials, Balance Sheets, P&L reports, and ITR filings.',
      tag: 'CA Certified Copies',
      icon: 'request_quote'
    },
    {
      title: 'Collateral & Assets',
      desc: 'Title deeds, property tax receipts, GST returns, or machinery quotation invoices.',
      tag: 'Product Dependent',
      icon: 'domain_add'
    }
  ];

  const faqs = [
    {
      q: 'How long does the sanction process take?',
      a: 'Typically 3 to 7 working days for business loans and working capital facilities. For property loans (LAP) or specialized industrial project finance involving legal and technical evaluation of real estate, turnaround times range between 10 to 15 working days.'
    },
    {
      q: 'Do you charge an upfront evaluation fee?',
      a: 'No, our initial requirement review and comparison consultation are completely free and transparent. We only operate on successful structuring milestones and bank-standard processing charges disclosed directly on your official sanction letter.'
    },
    {
      q: 'Can startups or new businesses apply?',
      a: 'Yes, through specialized credit guarantee schemes (CGTMSE), machinery financing programs, and collateral-backed credit lines. We evaluate promoter profiles, revenue pipeline commitments, and projected cash flows to match you with accommodating lenders.'
    }
  ];

  return (
    <div className="flex flex-col w-full">
      {/* ========================================================
          HERO SECTION
          ======================================================== */}
      <section className="relative w-full bg-primary-container text-surface overflow-hidden">
        {/* Subtle financial curve accents */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full object-cover" fill="none" viewBox="0 0 1440 560" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M-100 480C200 400 350 200 650 260C950 320 1150 120 1540 180"
              stroke="url(#lineGrad1)"
              strokeDasharray="6 6"
              strokeWidth="2.5"
            ></path>
            <path
              d="M-50 560C250 480 480 320 800 360C1120 400 1280 220 1580 250"
              stroke="url(#lineGrad2)"
              strokeWidth="1.5"
            ></path>
            <defs>
              <linearGradient id="lineGrad1" x1="0" x2="1440" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#ffdf94" stopOpacity="0.2"></stop>
                <stop offset="0.5" stopColor="#ffdf94"></stop>
                <stop offset="1" stopColor="#8ff9a6" stopOpacity="0.4"></stop>
              </linearGradient>
              <linearGradient id="lineGrad2" x1="0" x2="1440" y1="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#8cf6a3" stopOpacity="0.1"></stop>
                <stop offset="0.7" stopColor="#ffdf94" stopOpacity="0.5"></stop>
                <stop offset="1" stopColor="#ffffff" stopOpacity="0"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-8 space-y-5">
              {/* Institutional Pill Badge */}
              <div className="inline-flex items-center gap-2 bg-surface-container-high/10 text-tertiary-fixed px-3.5 py-1.5 rounded-full shadow-sm border border-tertiary-fixed/20">
                <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span>
                <span className="text-xs uppercase tracking-wider font-semibold">
                  Streamlined Advisory &amp; Disbursement
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-[56px] text-surface-container-lowest font-extrabold tracking-tight leading-tight">
                A Clearer Way to <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-tertiary-fixed via-surface-container-lowest to-secondary-fixed bg-clip-text text-transparent">
                  Approach Financing
                </span>
              </h1>

              <p className="text-base sm:text-lg text-surface-variant max-w-2xl leading-relaxed">
                From requirement gathering to loan disbursement, our four-stage advisory model removes the complexity and delays from institutional borrowing across Raipur and regional markets.
              </p>

              {/* Rapid Metrics Strip */}
              <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-slate-700/60">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-tertiary-fixed">3–7 Days</div>
                  <div className="text-xs text-surface-container-high mt-1">Avg. Business Sanction</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-secondary-fixed">₹0</div>
                  <div className="text-xs text-surface-container-high mt-1">Upfront Evaluation Fee</div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-surface-container-lowest">45+</div>
                  <div className="text-xs text-surface-container-high mt-1">Institutional Lending Partners</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="relative bg-surface-container-lowest/5 p-6 rounded-xl shadow-2xl backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-2 mb-4">
                  <span className="material-symbols-outlined text-secondary-fixed text-2xl">verified_user</span>
                  <span className="text-lg font-bold text-surface-container-lowest">Institutional Fiduciary</span>
                </div>
                <p className="text-xs text-surface-container-high mb-4 leading-relaxed">
                  Direct credit-committee packaging ensuring 98.4% first-time dossier approval rates without iterative lender clarifications.
                </p>
                <div className="p-3 bg-surface-container-lowest/10 rounded-lg flex items-center justify-between border border-white/5">
                  <span className="text-xs text-tertiary-fixed font-semibold">Regional HQ</span>
                  <span className="text-xs text-surface-container-lowest font-medium">Civil Lines, Raipur</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 2 — THE 4-STAGE FINANCING JOURNEY
          ======================================================== */}
      <section className="w-full bg-surface-container-lowest py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-secondary text-xs uppercase tracking-wider mb-2 font-bold">
                <span className="material-symbols-outlined text-lg">schema</span>
                <span>Structured Execution</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-container tracking-tight">
                The 4-Stage Financing Journey
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md">
              A predictable, milestone-driven protocol designed to eliminate bureaucratic bottlenecks at every stage.
            </p>
          </div>

          {/* Process Progress Bar Ribbon (Desktop) */}
          <div className="hidden lg:block relative w-full h-2 bg-surface-container rounded-full overflow-hidden">
            <div className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-tertiary-fixed-dim via-secondary to-secondary-fixed rounded-full opacity-80"></div>
          </div>

          {/* 4 Stages Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stages.map((st) => (
              <div
                key={st.num}
                className="group relative flex flex-col justify-between bg-surface-container-low hover:bg-surface-container p-6 rounded-xl shadow-sm transition-all duration-300 hover:-translate-y-1 border border-slate-100"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`w-12 h-12 rounded-xl ${st.numBg} text-xl flex items-center justify-center font-bold shadow-md`}
                    >
                      {st.num}
                    </span>
                    <span className="material-symbols-outlined text-slate-400 text-2xl group-hover:text-primary-container transition-colors">
                      {st.icon}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-secondary uppercase tracking-wider font-bold">
                      {st.stage}
                    </span>
                    <h3 className="text-lg font-bold text-primary-container mt-1">{st.title}</h3>
                    <p className="text-xs text-on-surface-variant font-medium mt-0.5">{st.subtitle}</p>
                  </div>
                  <p className="text-xs text-on-surface-variant leading-relaxed">{st.desc}</p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-200/60">
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Deliverable Output</div>
                  <div className="text-xs text-primary-container flex items-center gap-1.5 mt-1 font-bold">
                    <span className="material-symbols-outlined text-secondary text-base">task_alt</span>
                    <span>{st.deliverable}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 3 — DOCUMENTS YOU MAY NEED
          ======================================================== */}
      <section className="w-full bg-surface-container-low py-20 lg:py-24 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-secondary text-xs uppercase tracking-wider mb-2 font-bold">
                <span className="material-symbols-outlined text-lg">fact_check</span>
                <span>Transparency Checklist</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-container tracking-tight">
                Documents You May Need
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md">
              Keep these core records on hand. We assist in preparing and reviewing paperwork before submitting to financial institutions.
            </p>
          </div>

          {/* 5 Document Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="bg-surface-container-lowest p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between border border-slate-100"
              >
                <div>
                  <div className="w-10 h-10 rounded-lg bg-surface-container text-primary-container flex items-center justify-center mb-4">
                    <span className="material-symbols-outlined text-2xl">{doc.icon}</span>
                  </div>
                  <h4 className="text-base font-bold text-primary-container">{doc.title}</h4>
                  <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">{doc.desc}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] text-secondary font-semibold">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  <span>{doc.tag}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Shield Advisory Banner */}
          <div className="bg-surface-container-lowest p-6 rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4 border border-slate-100">
            <div className="w-12 h-12 rounded-xl bg-secondary-fixed/30 text-secondary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl">shield</span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-bold text-primary-container">Personalized Document Roadmaps</div>
              <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">
                Requirements vary depending on the financing product and applicant profile. Our team assists with complete checklist preparation before formal submission.
              </p>
            </div>
            <button
              onClick={() => setIsChecklistModalOpen(true)}
              className="inline-flex items-center gap-1 text-primary-container hover:text-secondary text-xs font-bold transition-colors flex-shrink-0"
            >
              <span>Request Custom Checklist</span>
              <span className="material-symbols-outlined text-base">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 4 — FREQUENT PROCESS QUESTIONS
          ======================================================== */}
      <section className="w-full bg-surface-container-lowest py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 text-secondary text-xs uppercase tracking-wider font-bold">
              <span className="material-symbols-outlined text-lg">help</span>
              <span>Application Guidance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary-container tracking-tight">
              Frequent Process Questions
            </h2>
            <p className="text-sm text-on-surface-variant max-w-xl mx-auto">
              Common queries answered regarding timelines, regulatory protocols, and commercial terms.
            </p>
          </div>

          {/* Interactive FAQ Accordion */}
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-surface-container-low rounded-xl overflow-hidden transition-all duration-200 border border-slate-100"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base font-bold text-primary-container">{faq.q}</span>
                    <span
                      className={`material-symbols-outlined text-primary-container transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    >
                      expand_more
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 text-on-surface-variant text-xs sm:text-sm leading-relaxed border-t border-slate-200/60 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ========================================================
          SECTION 5 — FINAL CALL TO ACTION
          ======================================================== */}
      <section className="w-full bg-primary-container text-surface-container-lowest py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-surface-container-high/10 via-surface-container-high/5 to-transparent p-8 md:p-14 rounded-2xl overflow-hidden shadow-xl border border-white/10">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 bg-tertiary-fixed text-primary-container px-3 py-1 rounded-full text-xs font-bold">
                <span className="material-symbols-outlined text-sm">support_agent</span>
                <span>Direct Desk Support</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-surface-container-lowest tracking-tight">
                Ready to Accelerate Your Capital Acquisition?
              </h2>

              <p className="text-base text-surface-variant leading-relaxed">
                Have questions about the documentation? Talk to our Raipur advisory team at{' '}
                <a className="text-tertiary-fixed font-semibold hover:underline" href={`tel:${SUPPORT_PHONE}`}>
                  {SUPPORT_PHONE}
                </a>{' '}
                or book a confidential session with a senior lending officer.
              </p>

              {/* Dual Button Action Cluster */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <Link
                  to="/apply"
                  className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container text-sm font-bold px-8 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  <span>Apply for Loan</span>
                  <span className="material-symbols-outlined text-xl">arrow_forward</span>
                </Link>

                <Link
                  to="/appointment"
                  className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest text-primary-container hover:bg-surface-container text-sm font-bold px-8 py-3.5 rounded-xl transition-all shadow-md"
                >
                  <span className="material-symbols-outlined text-xl">calendar_month</span>
                  <span>Book Consultation</span>
                </Link>
              </div>
            </div>

            <div className="hidden lg:block absolute right-12 bottom-12 opacity-10 pointer-events-none">
              <span className="material-symbols-outlined text-[180px] text-surface-container-lowest">
                account_balance
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Custom Checklist Request */}
      <Modal
        isOpen={isChecklistModalOpen}
        onClose={() => setIsChecklistModalOpen(false)}
        title="Request Custom Documentation Checklist"
      >
        <div className="py-2">
          <p className="text-xs text-slate-500 mb-4">
            Provide your enterprise profile and required financing type. Our Raipur desk will send you an itemized document readiness dossier.
          </p>
          <EnquiryForm
            initialLoanType="Documentation Advisory"
            onSuccess={() => setIsChecklistModalOpen(false)}
          />
        </div>
      </Modal>
    </div>
  );
};
