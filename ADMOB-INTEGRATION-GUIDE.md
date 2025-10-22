# Google AdMob Entegrasyonu Rehberi

## Genel Bakış

Premium aboneliği olmayan kullanıcılara reklam göstererek ek gelir elde edebilirsiniz. Google AdMob, Android uygulamaları için en popüler reklam platformudur.

## Adım 1: AdMob Hesabı Oluşturma

1. https://admob.google.com adresine gidin
2. Google hesabınızla giriş yapın
3. **"Get Started"** butonuna tıklayın
4. Gerekli bilgileri doldurun:
   - Ödeme bilgileri
   - Vergi bilgileri
   - Hesap ayarları

## Adım 2: Uygulama Ekleme

1. AdMob Dashboard'da **"Apps"** seçeneğine tıklayın
2. **"Add App"** butonuna tıklayın
3. **"Android"** seçin
4. Google Play Store'da yayınlandı mı? → **"No"** (Henüz test aşamasında)
5. Uygulama bilgilerini girin:
   - App Name: **HabiTrack**
   - Package Name: **com.dmrya.habitrack**

## Adım 3: Reklam Birimleri Oluşturma

### 1. Banner Reklam (Ana ekranda sürekli gösterim)
```
Ad Unit Name: HabiTrack Banner
Format: Banner
Adaptive Banner: Enabled
Ad Unit ID: ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY (AdMob tarafından otomatik oluşturulur)
```

### 2. Interstitial Reklam (Tam ekran, belirli aksiyonlarda)
```
Ad Unit Name: HabiTrack Interstitial
Format: Interstitial
Ad Unit ID: ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
```

### 3. Rewarded Reklam (İzleyince ödül veren)
```
Ad Unit Name: HabiTrack Rewarded
Format: Rewarded
Reward: Premium özellik erişimi (geçici)
Ad Unit ID: ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY
```

## Adım 4: Capacitor AdMob Plugin Kurulumu

Terminal'de şu komutları çalıştırın:

```bash
npm install @capacitor-community/admob
npx cap sync
```

## Adım 5: Android Konfigürasyonu

### android/app/src/main/AndroidManifest.xml

Manifest dosyasına AdMob App ID ekleyin:

```xml
<application>
    <!-- ... diğer ayarlar ... -->

    <!-- AdMob App ID -->
    <meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"/>
</application>
```

## Adım 6: TypeScript Entegrasyonu

Yeni bir dosya oluşturun: `src/utils/admob.ts`

```typescript
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, InterstitialAdOptions, RewardAdOptions } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

// AdMob Test IDs (Geliştirme için)
// Production'da gerçek ID'lerle değiştirilecek
const TEST_IDS = {
  banner: 'ca-app-pub-3940256099942544/6300978111',
  interstitial: 'ca-app-pub-3940256099942544/1033173712',
  rewarded: 'ca-app-pub-3940256099942544/5224354917',
};

// Production Ad Unit IDs (AdMob Dashboard'dan alınacak)
const PROD_IDS = {
  banner: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
  rewarded: 'ca-app-pub-XXXXXXXXXXXXXXXX/YYYYYYYYYY',
};

// Ortama göre ID seçimi
const AD_UNIT_IDS = import.meta.env.PROD ? PROD_IDS : TEST_IDS;

export class AdMobService {
  private static initialized = false;

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
        testingDevices: ['YOUR_TEST_DEVICE_ID'], // Test cihazlarınızı ekleyin
      });

      this.initialized = true;
      console.log('AdMob initialized successfully');
    } catch (error) {
      console.error('Failed to initialize AdMob:', error);
    }
  }

  /**
   * Banner reklam gösterir
   */
  static async showBanner(): Promise<void> {
    try {
      if (!this.initialized) await this.initialize();

      const options: BannerAdOptions = {
        adId: AD_UNIT_IDS.banner,
        adSize: BannerAdSize.ADAPTIVE_BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
      };

      await AdMob.showBanner(options);
    } catch (error) {
      console.error('Error showing banner ad:', error);
    }
  }

  /**
   * Banner reklamı gizler
   */
  static async hideBanner(): Promise<void> {
    try {
      await AdMob.hideBanner();
    } catch (error) {
      console.error('Error hiding banner ad:', error);
    }
  }

  /**
   * Interstitial (tam ekran) reklam gösterir
   */
  static async showInterstitial(): Promise<void> {
    try {
      if (!this.initialized) await this.initialize();

      const options: InterstitialAdOptions = {
        adId: AD_UNIT_IDS.interstitial,
      };

      await AdMob.prepareInterstitial(options);
      await AdMob.showInterstitial();
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
    }
  }

  /**
   * Rewarded (ödüllü) reklam gösterir
   */
  static async showRewardedAd(): Promise<boolean> {
    try {
      if (!this.initialized) await this.initialize();

      const options: RewardAdOptions = {
        adId: AD_UNIT_IDS.rewarded,
      };

      await AdMob.prepareRewardVideoAd(options);
      const result = await AdMob.showRewardVideoAd();

      // Kullanıcı reklamı sonuna kadar izledi mi?
      return result.rewarded;
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
      return false;
    }
  }

  /**
   * Premium kullanıcı mı kontrol eder
   * Premium kullanıcılara reklam gösterilmez
   */
  static async shouldShowAds(isPremium: boolean): Promise<boolean> {
    const platform = Capacitor.getPlatform();

    // Web'de veya premium kullanıcılara reklam gösterme
    if (platform === 'web' || isPremium) {
      return false;
    }

    return true;
  }
}
```

## Adım 7: Uygulamaya Entegrasyon

### Ana Component'te (App.tsx veya index.tsx):

```typescript
import { useEffect } from 'react';
import { AdMobService } from './utils/admob';
import { BillingService } from './utils/billing';

function App() {
  useEffect(() => {
    // AdMob'u başlat
    AdMobService.initialize();

    // Premium durumuna göre reklam göster
    checkAndShowAds();
  }, []);

  const checkAndShowAds = async () => {
    const isPremium = await BillingService.checkPremiumStatus();
    const shouldShowAds = await AdMobService.shouldShowAds(isPremium);

    if (shouldShowAds) {
      // Banner reklamı göster
      await AdMobService.showBanner();
    }
  };

  return (
    // ... uygulama içeriği
  );
}
```

### Belirli Noktalarda Interstitial Reklam:

```typescript
// Örnek: Habit tamamlandığında
const onHabitComplete = async () => {
  // Habit'i tamamla
  completeHabit();

  // Premium değilse reklam göster
  const isPremium = await BillingService.checkPremiumStatus();
  if (!isPremium) {
    // Her 3 tamamlamada bir reklam göster
    const completionCount = getCompletionCount();
    if (completionCount % 3 === 0) {
      await AdMobService.showInterstitial();
    }
  }
};
```

### Rewarded Reklam (Premium Özellik Kilidi Açma):

```typescript
// Örnek: Gelişmiş istatistikleri görmek için reklam izleme
const unlockAdvancedStats = async () => {
  const rewarded = await AdMobService.showRewardedAd();

  if (rewarded) {
    // Kullanıcı reklamı izledi, geçici erişim ver
    setTemporaryPremiumAccess(true);

    // 24 saat sonra kilitle
    setTimeout(() => {
      setTemporaryPremiumAccess(false);
    }, 24 * 60 * 60 * 1000);
  }
};
```

## Adım 8: Test Etme

### Test Cihazı Ekleme:
1. Uygulamayı çalıştırın
2. Logcat'te test device ID'nizi bulun
3. `admob.ts` dosyasında `testingDevices` dizisine ekleyin

### Test Reklamları:
- Geliştirme sırasında **sadece test reklam ID'lerini** kullanın
- Gerçek ID'lerle test ederseniz hesabınız ban yiyebilir

## Adım 9: Production'a Hazırlık

1. **AdMob Dashboard'dan gerçek Ad Unit ID'leri alın**
2. **`PROD_IDS` objesini güncelleyin**
3. **AndroidManifest.xml'de gerçek App ID'yi kullanın**
4. **Test device ID'lerini kaldırın**
5. **Build yapın ve test edin**

## En İyi Pratikler

### Reklam Gösterimi:
- ❌ Her aksiyonda reklam göstermeyin (kullanıcı deneyimi kötü olur)
- ✅ Belirli aralıklarla gösterin (örn: her 3-5 aksiyonda bir)
- ✅ Premium kullanıcılara asla reklam göstermeyin
- ✅ Banner reklamları sürekli, interstitial'lar seyrek

### Gelir Optimizasyonu:
- Rewarded reklamlar en yüksek geliri sağlar
- Banner reklamlar sürekli gelir sağlar
- Interstitial reklamlar dikkatli kullanılmalı

### AdMob Politikaları:
- Invalid trafik yasaklanmıştır
- Test ID'leri production'da kullanılamaz
- Reklamları zorla tıklattırmak yasaktır

## Sonraki Adımlar:

1. ✅ AdMob hesabı oluştur
2. ✅ Uygulama ekle ve Ad Unit ID'leri al
3. ✅ Capacitor plugin'ini yükle
4. ✅ Kodu entegre et
5. ✅ Test et (test ID'leri ile)
6. ✅ Production ID'leri ile güncelle
7. ✅ Play Store'a yükle

## Bana Bildirin:
✅ AdMob hesabı oluşturuldu mu?
✅ Ad Unit ID'leri alındı mı?
✅ Plugin kurulumu yapılsın mı?
