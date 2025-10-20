import React from 'react';
import { useHabitStore } from '../store/useHabitStore';
import { HabitModel } from '../models/Habit';
import { Flame, Target, TrendingUp, Award, BarChart3 } from 'lucide-react';
import { getTranslation } from '../utils/i18n';

export const StatisticsPage: React.FC = () => {
  const { habits, language } = useHabitStore();
  const t = (key: string) => getTranslation(language, key);

  const allStats = habits.map((habit) => ({
    habit,
    stats: HabitModel.getStats(habit),
  }));

  const totalCompletions = allStats.reduce((sum, { stats }) => sum + stats.totalCompletions, 0);
  const avgCompletionRate = allStats.length > 0
    ? Math.round(allStats.reduce((sum, { stats }) => sum + stats.completionRate, 0) / allStats.length)
    : 0;
  const longestStreak = allStats.reduce((max, { stats }) => Math.max(max, stats.longestStreak), 0);
  const currentStreaks = allStats.reduce((sum, { stats }) => sum + stats.currentStreak, 0);

  const statCards = [
    {
      icon: Flame,
      label: t('totalStreak'),
      value: currentStreaks,
      color: 'text-orange-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/30',
      unit: ' ' + t('days'),
    },
    {
      icon: Award,
      label: t('longestStreak'),
      value: longestStreak,
      color: 'text-primary-500',
      bgColor: 'bg-primary-50 dark:bg-primary-900/30',
      unit: ' ' + t('days'),
    },
    {
      icon: Target,
      label: t('totalCompletions'),
      value: totalCompletions,
      color: 'text-blue-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/30',
      unit: '',
    },
    {
      icon: TrendingUp,
      label: t('averageSuccess'),
      value: avgCompletionRate,
      color: 'text-green-500',
      bgColor: 'bg-green-50 dark:bg-green-900/30',
      unit: '%',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-lg mx-auto px-6 py-6">
          <div className="flex items-center space-x-3">
            <BarChart3 size={28} className="text-primary-500" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('statistics')}</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{language === 'tr' ? 'Genel performans özeti' : language === 'es' ? 'Resumen general de rendimiento' : language === 'fr' ? 'Résumé général des performances' : language === 'de' ? 'Allgemeine Leistungsübersicht' : language === 'it' ? 'Riepilogo generale delle prestazioni' : 'General performance summary'}</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 gap-4">
          {statCards.map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-3`}>
                <stat.icon size={24} className={stat.color} />
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                {stat.value}{stat.unit}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Per Habit Stats */}
        {habits.length > 0 ? (
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              {t('habitDetails')}
            </h2>
            <div className="space-y-3">
              {allStats.map(({ habit, stats }) => (
                <div key={habit.id} className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: habit.color + '15' }}
                      >
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: habit.color }}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{habit.name}</h3>
                        {habit.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 truncate">{habit.description}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t('currentStreak')}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {stats.currentStreak}
                        <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-1">{t('days')}</span>
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t('longestStreak')}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {stats.longestStreak}
                        <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-1">{t('days')}</span>
                      </p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t('totalCompletions')}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-gray-100">{stats.totalCompletions}</p>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-3">
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{t('completionRate')}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        %{stats.completionRate}
                      </p>
                    </div>
                  </div>

                  {/* Completion Rate Bar */}
                  <div className="relative">
                    <div className="h-2.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${stats.completionRate}%`,
                          backgroundColor: habit.color,
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-sm text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart3 size={32} className="text-gray-400 dark:text-gray-500" />
            </div>
            <p className="text-gray-600 dark:text-gray-400">{t('noHabitsYet')}</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">{t('addFirstHabit')}</p>
          </div>
        )}
      </div>
    </div>
  );
};
