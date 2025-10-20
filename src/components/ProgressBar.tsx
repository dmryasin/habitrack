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
      <div className="h-3 bg-white dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-[#C85A3E] rounded-full transition-all duration-500 ease-out shadow-sm"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showPercentage && (
        <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
          {value} / {max} ({percentage}%)
        </p>
      )}
    </div>
  );
};
