import localforage from 'localforage';
import type { Habit } from '../types';
import type { Language } from './i18n';

// Configure localforage
localforage.config({
  name: 'HabitTracker',
  storeName: 'habits_store',
  description: 'Local storage for habit tracker app',
});

export const storage = {
  async getHabits(): Promise<Habit[]> {
    try {
      const habits = await localforage.getItem<Habit[]>('habits');
      return habits || [];
    } catch (error) {
      console.error('Error loading habits:', error);
      return [];
    }
  },

  async saveHabits(habits: Habit[]): Promise<void> {
    try {
      await localforage.setItem('habits', habits);
    } catch (error) {
      console.error('Error saving habits:', error);
      throw error;
    }
  },

  async getIsPremium(): Promise<boolean> {
    try {
      const isPremium = await localforage.getItem<boolean>('isPremium');
      return isPremium || false;
    } catch (error) {
      console.error('Error loading premium status:', error);
      return false;
    }
  },

  async saveIsPremium(isPremium: boolean): Promise<void> {
    try {
      await localforage.setItem('isPremium', isPremium);
    } catch (error) {
      console.error('Error saving premium status:', error);
      throw error;
    }
  },

  async getTheme(): Promise<'light' | 'dark'> {
    try {
      const theme = await localforage.getItem<'light' | 'dark'>('theme');
      return theme || 'light';
    } catch (error) {
      console.error('Error loading theme:', error);
      return 'light';
    }
  },

  async saveTheme(theme: 'light' | 'dark'): Promise<void> {
    try {
      await localforage.setItem('theme', theme);
    } catch (error) {
      console.error('Error saving theme:', error);
      throw error;
    }
  },

  async getLanguage(): Promise<Language> {
    try {
      const language = await localforage.getItem<Language>('language');
      return language || 'tr';
    } catch (error) {
      console.error('Error loading language:', error);
      return 'tr';
    }
  },

  async saveLanguage(language: Language): Promise<void> {
    try {
      await localforage.setItem('language', language);
    } catch (error) {
      console.error('Error saving language:', error);
      throw error;
    }
  },

  async getNotificationsEnabled(): Promise<boolean> {
    try {
      const enabled = await localforage.getItem<boolean>('notificationsEnabled');
      return enabled || false;
    } catch (error) {
      console.error('Error loading notifications setting:', error);
      return false;
    }
  },

  async saveNotificationsEnabled(enabled: boolean): Promise<void> {
    try {
      await localforage.setItem('notificationsEnabled', enabled);
    } catch (error) {
      console.error('Error saving notifications setting:', error);
      throw error;
    }
  },

  async clear(): Promise<void> {
    try {
      await localforage.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
      throw error;
    }
  },
};
