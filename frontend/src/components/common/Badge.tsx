import React from 'react';
import { clsx } from 'clsx';
import { getStatusBadgeColor } from '../../utils/formatters';

interface BadgeProps {
  label: string;
  variant?: 'status' | 'custom';
  customClass?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'status', customClass }) => {
  const colorClasses = variant === 'status' ? getStatusBadgeColor(label) : (customClass || 'bg-gray-100 text-gray-800');

  return (
    <span className={clsx('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border tracking-wide', colorClasses)}>
      {label.replace(/_/g, ' ')}
    </span>
  );
};
