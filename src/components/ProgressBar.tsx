import React from 'react';
import clsx from 'clsx';

interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showPercentage?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  className,
  showPercentage = false,
}) => {
  const percentage = max > 0 ? Math.round((value / max) * 100) : 0;

  return (
    <div className={clsx('space-y-2', className)}>
      <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
          {value} / {max} ({percentage}%)
        </p>
      )}
    </div>
  );
};
