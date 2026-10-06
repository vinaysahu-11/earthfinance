export const formatCurrencyINR = (amount: number | string | null | undefined): string => {
  if (amount === null || amount === undefined || amount === '') return '₹0';
  const num = typeof amount === 'string' ? parseFloat(amount.replace(/[^0-9.-]+/g, '')) : amount;
  if (isNaN(num)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(num);
};

export const formatDate = (dateStr: string | null | undefined): string => {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } catch {
    return dateStr;
  }
};

export const formatDateTime = (dateStr: string | null | undefined): string => {
  if (!dateStr) return '-';
  try {
    const d = new Date(dateStr);
    return d.toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch {
    return dateStr;
  }
};

export const getStatusBadgeColor = (status: string): string => {
  switch (status.toUpperCase()) {
    case 'NEW':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'CONTACTED':
      return 'bg-cyan-100 text-cyan-800 border-cyan-200';
    case 'FOLLOW_UP':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'DOCUMENTS_REQUESTED':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'DOCUMENTS_RECEIVED':
      return 'bg-indigo-100 text-indigo-800 border-indigo-200';
    case 'PROCESSING':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'APPROVED':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'DISBURSED':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'REJECTED':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'CLOSED':
      return 'bg-slate-100 text-slate-800 border-slate-200';
    case 'PENDING':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'CONFIRMED':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'COMPLETED':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'CANCELLED':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};
