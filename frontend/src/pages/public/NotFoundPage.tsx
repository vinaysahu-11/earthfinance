import React from 'react';
import { Link } from 'react-router-dom';
import {
  Home,
  ArrowRight,
  Phone,
  Compass,
  Building,
  Landmark,
  Headphones,
  ChevronRight,
  Calculator,
  HelpCircle,
  Calendar
} from 'lucide-react';
import { SUPPORT_PHONE, OFFICE_ADDRESS } from '../../config/constants';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full bg-[#f9f9ff] min-h-screen text-[#141b2c] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Hero Section: Deep Celestial Navy */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#071b3a] via-[#0b2347] to-[#071b3a] text-white pt-32 pb-20 lg:pt-36 lg:pb-28 px-4 sm:px-6 lg:px-8">
        {/* Subtle Constellation / Radial Grid SVG Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <svg
            className="w-full h-full text-white/40"
            fill="none"
            viewBox="0 0 1440 800"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="720" cy="400" r="540" stroke="currentColor" strokeDasharray="6 6" strokeWidth="1" />
            <circle cx="720" cy="400" r="380" stroke="currentColor" strokeWidth="1" />
            <circle cx="720" cy="400" r="220" stroke="currentColor" strokeDasharray="4 8" strokeWidth="1.2" />
            <path d="M120 400 H 1320" stroke="currentColor" strokeWidth="0.8" />
            <path d="M720 40 V 760" stroke="currentColor" strokeWidth="0.8" />
            <path d="M280 180 L 1160 620" stroke="currentColor" strokeDasharray="2 4" strokeWidth="0.6" />
            <path d="M280 620 L 1160 180" stroke="currentColor" strokeDasharray="2 4" strokeWidth="0.6" />
            <circle cx="720" cy="400" fill="#ffdf94" r="6" />
            <circle cx="940" cy="400" fill="#8ff9a6" r="4" />
            <circle cx="500" cy="400" fill="#b5c7ee" r="4" />
            <circle cx="720" cy="180" fill="#ffdf94" r="4" />
            <circle cx="720" cy="620" fill="#b5c7ee" r="4" />
          </svg>
        </div>

        {/* Ambient Glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-[#4e5e81]/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#ffdf94]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto flex flex-col items-center text-center z-10">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md shadow-sm mb-6 border border-white/10">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffdf94] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#ffdf94]" />
            </span>
            <span className="text-xs uppercase tracking-widest text-[#ffdf94] font-bold">
              404 Error • Resource Uncharted
            </span>
          </div>

          {/* Huge 404 Display */}
          <div className="relative flex items-center justify-center select-none py-2">
            <span className="text-[110px] sm:text-[160px] lg:text-[210px] leading-none font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-[#e0e8ff] to-[#ffdf94] opacity-95 drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-48 sm:w-64 h-24 sm:h-32 bg-gradient-to-r from-transparent via-[#ffdf94]/20 to-transparent blur-xl" />
            </div>
          </div>

          {/* Heading & Lede */}
          <div className="space-y-3 max-w-2xl mt-2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Page Not Found
            </h1>
            <p className="text-base sm:text-lg text-[#dbe2f9] font-normal leading-relaxed">
              The requested institutional route has moved, matured, or does not exist within our secure directory.
              Re-route your advisory journey below or consult our institutional team in Raipur.
            </p>
          </div>

          {/* Action Row */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-[#ffdf94] text-[#241a00] hover:bg-[#efc13e] shadow-lg shadow-[#ffdf94]/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span className="material-symbols-outlined text-[20px]">home</span>
              <span>Back to Home</span>
            </Link>

            <Link
              to="/loans"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-white/10 hover:bg-white/20 text-white backdrop-blur-md shadow-sm border border-white/10 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Explore Loans &amp; Solutions</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>

            <a
              href={`tel:${SUPPORT_PHONE.replace(/[^0-9]/g, '')}`}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-semibold text-[#dbe2f9] hover:text-[#ffdf94] transition-colors"
            >
              <span className="material-symbols-outlined text-[18px] text-[#ffdf94]">call</span>
              <span>Direct Desk: {SUPPORT_PHONE}</span>
            </a>
          </div>

          {/* Popular Destinations Quick Bar */}
          <div className="mt-10 w-full max-w-3xl pt-4">
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-4 border border-white/10">
              <div className="flex items-center gap-2 text-left shrink-0">
                <span className="material-symbols-outlined text-[#8ff9a6] text-[22px]">explore</span>
                <span className="text-xs sm:text-sm text-white font-bold tracking-wide">Popular Destinations</span>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-2 w-full">
                <Link
                  to="/loans"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all hover:text-[#ffdf94]"
                >
                  Business Loan
                </Link>
                <Link
                  to="/loans"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all hover:text-[#ffdf94]"
                >
                  Property &amp; LAP
                </Link>
                <Link
                  to="/emi-calculator"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all hover:text-[#ffdf94]"
                >
                  EMI Calculator
                </Link>
                <Link
                  to="/faq"
                  className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all hover:text-[#ffdf94]"
                >
                  FAQs &amp; Advisory
                </Link>
                <Link
                  to="/appointment"
                  className="px-3.5 py-1.5 rounded-lg bg-[#8ff9a6] text-[#00210b] text-xs font-bold shadow-sm hover:brightness-105 transition-all"
                >
                  Book Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Consulted Portals Section */}
      <section className="w-full bg-[#f1f3ff] py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071b3a]">Frequently Consulted Portals</h2>
            <p className="text-xs sm:text-sm text-[#44474e] mt-1.5">
              Jump directly into Raipur's verified debt syndication and retail capital products.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/80">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[26px]">account_balance</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#141b2c]">Corporate Working Capital</h3>
                <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                  Structured Cash Credit (CC), Overdraft (OD), and Letter of Credit arrangements with top public and
                  private consortiums.
                </p>
              </div>
              <Link
                to="/loans"
                className="inline-flex items-center gap-1.5 text-[#071b3a] text-xs font-bold mt-6 hover:text-[#1455A0] transition-colors"
              >
                <span>Learn Requirements</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            </div>

            {/* Card 2 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/80">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[26px]">domain</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#141b2c]">Loan Against Property</h3>
                <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                  Monetize residential, industrial or commercial titles in Chhattisgarh with long tenures and
                  ultra-competitive institutional interest brackets.
                </p>
              </div>
              <Link
                to="/loans"
                className="inline-flex items-center gap-1.5 text-[#071b3a] text-xs font-bold mt-6 hover:text-[#1455A0] transition-colors"
              >
                <span>Check Eligibility</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            </div>

            {/* Card 3 */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/80">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-xl bg-[#e0e8ff] flex items-center justify-center text-[#071b3a]">
                  <span className="material-symbols-outlined text-[26px]">support_agent</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold text-[#141b2c]">Raipur Head Office Advisory</h3>
                <p className="text-xs sm:text-sm text-[#44474e] leading-relaxed">
                  Direct one-on-one portfolio review at Ekatam Parisar, Rajbandha Maidan. Coordinate with senior chartered
                  syndication associates.
                </p>
              </div>
              <Link
                to="/contact"
                className="inline-flex items-center gap-1.5 text-[#071b3a] text-xs font-bold mt-6 hover:text-[#1455A0] transition-colors"
              >
                <span>Get Office Directions</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
