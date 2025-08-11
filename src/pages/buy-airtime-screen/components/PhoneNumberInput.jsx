import React from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PhoneNumberInput = ({ phoneNumber, onPhoneNumberChange, error }) => {
  const handleInputChange = (e) => {
    const value = e?.target?.value?.replace(/\D/g, ''); // Remove non-digits
    if (value?.length <= 10) {
      onPhoneNumberChange(value);
    }
  };

  const formatPhoneNumber = (number) => {
    if (!number) return '';
    if (number?.length <= 3) return number;
    if (number?.length <= 6) return `${number?.slice(0, 3)} ${number?.slice(3)}`;
    return `${number?.slice(0, 3)} ${number?.slice(3, 6)} ${number?.slice(6)}`;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        Phone Number
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <div className="w-6 h-4 rounded-sm overflow-hidden">
            <div className="w-full h-1/3 bg-green-600"></div>
            <div className="w-full h-1/3 bg-white"></div>
            <div className="w-full h-1/3 bg-green-600"></div>
          </div>
          <span className="text-sm text-text-secondary">+234</span>
        </div>
        <Input
          type="tel"
          placeholder="803 123 4567"
          value={formatPhoneNumber(phoneNumber)}
          onChange={handleInputChange}
          error={error}
          className="pl-20"
        />
      </div>
      {error && (
        <div className="flex items-center space-x-1 text-destructive text-sm">
          <Icon name="AlertCircle" size={14} />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberInput;