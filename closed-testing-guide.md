# Google Play Console - Kapalı Test Yükleme Rehberi

## 📦 YÜKLENMESİ GEREKEN DOSYALAR

### 1. ✅ ZORUNLU: Android App Bundle (AAB) veya APK

**ÖNERİLEN: AAB (Android App Bundle)**
- Dosya adı: `app-release.aab`
- Boyut: ~5-10 MB (tahmin)
- Konum: `android/app/build/outputs/bundle/release/app-release.aab`

**VEYA**

**APK (Eski Yöntem)**
- Dosya adı: `app-release.apk`
- Konum: `android/app/build/outputs/apk/release/app-release.apk`

### 2. ❌ DİĞER DOSYALAR GEREKMİYOR

Kapalı test için sadece AAB/APK dosyası yeterlidir. Diğer tüm bilgiler Play Console arayüzünden girilir.

---

## 🔨 AAB DOSYASINI OLUŞTURMA

### Adım 1: Android Studio'da Build

1. **Android Studio**'yu açın
2. **Build → Generate Signed Bundle / APK**'ya tıklayın
3. **Android App Bundle** seçin
4. **Next** butonuna tıklayın

### Adım 2: Keystore Seçimi

Keystore bilgileriniz (Zaten mevcut):
```
Keystore Path: android/habittracker-release.keystore
Keystore Password: habittracker123
Key Alias: habitracker
Key Password: habittracker123
```

5. **Choose existing** seçin
6. Keystore path olarak: `android/habittracker-release.keystore` seçin
7. Password'leri girin
8. **Next**

### Adım 3: Build Variant

9. **Build Variant**: `release` seçin
10. **Signature Versions**: Her iki kutuyu da işaretleyin (V1 ve V2)
11. **Finish**

Build tamamlandığında:
```
android/app/build/outputs/bundle/release/app-release.aab
```
Bu konumda AAB dosyanız oluşacak.

---

## 🚀 KOMUT SATIRI İLE AAB OLUŞTURMA

Alternatif olarak terminal/cmd'den:

```bash
# 1. Clean build
cd android
./gradlew clean

# 2. Bundle oluştur
./gradlew bundleRelease

# Dosya konumu:
# android/app/build/outputs/bundle/release/app-release.aab
```

Windows için:
```cmd
cd android
gradlew clean
gradlew bundleRelease
```

---

## 📤 PLAY CONSOLE'A YÜKLEME

### 1. Play Console'a Giriş

1. https://play.google.com/console adresine gidin
2. Uygulamanızı seçin

### 2. Testing → Closed Testing

1. Sol menüden **Testing → Closed testing** seçin
2. **Create new release** butonuna tıklayın

### 3. AAB Yükleme

3. **Upload** butonuna tıklayın
4. `app-release.aab` dosyasını seçin
5. Yükleme tamamlanana kadar bekleyin

### 4. Release Notes

6. **Release name**: `1.0.0` (veya istediğiniz)
7. **Release notes** için dil seçin (Türkçe)
8. Yayın notlarını yazın:

```
v1.0.0 - İlk Sürüm

✨ Özellikler:
• Alışkanlık oluşturma ve takip sistemi
• Günlük, haftalık, aylık istatistikler
• Seri (streak) takibi
• 12+ renk ve 20+ ikon seçeneği
• 6 dil desteği (TR, EN, ES, FR, DE, IT)
• Karanlık mod (Premium)
• Bildirim hatırlatıcıları
• Premium üyelik sistemi

Bu ilk test sürümüdür. Geri bildirimleriniz için teşekkürler!
```

### 5. Test Grubu Oluşturma

9. **Testers** bölümünde **Create email list** tıklayın
10. Liste adı: "Kapalı Test Grubu"
11. Test kullanıcılarının e-posta adreslerini ekleyin:
    - Minimum 20 kişi önerilir
    - Maksimum sınır yok

12. **Save**

### 6. Gözden Geçirme ve Yayınlama

13. Tüm bilgileri kontrol edin
14. **Save** butonuna tıklayın
15. **Review release** tıklayın
16. **Start rollout to Closed testing** butonuna tıklayın

---

## ⏱️ SÜREÇ

### Yükleme Sonrası:

1. **İlk İnceleme**: 1-2 saat (Otomatik kontroller)
2. **Manuel İnceleme**: Kapalı test için genellikle yok
3. **Test Kullanılabilirliği**: 2-24 saat içinde

### Test Kullanıcıları:

Test kullanıcıları e-posta alacak:
- Google Play Store'dan uygulamayı indirebilirler
- "Tester" rozeti görürler
- Feedback verebilirler

---

## ✅ KONTROL LİSTESİ

Yüklemeden önce kontrol edin:

- [ ] AAB/APK dosyası build edildi
- [ ] Keystore ile imzalandı
- [ ] Uygulama adı doğru: "habitracker"
- [ ] Version Code: 1
- [ ] Version Name: 1.0.0
- [ ] Package name: com.habittracker.app
- [ ] Minimum SDK: API 22 (Android 5.1)
- [ ] Target SDK: API 34 (Android 14)

---

## 🔍 SORUN GİDERME

### Hata: "You uploaded an APK that is not zip aligned"
**Çözüm**: Signed bundle/APK kullanın (yukarıdaki adımlar)

### Hata: "You need to use a different version code"
**Çözüm**: `android/app/build.gradle` içinde `versionCode` artırın

### Hata: "Your app is not compliant with Google Play Policies"
**Çözüm**:
1. Store Listing tamamlanmalı
2. Content rating doldurulmalı
3. Privacy policy URL eklenmeli
4. Data safety form doldurulmalı

### Hata: "The APK is debuggable"
**Çözüm**: Release build kullanın (debug değil)

---

## 📝 TEST SÜRECİ

### Test Süresi:
- **Minimum**: 14 gün önerilir
- **Test kullanıcısı**: En az 20 kişi
- **Feedback toplama**: Google Play Console üzerinden

### Test Tamamlandıktan Sonra:
1. **Production'a geçiş**:
   - Testing → Production
   - Promote to production

2. **Veya Internal Testing'e geri dön**:
   - Daha fazla test için

---

## 🎯 ÖNEMLİ NOTLAR

1. **AAB vs APK**:
   - AAB kullanın (Google önerir, küçük boyut)
   - Play Store otomatik optimizasyon yapar

2. **Keystore Güvenliği**:
   - `habittracker-release.keystore` dosyasını güvende tutun
   - Şifreleri kaydedin
   - Kaybolursa, uygulamayı güncelleyemezsiniz!

3. **Version Management**:
   - Her yeni sürümde Version Code artmalı
   - Version Name kullanıcıya gösterilir (1.0.0, 1.1.0, vb.)

4. **İlk Yayın**:
   - Kapalı test → Open test (opsiyonel) → Production
   - Doğrudan production'a da geçebilirsiniz

---

## 🔗 FAYDALI LİNKLER

- [Play Console](https://play.google.com/console)
- [Testing Guide](https://support.google.com/googleplay/android-developer/answer/9845334)
- [AAB Format](https://developer.android.com/guide/app-bundle)
- [Release Management](https://support.google.com/googleplay/android-developer/answer/9859348)

---

## 📞 İHTİYAÇ DUYARSANIZ

Eğer AAB oluşturmada sorun yaşarsanız, bana:
- Hata mesajını
- Android Studio'dan build output'u
- Hangi adımda takıldığınızı

gönderin, birlikte çözelim!

---

**Son Güncelleme**: 2025
**Dosya**: closed-testing-guide.md
