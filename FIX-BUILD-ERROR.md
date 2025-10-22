# Build Hatasını Düzeltme

## Android Studio'da Build Hatasını Görme

1. **Build penceresini açın:**
   - Alt menüde **Build** sekmesine tıklayın
   - Veya **View → Tool Windows → Build**

2. **Hata detaylarını görün:**
   - Kırmızı hata mesajlarını okuyun
   - Veya "Download info" linkine tıklayın

## Muhtemel Hatalar ve Çözümleri

### 1. Kotlin Dependency Hatası

**Hata mesajı:** "Duplicate class kotlin..."

**Çözüm:**
```
android/app/build.gradle dosyasını kontrol edin.
Zaten aşağıdaki kodlar eklenmiş olmalı:

configurations.all {
    exclude group: 'org.jetbrains.kotlin', module: 'kotlin-stdlib-jdk7'
    exclude group: 'org.jetbrains.kotlin', module: 'kotlin-stdlib-jdk8'
}
```

✅ Bu çözüm zaten uygulandı!

### 2. Gradle Sync Hatası

**Çözüm:**
1. **File → Invalidate Caches / Restart**
2. **Invalidate and Restart** seçin
3. Android Studio yeniden başladıktan sonra:
4. **File → Sync Project with Gradle Files**

### 3. Missing SDK/NDK

**Hata mesajı:** "SDK location not found"

**Çözüm:**
1. **Tools → SDK Manager**
2. Şunları kontrol edin:
   - Android SDK 34 yüklü
   - Android SDK Build-Tools 34.0.0
   - Android SDK Platform-Tools

### 4. Build Tools Version Hatası

**Çözüm:**
`android/build.gradle` kontrol edin:
```gradle
buildToolsVersion = "34.0.0"
compileSdk = 34
targetSdk = 34
```

## Hızlı Çözüm Adımları

1. **Clean Project:**
   ```
   Build → Clean Project
   ```
   2-3 dakika bekleyin

2. **Sync Gradle:**
   ```
   File → Sync Project with Gradle Files
   ```

3. **Rebuild:**
   ```
   Build → Rebuild Project
   ```

4. **Tekrar Bundle Oluştur:**
   ```
   Build → Generate Signed Bundle / APK
   ```

## Eğer Hala Hata Varsa

**Build penceresinde tam hata mesajını kopyalayın ve bana gönderin:**

1. Build penceresinde hata mesajına sağ tıklayın
2. **Copy** seçin
3. Tüm hata metnini bana gönderin

## Alternatif: APK Oluştur (AAB yerine)

Eğer AAB build etmede sorun varsa, APK oluşturabilirsiniz:

1. **Build → Generate Signed Bundle / APK**
2. Bu sefer **APK** seçin
3. Keystore bilgilerini girin
4. **release** variant seçin
5. **Finish**

APK dosyası:
```
android/app/build/outputs/apk/release/app-release.apk
```

**Not:** Google AAB'yi tercih eder ama APK de kabul edilir.

## Son Çare: Capacitor Build

```bash
npx cap build android
```

Bu komut otomatik olarak build yapacaktır.

---

**Hatayı çözmek için hata mesajını görmem gerekiyor!**
Android Studio'da Build penceresindeki tam hata mesajını paylaşın.
