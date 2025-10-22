# Google Play Console - Ürün Oluşturma Rehberi

## Adım 1: Google Play Console'a Giriş
1. https://play.google.com/console adresine gidin
2. Uygulamanızı seçin (HabiTrack)

## Adım 2: Abonelik Ürünleri Oluşturma

### Uygulama Kapalı Test Aşamasındaysa:
Google Play Console, uygulamanız henüz yayında değilse bazı özellikleri kısıtlar. Ancak yine de ürünleri oluşturabilirsiniz:

1. Sol menüden **"Monetization"** → **"Subscriptions"** seçeneğine tıklayın
2. **"Create subscription"** butonuna tıklayın

### Aylık Abonelik Oluşturma:
```
Product ID: habitrack_premium_monthly
Subscription Name: Premium Monthly
Description: Get unlimited habits, advanced statistics, and ad-free experience

Base Plans:
- Base Plan ID: monthly
- Billing Period: 1 month (P1M)
- Price: 29.99 TRY (veya istediğiniz fiyat)
- Renewal Type: Auto-renewing
- Free Trial: (Opsiyonel) 7 days
```

### Yıllık Abonelik Oluşturma:
```
Product ID: habitrack_premium_yearly
Subscription Name: Premium Yearly
Description: Get unlimited habits, advanced statistics, and ad-free experience for a full year

Base Plans:
- Base Plan ID: yearly
- Billing Period: 1 year (P1Y)
- Price: 199.99 TRY (veya istediğiniz fiyat - genelde %50-60 indirimli)
- Renewal Type: Auto-renewing
- Free Trial: (Opsiyonel) 7 days
```

## Adım 3: Test Kullanıcıları Ekleme

Kapalı test sürecindeyken:
1. **"License Testing"** → **"License testers"** bölümüne gidin
2. Gmail hesaplarınızı ekleyin (virgülle ayırın)
3. Bu hesaplar ürünleri ücretsiz test edebilir

## Adım 4: Ürünleri Aktifleştirme

1. Her ürünü oluşturduktan sonra **"Activate"** butonuna tıklayın
2. Aktivasyon birkaç saat sürebilir

## Önemli Notlar:

- **Test Kartı**: Gerçek para harcamadan test etmek için Google'ın test kartlarını kullanabilirsiniz
- **Ürün ID'leri**: Oluşturduktan sonra değiştirilemez, dikkatli seçin
- **Fiyatlandırma**: Türkiye ve diğer ülkeler için otomatik fiyat önerileri gelir
- **Ücretsiz Deneme**: İsteğe bağlı, kullanıcı çekimi için önerilir

## Adım 5: RevenueCat ile Bağlama

Google Play Console'da ürünleri oluşturduktan sonra:
1. Product ID'leri kaydedin (`habitrack_premium_monthly` ve `habitrack_premium_yearly`)
2. Bu ID'leri RevenueCat Dashboard'a eklemeniz gerekecek

## Ürünler Hazır Olunca Bana Söyleyin:
✅ Aylık abonelik Product ID
✅ Yıllık abonelik Product ID
✅ Fiyatlar (bilgi amaçlı)
