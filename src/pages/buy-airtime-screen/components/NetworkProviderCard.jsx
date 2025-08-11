import React from 'react';
import Image from '../../../components/AppImage';

const NetworkProviderCard = ({ provider, isSelected, onSelect }) => {
  return (
    <div
      onClick={() => onSelect(provider)}
      className={`flex-shrink-0 w-20 h-20 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? 'border-primary bg-primary/5 shadow-md'
          : 'border-border bg-card hover:border-primary/30'
      }`}
    >
      <div className="flex flex-col items-center justify-center h-full p-2">
        <div className="w-8 h-8 mb-1">
          <Image
            src={provider?.logo}
            alt={`${provider?.name} logo`}
            className="w-full h-full object-contain"
          />
        </div>
        <span className={`text-xs font-medium text-center ${
          isSelected ? 'text-primary' : 'text-text-secondary'
        }`}>
          {provider?.name}
        </span>
      </div>
    </div>
  );
};

export default NetworkProviderCard;