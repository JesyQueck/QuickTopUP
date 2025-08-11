import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, placeholder = "Search by phone number or transaction ID" }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onSearch(searchTerm);
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, onSearch]);

  const handleClear = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className={`relative transition-all duration-200 ${isFocused ? 'transform scale-[1.02]' : ''}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon 
            name="Search" 
            size={18} 
            color={isFocused ? "var(--color-primary)" : "var(--color-text-secondary)"} 
          />
        </div>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className={`w-full pl-10 pr-10 py-3 bg-card border rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            isFocused 
              ? 'border-primary shadow-sm' 
              : 'border-border hover:border-border/80'
          }`}
        />
        
        {searchTerm && (
          <button
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:bg-accent/50 rounded-r-xl transition-colors"
          >
            <Icon name="X" size={16} color="var(--color-text-secondary)" />
          </button>
        )}
      </div>
      {/* Search suggestions or recent searches could go here */}
      {isFocused && searchTerm && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-xl shadow-elevated z-dropdown max-h-48 overflow-y-auto">
          <div className="p-2">
            <div className="px-3 py-2 text-xs text-text-secondary">
              Search suggestions
            </div>
            {/* Mock search suggestions */}
            <div className="space-y-1">
              <button className="w-full text-left px-3 py-2 text-sm text-text-primary hover:bg-accent rounded-lg transition-colors">
                Search in phone numbers
              </button>
              <button className="w-full text-left px-3 py-2 text-sm text-text-primary hover:bg-accent rounded-lg transition-colors">
                Search in transaction IDs
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;