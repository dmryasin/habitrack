import React from 'react';
import type { Habit } from '../types';
import { HabitModel } from '../models/Habit';
import * as Icons from 'lucide-react';
import clsx from 'clsx';

interface HabitCardProps {
  habit: Habit;
  onToggle: (id: string) => void;
  onClick: (id: string) => void;
}

export const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggle, onClick }) => {
  const stats = HabitModel.getStats(habit);
  const isCompleted = HabitModel.isCompletedToday(habit);

  // Get the icon component
  const IconComponent = (Icons as any)[
    habit.icon.split('-').map((word: string) =>
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join('')
  ] || Icons.Circle;

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100/50 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={() => onClick(habit.id)}
    >
      <div className="flex items-center justify-between mb-3 gap-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: habit.color + '20' }}
          >
            <IconComponent size={24} color={habit.color} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">{habit.name}</h3>
            {habit.description && (
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{habit.description}</p>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(habit.id);
          }}
          className={clsx(
            'w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0',
            isCompleted
              ? 'bg-primary-500 hover:bg-primary-600'
              : 'border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500'
          )}
        >
          {isCompleted && <Icons.Check size={20} className="text-white" />}
        </button>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700">
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <Icons.Flame size={16} className="text-orange-500" />
            <span>{stats.currentStreak} gün</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icons.TrendingUp size={16} className="text-blue-500" />
            <span>%{stats.completionRate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
