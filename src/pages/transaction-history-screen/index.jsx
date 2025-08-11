import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import TransactionCard from './components/TransactionCard';
import FilterBottomSheet from './components/FilterBottomSheet';
import TransactionDetailModal from './components/TransactionDetailModal';
import EmptyState from './components/EmptyState';
import SearchBar from './components/SearchBar';
import LoadingSkeleton from './components/LoadingSkeleton';

const TransactionHistoryScreen = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // Mock transaction data
  const mockTransactions = [
    {
      id: 'TXN001234567',
      serviceType: 'Airtime',
      provider: 'MTN',
      phoneNumber: '08012345678',
      amount: 1000,
      status: 'Success',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      reference: 'QT12345678',
      failureReason: null
    },
    {
      id: 'TXN001234568',
      serviceType: 'Data',
      provider: 'Airtel',
      phoneNumber: '08087654321',
      amount: 2500,
      status: 'Success',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      reference: 'QT12345679',
      dataPlan: '2GB - 30 Days',
      failureReason: null
    },
    {
      id: 'TXN001234569',
      serviceType: 'Airtime',
      provider: 'Glo',
      phoneNumber: '08098765432',
      amount: 500,
      status: 'Pending',
      timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000), // 8 hours ago
      reference: 'QT12345680',
      failureReason: null
    },
    {
      id: 'TXN001234570',
      serviceType: 'Data',
      provider: '9mobile',
      phoneNumber: '08123456789',
      amount: 1500,
      status: 'Failed',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      reference: 'QT12345681',
      dataPlan: '1GB - 30 Days',
      failureReason: 'Insufficient balance in wallet'
    },
    {
      id: 'TXN001234571',
      serviceType: 'Airtime',
      provider: 'MTN',
      phoneNumber: '08056789012',
      amount: 2000,
      status: 'Success',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      reference: 'QT12345682',
      failureReason: null
    },
    {
      id: 'TXN001234572',
      serviceType: 'Data',
      provider: 'Airtel',
      phoneNumber: '08034567890',
      amount: 5000,
      status: 'Success',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      reference: 'QT12345683',
      dataPlan: '5GB - 30 Days',
      failureReason: null
    },
    {
      id: 'TXN001234573',
      serviceType: 'Airtime',
      provider: 'Glo',
      phoneNumber: '08045678901',
      amount: 1000,
      status: 'Success',
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      reference: 'QT12345684',
      failureReason: null
    },
    {
      id: 'TXN001234574',
      serviceType: 'Data',
      provider: 'MTN',
      phoneNumber: '08067890123',
      amount: 3000,
      status: 'Success',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      reference: 'QT12345685',
      dataPlan: '3GB - 30 Days',
      failureReason: null
    }
  ];

  // Filter state
  const [filters, setFilters] = useState({
    serviceTypes: [],
    statuses: [],
    amountRange: { min: 0, max: Infinity, id: 'all' },
    dateRange: { from: '', to: '' }
  });

  // Load transactions
  const loadTransactions = useCallback(async (pageNum = 1, refresh = false) => {
    if (refresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const startIndex = (pageNum - 1) * 10;
      const endIndex = startIndex + 10;
      const paginatedData = mockTransactions?.slice(startIndex, endIndex);
      
      if (refresh || pageNum === 1) {
        setTransactions(paginatedData);
      } else {
        setTransactions(prev => [...prev, ...paginatedData]);
      }
      
      setHasMore(endIndex < mockTransactions?.length);
      setPage(pageNum);
    } catch (error) {
      console.error('Error loading transactions:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Filter transactions
  const applyFilters = useCallback(() => {
    let filtered = [...transactions];

    // Search filter
    if (searchTerm) {
      filtered = filtered?.filter(transaction =>
        transaction?.phoneNumber?.includes(searchTerm) ||
        transaction?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        transaction?.reference?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      );
    }

    // Service type filter
    if (filters?.serviceTypes?.length > 0) {
      filtered = filtered?.filter(transaction =>
        filters?.serviceTypes?.includes(transaction?.serviceType?.toLowerCase())
      );
    }

    // Status filter
    if (filters?.statuses?.length > 0) {
      filtered = filtered?.filter(transaction =>
        filters?.statuses?.includes(transaction?.status?.toLowerCase())
      );
    }

    // Amount range filter
    if (filters?.amountRange?.id !== 'all') {
      filtered = filtered?.filter(transaction =>
        transaction?.amount >= filters?.amountRange?.min &&
        transaction?.amount <= filters?.amountRange?.max
      );
    }

    // Date range filter
    if (filters?.dateRange?.from || filters?.dateRange?.to) {
      filtered = filtered?.filter(transaction => {
        const transactionDate = new Date(transaction.timestamp);
        const fromDate = filters?.dateRange?.from ? new Date(filters.dateRange.from) : null;
        const toDate = filters?.dateRange?.to ? new Date(filters.dateRange.to) : null;

        if (fromDate && toDate) {
          return transactionDate >= fromDate && transactionDate <= toDate;
        } else if (fromDate) {
          return transactionDate >= fromDate;
        } else if (toDate) {
          return transactionDate <= toDate;
        }
        return true;
      });
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, filters]);

  // Load initial data
  useEffect(() => {
    loadTransactions(1, true);
  }, [loadTransactions]);

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Handle search
  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Handle filter application
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  // Handle transaction tap
  const handleTransactionTap = (transaction) => {
    setSelectedTransaction(transaction);
    setIsDetailModalOpen(true);
  };

  // Handle swipe actions
  const handleSwipeAction = (action, transaction) => {
    switch (action) {
      case 'retry': console.log('Retrying transaction:', transaction?.id);
        break;
      case 'repeat':
        if (transaction?.serviceType?.toLowerCase() === 'airtime') {
          navigate('/buy-airtime-screen', { 
            state: { 
              phoneNumber: transaction?.phoneNumber,
              provider: transaction?.provider,
              amount: transaction?.amount
            }
          });
        } else {
          navigate('/buy-data-screen', { 
            state: { 
              phoneNumber: transaction?.phoneNumber,
              provider: transaction?.provider
            }
          });
        }
        break;
      case 'share':
        if (navigator.share) {
          navigator.share({
            title: 'Transaction Receipt',
            text: `Transaction #${transaction?.id} - ₦${transaction?.amount?.toLocaleString()}`,
            url: window.location?.href
          });
        }
        break;
      default:
        break;
    }
  };

  // Handle pull to refresh
  const handleRefresh = () => {
    loadTransactions(1, true);
  };

  // Handle load more
  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      loadTransactions(page + 1);
    }
  };

  // Clear filters
  const handleClearFilters = () => {
    setFilters({
      serviceTypes: [],
      statuses: [],
      amountRange: { min: 0, max: Infinity, id: 'all' },
      dateRange: { from: '', to: '' }
    });
    setSearchTerm('');
  };

  // Check if filters are active
  const hasActiveFilters = filters?.serviceTypes?.length > 0 || 
                          filters?.statuses?.length > 0 || 
                          filters?.amountRange?.id !== 'all' || 
                          filters?.dateRange?.from || 
                          filters?.dateRange?.to ||
                          searchTerm;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <main className="pt-16 pb-20 px-4">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold text-text-primary">Transaction History</h1>
            <p className="text-sm text-text-secondary mt-1">
              {filteredTransactions?.length} transaction{filteredTransactions?.length !== 1 ? 's' : ''}
              {hasActiveFilters && ' (filtered)'}
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFilterOpen(true)}
              iconName="Filter"
              iconSize={20}
              className={hasActiveFilters ? 'text-primary' : ''}
            />
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Active Filters Indicator */}
        {hasActiveFilters && (
          <div className="flex items-center justify-between mb-4 p-3 bg-primary/5 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={16} color="var(--color-primary)" />
              <span className="text-sm text-primary font-medium">Filters applied</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              iconName="X"
              iconSize={14}
              className="text-primary hover:text-primary/80"
            >
              Clear
            </Button>
          </div>
        )}

        {/* Content */}
        {isLoading && transactions?.length === 0 ? (
          <LoadingSkeleton count={8} />
        ) : filteredTransactions?.length === 0 ? (
          <EmptyState 
            type={hasActiveFilters ? 'no-filtered-results' : 'no-transactions'}
            onAction={hasActiveFilters ? handleClearFilters : () => navigate('/buy-airtime-screen')}
          />
        ) : (
          <>
            {/* Pull to Refresh Indicator */}
            {isRefreshing && (
              <div className="flex items-center justify-center py-4">
                <div className="flex items-center space-x-2 text-primary">
                  <Icon name="RefreshCw" size={16} className="animate-spin" />
                  <span className="text-sm">Refreshing...</span>
                </div>
              </div>
            )}

            {/* Transaction List */}
            <div className="space-y-0">
              {filteredTransactions?.map((transaction) => (
                <TransactionCard
                  key={transaction?.id}
                  transaction={transaction}
                  onTap={handleTransactionTap}
                  onSwipeAction={handleSwipeAction}
                />
              ))}
            </div>

            {/* Load More */}
            {hasMore && !isLoading && (
              <div className="flex justify-center mt-6">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  iconName="ChevronDown"
                  iconPosition="right"
                >
                  Load More
                </Button>
              </div>
            )}

            {/* Loading More Indicator */}
            {isLoading && transactions?.length > 0 && (
              <div className="mt-4">
                <LoadingSkeleton count={3} />
              </div>
            )}
          </>
        )}
      </main>
      {/* Filter Bottom Sheet */}
      <FilterBottomSheet
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        onApplyFilters={handleApplyFilters}
        currentFilters={filters}
      />
      {/* Transaction Detail Modal */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false);
          setSelectedTransaction(null);
        }}
      />
      <BottomNavigation />
    </div>
  );
};

export default TransactionHistoryScreen;