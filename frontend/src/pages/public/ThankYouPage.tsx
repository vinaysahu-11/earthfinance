import React, { useState, useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import {
  CheckCircle2,
  Copy,
  Check,
  Calendar,
  Home,
  MessageCircle,
  Phone,
  Lock,
  ShieldCheck,
  Clock,
  ArrowRight
} from 'lucide-react';
import { SUPPORT_PHONE, OFFICE_ADDRESS } from '../../config/constants';

export const ThankYouPage: React.FC = () => {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Retrieve state passed from ApplyPage or ContactPage or fall back to defaults
  const stateData = location.state as {
    refNumber?: string;
    domain?: string;
    email?: string;
    name?: string;
  } | null;

  const [refNumber] = useState<string>(() => {
    return (
      stateData?.refNumber ||
      searchParams.get('ref') ||
      `EF-${Math.floor(100000 + Math.random() * 900000)}`
    );
  });

  const [domain] = useState<string>(() => {
    return stateData?.domain || searchParams.get('domain') || 'Commercial Capex';
  });

  const [timestampStr, setTimestampStr] = useState<string>('Today, Just now');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleDateString('en-IN', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
    setTimestampStr(`${formatted}, Just now`);
  }, []);

  const handleCopyRef = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(refNumber).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full bg-[#f9f9ff] min-h-screen text-[#141b2c] pt-24 pb-16 font-['Plus_Jakarta_Sans',sans-serif]">
      <section className="relative w-full overflow-hidden bg-[#f9f9ff] py-12 md:py-16">
        {/* Subtle Ambient Depth Underlays */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[680px] h-[340px] bg-gradient-to-b from-[#e0e8ff]/60 via-[#e9edff]/20 to-transparent blur-3xl" />
          <div className="absolute top-48 -right-24 w-96 h-96 bg-[#8cf6a3]/20 rounded-full blur-2xl" />
          <div className="absolute top-72 -left-20 w-80 h-80 bg-[#dbe2f9]/40 rounded-full blur-2xl" />
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
          {/* Animated Status Indicator */}
          <div className="relative mb-6 flex items-center justify-center">
            <div className="absolute w-28 h-28 rounded-full bg-[#8cf6a3]/40 blur-xl" />
            <div className="absolute w-20 h-20 rounded-full bg-[#8cf6a3]/60 animate-pulse" />
            <div className="relative w-16 h-16 rounded-full bg-[#006d33] flex items-center justify-center shadow-lg text-white">
              <span
                className="material-symbols-outlined text-[34px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
          </div>

          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#8cf6a3]/30 text-[#007235] text-xs font-bold uppercase tracking-wider mb-3 border border-[#8cf6a3]/50">
            <span className="w-2 h-2 rounded-full bg-[#006d33]" />
            <span>Submission Confirmed</span>
          </div>

          {/* Primary Announcement */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#071b3a] text-center tracking-tight max-w-2xl leading-tight">
            Thank You for Reaching Out
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#44474e] text-center max-w-xl leading-relaxed">
            Your enquiry has been successfully submitted. Our team will review your requirement and contact you shortly.
          </p>

          {/* Application Docket Master Box */}
          <div className="w-full max-w-2xl mt-8 bg-white rounded-2xl shadow-md p-6 sm:p-8 md:p-10 relative overflow-hidden border border-slate-200/80">
            {/* Top Multi-Color Accent Stripe */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#071b3a] via-[#4e5e81] to-[#006d33]" />

            {/* Docket Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 bg-[#f1f3ff] px-4 py-3 rounded-xl mb-6 border border-slate-200/60">
              <div className="flex items-center gap-2 text-[#44474e] text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-[18px] text-[#4e5e81]">verified</span>
                <span>Application Docket Registered</span>
              </div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#8cf6a3]/40 text-[#007235] text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#006d33] animate-pulse" />
                Under Initial Review
              </span>
            </div>

            {/* Metrics Breakdown Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
              <div className="p-4 rounded-xl bg-[#f9f9ff] border border-slate-200/60">
                <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Reference No.</p>
                <p className="text-xl font-extrabold text-[#071b3a] font-mono tracking-tight" id="dynamicRef">
                  {refNumber}
                </p>
                <p className="text-xs text-[#44474e] mt-1">Raipur Advisory Hub</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f9f9ff] border border-slate-200/60">
                <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Finance Domain</p>
                <p className="text-base font-bold text-[#141b2c] mt-0.5">{domain}</p>
                <p className="text-xs text-[#44474e] mt-1">Debt Syndication</p>
              </div>

              <div className="p-4 rounded-xl bg-[#f9f9ff] border border-slate-200/60">
                <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold mb-1">Logged Timestamp</p>
                <p className="text-base font-bold text-[#141b2c] mt-0.5">{timestampStr}</p>
                <p className="text-xs text-[#44474e] mt-1">Secure RBI Compliant Gateway</p>
              </div>
            </div>

            {/* Notification Bar & Copy Action */}
            <div className="mt-5 pt-3 bg-[#f1f3ff]/70 px-4 py-2.5 rounded-xl flex items-center justify-between flex-wrap gap-2 border border-slate-200/60">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#4e5e81] text-[18px]">mark_email_read</span>
                <span className="text-xs text-[#141b2c]">
                  Acknowledgment copy dispatched to your registered email address
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyRef}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#071b3a] hover:text-[#1455A0] transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {copied ? 'check' : 'content_copy'}
                </span>
                <span>{copied ? 'Copied!' : 'Copy Ref'}</span>
              </button>
            </div>
          </div>

          {/* What Happens Next? Process Bento */}
          <div className="w-full max-w-4xl mt-12">
            <div className="text-center mb-8">
              <p className="text-xs uppercase tracking-widest text-[#4e5e81] font-bold">Transparent Process</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071b3a] mt-1">What Happens Next?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Step 1 */}
              <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/80">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-extrabold text-[#e0e8ff] group-hover:text-[#b5c7ee] transition-colors leading-none">
                      01
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#f1f3ff] flex items-center justify-center text-[#071b3a]">
                      <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#071b3a] mb-2">Requirement Review</h3>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    Initial eligibility &amp; preliminary underwriting assessment by our credit analysis cell.
                  </p>
                </div>
                <div className="mt-5 pt-2.5 bg-[#f1f3ff]/50 rounded-lg px-3 py-1.5 border border-slate-100">
                  <span className="text-xs font-semibold text-[#4e5e81]">SLA: Within 2 Hours</span>
                </div>
              </div>

              {/* Step 2 */}
              <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/80">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-extrabold text-[#e0e8ff] group-hover:text-[#b5c7ee] transition-colors leading-none">
                      02
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#f1f3ff] flex items-center justify-center text-[#071b3a]">
                      <span className="material-symbols-outlined text-[20px]">support_agent</span>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#071b3a] mb-2">Direct Officer Contact</h3>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    A senior syndication officer connects with you within business hours to discuss bespoke terms.
                  </p>
                </div>
                <div className="mt-5 pt-2.5 bg-[#f1f3ff]/50 rounded-lg px-3 py-1.5 border border-slate-100">
                  <span className="text-xs font-semibold text-[#4e5e81]">Direct Call from Raipur Desk</span>
                </div>
              </div>

              {/* Step 3 */}
              <div className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/80">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl font-extrabold text-[#e0e8ff] group-hover:text-[#b5c7ee] transition-colors leading-none">
                      03
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-[#f1f3ff] flex items-center justify-center text-[#071b3a]">
                      <span className="material-symbols-outlined text-[20px]">account_balance</span>
                    </div>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-[#071b3a] mb-2">Multi-Bank Guidance</h3>
                  <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                    Structured comparison across banking partners and clear documentation assistance to sanction.
                  </p>
                </div>
                <div className="mt-5 pt-2.5 bg-[#f1f3ff]/50 rounded-lg px-3 py-1.5 border border-slate-100">
                  <span className="text-xs font-semibold text-[#4e5e81]">35+ Banking Institutions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="w-full max-w-3xl mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-[#ffdf94] text-[#241a00] hover:bg-[#efc13e] shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
            >
              <span className="material-symbols-outlined text-[18px]">home</span>
              <span>Back to Home</span>
            </Link>

            <Link
              to="/appointment"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-white text-[#071b3a] hover:bg-slate-50 shadow-sm border border-slate-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">calendar_month</span>
              <span>Book a Consultation</span>
            </Link>

            <a
              href={`https://wa.me/91${SUPPORT_PHONE.replace(/[^0-9]/g, '')}`}
              rel="noopener noreferrer"
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-[#006d33] text-white hover:bg-[#005224] shadow-sm transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>WhatsApp Us</span>
            </a>
          </div>

          {/* Urgent Support Box */}
          <div className="mt-10 p-4 rounded-xl bg-[#f1f3ff] text-center max-w-xl border border-slate-200/60">
            <p className="text-xs text-[#44474e]">
              Need urgent assistance regarding your submitted application?
            </p>
            <div className="mt-1.5 flex items-center justify-center gap-2 text-xs font-semibold text-[#071b3a] flex-wrap">
              <span className="material-symbols-outlined text-[#006d33] text-[18px]">phone_in_talk</span>
              <span>Call directly:</span>
              <a
                className="font-bold text-[#071b3a] hover:text-[#1455A0] underline transition-colors"
                href={`tel:${SUPPORT_PHONE.replace(/[^0-9]/g, '')}`}
              >
                {SUPPORT_PHONE}
              </a>
              <span className="text-slate-400">|</span>
              <span className="text-[#44474e] font-normal">Mon–Sat, 10 AM – 7 PM</span>
            </div>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 flex items-center justify-center gap-6 text-slate-500 text-xs font-medium flex-wrap">
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#006d33]">lock</span>
              256-Bit Encrypted Data
            </span>
            <span className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-[#006d33]">verified_user</span>
              Zero Advance Processing Fees
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
