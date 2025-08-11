import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentMethodSelector = ({ 
  walletBalance, 
  selectedPaymentMethod, 
  onPaymentMethodChange, 
  totalAmount 
}) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    })?.format(amount);
  };

  const isWalletSufficient = walletBalance >= totalAmount;

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-text-primary">
        Payment Method
      </label>

      {/* Wallet Payment Option */}
      <div
        onClick={() => isWalletSufficient && onPaymentMethodChange('wallet')}
        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
          selectedPaymentMethod === 'wallet' && isWalletSufficient
            ? 'border-primary bg-primary/5'
            : isWalletSufficient
            ? 'border-border bg-card hover:border-primary/30' :'border-border bg-muted cursor-not-allowed opacity-60'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
              isWalletSufficient ? 'bg-primary/10' : 'bg-muted'
            }`}>
              <Icon 
                name="Wallet" 
                size={20} 
                color={isWalletSufficient ? 'var(--color-primary)' : 'var(--color-text-secondary)'} 
              />
            </div>
            <div>
              <p className={`font-medium ${
                isWalletSufficient ? 'text-text-primary' : 'text-text-secondary'
              }`}>
                Wallet Balance
              </p>
              <p className={`text-sm ${
                isWalletSufficient ? 'text-success' : 'text-destructive'
              }`}>
                {formatAmount(walletBalance)} available
              </p>
            </div>
          </div>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            selectedPaymentMethod === 'wallet' && isWalletSufficient
              ? 'border-primary bg-primary' :'border-border'
          }`}>
            {selectedPaymentMethod === 'wallet' && isWalletSufficient && (
              <Icon name="Check" size={12} color="white" />
            )}
          </div>
        </div>
        {!isWalletSufficient && totalAmount > 0 && (
          <div className="mt-2 flex items-center space-x-1">
            <Icon name="AlertTriangle" size={14} color="var(--color-destructive)" />
            <span className="text-sm text-destructive">
              Insufficient balance. Need {formatAmount(totalAmount - walletBalance)} more.
            </span>
          </div>
        )}
      </div>

      {/* Card Payment Option */}
      <div
        onClick={() => onPaymentMethodChange('card')}
        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
          selectedPaymentMethod === 'card' ?'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/30'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
              <Icon name="CreditCard" size={20} color="var(--color-secondary)" />
            </div>
            <div>
              <p className="font-medium text-text-primary">Debit/Credit Card</p>
              <p className="text-sm text-text-secondary">Pay with Paystack</p>
            </div>
          </div>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            selectedPaymentMethod === 'card' ?'border-primary bg-primary' :'border-border'
          }`}>
            {selectedPaymentMethod === 'card' && (
              <Icon name="Check" size={12} color="white" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;