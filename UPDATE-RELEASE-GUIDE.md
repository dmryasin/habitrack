# Google Play Console'da Güncelleme Yayınlama Rehberi

Bu döküman, uygulamanızın yeni versiyonunu Google Play Console'da nasıl güncelleyeceğinizi adım adım açıklar.

## Önkoşullar

✅ `android/app/build.gradle` dosyasında versiyon güncellenmiş (v1.0.2, versionCode: 3)
✅ Kod değişiklikleri commit edilmiş ve push edilmiş

## Adım 1: Production AAB Dosyası Oluşturma

### 1.1. Projeyi Build Et

```bash
# Ionic projesini build et
npm run build

# Android projesiyle sync et
npx cap sync android
```

### 1.2. Android Studio'da AAB Oluştur

1. Android Studio'yu açın
2. `android` klasörünü açın
3. Menüden: `Build` → `Generate Signed Bundle / APK`
4. `Android App Bundle` seçin → `Next`
5. **Key Store** bilgilerinizi girin:
   - Key store path: Mevcut keystore dosyanızın yolunu seçin
   - Key store password: Keystore şifrenizi girin
   - Key alias: Key alias'ınızı girin
   - Key password: Key şifresini girin
6. `Next` → `release` seçin → `Finish`

### 1.3. AAB Dosyasını Bulun

Build tamamlandığında AAB dosyası şu konumda olacak:
```
android/app/release/app-release.aab
```

## Adım 2: Google Play Console'da Güncelleme

### 2.1. Google Play Console'a Giriş

1. [Google Play Console](https://play.google.com/console) adresine gidin
2. Uygulamanızı seçin (HabiTrack)

### 2.2. Yeni Sürüm Oluştur

#### Production Release için:

1. Sol menüden: `Release` → `Production`
2. Sağ üstten `Create new release` butonuna tıklayın
3. AAB dosyanızı yükleyin:
   - `Upload` butonuna tıklayın
   - `android/app/release/app-release.aab` dosyasını seçin

#### Closed Testing için (önerilen):

1. Sol menüden: `Release` → `Testing` → `Closed testing`
2. Test track'inizi seçin (yoksa oluşturun)
3. `Create new release` butonuna tıklayın
4. AAB dosyanızını yükleyin

### 2.3. Release Notes (Sürüm Notları)

Release notes alanına şu formatta notlar ekleyin:

```
Version 1.0.2 - Bug Fixes

🐛 Fixed Issues:
- Fixed banner ad overlapping with bottom navigation menu
- Improved UI/UX for better navigation accessibility

✨ Improvements:
- Enhanced ad placement for better user experience
```

### 2.4. İnceleme ve Yayınla

1. `Review release` butonuna tıklayın
2. Tüm bilgileri kontrol edin:
   - Version code: 3
   - Version name: 1.0.2
   - AAB dosyası doğru mu?
3. `Start rollout to Production` (veya `Start rollout to Closed testing`)
4. Onaylayın

## Adım 3: Yayınlama Süreci

### Timeline

- **Closed Testing**: Genellikle birkaç saat içinde yayınlanır
- **Production**: Google incelemesi 1-7 gün sürebilir

### İnceleme Durumunu Takip Etme

1. Google Play Console → `Release` → `Production` (veya Closed testing)
2. Status bölümünden durumu kontrol edin:
   - 🔄 **In review**: Google incelemesi devam ediyor
   - ✅ **Published**: Yayınlandı
   - ❌ **Rejected**: Reddedildi (nedeni belirtilir)

## Adım 4: Test Etme

### Closed Testing ile Test

1. Test kullanıcılarınızı ekleyin (en az kendiniz)
2. Opt-in link'ini kullanarak teste katılın
3. Google Play Store'dan güncelleyi indirin
4. Değişiklikleri test edin

### Production'da Test

1. Staged rollout kullanabilirsiniz (örn: %10, %25, %50, %100)
2. Production yayınlandıktan sonra birkaç saat içinde Store'da görünür
3. "Update" butonu görünecek

## Önemli Notlar

⚠️ **Version Code**: Her yeni yayında artmalı (şu an: 3)
⚠️ **Keystore**: Asla kaybetmeyin! Aynı keystore ile imzalamalısınız
⚠️ **Bundle ID**: Değiştirilmemeli (`com.dmrya.habitracker`)

## Sorun Giderme

### "You uploaded an APK or Android App Bundle that was signed in debug mode"
- Release modda build ettiğinizden emin olun
- Signed Bundle oluştururken `release` seçtiğinizden emin olun

### "Version code X has already been used"
- `android/app/build.gradle`'da `versionCode` değerini artırın
- Yeniden build alın

### "Upload failed"
- İnternet bağlantınızı kontrol edin
- AAB dosyasının 150 MB altında olduğundan emin olun
- Tarayıcınızı yenileyin ve tekrar deneyin

## Hızlı Komutlar

```bash
# Build ve Sync
npm run build && npx cap sync android

# Version kontrol
grep versionCode android/app/build.gradle
grep versionName android/app/build.gradle

# Git durumu
git status
git log --oneline -n 5
```

## Sonraki Adımlar

1. ✅ AAB dosyası oluştur
2. ✅ Google Play Console'a yükle
3. ✅ Release notes ekle
4. ✅ Yayınla
5. ⏳ Google incelemesini bekle
6. ✅ Yayınlandıktan sonra test et

---

**Not**: İlk kez güncelleme yayınlıyorsanız, Closed Testing ile başlamanız önerilir.
