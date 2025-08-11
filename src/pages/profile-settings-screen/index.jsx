import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import Button from '../../components/ui/Button';
import PersonalInfoSection from './components/PersonalInfoSection';
import AccountSecuritySection from './components/AccountSecuritySection';
import NotificationPreferences from './components/NotificationPreferences';
import AppPreferences from './components/AppPreferences';
import SupportSection from './components/SupportSection';
import AccountManagement from './components/AccountManagement';
import UserAvatar from './components/UserAvatar';

const ProfileSettingsScreen = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  // Mock user data
  const [userInfo, setUserInfo] = useState({
    fullName: 'Adebayo Johnson',
    email: 'adebayo.johnson@email.com',
    phoneNumber: '+234 801 234 5678',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    isVerified: true,
    accountType: 'Premium',
    joinDate: '2023-08-15',
    walletLimit: 100000,
    lastLogin: new Date()
  });

  const [preferences, setPreferences] = useState({
    biometricAuth: true,
    twoFactorAuth: false,
    transactionAlerts: true,
    promotionalMessages: false,
    systemNotifications: true,
    theme: 'system',
    language: 'en',
    currency: 'NGN'
  });

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call to refresh user data
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsRefreshing(false);
  };

  const handleUpdateUserInfo = (updatedInfo) => {
    setUserInfo(prev => ({ ...prev, ...updatedInfo }));
    // In real app, this would make API call to update user info
  };

  const handleUpdatePreferences = (updatedPrefs) => {
    setPreferences(prev => ({ ...prev, ...updatedPrefs }));
    // In real app, this would make API call to update preferences
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // In real app, this would clear auth tokens and redirect to login
    console.log('User logged out');
    navigate('/login-screen');
  };

  const handlePullToRefresh = (e) => {
    if (e?.target?.scrollTop === 0 && !isRefreshing) {
      handleRefresh();
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 pb-20">
          <div className="animate-pulse p-4 space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-accent rounded-full"></div>
              <div className="flex-1 space-y-2">
                <div className="h-6 bg-accent rounded w-3/4"></div>
                <div className="h-4 bg-accent rounded w-1/2"></div>
              </div>
            </div>
            {[1, 2, 3, 4, 5]?.map(i => (
              <div key={i} className="bg-card rounded-xl p-4 border border-border">
                <div className="h-6 bg-accent rounded w-1/3 mb-3"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-accent rounded"></div>
                  <div className="h-4 bg-accent rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main 
        className="pt-16 pb-20" 
        onScroll={handlePullToRefresh}
        style={{ overscrollBehavior: 'contain' }}
      >
        {/* Pull to Refresh Indicator */}
        {isRefreshing && (
          <div className="flex justify-center py-4">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}

        {/* User Avatar Section */}
        <UserAvatar 
          userInfo={userInfo}
          onUpdateAvatar={(imageUrl) => handleUpdateUserInfo({ profileImage: imageUrl })}
        />

        <div className="p-4 space-y-6">
          {/* Personal Information */}
          <PersonalInfoSection 
            userInfo={userInfo}
            onUpdate={handleUpdateUserInfo}
          />

          {/* Account Security */}
          <AccountSecuritySection 
            preferences={preferences}
            onUpdate={handleUpdatePreferences}
          />

          {/* Notification Preferences */}
          <NotificationPreferences 
            preferences={preferences}
            onUpdate={handleUpdatePreferences}
          />

          {/* App Preferences */}
          <AppPreferences 
            preferences={preferences}
            onUpdate={handleUpdatePreferences}
          />

          {/* Account Management */}
          <AccountManagement 
            userInfo={userInfo}
          />

          {/* Support Section */}
          <SupportSection />

          {/* Logout Button */}
          <div className="pt-4">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLogout}
              iconName="LogOut"
              className="w-full border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            >
              Logout
            </Button>
          </div>
        </div>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-modal-backdrop"
            onClick={() => setShowLogoutModal(false)}
          />
          <div className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 bg-card rounded-xl border border-border shadow-elevated z-modal max-w-sm mx-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-2">
                Confirm Logout
              </h3>
              <p className="text-text-secondary mb-6">
                Are you sure you want to logout? You'll need to login again to access your account.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLogoutModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={confirmLogout}
                  className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      <BottomNavigation />
    </div>
  );
};

export default ProfileSettingsScreen;