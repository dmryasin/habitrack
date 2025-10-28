import { LocalNotifications } from '@capacitor/local-notifications';
import type { LocalNotificationSchema } from '@capacitor/local-notifications';
import type { Habit } from '../types';
import { HabitModel } from '../models/Habit';

/**
 * Notification Service
 * Manages smart habit reminder notifications
 * - 3 random notifications during the day if habit is not completed
 * - 1 final reminder at 23:00 if habit is not completed
 */
export class NotificationService {
  private static readonly CHANNEL_ID = 'habit-reminders';
  private static readonly RANDOM_NOTIFICATION_COUNT = 3;
  private static readonly FINAL_REMINDER_HOUR = 23;
  private static readonly FINAL_REMINDER_MINUTE = 0;

  // Notification time range for random notifications (9 AM to 10 PM)
  private static readonly MIN_HOUR = 9;
  private static readonly MAX_HOUR = 22;

  /**
   * Initialize notification channel (Android)
   */
  static async initialize(): Promise<void> {
    try {
      // Check if notifications are supported
      const result = await LocalNotifications.checkPermissions();

      if (result.display === 'granted') {
        // Create notification channel for Android
        await LocalNotifications.createChannel({
          id: this.CHANNEL_ID,
          name: 'Habit Reminders',
          description: 'Daily reminders for your habits',
          importance: 4, // High importance
          visibility: 1, // Public
          sound: 'default',
          vibration: true,
        });
      }
    } catch (error) {
      console.error('Error initializing notifications:', error);
    }
  }

  /**
   * Generate random times for notifications during the day
   * Returns 3 unique times between MIN_HOUR and MAX_HOUR
   */
  private static generateRandomTimes(): Date[] {
    const times: Date[] = [];
    const now = new Date();
    const usedHours = new Set<number>();

    // Generate 3 unique random hours
    while (times.length < this.RANDOM_NOTIFICATION_COUNT) {
      const randomHour = Math.floor(Math.random() * (this.MAX_HOUR - this.MIN_HOUR + 1)) + this.MIN_HOUR;

      if (!usedHours.has(randomHour)) {
        usedHours.add(randomHour);
        const randomMinute = Math.floor(Math.random() * 60);

        const time = new Date();
        time.setHours(randomHour, randomMinute, 0, 0);

        // Only add if the time is in the future
        if (time > now) {
          times.push(time);
        }
      }
    }

    // Sort times chronologically
    return times.sort((a, b) => a.getTime() - b.getTime());
  }

  /**
   * Check if a habit is completed today
   */
  private static isHabitCompletedToday(habit: Habit): boolean {
    return HabitModel.isCompletedToday(habit);
  }

  /**
   * Schedule notifications for all habits
   * This should be called daily (ideally at midnight or when app starts)
   */
  static async scheduleAllHabits(habits: Habit[], language: string = 'tr'): Promise<void> {
    try {
      // First, cancel all existing scheduled notifications
      await this.cancelAllScheduledNotifications();

      // Filter out completed habits
      const incompletedHabits = habits.filter(habit => !this.isHabitCompletedToday(habit));

      if (incompletedHabits.length === 0) {
        console.log('All habits completed for today, no notifications scheduled');
        return;
      }

      // Schedule notifications for each incomplete habit
      for (const habit of incompletedHabits) {
        await this.scheduleHabitNotifications(habit, language);
      }
    } catch (error) {
      console.error('Error scheduling notifications:', error);
    }
  }

  /**
   * Schedule notifications for a single habit
   * - 3 random notifications during the day
   * - 1 final notification at 23:00
   */
  private static async scheduleHabitNotifications(habit: Habit, language: string): Promise<void> {
    try {
      const notifications: LocalNotificationSchema[] = [];
      const randomTimes = this.generateRandomTimes();
      const now = new Date();

      // Schedule 3 random notifications
      randomTimes.forEach((time, index) => {
        const notificationId = this.generateNotificationId(habit.id, 'random', index);

        notifications.push({
          id: notificationId,
          title: this.getNotificationTitle(language, 'reminder'),
          body: this.getNotificationBody(language, 'reminder', habit.name),
          schedule: {
            at: time,
            allowWhileIdle: true,
          },
          sound: 'default',
          channelId: this.CHANNEL_ID,
          extra: {
            habitId: habit.id,
            type: 'random',
          },
        });
      });

      // Schedule final reminder at 23:00 if it's still in the future
      const finalReminderTime = new Date();
      finalReminderTime.setHours(this.FINAL_REMINDER_HOUR, this.FINAL_REMINDER_MINUTE, 0, 0);

      if (finalReminderTime > now) {
        const finalNotificationId = this.generateNotificationId(habit.id, 'final', 0);

        notifications.push({
          id: finalNotificationId,
          title: this.getNotificationTitle(language, 'final'),
          body: this.getNotificationBody(language, 'final', habit.name),
          schedule: {
            at: finalReminderTime,
            allowWhileIdle: true,
          },
          sound: 'default',
          channelId: this.CHANNEL_ID,
          extra: {
            habitId: habit.id,
            type: 'final',
          },
        });
      }

      // Schedule all notifications
      if (notifications.length > 0) {
        await LocalNotifications.schedule({ notifications });
        console.log(`Scheduled ${notifications.length} notifications for habit: ${habit.name}`);
      }
    } catch (error) {
      console.error(`Error scheduling notifications for habit ${habit.id}:`, error);
    }
  }

  /**
   * Cancel notifications for a specific habit
   * Called when a habit is completed
   */
  static async cancelHabitNotifications(habitId: string): Promise<void> {
    try {
      // Get all pending notifications
      const pending = await LocalNotifications.getPending();

      // Filter notifications related to this habit
      const habitNotificationIds = pending.notifications
        .filter(notification => notification.extra?.habitId === habitId)
        .map(notification => notification.id);

      if (habitNotificationIds.length > 0) {
        await LocalNotifications.cancel({ notifications: habitNotificationIds.map(id => ({ id })) });
        console.log(`Cancelled ${habitNotificationIds.length} notifications for habit: ${habitId}`);
      }
    } catch (error) {
      console.error(`Error cancelling notifications for habit ${habitId}:`, error);
    }
  }

  /**
   * Cancel all scheduled notifications
   */
  static async cancelAllScheduledNotifications(): Promise<void> {
    try {
      const pending = await LocalNotifications.getPending();
      if (pending.notifications.length > 0) {
        await LocalNotifications.cancel({
          notifications: pending.notifications.map(n => ({ id: n.id }))
        });
        console.log(`Cancelled all ${pending.notifications.length} scheduled notifications`);
      }
    } catch (error) {
      console.error('Error cancelling all notifications:', error);
    }
  }

  /**
   * Reschedule notifications when a habit is toggled
   * If completed: cancel notifications
   * If uncompleted: schedule new notifications
   */
  static async handleHabitToggle(habit: Habit, _allHabits: Habit[], language: string): Promise<void> {
    try {
      const isCompleted = this.isHabitCompletedToday(habit);

      if (isCompleted) {
        // Cancel notifications for this habit
        await this.cancelHabitNotifications(habit.id);
      } else {
        // Schedule notifications for this habit
        await this.scheduleHabitNotifications(habit, language);
      }
    } catch (error) {
      console.error('Error handling habit toggle:', error);
    }
  }

  /**
   * Generate unique notification ID
   * Format: habitId_type_index
   */
  private static generateNotificationId(habitId: string, type: 'random' | 'final', index: number): number {
    // Create a simple hash from habitId + type + index
    const str = `${habitId}_${type}_${index}`;
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Get notification title based on type and language
   */
  private static getNotificationTitle(language: string, type: 'reminder' | 'final'): string {
    const titles = {
      tr: {
        reminder: 'Alışkanlık Hatırlatması',
        final: 'Son Hatırlatma!',
      },
      en: {
        reminder: 'Habit Reminder',
        final: 'Final Reminder!',
      },
    };

    return titles[language as 'tr' | 'en']?.[type] || titles.en[type];
  }

  /**
   * Get notification body based on type and language
   */
  private static getNotificationBody(language: string, type: 'reminder' | 'final', habitName: string): string {
    const bodies = {
      tr: {
        reminder: `"${habitName}" alışkanlığını tamamlamayı unutma!`,
        final: `Gün bitmek üzere! "${habitName}" alışkanlığını hala tamamlamadın.`,
      },
      en: {
        reminder: `Don't forget to complete your "${habitName}" habit!`,
        final: `Day is almost over! You haven't completed "${habitName}" yet.`,
      },
    };

    return bodies[language as 'tr' | 'en']?.[type] || bodies.en[type];
  }

  /**
   * Request notification permissions
   */
  static async requestPermissions(): Promise<boolean> {
    try {
      const result = await LocalNotifications.requestPermissions();
      return result.display === 'granted';
    } catch (error) {
      console.error('Error requesting notification permissions:', error);
      return false;
    }
  }

  /**
   * Check if notifications are enabled
   */
  static async checkPermissions(): Promise<boolean> {
    try {
      const result = await LocalNotifications.checkPermissions();
      return result.display === 'granted';
    } catch (error) {
      console.error('Error checking notification permissions:', error);
      return false;
    }
  }
}
