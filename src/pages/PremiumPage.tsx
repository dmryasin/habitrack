import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Check, Sparkles, Star, Zap, RefreshCw } from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';
import { Button } from '../components/Button';
import { PREMIUM_PLANS } from '../utils/constants';
import { getTranslation } from '../utils/i18n';
import { BillingService } from '../utils/billing';
import { toast } from 'react-toastify';
import clsx from 'clsx';
import type { PurchasesPackage } from '@revenuecat/purchases-capacitor';

export const PremiumPage: React.FC = () => {
  const navigate = useNavigate();
  const { isPremium, activatePremium, language } = useHabitStore();
  const [selectedPlan, setSelectedPlan] = React.useState(PREMIUM_PLANS[1].id);
  const [availablePackages, setAvailablePackages] = React.useState<PurchasesPackage[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [restoring, setRestoring] = React.useState(false);
  const t = (key: string) => getTranslation(language, key);

  // Satın alınabilir paketleri yükle
  React.useEffect(() => {
    const loadPackages = async () => {
      try {
        const packages = await BillingService.getAvailablePackages();
        setAvailablePackages(packages);
      } catch (error) {
        console.error('Error loading packages:', error);
      }
    };

    loadPackages();
  }, []);

  const handlePurchase = async () => {
    if (loading) return;

    setLoading(true);
    try {
      // Debug: Mevcut paketleri logla
      console.log('Available packages:', availablePackages);
      console.log('Selected plan:', selectedPlan);

      // Seçili plana göre paketi bul
      // RevenueCat package identifier'ları: $rc_monthly, $rc_annual
      let selectedPackage = availablePackages.find(pkg => {
        if (selectedPlan === 'monthly') {
          // Monthly için: identifier $rc_monthly veya MONTHLY package type
          return pkg.identifier === '$rc_monthly' ||
                 pkg.packageType === 'MONTHLY' ||
                 pkg.product.identifier.includes('monthly');
        } else if (selectedPlan === 'yearly') {
          // Yearly için: identifier $rc_annual veya ANNUAL package type
          return pkg.identifier === '$rc_annual' ||
                 pkg.packageType === 'ANNUAL' ||
                 pkg.product.identifier.includes('yearly');
        }
        return false;
      });

      // Eğer bulunamazsa, productId ile eşleşmeyi dene
      if (!selectedPackage) {
        const planId = PREMIUM_PLANS.find(p => p.id === selectedPlan);
        selectedPackage = availablePackages.find(pkg =>
          pkg.product.identifier === planId?.productId ||
          pkg.product.identifier.startsWith(planId?.productId || '')
        );
      }

      console.log('Selected package:', selectedPackage);

      if (!selectedPackage) {
        // Paketler yüklenmediyse veya web'deyse, eski yöntemi kullan (test için)
        console.warn('No package found. Available packages:', availablePackages.length);
        toast.info(t('purchaseNotAvailable') || 'Satın alma sadece mobil cihazlarda kullanılabilir');
        // Test için ödeme yapmadan aktifleştir (sadece development)
        if (import.meta.env.DEV) {
          await activatePremium();
          setTimeout(() => navigate('/'), 1000);
        }
        return;
      }

      // Gerçek satın alma işlemi
      const result = await BillingService.purchasePremium(selectedPackage);

      if (result.success) {
        // Premium durumunu store'a kaydet
        await activatePremium();
        toast.success(t('premiumActivated'));
        setTimeout(() => navigate('/'), 1000);
      } else if (result.error !== 'Purchase cancelled by user') {
        toast.error(result.error || t('errorActivatingPremium'));
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error(t('errorActivatingPremium'));
    } finally {
      setLoading(false);
    }
  };

  const handleRestorePurchases = async () => {
    if (restoring) return;

    setRestoring(true);
    try {
      const result = await BillingService.restorePurchases();

      if (result.success && result.isPremium) {
        await activatePremium();
        toast.success(t('premiumRestored') || 'Premium üyeliğiniz geri yüklendi');
        setTimeout(() => navigate('/'), 1000);
      } else if (result.success && !result.isPremium) {
        toast.info(t('noPurchaseFound') || 'Geri yüklenecek satın alma bulunamadı');
      } else {
        toast.error(result.error || t('errorRestoringPurchase'));
      }
    } catch (error) {
      console.error('Restore error:', error);
      toast.error(t('errorRestoringPurchase') || 'Satın alma geri yüklenemedi');
    } finally {
      setRestoring(false);
    }
  };

  if (isPremium) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="max-w-lg mx-auto px-6 py-16">
          <div className="text-center">
            <div className="w-28 h-28 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
              <Crown size={56} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">
              {t('premiumMember')}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
              {t('enjoyPremiumFeatures')}
            </p>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700 mb-6">
              <div className="flex items-center justify-center space-x-2 text-primary-600 dark:text-primary-400 mb-3">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t('usingPremiumFeatures')}
              </p>
            </div>
            <Button onClick={() => navigate('/')} variant="primary" size="lg" fullWidth>
              {t('backToHome')}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-lg mx-auto px-6 py-6">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-[#C85A3E]/10 dark:bg-[#C85A3E]/20 flex items-center justify-center">
              <Crown size={22} className="text-[#C85A3E]" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{t('premium')}</h1>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400 ml-13">{t('unlimitedHabitsAdvanced')}</p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-6 space-y-6">
        {/* Plan Selection */}
        <div className="space-y-4">
          {PREMIUM_PLANS.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const isYearly = plan.interval === 'yearly';

            return (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={clsx(
                  'w-full text-left p-6 rounded-3xl border-2 transition-all duration-200 relative overflow-visible',
                  isSelected
                    ? 'border-primary-500 bg-white dark:bg-gray-800 shadow-2xl scale-[1.02]'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-primary-300 dark:hover:border-primary-600 shadow-sm'
                )}
              >
                {isYearly && (
                  <div className="absolute -top-3 left-6 z-10">
                    <div className="flex items-center space-x-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      <Sparkles size={14} />
                      <span>{t('mostPopular')}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0 flex items-start gap-2 sm:gap-3">
                    {isSelected && (
                      <div className="flex items-center justify-center w-6 h-6 bg-primary-500 rounded-full flex-shrink-0 mt-1">
                        <Check size={16} className="text-white" strokeWidth={3} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                        {t(plan.interval === 'monthly' ? 'monthly' : 'yearly')}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 sm:mb-3">
                        {plan.interval === 'monthly' ? t('billedMonthly') : t('payOnceYearly')}
                      </p>
                      {isYearly && (
                        <div className="inline-flex items-center space-x-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-xl text-xs font-semibold">
                          <Zap size={14} fill="currentColor" />
                          <span className="whitespace-nowrap">{t('savingMonthly')}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 whitespace-nowrap">
                      {plan.currency}{plan.price}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 whitespace-nowrap">
                      / {plan.interval === 'monthly' ? t('perMonth') : t('perYear')}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Features */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border-2 border-gray-200 dark:border-gray-700">
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-5 flex items-center">
            <Sparkles size={24} className="text-primary-500 mr-2" />
            {t('premiumFeatures')}
          </h3>
          <div className="space-y-4">
            {['feature1', 'feature2', 'feature3'].map((featureKey, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={18} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">{t(featureKey)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase Button */}
        <div className="sticky bottom-6 space-y-3">
          <button
            onClick={handlePurchase}
            disabled={loading}
            className="w-full bg-[#C85A3E] hover:bg-[#B34F35] disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-2xl py-5 px-6 shadow-2xl transition-all duration-200 hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3"
          >
            {loading ? (
              <>
                <RefreshCw size={28} className="animate-spin" />
                <span className="text-xl font-bold">{t('processing') || 'İşleniyor...'}</span>
              </>
            ) : (
              <>
                <Crown size={28} />
                <span className="text-xl font-bold">{t('switchToPremium')}</span>
              </>
            )}
          </button>

          {/* Restore Purchases Button */}
          <button
            onClick={handleRestorePurchases}
            disabled={restoring}
            className="w-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-500 text-gray-700 dark:text-gray-300 rounded-2xl py-4 px-6 transition-all duration-200 hover:shadow-lg flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {restoring ? (
              <>
                <RefreshCw size={20} className="animate-spin" />
                <span className="font-semibold">{t('restoring') || 'Geri Yükleniyor...'}</span>
              </>
            ) : (
              <>
                <RefreshCw size={20} />
                <span className="font-semibold">{t('restorePurchases') || 'Satın Almaları Geri Yükle'}</span>
              </>
            )}
          </button>

          <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-4">
            {t('cancelAnytimeSecure')}
          </p>
        </div>
      </div>
    </div>
  );
};
