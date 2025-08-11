import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AppLogo = () => {
  return (
    <div className="flex flex-col items-center space-y-4 mb-8">
      {/* Logo Container */}
      <Link to="/splash-screen" className="flex items-center justify-center">
        <div className="relative">
          {/* Main Logo Circle */}
          <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary to-green-700 rounded-2xl shadow-lg">
            <Icon name="Zap" size={32} color="white" strokeWidth={2.5} />
          </div>
          
          {/* Accent Dot */}
          <div className="absolute -top-1 -right-1 w-6 h-6 bg-secondary rounded-full border-2 border-white shadow-md flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        </div>
      </Link>

      {/* App Name */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-1">QuickTopUp</h1>
        <p className="text-sm text-gray-500 font-medium">Fast & Secure Payments</p>
      </div>
    </div>
  );
};

export default AppLogo;