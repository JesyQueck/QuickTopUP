import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const RecentTransactions = ({ transactions }) => {
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
      case 'success':
        return 'text-success bg-success/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      case 'failed': case'error':
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
      case 'wallet':
        return 'Wallet';
      default:
        return 'CreditCard';
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 2
    })?.format(amount);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!transactions || transactions?.length === 0) {
    return (
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-text-primary">Recent Transactions</h3>
        </div>
        <div className="mobile-card p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
            <Icon name="Receipt" size={24} className="text-text-secondary" />
          </div>
          <h4 className="text-lg font-medium text-text-primary mb-2">No transactions yet</h4>
          <p className="text-text-secondary text-sm">
            Your recent transactions will appear here
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Recent Transactions</h3>
        <Link
          to="/transaction-history-screen"
          className="text-primary text-sm font-medium hover:text-primary/80 transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="space-y-3">
        {transactions?.slice(0, 3)?.map((transaction) => (
          <div key={transaction?.id} className="mobile-card p-4">
            <div className="flex items-center space-x-4">
              <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${
                transaction?.type === 'airtime' ? 'from-blue-500 to-blue-600' : 
                transaction?.type === 'data'? 'from-green-500 to-green-600' : 'from-purple-500 to-purple-600'
              } flex items-center justify-center`}>
                <Icon 
                  name={getServiceIcon(transaction?.type)} 
                  size={18} 
                  color="white" 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-text-primary truncate">
                    {transaction?.description}
                  </h4>
                  <span className="text-sm font-semibold text-text-primary">
                    {formatCurrency(transaction?.amount)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-xs text-text-secondary">
                    {formatDate(transaction?.date)}
                  </p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction?.status)}`}>
                    {transaction?.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;