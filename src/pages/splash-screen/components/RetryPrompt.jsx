import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const RetryPrompt = ({ onRetry, isRetrying = false }) => {
  return (
    <div className="flex flex-col items-center space-y-6 px-8">
      {/* Error Icon */}
      <div className="flex items-center justify-center w-16 h-16 bg-red-50 rounded-full">
        <Icon name="WifiOff" size={32} color="#DC2626" />
      </div>
      
      {/* Error Message */}
      <div className="text-center space-y-2">
        <h3 className="text-lg font-semibold text-text-primary">
          Connection Timeout
        </h3>
        <p className="text-sm text-text-secondary max-w-xs">
          Unable to connect to our servers. Please check your internet connection and try again.
        </p>
      </div>
      
      {/* Retry Button */}
      <Button
        variant="default"
        onClick={onRetry}
        loading={isRetrying}
        iconName="RefreshCw"
        iconPosition="left"
        iconSize={16}
        className="min-w-[120px]"
      >
        {isRetrying ? 'Retrying...' : 'Try Again'}
      </Button>
      
      {/* Help Text */}
      <p className="text-xs text-text-secondary text-center max-w-xs">
        If the problem persists, please check your network settings or contact support.
      </p>
    </div>
  );
};

export default RetryPrompt;