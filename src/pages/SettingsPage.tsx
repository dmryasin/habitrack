import React, { useState } from 'react';
import { Crown, Trash2, Info, Bell, Moon, Sun, Globe, Mail, HelpCircle, Shield, ChevronRight, Check } from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';
import { Button } from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { Language } from '../utils/i18n';
import { getTranslation } from '../utils/i18n';

export const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { isPremium, habits, resetAllData, theme, toggleTheme, language, setLanguage } = useHabitStore();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const t = (key: string) => getTranslation(language, key);

  const languageOptions: { code: Language; name: string; flag: string }[] = [
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  ];

  const getLanguageName = (code: Language) => {
    return languageOptions.find(lang => lang.code === code)?.name || 'Türkçe';
  };

  const handleReset = async () => {
    if (window.confirm(t('confirmReset'))) {
      try {
        await resetAllData();
      } catch (error) {
        // Error handled in store
      }
    }
  };

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    if (!notificationsEnabled) {
      // Request notification permission
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then((permission) => {
          if (permission === 'granted') {
            toast.success(t('notificationsEnabled'));
          } else {
            toast.error(t('notificationsDenied'));
            setNotificationsEnabled(false);
          }
        });
      }
    } else {
      toast.info(t('notificationsDisabled'));
    }
  };

  const settingSections = [
    {
      title: t('account'),
      items: [
        {
          icon: Crown,
          label: t('premiumStatus'),
          value: isPremium ? t('active') : t('free'),
          color: isPremium ? 'text-primary-500' : 'text-gray-400',
          bgColor: isPremium ? 'bg-primary-50' : 'bg-gray-100',
          action: () => !isPremium && navigate('/premium'),
          showChevron: !isPremium,
        },
      ],
    },
    {
      title: t('preferences'),
      items: [
        {
          icon: theme === 'dark' ? Moon : Sun,
          label: t('theme'),
          value: theme === 'dark' ? t('dark') : t('light'),
          color: 'text-blue-500',
          bgColor: 'bg-blue-50',
          action: toggleTheme,
          isToggle: true,
        },
        {
          icon: Bell,
          label: t('notifications'),
          value: notificationsEnabled ? t('on') : t('off'),
          color: 'text-purple-500',
          bgColor: 'bg-purple-50',
          action: handleToggleNotifications,
          isToggle: true,
        },
        {
          icon: Globe,
          label: t('language'),
          value: getLanguageName(language),
          color: 'text-green-500',
          bgColor: 'bg-green-50',
          action: () => setShowLanguageModal(true),
          showChevron: true,
        },
      ],
    },
    {
      title: t('support'),
      items: [
        {
          icon: HelpCircle,
          label: t('helpFaq'),
          value: '',
          color: 'text-yellow-500',
          bgColor: 'bg-yellow-50',
          action: () => navigate('/help'),
          showChevron: true,
        },
        {
          icon: Mail,
          label: t('contact'),
          value: 'support@habitracker.com',
          color: 'text-pink-500',
          bgColor: 'bg-pink-50',
          action: () => window.location.href = 'mailto:support@habitracker.com',
          showChevron: true,
        },
        {
          icon: Shield,
          label: t('privacyPolicy'),
          value: '',
          color: 'text-teal-500',
          bgColor: 'bg-teal-50',
          action: () => navigate('/privacy'),
          showChevron: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-lg mx-auto px-6 py-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{t('settings')}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">{t('customizeApp')}</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* App Info Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Info size={32} className="text-primary-600 dark:text-primary-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg mb-1">
                {t('appName')}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {t('version')} 1.0.0
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center py-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">{t('totalHabits')}</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">{habits.length}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">{t('accountType')}</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {isPremium ? t('premium') : t('free')}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-t border-gray-100 dark:border-gray-700">
                  <span className="text-gray-600 dark:text-gray-400">{t('limit')}</span>
                  <span className="font-semibold text-gray-900 dark:text-gray-100">
                    {isPremium ? t('unlimited') : `3 ${t('habitsLimit')}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Settings Sections */}
        {settingSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-1">
              {section.title}
            </h2>
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm divide-y divide-gray-100 dark:divide-gray-700">
              {section.items.map((item, itemIndex) => (
                <button
                  key={itemIndex}
                  onClick={item.action}
                  className="w-full px-5 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-10 h-10 rounded-xl ${item.bgColor} dark:bg-opacity-20 flex items-center justify-center`}>
                      <item.icon size={20} className={item.color} />
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-gray-900 dark:text-gray-100">{item.label}</p>
                      {item.value && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">{item.value}</p>
                      )}
                    </div>
                  </div>
                  {item.showChevron && (
                    <ChevronRight size={20} className="text-gray-400 dark:text-gray-500" />
                  )}
                  {'isToggle' in item && item.isToggle && (
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      item.value === 'Açık' || item.value === 'Karanlık'
                        ? 'bg-primary-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                        item.value === 'Açık' || item.value === 'Karanlık'
                          ? 'translate-x-6'
                          : 'translate-x-0.5'
                      } translate-y-0.5`} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Danger Zone */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-1">
            {t('dangerZone')}
          </h2>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border-2 border-red-100 dark:border-red-900/30">
            <div className="flex items-start space-x-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center flex-shrink-0">
                <Trash2 size={24} className="text-red-600 dark:text-red-400" />
              </div>
              <div>
                <h3 className="font-semibold text-red-900 dark:text-red-400">{t('resetAllData')}</h3>
                <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                  {t('confirmReset')}
                </p>
              </div>
            </div>
            <Button
              onClick={handleReset}
              variant="danger"
              fullWidth
            >
              <Trash2 size={20} />
              <span>{t('resetAllData')}</span>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center space-y-3 py-6">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
            <button
              onClick={() => navigate('/terms')}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {t('termsOfService')}
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/privacy')}
              className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              {t('privacyPolicy')}
            </button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t('copyright')}
          </p>
        </div>
      </div>

      {/* Language Selection Modal */}
      {showLanguageModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setShowLanguageModal(false)}
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">{t('language')}</h2>
            <div className="space-y-2">
              {languageOptions.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setShowLanguageModal(false);
                  }}
                  className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{lang.name}</span>
                  </div>
                  {language === lang.code && (
                    <Check size={20} className="text-primary-500" />
                  )}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowLanguageModal(false)}
              className="w-full mt-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-xl font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {t('cancel')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
