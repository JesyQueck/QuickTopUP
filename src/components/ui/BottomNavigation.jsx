import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomNavigation = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/dashboard-screen',
      label: 'Home',
      icon: 'Home',
      activeIcon: 'Home'
    },
    {
      path: '/buy-airtime-screen',
      label: 'Airtime',
      icon: 'Phone',
      activeIcon: 'Phone'
    },
    {
      path: '/buy-data-screen',
      label: 'Data',
      icon: 'Wifi',
      activeIcon: 'Wifi'
    },
    {
      path: '/transaction-history-screen',
      label: 'History',
      icon: 'History',
      activeIcon: 'History'
    },
    {
      path: '/profile-settings-screen',
      label: 'Profile',
      icon: 'User',
      activeIcon: 'User'
    }
  ];

  const isActivePath = (path) => location?.pathname === path;

  // Hide bottom navigation on login and splash screens
  const hideOnPaths = ['/login-screen', '/splash-screen'];
  if (hideOnPaths?.includes(location?.pathname)) {
    return null;
  }

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems?.map((item) => {
          const isActive = isActivePath(item?.path);
          return (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex flex-col items-center justify-center min-w-0 flex-1 py-2 px-1 transition-colors duration-150 ${
                isActive 
                  ? 'text-primary' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <div className={`flex items-center justify-center w-6 h-6 mb-1 transition-transform duration-150 ${
                isActive ? 'scale-110' : 'scale-100'
              }`}>
                <Icon 
                  name={isActive ? item?.activeIcon : item?.icon} 
                  size={20}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span className={`text-xs font-medium truncate ${
                isActive ? 'font-semibold' : 'font-normal'
              }`}>
                {item?.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;