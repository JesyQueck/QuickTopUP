import React from 'react';
import Icon from '../../../components/AppIcon';

const DataPackageCard = ({ package: dataPackage, isSelected, onSelect, providerColors }) => {
  return (
    <div
      onClick={() => onSelect(dataPackage)}
      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
        isSelected
          ? `${providerColors?.border} ${providerColors?.selectedBg}`
          : 'border-border bg-card hover:border-accent'
      }`}
    >
      <div className="space-y-3">
        {/* Header with icon and selection indicator */}
        <div className="flex items-center justify-between">
          <div className={`w-10 h-10 rounded-lg ${providerColors?.bg} flex items-center justify-center`}>
            <Icon name="Database" size={20} color="white" />
          </div>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
            isSelected
              ? `${providerColors?.border} ${providerColors?.bg}`
              : 'border-border'
          }`}>
            {isSelected && (
              <Icon name="Check" size={12} color="white" />
            )}
          </div>
        </div>

        {/* Package info */}
        <div>
          <h3 className="font-bold text-lg text-text-primary">{dataPackage?.amount}</h3>
          <p className="text-sm text-text-secondary">{dataPackage?.validity}</p>
        </div>

        {/* Price section */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline space-x-1">
            <span className="font-bold text-xl text-text-primary">₦{dataPackage?.price?.toLocaleString()}</span>
          </div>
          {dataPackage?.discount && (
            <span className="text-xs font-medium text-success bg-success/10 px-2 py-1 rounded-full">
              Save {dataPackage?.discount}%
            </span>
          )}
        </div>

        {/* Features */}
        {dataPackage?.features && (
          <div className="pt-3 border-t border-divider">
            <div className="flex flex-wrap gap-1">
              {dataPackage?.features?.map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-accent text-text-secondary text-xs rounded-md"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DataPackageCard;