import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';

const AMOUNT_PRESETS = [
  { label: '₹10 Lakh', value: 1000000 },
  { label: '₹25 Lakh', value: 2500000 },
  { label: '₹50 Lakh', value: 5000000 },
  { label: '₹1 Crore', value: 10000000 },
  { label: '₹5 Crore', value: 50000000 }
];

const RATE_BENCHMARKS = [
  { label: 'Property / LAP', rate: 8.5 },
  { label: 'Machinery / Equipment', rate: 9.5 },
  { label: 'Working Capital', rate: 11.0 }
];

const TENURE_PRESETS = [
  { label: '1 Yr', years: 1 },
  { label: '3 Yrs', years: 3 },
  { label: '5 Yrs', years: 5 },
  { label: '7 Yrs', years: 7 },
  { label: '10 Yrs', years: 10 },
  { label: '15 Yrs', years: 15 }
];

const COMPARISON_HORIZONS = [
  { label: '3 Years (36 Mos)', years: 3, months: 36 },
  { label: '5 Years (60 Mos)', years: 5, months: 60 },
  { label: '7 Years (84 Mos)', years: 7, months: 84 },
  { label: '10 Years (120 Mos)', years: 10, months: 120 }
];

function formatINR(val: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  })
    .format(val)
    .replace('INR', '₹')
    .trim();
}

function computeEmiDetails(principal: number, annualRate: number, tenureMonths: number) {
  if (tenureMonths <= 0) return { emi: 0, totalPayable: 0, totalInterest: 0 };
  const monthlyRate = annualRate / 12 / 100;

  let emi = 0;
  if (monthlyRate === 0) {
    emi = principal / tenureMonths;
  } else {
    emi =
      (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  }

  const totalPayable = emi * tenureMonths;
  const totalInterest = Math.max(0, totalPayable - principal);

  return {
    emi: Math.round(emi),
    totalPayable: Math.round(totalPayable),
    totalInterest: Math.round(totalInterest)
  };
}

export const EmiCalculatorPage: React.FC = () => {
  // Input States
  const [amount, setAmount] = useState<number>(2500000);
  const [rate, setRate] = useState<number>(10.5);
  const [isYearsMode, setIsYearsMode] = useState<boolean>(true);
  const [tenure, setTenure] = useState<number>(5); // 5 years or 60 months

  // Calculate actual tenure in months
  const tenureMonths = isYearsMode ? tenure * 12 : tenure;

  // Active calculations
  const { emi, totalPayable, totalInterest } = useMemo(() => {
    return computeEmiDetails(amount, rate, tenureMonths);
  }, [amount, rate, tenureMonths]);

  // Donut ratios
  const total = amount + totalInterest;
  const principalPercent = total > 0 ? (amount / total) * 100 : 50;
  const interestPercent = 100 - principalPercent;

  const circumference = 2 * Math.PI * 14; // ~87.96
  const principalStroke = (principalPercent / 100) * circumference;
  const interestStroke = (interestPercent / 100) * circumference;

  // Reset to default
  const handleReset = () => {
    setAmount(2500000);
    setRate(10.5);
    setIsYearsMode(true);
    setTenure(5);
  };

  // Switch to years
  const handleSwitchToYears = () => {
    if (!isYearsMode) {
      setIsYearsMode(true);
      const convertedYears = Math.max(1, Math.min(20, Math.round(tenure / 12)));
      setTenure(convertedYears);
    }
  };

  // Switch to months
  const handleSwitchToMonths = () => {
    if (isYearsMode) {
      setIsYearsMode(false);
      setTenure(tenure * 12);
    }
  };

  // Comparison matrix calculations
  const comparisonData = useMemo(() => {
    return COMPARISON_HORIZONS.map(horizon => {
      const { emi: hEmi, totalPayable: hTotal, totalInterest: hInterest } = computeEmiDetails(
        amount,
        rate,
        horizon.months
      );
      const isSelected = tenureMonths === horizon.months;
      return {
        ...horizon,
        emi: hEmi,
        totalPayable: hTotal,
        totalInterest: hInterest,
        isSelected
      };
    });
  }, [amount, rate, tenureMonths]);

  return (
    <div className="w-full bg-background min-h-screen text-on-surface">
      {/* HERO SECTION */}
      <section className="relative w-full bg-gradient-to-r from-primary-container via-[#0e2a52] to-primary-container text-white overflow-hidden py-16 lg:py-24">
        {/* Geometric Matrix Background Overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#d7e2ff 1px, transparent 1px)',
            backgroundSize: '28px 28px'
          }}
        />
        <div className="absolute -top-32 -left-20 w-96 h-96 bg-tertiary-fixed/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-20 w-96 h-96 bg-secondary-fixed/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface-container-high/10 text-surface-container-high border border-white/10">
                <span className="inline-block w-2 h-2 rounded-full bg-secondary-fixed animate-pulse" />
                <span className="text-xs tracking-wider uppercase font-bold text-tertiary-fixed">
                  Financial Planning &amp; Amortization
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl lg:leading-[56px] text-white tracking-tight font-extrabold">
                Plan Your Loan With <span className="text-tertiary-fixed">Confidence</span>
              </h1>

              <p className="text-base lg:text-lg text-[#dbe2f9] max-w-2xl leading-relaxed">
                Estimate your monthly repayment schedule and understand the overall structural cost of your financing.
                Precision engineered calculation for enterprise, working capital, property, and bespoke credit lines.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 text-[#dbe2f9] text-xs sm:text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px]">verified</span>
                  <span>Zero Origination Hidden Charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-secondary-fixed text-[20px]">bolt</span>
                  <span>Instant Amortization Split</span>
                </div>
              </div>
            </div>

            {/* Right Column (Amortization Benchmark Card) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl bg-white/5 p-6 backdrop-blur-md shadow-2xl border border-white/10">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-tertiary-fixed/20 flex items-center justify-center text-tertiary-fixed">
                      <span className="material-symbols-outlined text-[22px]">analytics</span>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">Indicative Amortization Matrix</h3>
                      <p className="text-xs text-[#7384a9]">Live Institutional Benchmark</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-secondary-fixed bg-secondary/30 text-xs font-bold">
                    Live v2.4
                  </span>
                </div>

                {/* Mini Spec Grid */}
                <div className="grid grid-cols-2 gap-3 my-4">
                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/5">
                    <span className="block text-xs text-[#7384a9]">Prime Base Rate</span>
                    <span className="block text-xl font-bold text-tertiary-fixed mt-1">
                      8.75% <span className="text-xs font-normal text-surface-container-high">p.a.</span>
                    </span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-3.5 border border-white/5">
                    <span className="block text-xs text-[#7384a9]">Maximum Term</span>
                    <span className="block text-xl font-bold text-white mt-1">
                      240 <span className="text-xs font-normal text-surface-container-high">Months</span>
                    </span>
                  </div>
                </div>

                {/* Floating Metric Badge */}
                <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-secondary/20 to-white/5 flex items-center gap-3.5 border border-white/10">
                  <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container flex-shrink-0">
                    <span className="material-symbols-outlined text-[18px]">check</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white">Institutional Underwriting Alignment</p>
                    <p className="text-xs text-[#dbe2f9]">Compliant with current RBI corporate repo benchmarks</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CALCULATOR WORKBENCH */}
      <section className="relative w-full max-w-7xl mx-auto px-4 md:px-8 -mt-10 lg:-mt-14 z-20 mb-16">
        <div className="bg-surface-container-lowest rounded-2xl shadow-xl p-6 md:p-8 lg:p-10 border border-outline-variant/30">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* LEFT COLUMN: CONTROLS & SLIDERS */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl font-bold text-primary-container">Financing Parameter Setup</span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-on-surface-variant hover:text-primary-container text-xs font-bold inline-flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-surface-container"
                  >
                    <span className="material-symbols-outlined text-[16px]">restart_alt</span>
                    Reset
                  </button>
                </div>
                <p className="text-xs text-on-surface-variant">
                  Adjust your required borrowing envelope, tenure duration, and expected interest.
                </p>
              </div>

              {/* INPUT 1: LOAN AMOUNT */}
              <div className="space-y-3 bg-surface-container-low p-5 rounded-xl border border-outline-variant/20">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="amount-range" className="text-sm font-bold text-primary-container flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[20px]">
                      account_balance_wallet
                    </span>
                    Loan Amount
                  </label>
                  <div className="relative flex items-center">
                    <div className="bg-surface-container-lowest px-4 py-2 rounded-lg shadow-sm flex items-center gap-1 border border-outline-variant/30">
                      <span className="text-lg font-extrabold text-primary-container">{formatINR(amount)}</span>
                    </div>
                  </div>
                </div>

                {/* Slider */}
                <div className="relative py-2">
                  <input
                    id="amount-range"
                    type="range"
                    min="100000"
                    max="100000000"
                    step="50000"
                    value={amount}
                    onChange={e => setAmount(parseFloat(e.target.value))}
                    className="w-full h-2.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-[#1455A0]"
                  />
                  <div className="flex justify-between text-on-surface-variant text-xs mt-1">
                    <span>₹1 Lakh</span>
                    <span>₹50 Lakhs</span>
                    <span>₹10 Crores</span>
                  </div>
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-on-surface-variant text-xs mr-1 font-semibold">Presets:</span>
                  {AMOUNT_PRESETS.map(preset => {
                    const isSelected = amount === preset.value;
                    return (
                      <button
                        key={preset.value}
                        type="button"
                        onClick={() => setAmount(preset.value)}
                        className={`px-3 py-1 text-xs rounded-lg transition-all font-semibold ${
                          isSelected
                            ? 'bg-primary-container text-surface-container-lowest shadow-sm'
                            : 'bg-surface-container-lowest text-primary-container hover:bg-primary-container hover:text-surface-container-lowest border border-outline-variant/20'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* INPUT 2: INTEREST RATE */}
              <div className="space-y-3 bg-surface-container-low p-5 rounded-xl border border-outline-variant/20">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="rate-range" className="text-sm font-bold text-primary-container flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[20px]">percent</span>
                    Interest Rate (% p.a.)
                  </label>
                  <div className="bg-surface-container-lowest px-4 py-2 rounded-lg shadow-sm flex items-center border border-outline-variant/30">
                    <span className="text-lg font-extrabold text-primary-container">{rate.toFixed(1)}%</span>
                  </div>
                </div>

                {/* Slider */}
                <div className="relative py-2">
                  <input
                    id="rate-range"
                    type="range"
                    min="7.0"
                    max="18.0"
                    step="0.1"
                    value={rate}
                    onChange={e => setRate(parseFloat(e.target.value))}
                    className="w-full h-2.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-[#1455A0]"
                  />
                  <div className="flex justify-between text-on-surface-variant text-xs mt-1">
                    <span>7.0%</span>
                    <span>12.5%</span>
                    <span>18.0%</span>
                  </div>
                </div>

                {/* Benchmark Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-on-surface-variant text-xs mr-1 font-semibold">Sector Benchmark:</span>
                  {RATE_BENCHMARKS.map(bm => {
                    const isSelected = rate === bm.rate;
                    return (
                      <button
                        key={bm.label}
                        type="button"
                        onClick={() => setRate(bm.rate)}
                        className={`px-3 py-1 text-xs rounded-lg transition-all flex items-center gap-1 border ${
                          isSelected
                            ? 'bg-primary-container text-surface-container-lowest border-primary-container'
                            : 'bg-surface-container-lowest text-on-surface hover:bg-surface-container-highest border-outline-variant/20'
                        }`}
                      >
                        <span>{bm.label}:</span>
                        <span className={`font-bold ${isSelected ? 'text-tertiary-fixed' : 'text-secondary'}`}>
                          {bm.rate}%
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* INPUT 3: TENURE */}
              <div className="space-y-3 bg-surface-container-low p-5 rounded-xl border border-outline-variant/20">
                <div className="flex items-center justify-between gap-4">
                  <label htmlFor="tenure-range" className="text-sm font-bold text-primary-container flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container text-[20px]">calendar_month</span>
                    Tenure
                  </label>
                  <div className="flex items-center gap-2">
                    {/* Unit Switcher */}
                    <div className="bg-surface-container-highest p-0.5 rounded-lg flex text-xs">
                      <button
                        type="button"
                        onClick={handleSwitchToYears}
                        className={`px-2.5 py-1 rounded transition-all ${
                          isYearsMode
                            ? 'bg-surface-container-lowest text-primary-container shadow-sm font-bold'
                            : 'text-on-surface-variant font-medium hover:text-on-surface'
                        }`}
                      >
                        Years
                      </button>
                      <button
                        type="button"
                        onClick={handleSwitchToMonths}
                        className={`px-2.5 py-1 rounded transition-all ${
                          !isYearsMode
                            ? 'bg-surface-container-lowest text-primary-container shadow-sm font-bold'
                            : 'text-on-surface-variant font-medium hover:text-on-surface'
                        }`}
                      >
                        Months
                      </button>
                    </div>

                    <div className="bg-surface-container-lowest px-4 py-2 rounded-lg shadow-sm flex items-center border border-outline-variant/30">
                      <span className="text-lg font-extrabold text-primary-container">
                        {isYearsMode
                          ? `${tenure} ${tenure === 1 ? 'Year' : 'Years'} (${tenure * 12} Mos)`
                          : `${tenure} Months`}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Slider */}
                <div className="relative py-2">
                  <input
                    id="tenure-range"
                    type="range"
                    min={isYearsMode ? '1' : '6'}
                    max={isYearsMode ? '20' : '240'}
                    step={isYearsMode ? '1' : '6'}
                    value={tenure}
                    onChange={e => setTenure(parseFloat(e.target.value))}
                    className="w-full h-2.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-[#1455A0]"
                  />
                  <div className="flex justify-between text-on-surface-variant text-xs mt-1">
                    <span>{isYearsMode ? '1 Year' : '6 Mos'}</span>
                    <span>{isYearsMode ? '10 Years' : '120 Mos'}</span>
                    <span>{isYearsMode ? '20 Years' : '240 Mos'}</span>
                  </div>
                </div>

                {/* Quick Tenure Chips */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-on-surface-variant text-xs mr-1 font-semibold">Duration:</span>
                  {TENURE_PRESETS.map(preset => {
                    const isSelected = isYearsMode
                      ? tenure === preset.years
                      : tenure === preset.years * 12;

                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => {
                          if (isYearsMode) {
                            setTenure(preset.years);
                          } else {
                            setTenure(preset.years * 12);
                          }
                        }}
                        className={`px-3 py-1 text-xs rounded-lg transition-all font-semibold ${
                          isSelected
                            ? 'bg-primary-container text-surface-container-lowest shadow-sm'
                            : 'bg-surface-container-lowest text-primary-container hover:bg-primary-container hover:text-surface-container-lowest border border-outline-variant/20'
                        }`}
                      >
                        {preset.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: RESULTS & VISUALIZATION */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl bg-gradient-to-br from-primary-container to-[#041124] text-white p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-primary-container">
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-tertiary-fixed/15 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Header Result Badge */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <span className="text-xs uppercase tracking-wider text-[#7384a9] font-bold">
                    Estimated Repayment
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/20 text-secondary-fixed text-xs font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-fixed animate-pulse" />
                    Fixed Reducing
                  </span>
                </div>

                {/* Big Monthly EMI display */}
                <div className="bg-white/5 rounded-xl p-5 border border-white/5">
                  <span className="block text-xs uppercase tracking-wider text-[#dbe2f9]">
                    Equated Monthly Installment (EMI)
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-3xl lg:text-4xl font-extrabold text-tertiary-fixed">
                      {formatINR(emi)}
                    </span>
                    <span className="text-[#dbe2f9] text-xs">/ month</span>
                  </div>
                </div>

                {/* Visualization: Donut Amortization Split */}
                <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-2">
                  <div className="relative w-36 h-36 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      {/* Background Ring */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="transparent"
                        stroke="#1b2a47"
                        strokeWidth="4.5"
                      />
                      {/* Principal Segment (Blue) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="transparent"
                        stroke="#2563eb"
                        strokeWidth="4.5"
                        strokeDasharray={`${principalStroke} ${circumference}`}
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />
                      {/* Interest Segment (Gold) */}
                      <circle
                        cx="18"
                        cy="18"
                        r="14"
                        fill="transparent"
                        stroke="#ffdf94"
                        strokeWidth="4.5"
                        strokeDasharray={`${interestStroke} ${circumference}`}
                        strokeDashoffset={-principalStroke}
                        strokeLinecap="round"
                        className="transition-all duration-300"
                      />
                    </svg>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none">
                      <span className="text-xs font-bold text-white">{Math.round(principalPercent)}%</span>
                      <span className="text-[9px] uppercase tracking-tighter text-[#7384a9]">Principal</span>
                    </div>
                  </div>

                  {/* Legends */}
                  <div className="space-y-3 w-full sm:w-auto">
                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-blue-600 shrink-0" />
                        <span className="text-xs text-[#dbe2f9]">Principal Portion</span>
                      </div>
                      <span className="text-xs font-bold text-white">{principalPercent.toFixed(1)}%</span>
                    </div>

                    <div className="flex items-center justify-between sm:justify-start gap-3">
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded bg-tertiary-fixed shrink-0" />
                        <span className="text-xs text-[#dbe2f9]">Interest Component</span>
                      </div>
                      <span className="text-xs font-bold text-tertiary-fixed">{interestPercent.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Cost Breakdown */}
                <div className="space-y-2.5 pt-2 border-t border-white/10">
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-xs text-[#dbe2f9]">Principal Borrowed</span>
                    <span className="text-sm font-bold text-white">{formatINR(amount)}</span>
                  </div>
                  <div className="flex items-center justify-between py-1.5">
                    <span className="text-xs text-[#dbe2f9]">Total Interest Accrued</span>
                    <span className="text-sm font-bold text-tertiary-fixed">{formatINR(totalInterest)}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 bg-white/10 rounded-lg px-3">
                    <span className="text-xs text-white font-medium">Total Amount Payable</span>
                    <span className="text-base font-extrabold text-white">{formatINR(totalPayable)}</span>
                  </div>
                </div>
              </div>

              {/* CTAs */}
              <div className="space-y-3 pt-6 relative z-10 border-t border-white/10">
                <Link
                  to={`/apply?amount=${amount}&rate=${rate}&tenure=${tenureMonths}`}
                  className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container text-sm font-bold py-3.5 px-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-center"
                >
                  <span>Apply for This Loan</span>
                  <span className="material-symbols-outlined text-[18px]">north_east</span>
                </Link>

                <Link
                  to="/book-consultation"
                  className="w-full inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-colors text-center"
                >
                  <span className="material-symbols-outlined text-[18px]">chat_bubble_outline</span>
                  <span>Speak to Debt Advisor</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IMPORTANT DISCLAIMER BANNER */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="bg-surface-container p-6 rounded-2xl flex items-start gap-4 border border-outline-variant/30">
          <div className="w-10 h-10 rounded-xl bg-surface-container-highest flex items-center justify-center text-primary-container flex-shrink-0 mt-0.5">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-primary-container">
              Institutional Transparency &amp; Regulatory Notice
            </h4>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              EMI calculations are indicative and based on standardized reducing balance amortization mathematics.
              Actual final interest rates, processing fees, documentation charges, sanction limits, and tenures depend on
              formal institutional underwriting, property valuation, bank statements, and risk credit assessments. Earth
              Finance functions under established institutional lending advisory norms.
            </p>
          </div>
        </div>
      </section>

      {/* HOW EMI WORKS SECTION */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-wider text-secondary font-bold">Mathematical Mechanics</span>
          <h2 className="text-2xl md:text-3xl text-primary-container font-extrabold tracking-tight">
            How EMI Is Calculated
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant">
            Three foundational pillars dynamically establish your structural monthly repayment profile.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Pillar 1 */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-outline-variant/20">
            <div>
              <span className="text-3xl font-black text-tertiary-fixed block mb-4">01</span>
              <h3 className="text-base font-bold text-primary-container mb-2">Principal Loan Amount</h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                The core principal capital sanctioned by the partner banking entity. Larger principal sums spread over
                customized tenures help maintain sustainable operating working capital while containing debt servicing
                pressure.
              </p>
            </div>
            <div className="mt-6 pt-4 flex items-center gap-2 text-on-surface-variant text-xs border-t border-outline-variant/15">
              <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
              <span>Higher balance = Scaled installment</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-outline-variant/20">
            <div>
              <span className="text-3xl font-black text-tertiary-fixed block mb-4">02</span>
              <h3 className="text-base font-bold text-primary-container mb-2">Annual Percentage Rate (APR)</h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                The annualized percentage charge calculated on reducing balance. Governed by prevailing RBI benchmark repo
                rates, your bureau credit rating, debt-service coverage ratio (DSCR), and collateral security quality.
              </p>
            </div>
            <div className="mt-6 pt-4 flex items-center gap-2 text-on-surface-variant text-xs border-t border-outline-variant/15">
              <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
              <span>Floating or fixed rate options</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between border border-outline-variant/20">
            <div>
              <span className="text-3xl font-black text-tertiary-fixed block mb-4">03</span>
              <h3 className="text-base font-bold text-primary-container mb-2">Tenure &amp; Amortization</h3>
              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                The sanctioned repayment horizon. Longer tenures meaningfully lower monthly cash outflow obligations,
                whereas shorter tenures dramatically condense total interest accrued across the loan lifecycle.
              </p>
            </div>
            <div className="mt-6 pt-4 flex items-center gap-2 text-on-surface-variant text-xs border-t border-outline-variant/15">
              <span className="material-symbols-outlined text-[16px] text-secondary">check_circle</span>
              <span>Flexible terms from 12 to 240 months</span>
            </div>
          </div>
        </div>

        {/* Dynamic Comparative Table */}
        <div className="mt-12 bg-surface-container-lowest rounded-2xl shadow-sm p-6 lg:p-8 overflow-x-auto border border-outline-variant/20">
          <div className="flex items-center justify-between pb-6">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-primary-container">
                Tenure Comparison Matrix for {formatINR(amount)} @ {rate.toFixed(1)}%
              </h3>
              <p className="text-xs text-on-surface-variant">
                Analyze how tenure choices impact cumulative interest vs monthly cashflow.
              </p>
            </div>
            <span className="text-xs text-primary-container bg-surface-container px-3 py-1.5 rounded-lg font-bold hidden sm:inline-block">
              Amortization Model
            </span>
          </div>

          <div className="w-full min-w-[560px]">
            <div className="grid grid-cols-4 bg-surface-container text-primary-container text-xs font-bold p-3.5 rounded-xl">
              <div>Sanction Horizon</div>
              <div>Monthly EMI</div>
              <div>Interest Outlay</div>
              <div className="text-right">Total Outflow</div>
            </div>

            <div className="divide-y divide-surface-container-highest">
              {comparisonData.map(item => (
                <div
                  key={item.label}
                  className={`grid grid-cols-4 p-3.5 text-xs text-on-surface transition-colors items-center ${
                    item.isSelected ? 'bg-surface-container-low/70 font-semibold' : 'hover:bg-surface-container-low'
                  }`}
                >
                  <span className="font-bold text-primary-container">
                    {item.label}
                    {item.isSelected && (
                      <span className="text-[11px] text-secondary font-bold ml-1.5">(Selected)</span>
                    )}
                  </span>
                  <span className={item.isSelected ? 'font-bold text-primary-container' : ''}>
                    {formatINR(item.emi)}
                  </span>
                  <span className="text-red-700 font-medium">{formatINR(item.totalInterest)}</span>
                  <span
                    className={`text-right font-medium ${
                      item.isSelected ? 'font-bold text-primary-container' : ''
                    }`}
                  >
                    {formatINR(item.totalPayable)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-20">
        <div className="relative rounded-2xl bg-gradient-to-r from-primary-container via-[#0d2a54] to-primary-container text-white p-8 lg:p-14 overflow-hidden shadow-2xl border border-primary-container">
          {/* Glow Accents */}
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-tertiary-fixed/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-secondary-fixed/15 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-tertiary-fixed text-xs font-bold border border-white/10">
              <span className="material-symbols-outlined text-[16px]">support_agent</span>
              Direct Underwriter Advisory
            </span>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              Need Help Choosing the Right Financing Option?
            </h2>

            <p className="text-sm sm:text-base text-[#dbe2f9] leading-relaxed">
              Our senior debt advisory specialists in Raipur analyze balance sheets, collateral values, and corporate
              cashflows to structure loans that perfectly align with your repayment appetite.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <a
                className="inline-flex items-center gap-2 bg-gradient-to-r from-tertiary-fixed to-tertiary-fixed-dim text-primary-container text-xs sm:text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                href="tel:9300022732"
              >
                <span className="material-symbols-outlined text-[20px]">call</span>
                <span>Talk to an Expert: 9300022732</span>
                <span className="material-symbols-outlined text-[18px]">north_east</span>
              </a>

              <Link
                to="/book-consultation"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold px-6 py-3.5 rounded-xl transition-all border border-white/10"
              >
                <span className="material-symbols-outlined text-[20px]">calendar_add_on</span>
                <span>Schedule Consultation</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmiCalculatorPage;
