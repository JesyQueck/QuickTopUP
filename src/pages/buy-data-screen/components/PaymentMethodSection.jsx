import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaymentMethodSection = ({ 
  walletBalance, 
  selectedPackage, 
  paymentMethod, 
  onPaymentMethodChange,
  onTopUpWallet 
}) => {
  const packagePrice = selectedPackage?.price || 0;
  const hasInsufficientFunds = walletBalance < packagePrice;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-text-primary">Payment Method</h3>
      {/* Wallet Balance Card */}
      <div className="p-4 bg-gradient-to-r from-primary to-green-600 rounded-xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">Wallet Balance</p>
            <p className="text-2xl font-bold">₦{walletBalance?.toLocaleString()}</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Icon name="Wallet" size={24} color="white" />
          </div>
        </div>
        {hasInsufficientFunds && selectedPackage && (
          <div className="mt-3 p-3 bg-white/10 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} color="white" />
              <span className="text-sm">
                Insufficient funds. Need ₦{(packagePrice - walletBalance)?.toLocaleString()} more
              </span>
            </div>
          </div>
        )}
      </div>
      {/* Payment Options */}
      <div className="space-y-3">
        {/* Wallet Payment */}
        <div
          onClick={() => !hasInsufficientFunds && onPaymentMethodChange('wallet')}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
            paymentMethod === 'wallet' && !hasInsufficientFunds
              ? 'border-primary bg-green-50'
              : hasInsufficientFunds
              ? 'border-border bg-muted opacity-50 cursor-not-allowed' :'border-border bg-card hover:border-accent'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                hasInsufficientFunds ? 'bg-muted' : 'bg-primary'
              }`}>
                <Icon name="Wallet" size={20} color={hasInsufficientFunds ? '#757575' : 'white'} />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">Pay with Wallet</h4>
                <p className="text-sm text-text-secondary">
                  {hasInsufficientFunds ? 'Insufficient balance' : 'Instant payment'}
                </p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === 'wallet' && !hasInsufficientFunds
                ? 'border-primary bg-primary' :'border-border'
            }`}>
              {paymentMethod === 'wallet' && !hasInsufficientFunds && (
                <Icon name="Check" size={12} color="white" />
              )}
            </div>
          </div>
        </div>

        {/* Top Up Wallet Option */}
        {hasInsufficientFunds && (
          <Button
            variant="outline"
            onClick={onTopUpWallet}
            iconName="Plus"
            iconPosition="left"
            className="w-full"
          >
            Top Up Wallet
          </Button>
        )}

        {/* Paystack Payment */}
        <div
          onClick={() => onPaymentMethodChange('paystack')}
          className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
            paymentMethod === 'paystack' ?'border-primary bg-green-50' :'border-border bg-card hover:border-accent'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Icon name="CreditCard" size={20} color="white" />
              </div>
              <div>
                <h4 className="font-medium text-text-primary">Pay with Card</h4>
                <p className="text-sm text-text-secondary">Visa, Mastercard, Verve</p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              paymentMethod === 'paystack' ?'border-primary bg-primary' :'border-border'
            }`}>
              {paymentMethod === 'paystack' && (
                <Icon name="Check" size={12} color="white" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodSection;