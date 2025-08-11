import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type = 'no-transactions', onAction }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'no-transactions':
        return {
          icon: 'Receipt',
          title: 'No Transactions Yet',
          description: 'Your transaction history will appear here once you make your first purchase.',
          actionText: 'Buy Airtime',
          actionIcon: 'Phone'
        };
      case 'no-filtered-results':
        return {
          icon: 'Search',
          title: 'No Results Found',
          description: 'No transactions match your current filters. Try adjusting your search criteria.',
          actionText: 'Clear Filters',
          actionIcon: 'X'
        };
      case 'network-error':
        return {
          icon: 'WifiOff',
          title: 'Connection Error',
          description: 'Unable to load your transactions. Please check your internet connection and try again.',
          actionText: 'Retry',
          actionIcon: 'RefreshCw'
        };
      default:
        return {
          icon: 'Receipt',
          title: 'No Transactions',
          description: 'No transactions available at the moment.',
          actionText: 'Refresh',
          actionIcon: 'RefreshCw'
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      {/* Illustration */}
      <div className="flex items-center justify-center w-24 h-24 bg-muted rounded-full mb-6">
        <Icon 
          name={content?.icon} 
          size={48} 
          color="var(--color-text-secondary)" 
          strokeWidth={1.5}
        />
      </div>
      {/* Content */}
      <div className="max-w-sm mx-auto mb-8">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          {content?.title}
        </h3>
        <p className="text-sm text-text-secondary leading-relaxed">
          {content?.description}
        </p>
      </div>
      {/* Action Button */}
      {onAction && (
        <Button
          onClick={onAction}
          iconName={content?.actionIcon}
          iconPosition="left"
          className="min-w-[140px]"
        >
          {content?.actionText}
        </Button>
      )}
      {/* Additional Help Text */}
      {type === 'no-transactions' && (
        <p className="text-xs text-text-secondary mt-6 max-w-xs">
          Start by purchasing airtime or data bundles to see your transaction history here.
        </p>
      )}
    </div>
  );
};

export default EmptyState;