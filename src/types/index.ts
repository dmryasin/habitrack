export interface Habit {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  createdDate: string;
  completedDates: string[]; // ISO date strings
  frequency: 'daily' | 'weekly' | 'monthly';
  reminder?: {
    enabled: boolean;
    time: string; // HH:mm format
  };
}

export interface HabitStats {
  currentStreak: number;
  longestStreak: number;
  completionRate: number;
  totalCompletions: number;
}

export interface AppState {
  habits: Habit[];
  isPremium: boolean;
  theme: 'light' | 'dark';
}

export type HabitFormData = Omit<Habit, 'id' | 'createdDate' | 'completedDates'>;

export interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  currency: string;
  interval: 'monthly' | 'yearly';
  features: string[];
}
