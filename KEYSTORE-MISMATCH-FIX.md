# Keystore Uyumsuzluğu Sorunu ve Çözümü

## 🔴 Sorun

Google Play Console'a yüklenen AAB dosyası farklı bir keystore ile imzalanmış.

**Google Play'de kayıtlı SHA-1:**
```
2E:5A:D4:D4:7E:6D:B1:7F:32:3D:BE:1B:3B:18:DE:7C:60:BF:6F:FD
```

**Yeni build'deki SHA-1:**
```
E8:69:AC:96:52:D1:E9:C1:3B:67:3E:4C:D8:5D:1E:36:5B:D8:D2:56
```

## 🔍 Analiz

İlk release (v1.0.1) için kullanılan keystore:
- Dosya: `habittracker-release.keystore` (eski adlandırma)
- Bu keystore şu an projede yok

Şu an kullanılan keystore:
- Dosya: `habitrack-release.keystore` (yeni oluşturulmuş)
- SHA-1 farklı

## ✅ Çözüm Seçenekleri

### Seçenek 1: Google Play App Signing ile Upload Key Güncelleme (ÖNERİLEN)

Eğer Google Play App Signing kullanıyorsanız (ikinci ekran görüntüsünde "Uygulama imzalama anahtarı" ve "Yükleme anahtarı" aynı ise, App Signing KULLANILMIYOR).

**App Signing kullanılıyorsa:**

1. **Yeni Upload Key Oluştur:**
   ```bash
   cd android
   keytool -genkeypair -alias upload -keyalg RSA -keysize 2048 -validity 9125 -keystore habitrack-new-upload.keystore
   ```

2. **Upload Certificate Export Et:**
   ```bash
   keytool -export -rfc -alias upload -file upload_certificate.pem -keystore habitrack-new-upload.keystore
   ```

3. **Google Play Console'a Yükle:**
   - Google Play Console → Setup → App integrity → App signing
   - "Upload key" bölümünde "Request upload key reset"
   - `upload_certificate.pem` dosyasını yükle

### Seçenek 2: Orijinal Keystore'u Bul ve Kullan

**Keystore nerede olabilir:**
- Eski bilgisayar/hard disk
- Cloud backup (Google Drive, Dropbox, etc.)
- USB flash disk
- Email ekleri

**Keystore bulunursa:**
1. `android/app/` klasörüne kopyalayın
2. Adını `habittracker-release.keystore` yapın
3. `android/key.properties` dosyasını güncelleyin:
   ```properties
   storeFile=app/habittracker-release.keystore
   storePassword=habittracker123
   keyAlias=habitracker
   keyPassword=habittracker123
   ```
4. Yeniden build alın

### Seçenek 3: Google Support ile İletişim (Son Çare)

Eğer keystore tamamen kaybolmuşsa:

1. Google Play Console → Help & Feedback
2. "Lost my app signing key" başlığıyla ticket açın
3. Kimlik doğrulama yapın
4. Google, app signing key'i sıfırlayabilir (uzun süreç)

## 🚀 Hızlı Çözüm: Orijinal Keystore ile Build

Eğer orijinal keystore'u bulabilirseniz:

```bash
# 1. Web ve Android sync
npm run build
npx cap sync android

# 2. key.properties güncelle
cd android
echo "storePassword=habittracker123
keyPassword=habittracker123
keyAlias=habitracker
storeFile=app/habittracker-release.keystore" > key.properties

# 3. Build
./gradlew clean bundleRelease
```

AAB dosyası: `android/app/build/outputs/bundle/release/app-release.aab`

## ⚠️ Gelecek İçin Öneriler

1. **Keystore Backup:**
   - USB flash disk
   - Cloud storage (şifreli)
   - Güvenli harici hard disk

2. **Şifreleri Kaydet:**
   - Password manager (1Password, LastPass, Bitwarden)
   - Fiziksel kağıt (güvenli yerde)
   - Şifreli not defteri

3. **Google Play App Signing Kullan:**
   - Google keystore'u yönetir
   - Kaybolma riski yok
   - Upload key değiştirilebilir

## 📝 Sonraki Adımlar

### Eğer Keystore Bulamazsanız:

1. **Mevcut kullanıcıları etkilemez** (uygulama yayında kalır)
2. **Yeni güncellemeler yayınlanamazsınız**
3. **Google support'a başvurmanız gerekir**

### Eğer Keystore Bulursanız:

1. ✅ Keystore'u güvenli yere kopyalayın
2. ✅ `key.properties` güncelleyin
3. ✅ Yeniden build alın
4. ✅ Google Play'e yükleyin
5. ✅ Test edin

## 🔑 Keystore Arama Yerleri

Kontrol edilecek konumlar:
- [ ] `C:\Users\dmrya\Desktop\` (masaüstü)
- [ ] `C:\Users\dmrya\Documents\`
- [ ] `C:\Users\dmrya\Downloads\`
- [ ] Önceki proje klasörleri
- [ ] USB flash diskler
- [ ] Harici hard diskler
- [ ] Cloud storage (Google Drive, OneDrive, Dropbox)
- [ ] Email ekleri (kendinize göndermiş olabilirsiniz)
- [ ] Eski Windows kullanıcı profilleri
- [ ] Proje git history (eğer yanlışlıkla commit edilmişse)

## 💡 Keystore SHA-1 Kontrolü

Bulduğunuz keystore'un doğru olup olmadığını kontrol edin:

```bash
keytool -list -v -keystore KEYSTORE_DOSYASI -storepass ŞIFRE
```

**Doğru keystore ise SHA-1:**
```
2E:5A:D4:D4:7E:6D:B1:7F:32:3D:BE:1B:3B:18:DE:7C:60:BF:6F:FD
```

---

**ÖNEMLİ:** Bu sorunu çözmek için orijinal keystore'u bulmak en hızlı yol. Bilgisayarınızda, yedeklerinizde ve cloud storage'larınızda arama yapın.
