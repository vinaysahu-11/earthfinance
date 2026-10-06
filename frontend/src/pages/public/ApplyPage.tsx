import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { leadApi } from '../../services/leadApi';

interface FacilityOption {
  value: string;
  label: string;
  description: string;
  icon: string;
}

const FACILITIES: FacilityOption[] = [
  {
    value: 'business_loan',
    label: 'Business Loan',
    description: 'Unsecured working & term credit',
    icon: 'storefront'
  },
  {
    value: 'working_capital',
    label: 'Working Capital / OD',
    description: 'Overdraft liquidity lines',
    icon: 'account_balance_wallet'
  },
  {
    value: 'cash_credit',
    label: 'CC / Cash Credit',
    description: 'Inventory & book debt limits',
    icon: 'payments'
  },
  {
    value: 'lap',
    label: 'Property Loan / LAP',
    description: 'Commercial & residential equity',
    icon: 'apartment'
  },
  {
    value: 'machinery',
    label: 'Industrial Finance',
    description: 'Plant & heavy equipment capex',
    icon: 'precision_manufacturing'
  },
  {
    value: 'medical',
    label: 'Medical Finance',
    description: 'Doctors, clinics & diagnostic labs',
    icon: 'medical_services'
  },
  {
    value: 'education',
    label: 'Education Institutions',
    description: 'Schools, colleges & trusts',
    icon: 'school'
  },
  {
    value: 'fleet',
    label: 'Fleet & Logistics',
    description: 'Trucks, trailers & buses',
    icon: 'local_shipping'
  },
  {
    value: 'other',
    label: 'Bespoke Project Loan',
    description: 'Infrastructure & customized lines',
    icon: 'hub'
  }
];

const LOAN_AMOUNTS = [
  { value: '10-25L', label: '₹10 Lakhs - ₹25 Lakhs' },
  { value: '25-50L', label: '₹25 Lakhs - ₹50 Lakhs' },
  { value: '50L-2Cr', label: '₹50 Lakhs - ₹2 Crore' },
  { value: '2Cr-5Cr', label: '₹2 Crore - ₹5 Crore' },
  { value: '5Cr-15Cr', label: '₹5 Crore - ₹15 Crore' },
  { value: '15Cr+', label: 'Above ₹15 Crore (Institutional)' }
];

const BUSINESS_TYPES = [
  { value: 'manufacturing', label: 'Manufacturing & Engineering' },
  { value: 'trading', label: 'Wholesale & Retail Trading' },
  { value: 'services', label: 'Professional Services (Doctor / CA / Architect)' },
  { value: 'contractor', label: 'EPC / Infrastructure Contractor' },
  { value: 'logistics', label: 'Logistics & Transport Fleet' },
  { value: 'salaried', label: 'Salaried CXO / Senior Executive' }
];

const TURNOVER_BRACKETS = [
  { value: 'under_1cr', label: 'Under ₹1 Crore', sublabel: 'Early Stage' },
  { value: '1cr_5cr', label: '₹1 Cr - ₹5 Cr', sublabel: 'Growing SME' },
  { value: '5cr_25cr', label: '₹5 Cr - ₹25 Cr', sublabel: 'Mid Corporate' },
  { value: '25cr_plus', label: '₹25 Cr+', sublabel: 'Large Enterprise' }
];

export const ApplyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const successSectionRef = useRef<HTMLDivElement>(null);

  // Form State
  const [facilityType, setFacilityType] = useState<string>('business_loan');
  const [applicantName, setApplicantName] = useState<string>('Rajesh Agrawal');
  const [applicantPhone, setApplicantPhone] = useState<string>('9300022732');
  const [applicantEmail, setApplicantEmail] = useState<string>('rajesh@enterprisecapital.in');
  const [applicantCity, setApplicantCity] = useState<string>('Raipur, Chhattisgarh');
  const [loanAmount, setLoanAmount] = useState<string>('50L-2Cr');
  const [businessType, setBusinessType] = useState<string>('manufacturing');
  const [turnover, setTurnover] = useState<string>('1cr_5cr');
  const [applicantNotes, setApplicantNotes] = useState<string>('');
  const [consentChecked, setConsentChecked] = useState<boolean>(true);

  // Status State
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [trackingId, setTrackingId] = useState<string>('#EF-2026-8842');

  useEffect(() => {
    const loanParam = searchParams.get('loanType') || searchParams.get('type');
    if (loanParam) {
      const match = FACILITIES.find(
        f =>
          f.value.toLowerCase() === loanParam.toLowerCase() ||
          f.label.toLowerCase().includes(loanParam.toLowerCase())
      );
      if (match) setFacilityType(match.value);
    }
  }, [searchParams]);

  const selectedFacilityObj = FACILITIES.find(f => f.value === facilityType) || FACILITIES[0];
  const selectedAmountObj = LOAN_AMOUNTS.find(a => a.value === loanAmount) || LOAN_AMOUNTS[2];
  const selectedBusinessTypeObj = BUSINESS_TYPES.find(b => b.value === businessType) || BUSINESS_TYPES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const turnoverObj = TURNOVER_BRACKETS.find(t => t.value === turnover);
      const combinedMessage = [
        `Turnover: ${turnoverObj ? turnoverObj.label : turnover}`,
        applicantNotes.trim() ? `Notes/Collateral: ${applicantNotes.trim()}` : ''
      ]
        .filter(Boolean)
        .join('\n');

      const res = await leadApi.createLead({
        name: applicantName.trim(),
        phone: applicantPhone.trim(),
        email: applicantEmail.trim(),
        loan_type: selectedFacilityObj.label,
        required_amount: selectedAmountObj.label,
        city: applicantCity.trim(),
        business_type: selectedBusinessTypeObj.label,
        message: combinedMessage || undefined,
        source: 'WEBSITE'
      });

      if (res.success || res.data) {
        const leadId = res.data?.id || '';
        const generatedToken = leadId
          ? `#EF-2026-${leadId.slice(0, 4).toUpperCase()}`
          : `#EF-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        setTrackingId(generatedToken);
        setIsSubmitted(true);

        setTimeout(() => {
          if (successSectionRef.current) {
            successSectionRef.current.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        setError(res.message || 'Unable to submit financing enquiry. Please verify details or call 9300022732.');
      }
    } catch (err: any) {
      console.error('Lead submission error:', err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Unable to submit financing enquiry. Please call our direct desk at 9300022732.';
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-background min-h-screen text-on-surface">
      {/* IMMERSIVE CORPORATE HERO WITH GEOMETRIC GRID & AMBIENT GLOW */}
      <section className="relative overflow-hidden bg-primary-container text-surface-container-lowest -mt-[120px] pt-[140px] pb-16 lg:pb-24">
        {/* Ambient financial light nodes */}
        <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-tertiary-fixed/10 blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 w-[500px] h-80 rounded-full bg-surface-tint/20 blur-[140px] pointer-events-none" />

        {/* Background SVG Architecture Grid */}
        <div className="absolute inset-0 opacity-[0.07] pointer-events-none mix-blend-screen">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="institutional-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                <path d="M 48 0 L 0 0 0 48" fill="none" stroke="currentColor" strokeWidth="1" />
                <circle cx="48" cy="48" r="1.5" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#institutional-grid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          {/* Breadcrumb & Authority Pill */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high/15 backdrop-blur text-tertiary-fixed text-xs font-bold uppercase tracking-wider border border-tertiary-fixed/20">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse" />
              Direct Lending Network • Raipur Advisory Desk
            </span>
            <span className="text-surface-variant/40 hidden sm:inline">•</span>
            <span className="text-[#dbe2f9] text-xs font-semibold hidden sm:inline">Zero Upfront Advisory Levy</span>
          </div>

          {/* Main Headline Block */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            <div className="lg:col-span-8 space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                Tell Us What You{' '}
                <span className="text-tertiary-fixed underline decoration-tertiary-fixed/40 decoration-4 underline-offset-8">
                  Need
                </span>
              </h1>
              <p className="text-base md:text-lg text-[#dbe2f9] max-w-2xl leading-relaxed">
                Share a few details and our advisory team will analyze your capital requirements, benchmark lender
                terms, and structure suitable financing options with zero upfront evaluation fee.
              </p>
            </div>

            {/* Metric Fast-Check Cards */}
            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <div className="bg-surface-container-high/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-between shadow-sm border border-white/10">
                <div>
                  <span className="text-xs uppercase text-[#7384a9] tracking-wider font-semibold">
                    Lender Consortium
                  </span>
                  <p className="text-2xl font-extrabold text-white">24+ Tier-1 Banks</p>
                </div>
                <span className="material-symbols-outlined text-tertiary-fixed text-[36px]">account_balance</span>
              </div>
              <div className="bg-surface-container-high/10 backdrop-blur-md rounded-xl p-4 flex items-center justify-between shadow-sm border border-white/10">
                <div>
                  <span className="text-xs uppercase text-[#7384a9] tracking-wider font-semibold">
                    Disbursal Horizon
                  </span>
                  <p className="text-2xl font-extrabold text-secondary-fixed">48 - 72 Hours</p>
                </div>
                <span className="material-symbols-outlined text-secondary-fixed text-[36px]">bolt</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VISUAL ANCHOR GRAPHIC: WORKFLOW OVERVIEW */}
      <div className="w-full bg-surface-container-low py-4 shadow-inner border-y border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-on-surface-variant">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">verified_user</span>
              <span>100% Confidential Credit Evaluation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container text-[18px]">currency_rupee</span>
              <span>Sovereign &amp; Private NBFC Structuring</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container text-[18px]">domain</span>
              <span>Direct Raipur Branch Head Interaction</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">lock</span>
              <span>RBI Licensed Consortium Banking</span>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN APPLICATION WORKSPACE: SPLIT FORM + INSTITUTIONAL SECURITY */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 py-12 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT / MAIN APPLICATION COLUMN (Multi-Step Form) */}
          <div className="lg:col-span-8 flex flex-col space-y-6">
            {/* Step Indicator Track */}
            <div className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/30">
              <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2 sm:pb-0">
                {/* Step 1 */}
                <div className="flex items-center gap-2 min-w-max">
                  <span className="w-8 h-8 rounded-full bg-primary-container text-tertiary-fixed text-xs flex items-center justify-center font-bold">
                    1
                  </span>
                  <div>
                    <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                      Stage 01
                    </span>
                    <span className="text-xs font-bold text-on-surface">Facility Type</span>
                  </div>
                </div>
                <div className="h-0.5 w-6 md:w-14 bg-surface-container-highest" />

                {/* Step 2 */}
                <div className="flex items-center gap-2 min-w-max">
                  <span className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant text-xs flex items-center justify-center font-bold">
                    2
                  </span>
                  <div>
                    <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                      Stage 02
                    </span>
                    <span className="text-xs font-bold text-on-surface">Profile Data</span>
                  </div>
                </div>
                <div className="h-0.5 w-6 md:w-14 bg-surface-container-highest" />

                {/* Step 3 */}
                <div className="flex items-center gap-2 min-w-max">
                  <span className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant text-xs flex items-center justify-center font-bold">
                    3
                  </span>
                  <div>
                    <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                      Stage 03
                    </span>
                    <span className="text-xs font-bold text-on-surface">Finances</span>
                  </div>
                </div>
                <div className="h-0.5 w-6 md:w-14 bg-surface-container-highest" />

                {/* Step 4 */}
                <div className="flex items-center gap-2 min-w-max">
                  <span className="w-8 h-8 rounded-full bg-surface-container text-on-surface-variant text-xs flex items-center justify-center font-bold">
                    4
                  </span>
                  <div>
                    <span className="block text-[10px] text-on-surface-variant uppercase tracking-wider font-semibold">
                      Stage 04
                    </span>
                    <span className="text-xs font-bold text-on-surface">Submit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* FORM ENCLOSURE */}
            <form
              id="earthFinanceForm"
              onSubmit={handleSubmit}
              className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-sm border border-outline-variant/30 space-y-8"
            >
              {error && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2">
                  <span className="material-symbols-outlined text-[20px] text-red-600 mt-0.5">error</span>
                  <span>{error}</span>
                </div>
              )}

              {/* STEP 1: FACILITY SELECTION */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-secondary uppercase font-bold tracking-widest">Step 1 of 4</span>
                    <h2 className="text-xl font-bold text-on-surface">What type of finance do you need?</h2>
                  </div>
                  <span className="text-on-surface-variant text-xs hidden sm:inline">Select one or multiple</span>
                </div>

                {/* Facility Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {FACILITIES.map(fac => {
                    const isSelected = facilityType === fac.value;
                    return (
                      <label
                        key={fac.value}
                        onClick={() => setFacilityType(fac.value)}
                        className={`relative flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          isSelected
                            ? 'bg-primary-container text-surface-container-lowest shadow-sm scale-[1.01]'
                            : 'bg-surface-container-low hover:bg-surface-container text-on-surface hover:scale-[1.01]'
                        }`}
                      >
                        <input
                          type="radio"
                          name="facility_type"
                          value={fac.value}
                          checked={isSelected}
                          onChange={() => setFacilityType(fac.value)}
                          className="peer sr-only"
                        />
                        <span
                          className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-surface-container-highest/20 text-tertiary-fixed'
                              : 'bg-surface-container text-primary-container'
                          }`}
                        >
                          <span className="material-symbols-outlined text-[24px]">{fac.icon}</span>
                        </span>
                        <div className="min-w-0 pr-4">
                          <span className="text-sm font-bold block leading-tight">{fac.label}</span>
                          <span
                            className={`text-xs leading-snug block mt-0.5 ${
                              isSelected ? 'text-surface-variant' : 'text-on-surface-variant'
                            }`}
                          >
                            {fac.description}
                          </span>
                        </div>
                        {isSelected && (
                          <span className="material-symbols-outlined text-tertiary-fixed absolute top-3 right-3 text-[20px]">
                            check_circle
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* STEP 2: PERSONAL & ENTITY INFORMATION */}
              <div className="space-y-4 pt-4 border-t border-outline-variant/15">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-secondary uppercase font-bold tracking-widest">Step 2 of 4</span>
                    <h2 className="text-xl font-bold text-on-surface">Personal &amp; Entity Information</h2>
                  </div>
                  <span className="text-secondary text-xs font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">lock</span>
                    Strict NDA Protection
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="applicantName">
                      Applicant / Promoter Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined text-outline absolute left-3.5 top-3.5 text-[20px]">
                        person
                      </span>
                      <input
                        id="applicantName"
                        required
                        type="text"
                        value={applicantName}
                        onChange={e => setApplicantName(e.target.value)}
                        placeholder="e.g. Rajesh Agrawal"
                        className="w-full h-12 pl-11 pr-4 bg-surface-container-low text-on-surface rounded-lg text-sm focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-bold text-on-surface" htmlFor="applicantPhone">
                        Mobile Number <span className="text-red-500">*</span>
                      </label>
                      <span className="text-secondary text-xs flex items-center gap-1 font-semibold">
                        <span className="material-symbols-outlined text-[14px]">verified</span> OTP Ready
                      </span>
                    </div>
                    <div className="relative flex">
                      <span className="inline-flex items-center px-3.5 bg-surface-container text-on-surface-variant text-xs font-bold rounded-l-lg select-none">
                        +91
                      </span>
                      <input
                        id="applicantPhone"
                        required
                        type="tel"
                        value={applicantPhone}
                        onChange={e => setApplicantPhone(e.target.value)}
                        placeholder="93000 22732"
                        className="w-full h-12 px-4 bg-surface-container-low text-on-surface rounded-r-lg text-sm focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="applicantEmail">
                      Corporate / Personal Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined text-outline absolute left-3.5 top-3.5 text-[20px]">
                        mail
                      </span>
                      <input
                        id="applicantEmail"
                        required
                        type="email"
                        value={applicantEmail}
                        onChange={e => setApplicantEmail(e.target.value)}
                        placeholder="rajesh@enterprisecapital.in"
                        className="w-full h-12 pl-11 pr-4 bg-surface-container-low text-on-surface rounded-lg text-sm focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                      />
                    </div>
                  </div>

                  {/* City & State */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="applicantCity">
                      Operating City &amp; State <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined text-outline absolute left-3.5 top-3.5 text-[20px]">
                        location_city
                      </span>
                      <input
                        id="applicantCity"
                        required
                        type="text"
                        value={applicantCity}
                        onChange={e => setApplicantCity(e.target.value)}
                        placeholder="Raipur, Chhattisgarh"
                        className="w-full h-12 pl-11 pr-4 bg-surface-container-low text-on-surface rounded-lg text-sm focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container transition-all"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* STEP 3: FINANCIAL REQUIREMENTS */}
              <div className="space-y-4 pt-4 border-t border-outline-variant/15">
                <div>
                  <span className="text-xs text-secondary uppercase font-bold tracking-widest">Step 3 of 4</span>
                  <h2 className="text-xl font-bold text-on-surface">Financial Requirement</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Required Loan Amount */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="loanAmount">
                      Required Capital Sanction <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-3.5 font-bold text-on-surface-variant">₹</span>
                      <select
                        id="loanAmount"
                        value={loanAmount}
                        onChange={e => setLoanAmount(e.target.value)}
                        className="w-full h-12 pl-9 pr-10 bg-surface-container-low text-on-surface rounded-lg text-sm font-semibold focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container appearance-none transition-all"
                      >
                        {LOAN_AMOUNTS.map(amt => (
                          <option key={amt.value} value={amt.value}>
                            {amt.label}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined text-outline absolute right-3 top-3.5 pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Business Type */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="businessType">
                      Entity / Profession Type <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="businessType"
                        value={businessType}
                        onChange={e => setBusinessType(e.target.value)}
                        className="w-full h-12 px-4 pr-10 bg-surface-container-low text-on-surface rounded-lg text-sm font-semibold focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container appearance-none transition-all"
                      >
                        {BUSINESS_TYPES.map(bt => (
                          <option key={bt.value} value={bt.value}>
                            {bt.label}
                          </option>
                        ))}
                      </select>
                      <span className="material-symbols-outlined text-outline absolute right-3 top-3.5 pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Turnover Bracket */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-xs font-bold text-on-surface">
                      Existing Annual Gross Turnover / Receipts
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {TURNOVER_BRACKETS.map(tb => {
                        const isTbActive = turnover === tb.value;
                        return (
                          <label
                            key={tb.value}
                            onClick={() => setTurnover(tb.value)}
                            className={`p-3 text-center rounded-lg cursor-pointer text-xs transition-all flex flex-col items-center ${
                              isTbActive
                                ? 'bg-primary-container text-surface-container-lowest shadow-sm'
                                : 'bg-surface-container-low hover:bg-surface-container text-on-surface'
                            }`}
                          >
                            <input
                              type="radio"
                              name="turnover"
                              value={tb.value}
                              checked={isTbActive}
                              onChange={() => setTurnover(tb.value)}
                              className="peer sr-only"
                            />
                            <span className={isTbActive ? 'font-bold text-tertiary-fixed' : 'font-medium'}>
                              {tb.label}
                            </span>
                            <span
                              className={`text-[11px] mt-0.5 ${
                                isTbActive ? 'text-surface-variant' : 'text-on-surface-variant'
                              }`}
                            >
                              {tb.sublabel}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  {/* Notes / Special Instructions */}
                  <div className="space-y-1.5 md:col-span-2">
                    <label className="block text-xs font-bold text-on-surface" htmlFor="applicantNotes">
                      Specific Requirements or Collateral Details (Optional)
                    </label>
                    <textarea
                      id="applicantNotes"
                      rows={3}
                      value={applicantNotes}
                      onChange={e => setApplicantNotes(e.target.value)}
                      placeholder="Provide details like current banking partner, collateral availability (industrial shed, residential property), or desired repayment tenure..."
                      className="w-full p-3.5 bg-surface-container-low text-on-surface rounded-lg text-sm focus:bg-surface-container-lowest focus:outline-none focus:ring-2 focus:ring-primary-container transition-all resize-none"
                    />
                  </div>
                </div>
              </div>

              {/* STEP 4: REVIEW & SUBMISSION */}
              <div className="space-y-4 pt-4 border-t border-outline-variant/15">
                <div>
                  <span className="text-xs text-secondary uppercase font-bold tracking-widest">Step 4 of 4</span>
                  <h2 className="text-xl font-bold text-on-surface">Review &amp; Fast-Track Submission</h2>
                </div>

                {/* Pre-Submission Summary Badge Cloud */}
                <div className="bg-surface-container-low rounded-xl p-4 flex flex-wrap gap-2 items-center border border-outline-variant/15">
                  <span className="text-xs text-on-surface-variant uppercase tracking-wider font-bold mr-2">
                    Enquiry Summary:
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-primary-container text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">category</span>
                    {selectedFacilityObj.label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-primary-container text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">payments</span>
                    {selectedAmountObj.label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-primary-container text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">factory</span>
                    {selectedBusinessTypeObj.label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-highest text-primary-container text-xs font-bold">
                    <span className="material-symbols-outlined text-[14px]">location_on</span>
                    {applicantCity || 'Raipur, CG'}
                  </span>
                </div>

                {/* Mandatory Consent Checkbox */}
                <label className="flex items-start gap-3 cursor-pointer group pt-1">
                  <input
                    type="checkbox"
                    checked={consentChecked}
                    onChange={e => setConsentChecked(e.target.checked)}
                    required
                    className="mt-1 h-5 w-5 rounded text-primary-container focus:ring-primary-container"
                  />
                  <span className="text-xs text-on-surface-variant leading-relaxed select-none">
                    I authorize Earth Finance and its affiliated institutional banking partners to analyze provided
                    credit parameters, review indicative borrowing capacity, and contact me via phone, email, or
                    WhatsApp. I understand there is <strong className="text-on-surface">no upfront evaluation fee</strong>.
                  </span>
                </label>

                {/* Actions Row */}
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !consentChecked}
                    className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tertiary-fixed via-tertiary-fixed to-tertiary-fixed-dim text-primary-container font-bold text-sm sm:text-base px-8 py-4 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin material-symbols-outlined text-[20px]">refresh</span>
                        <span>Transmitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Financing Enquiry</span>
                        <span className="material-symbols-outlined text-[20px]">north_east</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://wa.me/919300022732?text=Hello%20Earth%20Finance,%20I%20would%20like%20to%20apply%20for%20business%20financing."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-secondary/10 hover:bg-secondary/15 text-secondary font-bold text-xs sm:text-sm px-6 py-4 rounded-xl transition-all"
                  >
                    <span className="material-symbols-outlined text-[20px]">chat</span>
                    <span>WhatsApp On +91 9300022732</span>
                  </a>
                </div>

                {/* Assurance Micro-Footer */}
                <div className="flex items-center justify-between text-outline text-xs pt-2">
                  <span className="flex items-center gap-1 font-medium">
                    <span className="material-symbols-outlined text-[16px] text-secondary">security</span>
                    256-Bit SSL Encrypted Submission
                  </span>
                  <span>Average response time: &lt; 2 business hours</span>
                </div>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: Institutional Trust & Security Sidebar */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            {/* Trust Pillar Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/30 space-y-4">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary-container">
                  <span className="material-symbols-outlined text-[22px]">shield</span>
                </span>
                <div>
                  <span className="text-xs text-secondary uppercase font-bold tracking-wider">
                    Institutional Integrity
                  </span>
                  <h3 className="text-base font-bold text-on-surface">Why Apply With Earth Finance?</h3>
                </div>
              </div>

              {/* Trust Item List */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/15">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-on-surface">Professional Underwriting Guidance</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                      Direct liaison with senior credit managers and national sanction committees from 20+ banking
                      networks.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/15">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-on-surface">Transparent Terms &amp; Zero Concealed Fees</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                      Clear sanction metrics, direct processing charges to bank accounts, zero upfront advisory levy.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/15">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-on-surface">Multi-Lender Syndication</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                      Concurrent benchmarking between Tier-1 PSUs, leading private financial entities, and specialized
                      NBFCs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/15">
                  <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">
                    check_circle
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-on-surface">Enterprise Confidentiality</h4>
                    <p className="text-xs text-on-surface-variant leading-relaxed mt-0.5">
                      Your financial statements, projections, and KYC remain strictly protected under Indian fiduciary
                      secrecy norms.
                    </p>
                  </div>
                </div>
              </div>

              {/* Statutory Disclosures */}
              <div className="p-3.5 bg-surface-container rounded-xl text-on-surface-variant text-xs leading-relaxed">
                <div className="flex items-center gap-1.5 font-bold text-on-surface mb-1">
                  <span className="material-symbols-outlined text-[16px] text-on-surface-variant">info</span>
                  <span>Regulatory Compliance Notice</span>
                </div>
                Financing sanctions are strictly subject to borrower eligibility, institutional risk appraisal, and
                individual bank underwriting terms. Earth Finance does not charge upfront evaluation fees.
              </div>
            </div>

            {/* Direct Regional Support Card */}
            <div className="bg-primary-container text-surface-container-lowest rounded-2xl p-6 shadow-sm space-y-3 relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 w-40 h-40 rounded-full bg-tertiary-fixed/10 blur-xl pointer-events-none" />
              <span className="text-xs text-tertiary-fixed uppercase font-bold tracking-wider">Direct Assistance</span>
              <h3 className="text-lg font-bold text-surface-container-lowest">Need Immediate Guidance?</h3>
              <p className="text-xs text-surface-variant leading-relaxed">
                Speak directly with our senior debt syndication consultant in Raipur before submitting your records.
              </p>
              <div className="space-y-2 pt-2">
                <a
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-high/15 hover:bg-surface-container-high/25 transition-all text-surface-container-lowest border border-white/10"
                  href="tel:9300022732"
                >
                  <span className="material-symbols-outlined text-tertiary-fixed text-[22px]">phone_in_talk</span>
                  <div>
                    <span className="block text-[10px] text-surface-variant uppercase font-semibold">
                      Direct Helpline
                    </span>
                    <span className="text-base font-bold tracking-wide">93000 22732</span>
                  </div>
                </a>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-surface-container-high/10 text-surface-variant border border-white/10">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[22px] shrink-0 mt-0.5">
                    location_on
                  </span>
                  <div>
                    <span className="block text-[10px] text-surface-container-highest uppercase font-semibold">
                      Regional Desk
                    </span>
                    <span className="text-xs text-surface-container-lowest">
                      Civil Lines, Raipur, Chhattisgarh — 492001
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-2">
                <span className="text-xs text-surface-variant flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
                  Desk active now: Mon – Sat (9:30 AM – 6:30 PM)
                </span>
              </div>
            </div>

            {/* Raipur Branch Map Snapshot Container */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm border border-outline-variant/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-on-surface">Regional Office Presence</span>
                <span className="text-[11px] text-secondary font-semibold">In-Person Appointments Available</span>
              </div>
              <div
                className="w-full h-44 bg-surface-container rounded-xl bg-cover bg-center overflow-hidden flex items-end p-3 relative shadow-inner"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQWQobAHBJpMTaDv2CCq1i9nn55iPRq_CYil5BpthL9HHZS__jlbdM_mTTXL7tDSmIsqLj2xAaUuLFffYdzTFsWVNe_TXDeJ58-bj9aslIImpv2QmEgdXooqX00LcT9Mc1cj_hkbPKW1AfJEc3XjZoJ_lw2UYRp7iG7vgHI2PzbCu-vKStFAuJa-qnjU8dT5lge_QqEMkkmZQz9j87Ol9AAxpF9WGe84BzgodGw-SSt5376gXVEiAe')`
                }}
              >
                <div className="relative z-10 bg-primary-container/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-surface-container-lowest text-xs font-semibold flex items-center gap-2 shadow-sm">
                  <span className="material-symbols-outlined text-tertiary-fixed text-[16px]">business_center</span>
                  <span>Civil Lines, Raipur Branch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EDITORIAL SECTION: LOAN COMPARISON & LENDER MATRIX SNAPSHOT */}
      <section className="w-full bg-surface-container-low py-16 lg:py-20 border-t border-outline-variant/20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs text-secondary uppercase font-bold tracking-widest">Syndication Network</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-on-surface">Indicative Financing Parameters</h2>
            <p className="text-sm md:text-base text-on-surface-variant">
              Benchmark rates and tenures available across our institutional lending partners in Chhattisgarh.
            </p>
          </div>

          {/* Comparative Bento Matrix */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-surface-container text-xs text-primary-container font-bold">
                  Business Term Loans
                </span>
                <span className="text-secondary text-xs font-bold">Unsecured</span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-on-surface">
                  9.25% <span className="text-xs font-normal text-on-surface-variant">onwards</span>
                </span>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  Up to ₹5 Crore without collateral security. Tenure 12 to 60 months.
                </p>
              </div>
              <div className="pt-2 text-on-surface-variant text-xs space-y-1.5 border-t border-outline-variant/15">
                <div className="flex items-center justify-between">
                  <span>Processing Time:</span>
                  <span className="text-on-surface font-semibold">3-5 Days</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Audited Financials:</span>
                  <span className="text-on-surface font-semibold">Last 2-3 Years</span>
                </div>
              </div>
            </div>

            {/* Card 2 (Featured) */}
            <div className="bg-primary-container text-surface-container-lowest rounded-2xl p-6 shadow-md space-y-4 relative border border-tertiary-fixed/30">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-tertiary-fixed text-primary-container text-xs font-bold">
                  Property Loan / LAP
                </span>
                <span className="text-secondary-fixed text-xs font-bold">Low Interest</span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-white">
                  8.45% <span className="text-xs font-normal text-[#dbe2f9]">onwards</span>
                </span>
                <p className="text-xs text-[#dbe2f9] mt-1.5 leading-relaxed">
                  Up to ₹50 Crore against commercial, residential, or industrial asset pledge.
                </p>
              </div>
              <div className="pt-2 text-[#dbe2f9] text-xs space-y-1.5 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <span>Max Tenure:</span>
                  <span className="text-white font-semibold">Up to 15 Years</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Sanction Ratio:</span>
                  <span className="text-white font-semibold">Up to 75% LTV</span>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-surface-container text-xs text-primary-container font-bold">
                  Working Capital (OD/CC)
                </span>
                <span className="text-secondary text-xs font-bold">Revolving</span>
              </div>
              <div>
                <span className="text-3xl font-extrabold text-on-surface">
                  8.75% <span className="text-xs font-normal text-on-surface-variant">onwards</span>
                </span>
                <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">
                  Flexible drawing limits against inventory, book debts, and work orders.
                </p>
              </div>
              <div className="pt-2 text-on-surface-variant text-xs space-y-1.5 border-t border-outline-variant/15">
                <div className="flex items-center justify-between">
                  <span>Annual Review:</span>
                  <span className="text-on-surface font-semibold">Standard Bank Audit</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Interest Model:</span>
                  <span className="text-on-surface font-semibold">Pay Only On Utilized Capital</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* POST-SUBMISSION MODAL / INLINE SUCCESS STATE SHOWCASE */}
      <section ref={successSectionRef} className="max-w-7xl mx-auto px-4 md:px-8 py-16 w-full">
        <div
          className={`bg-surface-container-lowest rounded-2xl p-8 lg:p-12 shadow-md border border-outline-variant/30 transition-all duration-300 ${
            isSubmitted ? 'ring-2 ring-secondary' : ''
          }`}
        >
          <div className="max-w-2xl mx-auto text-center space-y-6">
            {/* Animated Ring / Success Emblem */}
            <div className="w-20 h-20 mx-auto rounded-full bg-secondary-container/30 flex items-center justify-center text-secondary relative shadow-sm">
              <span className="material-symbols-outlined text-[48px]">check_circle</span>
              <div className="absolute inset-0 rounded-full border-2 border-secondary/20 animate-ping pointer-events-none" />
            </div>

            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold">
                Application Status: Logged in Raipur Registry
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
                Thank You! Your Enquiry Has Been Received
              </h2>
              <p className="text-sm md:text-base text-on-surface-variant leading-relaxed">
                Our senior debt syndication consultant in Raipur will contact you within{' '}
                <strong className="text-on-surface">24 business hours</strong> to benchmark terms across consortium
                banks.
              </p>
            </div>

            {/* Reference Identifier Token Box */}
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl bg-surface-container-low text-on-surface text-sm border border-outline-variant/20">
              <span className="text-on-surface-variant uppercase tracking-wider text-xs font-semibold">
                Application Tracking ID:
              </span>
              <span className="font-mono text-primary-container font-extrabold text-lg select-all">
                {trackingId}
              </span>
              <span className="text-outline/40 hidden sm:inline">|</span>
              <span className="text-secondary flex items-center gap-1 text-xs font-semibold">
                <span className="material-symbols-outlined text-[16px]">lock</span>
                Encrypted File
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-surface-container hover:bg-surface-container-highest text-primary-container text-sm font-semibold transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] mr-2">arrow_back</span>
                Return to Earth Finance Home
              </Link>

              <a
                href={`https://wa.me/919300022732?text=${encodeURIComponent(
                  `Hello Earth Finance, I have submitted enquiry ${trackingId}. Please expedite.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-white hover:bg-secondary/90 px-6 py-3 rounded-xl text-sm font-semibold shadow-sm transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                <span>WhatsApp Fast-Track Desk</span>
              </a>
            </div>

            {/* Direct Consultation Line */}
            <p className="text-outline text-xs pt-2">
              Urgent sanction query? Dial direct:{' '}
              <a className="text-primary-container font-bold hover:underline" href="tel:9300022732">
                9300022732
              </a>{' '}
              (Civil Lines, Raipur)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ApplyPage;
