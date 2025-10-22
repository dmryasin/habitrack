import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useHabitStore } from './store/useHabitStore';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { AddEditHabitPage } from './pages/AddEditHabitPage';
import { StatisticsPage } from './pages/StatisticsPage';
import { PremiumPage } from './pages/PremiumPage';
import { SettingsPage } from './pages/SettingsPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { HelpPage } from './pages/HelpPage';
import { TermsPage } from './pages/TermsPage';
import { BillingService } from './utils/billing';
import { AdMobService } from './utils/admob';

function App() {
  const { loadData, loading, theme, isPremium } = useHabitStore();

  useEffect(() => {
    // Uygulama verilerini yükle
    loadData();

    // RevenueCat SDK'sını başlat
    BillingService.initialize().catch(error => {
      console.error('Failed to initialize billing:', error);
    });

    // AdMob SDK'sını başlat
    AdMobService.initialize().catch(error => {
      console.error('Failed to initialize AdMob:', error);
    });
  }, [loadData]);

  // Premium durumu değiştiğinde reklamları güncelle
  useEffect(() => {
    AdMobService.updateAdVisibility(isPremium).catch(error => {
      console.error('Failed to update ad visibility:', error);
    });
  }, [isPremium]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="add" element={<AddEditHabitPage />} />
          <Route path="edit/:id" element={<AddEditHabitPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="premium" element={<PremiumPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/help" element={<HelpPage />} />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme={theme === 'dark' ? 'dark' : 'light'}
        className="!mt-16"
      />
    </BrowserRouter>
  );
}

export default App;
