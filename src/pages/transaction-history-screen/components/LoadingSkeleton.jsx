import React from 'react';

const LoadingSkeleton = ({ count = 5 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: count })?.map((_, index) => (
        <div key={index} className="mobile-card p-4 animate-pulse">
          <div className="flex items-center space-x-3">
            {/* Service Icon Skeleton */}
            <div className="w-10 h-10 bg-muted rounded-full" />
            
            {/* Content Skeleton */}
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <div className="h-4 bg-muted rounded w-32" />
                <div className="h-4 bg-muted rounded w-16" />
              </div>
              <div className="flex items-center justify-between">
                <div className="h-3 bg-muted rounded w-24" />
                <div className="h-3 bg-muted rounded w-12" />
              </div>
            </div>
          </div>
          
          {/* Status and ID Skeleton */}
          <div className="flex items-center justify-between mt-3">
            <div className="h-6 bg-muted rounded-full w-16" />
            <div className="h-3 bg-muted rounded w-20" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;