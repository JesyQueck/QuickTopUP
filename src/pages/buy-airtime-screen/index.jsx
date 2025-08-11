import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import NetworkProviderCard from './components/NetworkProviderCard';
import PhoneNumberInput from './components/PhoneNumberInput';
import AmountSelector from './components/AmountSelector';
import PaymentMethodSelector from './components/PaymentMethodSelector';
import SuccessModal from './components/SuccessModal';

const BuyAirtimeScreen = () => {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('wallet');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);

  // Mock data
  const networkProviders = [
    {
      id: 'mtn',
      name: 'MTN',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 'airtel',
      name: 'Airtel',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: 'glo',
      name: 'Glo',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center'
    },
    {
      id: '9mobile',
      name: '9mobile',
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop&crop=center'
    }
  ];

  const walletBalance = 15000; // Mock wallet balance

  // Validate Nigerian phone number
  const validatePhoneNumber = (number) => {
    if (!number) {
      return 'Phone number is required';
    }
    if (number?.length !== 10) {
      return 'Phone number must be 10 digits';
    }
    const validPrefixes = ['803', '806', '813', '816', '703', '706', '803', '805', '807', '808', '809', '817', '818', '701', '708', '802', '808', '812', '701', '902', '904', '907', '909'];
    const prefix = number?.substring(0, 3);
    if (!validPrefixes?.includes(prefix)) {
      return 'Invalid Nigerian phone number';
    }
    return '';
  };

  // Handle phone number change
  const handlePhoneNumberChange = (number) => {
    setPhoneNumber(number);
    const error = validatePhoneNumber(number);
    setPhoneNumberError(error);
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      selectedProvider &&
      phoneNumber &&
      !phoneNumberError &&
      selectedAmount >= 50 &&
      selectedPaymentMethod &&
      (selectedPaymentMethod === 'card' || walletBalance >= selectedAmount)
    );
  };

  // Handle purchase
  const handlePurchase = async () => {
    if (!isFormValid()) return;

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create transaction details
      const details = {
        network: selectedProvider?.name,
        phoneNumber: phoneNumber,
        amount: selectedAmount,
        paymentMethod: selectedPaymentMethod,
        transactionId: `TXN${Date.now()}`,
        status: 'successful'
      };

      setTransactionDetails(details);
      setShowSuccessModal(true);
    } catch (error) {
      console.error('Purchase failed:', error);
      // Handle error (show error modal or toast)
    } finally {
      setIsLoading(false);
    }
  };

  // Handle success modal close
  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    navigate('/dashboard-screen');
  };

  // Format amount for display
  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    })?.format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card border-b border-border safe-area-top">
        <div className="flex items-center justify-between h-16 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard-screen')}
            iconName="ArrowLeft"
            iconSize={20}
          />
          <h1 className="text-lg font-semibold text-text-primary">Buy Airtime</h1>
          <div className="w-10" /> {/* Spacer for center alignment */}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 p-4 pb-24 space-y-6">
        {/* Network Provider Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-text-primary">
            Select Network Provider
          </label>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {networkProviders?.map((provider) => (
              <NetworkProviderCard
                key={provider?.id}
                provider={provider}
                isSelected={selectedProvider?.id === provider?.id}
                onSelect={setSelectedProvider}
              />
            ))}
          </div>
        </div>

        {/* Phone Number Input */}
        <PhoneNumberInput
          phoneNumber={phoneNumber}
          onPhoneNumberChange={handlePhoneNumberChange}
          error={phoneNumberError}
        />

        {/* Amount Selection */}
        <AmountSelector
          selectedAmount={selectedAmount}
          customAmount={customAmount}
          onAmountSelect={setSelectedAmount}
          onCustomAmountChange={setCustomAmount}
        />

        {/* Payment Method Selection */}
        {selectedAmount >= 50 && (
          <PaymentMethodSelector
            walletBalance={walletBalance}
            selectedPaymentMethod={selectedPaymentMethod}
            onPaymentMethodChange={setSelectedPaymentMethod}
            totalAmount={selectedAmount}
          />
        )}

        {/* Transaction Summary */}
        {isFormValid() && (
          <div className="bg-muted rounded-xl p-4">
            <h3 className="font-medium text-text-primary mb-3">Transaction Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-text-secondary">Network</span>
                <span className="text-text-primary">{selectedProvider?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Phone Number</span>
                <span className="text-text-primary">+234 {phoneNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Amount</span>
                <span className="font-semibold text-primary">{formatAmount(selectedAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-secondary">Payment Method</span>
                <span className="text-text-primary capitalize">{selectedPaymentMethod}</span>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Bottom Purchase Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 safe-area-bottom">
        <Button
          variant="default"
          fullWidth
          disabled={!isFormValid()}
          loading={isLoading}
          onClick={handlePurchase}
          className="h-14 text-lg font-semibold"
        >
          {isLoading ? 'Processing...' : `Buy Airtime ${selectedAmount > 0 ? formatAmount(selectedAmount) : ''}`}
        </Button>
      </div>
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessModalClose}
        transactionDetails={transactionDetails}
      />
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
          <div className="bg-card rounded-xl p-6 flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-text-primary font-medium">Processing your purchase...</p>
            <p className="text-text-secondary text-sm text-center">
              Please wait while we process your airtime purchase
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyAirtimeScreen;