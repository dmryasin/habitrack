export const HABIT_COLORS = [
  { name: 'Kırmızı', value: '#EF4444', isPremium: false },
  { name: 'Turuncu', value: '#F97316', isPremium: false },
  { name: 'Sarı', value: '#EAB308', isPremium: false },
  { name: 'Yeşil', value: '#22C55E', isPremium: false },
  { name: 'Mavi', value: '#3B82F6', isPremium: false },
  { name: 'Mor', value: '#A855F7', isPremium: false },
  { name: 'Pembe', value: '#EC4899', isPremium: false },
  { name: 'Kahverengi', value: '#A16207', isPremium: false },
  // Premium renkler
  { name: 'Koyu Kırmızı', value: '#DC2626', isPremium: true },
  { name: 'Turuncu Kırmızı', value: '#EA580C', isPremium: true },
  { name: 'Amber', value: '#F59E0B', isPremium: true },
  { name: 'Lime', value: '#84CC16', isPremium: true },
  { name: 'Zümrüt', value: '#10B981', isPremium: true },
  { name: 'Turkuaz', value: '#14B8A6', isPremium: true },
  { name: 'Cyan', value: '#06B6D4', isPremium: true },
  { name: 'Gökyüzü', value: '#0EA5E9', isPremium: true },
  { name: 'İndigo', value: '#6366F1', isPremium: true },
  { name: 'Menekşe', value: '#8B5CF6', isPremium: true },
  { name: 'Fuşya', value: '#D946EF', isPremium: true },
  { name: 'Gül', value: '#F43F5E', isPremium: true },
  { name: 'Gri', value: '#6B7280', isPremium: true },
  { name: 'Koyu Gri', value: '#374151', isPremium: true },
];

export const HABIT_ICONS = [
  { name: 'Kitap', value: 'book-open', isPremium: false },
  { name: 'Spor', value: 'dumbbell', isPremium: false },
  { name: 'Meditasyon', value: 'brain', isPremium: false },
  { name: 'Su İçme', value: 'droplet', isPremium: false },
  { name: 'Uyku', value: 'moon', isPremium: false },
  { name: 'Yürüyüş', value: 'footprints', isPremium: false },
  { name: 'Müzik', value: 'music', isPremium: false },
  { name: 'Kod Yazma', value: 'code', isPremium: false },
  { name: 'Çizim', value: 'palette', isPremium: false },
  { name: 'Yazma', value: 'pen-tool', isPremium: false },
  { name: 'Kahve', value: 'coffee', isPremium: false },
  { name: 'Kalp', value: 'heart', isPremium: false },
  { name: 'Yıldız', value: 'star', isPremium: false },
  { name: 'Hedef', value: 'target', isPremium: false },
  { name: 'Ağırlık', value: 'weight', isPremium: false },
  { name: 'Bisiklet', value: 'bike', isPremium: false },
  // Premium iconlar
  { name: 'Ateş', value: 'flame', isPremium: true },
  { name: 'Yıldırım', value: 'zap', isPremium: true },
  { name: 'Güneş', value: 'sun', isPremium: true },
  { name: 'Bulut', value: 'cloud', isPremium: true },
  { name: 'Ağaç', value: 'tree-pine', isPremium: true },
  { name: 'Çiçek', value: 'flower', isPremium: true },
  { name: 'Kamera', value: 'camera', isPremium: true },
  { name: 'Film', value: 'film', isPremium: true },
  { name: 'Müzik Notu', value: 'music-2', isPremium: true },
  { name: 'Mikrofon', value: 'mic', isPremium: true },
  { name: 'Kulaklık', value: 'headphones', isPremium: true },
  { name: 'Oyun', value: 'gamepad-2', isPremium: true },
  { name: 'Uçak', value: 'plane', isPremium: true },
  { name: 'Araba', value: 'car', isPremium: true },
  { name: 'Tren', value: 'train', isPremium: true },
  { name: 'Gemi', value: 'ship', isPremium: true },
  { name: 'Pizza', value: 'pizza', isPremium: true },
  { name: 'Elma', value: 'apple', isPremium: true },
  { name: 'Hamburger', value: 'beef', isPremium: true },
  { name: 'Çatal Bıçak', value: 'utensils', isPremium: true },
];

// Google Play Console'da oluşturulan product ID'leri
// Bu ID'ler Google Play Console'dan alınmıştır
// RevenueCat Dashboard'da da aynı ID'ler kullanılacak
export const GOOGLE_PLAY_PRODUCT_IDS = {
  monthly: 'premium_monthly_subscription',  // Aylık abonelik product ID
  yearly: 'premium_yearly_subscription',    // Yıllık abonelik product ID
};

export const PREMIUM_PLANS = [
  {
    id: 'monthly',
    name: 'Aylık',
    price: 29.99,
    currency: '₺',
    interval: 'monthly' as const,
    productId: GOOGLE_PLAY_PRODUCT_IDS.monthly,
    features: [
      'Sınırsız alışkanlık',
      'Karanlık mod',
    ],
  },
  {
    id: 'yearly',
    name: 'Yıllık',
    price: 199.99,
    currency: '₺',
    interval: 'yearly' as const,
    productId: GOOGLE_PLAY_PRODUCT_IDS.yearly,
    features: [
      'Sınırsız alışkanlık',
      'Karanlık mod',
    ],
  },
];
