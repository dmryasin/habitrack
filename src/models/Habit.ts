import type { Habit, HabitStats } from '../types';
import { startOfDay, differenceInDays, parseISO, format } from 'date-fns';

export class HabitModel {
  static isCompletedToday(habit: Habit): boolean {
    const today = format(new Date(), 'yyyy-MM-dd');
    return habit.completedDates.includes(today);
  }

  static toggleToday(habit: Habit): Habit {
    const today = format(new Date(), 'yyyy-MM-dd');
    const isCompleted = this.isCompletedToday(habit);

    if (isCompleted) {
      return {
        ...habit,
        completedDates: habit.completedDates.filter(date => date !== today),
      };
    } else {
      return {
        ...habit,
        completedDates: [...habit.completedDates, today].sort(),
      };
    }
  }

  static getCurrentStreak(habit: Habit): number {
    if (habit.completedDates.length === 0) return 0;

    const sortedDates = [...habit.completedDates].sort().reverse();
    const today = startOfDay(new Date());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const todayStr = format(today, 'yyyy-MM-dd');
    const yesterdayStr = format(yesterday, 'yyyy-MM-dd');

    // Streak must start from today or yesterday
    if (sortedDates[0] !== todayStr && sortedDates[0] !== yesterdayStr) {
      return 0;
    }

    let streak = 0;
    let currentDate = sortedDates[0] === todayStr ? today : yesterday;

    for (const dateStr of sortedDates) {
      const expectedDate = format(currentDate, 'yyyy-MM-dd');
      if (dateStr === expectedDate) {
        streak++;
        currentDate = new Date(currentDate);
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }

    return streak;
  }

  static getLongestStreak(habit: Habit): number {
    if (habit.completedDates.length === 0) return 0;

    const sortedDates = [...habit.completedDates].sort();
    let longestStreak = 1;
    let currentStreak = 1;

    for (let i = 1; i < sortedDates.length; i++) {
      const prevDate = parseISO(sortedDates[i - 1]);
      const currDate = parseISO(sortedDates[i]);
      const diff = differenceInDays(currDate, prevDate);

      if (diff === 1) {
        currentStreak++;
        longestStreak = Math.max(longestStreak, currentStreak);
      } else {
        currentStreak = 1;
      }
    }

    return longestStreak;
  }

  static getCompletionRate(habit: Habit, days: number = 30): number {
    const now = new Date();
    const startDate = new Date(now);
    startDate.setDate(startDate.getDate() - days);

    const completedInRange = habit.completedDates.filter(dateStr => {
      const date = parseISO(dateStr);
      return date >= startDate && date <= now;
    });

    return Math.round((completedInRange.length / days) * 100);
  }

  static getStats(habit: Habit): HabitStats {
    return {
      currentStreak: this.getCurrentStreak(habit),
      longestStreak: this.getLongestStreak(habit),
      completionRate: this.getCompletionRate(habit),
      totalCompletions: habit.completedDates.length,
    };
  }

  static create(data: Omit<Habit, 'id' | 'createdDate' | 'completedDates'>): Habit {
    return {
      ...data,
      id: crypto.randomUUID(),
      createdDate: new Date().toISOString(),
      completedDates: [],
    };
  }
}
