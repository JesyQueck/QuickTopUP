import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AmountSelector = ({ selectedAmount, customAmount, onAmountSelect, onCustomAmountChange }) => {
  const presetAmounts = [100, 200, 500, 1000];

  const handlePresetClick = (amount) => {
    onAmountSelect(amount);
    onCustomAmountChange('');
  };

  const handleCustomAmountChange = (e) => {
    const value = e?.target?.value?.replace(/\D/g, ''); // Remove non-digits
    if (value === '' || parseInt(value) <= 50000) {
      onCustomAmountChange(value);
      onAmountSelect(parseInt(value) || 0);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    })?.format(amount);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-text-primary">
        Select Amount
      </label>
      {/* Preset Amount Buttons */}
      <div className="grid grid-cols-2 gap-3">
        {presetAmounts?.map((amount) => (
          <Button
            key={amount}
            variant={selectedAmount === amount && !customAmount ? "default" : "outline"}
            onClick={() => handlePresetClick(amount)}
            className="h-12 text-base font-medium"
          >
            {formatAmount(amount)}
          </Button>
        ))}
      </div>
      {/* Custom Amount Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-text-secondary">
          Or enter custom amount
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
            <span className="text-text-secondary">₦</span>
          </div>
          <Input
            type="text"
            placeholder="Enter amount"
            value={customAmount}
            onChange={handleCustomAmountChange}
            className="pl-8"
          />
        </div>
        {customAmount && parseInt(customAmount) < 50 && (
          <p className="text-sm text-destructive">Minimum amount is ₦50</p>
        )}
        {customAmount && parseInt(customAmount) > 50000 && (
          <p className="text-sm text-destructive">Maximum amount is ₦50,000</p>
        )}
      </div>
    </div>
  );
};

export default AmountSelector;