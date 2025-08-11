import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const AppLogo = ({ onAnimationComplete }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scale, setScale] = useState(0.8);

  useEffect(() => {
    // Start animation after component mounts
    const timer1 = setTimeout(() => {
      setIsVisible(true);
      setScale(1);
    }, 100);

    // Complete animation after 2 seconds
    const timer2 = setTimeout(() => {
      onAnimationComplete?.();
    }, 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onAnimationComplete]);

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Logo Container */}
      <div 
        className={`flex items-center justify-center w-24 h-24 bg-primary rounded-3xl shadow-lg transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          transform: `scale(${scale})`,
          filter: 'drop-shadow(0 10px 20px rgba(27, 94, 32, 0.3))'
        }}
      >
        <Icon name="Zap" size={40} color="white" strokeWidth={2.5} />
      </div>
      
      {/* App Name */}
      <div 
        className={`transition-all duration-1000 delay-300 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <h1 className="text-3xl font-bold text-primary text-center">
          QuickTopUp
        </h1>
        <p className="text-sm text-text-secondary text-center mt-1 font-medium">
          Fast &amp; Secure Payments
        </p>
      </div>
    </div>
  );
};

export default AppLogo;