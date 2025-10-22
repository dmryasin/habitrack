# "Device or user is not allowed to make the purchase" Hatası Çözümü

## Sorun

```
Error: The device or user is not allowed to make the purchase.
Available packages: 0
```

Bu hata, uygulamanızın Google Play Billing sistemine erişim yetkisi olmadığı anlamına gelir.

## Neden Oluşur?

1. ❌ Uygulama Google Play Store'dan indirilmemiş (debug build kullanılıyor)
2. ❌ Subscription'lar Google Play Console'da aktif değil
3. ❌ Test kullanıcısı eklenmemiş
4. ❌ Uygulama henüz test track'inde yayınlanmamış

## Çözüm: Adım Adım

### Çözüm 1: Internal Testing Track Kullanımı (ÖNERİLEN)

Internal testing, en hızlı test yöntemidir. Birkaç dakika içinde aktif olur.

#### 1.1. Google Play Console'da Internal Testing Oluştur

1. [Google Play Console](https://play.google.com/console) → Uygulamanız
2. Sol menü: `Testing` → `Internal testing`
3. `Create new release` butonuna tıklayın

#### 1.2. AAB Dosyası Yükle

```bash
# Build oluştur
npm run build
npx cap sync android

# Android Studio'da AAB oluştur:
# Build → Generate Signed Bundle / APK → Android App Bundle
# Release modda, keystore ile imzalayın
```

AAB dosyasını Internal testing'e yükleyin:
- `android/app/release/app-release.aab`

#### 1.3. Tester Listesi Oluştur

1. Internal testing sayfasında `Testers` sekmesine gidin
2. `Create email list` butonuna tıklayın
3. Liste adı: "Internal Testers"
4. **Kendi Gmail adresinizi** ekleyin (Google Play Store'da kullandığınız)
5. `Save changes`

#### 1.4. Release'i Yayınla

1. `Review and rollout release` → `Start rollout to Internal testing`
2. **5-10 dakika** içinde yayınlanır

#### 1.5. Opt-in Link ile Teste Katılın

1. Internal testing sayfasında **"Copy link"** butonuna tıklayın
2. Link'i kopyalayın (şuna benzer):
   ```
   https://play.google.com/apps/internaltest/XXXXXXXXX
   ```
3. **Android cihazınızda** bu link'i açın
4. "Become a tester" butonuna tıklayın
5. Google Play Store'dan uygulamayı indirin/güncelleyin

#### 1.6. Test Edin

1. Google Play Store'dan indirilen uygulamayı açın
2. Premium sayfasına gidin
3. Artık paketler görünmeli!

---

### Çözüm 2: License Testing (Hızlı Test İçin)

Debug build ile test yapmak istiyorsanız (Android Studio'dan direkt Run):

#### 2.1. License Testers Ekle

1. Google Play Console → `Setup` → `License testing`
2. **"License testers"** bölümüne Gmail adresinizi ekleyin
3. **Response**: `RESPOND_NORMALLY` seçin
4. `Save changes`

#### 2.2. Test Hesabını Cihaza Ekle

1. Android cihazınızda `Settings` → `Accounts`
2. License testing'e eklediğiniz Gmail hesabının ekli olduğundan emin olun
3. Google Play Store'da bu hesapla oturum açın

#### 2.3. Subscriptions'ları Aktif Edin

1. Google Play Console → `Monetization setup` → `Subscriptions`
2. Her iki subscription'ı kontrol edin:
   - `premium_monthly_subscription`
   - `premium_yearly_subscription`

**Her biri için:**
- Status: **Active** olmalı ✅
- Base plan oluşturulmuş olmalı
- Fiyat belirlenmiş olmalı

Eğer **Draft** veya **Inactive** ise:
- Subscription'a tıklayın
- `Activate subscription` butonuna tıklayın

---

### Çözüm 3: Closed Testing (Production-like Test)

Production'a yakın test için:

#### 3.1. Closed Testing Track Oluştur

1. Google Play Console → `Testing` → `Closed testing`
2. Track oluşturun: "Beta testers"
3. AAB yükleyin
4. Tester list oluşturun ve Gmail adresinizi ekleyin
5. Release'i yayınlayın (birkaç saat sürebilir)

#### 3.2. Opt-in ve İndirme

Internal testing ile aynı adımları izleyin.

---

## Önemli Kontroller

### ✅ RevenueCat Service Credentials

RevenueCat'in Google Play ile konuşabilmesi için service account credentials gerekli:

1. **Google Cloud Console'da Service Account Oluştur:**
   - [Google Cloud Console](https://console.cloud.google.com/)
   - Projenizi seçin
   - `IAM & Admin` → `Service Accounts`
   - `Create Service Account`
   - Name: "RevenueCat Service Account"
   - Role: **None** (Google Play yönetimi için gerek yok)
   - `Create Key` → `JSON` formatında indirin

2. **Google Play Console'da İzin Ver:**
   - Google Play Console → `Users and permissions` → `Invite new users`
   - Service account email'ini ekleyin (şuna benzer: `xxxxx@yyyy.iam.gserviceaccount.com`)
   - **Permissions:**
     - `View app information and download bulk reports (read-only)` ✅
     - `View financial data, orders, and cancellation survey responses` ✅
     - `Manage orders and subscriptions` ✅
   - `Invite user`

3. **RevenueCat'e Yükle:**
   - [RevenueCat Dashboard](https://app.revenuecat.com/)
   - `Project Settings` → `Google Play`
   - `Upload Service Account JSON`
   - İndirdiğiniz JSON dosyasını yükleyin
   - `Save`

### ✅ Bundle ID Kontrolü

1. `android/app/build.gradle`:
   ```gradle
   applicationId "com.dmrya.habitracker"
   ```

2. RevenueCat Dashboard → `Project Settings` → `Apps`:
   - Android Package name: `com.dmrya.habitracker` olmalı

3. Google Play Console'da da aynı package name olmalı

---

## Hangi Yöntem Daha İyi?

| Yöntem | Hız | Kullanım | Önerilen |
|--------|-----|---------|----------|
| **Internal Testing** | ⚡ 5-10 dk | Hızlı test | ✅ En iyi |
| **License Testing** | ⚡ Anında | Debug builds | ⚠️ Bazı cihazlarda çalışmaz |
| **Closed Testing** | 🐢 Birkaç saat | Production-like | ✅ Final test için |

## Özet Adımlar (Internal Testing - ÖNERİLEN)

```bash
# 1. Build
npm run build
npx cap sync android

# 2. Android Studio'da AAB oluştur
Build → Generate Signed Bundle / APK → Android App Bundle (release)

# 3. Google Play Console
Testing → Internal testing → Create new release
AAB yükle → Gmail adresinizi tester olarak ekle → Yayınla

# 4. Opt-in
Link'i kopyala → Android cihazda aç → Become a tester
Google Play Store'dan indir

# 5. Test!
Uygulamayı aç → Premium → Paketler görünmeli!
```

## Sorun Giderme

### "No packages found" Devam Ediyor

1. **RevenueCat Dashboard'da offerings kontrol:**
   - `Offerings` → Current offering var mı?
   - Packages eklenmiş mi?

2. **Logcat'e bakın:**
   ```
   adb logcat | grep -i "revenuecat\|purchases"
   ```

3. **Internet bağlantısı:**
   - Cihazda internet var mı?
   - VPN kapalı mı?

### "User not eligible"

- License testing listesinde misiniz?
- Doğru Gmail hesabıyla oturum açtınız mı?

---

**ÖNEMLİ**: Test için en az **Internal Testing** kullanmalısınız. Debug build ile doğrudan test yapmak çoğu zaman çalışmaz!

## Sonraki Adım

1. ✅ Internal testing track'i oluşturun
2. ✅ AAB yükleyin
3. ✅ Kendinizi tester olarak ekleyin
4. ✅ Opt-in link ile teste katılın
5. ✅ Google Play Store'dan indirin
6. ✅ Test edin!
