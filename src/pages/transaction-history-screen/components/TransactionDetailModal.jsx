import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionDetailModal = ({ transaction, isOpen, onClose }) => {
  if (!isOpen || !transaction) return null;

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date?.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      time: date?.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      })
    };
  };

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

  const handleDownloadReceipt = () => {
    // Mock receipt download functionality
    console.log('Downloading receipt for transaction:', transaction?.id);
  };

  const handleShareReceipt = () => {
    // Mock share functionality
    if (navigator.share) {
      navigator.share({
        title: 'Transaction Receipt',
        text: `Transaction #${transaction?.id} - ${formatAmount(transaction?.amount)}`,
        url: window.location?.href
      });
    }
  };

  const { date, time } = formatDateTime(transaction?.timestamp);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-modal-backdrop"
        onClick={onClose}
      />
      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-card rounded-2xl shadow-elevated z-modal animate-fade-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-divider">
          <h2 className="text-lg font-semibold text-text-primary">Transaction Details</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-accent transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Service Info */}
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
              <Icon 
                name={getServiceIcon(transaction?.serviceType)} 
                size={24} 
                color="var(--color-primary)" 
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-text-primary">
                {transaction?.serviceType} Purchase
              </h3>
              <p className="text-sm text-text-secondary">{transaction?.provider}</p>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction?.status)}`}>
              {transaction?.status}
            </div>
          </div>
          
          {/* Transaction Details */}
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-divider">
              <span className="text-sm text-text-secondary">Transaction ID</span>
              <span className="text-sm font-mono text-text-primary">#{transaction?.id}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-divider">
              <span className="text-sm text-text-secondary">Phone Number</span>
              <span className="text-sm font-medium text-text-primary">{transaction?.phoneNumber}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-divider">
              <span className="text-sm text-text-secondary">Amount</span>
              <span className="text-lg font-semibold text-text-primary">{formatAmount(transaction?.amount)}</span>
            </div>
            
            {transaction?.serviceType?.toLowerCase() === 'data' && (
              <div className="flex justify-between items-center py-2 border-b border-divider">
                <span className="text-sm text-text-secondary">Data Plan</span>
                <span className="text-sm font-medium text-text-primary">{transaction?.dataPlan || '1GB - 30 Days'}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center py-2 border-b border-divider">
              <span className="text-sm text-text-secondary">Service Fee</span>
              <span className="text-sm text-text-primary">₦0.00</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-divider">
              <span className="text-sm text-text-secondary">Date</span>
              <span className="text-sm text-text-primary">{date}</span>
            </div>
            
            <div className="flex justify-between items-center py-2 border-b border-divider">
              <span className="text-sm text-text-secondary">Time</span>
              <span className="text-sm text-text-primary">{time}</span>
            </div>
            
            <div className="flex justify-between items-center py-2">
              <span className="text-sm text-text-secondary">Reference</span>
              <span className="text-xs font-mono text-text-primary">{transaction?.reference || 'QT' + Date.now()?.toString()?.slice(-8)}</span>
            </div>
          </div>
          
          {/* Additional Info */}
          {transaction?.status?.toLowerCase() === 'failed' && (
            <div className="p-3 bg-destructive/10 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertCircle" size={16} color="var(--color-destructive)" />
                <div>
                  <p className="text-sm font-medium text-destructive">Transaction Failed</p>
                  <p className="text-xs text-destructive/80 mt-1">
                    {transaction?.failureReason || 'Network error occurred. Please try again.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Footer Actions */}
        <div className="p-4 border-t border-divider space-y-3">
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={handleDownloadReceipt}
              iconName="Download"
              iconPosition="left"
              className="flex-1"
            >
              Download
            </Button>
            <Button
              variant="outline"
              onClick={handleShareReceipt}
              iconName="Share"
              iconPosition="left"
              className="flex-1"
            >
              Share
            </Button>
          </div>
          
          {transaction?.status?.toLowerCase() === 'failed' && (
            <Button
              variant="default"
              iconName="RotateCcw"
              iconPosition="left"
              fullWidth
            >
              Retry Transaction
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default TransactionDetailModal;