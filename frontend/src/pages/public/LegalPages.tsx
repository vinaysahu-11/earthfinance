import React from 'react';
import { DISCLAIMER_TEXT } from '../../config/constants';

const LegalLayout: React.FC<{ title: string; subtitle: string; children: React.ReactNode }> = ({
  title,
  subtitle,
  children
}) => (
  <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="border-b border-slate-200 pb-6 mb-8">
      <span className="text-xs font-bold uppercase tracking-wider text-[#168B45]">Corporate Compliance</span>
      <h1 className="text-3xl font-extrabold text-[#071B3A] mt-1">{title}</h1>
      <p className="text-sm text-[#667085] mt-2">{subtitle}</p>
    </div>
    <div className="prose prose-slate max-w-none text-xs sm:text-sm leading-relaxed text-slate-700 space-y-6">
      {children}
    </div>
  </div>
);

export { PrivacyPolicyPage } from './PrivacyPolicyPage';

export { TermsPage } from './TermsPage';

export { DisclaimerPage } from './DisclaimerPage';
