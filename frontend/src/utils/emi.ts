export interface EmiResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayable: number;
}

export const calculateEmi = (
  principal: number,
  annualInterestRate: number,
  tenureYears: number
): EmiResult => {
  if (principal <= 0 || annualInterestRate <= 0 || tenureYears <= 0) {
    return {
      monthlyEmi: 0,
      totalInterest: 0,
      totalPayable: 0
    };
  }

  const monthlyRate = annualInterestRate / 12 / 100;
  const numberOfMonths = tenureYears * 12;

  // EMI formula: [P x R x (1+R)^N]/[(1+R)^N-1]
  const emi =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
    (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

  const totalPayable = emi * numberOfMonths;
  const totalInterest = totalPayable - principal;

  return {
    monthlyEmi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayable: Math.round(totalPayable)
  };
};
