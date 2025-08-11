import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterBottomSheet = ({ isOpen, onClose, onApplyFilters, currentFilters }) => {
  const [filters, setFilters] = useState(currentFilters);

  const serviceTypes = [
    { id: 'airtime', label: 'Airtime', icon: 'Phone' },
    { id: 'data', label: 'Data', icon: 'Wifi' }
  ];

  const statusOptions = [
    { id: 'success', label: 'Success', color: 'text-success' },
    { id: 'pending', label: 'Pending', color: 'text-warning' },
    { id: 'failed', label: 'Failed', color: 'text-destructive' }
  ];

  const amountRanges = [
    { id: 'all', label: 'All Amounts', min: 0, max: Infinity },
    { id: 'low', label: '₦100 - ₦1,000', min: 100, max: 1000 },
    { id: 'medium', label: '₦1,000 - ₦5,000', min: 1000, max: 5000 },
    { id: 'high', label: '₦5,000+', min: 5000, max: Infinity }
  ];

  const handleServiceTypeToggle = (serviceId) => {
    const updatedServices = filters?.serviceTypes?.includes(serviceId)
      ? filters?.serviceTypes?.filter(id => id !== serviceId)
      : [...filters?.serviceTypes, serviceId];
    
    setFilters({ ...filters, serviceTypes: updatedServices });
  };

  const handleStatusToggle = (statusId) => {
    const updatedStatuses = filters?.statuses?.includes(statusId)
      ? filters?.statuses?.filter(id => id !== statusId)
      : [...filters?.statuses, statusId];
    
    setFilters({ ...filters, statuses: updatedStatuses });
  };

  const handleAmountRangeChange = (rangeId) => {
    const range = amountRanges?.find(r => r?.id === rangeId);
    setFilters({ 
      ...filters, 
      amountRange: { min: range?.min, max: range?.max, id: rangeId }
    });
  };

  const handleDateRangeChange = (field, value) => {
    setFilters({
      ...filters,
      dateRange: { ...filters?.dateRange, [field]: value }
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleClear = () => {
    const clearedFilters = {
      serviceTypes: [],
      statuses: [],
      amountRange: { min: 0, max: Infinity, id: 'all' },
      dateRange: { from: '', to: '' }
    };
    setFilters(clearedFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-modal-backdrop"
        onClick={onClose}
      />
      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl shadow-elevated z-modal animate-slide-up max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-divider">
          <h2 className="text-lg font-semibold text-text-primary">Filter Transactions</h2>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-accent transition-colors"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        {/* Content */}
        <div className="overflow-y-auto flex-1 p-4 space-y-6">
          {/* Service Types */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">Service Type</h3>
            <div className="flex flex-wrap gap-2">
              {serviceTypes?.map((service) => (
                <button
                  key={service?.id}
                  onClick={() => handleServiceTypeToggle(service?.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                    filters?.serviceTypes?.includes(service?.id)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-text-secondary border-border hover:bg-accent'
                  }`}
                >
                  <Icon name={service?.icon} size={16} />
                  <span className="text-sm">{service?.label}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Status */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">Status</h3>
            <div className="flex flex-wrap gap-2">
              {statusOptions?.map((status) => (
                <button
                  key={status?.id}
                  onClick={() => handleStatusToggle(status?.id)}
                  className={`px-3 py-2 rounded-lg border text-sm transition-colors ${
                    filters?.statuses?.includes(status?.id)
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'bg-card text-text-secondary border-border hover:bg-accent'
                  }`}
                >
                  {status?.label}
                </button>
              ))}
            </div>
          </div>
          
          {/* Amount Range */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">Amount Range</h3>
            <div className="space-y-2">
              {amountRanges?.map((range) => (
                <label
                  key={range?.id}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="amountRange"
                    value={range?.id}
                    checked={filters?.amountRange?.id === range?.id}
                    onChange={() => handleAmountRangeChange(range?.id)}
                    className="w-4 h-4 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-text-primary">{range?.label}</span>
                </label>
              ))}
            </div>
          </div>
          
          {/* Date Range */}
          <div>
            <h3 className="text-sm font-semibold text-text-primary mb-3">Date Range</h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-text-secondary mb-1">From</label>
                <input
                  type="date"
                  value={filters?.dateRange?.from}
                  onChange={(e) => handleDateRangeChange('from', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-xs text-text-secondary mb-1">To</label>
                <input
                  type="date"
                  value={filters?.dateRange?.to}
                  onChange={(e) => handleDateRangeChange('to', e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex items-center space-x-3 p-4 border-t border-divider safe-area-bottom">
          <Button
            variant="outline"
            onClick={handleClear}
            className="flex-1"
          >
            Clear All
          </Button>
          <Button
            onClick={handleApply}
            className="flex-1"
          >
            Apply Filters
          </Button>
        </div>
      </div>
    </>
  );
};

export default FilterBottomSheet;