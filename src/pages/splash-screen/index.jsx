import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundGradient from './components/BackgroundGradient';
import AppLogo from './components/AppLogo';
import LoadingIndicator from './components/LoadingIndicator';
import RetryPrompt from './components/RetryPrompt';

const SplashScreen = () => {
  const navigate = useNavigate();
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showRetry, setShowRetry] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);
  const [initializationComplete, setInitializationComplete] = useState(false);

  // Mock authentication check
  const checkAuthStatus = () => {
    const token = localStorage.getItem('authToken');
    const hasCompletedOnboarding = localStorage.getItem('hasCompletedOnboarding');
    
    if (token && hasCompletedOnboarding) {
      return 'dashboard';
    } else if (hasCompletedOnboarding) {
      return 'login';
    } else {
      return 'login'; // New users go to login/registration
    }
  };

  // Simulate initialization tasks
  const initializeApp = async () => {
    try {
      setShowRetry(false);
      setLoadingProgress(0);

      // Simulate checking authentication tokens
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoadingProgress(25);

      // Simulate loading user wallet data
      await new Promise(resolve => setTimeout(resolve, 400));
      setLoadingProgress(50);

      // Simulate fetching network provider configurations
      await new Promise(resolve => setTimeout(resolve, 300));
      setLoadingProgress(75);

      // Simulate preparing cached transaction history
      await new Promise(resolve => setTimeout(resolve, 400));
      setLoadingProgress(100);

      // Mark initialization as complete
      setInitializationComplete(true);

    } catch (error) {
      console.error('Initialization failed:', error);
      setShowRetry(true);
    }
  };

  // Handle navigation after splash
  const handleNavigationAfterSplash = () => {
    if (!initializationComplete) return;

    const nextRoute = checkAuthStatus();
    
    // Add a small delay for smooth transition
    setTimeout(() => {
      switch (nextRoute) {
        case 'dashboard': navigate('/dashboard-screen', { replace: true });
          break;
        case 'login': navigate('/login-screen', { replace: true });
          break;
        default:
          navigate('/login-screen', { replace: true });
      }
    }, 500);
  };

  // Handle retry functionality
  const handleRetry = async () => {
    setIsRetrying(true);
    await initializeApp();
    setIsRetrying(false);
  };

  // Handle timeout (show retry after 5 seconds)
  useEffect(() => {
    const timeoutTimer = setTimeout(() => {
      if (!initializationComplete && !showRetry) {
        setShowRetry(true);
      }
    }, 5000);

    return () => clearTimeout(timeoutTimer);
  }, [initializationComplete, showRetry]);

  // Start initialization on component mount
  useEffect(() => {
    initializeApp();
  }, []);

  // Handle navigation when initialization completes
  useEffect(() => {
    if (initializationComplete && loadingProgress === 100) {
      handleNavigationAfterSplash();
    }
  }, [initializationComplete, loadingProgress]);

  // Handle reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')?.matches;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white safe-area-top safe-area-bottom">
      {/* Background Gradient */}
      <BackgroundGradient />
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8">
        {/* App Logo */}
        <div className="mb-16">
          <AppLogo 
            onAnimationComplete={() => {
              // Logo animation completed
            }}
          />
        </div>
        
        {/* Loading or Retry Content */}
        <div className="flex flex-col items-center">
          {showRetry ? (
            <RetryPrompt 
              onRetry={handleRetry}
              isRetrying={isRetrying}
            />
          ) : (
            <LoadingIndicator progress={loadingProgress} />
          )}
        </div>
      </div>
      {/* Footer */}
      <div className="relative z-10 pb-8">
        <p className="text-xs text-text-secondary text-center">
          Powered by QuickTopUp &copy; {new Date()?.getFullYear()}
        </p>
        <p className="text-xs text-text-secondary text-center mt-1">
          Secure &amp; Trusted Payments
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;