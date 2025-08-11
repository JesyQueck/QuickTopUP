import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const primaryNavItems = [
    { path: '/dashboard-screen', label: 'Dashboard', icon: 'Home' },
    { path: '/buy-airtime-screen', label: 'Airtime', icon: 'Phone' },
    { path: '/buy-data-screen', label: 'Data', icon: 'Wifi' },
    { path: '/transaction-history-screen', label: 'History', icon: 'History' },
  ];

  const secondaryNavItems = [
    { path: '/profile', label: 'Profile', icon: 'User' },
    { path: '/settings', label: 'Settings', icon: 'Settings' },
    { path: '/help', label: 'Help', icon: 'HelpCircle' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-fixed bg-card border-b border-border safe-area-top">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo */}
        <Link to="/dashboard-screen" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Zap" size={20} color="white" />
          </div>
          <span className="text-xl font-semibold text-primary">QuickTopUp</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {primaryNavItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-text-secondary hover:text-text-primary hover:bg-accent'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </Link>
          ))}
          
          {/* More Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMenu}
              iconName="MoreHorizontal"
              iconSize={16}
              className="ml-2"
            >
              More
            </Button>
            
            {isMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-modal-backdrop" 
                  onClick={() => setIsMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-dropdown animate-slide-up">
                  <div className="py-2">
                    {secondaryNavItems?.map((item) => (
                      <Link
                        key={item?.path}
                        to={item?.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors duration-150"
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="md:hidden"
          iconName={isMenuOpen ? "X" : "Menu"}
          iconSize={20}
        />
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-modal-backdrop bg-black/20 md:hidden" 
            onClick={() => setIsMenuOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 bg-card border-b border-border shadow-elevated z-dropdown md:hidden animate-slide-up">
            <nav className="py-4 px-4 space-y-2">
              {primaryNavItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-text-secondary hover:text-text-primary hover:bg-accent'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
              
              <div className="border-t border-divider my-2" />
              
              {secondaryNavItems?.map((item) => (
                <Link
                  key={item?.path}
                  to={item?.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-accent transition-colors duration-150"
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;