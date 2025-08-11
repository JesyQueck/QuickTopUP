import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PurchaseButton = ({ 
  selectedProvider, 
  selectedPackage, 
  phoneNumber, 
  paymentMethod, 
  isProcessing, 
  onPurchase 
}) => {
  const isFormValid = selectedProvider && selectedPackage && phoneNumber && paymentMethod;
  const buttonText = isProcessing ? 'Processing...' : 'Buy Data Bundle';

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-area-bottom">
      {selectedPackage && (
        <div className="mb-4 p-3 bg-accent rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">Selected Package</p>
              <p className="font-semibold text-text-primary">
                {selectedPackage?.amount} - {selectedPackage?.validity}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-text-secondary">Total</p>
              <p className="text-xl font-bold text-primary">
                ₦{selectedPackage?.price?.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
      <Button
        variant="default"
        size="lg"
        fullWidth
        disabled={!isFormValid || isProcessing}
        loading={isProcessing}
        onClick={onPurchase}
        iconName={isProcessing ? "Loader2" : "Database"}
        iconPosition="left"
        className="h-14 text-lg font-semibold"
      >
        {buttonText}
      </Button>
      {!isFormValid && (
        <div className="mt-2 flex items-center justify-center space-x-2 text-text-secondary">
          <Icon name="Info" size={14} />
          <span className="text-sm">Complete all fields to continue</span>
        </div>
      )}
    </div>
  );
};

export default PurchaseButton;