# AAB Dosyası Oluşturma - Hızlı Kılavuz

## 🚀 ANDROID STUDIO İLE (ÖNERİLEN)

### Adım 1: Android Studio'da Build Menüsü

1. Android Studio'yu açın (zaten açık olmalı)
2. Menüden: **Build → Generate Signed Bundle / APK**
3. **Android App Bundle** seçin
4. **Next** tıklayın

### Adım 2: Keystore Bilgilerini Girin

```
Key store path: android/habittracker-release.keystore
Key store password: habittracker123
Key alias: habitracker
Key password: habittracker123
```

5. **Choose existing** seçin
6. Keystore dosyasına git: `C:\Users\dmrya\Desktop\Yeni klasör\habitracker\android\habittracker-release.keystore`
7. Şifreleri yukardaki gibi girin
8. **Next** tıklayın

### Adım 3: Build Yapılandırması

9. **Destination folder**: Varsayılan bırak
10. **Build Variants**: `release` seçin
11. Her iki Signature Version kutusunu işaretle (V1 ve V2)
12. **Finish** tıklayın

### Adım 4: Dosyayı Bul

Build tamamlandığında (2-5 dakika sürer):

**Dosya konumu:**
```
C:\Users\dmrya\Desktop\Yeni klasör\habitracker\android\app\build\outputs\bundle\release\app-release.aab
```

Android Studio sağ altta **locate** linki gösterecek, tıklayınca dosyayı açar.

---

## 📦 HAZIR! AAB DOSYASI OLUŞTU

**Dosya adı:** `app-release.aab`
**Boyut:** ~8-12 MB olmalı

---

## ✅ SONRAKI ADIM: PLAY CONSOLE'A YÜKLE

1. https://play.google.com/console
2. Uygulamanızı seçin (henüz oluşturmadıysanız "Create app")
3. Sol menü: **Testing → Closed testing**
4. **Create new release**
5. **Upload** → `app-release.aab` seçin
6. **Release notes** ekle (release-notes-tr.txt'den kopyala)
7. **Save** ve **Review release**
8. **Start rollout to Closed testing**

---

## ⚠️ SORUN GİDERME

### "Keystore not found" hatası alırsanız:

Keystore dosyasının tam yolu:
```
C:\Users\dmrya\Desktop\Yeni klasör\habitracker\android\habittracker-release.keystore
```

### Build hata verirse:

1. **Build → Clean Project**
2. **Build → Rebuild Project**
3. Tekrar deneyin

### "Java version" hatası alırsanız:

Android Studio kendi Java'sını kullanır, bu hatayı almazsınız. Sadece komut satırında (gradle) çalıştırırsanız olur.

---

## 🎯 ÖZET

**SADECE 3 ADIM:**

1. ✅ Build → Generate Signed Bundle
2. ✅ Keystore bilgilerini gir (yukarda)
3. ✅ app-release.aab dosyasını al

**Keystore Şifreleri** (unutmayın):
- Store password: `habittracker123`
- Key password: `habittracker123`
- Alias: `habitracker`

---

Hazır olduğunuzda Play Console'a yükleyebilirsiniz! 🚀
