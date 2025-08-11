import React from 'react';

const BackgroundGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main Background */}
      <div className="absolute inset-0 bg-white"></div>
      
      {/* Nigerian Flag Inspired Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-yellow-50 opacity-60"></div>
      
      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-primary rounded-full blur-3xl opacity-30"></div>
      </div>
      
      {/* Geometric Shapes */}
      <div className="absolute top-1/4 right-8 w-4 h-4 bg-primary/10 rounded-full animate-pulse"></div>
      <div className="absolute bottom-1/3 left-8 w-6 h-6 bg-secondary/10 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-2/3 right-1/4 w-3 h-3 bg-primary/10 rounded-full animate-pulse delay-500"></div>
    </div>
  );
};

export default BackgroundGradient;