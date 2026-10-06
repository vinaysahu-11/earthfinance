import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { industryApi } from '../../services/industryApi';
import { useFetch } from '../../hooks/useFetch';
import { Spinner } from '../../components/common/Spinner';
import { EnquiryForm } from '../../components/forms/EnquiryForm';
import { WhatsAppLeadButton } from '../../components/common/WhatsAppLeadButton';
import { ArrowLeft, CheckCircle2, Shield } from 'lucide-react';
import { Industry } from '../../types';

export const IndustryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: industry, isLoading } = useFetch<Industry>(
    () => industryApi.getIndustryBySlug(slug || ''),
    [slug]
  );

  // Fallbacks if not seeded in DB yet
  const defaults: Record<string, any> = {
    manufacturing: {
      name: 'Manufacturing & Engineering',
      title: 'Credit Syndication for Manufacturing Units & MSMEs',
      desc: 'We assist manufacturing plants, export units, and auto-ancillary enterprises in securing term loans for advanced machinery, letter of credit facilities, and working capital lines customized to production lead times.',
      benefits: [
        'Customized moratorium periods matching equipment setup cycles',
        'Working capital linked to book debts and inventory hypothecation',
        'Access to state and central MSME capital subsidy programs',
        'Letter of Credit (LC) and Bank Guarantee (BG) limits for raw material imports'
      ]
    },
    healthcare: {
      name: 'Healthcare & Diagnostics',
      title: 'Institutional Funding for Hospitals, Clinics & Labs',
      desc: 'Specialized healthcare finance solutions enabling medical equipment procurement (MRI, CT, ultrasound, robotic surgical suites) and hospital infrastructure development.',
      benefits: [
        'Equipment financing with low collateral requirements',
        'Structured tenure up to 10 years for hospital real estate expansion',
        'Cash flow linked repayments aligned with patient footfalls and insurance receivables'
      ]
    },
    education: {
      name: 'Education & Institutional',
      title: 'Educational Trusts & Campus Infrastructure Funding',
      desc: 'Financing solutions for schools, colleges, professional universities, and ed-tech infrastructure with seasonal cash-flow alignment.',
      benefits: [
        'Tenure structured around annual tuition fee collection cycles',
        'Campus construction, hostel expansion, and laboratory setup debt',
        'Compliant financing for registered non-profit trusts and societies'
      ]
    }
  };

  const item = industry || (slug && defaults[slug]) || {
    name: slug ? slug.charAt(0).toUpperCase() + slug.slice(1) : 'Industry',
    title: `${slug} Financing & Debt Advisory`,
    desc: 'Structured debt facilities designed specifically for enterprises in this sector.',
    benefits: [
      'Tailored working capital parameters',
      'Flexible amortization schedules',
      'Dedicated relationship manager with sector expertise'
    ]
  };

  if (isLoading) return <Spinner text="Loading industry details..." />;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <Link to="/industries" className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#071B3A]">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Industries
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#168B45]">Industry Specialization</span>
            <h1 className="text-3xl font-extrabold text-[#071B3A] mt-1 mb-4">{item.title || item.name}</h1>
            <p className="text-sm text-[#667085] leading-relaxed">
              {item.description || item.desc}
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-4">
            <h3 className="text-base font-bold text-[#071B3A] flex items-center gap-2">
              <Shield className="w-5 h-5 text-[#168B45]" /> Key Financing Advantages
            </h3>
            <ul className="space-y-3">
              {item.benefits?.map((b: string, i: number) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-[#168B45] shrink-0 mt-0.5" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex items-center gap-4">
            <WhatsAppLeadButton
              loanType={`${item.name} Loan`}
              text="Discuss Sector Credit on WhatsApp"
            />
          </div>
        </div>

        <div className="lg:col-span-5">
          <EnquiryForm initialLoanType={`${item.name} Loan`} />
        </div>
      </div>
    </div>
  );
};
