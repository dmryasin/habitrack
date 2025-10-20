import { create } from 'zustand';
import type { Habit } from '../types';
import { HabitModel } from '../models/Habit';
import { storage } from '../utils/storage';
import { toast } from 'react-toastify';
import type { Language } from '../utils/i18n';
import { getTranslation } from '../utils/i18n';

interface HabitStore {
  habits: Habit[];
  isPremium: boolean;
  loading: boolean;
  theme: 'light' | 'dark';
  language: Language;
  notificationsEnabled: boolean;

  // Actions
  loadData: () => Promise<void>;
  addHabit: (habitData: Omit<Habit, 'id' | 'createdDate' | 'completedDates'>) => Promise<void>;
  updateHabit: (id: string, updates: Partial<Habit>) => Promise<void>;
  deleteHabit: (id: string) => Promise<void>;
  toggleHabitCompletion: (id: string) => Promise<void>;
  activatePremium: () => Promise<void>;
  toggleTheme: () => Promise<void>;
  setLanguage: (lang: Language) => Promise<void>;
  setNotificationsEnabled: (enabled: boolean) => Promise<void>;
  resetAllData: () => Promise<void>;
}

export const useHabitStore = create<HabitStore>((set, get) => ({
  habits: [],
  isPremium: false,
  loading: true,
  theme: 'light',
  language: 'tr',
  notificationsEnabled: false,

  loadData: async () => {
    try {
      const [habits, isPremium, theme, language, notificationsEnabled] = await Promise.all([
        storage.getHabits(),
        storage.getIsPremium(),
        storage.getTheme(),
        storage.getLanguage(),
        storage.getNotificationsEnabled(),
      ]);

      set({ habits, isPremium, theme, language, notificationsEnabled, loading: false });

      // Apply theme on load
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      }
    } catch (error) {
      console.error('Error loading data:', error);
      const { language } = get();
      toast.error(getTranslation(language, 'errorLoadingData'));
      set({ loading: false });
    }
  },

  addHabit: async (habitData) => {
    const { habits, isPremium, language } = get();

    // Check premium limit
    if (!isPremium && habits.length >= 3) {
      toast.warning(getTranslation(language, 'premiumLimit'));
      throw new Error('Premium required');
    }

    try {
      const newHabit = HabitModel.create(habitData);
      const updatedHabits = [...habits, newHabit];

      await storage.saveHabits(updatedHabits);
      set({ habits: updatedHabits });
      toast.success(getTranslation(language, 'habitAdded'));
    } catch (error) {
      console.error('Error adding habit:', error);
      toast.error(getTranslation(language, 'errorAddingHabit'));
      throw error;
    }
  },

  updateHabit: async (id, updates) => {
    const { habits, language } = get();

    try {
      const updatedHabits = habits.map((habit) =>
        habit.id === id ? { ...habit, ...updates } : habit
      );

      await storage.saveHabits(updatedHabits);
      set({ habits: updatedHabits });
      toast.success(getTranslation(language, 'habitUpdated'));
    } catch (error) {
      console.error('Error updating habit:', error);
      toast.error(getTranslation(language, 'errorUpdatingHabit'));
      throw error;
    }
  },

  deleteHabit: async (id) => {
    const { habits, language } = get();

    try {
      const updatedHabits = habits.filter((h) => h.id !== id);

      await storage.saveHabits(updatedHabits);
      set({ habits: updatedHabits });
      toast.success(getTranslation(language, 'habitDeleted'));
    } catch (error) {
      console.error('Error deleting habit:', error);
      toast.error(getTranslation(language, 'errorDeletingHabit'));
      throw error;
    }
  },

  toggleHabitCompletion: async (id) => {
    const { habits, language } = get();

    try {
      const updatedHabits = habits.map((habit) =>
        habit.id === id ? HabitModel.toggleToday(habit) : habit
      );

      await storage.saveHabits(updatedHabits);
      set({ habits: updatedHabits });
    } catch (error) {
      console.error('Error toggling habit:', error);
      toast.error(getTranslation(language, 'errorOccurred'));
      throw error;
    }
  },

  activatePremium: async () => {
    const { language } = get();

    try {
      await storage.saveIsPremium(true);
      set({ isPremium: true });
      toast.success(getTranslation(language, 'premiumActivated'));
    } catch (error) {
      console.error('Error activating premium:', error);
      toast.error(getTranslation(language, 'errorActivatingPremium'));
      throw error;
    }
  },

  toggleTheme: async () => {
    const { theme, language } = get();
    const newTheme = theme === 'light' ? 'dark' : 'light';

    try {
      await storage.saveTheme(newTheme);
      set({ theme: newTheme });

      // Toggle dark class on html element
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }

      toast.success(getTranslation(language, newTheme === 'dark' ? 'darkThemeActive' : 'lightThemeActive'));
    } catch (error) {
      console.error('Error toggling theme:', error);
      toast.error(getTranslation(language, 'errorChangingTheme'));
    }
  },

  setLanguage: async (lang: Language) => {
    try {
      await storage.saveLanguage(lang);
      set({ language: lang });
      toast.success(getTranslation(lang, 'languageChanged'));
    } catch (error) {
      console.error('Error changing language:', error);
      const { language } = get();
      toast.error(getTranslation(language, 'errorChangingLanguage'));
    }
  },

  setNotificationsEnabled: async (enabled: boolean) => {
    try {
      await storage.saveNotificationsEnabled(enabled);
      set({ notificationsEnabled: enabled });
    } catch (error) {
      console.error('Error changing notifications:', error);
    }
  },

  resetAllData: async () => {
    const { language } = get();

    try {
      await storage.clear();
      set({ habits: [], isPremium: false, theme: 'light' });
      toast.success(getTranslation(language, 'allDataReset'));
    } catch (error) {
      console.error('Error resetting data:', error);
      toast.error(getTranslation(language, 'errorResettingData'));
      throw error;
    }
  },
}));
