# Alışkanlık Takipçisi (Habit Tracker) 🎯

Modern, kullanıcı dostu bir alışkanlık takip uygulaması. Günlük alışkanlıklarınızı takip edin, hedeflerinize ulaşın!

## ✨ Özellikler

### Ücretsiz Sürüm
- ✅ 3'e kadar alışkanlık ekleme
- ✅ Günlük check-in sistemi
- ✅ Seri (streak) takibi
- ✅ Temel istatistikler
- ✅ Modern, responsive UI

### Premium Sürüm
- ⭐ Sınırsız alışkanlık
- ⭐ Reklamsız deneyim
- ⭐ Gelişmiş istatistikler
- ⭐ Özel renkler ve ikonlar
- ⭐ Offline çalışma (PWA)
- ⭐ Karanlık mod

## 🚀 Teknolojiler

- **React 18** - Modern UI library
- **TypeScript** - Type safety
- **Vite** - Lightning fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - Simple state management
- **LocalForage** - IndexedDB wrapper for offline storage
- **React Router** - Client-side routing
- **Date-fns** - Modern date utility library
- **Lucide React** - Beautiful icon set
- **React Toastify** - Toast notifications
- **PWA (vite-plugin-pwa)** - Progressive Web App support

## 📦 Kurulum

### Gereksinimler
- Node.js 18+
- npm veya yarn

### Adımlar

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcıda açın: [http://localhost:5173](http://localhost:5173)

## 🏗️ Build

### Production Build
```bash
npm run build
```

Build çıktısı `dist/` klasöründe oluşturulur.

### Preview
```bash
npm run preview
```

## 📱 PWA (Progressive Web App)

Bu uygulama PWA desteği ile gelir. Kullanıcılar:
- Uygulamayı ana ekrana ekleyebilir
- Offline çalışabilir
- Native app gibi kullanabilir

## 🗂️ Proje Yapısı

```
habitracker/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── HabitCard.tsx
│   │   ├── Layout.tsx
│   │   └── ProgressBar.tsx
│   ├── pages/            # Page components
│   │   ├── HomePage.tsx
│   │   ├── AddEditHabitPage.tsx
│   │   ├── StatisticsPage.tsx
│   │   ├── PremiumPage.tsx
│   │   └── SettingsPage.tsx
│   ├── store/            # State management
│   │   └── useHabitStore.ts
│   ├── models/           # Business logic
│   │   └── Habit.ts
│   ├── types/            # TypeScript types
│   │   └── index.ts
│   ├── utils/            # Utilities
│   │   ├── storage.ts
│   │   └── constants.ts
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.css         # Global styles
├── public/               # Static assets
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
└── package.json         # Dependencies
```

## 🎨 Özellik Detayları

### Alışkanlık Yönetimi
- Alışkanlık ekleme/düzenleme/silme
- Özel renk ve ikon seçimi
- Açıklama ekleme

### Takip Sistemi
- Günlük check-in
- Seri (streak) takibi
- Tamamlanma oranı hesaplama
- Geçmiş verileri görüntüleme

### İstatistikler
- Alışkanlık başına detaylı istatistikler
- Toplam tamamlama sayısı
- En uzun seri
- Ortalama başarı oranı
- Görsel grafikler

### Premium Özellikler
- Sınırsız alışkanlık ekleme
- Gelişmiş analitik
- Tema desteği

## 💾 Veri Saklama

Tüm veriler tarayıcınızda yerel olarak saklanır (IndexedDB):
- Güvenli
- Hızlı
- Offline erişim
- Gizlilik dostu (sunucuya veri gönderilmez)

## 🔐 Gizlilik

- Hiçbir veri sunucuya gönderilmez
- Tüm veriler yerel cihazınızda saklanır
- Üçüncü parti izleme yok

## 🛠️ Geliştirme

### Komutlar

- `npm run dev` - Geliştirme sunucusu
- `npm run build` - Production build
- `npm run preview` - Build önizleme
- `npm run lint` - Linting

### Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add some amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📝 Yapılacaklar

- [ ] Karanlık mod implementasyonu
- [ ] Gerçek ödeme entegrasyonu (Stripe/PayPal)
- [ ] Push notification desteği
- [ ] Veri export/import (JSON, CSV)
- [ ] Bulut senkronizasyonu (Firebase/Supabase)
- [ ] Çoklu dil desteği (i18n)
- [ ] Alışkanlık kategorileri
- [ ] Hatırlatıcı sistemi
- [ ] Sosyal özellikler (arkadaşlarla paylaşma)

## 📄 Lisans

MIT License - Kendi projenizde özgürce kullanabilirsiniz.

## 🙏 Teşekkürler

Bu proje modern web teknolojileri kullanılılarak geliştirilmiştir. Kullanılan tüm açık kaynak kütüphanelere teşekkürler!

---

**Made with ❤️ using React, TypeScript & Tailwind CSS**
