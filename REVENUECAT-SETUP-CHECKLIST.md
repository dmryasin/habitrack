# RevenueCat Kurulum Kontrol Listesi

## ✅ TAMAMLANAN İŞLEMLER

### 1. Kod Tarafı Hazırlık
- [x] RevenueCat Capacitor plugin kuruldu (`@revenuecat/purchases-capacitor@^11.2.7`)
- [x] BillingService sınıfı oluşturuldu ve yapılandırıldı
- [x] Android API Key eklendi: `goog_WwzKyqPMLYLiUoWqQKJqcBGMHyi`
- [x] Premium Page RevenueCat entegrasyonu tamamlandı
- [x] Product ID'ler tanımlandı:
  - Aylık: `habitrack_premium_monthly`
  - Yıllık: `habitrack_premium_yearly`
- [x] Entitlement ID belirlendi: `premium`

## 📋 YAPILACAK İŞLEMLER

### 2. Google Play Console Kurulumu

#### Adım 1: Subscriptions Bölümüne Git
```
Google Play Console → HabiTrack App → Monetization → Subscriptions
```

#### Adım 2: Aylık Abonelik Oluştur
- [ ] "Create subscription" butonuna tıkla
- [ ] Product ID: `habitrack_premium_monthly`
- [ ] Subscription Name: `Premium Monthly`
- [ ] Description: `Get unlimited habits, advanced statistics, and ad-free experience`
- [ ] Base Plan oluştur:
  - Base Plan ID: `monthly`
  - Billing Period: 1 month (P1M)
  - Price: **29.99 TRY** (veya istediğiniz fiyat)
  - Renewal Type: Auto-renewing
  - Free Trial: (Opsiyonel) 7 gün
- [ ] "Activate" butonuna tıkla

#### Adım 3: Yıllık Abonelik Oluştur
- [ ] "Create subscription" butonuna tıkla
- [ ] Product ID: `habitrack_premium_yearly`
- [ ] Subscription Name: `Premium Yearly`
- [ ] Description: `Get unlimited habits, advanced statistics, and ad-free experience for a full year`
- [ ] Base Plan oluştur:
  - Base Plan ID: `yearly`
  - Billing Period: 1 year (P1Y)
  - Price: **199.99 TRY** (veya istediğiniz fiyat - genelde %50-60 indirimli)
  - Renewal Type: Auto-renewing
  - Free Trial: (Opsiyonel) 7 gün
- [ ] "Activate" butonuna tıkla

#### Adım 4: Test Kullanıcıları Ekle
- [ ] Play Console → Setup → License testing → License testers
- [ ] Gmail adreslerinizi ekleyin (virgülle ayırarak)
- [ ] Response: "RESPOND_NORMALLY" seçili olsun

### 3. RevenueCat Dashboard Kurulumu

#### Adım 1: Google Play Entegrasyonu
- [ ] RevenueCat Dashboard → Project Settings → Integrations → Google Play
- [ ] Service Credentials ekle:
  1. Google Play Console → Setup → API access
  2. "Choose a project to link" veya mevcut projeyi seç
  3. "Create new service account" tıkla
  4. Google Cloud Console açılır
  5. Service account oluştur
  6. "Keys" sekmesi → "Add Key" → "Create new key" → JSON
  7. JSON dosyasını indir
  8. RevenueCat'e geri dön ve JSON'u yükle
- [ ] Package Name ekle: `com.dmrya.habitrack`

#### Adım 2: Entitlements Oluştur
- [ ] RevenueCat Dashboard → Entitlements
- [ ] "New Entitlement" tıkla
- [ ] Identifier: `premium`
- [ ] Display Name: `Premium Access`
- [ ] Description: `Full access to all premium features`
- [ ] Save

#### Adım 3: Products Ekle
- [ ] RevenueCat Dashboard → Products
- [ ] "New" butonuna tıkla

**Aylık Abonelik:**
- [ ] Store: Google Play Store
- [ ] Product Identifier: `habitrack_premium_monthly`
- [ ] Display Name: `Premium Monthly`
- [ ] Save

**Yıllık Abonelik:**
- [ ] "New" butonuna tıkla
- [ ] Store: Google Play Store
- [ ] Product Identifier: `habitrack_premium_yearly`
- [ ] Display Name: `Premium Yearly`
- [ ] Save

#### Adım 4: Offerings ve Packages Oluştur
- [ ] RevenueCat Dashboard → Offerings
- [ ] "New Offering" tıkla
- [ ] Identifier: `default`
- [ ] Display Name: `Premium Subscription`
- [ ] Description: `Choose your subscription plan`
- [ ] Current Offering: ✓ (İşaretle)
- [ ] Save

**Packages Ekle:**

Offering içinde "Add Package" tıkla:

**Monthly Package:**
- [ ] Identifier: `$rc_monthly` (veya custom: `monthly`)
- [ ] Product: `habitrack_premium_monthly` seç
- [ ] Position: 2
- [ ] Attach Entitlements: `premium` seç
- [ ] Save

**Annual Package:**
- [ ] "Add Package" tıkla
- [ ] Identifier: `$rc_annual` (veya custom: `annual`)
- [ ] Product: `habitrack_premium_yearly` seç
- [ ] Position: 1 (Öne çıkan)
- [ ] Attach Entitlements: `premium` seç
- [ ] Save

### 4. Test Etme

#### Adım 1: Uygulamayı Çalıştır
- [ ] Terminal'de: `npm run build`
- [ ] `npx cap sync`
- [ ] Android Studio'yu aç: `npx cap open android`
- [ ] Uygulamayı çalıştır

#### Adım 2: RevenueCat Bağlantısını Test Et
- [ ] Uygulamayı aç
- [ ] RevenueCat Dashboard → Customer Lists → Overview
- [ ] Kullanıcınızın otomatik olarak göründüğünü kontrol edin

#### Adım 3: Premium Sayfasını Kontrol Et
- [ ] Uygulamada Premium sayfasına git
- [ ] Aylık ve yıllık paketlerin göründüğünü kontrol et
- [ ] Fiyatların doğru olduğunu kontrol et

#### Adım 4: Test Satın Alma
- [ ] Test kullanıcı hesabıyla giriş yap (Google Play'de)
- [ ] Premium sayfasında bir paket seç
- [ ] "Switch to Premium" butonuna tıkla
- [ ] Google Play satın alma ekranının açıldığını kontrol et
- [ ] Test satın almasını tamamla (license tester hesabı ücretsiz)
- [ ] RevenueCat Dashboard'da işlemin göründüğünü kontrol et
- [ ] Uygulamada premium özelliklerinin aktif olduğunu kontrol et

#### Adım 5: Restore Purchases Test
- [ ] Uygulamayı kapat ve tekrar aç
- [ ] Premium durumunun korunduğunu kontrol et
- [ ] Veya "Restore Purchases" butonunu test et

## 🚨 SORUN GİDERME

### Google Play Console'da Ürün Oluşturamıyorsanız:
- Uygulamanın en az Internal Testing track'inde olması gerekir
- App Bundle yüklemiş olmanız gerekir
- Subscriptions için Privacy Policy URL'si gereklidir

### RevenueCat'te Products Göremiyorsanız:
- Google Play entegrasyonunun tamamlandığından emin olun
- Service Account JSON doğru yüklenmiş olmalı
- Google Play Console'da ürünler "Active" durumda olmalı
- Senkronizasyon 5-10 dakika sürebilir

### Test Satın Alma Çalışmıyorsa:
- License tester olarak eklenmiş olmalısınız
- Test hesabıyla Google Play'e giriş yapmalısınız
- Uygulamanın package name'i doğru olmalı
- RevenueCat API key doğru olmalı

### "No offerings available" Hatası:
- RevenueCat Dashboard'da Offering "Current" olarak işaretli mi?
- Packages'lar products'a bağlı mı?
- Entitlements'lar packages'lara bağlı mı?

## 📊 BAŞARILI KURULUM KONTROL LİSTESİ

Tüm bunlar çalışıyorsa kurulum başarılı:
- [ ] RevenueCat Dashboard'da kullanıcı görünüyor
- [ ] Premium sayfasında paketler listeleniyor
- [ ] Test satın alma başarılı oluyor
- [ ] Satın alma sonrası premium özellikleri açılıyor
- [ ] Restore purchases çalışıyor
- [ ] Uygulama yeniden açıldığında premium durumu korunuyor

## 🎉 TAMAMLANDI!

Tüm checklistler tamamlandıysa, RevenueCat kurulumu başarıyla tamamlanmıştır!

## 📝 SONRAKİ ADIMLAR

- [ ] AdMob entegrasyonu (reklam gelirleri için)
- [ ] Premium features UI'ı iyileştirme
- [ ] Fiyat optimizasyonu ve A/B testing
- [ ] Promotional codes sistemi
- [ ] Analytics entegrasyonu

## 💰 GELIR TAKİBİ

RevenueCat Dashboard → Charts bölümünden:
- Monthly Recurring Revenue (MRR)
- Active subscriptions
- Churn rate
- Conversion rate

## ❓ SORULARINIZ İÇİN

Herhangi bir adımda takılırsanız:
1. İlgili rehber dökümanlarına bakın
2. RevenueCat Docs: https://docs.revenuecat.com
3. Google Play Billing Docs: https://developer.android.com/google/play/billing
4. Bana sorun!
