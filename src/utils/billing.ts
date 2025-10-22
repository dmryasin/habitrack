// @ts-nocheck
import * as Purchases from '@revenuecat/purchases-capacitor';
import type { CustomerInfo, PurchasesPackage } from '@revenuecat/purchases-capacitor';
import { Capacitor } from '@capacitor/core';

const { LOG_LEVEL } = Purchases;

// RevenueCat API Keys
// ÖNEMLİ: Bu anahtarları Google Play Console ve App Store Connect'ten almanız gerekiyor
const REVENUECAT_API_KEY = {
  android: 'BURAYA_GOOGLE_PLAY_API_KEY_GELECEK', // Google Play public key
  ios: 'BURAYA_APP_STORE_API_KEY_GELECEK', // App Store public key
};

// Premium entitlement identifier (RevenueCat dashboard'da tanımlanacak)
const PREMIUM_ENTITLEMENT_ID = 'premium';

export class BillingService {
  private static initialized = false;

  /**
   * RevenueCat SDK'sini başlatır
   * Uygulama açılışında bir kere çağrılmalı
   */
  static async initialize(): Promise<void> {
    if (this.initialized) return;

    try {
      const platform = Capacitor.getPlatform();

      // Web'de billing çalışmaz, sadece native platformlarda
      if (platform === 'web') {
        console.warn('Billing is not available on web platform');
        return;
      }

      const apiKey = platform === 'android'
        ? REVENUECAT_API_KEY.android
        : REVENUECAT_API_KEY.ios;

      // RevenueCat'i yapılandır
      await Purchases.configure({
        apiKey,
        appUserID: undefined, // Otomatik anonymous ID kullanılır
      });

      // Debug modunu aktifleştir (production'da kapatılmalı)
      if (import.meta.env.DEV) {
        await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
      }

      this.initialized = true;
      console.log('RevenueCat initialized successfully');
    } catch (error) {
      console.error('Failed to initialize RevenueCat:', error);
      throw error;
    }
  }

  /**
   * Kullanıcının premium durumunu kontrol eder
   */
  static async checkPremiumStatus(): Promise<boolean> {
    try {
      const platform = Capacitor.getPlatform();

      // Web'de her zaman false döner
      if (platform === 'web') {
        return false;
      }

      if (!this.initialized) {
        await this.initialize();
      }

      const customerInfo = await Purchases.getCustomerInfo();

      // Premium entitlement'ın aktif olup olmadığını kontrol et
      const isPremium = customerInfo.customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID] !== undefined;

      return isPremium;
    } catch (error) {
      console.error('Error checking premium status:', error);
      return false;
    }
  }

  /**
   * Satın alınabilir paketleri getirir
   */
  static async getAvailablePackages(): Promise<PurchasesPackage[]> {
    try {
      const platform = Capacitor.getPlatform();

      if (platform === 'web') {
        return [];
      }

      if (!this.initialized) {
        await this.initialize();
      }

      const offerings = await Purchases.getOfferings();

      // Current offering'in paketlerini döndür
      if (offerings.current && offerings.current.availablePackages) {
        return offerings.current.availablePackages;
      }

      return [];
    } catch (error) {
      console.error('Error getting available packages:', error);
      return [];
    }
  }

  /**
   * Premium satın alma işlemini başlatır
   * @param packageToPurchase Satın alınacak paket (monthly veya yearly)
   */
  static async purchasePremium(packageToPurchase: PurchasesPackage): Promise<{
    success: boolean;
    customerInfo?: CustomerInfo;
    error?: string;
  }> {
    try {
      const platform = Capacitor.getPlatform();

      if (platform === 'web') {
        return {
          success: false,
          error: 'Purchases are not available on web'
        };
      }

      if (!this.initialized) {
        await this.initialize();
      }

      // Satın alma işlemini başlat
      const result = await Purchases.purchasePackage({
        aPackage: packageToPurchase,
      });

      // Satın alma başarılı mı kontrol et
      const isPremium = result.customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID] !== undefined;

      if (isPremium) {
        return {
          success: true,
          customerInfo: result.customerInfo,
        };
      } else {
        return {
          success: false,
          error: 'Purchase completed but premium not activated',
        };
      }
    } catch (error: any) {
      console.error('Error purchasing premium:', error);

      // Kullanıcı satın almayı iptal ettiyse
      if (error.code === 'USER_CANCELLED') {
        return {
          success: false,
          error: 'Purchase cancelled by user',
        };
      }

      return {
        success: false,
        error: error.message || 'Failed to purchase premium',
      };
    }
  }

  /**
   * Önceki satın almaları geri yükler
   * Kullanıcı uygulamayı yeniden yüklediğinde veya yeni cihaza geçtiğinde kullanılır
   */
  static async restorePurchases(): Promise<{
    success: boolean;
    isPremium: boolean;
    error?: string;
  }> {
    try {
      const platform = Capacitor.getPlatform();

      if (platform === 'web') {
        return {
          success: false,
          isPremium: false,
          error: 'Restore is not available on web'
        };
      }

      if (!this.initialized) {
        await this.initialize();
      }

      const customerInfo = await Purchases.restorePurchases();
      const isPremium = customerInfo.customerInfo.entitlements.active[PREMIUM_ENTITLEMENT_ID] !== undefined;

      return {
        success: true,
        isPremium,
      };
    } catch (error: any) {
      console.error('Error restoring purchases:', error);
      return {
        success: false,
        isPremium: false,
        error: error.message || 'Failed to restore purchases',
      };
    }
  }

  /**
   * Aboneliği iptal etme/yönetme sayfasını açar
   */
  static async openManageSubscription(): Promise<void> {
    try {
      const platform = Capacitor.getPlatform();

      if (platform === 'android') {
        // Android için Google Play abonelik yönetim sayfası
        window.open('https://play.google.com/store/account/subscriptions', '_system');
      } else if (platform === 'ios') {
        // iOS için App Store abonelik yönetim sayfası
        window.open('https://apps.apple.com/account/subscriptions', '_system');
      }
    } catch (error) {
      console.error('Error opening subscription management:', error);
    }
  }
}
