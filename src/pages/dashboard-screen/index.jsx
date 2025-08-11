import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import WelcomeSection from './components/WelcomeSection';
import WalletCard from './components/WalletCard';
import ServiceGrid from './components/ServiceGrid';
import RecentTransactions from './components/RecentTransactions';
import QuickActions from './components/QuickActions';
import NetworkStatus from './components/NetworkStatus';

const DashboardScreen = () => {
  const [walletBalance, setWalletBalance] = useState(15750.50);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [userName] = useState('Adebayo');

  // Mock transaction data
  const recentTransactions = [
    {
      id: 'txn_001',
      type: 'airtime',
      description: 'MTN Airtime - 08012345678',
      amount: 1000,
      status: 'Completed',
      date: new Date(Date.now() - 3600000) // 1 hour ago
    },
    {
      id: 'txn_002',
      type: 'data',
      description: 'Airtel 2GB Data Bundle',
      amount: 1200,
      status: 'Completed',
      date: new Date(Date.now() - 7200000) // 2 hours ago
    },
    {
      id: 'txn_003',
      type: 'wallet',
      description: 'Wallet Top-up via Card',
      amount: 5000,
      status: 'Pending',
      date: new Date(Date.now() - 10800000) // 3 hours ago
    }
  ];

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRefreshBalance = async () => {
    setIsRefreshing(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock balance update
    const mockBalance = Math.random() * 20000 + 10000;
    setWalletBalance(mockBalance);
    setLastUpdated(new Date());
    setIsRefreshing(false);
  };

  const handleTopUp = () => {
    // Mock top-up functionality
    console.log('Opening top-up modal...');
    // In real app, this would open a payment modal or navigate to top-up screen
  };

  const handleSearch = () => {
    // Mock search functionality
    console.log('Opening search...');
    // In real app, this would open search modal or navigate to search screen
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-20">
        {/* Network Status */}
        <NetworkStatus isOnline={isOnline} lastUpdated={!isOnline ? lastUpdated : null} />
        
        {/* Welcome Section */}
        <WelcomeSection userName={userName} />
        
        {/* Wallet Card */}
        <WalletCard
          balance={walletBalance}
          onTopUp={handleTopUp}
          onRefresh={handleRefreshBalance}
          isRefreshing={isRefreshing}
        />
        
        {/* Service Grid */}
        <ServiceGrid />
        
        {/* Recent Transactions */}
        <RecentTransactions transactions={recentTransactions} />
        
        {/* Quick Actions */}
        <QuickActions onTopUp={handleTopUp} onSearch={handleSearch} />
      </main>
      
      <BottomNavigation />
    </div>
  );
};

export default DashboardScreen;