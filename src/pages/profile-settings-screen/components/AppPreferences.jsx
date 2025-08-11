import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppPreferences = ({ preferences, onUpdate }) => {
  const [showThemeModal, setShowThemeModal] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [showCurrencyModal, setShowCurrencyModal] = useState(false);

  const themeOptions = [
    { value: 'light', label: 'Light', icon: 'Sun' },
    { value: 'dark', label: 'Dark', icon: 'Moon' },
    { value: 'system', label: 'System Default', icon: 'Monitor' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'yo', label: 'Yoruba', flag: '🇳🇬' },
    { value: 'ig', label: 'Igbo', flag: '🇳🇬' },
    { value: 'ha', label: 'Hausa', flag: '🇳🇬' }
  ];

  const currencyOptions = [
    { value: 'NGN', label: 'Nigerian Naira (₦)', symbol: '₦' },
    { value: 'USD', label: 'US Dollar ($)', symbol: '$' },
    { value: 'GBP', label: 'British Pound (£)', symbol: '£' },
    { value: 'EUR', label: 'Euro (€)', symbol: '€' }
  ];

  const getThemeLabel = () => {
    return themeOptions?.find(option => option?.value === preferences?.theme)?.label || 'System Default';
  };

  const getLanguageLabel = () => {
    return languageOptions?.find(option => option?.value === preferences?.language)?.label || 'English';
  };

  const getCurrencyLabel = () => {
    return currencyOptions?.find(option => option?.value === preferences?.currency)?.label || 'Nigerian Naira (₦)';
  };

  const handleThemeSelect = (theme) => {
    onUpdate?.({ theme });
    setShowThemeModal(false);
  };

  const handleLanguageSelect = (language) => {
    onUpdate?.({ language });
    setShowLanguageModal(false);
  };

  const handleCurrencySelect = (currency) => {
    onUpdate?.({ currency });
    setShowCurrencyModal(false);
  };

  const SelectionModal = ({ isOpen, onClose, title, options, currentValue, onSelect, renderOption }) => {
    if (!isOpen) return null;

    return (
      <>
        <div 
          className="fixed inset-0 bg-black/50 z-modal-backdrop"
          onClick={onClose}
        />
        <div className="fixed bottom-0 left-0 right-0 bg-card rounded-t-xl border-t border-border shadow-elevated z-modal animate-slide-up max-h-[70vh] overflow-hidden">
          <div className="p-4 border-b border-divider">
            <div className="w-12 h-1 bg-divider rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-text-primary text-center">{title}</h3>
          </div>
          
          <div className="overflow-y-auto max-h-96">
            {options?.map((option) => (
              <button
                key={option?.value}
                onClick={() => onSelect(option?.value)}
                className={`w-full flex items-center justify-between p-4 text-left hover:bg-accent transition-colors ${
                  currentValue === option?.value ? 'bg-primary/10' : ''
                }`}
              >
                {renderOption(option)}
                {currentValue === option?.value && (
                  <Icon name="Check" size={18} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Palette" size={20} className="text-primary" />
        <h3 className="font-semibold text-text-primary">App Preferences</h3>
      </div>
      <div className="space-y-4">
        {/* Theme Selection */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Palette" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Theme</p>
              <p className="text-sm text-text-secondary">{getThemeLabel()}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowThemeModal(true)}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        {/* Language Selection */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Globe" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Language</p>
              <p className="text-sm text-text-secondary">{getLanguageLabel()}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowLanguageModal(true)}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        {/* Currency Selection */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="DollarSign" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Currency Display</p>
              <p className="text-sm text-text-secondary">{getCurrencyLabel()}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowCurrencyModal(true)}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        {/* Data Usage */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="BarChart3" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Data Usage</p>
              <p className="text-sm text-text-secondary">Monitor app data consumption</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        {/* Auto-refresh */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="RefreshCw" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Auto-refresh Balance</p>
              <p className="text-sm text-text-secondary">Automatically update wallet balance</p>
            </div>
          </div>
          <button
            onClick={() => onUpdate?.({ autoRefresh: !preferences?.autoRefresh })}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              preferences?.autoRefresh ? 'bg-primary' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences?.autoRefresh ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
      {/* Theme Modal */}
      <SelectionModal
        isOpen={showThemeModal}
        onClose={() => setShowThemeModal(false)}
        title="Select Theme"
        options={themeOptions}
        currentValue={preferences?.theme}
        onSelect={handleThemeSelect}
        renderOption={(option) => (
          <div className="flex items-center space-x-3">
            <Icon name={option?.icon} size={20} className="text-text-secondary" />
            <span className="font-medium text-text-primary">{option?.label}</span>
          </div>
        )}
      />
      {/* Language Modal */}
      <SelectionModal
        isOpen={showLanguageModal}
        onClose={() => setShowLanguageModal(false)}
        title="Select Language"
        options={languageOptions}
        currentValue={preferences?.language}
        onSelect={handleLanguageSelect}
        renderOption={(option) => (
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{option?.flag}</span>
            <span className="font-medium text-text-primary">{option?.label}</span>
          </div>
        )}
      />
      {/* Currency Modal */}
      <SelectionModal
        isOpen={showCurrencyModal}
        onClose={() => setShowCurrencyModal(false)}
        title="Select Currency"
        options={currencyOptions}
        currentValue={preferences?.currency}
        onSelect={handleCurrencySelect}
        renderOption={(option) => (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="font-bold text-text-primary">{option?.symbol}</span>
            </div>
            <span className="font-medium text-text-primary">{option?.label}</span>
          </div>
        )}
      />
    </div>
  );
};

export default AppPreferences;