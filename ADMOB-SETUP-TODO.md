# AdMob Kurulum Rehberi - TODO

## 🎯 Mevcut Durum

✅ **AdMob Capacitor Plugin Kuruldu**: `@capacitor-community/admob`
✅ **AdMob Service Kodu Yazıldı**: `src/utils/admob.ts`
✅ **App.tsx'e Entegre Edildi**: Otomatik başlatılıyor
✅ **AndroidManifest.xml Güncellendi**: Test App ID eklendi

⚠️ **TEST MOD AKTIF**: Şu an Google'ın test reklamları gösteriliyor

## 📋 Gerçek AdMob Hesabıyla Üretim Kurulumu

### Adım 1: AdMob Hesabı Oluşturun

1. https://admob.google.com adresine gidin
2. Google hesabınızla giriş yapın
3. **"Get Started"** → Hesap bilgilerini doldurun
4. Ödeme ve vergi bilgilerini ekleyin

### Adım 2: Uygulama Ekleyin

1. AdMob Dashboard → **"Apps"** → **"Add App"**
2. **Platform**: Android
3. **App name**: HabiTrack
4. **Is your app listed on Google Play**: No (henüz yayında değil)
5. **Save**

**Aldığınız AdMob App ID**'yi kaydedin:
```
ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY
```

### Adım 3: Ad Unit'leri Oluşturun

#### Banner Ad Unit:
1. **"Ad units"** → **"Add ad unit"** → **"Banner"**
2. **Ad unit name**: HabiTrack Banner
3. **Create ad unit**
4. **Ad unit ID**'yi kaydedin: `ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB`

#### Interstitial Ad Unit:
1. **"Add ad unit"** → **"Interstitial"**
2. **Ad unit name**: HabiTrack Interstitial
3. **Create ad unit**
4. **Ad unit ID**'yi kaydedin: `ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII`

#### Rewarded Ad Unit (Opsiyonel):
1. **"Add ad unit"** → **"Rewarded"**
2. **Ad unit name**: HabiTrack Rewarded
3. **Create ad unit**
4. **Ad unit ID**'yi kaydedin: `ca-app-pub-XXXXXXXXXXXXXXXX/RRRRRRRRRR`

### Adım 4: Kodları Güncelleyin

#### 1. AndroidManifest.xml
Dosya: `android/app/src/main/AndroidManifest.xml`

```xml
<!-- TEST App ID'sini değiştirin: -->
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-XXXXXXXXXXXXXXXX~YYYYYYYYYY"/>
```

#### 2. src/utils/admob.ts
```typescript
// PROD_IDS objesini gerçek Ad Unit ID'lerinizle güncelleyin:
const PROD_IDS = {
  banner: 'ca-app-pub-XXXXXXXXXXXXXXXX/BBBBBBBBBB',
  interstitial: 'ca-app-pub-XXXXXXXXXXXXXXXX/IIIIIIIIII',
  rewarded: 'ca-app-pub-XXXXXXXXXXXXXXXX/RRRRRRRRRR',
};

// Bu satırı güncelleyin:
const AD_UNIT_IDS = import.meta.env.PROD ? PROD_IDS : TEST_IDS;
```

#### 3. Test Modunu Kapatın
`src/utils/admob.ts` dosyasında:
```typescript
// Şu satırları bulun ve değiştirin:
initializeForTesting: false, // true'dan false'a
isTesting: false, // Her yerdeki true'ları false yapın
```

### Adım 5: Test Cihazlarını Ekleyin (Opsiyonel)

Gerçek cihazınızda test ederken AdMob politikasını ihlal etmemek için:

1. Uygulamayı çalıştırın
2. Logcat'te test device ID'sini bulun:
```
Use RequestConfiguration.Builder.setTestDeviceIds(Arrays.asList("XXXXXXXXXXXXXXXXXXXXXXX"))
```

3. `src/utils/admob.ts`'de ekleyin:
```typescript
testingDevices: ['XXXXXXXXXXXXXXXXXXXXXXX'],
```

### Adım 6: Build ve Test

```bash
npm run build
npx cap sync android
npx cap open android
```

Release build yaparken test mod kapalı olmalı!

## 🎯 Reklam Stratejisi

### Şu Anki Uygulama:
- ✅ **Free Kullanıcılar**: Alt kısmında sürekli banner reklam
- ✅ **Premium Kullanıcılar**: Hiç reklam yok
- ✅ **Otomatik Yönetim**: Premium durumu değişince reklamlar açılır/kapanır

### Gelecek İyileştirmeler (Opsiyonel):
- Interstitial reklamlar (her 5 habit tamamlandığında)
- Rewarded reklamlar (premium özelliklere geçici erişim)

## ⚠️ ÖNEMLİ UYARILAR

### Google AdMob Politikaları:
- ❌ Kendi reklamlarınıza tıklamayın
- ❌ Invalid traffic oluşturmayın
- ❌ Kullanıcıları reklamlara tıklamaya zorlamayın
- ✅ Test cihaz ID'lerini kullanın
- ✅ Test App ID'lerini production'da kullanmayın

### Gelir Başlatma:
- İlk reklam gösteriminden 24-48 saat sonra AdMob dashboard'da görünmeye başlar
- Ödeme eşiği: $100 (veya bölgenize göre)
- Aylık ödeme: Her ayın 21'i

## 📊 AdMob Dashboard

### Kontrol Edilecekler:
- **App Status**: Aktif
- **Ad Units**: Aktif
- **Estimated earnings**: Günlük gelir
- **Requests**: Reklam istekleri
- **Impressions**: Gösterimler
- **CTR**: Tıklama oranı

## 🆘 Sorun Giderme

### "No fill" Hatası:
- Test ID'leri kullanıyorsanız, test reklamlar her zaman doldurulur
- Gerçek ID'lerle, başlangıçta düşük fill rate normal
- Kullanıcı sayısı arttıkça fill rate yükselir

### Reklamlar Gösterilmiyor:
- AdMob App ID doğru mu?
- Ad Unit ID'ler doğru mu?
- İnternet bağlantısı var mı?
- Google Play Services yüklü mü?

### "Invalid Ad Request" Hatası:
- Test cihaz ID'si eklenmiş mi?
- Production'da test ID'leri kullanılıyor mu?

## ✅ Kurulum Checklist

### Development (Şu An):
- [x] AdMob plugin kuruldu
- [x] Service kodu yazıldı
- [x] App.tsx'e entegre edildi
- [x] Test App ID eklendi
- [x] Test modunda çalışıyor

### Production (Yapılacak):
- [ ] AdMob hesabı oluşturuldu
- [ ] Uygulama AdMob'a eklendi
- [ ] Ad Unit'ler oluşturuldu
- [ ] Gerçek App ID AndroidManifest'e eklendi
- [ ] Gerçek Ad Unit ID'ler admob.ts'e eklendi
- [ ] Test modu kapatıldı
- [ ] Test cihaz ID'leri eklendi
- [ ] Release build yapıldı
- [ ] Google Play'e yüklendi
- [ ] 24 saat sonra AdMob dashboard kontrol edildi

## 🎉 Tamamlandığında

AdMob kurulumu tamamlandıktan sonra:
1. ✅ Free kullanıcılar reklamlardan gelir sağlayacak
2. ✅ Premium kullanıcılar reklamsız deneyim yaşayacak
3. ✅ RevenueCat + AdMob ile dual monetization aktif olacak

**Tahmini Gelir**: Kullanıcı sayısı ve engagement'a bağlı, genelde:
- 1000 DAU (daily active users) = $5-20/gün
- 10,000 DAU = $50-200/gün
- 100,000 DAU = $500-2000/gün

*Not: Bu tahminler bölge, kategori ve reklam formatına göre değişir*
