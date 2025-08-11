import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const PhoneNumberInput = ({ value, onChange, error, selectedProvider }) => {
  const [isFocused, setIsFocused] = useState(false);

  const formatPhoneNumber = (input) => {
    // Remove all non-digits
    const digits = input?.replace(/\D/g, '');
    
    // If starts with 234, remove it
    const cleanDigits = digits?.startsWith('234') ? digits?.slice(3) : digits;
    
    // Limit to 10 digits
    const limitedDigits = cleanDigits?.slice(0, 10);
    
    // Format as XXX XXX XXXX
    if (limitedDigits?.length >= 7) {
      return `${limitedDigits?.slice(0, 3)} ${limitedDigits?.slice(3, 6)} ${limitedDigits?.slice(6)}`;
    } else if (limitedDigits?.length >= 4) {
      return `${limitedDigits?.slice(0, 3)} ${limitedDigits?.slice(3)}`;
    } else {
      return limitedDigits;
    }
  };

  const handleChange = (e) => {
    const formatted = formatPhoneNumber(e?.target?.value);
    onChange(formatted);
  };

  const validateNigerianNumber = (number) => {
    const digits = number?.replace(/\D/g, '');
    if (digits?.length !== 10) return false;
    
    // Nigerian mobile number prefixes
    const validPrefixes = ['070', '080', '081', '090', '091', '070', '071', '080', '081', '090', '091'];
    return validPrefixes?.some(prefix => digits?.startsWith(prefix));
  };

  const isValid = validateNigerianNumber(value);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-text-primary">
        Phone Number
        <span className="text-destructive ml-1">*</span>
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Icon name="Flag" size={16} color="#1B5E20" />
            <span className="text-sm font-medium text-text-primary">+234</span>
          </div>
          <div className="w-px h-4 bg-divider" />
        </div>
        <Input
          type="tel"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="803 123 4567"
          className="pl-20"
          error={error}
        />
        {value && isValid && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <Icon name="CheckCircle" size={16} color="#388E3C" />
          </div>
        )}
      </div>
      {selectedProvider && (
        <div className="flex items-center space-x-2 text-xs text-text-secondary">
          <Icon name="Info" size={12} />
          <span>Data will be sent to this {selectedProvider?.name} number</span>
        </div>
      )}
    </div>
  );
};

export default PhoneNumberInput;