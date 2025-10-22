# Yükleme Anahtarı Sıfırlama Rehberi

## ✅ Durum: Yeni Upload Key Hazır!

Orijinal keystore kaybolduğu için yeni bir upload keystore oluşturduk.

### 📦 Oluşturulan Dosyalar

1. **Yeni Keystore:**
   - Dosya: `habitrack-upload-new.keystore`
   - Konum: Proje kök dizini
   - SHA-1: `9E:B1:89:62:16:C1:10:9E:FB:40:B3:87:42:15:5C:95:40:82:EA:89`

2. **Upload Certificate:**
   - Dosya: `upload_certificate_new.pem`
   - Konum: Proje kök dizini
   - Bu dosyayı Google Play Console'a yükleyeceğiz

### 🔑 Keystore Bilgileri

**YENİ UPLOAD KEYSTORE (SAKLAYIN!):**
```
Keystore Dosyası: habitrack-upload-new.keystore
Store Password: HabiTrack2025Upload!
Key Alias: upload
Key Password: HabiTrack2025Upload!
```

⚠️ **ÇOK ÖNEMLİ:** Bu bilgileri güvenli bir yerde saklayın!

---

## 🚀 Google Play Console'da Yükleme Anahtarı Sıfırlama

### Adım 1: Google Play Console'a Giriş

1. [Google Play Console](https://play.google.com/console) → HabiTrack
2. Sol menüden: `Setup` → `App integrity` (Uygulama bütünlüğü)

### Adım 2: Yükleme Anahtarı Sıfırlama Talebi

Ekran görüntünüzde **"Yükleme anahtarı sıfırlama isteğinde bulunma"** linki var.

1. Bu linke tıklayın
2. Google size bir form gösterecek
3. Neden sıfırlamak istediğinizi açıklayın:
   ```
   Original upload keystore was lost during development.
   We have created a new upload keystore and would like to
   update the upload key for future releases.
   ```

### Adım 3: Yeni Certificate'i Yükle

1. Sıfırlama talebinde **"Upload new certificate"** seçeneği olacak
2. `upload_certificate_new.pem` dosyasını yükleyin
   - Dosya konumu: `C:\Users\dmrya\Desktop\Yeni klasör\habitracker\upload_certificate_new.pem`

### Adım 4: Talebi Gönderin

1. Formu doldurun
2. **Submit** butonuna tıklayın
3. Google talebi inceleyecek (genellikle 1-3 iş günü)

### Adım 5: Onay Bekleyin

Google, talebi onayladığında:
- Email bildirimi alacaksınız
- Google Play Console'da yeni upload key aktif olacak
- Artık yeni keystore ile AAB yükleyebileceksiniz

---

## 🔧 Yeni Keystore ile Build Alma (Onay Sonrası)

Google onayladıktan sonra:

### 1. key.properties Güncelleyin

```bash
cd android
echo "storePassword=HabiTrack2025Upload!
keyPassword=HabiTrack2025Upload!
keyAlias=upload
storeFile=app/habitrack-upload-new.keystore" > key.properties
```

### 2. Keystore'u Android/app Klasörüne Kopyalayın

```bash
cp ../habitrack-upload-new.keystore app/
```

### 3. Build Alın

```bash
npm run build
npx cap sync android
cd android
./gradlew clean bundleRelease
```

### 4. AAB Dosyasını Google Play'e Yükleyin

AAB konumu:
```
android/app/build/outputs/bundle/release/app-release.aab
```

---

## ⚡ HIZLI BAŞLANGIÇ: ŞİMDİ NE YAPILACAK?

### Seçenek 1: Google'dan Onay Beklemeden Test (Internal Testing)

Aslında Internal Testing için Google'ın upload key reset onayını beklemenize gerek YOK!

**Neden?** Internal testing kendi keystore'unuzla imzalanmış APK/AAB kabul eder.

#### Hemen Test Etmek İçin:

1. **Yeni keystore ile build alın:**
   ```bash
   cd android
   echo "storePassword=HabiTrack2025Upload!
   keyPassword=HabiTrack2025Upload!
   keyAlias=upload
   storeFile=app/habitrack-upload-new.keystore" > key.properties

   cp ../habitrack-upload-new.keystore app/

   npm run build
   npx cap sync android
   ./gradlew clean bundleRelease
   ```

2. **Internal Testing'e yükleyin:**
   - Google Play Console → Testing → Internal testing
   - Create new release
   - AAB yükleyin
   - **ÖNEMLI:** Bu internal test track'i için çalışacak
   - Google burada keystore kontrolü yapmaz

3. **Test edin:**
   - Opt-in link ile teste katılın
   - Premium features ve AdMob'u test edin

### Seçenek 2: Production için Upload Key Reset Talebi

Production güncellemeleri için mutlaka upload key reset yapmalısınız:

1. ✅ `upload_certificate_new.pem` hazır
2. ✅ Google Play Console → Setup → App integrity
3. ✅ "Yükleme anahtarı sıfırlama isteğinde bulunma"
4. ⏳ 1-3 iş günü bekleme
5. ✅ Onay aldıktan sonra production release

---

## 📋 Keystore Bilgileri Özeti

### ESKİ (Kayıp):
```
❌ Dosya: habittracker-release.keystore
❌ Alias: habitracker
❌ SHA-1: 2E:5A:D4:D4:7E:6D:B1:7F:32:3D:BE:1B:3B:18:DE:7C:60:BF:6F:FD
```

### YENİ (Şu An):
```
✅ Dosya: habitrack-upload-new.keystore
✅ Alias: upload
✅ Store Pass: HabiTrack2025Upload!
✅ Key Pass: HabiTrack2025Upload!
✅ SHA-1: 9E:B1:89:62:16:C1:10:9E:FB:40:B3:87:42:15:5C:95:40:82:EA:89
✅ Konum: Proje kök dizini
```

---

## 🎯 ÖNERİ: İlk Önce Internal Testing

1. ✅ Yeni keystore ile build alın
2. ✅ Internal testing'e yükleyin (keystore kontrolü yok)
3. ✅ Premium ve AdMob features'ı test edin
4. ✅ Her şey çalışıyorsa Google'a upload key reset talebi gönderin
5. ⏳ Onay beklerken internal testing'de çalışmaya devam edebilirsiniz

---

## 💾 Backup Önerileri

**ŞİMDİ YEDEK ALIN:**

1. **Keystore dosyasını kopyalayın:**
   - USB flash disk
   - Cloud storage (Google Drive, Dropbox)
   - Harici hard disk

2. **Şifreleri kaydedin:**
   - Password manager (Bitwarden, 1Password, LastPass)
   - Güvenli not defteri
   - Fiziksel kağıda yazın (güvenli yerde)

3. **Certificate'i saklayın:**
   - `upload_certificate_new.pem` dosyasını da yedekleyin

---

## ❓ SSS

### S: Upload key reset ne kadar sürer?
**C:** Genellikle 1-3 iş günü.

### S: Internal testing'de çalışır mı?
**C:** EVET! Internal testing yeni keystore'u kabul eder.

### S: Production'da çalışır mı?
**C:** HAYIR, önce Google'dan onay gerekiyor.

### S: Mevcut kullanıcılar etkilenir mi?
**C:** HAYIR, sadece yeni güncellemeler etkilenir.

### S: Eski keystore bulunamaz mı?
**C:** Artık gerek yok, yeni keystore oluşturduk.

---

## 🚀 Sonraki Adım

**ŞİMDİ:** Yeni keystore ile build alıp Internal Testing'e yükleyelim!

```bash
cd android
echo "storePassword=HabiTrack2025Upload!
keyPassword=HabiTrack2025Upload!
keyAlias=upload
storeFile=app/habitrack-upload-new.keystore" > key.properties

cp ../habitrack-upload-new.keystore app/
```

Ardından build komutunu çalıştıracağım!
