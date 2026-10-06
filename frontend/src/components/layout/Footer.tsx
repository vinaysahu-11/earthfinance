import React from 'react';
import { Link } from 'react-router-dom';
import { SUPPORT_PHONE, OFFICE_ADDRESS, DISCLAIMER_TEXT } from '../../config/constants';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-primary-container text-surface-container-high border-t-4 border-tertiary-fixed">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-10 border-b border-slate-700/60">
          {/* Brand Info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <img
                alt="Earth Finance Logo"
                className="h-10 w-auto object-contain"
                src="/earth-finance-logo.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida/AEtjO1V2PyoUYvToFwDny0ipn_46x1Xxiiy_gFQvLVcKYV91RnhGjr_yqg0KCW79Fy7-SRgJ7HfxGbE571KUOSXztQysxObH-mOFY1bWeOjPDR6SbKqDknAfonsxS-frWiPGhSsJPHuDFMB3VD4FcB_vH9g1e3Ix5hNHa4P9qpGmc3zSKzNqXSdsQVLvZMm7kvYjkhVRDsJ0vTrMlpP2i8NPQ-Rkz2P8iVTQtTy6DY99N0pObGpIfbmPkwQTW7g";
                }}
              />
              <span className="font-bold text-xl text-surface-container-lowest tracking-tight">
                EARTH FINANCE
              </span>
            </div>
            <p className="text-xs text-on-primary-container leading-relaxed">
              Premier financial solutions and advisory partner for businesses, enterprises, and individuals across India.
            </p>
            <div className="space-y-2 text-xs text-surface-container-high">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">call</span>
                <a href={`tel:${SUPPORT_PHONE}`} className="hover:text-tertiary-fixed transition-colors font-medium">
                  {SUPPORT_PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary-fixed text-[18px]">location_on</span>
                <span>{OFFICE_ADDRESS}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <a
                href="#hq"
                aria-label="Corporate Headquarters"
                className="w-8 h-8 rounded-lg bg-surface-container-high/10 hover:bg-surface-container-high/20 flex items-center justify-center text-tertiary-fixed transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">domain</span>
              </a>
              <Link
                to="/"
                aria-label="Official Portal"
                className="w-8 h-8 rounded-lg bg-surface-container-high/10 hover:bg-surface-container-high/20 flex items-center justify-center text-tertiary-fixed transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">public</span>
              </Link>
              <Link
                to="/appointment"
                aria-label="Investor Support"
                className="w-8 h-8 rounded-lg bg-surface-container-high/10 hover:bg-surface-container-high/20 flex items-center justify-center text-tertiary-fixed transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">handshake</span>
              </Link>
            </div>
          </div>

          {/* Loans Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-base text-surface-container-lowest">Loans</h4>
            <ul className="space-y-2 text-xs text-on-primary-container">
              <li>
                <Link to="/loans" className="hover:text-tertiary-fixed transition-colors">
                  Business Loan
                </Link>
              </li>
              <li>
                <Link to="/loans" className="hover:text-tertiary-fixed transition-colors">
                  Working Capital
                </Link>
              </li>
              <li>
                <Link to="/loans" className="hover:text-tertiary-fixed transition-colors">
                  Property Loan / LAP
                </Link>
              </li>
              <li>
                <Link to="/loans" className="hover:text-tertiary-fixed transition-colors">
                  Industrial Finance
                </Link>
              </li>
              <li>
                <Link to="/loans" className="hover:text-tertiary-fixed transition-colors">
                  Medical Finance
                </Link>
              </li>
              <li>
                <Link to="/loans" className="hover:text-tertiary-fixed transition-colors">
                  Personal & Vehicle Loans
                </Link>
              </li>
            </ul>
          </div>

          {/* Industries Column */}
          <div className="space-y-3">
            <h4 className="font-bold text-base text-surface-container-lowest">Industries</h4>
            <ul className="space-y-2 text-xs text-on-primary-container">
              <li>
                <Link to="/industries/manufacturing" className="hover:text-tertiary-fixed transition-colors">
                  Manufacturing
                </Link>
              </li>
              <li>
                <Link to="/industries/healthcare" className="hover:text-tertiary-fixed transition-colors">
                  Healthcare & Pharma
                </Link>
              </li>
              <li>
                <Link to="/industries/education" className="hover:text-tertiary-fixed transition-colors">
                  Education
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-tertiary-fixed transition-colors">
                  Food Processing
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-tertiary-fixed transition-colors">
                  Engineering
                </Link>
              </li>
              <li>
                <Link to="/industries" className="hover:text-tertiary-fixed transition-colors">
                  Commercial Real Estate
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Process */}
          <div className="space-y-3">
            <h4 className="font-bold text-base text-surface-container-lowest">Company & Process</h4>
            <ul className="space-y-2 text-xs text-on-primary-container">
              <li>
                <Link to="/about" className="hover:text-tertiary-fixed transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-tertiary-fixed transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-tertiary-fixed transition-colors">
                  Our Values
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-tertiary-fixed transition-colors">
                  Why Earth Finance
                </Link>
              </li>
              <li>
                <Link to="/reviews" className="hover:text-tertiary-fixed transition-colors">
                  Client Reviews
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-tertiary-fixed transition-colors">
                  Careers & Partnerships
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-base text-surface-container-lowest">Contact & Support</h4>
            <ul className="space-y-2 text-xs text-on-primary-container">
              <li>
                <span className="block text-surface-container-high font-medium">Main Regional Branch</span>
                <span className="block text-on-primary-container">{OFFICE_ADDRESS}</span>
              </li>
              <li>
                <Link to="/contact" className="hover:text-tertiary-fixed transition-colors">
                  Support Desk
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="hover:text-tertiary-fixed transition-colors">
                  Schedule Consultation
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-tertiary-fixed transition-colors">
                  Grievance Officer
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-tertiary-fixed transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer */}
        <div className="py-4 text-[11px] text-slate-400 border-b border-slate-700/60 leading-relaxed">
          <span className="font-semibold text-slate-300">Statutory Notice:</span> {DISCLAIMER_TEXT}
        </div>

        {/* Copyright and Legal Links */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-on-primary-container">
          <p>© {new Date().getFullYear()} Earth Finance. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3 text-slate-400">
            <Link to="/privacy-policy" className="hover:text-surface-container-lowest transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-surface-container-lowest transition-colors">
              Terms & Conditions
            </Link>
            <span>•</span>
            <Link to="/disclaimer" className="hover:text-surface-container-lowest transition-colors">
              Disclaimer
            </Link>
            <span>•</span>
            <span className="text-slate-500">RBI Advisory Compliant</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
