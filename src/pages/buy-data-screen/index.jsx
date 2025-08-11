import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/ui/Button';
import NetworkProviderCard from './components/NetworkProviderCard';
import DataPackageCard from './components/DataPackageCard';
import PhoneNumberInput from './components/PhoneNumberInput';
import PaymentMethodSection from './components/PaymentMethodSection';
import PurchaseButton from './components/PurchaseButton';
import SuccessModal from './components/SuccessModal';
import LoadingSkeleton from './components/LoadingSkeleton';

const BuyDataScreen = () => {
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('wallet');
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState(null);
  const [phoneError, setPhoneError] = useState('');

  // Mock data
  const networkProviders = [
    { id: 'mtn', name: 'MTN', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop' },
    { id: 'airtel', name: 'Airtel', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop' },
    { id: 'glo', name: 'Glo', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop' },
    { id: '9mobile', name: '9mobile', logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop' }
  ];

  const getDataPackages = (providerId) => {
    const packages = {
      mtn: [
        { id: 'mtn_1gb', amount: '1GB', validity: '30 days', price: 350, features: ['All networks', '24/7 support'] },
        { id: 'mtn_2gb', amount: '2GB', validity: '30 days', price: 700, discount: 5, features: ['All networks', '24/7 support'] },
        { id: 'mtn_5gb', amount: '5GB', validity: '30 days', price: 1500, discount: 10, features: ['All networks', '24/7 support', 'Bonus 500MB'] },
        { id: 'mtn_10gb', amount: '10GB', validity: '30 days', price: 2800, discount: 15, features: ['All networks', '24/7 support', 'Bonus 1GB'] }
      ],
      airtel: [
        { id: 'airtel_1gb', amount: '1GB', validity: '30 days', price: 300, features: ['4G speed', 'Night plan'] },
        { id: 'airtel_2gb', amount: '2GB', validity: '30 days', price: 600, discount: 8, features: ['4G speed', 'Night plan'] },
        { id: 'airtel_5gb', amount: '5GB', validity: '30 days', price: 1400, discount: 12, features: ['4G speed', 'Night plan', 'Weekend bonus'] },
        { id: 'airtel_10gb', amount: '10GB', validity: '30 days', price: 2700, discount: 18, features: ['4G speed', 'Night plan', 'Weekend bonus'] }
      ],
      glo: [
        { id: 'glo_1gb', amount: '1GB', validity: '30 days', price: 320, features: ['Glo network', 'Data rollover'] },
        { id: 'glo_2gb', amount: '2GB', validity: '30 days', price: 640, discount: 6, features: ['Glo network', 'Data rollover'] },
        { id: 'glo_5gb', amount: '5GB', validity: '30 days', price: 1450, discount: 9, features: ['Glo network', 'Data rollover', 'Free browsing'] },
        { id: 'glo_10gb', amount: '10GB', validity: '30 days', price: 2750, discount: 14, features: ['Glo network', 'Data rollover', 'Free browsing'] }
      ],
      '9mobile': [
        { id: '9mobile_1gb', amount: '1GB', validity: '30 days', price: 330, features: ['9mobile network', 'Social bundles'] },
        { id: '9mobile_2gb', amount: '2GB', validity: '30 days', price: 660, discount: 7, features: ['9mobile network', 'Social bundles'] },
        { id: '9mobile_5gb', amount: '5GB', validity: '30 days', price: 1480, discount: 11, features: ['9mobile network', 'Social bundles', 'Music streaming'] },
        { id: '9mobile_10gb', amount: '10GB', validity: '30 days', price: 2800, discount: 16, features: ['9mobile network', 'Social bundles', 'Music streaming'] }
      ]
    };
    return packages?.[providerId] || [];
  };

  const walletBalance = 5000;

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const getProviderColors = (providerName) => {
    switch (providerName?.toLowerCase()) {
      case 'mtn':
        return {
          bg: 'bg-yellow-500',
          border: 'border-yellow-500',
          text: 'text-yellow-600',
          selectedBg: 'bg-yellow-50'
        };
      case 'airtel':
        return {
          bg: 'bg-red-500',
          border: 'border-red-500',
          text: 'text-red-600',
          selectedBg: 'bg-red-50'
        };
      case 'glo':
        return {
          bg: 'bg-green-500',
          border: 'border-green-500',
          text: 'text-green-600',
          selectedBg: 'bg-green-50'
        };
      case '9mobile':
        return {
          bg: 'bg-emerald-500',
          border: 'border-emerald-500',
          text: 'text-emerald-600',
          selectedBg: 'bg-emerald-50'
        };
      default:
        return {
          bg: 'bg-gray-500',
          border: 'border-gray-500',
          text: 'text-gray-600',
          selectedBg: 'bg-gray-50'
        };
    }
  };

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setSelectedPackage(null); // Reset package selection when provider changes
  };

  const handlePackageSelect = (dataPackage) => {
    setSelectedPackage(dataPackage);
  };

  const handlePhoneNumberChange = (value) => {
    setPhoneNumber(value);
    setPhoneError('');
    
    // Validate Nigerian number
    const digits = value?.replace(/\D/g, '');
    if (digits?.length === 10) {
      const validPrefixes = ['070', '080', '081', '090', '091'];
      const isValid = validPrefixes?.some(prefix => digits?.startsWith(prefix));
      if (!isValid) {
        setPhoneError('Please enter a valid Nigerian phone number');
      }
    }
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleTopUpWallet = () => {
    // Navigate to wallet top-up screen (mock)
    alert('Redirecting to wallet top-up...');
  };

  const handlePurchase = async () => {
    if (!selectedProvider || !selectedPackage || !phoneNumber || !paymentMethod) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));

      const transaction = {
        provider: selectedProvider,
        package: selectedPackage,
        phoneNumber,
        amount: selectedPackage?.price,
        reference: `QT${Date.now()}`,
        timestamp: new Date()?.toISOString(),
        paymentMethod
      };

      setTransactionDetails(transaction);
      setShowSuccessModal(true);
      
      // Reset form
      setSelectedProvider(null);
      setSelectedPackage(null);
      setPhoneNumber('');
      setPaymentMethod('wallet');
      
    } catch (error) {
      alert('Transaction failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'QuickTopUp Receipt',
        text: `Data purchase successful!\nNetwork: ${transactionDetails?.provider?.name}\nAmount: ${transactionDetails?.package?.amount}\nPrice: ₦${transactionDetails?.amount?.toLocaleString()}\nReference: ${transactionDetails?.reference}`
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      const text = `Data purchase successful!\nNetwork: ${transactionDetails?.provider?.name}\nAmount: ${transactionDetails?.package?.amount}\nPrice: ₦${transactionDetails?.amount?.toLocaleString()}\nReference: ${transactionDetails?.reference}`;
      navigator.clipboard?.writeText(text);
      alert('Receipt copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="sticky top-0 z-header bg-card border-b border-border">
          <div className="flex items-center justify-between h-16 px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard-screen')}
              iconName="ArrowLeft"
              iconSize={20}
            />
            <h1 className="text-lg font-semibold text-text-primary">Buy Data</h1>
            <div className="w-10" />
          </div>
        </div>

        {/* Loading Content */}
        <div className="p-4">
          <LoadingSkeleton />
        </div>
      </div>
    );
  }

  const dataPackages = selectedProvider ? getDataPackages(selectedProvider?.id) : [];
  const providerColors = getProviderColors(selectedProvider?.name);

  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="sticky top-0 z-header bg-card border-b border-border">
        <div className="flex items-center justify-between h-16 px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard-screen')}
            iconName="ArrowLeft"
            iconSize={20}
          />
          <h1 className="text-lg font-semibold text-text-primary">Buy Data</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/transaction-history-screen')}
            iconName="History"
            iconSize={20}
          />
        </div>
      </div>
      {/* Content */}
      <div className="p-4 space-y-6">
        {/* Network Provider Selection */}
        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-text-primary">Select Network</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {networkProviders?.map((provider) => (
              <NetworkProviderCard
                key={provider?.id}
                provider={provider}
                isSelected={selectedProvider?.id === provider?.id}
                onSelect={handleProviderSelect}
              />
            ))}
          </div>
        </div>

        {/* Phone Number Input */}
        {selectedProvider && (
          <PhoneNumberInput
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            error={phoneError}
            selectedProvider={selectedProvider}
          />
        )}

        {/* Data Packages */}
        {selectedProvider && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-text-primary">
              Choose Data Package
            </h2>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {dataPackages?.map((dataPackage) => (
                <DataPackageCard
                  key={dataPackage?.id}
                  package={dataPackage}
                  isSelected={selectedPackage?.id === dataPackage?.id}
                  onSelect={handlePackageSelect}
                  providerColors={providerColors}
                />
              ))}
            </div>
          </div>
        )}

        {/* Payment Method */}
        {selectedPackage && (
          <PaymentMethodSection
            walletBalance={walletBalance}
            selectedPackage={selectedPackage}
            paymentMethod={paymentMethod}
            onPaymentMethodChange={handlePaymentMethodChange}
            onTopUpWallet={handleTopUpWallet}
          />
        )}
      </div>
      {/* Purchase Button */}
      <PurchaseButton
        selectedProvider={selectedProvider}
        selectedPackage={selectedPackage}
        phoneNumber={phoneNumber}
        paymentMethod={paymentMethod}
        isProcessing={isProcessing}
        onPurchase={handlePurchase}
      />
      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        transactionDetails={transactionDetails}
        onShare={handleShare}
      />
    </div>
  );
};

export default BuyDataScreen;