import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SuccessModal = ({ 
  isOpen, 
  onClose, 
  transactionDetails,
  onShare 
}) => {
  if (!isOpen) return null;

  const { provider, package: dataPackage, phoneNumber, amount, reference, timestamp } = transactionDetails;

  return (
    <div className="fixed inset-0 z-modal bg-black/50 flex items-center justify-center p-4">
      <div className="bg-card rounded-2xl p-6 w-full max-w-md animate-slide-up">
        {/* Success Icon */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Check" size={32} color="white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Purchase Successful!</h2>
          <p className="text-text-secondary">Your data bundle has been activated</p>
        </div>

        {/* Transaction Details */}
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-accent rounded-xl">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Database" size={20} color="white" />
              </div>
              <div>
                <h3 className="font-semibold text-text-primary">{dataPackage?.amount}</h3>
                <p className="text-sm text-text-secondary">{dataPackage?.validity}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-text-secondary">Network</p>
                <p className="font-medium text-text-primary">{provider?.name}</p>
              </div>
              <div>
                <p className="text-text-secondary">Amount</p>
                <p className="font-medium text-text-primary">₦{amount?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-text-secondary">Phone Number</p>
                <p className="font-medium text-text-primary">+234 {phoneNumber}</p>
              </div>
              <div>
                <p className="text-text-secondary">Reference</p>
                <p className="font-medium text-text-primary">{reference}</p>
              </div>
            </div>
          </div>

          <div className="text-center text-sm text-text-secondary">
            <p>Transaction completed on</p>
            <p className="font-medium">{new Date(timestamp)?.toLocaleString()}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            variant="outline"
            fullWidth
            onClick={onShare}
            iconName="Share"
            iconPosition="left"
          >
            Share Receipt
          </Button>
          <Button
            variant="default"
            fullWidth
            onClick={onClose}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;