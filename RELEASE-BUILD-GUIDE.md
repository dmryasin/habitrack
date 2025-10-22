# Google Play Release Build Rehberi

## 🎯 Release AAB Oluşturma

### Ön Hazırlık

Release build yapmadan önce kontrol edin:
- [x] RevenueCat entegrasyonu tamamlandı
- [x] AdMob entegrasyonu tamamlandı (test mode'da)
- [x] Tüm özellikler test edildi
- [x] Uygulama icon ve splash screen hazır
- [x] Versiyon numarası güncellendi

## 📝 Adım 1: Keystore Oluşturun (İlk Kez)

Eğer daha önce keystore oluşturmadıysanız:

```bash
# Android Studio Terminal'de veya Command Prompt'ta
cd android
keytool -genkey -v -keystore habitrack-release.keystore -alias habitrack -keyalg RSA -keysize 2048 -validity 10000
```

**Sorulacak Bilgiler:**
- Password: **Güçlü bir şifre** (kaydedin!)
- Re-enter password: **Aynı şifre**
- First and last name: **Adınız Soyadınız**
- Organization unit: **Şirket/Takım adınız** (veya boş bırakın)
- Organization: **Şirket adınız** (veya boş bırakın)
- City/Locality: **Şehir** (örn: Istanbul)
- State/Province: **İl/Eyalet**
- Country code: **TR**

⚠️ **ÇOK ÖNEMLİ**:
- Keystore dosyasını **güvenli bir yerde** saklayın
- Şifreyi **unutmayın** ve **başka yerde** kaydedin
- Keystore kaybolursa uygulama güncellemelerini yapamazsınız!

## 📝 Adım 2: Gradle Properties Ayarlayın

Dosya oluşturun: `android/key.properties`

```properties
storeFile=habitrack-release.keystore
storePassword=SIZIN_KEYSTORE_SIFRENIZ
keyAlias=habitrack
keyPassword=SIZIN_KEY_SIFRENIZ
```

⚠️ **GÜVENLĐK**:
- Bu dosyayı `.gitignore`'a ekleyin
- GitHub'a yüklemeyin!

## 📝 Adım 3: build.gradle Güncelleme (Zaten Hazır)

`android/app/build.gradle` dosyası signing config içeriyor. Kontrol edin:

```gradle
android {
    ...
    signingConfigs {
        release {
            keyAlias keystoreProperties['keyAlias']
            keyPassword keystoreProperties['keyPassword']
            storeFile file(keystoreProperties['storeFile'])
            storePassword keystoreProperties['storePassword']
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled true
            shrinkResources true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}
```

## 📝 Adım 4: Versiyon Numarasını Güncelleyin

`android/app/build.gradle` dosyasında:

```gradle
defaultConfig {
    applicationId "com.dmrya.habitrack"
    minSdkVersion 22
    targetSdkVersion 34
    versionCode 2  // Her release'de artırın
    versionName "1.0.1"  // Semantic versioning (1.0.0 → 1.0.1)
}
```

**Versiyon Kuralları:**
- `versionCode`: Integer, her release'de artırın (1, 2, 3...)
- `versionName`: String, kullanıcıların gördüğü (1.0.0, 1.0.1, 1.1.0...)

## 📝 Adım 5: Release Build Yapın

### Yöntem 1: Gradle Komut Satırı (Önerilen)

```bash
cd android
./gradlew clean
./gradlew bundleRelease
```

Windows'ta:
```bash
cd android
gradlew.bat clean
gradlew.bat bundleRelease
```

### Yöntem 2: Android Studio

1. **Build** → **Select Build Variant**
2. **release** seçin
3. **Build** → **Build Bundle(s) / APK(s)** → **Build Bundle(s)**

## 📦 AAB Dosyası Nerede?

Build başarılı olduktan sonra:

```
android/app/build/outputs/bundle/release/app-release.aab
```

## 🔍 AAB Boyutu

- **Beklenen boyut**: ~15-30 MB (sıkıştırılmış)
- **Download size** (Play Store'da): ~8-15 MB
- **Yüklemeden sonra**: ~40-60 MB

## ✅ AAB'yi Test Edin (Opsiyonel)

### Internal Test Track'e Yükleyin:
1. Google Play Console → HabiTrack
2. **Release** → **Testing** → **Internal testing**
3. **Create new release**
4. **Upload** → `app-release.aab` seçin
5. **Release name**: v1.0.1
6. **Release notes**: Değişiklikleri yazın
7. **Save** → **Review release** → **Start rollout**

### Internal Testers Ekleyin:
1. **Internal testing** → **Testers**
2. Email listesi ekleyin
3. Test linkini paylaşın

## 🚀 Production'a Yükleme

### 1. Release Notes Hazırlayın

**Türkçe** (`release-notes-tr.txt`):
```
v1.0.1 - İlk Stabil Sürüm

✨ Yenilikler:
- Alışkanlık takibi ve istatistikler
- Bildirimler ve hatırlatıcılar
- Karanlık mod desteği
- Çoklu dil desteği (TR/EN)
- Premium abonelik sistemi
- Sınırsız alışkanlık (Premium)
- Gelişmiş grafikler ve raporlar

🐛 Düzeltmeler:
- Performans iyileştirmeleri
- Kullanıcı deneyimi geliştirmeleri

🎯 Özellikler:
- %100 ücretsiz, reklam destekli
- Premium: Reklamsız + sınırsız özellikler
```

**İngilizce** (`release-notes-en.txt`):
```
v1.0.1 - First Stable Release

✨ New Features:
- Habit tracking and statistics
- Notifications and reminders
- Dark mode support
- Multi-language support (TR/EN)
- Premium subscription system
- Unlimited habits (Premium)
- Advanced charts and reports

🐛 Bug Fixes:
- Performance improvements
- UX enhancements

🎯 Features:
- 100% free, ad-supported
- Premium: Ad-free + unlimited features
```

### 2. Production Track'e Yükleyin

1. **Google Play Console** → **HabiTrack**
2. **Release** → **Production**
3. **Create new release**
4. **Upload** → `app-release.aab`
5. **Release name**: v1.0.1 (2)
6. **Release notes**: Yukarıdaki metni yapıştırın (TR ve EN)
7. **Save**

### 3. Rollout Ayarları

- **Staged rollout** (Önerilen): %5 → %10 → %25 → %50 → %100
- **Full rollout**: Direkt %100 (riskli)

### 4. Review

1. **Review release** tıklayın
2. Tüm bilgileri kontrol edin:
   - App content declarations
   - Target audience and content
   - Privacy policy
   - Data safety
3. **Start rollout to Production** tıklayın

## ⏰ Review Süreci

- **İlk yayın**: 3-7 gün (bazen 1-2 gün)
- **Güncellemeler**: 1-3 gün
- **Hızlı review**: 24 saat içinde (şanslıysanız)

## 📊 Play Console'da İzleme

### Release Dashboard:
- **Statistics**: İndirmeler, günlük aktif kullanıcılar
- **Crashes & ANRs**: Hatalar
- **Pre-launch report**: Otomatik testler
- **Reviews**: Kullanıcı yorumları
- **Acquisitions**: Nereden geliyorlar

## 🎉 Canlıya Geçtikten Sonra

### İzlenecek Metrikler:
- **Install base**: Toplam yüklemeler
- **Active devices**: Aktif cihaz sayısı
- **Retention**: Kullanıcı tutma oranı
- **Crashes**: Çökme oranı (%1'in altında olmalı)
- **ANR rate**: App Not Responding oranı

### RevenueCat Dashboard:
- **Active subscriptions**: Aktif abonelikler
- **MRR**: Aylık tekrar eden gelir
- **Churn rate**: İptal oranı
- **Conversion rate**: Free → Premium dönüşüm

### AdMob Dashboard:
- **Impressions**: Reklam gösterimleri
- **CTR**: Tıklama oranı
- **Revenue**: Günlük/aylık gelir
- **Fill rate**: Reklam doldurma oranı

## 🔄 Güncelleme Yayınlama

Her güncellemede:

1. **versionCode** artırın: 2 → 3
2. **versionName** güncelleyin: 1.0.1 → 1.0.2
3. `npm run build` çalıştırın
4. `npx cap sync android` çalıştırın
5. `./gradlew bundleRelease` ile AAB oluşturun
6. Play Console'da yeni release oluşturun
7. Release notes yazın
8. AAB yükleyin ve rollout yapın

## ⚠️ Yaygın Hatalar ve Çözümleri

### "Keystore not found":
- `key.properties` dosyası doğru yerde mi?
- Keystore path doğru mu?

### "Signing failed":
- Şifreler doğru mu?
- Keystore alias doğru mu?

### "INSTALL_FAILED_UPDATE_INCOMPATIBLE":
- Package name değişti mi? (Değişmemeli!)
- Signing key farklı mı? (Aynı keystore kullanın!)

### "App not uploaded":
- AAB dosyası 150 MB'dan küçük mü?
- İnternet bağlantısı stabil mi?

## 📝 Checklist - Release Öncesi

- [ ] Tüm özellikler test edildi
- [ ] Crash yok
- [ ] ANR yok
- [ ] RevenueCat test edildi (gerçek cihazda)
- [ ] AdMob test ID'leri kullanılıyor (production'da değiştirilecek)
- [ ] Privacy Policy linki çalışıyor
- [ ] Icon ve splash screen doğru
- [ ] App name doğru
- [ ] Package name doğru (`com.dmrya.habitrack`)
- [ ] Versiyon numaraları güncellendi
- [ ] Keystore güvenli yerde
- [ ] Release notes hazırlandı (TR + EN)
- [ ] Google Play Console içerik dolduruldu
- [ ] Screenshots hazır (phone, tablet, 7", 10")
- [ ] Feature graphic hazır (1024x500)
- [ ] Promo video hazır (Opsiyonel)

## 🎊 İlk Yayın Sonrası

Tebrikler! Uygulamanız Google Play'de! 🎉

**İlk 24 saat:**
- Analytics'i izleyin
- Crash raporlarını kontrol edin
- İlk kullanıcı yorumlarını okuyun

**İlk hafta:**
- Retention oranını izleyin
- RevenueCat conversion'ı kontrol edin
- AdMob gelirlerini takip edin

**İlk ay:**
- A/B testler planlayın
- Kullanıcı geri bildirimlerini toplayın
- Roadmap güncelleyin

## 🚀 Başarılar!

Projeniz tamamen hazır:
- ✅ RevenueCat entegrasyonu
- ✅ AdMob entegrasyonu
- ✅ Dual monetization
- ✅ Premium features
- ✅ Multi-language
- ✅ Dark mode
- ✅ Notifications
- ✅ Statistics
- ✅ Modern UI/UX

**Google Play Store**: [Link eklenecek]
**GitHub**: https://github.com/dmryasin/habitrack
