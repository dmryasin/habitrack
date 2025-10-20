export const HABIT_COLORS = [
  { name: 'Kırmızı', value: '#EF4444' },
  { name: 'Turuncu', value: '#F97316' },
  { name: 'Sarı', value: '#EAB308' },
  { name: 'Yeşil', value: '#22C55E' },
  { name: 'Mavi', value: '#3B82F6' },
  { name: 'Mor', value: '#A855F7' },
  { name: 'Pembe', value: '#EC4899' },
  { name: 'Kahverengi', value: '#A16207' },
];

export const HABIT_ICONS = [
  { name: 'Kitap', value: 'book-open' },
  { name: 'Spor', value: 'dumbbell' },
  { name: 'Meditasyon', value: 'brain' },
  { name: 'Su İçme', value: 'droplet' },
  { name: 'Uyku', value: 'moon' },
  { name: 'Yürüyüş', value: 'footprints' },
  { name: 'Müzik', value: 'music' },
  { name: 'Kod Yazma', value: 'code' },
  { name: 'Çizim', value: 'palette' },
  { name: 'Yazma', value: 'pen-tool' },
  { name: 'Kahve', value: 'coffee' },
  { name: 'Kalp', value: 'heart' },
  { name: 'Yıldız', value: 'star' },
  { name: 'Hedef', value: 'target' },
  { name: 'Ağırlık', value: 'weight' },
  { name: 'Bisiklet', value: 'bike' },
];

export const PREMIUM_PLANS = [
  {
    id: 'monthly',
    name: 'Aylık',
    price: 29.99,
    currency: '₺',
    interval: 'monthly' as const,
    features: [
      'Sınırsız alışkanlık',
      'Reklamsız deneyim',
      'Gelişmiş istatistikler',
      'Özel renkler ve ikonlar',
      'Karanlık mod',
      'Veri yedekleme',
    ],
  },
  {
    id: 'yearly',
    name: 'Yıllık',
    price: 199.99,
    currency: '₺',
    interval: 'yearly' as const,
    features: [
      'Sınırsız alışkanlık',
      'Reklamsız deneyim',
      'Gelişmiş istatistikler',
      'Özel renkler ve ikonlar',
      'Karanlık mod',
      'Veri yedekleme',
      '%44 tasarruf',
      'Öncelikli destek',
    ],
  },
];
