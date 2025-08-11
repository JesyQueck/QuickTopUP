import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {/* Network Provider Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-32"></div>
        <div className="flex space-x-3">
          {[1, 2, 3, 4]?.map((item) => (
            <div key={item} className="w-24 h-20 bg-muted rounded-xl"></div>
          ))}
        </div>
      </div>
      {/* Phone Number Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded w-24"></div>
        <div className="h-12 bg-muted rounded-lg"></div>
      </div>
      {/* Data Packages Skeleton */}
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-32"></div>
        {[1, 2, 3, 4]?.map((item) => (
          <div key={item} className="p-4 border border-border rounded-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-muted rounded-lg"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-16"></div>
                  <div className="h-3 bg-muted rounded w-20"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-4 bg-muted rounded w-16"></div>
                <div className="h-3 bg-muted rounded w-12"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;