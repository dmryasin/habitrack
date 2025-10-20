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
      className="bg-white dark:bg-gray-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border border-gray-100 dark:border-gray-700"
      onClick={() => onClick(habit.id)}
    >
      <div className="flex items-center justify-between mb-4 gap-3">
        <div className="flex items-center space-x-3 flex-1 min-w-0">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ backgroundColor: habit.color + '15' }}
          >
            <IconComponent size={26} color={habit.color} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-bold text-gray-900 dark:text-gray-100 truncate mb-1">{habit.name}</h3>
            {habit.description && (
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{habit.description}</p>
            )}
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(habit.id);
          }}
          className={clsx(
            'w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 flex-shrink-0',
            isCompleted
              ? 'bg-[#C85A3E] hover:bg-[#B34F35] shadow-md'
              : 'border-2 border-gray-300 dark:border-gray-600 hover:border-[#C85A3E] dark:hover:border-[#C85A3E]'
          )}
        >
          {isCompleted && <Icons.Check size={20} className="text-white" strokeWidth={3} />}
        </button>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-700/50">
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1.5">
            <Icons.Flame size={18} className="text-orange-500" />
            <span className="font-medium">{stats.currentStreak} gün</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Icons.TrendingUp size={18} className="text-blue-500" />
            <span className="font-medium">%{stats.completionRate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
