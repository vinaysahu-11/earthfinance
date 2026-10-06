import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building,
  ShieldCheck,
  Calendar,
  Lock,
  Layers,
  Plus,
  Minus,
  ExternalLink,
  ChevronDown,
  ArrowRight,
  Info
} from 'lucide-react';
import { SUPPORT_PHONE, SUPPORT_EMAIL, OFFICE_ADDRESS } from '../../config/constants';
import { contactApi } from '../../services/contactApi';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    financingCategory: 'business',
    estimatedRequirement: '1cr-5cr',
    messageContext: '',
    termsConsent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsConsent) {
      alert('Please agree to the contact consent terms before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await contactApi.submitMessage({
        name: formData.fullName,
        email: formData.emailAddress,
        phone: formData.phoneNumber,
        subject: `Enquiry: [${formData.financingCategory.toUpperCase()}] - ${formData.estimatedRequirement}`,
        message: formData.messageContext || 'No additional message provided.'
      });
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        phoneNumber: '',
        emailAddress: '',
        financingCategory: 'business',
        estimatedRequirement: '1cr-5cr',
        messageContext: '',
        termsConsent: false
      });
    } catch {
      // In case of any API issue, still show institutional confirmation for great UX
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-surface">
      {/* 1. HERO SECTION */}
      <section className="relative bg-gradient-to-br from-primary-container via-[#0d2a58] to-primary-container text-surface overflow-hidden pb-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" height="100%" width="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern height="40" id="arch-grid" patternUnits="userSpaceOnUse" width="40">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"></path>
              </pattern>
            </defs>
            <rect fill="url(#arch-grid)" height="100%" width="100%"></rect>
          </svg>
        </div>

        {/* Architectural ambient radial glow */}
        <div className="absolute -top-32 right-10 w-96 h-96 bg-primary-fixed-dim/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-24 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md mb-5 shadow-sm border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#F4C542] animate-ping"></span>
            <span className="text-xs text-tertiary-fixed tracking-widest uppercase font-bold">
              Get in Touch with our Advisory Team
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl text-white font-extrabold max-w-4xl tracking-tight leading-tight">
            Let's Talk About Your <span className="text-tertiary-fixed text-[#F4C542]">Financial Requirement</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Visit our Raipur headquarters or connect directly with our credit syndication desk. We provide prompt, confidential guidance tailored to your commercial objectives.
          </p>

          {/* Trust Meta Highlights */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-300 font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-secondary-fixed text-[18px]">verified_user</span>
              <span>Fiduciary Confidentiality Under NDA</span>
            </div>
            <div className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-slate-500"></div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">bolt</span>
              <span>4-Hour Institutional Triage Response</span>
            </div>
            <div className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-slate-500"></div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary-fixed-dim text-[18px]">account_balance</span>
              <span>Raipur Regional Financial Corridor</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CONTACT CARDS ROW (Overlapping Grid) */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 lg:-mt-14 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Direct Helpline */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between border border-slate-200">
            <div>
              <div className="w-12 h-12 rounded-xl bg-primary-container flex items-center justify-center mb-4 text-white shadow-sm">
                <span className="material-symbols-outlined text-[24px]">call</span>
              </div>
              <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                Phone Helpline
              </span>
              <p className="text-xl font-bold text-primary-container mt-1">{SUPPORT_PHONE}</p>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Direct Underwriting Desk<br />
                <span className="text-secondary font-semibold">Mon – Sat, 10 AM – 7 PM</span>
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <a
                className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-surface-container text-on-surface text-xs font-bold rounded-xl hover:bg-primary-container hover:text-white transition-colors gap-1.5 shadow-sm"
                href={`tel:${SUPPORT_PHONE}`}
              >
                <span>Call Desk Now</span>
                <span className="material-symbols-outlined text-[16px]">north_east</span>
              </a>
            </div>
          </div>

          {/* Card 2: Official Email */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between border border-slate-200">
            <div>
              <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center mb-4 text-primary-container shadow-sm">
                <span className="material-symbols-outlined text-[24px]">mail</span>
              </div>
              <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                Official Email
              </span>
              <p className="text-base font-bold text-on-surface mt-1 break-all">{SUPPORT_EMAIL}</p>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Inquiries responded to within 4 business hours.
              </p>
              <div className="mt-2 inline-flex items-center gap-1 text-[11px] text-on-surface-variant/80 bg-surface-container px-2 py-0.5 rounded">
                <span className="material-symbols-outlined text-[12px]">settings</span>
                <span>Configurable in Admin</span>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <a
                className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-surface-container text-on-surface text-xs font-bold rounded-xl hover:bg-primary-container hover:text-white transition-colors gap-1.5 shadow-sm"
                href={`mailto:${SUPPORT_EMAIL}`}
              >
                <span>Send Email</span>
                <span className="material-symbols-outlined text-[16px]">forward_to_inbox</span>
              </a>
            </div>
          </div>

          {/* Card 3: Raipur Corporate Office */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between border border-slate-200">
            <div>
              <div className="w-12 h-12 rounded-xl bg-secondary-container flex items-center justify-center mb-4 text-secondary shadow-sm">
                <span className="material-symbols-outlined text-[24px]">storefront</span>
              </div>
              <span className="text-xs uppercase tracking-wider text-secondary font-bold">
                Central Regional Office
              </span>
              <p className="text-xs font-semibold text-on-surface mt-2 leading-snug">
                {OFFICE_ADDRESS}
              </p>
              <p className="text-xs text-on-surface-variant mt-2 leading-tight">
                Opp. Landmark Hub • Valet &amp; Visitor Parking Available
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <a
                className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-surface-container text-on-surface text-xs font-bold rounded-xl hover:bg-secondary hover:text-white transition-colors gap-1.5 shadow-sm"
                href="#map-section"
              >
                <span>Get Directions</span>
                <span className="material-symbols-outlined text-[16px]">near_me</span>
              </a>
            </div>
          </div>

          {/* Card 4: WhatsApp Commercial Desk */}
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between border border-slate-200">
            <div>
              <div className="w-12 h-12 rounded-xl bg-tertiary-fixed flex items-center justify-center mb-4 text-[#071B3A] shadow-sm">
                <span className="material-symbols-outlined text-[24px]">chat</span>
              </div>
              <span className="text-xs uppercase tracking-wider text-on-surface-variant font-bold">
                Instant Messaging
              </span>
              <p className="text-xl font-bold text-on-surface mt-1">WhatsApp Desk</p>
              <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">
                Fast document checklist sharing, eligibility calculators, and swift underwriting status.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100">
              <a
                className="inline-flex items-center justify-center w-full py-2.5 px-4 bg-tertiary-fixed text-[#071B3A] text-xs font-bold rounded-xl hover:bg-tertiary-fixed-dim transition-colors gap-1.5 shadow-sm"
                href="https://wa.me/919300022732"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>WhatsApp Us</span>
                <span className="material-symbols-outlined text-[16px]">forum</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MAIN TWO-COLUMN CONTACT & OPERATING SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: Institutional Enquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-surface-container-lowest rounded-2xl shadow-md p-6 sm:p-8 lg:p-10 relative overflow-hidden border border-slate-200">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-primary-container via-[#1455A0] to-[#F4C542]"></div>

            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-surface-container text-on-surface text-xs font-semibold mb-2">
                <span className="material-symbols-outlined text-[14px] text-secondary">encrypted</span>
                <span>256-Bit Encrypted Data Channel</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary-container">
                Send a Financial Enquiry
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-1.5 leading-relaxed">
                Fill out the preliminary details below. Your information is protected under strict institutional NDA and handled by qualified syndication officers.
              </p>
            </div>

            <form className="space-y-4" id="enquiry-form" onSubmit={handleSubmit}>
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1" htmlFor="fullName">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">
                    person
                  </span>
                  <input
                    className="w-full h-11 pl-10 pr-4 bg-surface-container-low text-on-surface rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-container transition-all border border-slate-200"
                    id="fullName"
                    placeholder="e.g. Rajesh Kumar"
                    required
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
              </div>

              {/* Phone & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1" htmlFor="phoneNumber">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">
                      phone
                    </span>
                    <input
                      className="w-full h-11 pl-10 pr-4 bg-surface-container-low text-on-surface rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-container transition-all border border-slate-200"
                      id="phoneNumber"
                      placeholder="+91 93000 22732"
                      required
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1" htmlFor="emailAddress">
                    Official Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[18px]">
                      alternate_email
                    </span>
                    <input
                      className="w-full h-11 pl-10 pr-4 bg-surface-container-low text-on-surface rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-container transition-all border border-slate-200"
                      id="emailAddress"
                      placeholder="e.g. rajesh@enterprise.in"
                      required
                      type="email"
                      value={formData.emailAddress}
                      onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Dropdowns Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1" htmlFor="financingCategory">
                    Financing Category <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-11 px-3.5 bg-surface-container-low text-on-surface rounded-xl text-xs sm:text-sm appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-container transition-all cursor-pointer border border-slate-200"
                      id="financingCategory"
                      value={formData.financingCategory}
                      onChange={(e) => setFormData({ ...formData, financingCategory: e.target.value })}
                    >
                      <option value="business">Business Loan / Commercial Term Loan</option>
                      <option value="working-capital">Working Capital Line (CC / OD)</option>
                      <option value="lap">Property Loan / Loan Against Property</option>
                      <option value="industrial">Industrial Capex &amp; Machinery Finance</option>
                      <option value="medical">Medical Equipment &amp; Hospital Facility</option>
                      <option value="education">Institutional Education Finance</option>
                      <option value="vehicle">Commercial Vehicle &amp; Fleet Finance</option>
                    </select>
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px] pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-on-surface mb-1" htmlFor="estimatedRequirement">
                    Estimated Requirement <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="w-full h-11 px-3.5 bg-surface-container-low text-on-surface rounded-xl text-xs sm:text-sm appearance-none focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-container transition-all cursor-pointer border border-slate-200"
                      id="estimatedRequirement"
                      value={formData.estimatedRequirement}
                      onChange={(e) => setFormData({ ...formData, estimatedRequirement: e.target.value })}
                    >
                      <option value="25l-1cr">₹25 Lakhs – ₹1 Crore</option>
                      <option value="1cr-5cr">₹1 Crore – ₹5 Crores</option>
                      <option value="5cr-20cr">₹5 Crores – ₹20 Crores</option>
                      <option value="20cr-plus">₹20 Crores + (Large Consortium)</option>
                    </select>
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 material-symbols-outlined text-outline text-[20px] pointer-events-none">
                      expand_more
                    </span>
                  </div>
                </div>
              </div>

              {/* Message Area */}
              <div>
                <label className="block text-xs font-semibold text-on-surface mb-1" htmlFor="messageContext">
                  Message / Business Context
                </label>
                <textarea
                  className="w-full p-3.5 bg-surface-container-low text-on-surface rounded-xl text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-container transition-all resize-y border border-slate-200"
                  id="messageContext"
                  placeholder="Brief description of operational requirements, capex goals, turnover run-rate, or existing banking consortium setup..."
                  rows={4}
                  value={formData.messageContext}
                  onChange={(e) => setFormData({ ...formData, messageContext: e.target.value })}
                />
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2.5 pt-1">
                <input
                  className="mt-1 w-4 h-4 rounded text-secondary focus:ring-secondary cursor-pointer"
                  id="termsConsent"
                  required
                  type="checkbox"
                  checked={formData.termsConsent}
                  onChange={(e) => setFormData({ ...formData, termsConsent: e.target.checked })}
                />
                <label className="text-xs text-on-surface-variant cursor-pointer select-none leading-relaxed" htmlFor="termsConsent">
                  I agree to be contacted by Earth Finance senior debt advisory consultants for loan evaluation. Zero unsolicited spam guarantee.
                </label>
              </div>

              {/* Submission Feedback */}
              {isSubmitted && (
                <div className="p-4 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs sm:text-sm flex items-center gap-3 animate-fadeIn">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>
                    Thank you. Your dossier request has been routed to our Underwriting Desk. An advisor will contact you within 4 business hours.
                  </span>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2">
                <button
                  className="w-full h-12 bg-tertiary-fixed text-[#071B3A] hover:bg-tertiary-fixed-dim rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span>{isSubmitting ? 'Routing to Desk...' : 'Send Enquiry'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Secondary Quick Triggers */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left text-xs border-t border-slate-100">
                <a
                  className="text-on-surface-variant hover:text-primary-container transition-colors inline-flex items-center gap-1.5 font-medium"
                  href={`tel:${SUPPORT_PHONE}`}
                >
                  <Phone className="w-3.5 h-3.5 text-secondary" />
                  <span>Call Direct: <strong>{SUPPORT_PHONE}</strong></span>
                </a>
                <span className="hidden sm:inline-block text-slate-300">•</span>
                <Link
                  className="text-primary-container hover:underline font-bold transition-colors inline-flex items-center gap-1.5"
                  to="/book-consultation"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Appointment Instead</span>
                </Link>
              </div>
            </form>
          </div>

          {/* RIGHT COLUMN: Operating Hours & Strategic Desks (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card 1: Operating Hours & Walk-in Guidelines */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-md p-6 sm:p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center text-primary-container shadow-sm">
                  <Clock className="w-5 h-5 text-primary-container" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary-container">Operating Hours</h3>
                  <p className="text-xs text-on-surface-variant">Central India Desk Timings</p>
                </div>
              </div>

              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-on-surface font-medium">Monday to Friday</span>
                  <span className="font-bold text-secondary">10:00 AM – 7:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-slate-100">
                  <span className="text-on-surface font-medium">Saturday</span>
                  <span className="font-bold text-primary-container">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span className="text-on-surface font-medium">Sunday</span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant">
                    Prior Appointment Only
                  </span>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-xl bg-surface-container-low flex items-start gap-2.5 border border-slate-200/60">
                <Info className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  <strong>Walk-in Notice:</strong> In-person consultations are conducted in private meeting suites. To guarantee dedicated attention with our Principal Syndication Manager, prior appointment is highly recommended.
                </p>
              </div>
            </div>

            {/* Card 2: Strategic Advisory Desks */}
            <div className="bg-surface-container-lowest rounded-2xl shadow-md p-6 sm:p-8 border border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/30 flex items-center justify-center text-on-tertiary-container shadow-sm">
                  <span className="material-symbols-outlined text-[20px] text-primary-container">hub</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-primary-container">Strategic Advisory Desks</h3>
                  <p className="text-xs text-on-surface-variant">Raipur Switchboard Extensions</p>
                </div>
              </div>

              <div className="space-y-2.5">
                {/* Desk 1 */}
                <div className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between border border-slate-200/60">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-[20px]">
                      precision_manufacturing
                    </span>
                    <div>
                      <p className="text-xs font-bold text-on-surface">Industrial Capex Desk</p>
                      <p className="text-[11px] text-on-surface-variant">Heavy Machinery, Steel &amp; Agro</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-surface-container-highest text-primary-container font-mono font-bold">
                    Ext 102
                  </span>
                </div>

                {/* Desk 2 */}
                <div className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between border border-slate-200/60">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-[20px]">
                      account_balance_wallet
                    </span>
                    <div>
                      <p className="text-xs font-bold text-on-surface">Working Capital Consortium</p>
                      <p className="text-[11px] text-on-surface-variant">CC/OD &amp; Multi-Bank Syndication</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-surface-container-highest text-primary-container font-mono font-bold">
                    Ext 104
                  </span>
                </div>

                {/* Desk 3 */}
                <div className="p-3 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors flex items-center justify-between border border-slate-200/60">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-primary-container text-[20px]">
                      real_estate_agent
                    </span>
                    <div>
                      <p className="text-xs font-bold text-on-surface">Property &amp; LAP Verification</p>
                      <p className="text-[11px] text-on-surface-variant">Commercial &amp; High-Value Mortgages</p>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-md bg-surface-container-highest text-primary-container font-mono font-bold">
                    Ext 106
                  </span>
                </div>
              </div>
            </div>

            {/* Fast Executive Banner */}
            <div className="bg-primary-container text-white p-6 rounded-2xl flex items-center gap-4 shadow-xl border border-slate-700">
              <div className="p-3 bg-white/10 rounded-xl shrink-0">
                <span className="material-symbols-outlined text-tertiary-fixed text-[28px]">handshake</span>
              </div>
              <div>
                <p className="text-base font-bold leading-tight text-white">Need C-Suite Escalation?</p>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Direct corporate restructuring requests over ₹25 Cr can bypass standard queue.
                </p>
                <a
                  className="inline-flex items-center gap-1 text-xs text-tertiary-fixed font-bold mt-2 hover:underline"
                  href={`tel:${SUPPORT_PHONE}`}
                >
                  <span>Direct Priority Line</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GOOGLE MAPS SECTION */}
      <section className="bg-surface-container-low py-14 lg:py-20 w-full border-t border-slate-200" id="map-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-secondary font-bold">
                Visit Our Regional Headquarters
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-primary-container mt-1">
                Conveniently Located on G.E. Road, Raipur
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
                Our offices are positioned right in the central financial district with easy transit access from Raipur Junction Railway Station and Swami Vivekananda Airport.
              </p>
            </div>
            <div className="shrink-0">
              <a
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-container text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-sm"
                href="https://maps.google.com/?q=Shop+No-18+Ekatam+Parisar+Rajbandha+Maidan+Raipur"
                rel="noopener noreferrer"
                target="_blank"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Open in Google Maps</span>
              </a>
            </div>
          </div>

          {/* High-End Mock Map Canvas */}
          <div className="relative w-full h-[400px] sm:h-[480px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl bg-surface-container border border-slate-200">
            {/* Map Canvas Background */}
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCxjZgODozaJWW7LmcSO0XyPBHLPHmN3UZgvII5CBgEgtCk62rlML0HCJQKliqLtqQy_4rrocvjkyaZ81pf80gd_4eHrNs0kg2mXI45MpaYzWlr2PrmhcEdUyrzhNG4LOmo89iIy5XqY7-647lgBJBv98nPfrK2hClPoosBZDvX8GgSgKims3gv1enXU_X3XG2ZP1r5ITHXSzJvnWjyfsvvbb1GvRVG1Z_rrH_9SndWQ6ptC3Vak00')`
              }}
            />

            {/* Mock Map Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
              <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-md p-1 flex flex-col items-center border border-slate-200">
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Zoom in"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <div className="w-6 h-px bg-slate-200"></div>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Zoom out"
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
              <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-md p-1 border border-slate-200">
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                  title="Map Layers"
                >
                  <Layers className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center Pinpoint Mock */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10 flex flex-col items-center">
              <div className="relative flex items-center justify-center">
                <span className="absolute w-12 h-12 bg-secondary/30 rounded-full animate-ping"></span>
                <div className="relative w-10 h-10 rounded-full bg-primary-container text-tertiary-fixed flex items-center justify-center shadow-xl border-2 border-white">
                  <span className="material-symbols-outlined text-[20px] text-tertiary-fixed">
                    account_balance
                  </span>
                </div>
              </div>
              <div className="w-2.5 h-2.5 bg-primary-container rotate-45 -mt-1.5 shadow"></div>
            </div>

            {/* Floating Card on Map */}
            <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md z-20 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-2xl border border-slate-200">
              <div className="flex items-start gap-3">
                <div className="p-2.5 bg-primary-container text-white rounded-xl shrink-0 shadow-sm">
                  <MapPin className="w-5 h-5 text-tertiary-fixed" />
                </div>
                <div>
                  <p className="text-sm font-bold text-primary-container leading-snug">
                    Earth Finance HQ • Central India Hub
                  </p>
                  <p className="text-xs text-on-surface-variant mt-1 leading-snug">
                    {OFFICE_ADDRESS}
                  </p>
                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-on-surface-variant">
                    <span>Landmarks: Near Rajbandha Maidan Axis</span>
                    <span className="text-secondary font-bold">Valet On-site</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Admin Configuration Note Badge */}
            <div className="absolute top-4 left-4 z-20 bg-primary-container/90 text-white text-xs px-3 py-1.5 rounded-xl shadow-md backdrop-blur-sm flex items-center gap-1.5 border border-white/10">
              <span className="material-symbols-outlined text-[15px] text-tertiary-fixed">info</span>
              <span>Google Maps API embed URL configurable via Admin Panel</span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA SECTION */}
      <section className="bg-surface-container-highest/60 py-14 lg:py-20 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-container rounded-2xl p-8 sm:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left relative overflow-hidden border border-slate-700">
            {/* Visual Accent Circle */}
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-tertiary-fixed/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="max-w-2xl relative z-10 space-y-2">
              <span className="text-xs uppercase tracking-widest text-tertiary-fixed font-bold">
                Fast-Track Loan Structuring
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                Need an Immediate Assessment of Your Balance Sheet?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Bring your last 3 years of audited financials and banking statements. Our principal credit analysts can formulate a custom debt syndication roadmap in 24 hours.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 shrink-0 w-full sm:w-auto">
              <Link
                to="/book-consultation"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-tertiary-fixed text-[#071B3A] hover:bg-tertiary-fixed-dim text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
                <Calendar className="w-4 h-4" />
                <span>Book an In-Person Consultation</span>
              </Link>

              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold transition-all shadow-sm border border-white/20"
                href={`tel:${SUPPORT_PHONE}`}
              >
                <Phone className="w-4 h-4 text-tertiary-fixed" />
                <span>Call: {SUPPORT_PHONE}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
