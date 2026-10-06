import React from 'react';
import { clsx } from 'clsx';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className, hoverEffect = false, ...props }) => {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden transition-all duration-200',
        hoverEffect && 'hover:shadow-md hover:border-[#CBD5E1] hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
