# HabiTrack Monetizasyon Ana Rehberi

## Genel Bakış

HabiTrack uygulamasında iki gelir modeli kullanılacak:
1. **Premium Abonelikler** (RevenueCat ile)
2. **Reklam Geliri** (AdMob ile)

## Mevcut Durum

### ✅ Tamamlanan İşlemler:
- [x] RevenueCat Capacitor plugin kuruldu (`@revenuecat/purchases-capacitor`)
- [x] BillingService sınıfı oluşturuldu (`src/utils/billing.ts`)
- [x] Android API Key eklendi: `goog_WwzKyqPMLYLiUoWqQKJqcBGMHyi`
- [x] Product ID'ler tanımlandı:
  - Aylık: `habitrack_premium_monthly`
  - Yıllık: `habitrack_premium_yearly`
- [x] Entitlement ID belirlendi: `premium`

### 📋 Yapılması Gerekenler:

#### Google Play Console:
- [ ] In-app products/subscriptions oluştur
- [ ] Aylık ve yıllık abonelik ürünlerini aktifleştir
- [ ] Fiyatları belirle
- [ ] Test kullanıcıları ekle

#### RevenueCat Dashboard:
- [ ] Google Play entegrasyonunu tamamla (Service Account JSON)
- [ ] Products ekle (habitrack_premium_monthly, habitrack_premium_yearly)
- [ ] Default offering oluştur
- [ ] Packages ekle ($rc_monthly, $rc_annual)
- [ ] Entitlements'ı packages'a bağla

#### AdMob Setup:
- [ ] AdMob hesabı oluştur
- [ ] Uygulama ekle (HabiTrack)
- [ ] Ad Unit'ler oluştur (Banner, Interstitial, Rewarded)
- [ ] Capacitor AdMob plugin kur
- [ ] AdMob service kodunu yaz

## Detaylı Rehberler

### 1. Google Play Console Setup
👉 **Rehber:** `GOOGLE-PLAY-PRODUCTS-SETUP.md`

Bu rehberde:
- Subscription ürünlerinin nasıl oluşturulacağı
- Product ID'lerin belirlenmesi
- Fiyatlandırma
- Test kullanıcıları

### 2. RevenueCat Dashboard Setup
👉 **Rehber:** `REVENUECAT-DASHBOARD-SETUP.md`

Bu rehberde:
- Google Play entegrasyonu
- Entitlements oluşturma
- Products ve Offerings yapılandırması
- Test etme

### 3. AdMob Integration
👉 **Rehber:** `ADMOB-INTEGRATION-GUIDE.md`

Bu rehberde:
- AdMob hesap kurulumu
- Ad Unit'ler oluşturma
- Capacitor plugin kurulumu
- Kod entegrasyonu
- Premium/Free mantığı

## Monetizasyon Stratejisi

### Premium Abonelik Özellikleri:
✅ Unlimited habits (Free: 5 limit)
✅ Advanced statistics ve grafikler
✅ Reklamsız deneyim
✅ Özel temalar ve görünümler
✅ Cloud backup (gelecekte)
✅ Multi-device sync (gelecekte)

### Reklam Stratejisi (Free Kullanıcılar):
- **Banner Reklamlar**: Ana ekranın altında sürekli
- **Interstitial Reklamlar**: Her 3-5 habit tamamlandığında
- **Rewarded Reklamlar**: Premium özelliklere geçici erişim için

## Kod Yapısı

```
src/
├── utils/
│   ├── billing.ts          # RevenueCat entegrasyonu (✅ Hazır)
│   └── admob.ts            # AdMob entegrasyonu (📝 Oluşturulacak)
├── components/
│   ├── PremiumModal.tsx    # Premium satış sayfası
│   ├── AdBanner.tsx        # Banner reklam component
│   └── RewardedAdButton.tsx # Ödüllü reklam butonu
└── pages/
    └── Premium.tsx         # Premium özellikleri sayfası
```

## Kullanım Örnekleri

### Premium Durumunu Kontrol Etme:

```typescript
import { BillingService } from '@/utils/billing';

// Kullanıcı premium mi?
const isPremium = await BillingService.checkPremiumStatus();

if (isPremium) {
  // Premium özellikleri göster
} else {
  // Free özellikleri göster + reklamlar
}
```

### Premium Satın Alma:

```typescript
// Paketleri getir
const packages = await BillingService.getAvailablePackages();

// Aylık paketi bul
const monthlyPackage = packages.find(p =>
  p.identifier === '$rc_monthly'
);

// Satın alma
const result = await BillingService.purchasePremium(monthlyPackage);

if (result.success) {
  // Satın alma başarılı
  toast.success('Premium aktif edildi!');
}
```

### Reklam Gösterme (Premium değilse):

```typescript
import { AdMobService } from '@/utils/admob';

const shouldShowAds = await AdMobService.shouldShowAds(isPremium);

if (shouldShowAds) {
  // Banner göster
  await AdMobService.showBanner();

  // Belirli noktalarda interstitial
  await AdMobService.showInterstitial();
}
```

## Test Süreci

### 1. Development (Test Anahtarları):
- RevenueCat Sandbox mode
- AdMob test ad unit IDs
- Test kullanıcı hesabı ile test

### 2. Internal Testing:
- Google Play Internal Test Track
- RevenueCat production keys (test mode)
- AdMob gerçek ID'ler (test cihazları ile)

### 3. Closed Testing:
- RevenueCat production
- AdMob production
- Gerçek satın alma testleri (License testers ile ücretsiz)

### 4. Production:
- Tüm ayarlar production
- Gerçek kullanıcılar
- Gelir takibi

## Önemli Notlar

### RevenueCat:
- API anahtarları client-side güvenlidir (public keys)
- Server-side doğrulama için webhook kullanılabilir
- Subscription durumu otomatik yenilenir
- Cross-platform restore mümkün

### AdMob:
- Test ID'leri production'da kullanılmamalı
- Invalid traffic yasaktır
- Premium kullanıcılara asla reklam gösterme
- Reklam sıklığı kullanıcı deneyimini etkilemez şekilde ayarlanmalı

### Google Play Policies:
- Aboneliklerde açık ve net bilgi verilmeli
- İptal ve geri ödeme politikaları belirtilmeli
- Fiyatlar görünür olmalı
- Auto-renewal açıkça belirtilmeli

## Analytics ve Tracking

### Önerilen Metrikler:
- Free → Premium conversion rate
- Abonelik iptal oranı (churn rate)
- Reklam gösterim/tıklama oranları (CTR)
- ARPU (Average Revenue Per User)
- LTV (Lifetime Value)

### Önerilen Tools:
- RevenueCat Charts (built-in analytics)
- Google Analytics for Firebase
- AdMob reporting
- Google Play Console metrics

## Sonraki Adımlar

1. **Hemen Şimdi:**
   - [ ] Google Play Console'da subscriptions oluştur
   - [ ] RevenueCat Dashboard'ı tamamla
   - [ ] Test satın alma yap

2. **Kısa Vadeli:**
   - [ ] AdMob hesabı oluştur ve entegre et
   - [ ] Premium özellikleri UI'da göster
   - [ ] Pricing page tasarla

3. **Orta Vadeli:**
   - [ ] A/B testing yap (fiyatlar, paketler)
   - [ ] Promotion codes sistemi ekle
   - [ ] Referral program

4. **Uzun Vadeli:**
   - [ ] Cloud backup premium özelliği
   - [ ] Multi-device sync
   - [ ] Web app premium

## Destek ve Kaynaklar

- **RevenueCat Docs**: https://docs.revenuecat.com
- **Google Play Billing**: https://developer.android.com/google/play/billing
- **AdMob Help**: https://support.google.com/admob
- **Capacitor Docs**: https://capacitorjs.com

## Sorular?

Herhangi bir adımda takılırsanız, ilgili rehberlere bakın veya bana sorun!
