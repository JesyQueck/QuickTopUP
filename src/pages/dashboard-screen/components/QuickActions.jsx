import React from 'react';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onTopUp, onSearch }) => {
  return (
    <div className="px-4 mb-6">
      <h3 className="text-lg font-semibold text-text-primary mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          onClick={onTopUp}
          iconName="Plus"
          iconPosition="left"
          className="h-12"
        >
          Top Up
        </Button>
        <Button
          variant="outline"
          onClick={onSearch}
          iconName="Search"
          iconPosition="left"
          className="h-12"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default QuickActions;