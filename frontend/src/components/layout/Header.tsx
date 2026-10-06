import React, { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { SUPPORT_PHONE } from '../../config/constants';

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Loans', path: '/loans' },
    { name: 'Industries', path: '/industries' },
    { name: 'Offers', path: '/offers' },
    { name: 'Solutions Gallery', path: '/solutions-gallery' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Reviews', path: '/reviews' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Top Banner Bar */}
      <div className="w-full bg-primary-container border-b border-tertiary-fixed/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-surface-variant font-medium text-xs">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-tertiary-fixed text-[16px]">corporate_fare</span>
            <span className="tracking-wide hidden sm:inline">
              Financial Solutions for Businesses & Individuals | Raipur, Chhattisgarh
            </span>
            <span className="tracking-wide sm:hidden">
              Earth Finance | Raipur, CG
            </span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              className="flex items-center gap-1.5 text-surface-container hover:text-tertiary-fixed transition-colors"
              href={`tel:${SUPPORT_PHONE}`}
            >
              <span className="material-symbols-outlined text-tertiary-fixed text-[16px]">call</span>
              <span className="font-semibold">{SUPPORT_PHONE}</span>
            </a>
            <span className="text-slate-500/40 hidden sm:inline">|</span>
            <Link
              to="/contact"
              className="hidden sm:flex items-center gap-1 text-surface-container hover:text-tertiary-fixed transition-colors font-medium text-xs"
            >
              <span>Talk to an Expert</span>
              <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="w-full bg-surface-container-lowest border-b border-outline-variant/50 shadow-[0_2px_8px_-2px_rgba(7,27,58,0.06)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link to="/" className="flex items-center gap-2.5">
              <img
                alt="Earth Finance Logo"
                className="h-11 sm:h-12 w-auto object-contain"
                src="/earth-finance-logo.png"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "https://lh3.googleusercontent.com/aida/AEtjO1V2PyoUYvToFwDny0ipn_46x1Xxiiy_gFQvLVcKYV91RnhGjr_yqg0KCW79Fy7-SRgJ7HfxGbE571KUOSXztQysxObH-mOFY1bWeOjPDR6SbKqDknAfonsxS-frWiPGhSsJPHuDFMB3VD4FcB_vH9g1e3Ix5hNHa4P9qpGmc3zSKzNqXSdsQVLvZMm7kvYjkhVRDsJ0vTrMlpP2i8NPQ-Rkz2P8iVTQtTy6DY99N0pObGpIfbmPkwQTW7g";
                }}
              />
              <span className="font-bold text-lg sm:text-xl tracking-tight text-primary-container hidden sm:inline-block">
                EARTH FINANCE
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={
                    isActive
                      ? 'text-primary-container font-bold border-b-2 border-primary-container py-1 transition-colors text-[15px]'
                      : 'text-on-surface-variant hover:text-primary-container font-semibold transition-colors py-1 text-[15px]'
                  }
                >
                  {link.name}
                </NavLink>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              to="/appointment"
              className="hidden sm:inline-flex items-center justify-center border border-primary-container text-primary-container font-semibold text-[14px] px-4 py-2 rounded-xl hover:bg-surface-container transition-colors"
            >
              Book Consultation
            </Link>

            <Link
              to="/apply"
              className="inline-flex items-center justify-center gap-1.5 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container font-bold text-[14px] px-4 sm:px-5 py-2.5 rounded-xl shadow-[0_2px_8px_-2px_rgba(7,27,58,0.12)] hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <span>Apply Now</span>
              <span className="material-symbols-outlined text-[18px]">north_east</span>
            </Link>

            <Link
              to="/admin/login"
              title="Advisor Portal"
              className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0 text-white hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-white text-[18px]">person</span>
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-2 text-primary-container hover:bg-surface-container rounded-lg focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 shadow-xl px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-surface-container hover:text-primary-container transition-colors"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
            <Link
              to="/appointment"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg border border-primary-container text-primary-container font-semibold"
            >
              Book Consultation
            </Link>
            <Link
              to="/apply"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full text-center py-2.5 rounded-lg bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container font-bold"
            >
              Apply for Loan
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
