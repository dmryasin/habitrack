import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Check, ArrowLeft, Sparkles, Star, Zap } from 'lucide-react';
import { useHabitStore } from '../store/useHabitStore';
import { Button } from '../components/Button';
import { PREMIUM_PLANS } from '../utils/constants';
import clsx from 'clsx';

export const PremiumPage: React.FC = () => {
  const navigate = useNavigate();
  const { isPremium, activatePremium } = useHabitStore();
  const [selectedPlan, setSelectedPlan] = React.useState(PREMIUM_PLANS[1].id);

  const handlePurchase = async () => {
    try {
      await activatePremium();
      setTimeout(() => navigate('/'), 1000);
    } catch (error) {
      // Error handled in store
    }
  };

  if (isPremium) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 via-orange-50 to-primary-100">
        <div className="max-w-lg mx-auto px-6 py-16">
          <div className="text-center">
            <div className="w-28 h-28 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-pulse">
              <Crown size={56} className="text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Premium Üyesiniz!
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              Tüm premium özelliklerin keyfini çıkarın
            </p>
            <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
              <div className="flex items-center justify-center space-x-2 text-primary-600 mb-3">
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
                <Star size={20} fill="currentColor" />
              </div>
              <p className="text-sm text-gray-600">
                Premium özelliklerden sınırsız faydalanıyorsunuz
              </p>
            </div>
            <Button onClick={() => navigate('/')} variant="primary" size="lg" fullWidth>
              Ana Sayfaya Dön
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-orange-50 to-primary-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm shadow-sm sticky top-0 z-10">
        <div className="max-w-lg mx-auto px-6 py-4 flex items-center">
          <button
            onClick={() => navigate('/')}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-6 py-8 space-y-8">
        {/* Hero */}
        <div className="text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
            <Crown size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            Premium'a Yükseltin
          </h1>
          <p className="text-gray-600 text-lg">
            Sınırsız alışkanlık ve gelişmiş özellikler
          </p>
        </div>

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
                  'w-full text-left p-6 rounded-3xl border-2 transition-all duration-200 relative overflow-hidden',
                  isSelected
                    ? 'border-primary-500 bg-white shadow-2xl scale-[1.02]'
                    : 'border-gray-200 bg-white hover:border-primary-300 shadow-sm'
                )}
              >
                {isYearly && (
                  <div className="absolute top-4 right-4">
                    <div className="flex items-center space-x-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                      <Sparkles size={14} />
                      <span>EN POPÜLER</span>
                    </div>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{plan.name}</h3>
                    <p className="text-sm text-gray-600">
                      {plan.interval === 'monthly' ? 'Her ay faturalandırılır' : 'Bir kez öde, yıl boyu kullan'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-4xl font-bold text-gray-900">
                      {plan.currency}{plan.price}
                    </p>
                    <p className="text-sm text-gray-600">
                      / {plan.interval === 'monthly' ? 'ay' : 'yıl'}
                    </p>
                  </div>
                </div>

                {isYearly && (
                  <div className="inline-flex items-center space-x-2 bg-green-100 text-green-700 px-4 py-2 rounded-xl text-sm font-semibold mb-4">
                    <Zap size={16} fill="currentColor" />
                    <span>%44 Tasarruf - Ayda sadece ₺16.66</span>
                  </div>
                )}

                {isSelected && (
                  <div className="flex items-center justify-center w-8 h-8 bg-primary-500 rounded-full absolute top-6 left-6">
                    <Check size={20} className="text-white" strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Features */}
        <div className="bg-white rounded-3xl p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center">
            <Sparkles size={24} className="text-primary-500 mr-2" />
            Premium Özellikler
          </h3>
          <div className="space-y-4">
            {PREMIUM_PLANS[0].features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-7 h-7 bg-primary-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={18} className="text-white" strokeWidth={3} />
                </div>
                <span className="text-gray-700 text-lg leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Purchase Button */}
        <div className="sticky bottom-6">
          <button
            onClick={handlePurchase}
            className="w-full bg-gradient-to-r from-primary-500 via-primary-600 to-orange-600 hover:from-primary-600 hover:via-primary-700 hover:to-orange-700 text-white rounded-2xl py-5 px-6 shadow-2xl transition-all duration-200 hover:shadow-3xl hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-3"
          >
            <Crown size={28} />
            <span className="text-xl font-bold">Premium'a Geç</span>
          </button>
          <p className="text-center text-sm text-gray-600 mt-4">
            İstediğiniz zaman iptal edebilirsiniz • Güvenli ödeme
          </p>
        </div>
      </div>
    </div>
  );
};
