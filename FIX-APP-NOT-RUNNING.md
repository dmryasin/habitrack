# Uygulama Çalışmıyor - Hızlı Çözüm

## 🔍 SORUN

Paket adını değiştirdik:
- ESKİ: `com.habittracker.app`
- YENİ: `com.dmrya.habitracker`

Cihazda/emülatörde eski paket adıyla kurulu uygulama kalmış olabilir.

---

## ✅ ÇÖZÜM (3 ADIM)

### ADIM 1: Eski Uygulamayı Kaldır

**Emülatör/Cihazda:**
1. Uygulamayı bulun (habitracker)
2. **Uzun basın** → **Kaldır/Uninstall**
3. Onaylayın

**VEYA Terminal'den:**
```bash
adb uninstall com.habittracker.app
adb uninstall com.dmrya.habitracker
```

### ADIM 2: Android Studio'da Clean

**Android Studio'da:**
1. **Build → Clean Project**
2. Bitene kadar bekleyin (1-2 dakika)

### ADIM 3: Yeniden Çalıştır

1. **Run → Run 'app'** (Yeşil üçgen ▶)
2. Veya `Shift + F10`
3. Emülatör/cihaz seçin
4. Uygulamanın yüklenmesini bekleyin

---

## 🔧 ALTERNATİF: Terminal ile Hızlı Fix

```bash
# 1. Her iki paket adını da kaldır
adb uninstall com.habittracker.app
adb uninstall com.dmrya.habitracker

# 2. Android klasöründe clean
cd android
./gradlew clean

# 3. Yeniden install
./gradlew installRelease
```

---

## ⚠️ HATA MESAJI GÖRÜYORSANİZ

### "Installation failed with message..."

**Çözüm:**
1. Cihazdan/emülatörden uygulamayı **manuel olarak silin**
2. Android Studio'da: **File → Invalidate Caches / Restart**
3. Yeniden deneyin

### "INSTALL_FAILED_UPDATE_INCOMPATIBLE"

**Neden:** Eski paket adıyla kurulu uygulama var

**Çözüm:**
```bash
adb uninstall com.habittracker.app
```

### "The application could not be installed"

**Çözüm:**
1. Build → Clean Project
2. Build → Rebuild Project
3. Run

---

## 📱 EMÜLATÖRDEKİ TÜM UYGULAMALARI TEMİZLE

Eğer emülatörü sıfırlamak isterseniz:

1. **Tools → Device Manager**
2. Emülatörün yanındaki **⋮** (üç nokta)
3. **Wipe Data**
4. **Yes** onaylayın

⚠️ Bu emülatördeki TÜM verileri siler!

---

## ✅ KONTROL: Uygulama Çalışıyor mu?

Uygulama başlatıldıktan sonra kontrol edin:

1. **Ana sayfa açılıyor mu?** ✓
2. **Alışkanlık ekleyebiliyor musunuz?** ✓
3. **Bildirimler çalışıyor mu?** ✓

---

## 🚀 SONRAKI ADIMLAR

Uygulama çalışınca:
1. ✅ Test edin (tüm özellikleri deneyin)
2. ✅ Ekran görüntüleri alın (Play Store için)
3. ✅ AAB dosyasını Play Console'a yükleyin

---

## 💡 ÖNEMLİ NOT

**Paket adı artık:**
```
com.dmrya.habitracker
```

Bu isimle:
- ✅ Cihazda görünecek
- ✅ Play Store'da yayınlanacak
- ✅ Güncellemeler alınacak

**Kullanıcılara görünen ad:** `habitracker` (değişmedi)

---

**ŞİMDİ DENEYİN!**

1. Eski uygulamayı silin
2. Clean Project
3. Run ▶
