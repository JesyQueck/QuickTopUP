import React from 'react';
import Icon from '../../../components/AppIcon';

const NotificationPreferences = ({ preferences, onUpdate }) => {
  const handleToggle = (key) => {
    onUpdate?.({ [key]: !preferences?.[key] });
  };

  const ToggleSwitch = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-primary' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Bell" size={20} className="text-primary" />
        <h3 className="font-semibold text-text-primary">Notification Preferences</h3>
      </div>

      <div className="space-y-4">
        {/* Transaction Alerts */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="CreditCard" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Transaction Alerts</p>
              <p className="text-sm text-text-secondary">Notifications for successful transactions</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={preferences?.transactionAlerts}
            onChange={() => handleToggle('transactionAlerts')}
          />
        </div>

        {/* Promotional Messages */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Gift" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Promotional Messages</p>
              <p className="text-sm text-text-secondary">Special offers and promotions</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={preferences?.promotionalMessages}
            onChange={() => handleToggle('promotionalMessages')}
          />
        </div>

        {/* System Notifications */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Settings" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">System Notifications</p>
              <p className="text-sm text-text-secondary">App updates and system messages</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={preferences?.systemNotifications}
            onChange={() => handleToggle('systemNotifications')}
          />
        </div>

        {/* Security Alerts */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Shield" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Security Alerts</p>
              <p className="text-sm text-text-secondary">Login attempts and security changes</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={true} // Always enabled for security
            onChange={() => {}} // Disabled - security notifications are mandatory
          />
        </div>

        {/* Marketing Communications */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Mail" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Email Marketing</p>
              <p className="text-sm text-text-secondary">Newsletter and product updates</p>
            </div>
          </div>
          <ToggleSwitch
            enabled={preferences?.emailMarketing || false}
            onChange={() => handleToggle('emailMarketing')}
          />
        </div>

        {/* Push Notification Schedule */}
        <div className="border-t border-divider pt-4 mt-4">
          <div className="flex items-center space-x-3 mb-3">
            <Icon name="Clock" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Notification Schedule</p>
              <p className="text-sm text-text-secondary">Control when you receive notifications</p>
            </div>
          </div>
          
          <div className="bg-accent rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-text-primary">Do Not Disturb</span>
              <span className="text-sm text-text-secondary">10:00 PM - 7:00 AM</span>
            </div>
            <p className="text-xs text-text-secondary">
              Only emergency notifications will be delivered during these hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationPreferences;