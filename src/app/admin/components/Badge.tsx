import React from 'react';

interface BadgeProps {
  count: number;
  className?: string;
  variant?: 'danger' | 'info';
}

export default function Badge({ count, className = '', variant = 'danger' }: BadgeProps) {
  if (count <= 0) return null;

  const variantClasses = {
    danger: 'bg-rose-500 text-white',
    info: 'bg-indigo-500 text-white'
  };

  return (
    <span className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-bold rounded-full animate-in zoom-in duration-300 ${variantClasses[variant]} ${className}`}>
      {count > 99 ? '99+' : count}
    </span>
  );
}
