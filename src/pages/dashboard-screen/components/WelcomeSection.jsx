import React from 'react';

const WelcomeSection = ({ userName }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-semibold text-text-primary mb-1">
        {getGreeting()}, {userName}!
      </h1>
      <p className="text-text-secondary text-sm">
        Welcome back to QuickTopUp
      </p>
    </div>
  );
};

export default WelcomeSection;