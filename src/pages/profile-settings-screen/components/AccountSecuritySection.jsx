import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccountSecuritySection = ({ preferences, onUpdate }) => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [show2FAModal, setShow2FAModal] = useState(false);

  const handleBiometricToggle = () => {
    onUpdate?.({ biometricAuth: !preferences?.biometricAuth });
  };

  const handle2FAToggle = () => {
    if (!preferences?.twoFactorAuth) {
      setShow2FAModal(true);
    } else {
      onUpdate?.({ twoFactorAuth: false });
    }
  };

  const setup2FA = () => {
    // In real app, this would initiate 2FA setup
    onUpdate?.({ twoFactorAuth: true });
    setShow2FAModal(false);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-4">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Shield" size={20} className="text-primary" />
        <h3 className="font-semibold text-text-primary">Account Security</h3>
      </div>

      <div className="space-y-4">
        {/* Change Password */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Lock" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Change Password</p>
              <p className="text-sm text-text-secondary">Update your account password</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowPasswordModal(true)}
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>

        {/* Biometric Authentication */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Fingerprint" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Biometric Login</p>
              <p className="text-sm text-text-secondary">
                Use {navigator?.platform?.includes('Mac') ? 'Touch/Face ID' : 'fingerprint/face unlock'}
              </p>
            </div>
          </div>
          <button
            onClick={handleBiometricToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              preferences?.biometricAuth ? 'bg-primary' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences?.biometricAuth ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Smartphone" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Two-Factor Authentication</p>
              <p className="text-sm text-text-secondary">
                {preferences?.twoFactorAuth ? 'Enabled via SMS' : 'Add extra security to your account'}
              </p>
            </div>
          </div>
          <button
            onClick={handle2FAToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              preferences?.twoFactorAuth ? 'bg-primary' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                preferences?.twoFactorAuth ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        {/* Login Sessions */}
        <div className="flex items-center justify-between py-2">
          <div className="flex items-center space-x-3">
            <Icon name="Monitor" size={16} className="text-text-secondary" />
            <div>
              <p className="font-medium text-text-primary">Active Sessions</p>
              <p className="text-sm text-text-secondary">Manage your login sessions</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="ChevronRight"
            iconSize={16}
          />
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-modal-backdrop"
            onClick={() => setShowPasswordModal(false)}
          />
          <div className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 bg-card rounded-xl border border-border shadow-elevated z-modal max-w-md mx-auto">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Change Password</h3>
              <p className="text-sm text-text-secondary mb-4">
                For security reasons, you'll be redirected to verify your identity before changing your password.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={() => {
                    setShowPasswordModal(false);
                    // In real app, navigate to password change flow
                    console.log('Navigate to password change');
                  }}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* 2FA Setup Modal */}
      {show2FAModal && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-modal-backdrop"
            onClick={() => setShow2FAModal(false)}
          />
          <div className="fixed inset-x-4 top-1/2 transform -translate-y-1/2 bg-card rounded-xl border border-border shadow-elevated z-modal max-w-md mx-auto">
            <div className="p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Smartphone" size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">Enable 2FA</h3>
                <p className="text-sm text-text-secondary">
                  We'll send a verification code to your phone number for additional security.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShow2FAModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={setup2FA}
                  className="flex-1"
                >
                  Enable 2FA
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountSecuritySection;