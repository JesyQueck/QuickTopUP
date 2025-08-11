import React from 'react';

const LoadingIndicator = ({ progress = 0 }) => {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* Loading Spinner */}
      <div className="relative w-8 h-8">
        <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
      
      {/* Progress Bar */}
      <div className="w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      {/* Loading Text */}
      <p className="text-sm text-text-secondary font-medium animate-pulse">
        Initializing...
      </p>
    </div>
  );
};

export default LoadingIndicator;