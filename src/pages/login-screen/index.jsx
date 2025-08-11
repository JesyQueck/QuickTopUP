import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppLogo from './components/AppLogo';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import SocialLogin from './components/SocialLogin';
import AuthToggle from './components/AuthToggle';

const LoginScreen = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard-screen');
    }
  }, [navigate]);

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Main Auth Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* App Logo */}
          <AppLogo />

          {/* Welcome Text */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">
              {isLoginMode ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-600">
              {isLoginMode 
                ? 'Sign in to your account to continue' :'Join QuickTopUp and start managing your transactions'
              }
            </p>
          </div>

          {/* Auth Form - Login or Registration */}
          {isLoginMode ? <LoginForm /> : <RegistrationForm />}

          {/* Social Login */}
          <SocialLogin />

          {/* Auth Toggle */}
          <AuthToggle isLoginMode={isLoginMode} onToggle={toggleMode} />
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            By {isLoginMode ? 'signing in' : 'creating an account'}, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;