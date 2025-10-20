import React from 'react';
import clsx from 'clsx';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  children,
  disabled,
  ...props
}) => {
  return (
    <button
      className={clsx(
        'font-semibold rounded-xl transition-all duration-200 flex items-center justify-center space-x-2',
        {
          'bg-[#C85A3E] hover:bg-[#B34F35] active:bg-[#9E442D] text-white shadow-sm hover:shadow-md':
            variant === 'primary' && !disabled,
          'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 active:bg-gray-400 dark:active:bg-gray-500 text-gray-900 dark:text-gray-100':
            variant === 'secondary' && !disabled,
          'bg-red-500 hover:bg-red-600 active:bg-red-700 text-white':
            variant === 'danger' && !disabled,
          'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 active:bg-gray-200 dark:active:bg-gray-700 text-gray-700 dark:text-gray-300':
            variant === 'ghost' && !disabled,
          'px-3 py-1.5 text-sm': size === 'sm',
          'px-4 py-2.5 text-base': size === 'md',
          'px-6 py-3.5 text-lg': size === 'lg',
          'w-full': fullWidth,
          'opacity-50 cursor-not-allowed': disabled,
        },
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
