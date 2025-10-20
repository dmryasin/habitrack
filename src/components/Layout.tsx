import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { Home, BarChart3, Settings, Crown } from 'lucide-react';
import clsx from 'clsx';
import { useHabitStore } from '../store/useHabitStore';
import { getTranslation } from '../utils/i18n';

export const Layout: React.FC = () => {
  const { isPremium, language } = useHabitStore();
  const t = (key: string) => getTranslation(language, key);

  const navItems = [
    { to: '/', icon: Home, label: t('home') },
    { to: '/statistics', icon: BarChart3, label: t('statistics') },
    { to: '/settings', icon: Settings, label: t('settings') },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Main content */}
      <main className="flex-1 pb-20">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-50">
        <div className="max-w-lg mx-auto px-4">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    'flex flex-col items-center justify-center space-y-1 px-4 py-2 rounded-lg transition-colors',
                    isActive
                      ? 'text-primary-500'
                      : 'text-gray-600 dark:text-gray-400 hover:text-primary-500'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-xs font-medium">{item.label}</span>
                  </>
                )}
              </NavLink>
            ))}

            {!isPremium && (
              <NavLink
                to="/premium"
                className="flex flex-col items-center justify-center space-y-1 px-4 py-2 rounded-lg transition-colors text-yellow-600 dark:text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-400"
              >
                <Crown size={24} strokeWidth={2} />
                <span className="text-xs font-medium">Premium</span>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
