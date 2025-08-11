import React from 'react';
import Icon from '../../../components/AppIcon';

const NetworkProviderCard = ({ provider, isSelected, onSelect }) => {
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

  const colors = getProviderColors(provider?.name);

  return (
    <div
      onClick={() => onSelect(provider)}
      className={`flex-shrink-0 w-24 h-20 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? `${colors?.border} ${colors?.selectedBg}`
          : 'border-border bg-card hover:border-accent'
      }`}
    >
      <div className="flex flex-col items-center justify-center h-full p-2">
        <div className={`w-8 h-8 rounded-full ${colors?.bg} flex items-center justify-center mb-1`}>
          <Icon name="Smartphone" size={16} color="white" />
        </div>
        <span className={`text-xs font-medium text-center ${
          isSelected ? colors?.text : 'text-text-secondary'
        }`}>
          {provider?.name}
        </span>
      </div>
    </div>
  );
};

export default NetworkProviderCard;