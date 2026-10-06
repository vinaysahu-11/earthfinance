import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { loanApi } from '../../services/loanApi';
import { useFetch } from '../../hooks/useFetch';
import { Spinner } from '../../components/common/Spinner';
import { Alert } from '../../components/common/Alert';
import { EnquiryForm } from '../../components/forms/EnquiryForm';
import { EmiCalculator } from '../../components/common/EmiCalculator';
import { WhatsAppLeadButton } from '../../components/common/WhatsAppLeadButton';
import { CheckCircle, FileText, ArrowLeft } from 'lucide-react';
import { LoanProduct } from '../../types';

export const LoanDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: loan, isLoading, error } = useFetch<LoanProduct>(() => loanApi.getLoanBySlug(slug || ''), [slug]);

  if (isLoading) return <Spinner size="lg" text="Loading product details..." />;
  if (error || !loan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Alert type="error" message={error || 'Loan product not found.'} />
        <Link to="/loans" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#071B3A] mt-4">
          <ArrowLeft className="w-4 h-4" /> Back to All Loans
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Link to="/loans" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#071B3A]">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Loans Overview
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#168B45]">{loan.category}</span>
            <h1 className="text-3xl font-extrabold text-[#071B3A] mt-1 mb-4">{loan.name}</h1>
            <p className="text-sm text-[#667085] leading-relaxed">
              {loan.description || loan.short_description}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 p-5 rounded-xl bg-white border border-slate-200">
            <div>
              <span className="text-xs text-[#667085] block">Facility Size</span>
              <strong className="text-sm font-bold text-[#071B3A]">{loan.loan_amount || 'Custom'}</strong>
            </div>
            <div>
              <span className="text-xs text-[#667085] block">Indicative Rate</span>
              <strong className="text-sm font-bold text-[#168B45]">{loan.interest_rate || 'Market-linked'}</strong>
            </div>
            <div>
              <span className="text-xs text-[#667085] block">Security</span>
              <strong className="text-sm font-bold text-slate-800">{loan.collateral || 'Collateral-based'}</strong>
            </div>
          </div>

          {/* Eligibility */}
          {loan.eligibility && Array.isArray(loan.eligibility) && loan.eligibility.length > 0 && (
            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-base font-bold text-[#071B3A] flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-[#168B45]" /> Eligibility Guidelines
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {loan.eligibility.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#168B45] font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Documents Required */}
          {loan.documents && Array.isArray(loan.documents) && loan.documents.length > 0 && (
            <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3">
              <h3 className="text-base font-bold text-[#071B3A] flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#071B3A]" /> Documentation Checklist
              </h3>
              <ul className="space-y-2 text-xs text-slate-600">
                {loan.documents.map((doc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#071B3A] font-bold">•</span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-4">
            <WhatsAppLeadButton loanType={loan.name} amount={loan.loan_amount || undefined} text="Discuss this loan on WhatsApp" />
          </div>
        </div>

        <div className="lg:col-span-5">
          <EnquiryForm initialLoanType={loan.name} initialAmount={loan.loan_amount || ''} />
        </div>
      </div>

      <div className="pt-6 border-t border-slate-200">
        <h3 className="text-xl font-bold text-[#071B3A] mb-6">Estimate Repayment for {loan.name}</h3>
        <EmiCalculator loanType={loan.name} />
      </div>
    </div>
  );
};
