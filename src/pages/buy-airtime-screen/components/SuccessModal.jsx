import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ isOpen, onClose, transactionDetails }) => {
  if (!isOpen) return null;

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    })?.format(amount);
  };

  const formatPhoneNumber = (number) => {
    if (!number) return '';
    return `+234 ${number?.slice(0, 3)} ${number?.slice(3, 6)} ${number?.slice(6)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-card rounded-2xl p-6 w-full max-w-sm animate-slide-up">
        <div className="text-center space-y-4">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="CheckCircle" size={32} color="var(--color-success)" />
          </div>

          {/* Success Message */}
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              Airtime Purchase Successful!
            </h3>
            <p className="text-text-secondary">
              Your airtime has been successfully purchased and credited to your phone.
            </p>
          </div>

          {/* Transaction Details */}
          <div className="bg-muted rounded-xl p-4 space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Network</span>
              <span className="font-medium text-text-primary">
                {transactionDetails?.network}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Phone Number</span>
              <span className="font-medium text-text-primary">
                {formatPhoneNumber(transactionDetails?.phoneNumber)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Amount</span>
              <span className="font-semibold text-primary text-lg">
                {formatAmount(transactionDetails?.amount)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Transaction ID</span>
              <span className="font-mono text-sm text-text-primary">
                {transactionDetails?.transactionId}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-secondary">Date & Time</span>
              <span className="text-sm text-text-primary">
                {new Date()?.toLocaleString('en-NG', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              variant="default"
              fullWidth
              onClick={onClose}
              className="h-12"
            >
              Done
            </Button>
            <Button
              variant="outline"
              fullWidth
              iconName="Share"
              iconPosition="left"
              className="h-12"
            >
              Share Receipt
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;