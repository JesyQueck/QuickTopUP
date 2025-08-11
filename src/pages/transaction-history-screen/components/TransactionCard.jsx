import React from 'react';
import Icon from '../../../components/AppIcon';

const TransactionCard = ({ transaction, onTap, onSwipeAction }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'success':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed':
        return 'text-destructive bg-destructive/10';
      default:
        return 'text-text-secondary bg-muted';
    }
  };

  const getServiceIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'airtime':
        return 'Phone';
      case 'data':
        return 'Wifi';
      default:
        return 'Smartphone';
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const transactionDate = new Date(timestamp);
    const diffInMinutes = Math.floor((now - transactionDate) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    if (diffInMinutes < 10080) return `${Math.floor(diffInMinutes / 1440)} days ago`;
    
    return transactionDate?.toLocaleDateString('en-GB');
  };

  return (
    <div 
      className="mobile-card p-4 mb-3 cursor-pointer hover:shadow-md transition-shadow duration-200"
      onClick={() => onTap(transaction)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {/* Service Icon */}
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
            <Icon 
              name={getServiceIcon(transaction?.serviceType)} 
              size={20} 
              color="var(--color-primary)" 
            />
          </div>
          
          {/* Transaction Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-semibold text-text-primary truncate">
                {transaction?.serviceType} - {transaction?.provider}
              </h3>
              <span className="text-sm font-semibold text-text-primary">
                {formatAmount(transaction?.amount)}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-xs text-text-secondary truncate">
                {transaction?.phoneNumber}
              </p>
              <span className="text-xs text-text-secondary">
                {formatTimestamp(transaction?.timestamp)}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Status Badge */}
      <div className="flex items-center justify-between mt-3">
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction?.status)}`}>
          {transaction?.status}
        </span>
        
        {/* Transaction ID */}
        <span className="text-xs text-text-secondary font-mono">
          #{transaction?.id}
        </span>
      </div>
      {/* Quick Actions (Hidden by default, shown on swipe) */}
      <div className="hidden mt-3 pt-3 border-t border-divider">
        <div className="flex items-center justify-around space-x-2">
          {transaction?.status?.toLowerCase() === 'failed' && (
            <button
              onClick={(e) => {
                e?.stopPropagation();
                onSwipeAction('retry', transaction);
              }}
              className="flex items-center space-x-1 px-3 py-2 bg-warning/10 text-warning rounded-lg text-xs font-medium"
            >
              <Icon name="RotateCcw" size={14} />
              <span>Retry</span>
            </button>
          )}
          
          <button
            onClick={(e) => {
              e?.stopPropagation();
              onSwipeAction('repeat', transaction);
            }}
            className="flex items-center space-x-1 px-3 py-2 bg-primary/10 text-primary rounded-lg text-xs font-medium"
          >
            <Icon name="Repeat" size={14} />
            <span>Repeat</span>
          </button>
          
          <button
            onClick={(e) => {
              e?.stopPropagation();
              onSwipeAction('share', transaction);
            }}
            className="flex items-center space-x-1 px-3 py-2 bg-accent text-text-primary rounded-lg text-xs font-medium"
          >
            <Icon name="Share" size={14} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionCard;