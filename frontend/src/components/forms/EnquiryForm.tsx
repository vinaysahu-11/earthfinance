import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { leadApi } from '../../services/leadApi';
import { Button } from '../common/Button';
import { Alert } from '../common/Alert';
import { Send, CheckCircle2 } from 'lucide-react';
import { DISCLAIMER_TEXT } from '../../config/constants';

interface EnquiryFormProps {
  initialLoanType?: string;
  initialAmount?: string;
  onSuccess?: () => void;
  className?: string;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  initialLoanType = 'Working Capital Loan',
  initialAmount = '',
  onSuccess,
  className = ''
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    loan_type: initialLoanType,
    required_amount: initialAmount,
    city: '',
    business_type: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const loanOptions = [
    'Working Capital Loan',
    'Machinery & Equipment Loan',
    'MSME Term Loan',
    'Commercial Property Loan',
    'Letter of Credit & Bank Guarantee',
    'Invoice Discounting',
    'Corporate Loan against Property'
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Basic frontend checks
    if (!formData.name || !formData.phone || !formData.email || !formData.city || !formData.required_amount) {
      setError('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    try {
      const res = await leadApi.createLead(formData);
      if (res.success) {
        setIsSubmitted(true);
        if (onSuccess) {
          onSuccess();
        } else {
          setTimeout(() => {
            navigate('/thank-you');
          }, 1500);
        }
      } else {
        setError(res.error || 'Failed to submit loan enquiry. Please check your inputs.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'A network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-emerald-200 text-center shadow-card">
        <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-[#071B3A] mb-2">Application Received!</h3>
        <p className="text-sm text-[#667085] max-w-md mx-auto mb-4">
          Thank you for submitting your financing enquiry. Our corporate credit advisory team will review your application and contact you within 24 business hours.
        </p>
        <span className="text-xs text-slate-400">Redirecting to confirmation page...</span>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8 space-y-4 ${className}`}>
      <div className="mb-2">
        <h3 className="text-xl font-bold text-[#071B3A]">Quick Loan Eligibility Enquiry</h3>
        <p className="text-xs text-[#667085]">Confidential evaluation with our corporate finance specialists</p>
      </div>

      {error && <Alert type="error" message={error} />}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Rajesh Kumar"
            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="e.g. 9876543210"
            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A] focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            Corporate Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A] focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            City & State <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            placeholder="e.g. Mumbai, Maharashtra"
            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A] focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            Loan Category / Type <span className="text-red-500">*</span>
          </label>
          <select
            name="loan_type"
            value={formData.loan_type}
            onChange={handleChange}
            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A] focus:border-transparent"
          >
            {loanOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-[#101828] mb-1">
            Required Funding Amount <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="required_amount"
            required
            value={formData.required_amount}
            onChange={handleChange}
            placeholder="e.g. ₹50 Lakhs or ₹2 Crores"
            className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#101828] mb-1">
          Business Nature / Industry
        </label>
        <input
          type="text"
          name="business_type"
          value={formData.business_type}
          onChange={handleChange}
          placeholder="e.g. Manufacturing, Healthcare, Export, Logistics"
          className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold text-[#101828] mb-1">
          Message / Requirement Specifics (Optional)
        </label>
        <textarea
          name="message"
          rows={3}
          value={formData.message}
          onChange={handleChange}
          placeholder="Describe your current turnover, collateral availability, or project details..."
          className="w-full px-3.5 py-2.5 text-sm bg-white rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#071B3A] focus:border-transparent"
        />
      </div>

      <p className="text-[11px] text-[#667085] leading-normal pt-1">
        {DISCLAIMER_TEXT}
      </p>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full"
        rightIcon={<Send className="w-4 h-4" />}
      >
        Submit Financing Request
      </Button>
    </form>
  );
};
