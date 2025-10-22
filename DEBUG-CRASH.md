# Uygulama Başlatılırken Kapanıyor - Debug

## 🔍 DURUM

```
Starting: Intent { ... com.dmrya.habitracker/.MainActivity }
Connected to the target VM
Disconnected from the target VM  ❌ SORUN!
```

Uygulama başlatılıyor ama hemen crash oluyor.

---

## 📊 HATA LOGLARINI GÖRME - ADIM ADIM

### ADIM 1: Logcat Penceresini Aç

**Android Studio'da:**
1. Alt menüde **Logcat** sekmesine tıklayın
2. Yoksa: **View → Tool Windows → Logcat**

### ADIM 2: Filtreleme

Logcat penceresinde:
1. Üstte **Show only selected application** işaretli olsun
2. **Error** veya **No Filters** seçin

### ADIM 3: Uygulamayı Tekrar Çalıştır

1. **Run ▶** butonuna tıklayın
2. Logcat'te kırmızı hata mesajlarını arayın

---

## 🔴 ARAMAK İÇİN ANAHTAR KELİMELER

Logcat'te şunları arayın:

- `FATAL EXCEPTION`
- `AndroidRuntime`
- `java.lang.RuntimeException`
- `Caused by:`
- `ERROR`

---

## 🐛 MUHTEMEL SORUNLAR VE ÇÖZÜMLER

### 1. MainActivity Bulunamıyor

**Hata:** `ClassNotFoundException: MainActivity`

**Çözüm:**
```bash
# Rebuild project
Build → Rebuild Project
```

### 2. Web Assets Eksik

**Hata:** `Failed to load URL` veya `net::ERR_FILE_NOT_FOUND`

**Çözüm:**
```bash
# Web assets'i yeniden build et
npm run build
npx cap sync android
```

Sonra Android Studio'da Run ▶

### 3. Capacitor Config Hatası

**Hata:** `Error loading capacitor.config.json`

**Çözüm:**
```bash
npx cap sync android
```

### 4. Permission Hatası

**Hata:** `Permission denied`

**Çözüm:**
- Build → Clean Project
- File → Invalidate Caches / Restart

---

## 🚀 HIZLI FİX DENEYİN

### Terminal'de sırayla:

```bash
# 1. Web uygulamasını build et
npm run build

# 2. Capacitor sync
npx cap sync android

# 3. Clean
cd android
./gradlew clean
cd ..
```

### Sonra Android Studio'da:

1. **Build → Clean Project**
2. **Build → Rebuild Project**
3. **Run ▶**

---

## 📝 LOGCAT'TEN HATA ALMAK

Eğer Logcat'i göremiyorsanız, terminal'den:

```bash
# Cihazları listele
adb devices

# Logları izle
adb logcat | grep -i "error\|exception\|fatal"
```

---

## 🔍 MANUEL KONTROL

### Web Assets Var mı?

**Kontrol edin:**
```
android/app/src/main/assets/public/index.html
```

Bu dosya yoksa:
```bash
npm run build
npx cap copy android
```

### MainActivity.java Var mı?

**Kontrol edin:**
```
android/app/src/main/java/com/dmrya/habitracker/MainActivity.java
```

---

## ⚠️ EN OLASI SORUN: WEB ASSETS EKSİK

Paket adını değiştirdiğimiz için sync gerekebilir:

```bash
# 1. Build web app
npm run build

# 2. Copy to android
npx cap copy android

# 3. Sync
npx cap sync android
```

Sonra Android Studio'da Run ▶

---

## 📞 BANA GÖNDERİN

**Logcat'te gördüğünüz KIRMIZI hata mesajlarını kopyalayıp gönderin:**

1. Logcat penceresinde hataya sağ tıklayın
2. **Copy** seçin
3. Bana yapıştırın

Özellikle şunları arayın:
- `FATAL EXCEPTION`
- `Caused by:`
- İlk kırmızı hata satırı

---

## ✅ HIZLI ÇÖZÜM ÖZET

**ŞİMDİ DENEYİN:**

```bash
npm run build && npx cap sync android
```

Sonra Android Studio'da:
- Build → Clean Project
- Run ▶

---

**Hala çalışmıyorsa, Logcat'teki hata mesajını gönderin!**
