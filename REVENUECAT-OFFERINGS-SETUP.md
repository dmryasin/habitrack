# RevenueCat Offerings Kurulumu - "purchaseNotAvailable" Hatası Çözümü

## Sorun

Premium sayfasında "purchaseNotAvailable" hatası alıyorsunuz. Bu hatanın nedeni, RevenueCat Dashboard'da **Offerings** (Teklifler) yapılandırılmamış olmasıdır.

## Offerings Nedir?

Offerings, RevenueCat'in uygulamanıza hangi ürünleri (subscription'ları) göstereceğinizi belirlediğiniz yapılandırmadır.

## Adım Adım Kurulum

### 1. RevenueCat Dashboard'a Giriş

1. [RevenueCat Dashboard](https://app.revenuecat.com/) adresine gidin
2. Projenizi seçin

### 2. Products (Ürünler) Oluşturma

#### 2.1. Products Sayfasına Git

1. Sol menüden `Products` sekmesine tıklayın
2. `+ New` butonuna tıklayın

#### 2.2. Monthly Subscription Ekleme

1. **Product ID**: `premium_monthly_subscription`
   - Bu ID, Google Play Console'da oluşturduğunuz subscription ID ile aynı olmalı
2. **Product Type**: `Subscription`
3. **Store**: `Google Play Store`
4. **Display Name**: `Premium Monthly` (kullanıcıya gösterilecek isim)
5. `Create` butonuna tıklayın

#### 2.3. Yearly Subscription Ekleme

1. Yine `+ New` butonuna tıklayın
2. **Product ID**: `premium_yearly_subscription`
3. **Product Type**: `Subscription`
4. **Store**: `Google Play Store`
5. **Display Name**: `Premium Yearly`
6. `Create` butonuna tıklayın

### 3. Entitlements (Yetkiler) Oluşturma

#### 3.1. Entitlements Sayfasına Git

1. Sol menüden `Entitlements` sekmesine tıklayın
2. `+ New` butonuna tıklayın

#### 3.2. Premium Entitlement Oluştur

1. **Identifier**: `premium`
   - Bu, koddaki `PREMIUM_ENTITLEMENT_ID` ile aynı olmalı
2. **Display Name**: `Premium Features`
3. `Create` butonuna tıklayın

#### 3.3. Products'ları Entitlement'a Bağla

1. Oluşturduğunuz `premium` entitlement'ına tıklayın
2. `Attach Products` butonuna tıklayın
3. Her iki ürünü de seçin:
   - `premium_monthly_subscription`
   - `premium_yearly_subscription`
4. `Attach` butonuna tıklayın

### 4. Offerings (Teklifler) Oluşturma

#### 4.1. Offerings Sayfasına Git

1. Sol menüden `Offerings` sekmesine tıklayın
2. `+ New Offering` butonuna tıklayın

#### 4.2. Current Offering Oluştur

1. **Identifier**: `default` (veya istediğiniz bir isim)
2. **Display Name**: `Default Offering`
3. **Description**: `Main premium offering`
4. `Create` butonuna tıklayın

#### 4.3. Packages (Paketler) Ekleme

Oluşturduğunuz offering'e tıklayın ve packages ekleyin:

##### Monthly Package:
1. `+ Add Package` butonuna tıklayın
2. **Package Type**: `Monthly` (veya `Custom`)
3. **Identifier**: `monthly` (eğer Custom seçtiyseniz)
4. **Product**: `premium_monthly_subscription` seçin
5. `Save` butonuna tıklayın

##### Yearly Package:
1. Yine `+ Add Package` butonuna tıklayın
2. **Package Type**: `Annual` (veya `Custom`)
3. **Identifier**: `yearly` (eğer Custom seçtiyseniz)
4. **Product**: `premium_yearly_subscription` seçin
5. `Save` butonuna tıklayın

#### 4.4. Current Offering Olarak Ayarla

1. Oluşturduğunuz offering'in yanındaki `...` menüsüne tıklayın
2. `Make Current` seçeneğini seçin
3. Bu offering artık "current" (varsayılan) offering olacak

### 5. Google Play Console Bağlantısını Kontrol Et

#### 5.1. Service Credentials Kontrolü

1. RevenueCat Dashboard → `Project Settings` → `Google Play`
2. Service Account JSON dosyanızın yüklenmiş olduğundan emin olun
3. Eğer yüklenmemişse:
   - Google Cloud Console'dan service account oluşturun
   - JSON key dosyasını indirin
   - RevenueCat'e yükleyin

#### 5.2. Google Play Console'da Subscription Kontrolü

1. [Google Play Console](https://play.google.com/console) → Uygulamanız
2. `Monetization setup` → `Subscriptions`
3. Şu iki subscription'ın **Active** olduğundan emin olun:
   - `premium_monthly_subscription`
   - `premium_yearly_subscription`
4. Her subscription için:
   - Base plan oluşturulmuş olmalı
   - Fiyat belirlenmiş olmalı
   - **Active** durumda olmalı

### 6. Test Etme

#### 6.1. Sandbox Testing

RevenueCat'de sandbox test için:
1. `Project Settings` → `Google Play` → `Sandbox Testing`
2. `Enable sandbox mode` aktif
3. Test cihazınızı ekleyin (optional)

#### 6.2. Uygulamada Test

1. Uygulamayı yeniden build edin ve çalıştırın:
   ```bash
   npm run build
   npx cap sync android
   ```
2. Android Studio'dan Run edin
3. Premium sayfasına gidin
4. Artık "purchaseNotAvailable" yerine paketleri görmelisiniz

#### 6.3. Test Satın Alma

Google Play'de test satın alma için:
1. Google Play Console → `Setup` → `License testing`
2. Test Gmail hesabınızı ekleyin
3. Bu hesapla test satın alma yapabilirsiniz (ücret ödemeden)

## Özet Kontrol Listesi

- [ ] Google Play Console'da 2 subscription ürün oluşturulmuş ve aktif
- [ ] RevenueCat'de 2 product oluşturulmuş (`premium_monthly_subscription`, `premium_yearly_subscription`)
- [ ] RevenueCat'de 1 entitlement oluşturulmuş (`premium`)
- [ ] Products, entitlement'a bağlanmış
- [ ] 1 offering oluşturulmuş
- [ ] Offering'e 2 package eklenmiş (monthly, yearly)
- [ ] Offering "current" olarak ayarlanmış
- [ ] Google Play service credentials yüklenmiş
- [ ] Uygulama yeniden build edilmiş ve test edilmiş

## Sorun Giderme

### "No offerings found"
- Current offering ayarlanmış mı kontrol edin
- Offering'e en az 1 package eklenmiş mi?
- RevenueCat API key doğru mu? (`billing.ts` dosyasında)

### "Product not found"
- Google Play Console'da subscription ID'leri kontrol edin
- RevenueCat'deki product ID'ler Google Play ile aynı mı?

### "Unable to connect to store"
- Internet bağlantınızı kontrol edin
- Google Play Services güncel mi?
- Service credentials doğru yüklenmiş mi?

## Kod Referansı

Kodunuzda kullanılan ID'ler:

```typescript
// billing.ts
PREMIUM_ENTITLEMENT_ID = 'premium'

PRODUCT_IDS = {
  monthly: 'premium_monthly_subscription',
  yearly: 'premium_yearly_subscription',
}
```

Bu ID'ler RevenueCat Dashboard'daki ID'lerle eşleşmelidir.

## Notlar

- Offerings değişiklikleri hemen etkili olur (app restart gerekmez)
- Test için gerçek ödeme yapmadan test yapabilirsiniz
- Production'da, kullanıcılar gerçek ödeme yapacaktır

---

**Önemli**: Bu adımları tamamladıktan sonra uygulamayı yeniden çalıştırın ve Premium sayfasını test edin. "purchaseNotAvailable" hatası kaybolmalı ve subscription paketleri görünmelidir.
