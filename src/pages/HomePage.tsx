import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Crown, Calendar } from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';
import { HabitCard } from '../components/HabitCard';
import { ProgressBar } from '../components/ProgressBar';
import { HabitModel } from '../models/Habit';
import { format } from 'date-fns';
import { tr, enUS, es, fr, de, it } from 'date-fns/locale';
import { getTranslation } from '../utils/i18n';

const getDateFnsLocale = (lang: string) => {
  switch (lang) {
    case 'en': return enUS;
    case 'es': return es;
    case 'fr': return fr;
    case 'de': return de;
    case 'it': return it;
    default: return tr;
  }
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { habits, isPremium, toggleHabitCompletion, language } = useHabitStore();
  const t = (key: string) => getTranslation(language, key);

  const completedToday = habits.filter((h) => HabitModel.isCompletedToday(h)).length;
  const totalHabits = habits.length;
  const completionPercentage = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-lg mx-auto px-6 py-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#C85A3E]/10 dark:bg-[#C85A3E]/20 flex items-center justify-center">
              <img src="/icon.png" alt="HabiTrack" className="w-6 h-6 object-contain" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('myHabits')}</h1>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400 ml-13">
            <Calendar size={18} />
            <p className="text-sm font-medium">
              {format(new Date(), "d MMMM yyyy, EEEE", { locale: getDateFnsLocale(language) })}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Progress Section */}
        {totalHabits > 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900 dark:text-gray-100">
                {t('dailyProgress')}
              </h2>
              <div className="flex items-center space-x-2">
                <div className="bg-[#C85A3E]/10 dark:bg-[#C85A3E]/20 rounded-full px-3 py-1">
                  <span className="text-xl font-bold text-[#C85A3E]">
                    {completionPercentage}%
                  </span>
                </div>
              </div>
            </div>
            <ProgressBar
              value={completedToday}
              max={totalHabits}
              showPercentage
              className="mb-0"
            />
          </div>
        )}

        {/* Premium Banner */}
        {!isPremium && totalHabits >= 3 && (
          <button
            onClick={() => navigate('/premium')}
            className="w-full bg-[#C85A3E] hover:bg-[#B34F35] text-white rounded-3xl p-5 flex items-center justify-between shadow-md transition-all duration-200 hover:shadow-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Crown size={24} />
              </div>
              <div className="text-left">
                <p className="font-bold text-base">{t('upgradeToPremium')}</p>
                <p className="text-sm text-white/90">{t('unlimitedHabits')}</p>
              </div>
            </div>
            <Plus size={24} className="rotate-45" />
          </button>
        )}

        {/* Habits List */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {t('myHabits')}
              {totalHabits > 0 && (
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-2">
                  ({totalHabits})
                </span>
              )}
            </h2>
            {isPremium && (
              <div className="flex items-center space-x-1.5 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-3 py-1.5 rounded-full">
                <Crown size={14} />
                <span className="text-xs font-semibold">Premium</span>
              </div>
            )}
          </div>

          {habits.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-sm border-2 border-gray-200 dark:border-gray-700 text-center">
              <button
                onClick={() => navigate('/add')}
                className="w-24 h-24 bg-[#C85A3E]/10 dark:bg-[#C85A3E]/20 rounded-full flex items-center justify-center mx-auto mb-5 hover:bg-[#C85A3E]/20 dark:hover:bg-[#C85A3E]/30 transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <Plus size={48} className="text-[#C85A3E]" strokeWidth={2} />
              </button>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                {t('noHabitsYet')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm max-w-sm mx-auto">
                {t('addFirstHabit')}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {habits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onToggle={toggleHabitCompletion}
                  onClick={() => navigate(`/edit/${habit.id}`)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      {habits.length > 0 && (
        <button
          onClick={() => navigate('/add')}
          className="fixed bottom-24 right-6 w-16 h-16 bg-[#C85A3E] hover:bg-[#B34F35] text-white rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-40"
        >
          <Plus size={28} strokeWidth={2.5} />
        </button>
      )}
    </div>
  );
};
