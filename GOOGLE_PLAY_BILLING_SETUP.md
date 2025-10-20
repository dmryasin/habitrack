# Google Play Billing Kurulum Rehberi

Bu belge, Habit Tracker uygulamanızda Google Play Store üzerinden premium abonelik satışı yapabilmeniz için gerekli adımları açıklamaktadır.

## 🚀 Yapılanlar

✅ RevenueCat Capacitor plugin kuruldu
✅ Billing servisi oluşturuldu
✅ Premium satın alma sayfası güncellendi
✅ Satın alma doğrulama eklendi
✅ Satın almaları geri yükleme özelliği eklendi
✅ Android manifest'e billing permission eklendi
✅ Abonelik yönetim butonu eklendi

## 📋 Yapılması Gerekenler

### 1. RevenueCat Hesabı Oluşturma

1. [RevenueCat](https://www.revenuecat.com/) sitesine gidin ve ücretsiz hesap oluşturun
2. Dashboard'da yeni bir proje oluşturun
3. **Project Settings** > **API Keys** bölümünden API anahtarlarınızı alın:
   - Google Play için **Public Google SDK key**
   - (İleride iOS için kullanılacak) **Public Apple SDK key**

4. `src/utils/billing.ts` dosyasını açın ve API anahtarlarını güncelleyin:
```typescript
const REVENUECAT_API_KEY = {
  android: 'BURAYA_GOOGLE_PLAY_PUBLIC_KEY', // RevenueCat'ten aldığınız Google key
  ios: 'BURAYA_APP_STORE_PUBLIC_KEY',       // İleride iOS için
};
```

### 2. Google Play Console Kurulumu

#### A. Uygulama Oluşturma
1. [Google Play Console](https://play.google.com/console)'a gidin
2. "Uygulama oluştur" butonuna tıklayın
3. Uygulama detaylarını doldurun:
   - **Uygulama adı:** Habit Tracker
   - **Varsayılan dil:** Türkçe
   - **Uygulama türü:** Uygulama
   - **Ücretsiz mi, ücretli mi:** Ücretsiz

#### B. Abonelik Ürünleri Oluşturma

1. Sol menüden **Monetize** > **Subscriptions** (Abonelikler) bölümüne gidin
2. "Create subscription" butonuna tıklayın

**Aylık Abonelik:**
- **Product ID:** `premium_monthly_subscription`
- **Ad:** Premium Aylık
- **Açıklama:** Sınırsız alışkanlık ve gelişmiş özellikler
- **Fiyat:** 29.99 TRY (veya istediğiniz fiyat)
- **Yenileme süresi:** 1 ay
- **Durum:** Aktif

**Yıllık Abonelik:**
- **Product ID:** `premium_yearly_subscription`
- **Ad:** Premium Yıllık
- **Açıklama:** Sınırsız alışkanlık ve gelişmiş özellikler - 1 yıl
- **Fiyat:** 199.99 TRY (veya istediğiniz fiyat)
- **Yenileme süresi:** 1 yıl
- **Durum:** Aktif

⚠️ **ÖNEMLİ:** Product ID'lerin `src/utils/constants.ts` dosyasındaki ID'lerle tam olarak eşleşmesi gerekiyor!

#### C. Google Play ile RevenueCat'i Bağlama

1. Google Play Console'da **API access** sayfasına gidin
2. **Service account** oluşturun ve JSON anahtarını indirin
3. RevenueCat Dashboard'a gidin:
   - **Project Settings** > **Integrations** > **Google Play**
   - "Add Integration" butonuna tıklayın
   - İndirdiğiniz JSON dosyasını yükleyin

### 3. RevenueCat Dashboard - Ürünleri Tanımlama

1. RevenueCat Dashboard'da **Products** bölümüne gidin
2. "Add Product" butonuna tıklayın ve her iki ürünü ekleyin:
   - `premium_monthly_subscription`
   - `premium_yearly_subscription`

3. **Entitlements** bölümüne gidin:
   - "Add Entitlement" butonuna tıklayın
   - **Identifier:** `premium`
   - Her iki ürünü bu entitlement'a ekleyin

4. **Offerings** bölümüne gidin:
   - "Create Offering" butonuna tıklayın
   - **Identifier:** `default`
   - Her iki paketi bu offering'e ekleyin

### 4. Test Kullanıcıları Ekleme

#### Google Play Console'da Test Kullanıcıları

1. **Testing** > **Closed testing** veya **Internal testing** bölümüne gidin
2. Test grubu oluşturun
3. Test kullanıcılarının e-posta adreslerini ekleyin
4. APK/AAB yükleyin

#### RevenueCat'te Sandbox Test

1. RevenueCat Dashboard > **Customer Lists** > **Sandbox**
2. Test kullanıcılarınızı ekleyin
3. Test satın almaları yapabilirsiniz

### 5. Uygulama Build ve Yükleme

```bash
# Web build
npm run build

# Capacitor sync
npx cap sync android

# Android Studio'da açın
npx cap open android

# Android Studio'da:
# 1. Build > Generate Signed Bundle/APK
# 2. Keystore oluşturun/seçin
# 3. Release build yapın
# 4. APK/AAB dosyasını Google Play Console'a yükleyin
```

### 6. Test Etme

1. Uygulamayı test cihazınıza yükleyin
2. Premium sayfasına gidin
3. "Premium'a Geç" butonuna tıklayın
4. Google Play ödeme ekranı açılmalı
5. Test kartı ile satın alma yapın
6. Premium özellikler aktif olmalı

### 7. Production'a Geçiş

1. RevenueCat'te production API key'lerini kullandığınızdan emin olun
2. `src/utils/billing.ts` dosyasında debug modunu kapatın:
```typescript
// Debug modunu kapat
if (import.meta.env.DEV) {  // Bu satırı kaldırın veya false yapın
  await Purchases.setLogLevel({ level: LOG_LEVEL.DEBUG });
}
```

3. Google Play Console'da uygulamayı production'a alın

## 🧪 Test Kartları

Google Play test satın almaları için:
- Test kullanıcı olarak kayıtlı e-posta ile giriş yapın
- Gerçek ödeme yapılmaz, sandbox ortamında test edilir

## 📱 Özellikler

✅ **Güvenli Ödeme:** Google Play Billing API kullanılır
✅ **Otomatik Doğrulama:** RevenueCat sunucuları satın almaları doğrular
✅ **Geri Yükleme:** Kullanıcılar cihaz değiştirdiğinde aboneliklerini geri yükleyebilir
✅ **Abonelik Yönetimi:** Kullanıcılar ayarlardan aboneliklerini yönetebilir
✅ **Platform Desteği:** Hem Android hem de iOS (gelecekte)

## ⚠️ Önemli Notlar

1. **Product ID'ler:** Google Play Console'daki product ID'ler ile kodda tanımlanan ID'lerin tam eşleşmesi şart!

2. **Test Ortamı:** Development modunda web'de test için ödeme yapmadan premium aktif edilebilir. Production'da bu özellik otomatik devre dışı kalır.

3. **Fiyatlandırma:** Fiyatları Google Play Console'da güncellerseniz, `src/utils/constants.ts` dosyasındaki fiyatları da güncellemeyi unutmayın (sadece gösterim için).

4. **Komisyon:** Google Play %15-30 komisyon alır (ilk $1M için %15, sonrası %30)

5. **Vergi:** Türkiye'de KDV ve diğer vergiler otomatik hesaplanır

6. **İptal/İade:** Kullanıcılar Google Play üzerinden aboneliklerini iptal edebilir

## 🔧 Sorun Giderme

### Satın alma çalışmıyor
- RevenueCat API key'lerini kontrol edin
- Google Play Console'da ürünlerin aktif olduğundan emin olun
- Android Manifest'te BILLING permission'ının olduğundan emin olun

### Premium durumu güncellen miyor
- `BillingService.initialize()` fonksiyonunun çağrıldığından emin olun
- RevenueCat Dashboard'da entitlement ayarlarını kontrol edin

### Test satın alma çalışmıyor
- Test kullanıcısı olarak eklediğiniz e-posta ile giriş yapın
- Google Play Console'da test track'ine APK yüklenmiş olmalı

## 📚 Daha Fazla Bilgi

- [RevenueCat Docs](https://docs.revenuecat.com/)
- [Google Play Billing Docs](https://developer.android.com/google/play/billing)
- [Capacitor Docs](https://capacitorjs.com/)

## 💡 İpuçları

1. Önce internal testing ile başlayın
2. Birkaç test kullanıcısı ile test edin
3. Tüm akışları test edin (satın alma, geri yükleme, iptal)
4. Production'a geçmeden önce closed testing yapın

---

**Son Güncelleme:** Ekim 2025
**Destek:** support@habitracker.com
