import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WalletCard = ({ balance, onTopUp, onRefresh, isRefreshing }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleRefresh = async () => {
    setIsAnimating(true);
    await onRefresh();
    setTimeout(() => setIsAnimating(false), 500);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  return (
    <div className="mx-4 mb-6">
      <div className="wallet-gradient rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Wallet" size={20} color="white" />
            <span className="text-white/90 text-sm font-medium">Wallet Balance</span>
          </div>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className={`p-2 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-200 ${
              isAnimating ? 'animate-spin' : ''
            }`}
          >
            <Icon name="RefreshCw" size={16} color="white" />
          </button>
        </div>
        
        <div className="mb-6">
          <h2 className="text-3xl font-bold mb-1">
            {formatCurrency(balance)}
          </h2>
          <p className="text-white/80 text-xs">
            Last updated: {new Date()?.toLocaleTimeString('en-NG', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>

        <Button
          variant="secondary"
          onClick={onTopUp}
          iconName="Plus"
          iconPosition="left"
          className="w-full bg-white text-primary hover:bg-white/90"
        >
          Top Up Wallet
        </Button>
      </div>
    </div>
  );
};

export default WalletCard;