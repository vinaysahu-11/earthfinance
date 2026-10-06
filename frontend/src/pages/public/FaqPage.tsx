import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

interface FaqItem {
  id: string;
  number: string;
  category: 'general' | 'business' | 'property' | 'industrial' | 'medical' | 'process';
  question: string;
  answer: string;
  keywords: string;
  tags?: string[];
  docChecklist?: string[];
  metricCallout?: { amount: string; description: string };
  note?: string;
  ctaLink?: { label: string; path: string };
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: '1',
    number: '01',
    category: 'general',
    question: 'What financing solutions does Earth Finance provide?',
    answer:
      'Earth Finance specializes in structured debt advisory and institutional financing solutions across Central India. Our portfolio spans Business Loans, Working Capital & Cash Credit (CC) limits, Loan Against Property (LAP), Industrial & Machinery Capex, Doctor/Medical facility lines, Institutional Education loans, and Commercial Vehicle fleets.',
    tags: ['MSME Credit', 'Cash Credit Limit', 'Machinery Lease', 'Central India Coverage'],
    keywords: 'financing solutions products working capital lap business capex doctor fleet'
  },
  {
    id: '2',
    number: '02',
    category: 'process',
    question: 'How do I apply for financing through Earth Finance?',
    answer:
      'You can submit an enquiry online via our Apply page, book an appointment at our Civil Lines office in Raipur, or call our direct helpline at 9300022732. An advisory officer will evaluate your requirement and formulate a tailored lender comparison.',
    ctaLink: { label: 'Begin Online Assessment', path: '/apply' },
    keywords: 'how do i apply online appointment consultation raipur civil lines call helpline advisory'
  },
  {
    id: '3',
    number: '03',
    category: 'process',
    question: 'What documents are typically required for assessment?',
    answer:
      'Basic documentation includes Entity PAN, KYC proof of promoters/directors, 12 months audited bank statements, last 3 years ITR filings and audited balance sheets (P&L), GST returns, and property/collateral title records where applicable.',
    docChecklist: [
      '3-Year Audited Financials',
      '12-Month Banking Analysis',
      'Promoter KYC & Entity PAN',
      'GST-3B & 1 Filings'
    ],
    keywords: 'documents required assessment pan kyc bank statement itr balance sheet gst returns collateral records'
  },
  {
    id: '4',
    number: '04',
    category: 'business',
    question: 'Is collateral required for all business loans?',
    answer:
      'Not necessarily. We structure both collateral-free business loans up to eligible limits (under CGTMSE and banking credit parameters) as well as secured credit facilities (LAP and equipment mortgages) for higher sanction tickets.',
    note: 'Note: Unsecured facilities are appraised primarily based on cash flows, business vintage (min. 3 years), and CIBIL CMR rating.',
    keywords: 'collateral required business loans unsecured cgtmse mortgage secured tickets'
  },
  {
    id: '5',
    number: '05',
    category: 'industrial',
    question: 'How much financing can an enterprise apply for?',
    answer:
      'Our credit facilities range from ₹10 Lakhs for specialized MSME working capital up to ₹25+ Crores for large-scale industrial capex, factory setup, and commercial property development.',
    metricCallout: {
      amount: '₹10L – ₹25Cr+',
      description:
        'Institutional sanction capability matched with tier-1 private and public scheduled commercial banks.'
    },
    keywords: 'how much financing max limit ticket size 10 lakhs 25 crores industrial capex factory setup msme'
  },
  {
    id: '6',
    number: '06',
    category: 'process',
    question: 'How long does the loan sanction and disbursal process take?',
    answer:
      'In-principle eligibility is typically established within 48 to 72 hours. Full documentation, bank appraisal, and final credit committee sanction generally take 7 to 15 business days depending on facility complexity.',
    keywords: 'how long loan sanction disbursal turnaround time 48 hours 72 hours 15 days approval'
  },
  {
    id: '7',
    number: '07',
    category: 'medical',
    question: 'Can doctors, dentists, and healthcare clinics apply?',
    answer:
      'Yes. We offer specialized medical equipment and clinic expansion credit lines for MBBS, MD, and BDS doctors with flexible tenure and custom moratorium periods.',
    note: 'Includes diagnostic centers, CT/MRI machinery lease options, and multi-specialty nursing homes.',
    keywords: 'doctors dentists healthcare clinics mbbs md bds medical equipment hospital clinic expansion moratorium'
  },
  {
    id: '8',
    number: '08',
    category: 'property',
    question: 'What is Loan Against Property (LAP) and what is the typical LTV?',
    answer:
      'LAP is a secured financing line unlocked against residential, commercial, or industrial real estate. LTV typically ranges between 60% and 75% of the appraised property market value.',
    note: 'Valuation Factor: Clear legal title search, non-agricultural approval certificate, and approved municipal sanction map significantly expedite highest-tier LTV approval.',
    keywords: 'loan against property lap ltv ratio residential commercial industrial appraised market value'
  },
  {
    id: '9',
    number: '09',
    category: 'business',
    question: 'What is Cash Credit (CC) and how does it differ from a term loan?',
    answer:
      'A Cash Credit (CC) line is a revolving working capital facility tied to current assets and debtor turnover. You only pay interest on the utilized funds, unlike a term loan where interest applies to the entire sanctioned balance.',
    keywords: 'cash credit cc term loan working capital revolving debtor turnover difference interest utilized'
  },
  {
    id: '10',
    number: '10',
    category: 'general',
    question: 'Do I need to visit your physical office in Raipur?',
    answer:
      'While we welcome personal consultations at our Civil Lines, Raipur regional headquarters, the entire consultation and document vetting process can also be coordinated digitally via secure email, phone, and video conference.',
    note: 'Regional Headquarters: Civil Lines, Raipur • In-person & Digital Open',
    keywords: 'visit physical office raipur civil lines digital email video conference remote documentation'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Categories', icon: 'apps' },
  { id: 'general', label: 'General & Advisory', icon: 'account_balance' },
  { id: 'business', label: 'Business Finance', icon: 'store' },
  { id: 'property', label: 'Property & LAP', icon: 'real_estate_agent' },
  { id: 'industrial', label: 'Industrial Capex', icon: 'precision_manufacturing' },
  { id: 'medical', label: 'Medical & Professional', icon: 'medical_services' },
  { id: 'process', label: 'Documentation & Process', icon: 'receipt_long' }
];

export const FaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openId, setOpenId] = useState<string | null>('1');

  // Compute counts for category buttons
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: FAQ_ITEMS.length };
    FAQ_ITEMS.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered FAQ items
  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return FAQ_ITEMS.filter(item => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const matchesQuery =
        !query ||
        item.question.toLowerCase().includes(query) ||
        item.answer.toLowerCase().includes(query) ||
        item.keywords.toLowerCase().includes(query);
      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  const toggleAccordion = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  const handleQuickLookup = (term: string) => {
    setSearchQuery(term);
    setActiveCategory('all');
    const container = document.getElementById('category-pills');
    if (container) {
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleResetSearch = () => {
    setSearchQuery('');
    setActiveCategory('all');
    setOpenId('1');
  };

  return (
    <div className="w-full bg-background min-h-screen text-on-surface">
      {/* HERO KNOWLEDGE BASE SECTION */}
      <section className="relative bg-gradient-to-br from-primary-container via-[#0d2a58] to-[#1455A0] text-white px-4 md:px-8 pt-12 pb-20 overflow-hidden">
        {/* Ambient architectural vector glow */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg className="w-full h-full" fill="none" viewBox="0 0 1440 500" xmlns="http://www.w3.org/2000/svg">
            <circle cx="90" cy="80" fill="#d7e2ff" filter="blur(140px)" r="320" />
            <circle cx="1350" cy="380" fill="#ffdf94" filter="blur(160px)" r="260" />
            <path d="M-100 350L1540 100" opacity="0.4" stroke="#d7e2ff" strokeDasharray="8 8" strokeWidth="1.5" />
            <path d="M-100 420L1540 170" opacity="0.3" stroke="#ffdf94" strokeDasharray="12 12" strokeWidth="1" />
          </svg>
        </div>

        <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6 shadow-sm border border-white/10">
            <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">verified</span>
            <span className="text-xs font-bold text-tertiary-fixed uppercase tracking-widest">
              Help &amp; Knowledge Base
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight text-white max-w-4xl font-extrabold leading-tight">
            Frequently Asked <span className="text-tertiary-fixed">Questions</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-lg text-[#dbe2f9] max-w-3xl mt-4 leading-relaxed font-normal">
            Find clear, definitive answers regarding credit eligibility, documentation checklists, institutional
            lending protocols, and the Earth Finance advisory process.
          </p>

          {/* Search Query Input */}
          <div className="w-full max-w-2xl mt-8 relative">
            <div className="relative flex items-center bg-white rounded-xl shadow-xl overflow-hidden focus-within:ring-2 focus-within:ring-tertiary-fixed transition-all">
              <div className="pl-4 pr-2 flex items-center justify-center text-slate-400 pointer-events-none">
                <span className="material-symbols-outlined text-[24px] text-primary-container">search</span>
              </div>
              <input
                id="faq-search-input"
                type="search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search queries (e.g. LAP eligibility, interest rates, documentation...)"
                className="w-full py-4 pr-32 text-sm sm:text-base text-slate-800 bg-transparent focus:outline-none placeholder:text-slate-400"
              />
              <button
                id="faq-search-btn"
                type="button"
                className="absolute right-2 top-2 bottom-2 bg-primary-container hover:bg-[#0b2d5c] text-white text-xs font-bold px-5 rounded-lg flex items-center gap-1 transition-colors"
              >
                <span>Search</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </button>
            </div>

            {/* Quick filter micro-tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-xs font-medium text-[#dbe2f9]">
              <span className="text-white/80">Trending lookups:</span>
              <button
                type="button"
                onClick={() => handleQuickLookup('LAP')}
                className="hover:text-tertiary-fixed underline underline-offset-4 decoration-tertiary-fixed/60 transition-colors"
              >
                LAP Limits
              </button>
              <span className="text-white/50">•</span>
              <button
                type="button"
                onClick={() => handleQuickLookup('Working Capital')}
                className="hover:text-tertiary-fixed underline underline-offset-4 decoration-tertiary-fixed/60 transition-colors"
              >
                Working Capital CC
              </button>
              <span className="text-white/50">•</span>
              <button
                type="button"
                onClick={() => handleQuickLookup('Documentation')}
                className="hover:text-tertiary-fixed underline underline-offset-4 decoration-tertiary-fixed/60 transition-colors"
              >
                ITR &amp; Balance Sheets
              </button>
              <span className="text-white/50">•</span>
              <button
                type="button"
                onClick={() => handleQuickLookup('Doctor')}
                className="hover:text-tertiary-fixed underline underline-offset-4 decoration-tertiary-fixed/60 transition-colors"
              >
                Medical Facility
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN FAQ CONTENT AREA */}
      <section className="max-w-7xl mx-auto w-full px-4 md:px-8 -mt-6 pb-24 relative z-20">
        {/* Category Navigation Pill Bar */}
        <div
          id="category-pills"
          className="bg-surface-container-lowest rounded-xl shadow-md p-3 mb-10 overflow-x-auto border border-outline-variant/30 scrollbar-none"
        >
          <div className="flex items-center gap-2 min-w-max">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2.5 rounded-lg text-xs sm:text-sm transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container shadow-sm font-bold'
                      : 'bg-surface hover:bg-surface-container text-on-surface-variant font-medium'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">{cat.icon}</span>
                  <span>{cat.label}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.5 rounded-md ${
                      isActive ? 'bg-primary-container/10 font-bold' : 'bg-surface-container-high'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Layout: Accordion Grid & Contextual Sidecard */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* FAQ Accordion Stream (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-4" id="faq-accordion-container">
            {filteredFaqs.map(item => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className="bg-surface-container-lowest rounded-xl shadow-sm border border-outline-variant/30 transition-all duration-300"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between text-left p-6 gap-4 group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <span className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary-container group-hover:bg-primary-container group-hover:text-surface-container-lowest transition-colors flex-shrink-0 font-bold text-sm">
                        {item.number}
                      </span>
                      <span className="text-base sm:text-lg font-bold text-on-surface group-hover:text-primary-container transition-colors leading-snug">
                        {item.question}
                      </span>
                    </div>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-tertiary-fixed text-primary-container'
                          : 'bg-surface text-primary-container group-hover:bg-tertiary-fixed'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-[20px] transition-transform duration-300 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      >
                        expand_circle_down
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 animate-fadeIn">
                      <div className="pl-4 sm:pl-13 border-l-2 border-primary-container/20 space-y-3">
                        <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                          {item.answer}
                        </p>

                        {/* Optional Tag Pills */}
                        {item.tags && (
                          <div className="flex flex-wrap gap-2 pt-2">
                            {item.tags.map(tag => (
                              <span
                                key={tag}
                                className="inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded bg-surface-container text-primary-container"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Optional Document Checklist Tiles */}
                        {item.docChecklist && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                            {item.docChecklist.map(doc => (
                              <div key={doc} className="flex items-center gap-2 p-2.5 bg-surface rounded-lg">
                                <span className="material-symbols-outlined text-[18px] text-secondary">
                                  check_circle
                                </span>
                                <span className="text-xs font-semibold text-on-surface">{doc}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Optional Metric Callout */}
                        {item.metricCallout && (
                          <div className="flex items-center gap-4 p-3 bg-surface-container-low rounded-lg border border-outline-variant/20">
                            <div className="text-secondary font-extrabold text-xl sm:text-2xl whitespace-nowrap">
                              {item.metricCallout.amount}
                            </div>
                            <div className="text-xs text-on-surface-variant leading-tight">
                              {item.metricCallout.description}
                            </div>
                          </div>
                        )}

                        {/* Optional Note Box */}
                        {item.note && (
                          <div className="p-3 bg-surface rounded-lg text-xs text-on-surface-variant leading-relaxed border border-outline-variant/15">
                            {item.note}
                          </div>
                        )}

                        {/* Optional CTA Link */}
                        {item.ctaLink && (
                          <div className="pt-2">
                            <Link
                              to={item.ctaLink.path}
                              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-primary-container hover:text-secondary transition-colors"
                            >
                              <span>{item.ctaLink.label}</span>
                              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Zero Results Notice */}
            {filteredFaqs.length === 0 && (
              <div className="bg-surface-container-lowest rounded-xl p-10 text-center shadow-sm border border-outline-variant/30">
                <div className="w-12 h-12 mx-auto rounded-full bg-surface-container flex items-center justify-center text-outline mb-3">
                  <span className="material-symbols-outlined text-[24px]">search_off</span>
                </div>
                <h3 className="text-lg font-bold text-on-surface">No matching questions found</h3>
                <p className="text-xs sm:text-sm text-on-surface-variant mt-1 max-w-sm mx-auto">
                  Try adjusting your search terms or select another category filter above.
                </p>
                <button
                  type="button"
                  onClick={handleResetSearch}
                  className="mt-4 text-xs sm:text-sm font-bold text-primary-container underline underline-offset-4 hover:text-secondary transition-colors"
                >
                  Reset search and show all questions
                </button>
              </div>
            )}
          </div>

          {/* Contextual Sidebar: Knowledge Stats & Support Card (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Regional Officer Office Card */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/30">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[20px]">location_city</span>
                </div>
                <div>
                  <h4 className="text-base font-bold text-on-surface leading-snug">Raipur Desk</h4>
                  <p className="text-xs text-on-surface-variant font-medium">Civil Lines Advisory HQ</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-on-surface-variant mb-6">
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">
                    verified_user
                  </span>
                  <span>Direct Bank Liaison Officer assigned to each high-ticket corporate dossier.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">timer</span>
                  <span>Average initial appraisal completed under 48 hours for MSME &amp; LAP.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">lock</span>
                  <span>100% fiduciary confidentiality and NDAs executed prior to data review.</span>
                </div>
              </div>

              <div className="p-3.5 bg-surface-container-low rounded-lg flex items-center justify-between border border-outline-variant/15">
                <div>
                  <span className="block text-[10px] uppercase tracking-wider text-outline font-bold">
                    Working Hours
                  </span>
                  <span className="text-xs font-semibold text-on-surface">Mon – Sat | 10:00 AM – 7:00 PM</span>
                </div>
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" title="Active today" />
              </div>
            </div>

            {/* Documentation Quick Reference Chart Box ("Speed Assessment Kit") */}
            <div className="bg-surface-container-lowest rounded-xl p-6 shadow-sm border border-outline-variant/30">
              <h4 className="text-base font-bold text-on-surface mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed-dim text-[20px]">checklist</span>
                <span>Speed Assessment Kit</span>
              </h4>
              <p className="text-xs text-on-surface-variant mb-4">
                Having these ready expedites processing by up to 5 banking days:
              </p>

              <ul className="space-y-2.5 text-xs text-on-surface font-medium">
                <li className="flex items-center justify-between p-2 rounded bg-surface border border-outline-variant/10">
                  <span>Audited P&amp;L + Balance Sheet (3 Yrs)</span>
                  <span className="font-bold text-secondary">Mandatory</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded bg-surface border border-outline-variant/10">
                  <span>Primary Operational Bank A/c (12 Mos)</span>
                  <span className="font-bold text-secondary">Mandatory</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded bg-surface border border-outline-variant/10">
                  <span>GST Filings &amp; 2A/3B Reconciliation</span>
                  <span className="font-bold text-secondary">Mandatory</span>
                </li>
                <li className="flex items-center justify-between p-2 rounded bg-surface border border-outline-variant/10">
                  <span>Title Deed / Registry / Tax Challan</span>
                  <span className="font-bold text-outline">For LAP</span>
                </li>
              </ul>

              <div className="mt-5 pt-4 border-t border-surface-container flex items-center justify-between">
                <span className="text-xs text-on-surface-variant">Need doc review?</span>
                <a
                  className="text-xs font-bold text-primary-container hover:underline flex items-center gap-1"
                  href="tel:9300022732"
                >
                  <span>Consult Officer</span>
                  <span className="material-symbols-outlined text-[14px]">call</span>
                </a>
              </div>
            </div>

            {/* Metric Track Record Card */}
            <div className="bg-gradient-to-br from-surface to-surface-container-low rounded-xl p-6 shadow-sm border-l-4 border-secondary border border-outline-variant/20">
              <div className="text-[10px] uppercase tracking-wider text-outline font-bold">Track Record</div>
              <div className="text-3xl font-extrabold text-primary-container mt-1">₹500Cr+</div>
              <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Cumulatively syndicated &amp; disbursed across Central India businesses, factories, and commercial
                enterprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM "STILL HAVE QUESTIONS?" SECTION */}
      <section className="w-full px-4 md:px-8 pb-20">
        <div className="max-w-7xl mx-auto rounded-2xl bg-gradient-to-r from-primary-container via-[#0B2D5C] to-primary-container p-8 md:p-12 text-white shadow-xl relative overflow-hidden border border-primary-container">
          {/* Decorative background wave lines */}
          <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-tertiary-fixed/10 blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -top-16 w-80 h-80 rounded-full bg-secondary/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-semibold text-tertiary-fixed border border-white/10">
                <span className="material-symbols-outlined text-[16px]">headset_mic</span>
                <span>Personalized Credit Consultation</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl text-white font-extrabold tracking-tight">
                Still Have Questions?
              </h2>

              <p className="text-sm sm:text-base text-[#dbe2f9] font-normal leading-relaxed">
                Our senior debt consultants in Raipur are available to discuss your specific financial parameters in
                complete confidence.
              </p>

              <div className="flex items-center justify-center lg:justify-start gap-4 text-xs text-[#dbe2f9] pt-1">
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-tertiary-fixed">bolt</span> Immediate
                  Callback
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-tertiary-fixed">verified</span> Zero
                  Obligation
                </span>
                <span className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-[15px] text-tertiary-fixed">lock</span> Confidential
                  Review
                </span>
              </div>
            </div>

            {/* Action cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto flex-shrink-0">
              {/* Book consultation (Gold button) */}
              <Link
                to="/book-consultation"
                className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim hover:from-tertiary-fixed-dim hover:to-tertiary-fixed text-primary-container text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-center"
              >
                <span>Book a Consultation</span>
                <span className="material-symbols-outlined text-[18px]">north_east</span>
              </Link>

              {/* WhatsApp (Green-accented action) */}
              <a
                href="https://wa.me/919300022732"
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex items-center justify-center gap-2 bg-secondary-container hover:bg-secondary text-on-secondary-container hover:text-white text-sm font-bold px-5 py-3.5 rounded-xl transition-all shadow-sm text-center"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>WhatsApp Us</span>
              </a>

              {/* Call Helpline */}
              <a
                href="tel:9300022732"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold px-5 py-3.5 rounded-xl transition-all text-center border border-white/10"
              >
                <span className="material-symbols-outlined text-[18px]">call</span>
                <span>9300022732</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FaqPage;
