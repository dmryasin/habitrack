# RevenueCat Dashboard Kurulum Rehberi

## Adım 1: RevenueCat'e Giriş ve Proje Oluşturma

1. https://app.revenuecat.com adresine gidin
2. Giriş yapın
3. Projenizi seçin veya yeni proje oluşturun

## Adım 2: Google Play Store Entegrasyonu

1. Sol menüden **"Project Settings"** → **"Integrations"** → **"Google Play"** seçin
2. **Service Credentials** ekleyin:
   - Google Play Console'dan Service Account JSON key indirmeniz gerekir
   - Play Console → Setup → API access → Create new service account
   - JSON key'i indirin ve RevenueCat'e yükleyin

3. **Package Name** ekleyin: `com.dmrya.habitrack`

## Adım 3: Entitlements Oluşturma

1. Sol menüden **"Entitlements"** seçin
2. **"New Entitlement"** butonuna tıklayın
3. Entitlement oluşturun:
```
Identifier: premium
Display Name: Premium Access
Description: Full access to all premium features
```

## Adım 4: Products Ekleme

1. Sol menüden **"Products"** seçin
2. **"New"** butonuna tıklayın
3. Google Play'den oluşturduğunuz product ID'leri ekleyin:

### Aylık Abonelik:
```
Store: Google Play Store
Product Identifier: habitrack_premium_monthly
Display Name: Premium Monthly
```

### Yıllık Abonelik:
```
Store: Google Play Store
Product Identifier: habitrack_premium_yearly
Display Name: Premium Yearly
```

## Adım 5: Offerings ve Packages Oluşturma

1. Sol menüden **"Offerings"** seçin
2. **"New Offering"** butonuna tıklayın

### Default Offering Oluşturma:
```
Identifier: default
Display Name: Premium Subscription
Description: Choose your subscription plan
```

### Packages Ekleme:

Offering içinde **"Add Package"** butonuna tıklayın:

#### Monthly Package:
```
Identifier: $rc_monthly (veya custom: monthly)
Product: habitrack_premium_monthly
Position: 2
```

#### Annual Package:
```
Identifier: $rc_annual (veya custom: annual)
Product: habitrack_premium_yearly
Position: 1 (Öne çıkan)
```

## Adım 6: Entitlement'ları Package'lara Bağlama

1. Her package'a tıklayın
2. **"Attach Entitlements"** bölümünden `premium` entitlement'ını ekleyin

## Adım 7: API Keys'i Kopyalama

1. **"Project Settings"** → **"API Keys"** seçin
2. **Google Play Store** altındaki **Public app-specific API key**'i kopyalayın
   - Bu anahtarı zaten aldınız: `goog_WwzKyqPMLYLiUoWqQKJqcBGMHyi`

## Yapılandırma Tamamlandı!

### Kontrol Listesi:
- [x] Google Play entegrasyonu yapıldı
- [x] `premium` entitlement oluşturuldu
- [ ] Products eklendi (habitrack_premium_monthly, habitrack_premium_yearly)
- [ ] Default offering oluşturuldu
- [ ] Packages eklendi ve entitlement'lara bağlandı
- [x] API Key alındı

## Test Etme

1. RevenueCat Dashboard'dan **"Customer Lists"** → **"Overview"** seçin
2. Test kullanıcınızla uygulamayı açın
3. Dashboard'da kullanıcının göründüğünü kontrol edin
4. Test satın alma yapın
5. Dashboard'da işlemin göründüğünü kontrol edin

## Önemli Notlar:

- **RevenueCat ile Google Play senkronizasyonu**: Birkaç dakika sürebilir
- **Test ortamı**: Sandbox modunda test yapabilirsiniz
- **Package Identifiers**:
  - `$rc_monthly` = Standart aylık paket
  - `$rc_annual` = Standart yıllık paket
  - Özel identifier'lar da kullanabilirsiniz

## Google Play Console'da Ürünler Oluşturulduktan Sonra:

1. RevenueCat Dashboard'a geri dönün
2. Products bölümünden "Import from Google Play" seçeneğini kullanabilirsiniz
3. Bu otomatik olarak product ID'leri çeker

## Bana Bildirin:
✅ Products eklendi mi?
✅ Offering ve Packages oluşturuldu mu?
✅ Test satın alma başarılı mı?
