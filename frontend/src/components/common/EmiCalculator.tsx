import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { calculateEmi } from '../../utils/emi';
import { formatCurrencyINR } from '../../utils/formatters';
import { Button } from './Button';
import { ArrowRight, Calculator } from 'lucide-react';

interface EmiCalculatorProps {
  initialAmount?: number;
  initialRate?: number;
  initialTenure?: number;
  loanType?: string;
  showApplyButton?: boolean;
}

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({
  initialAmount = 2500000, // 25 Lakhs
  initialRate = 10.5,
  initialTenure = 5,
  loanType = 'Business Loan',
  showApplyButton = true
}) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState<number>(initialAmount);
  const [rate, setRate] = useState<number>(initialRate);
  const [tenure, setTenure] = useState<number>(initialTenure);

  const { monthlyEmi, totalInterest, totalPayable } = useMemo(() => {
    return calculateEmi(amount, rate, tenure);
  }, [amount, rate, tenure]);

  const handleApply = () => {
    navigate(`/apply?amount=${amount}&loanType=${encodeURIComponent(loanType)}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-6 md:p-8">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <div className="p-3 bg-[#071B3A]/5 rounded-xl text-[#071B3A]">
          <Calculator className="w-6 h-6 text-[#071B3A]" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-[#071B3A]">Business Loan EMI Calculator</h3>
          <p className="text-xs text-[#667085]">Estimate monthly repayments accurately</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loan Amount */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-[#101828]">Loan Amount</label>
              <div className="flex items-center bg-[#F4F8FC] px-3 py-1.5 rounded-lg border border-slate-200">
                <span className="text-sm font-bold text-[#071B3A]">{formatCurrencyINR(amount)}</span>
              </div>
            </div>
            <input
              type="range"
              min={100000}
              max={50000000}
              step={50000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#071B3A]"
            />
            <div className="flex justify-between text-[11px] text-[#667085] mt-1">
              <span>₹1 Lakh</span>
              <span>₹5 Crore</span>
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-[#101828]">Interest Rate (% p.a.)</label>
              <div className="flex items-center bg-[#F4F8FC] px-3 py-1.5 rounded-lg border border-slate-200">
                <span className="text-sm font-bold text-[#071B3A]">{rate}%</span>
              </div>
            </div>
            <input
              type="range"
              min={8}
              max={24}
              step={0.25}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#071B3A]"
            />
            <div className="flex justify-between text-[11px] text-[#667085] mt-1">
              <span>8%</span>
              <span>24%</span>
            </div>
          </div>

          {/* Tenure */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-[#101828]">Tenure (Years)</label>
              <div className="flex items-center bg-[#F4F8FC] px-3 py-1.5 rounded-lg border border-slate-200">
                <span className="text-sm font-bold text-[#071B3A]">{tenure} Years ({tenure * 12} Mos)</span>
              </div>
            </div>
            <input
              type="range"
              min={1}
              max={15}
              step={1}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#071B3A]"
            />
            <div className="flex justify-between text-[11px] text-[#667085] mt-1">
              <span>1 Year</span>
              <span>15 Years</span>
            </div>
          </div>
        </div>

        {/* Results Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-[#071B3A] rounded-2xl text-white">
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-[#F4C542]">Monthly Repayment</span>
            <div className="text-3xl md:text-4xl font-extrabold mt-1 mb-6 text-white">
              {formatCurrencyINR(monthlyEmi)}
              <span className="text-xs text-slate-300 font-normal"> / month</span>
            </div>

            <div className="space-y-4 pt-4 border-t border-white/10 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-300">Principal Amount</span>
                <span className="font-semibold text-white">{formatCurrencyINR(amount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-300">Total Interest</span>
                <span className="font-semibold text-[#F4C542]">{formatCurrencyINR(totalInterest)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10">
                <span className="font-bold text-slate-200">Total Payable</span>
                <span className="font-bold text-white">{formatCurrencyINR(totalPayable)}</span>
              </div>
            </div>
          </div>

          {showApplyButton && (
            <div className="mt-8">
              <Button
                variant="gold"
                size="lg"
                className="w-full"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={handleApply}
              >
                Apply for This Loan
              </Button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                *Subject to eligibility & credit assessment
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
