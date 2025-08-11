import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import LoginScreen from './pages/login-screen';
import BuyAirtimeScreen from './pages/buy-airtime-screen';
import SplashScreen from './pages/splash-screen';
import DashboardScreen from './pages/dashboard-screen';
import BuyDataScreen from './pages/buy-data-screen';
import TransactionHistoryScreen from './pages/transaction-history-screen';
import ProfileSettingsScreen from './pages/profile-settings-screen';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<BuyAirtimeScreen />} />
        <Route path="/login-screen" element={<LoginScreen />} />
        <Route path="/buy-airtime-screen" element={<BuyAirtimeScreen />} />
        <Route path="/splash-screen" element={<SplashScreen />} />
        <Route path="/dashboard-screen" element={<DashboardScreen />} />
        <Route path="/buy-data-screen" element={<BuyDataScreen />} />
        <Route path="/transaction-history-screen" element={<TransactionHistoryScreen />} />
        <Route path="/profile-settings-screen" element={<ProfileSettingsScreen />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;