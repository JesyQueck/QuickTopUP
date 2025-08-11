import React from 'react';
import Icon from '../../../components/AppIcon';

const NetworkStatus = ({ isOnline, lastUpdated }) => {
  return (
    <div className="px-4 py-2 bg-muted border-b border-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-destructive'}`} />
          <span className="text-xs text-text-secondary">
            {isOnline ? 'Connected' : 'Offline'}
          </span>
        </div>
        
        {!isOnline && lastUpdated && (
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={12} className="text-text-secondary" />
            <span className="text-xs text-text-secondary">
              Last updated: {new Date(lastUpdated)?.toLocaleTimeString('en-NG', {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NetworkStatus;