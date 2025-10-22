// @ts-nocheck
import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

// AdMob Test IDs (Google'ın resmi test ID'leri)
// ÖNEMLİ: Production'da gerçek AdMob ID'lerinizle değiştirin
const TEST_IDS = {
  banner: 'ca-app-pub-3940256099942544/6300978111',
  interstitial: 'ca-app-pub-3940256099942544/1033173712',
  rewarded: 'ca-app-pub-3940256099942544/5224354917',
};

// Production Ad Unit IDs
// TODO: AdMob Dashboard'dan gerçek ID'lerinizi buraya ekleyin
const PROD_IDS = {
  banner: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  rewarded: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
};

// Şu an test ID'leri kullanılıyor (production'da PROD_IDS kullanın)
const AD_UNIT_IDS = TEST_IDS; // Production: import.meta.env.PROD ? PROD_IDS : TEST_IDS;

/**
 * AdMob Service
 * Free kullanıcılara reklam gösterir, premium kullanıcılara göstermez
 */
export class AdMobService {
  private static initialized = false;
  private static bannerVisible = false;
  private static interstitialReady = false;

  /**
   * AdMob SDK'sını başlatır
   */
  static async initialize(): Promise<void> {
    if (this.initialized) return;

    const platform = Capacitor.getPlatform();
    if (platform === 'web') {
      console.warn('AdMob is not available on web platform');
      return;
    }

    try {
      await AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: [], // Test cihaz ID'lerinizi buraya ekleyin
        initializeForTesting: true, // Test modunda
      });

      this.initialized = true;
      console.log('AdMob initialized successfully');

      // Interstitial reklamı hazırla
      this.prepareInterstitial();
    } catch (error) {
      console.error('Failed to initialize AdMob:', error);
    }
  }

  /**
   * Banner reklam gösterir
   * @param isPremium - Premium kullanıcı mı?
   */
  static async showBanner(isPremium: boolean = false): Promise<void> {
    if (isPremium || this.bannerVisible) return;

    const platform = Capacitor.getPlatform();
    if (platform === 'web') return;

    try {
      if (!this.initialized) await this.initialize();

      const options = {
        adId: AD_UNIT_IDS.banner,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: true, // Production'da false yapın
      };

      await AdMob.showBanner(options);
      this.bannerVisible = true;
      console.log('Banner ad shown');
    } catch (error) {
      console.error('Error showing banner ad:', error);
    }
  }

  /**
   * Banner reklamı gizler
   */
  static async hideBanner(): Promise<void> {
    if (!this.bannerVisible) return;

    try {
      await AdMob.hideBanner();
      this.bannerVisible = false;
      console.log('Banner ad hidden');
    } catch (error) {
      console.error('Error hiding banner ad:', error);
    }
  }

  /**
   * Banner reklamı kaldırır (tamamen)
   */
  static async removeBanner(): Promise<void> {
    if (!this.bannerVisible) return;

    try {
      await AdMob.removeBanner();
      this.bannerVisible = false;
      console.log('Banner ad removed');
    } catch (error) {
      console.error('Error removing banner ad:', error);
    }
  }

  /**
   * Interstitial (tam ekran) reklam hazırlar
   */
  private static async prepareInterstitial(): Promise<void> {
    const platform = Capacitor.getPlatform();
    if (platform === 'web') return;

    try {
      await AdMob.prepareInterstitial({
        adId: AD_UNIT_IDS.interstitial,
        isTesting: true, // Production'da false yapın
      });
      this.interstitialReady = true;
      console.log('Interstitial ad prepared');
    } catch (error) {
      console.error('Error preparing interstitial ad:', error);
      this.interstitialReady = false;
    }
  }

  /**
   * Interstitial (tam ekran) reklam gösterir
   * @param isPremium - Premium kullanıcı mı?
   */
  static async showInterstitial(isPremium: boolean = false): Promise<void> {
    if (isPremium) return;

    const platform = Capacitor.getPlatform();
    if (platform === 'web') return;

    try {
      if (!this.initialized) await this.initialize();

      if (!this.interstitialReady) {
        await this.prepareInterstitial();
      }

      if (this.interstitialReady) {
        await AdMob.showInterstitial();
        console.log('Interstitial ad shown');

        // Bir sonraki için hazırla
        this.interstitialReady = false;
        setTimeout(() => this.prepareInterstitial(), 1000);
      }
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
      // Hata olursa tekrar hazırla
      setTimeout(() => this.prepareInterstitial(), 5000);
    }
  }

  /**
   * Rewarded (ödüllü) reklam gösterir
   * @param isPremium - Premium kullanıcı mı?
   * @returns Kullanıcı reklamı sonuna kadar izledi mi?
   */
  static async showRewardedAd(isPremium: boolean = false): Promise<boolean> {
    if (isPremium) return false;

    const platform = Capacitor.getPlatform();
    if (platform === 'web') return false;

    try {
      if (!this.initialized) await this.initialize();

      await AdMob.prepareRewardVideoAd({
        adId: AD_UNIT_IDS.rewarded,
        isTesting: true, // Production'da false yapın
      });

      const result = await AdMob.showRewardVideoAd();

      // Kullanıcı reklamı sonuna kadar izledi mi?
      const rewarded = result && typeof result === 'object' && 'type' in result;

      if (rewarded) {
        console.log('User earned reward from ad');
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
      return false;
    }
  }

  /**
   * Premium kullanıcı mı kontrol eder ve reklamları yönetir
   * @param isPremium - Premium kullanıcı mı?
   */
  static async updateAdVisibility(isPremium: boolean): Promise<void> {
    if (isPremium) {
      // Premium kullanıcı: Tüm reklamları kapat
      await this.removeBanner();
    } else {
      // Free kullanıcı: Banner göster
      await this.showBanner(false);
    }
  }
}
